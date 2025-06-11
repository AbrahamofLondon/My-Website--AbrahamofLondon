#!/bin/bash

# Abraham of London - Secure WordPress Deployment Script
# This script sets up a WordPress environment using Docker with secure credentials

# WARNING: This script installs software and modifies Docker and system directories. Use with caution and review the code before running.
set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root for security reasons"
   exit 1
fi

# Check dependencies
check_dependencies() {
    log "Checking dependencies..."
    
    local deps=("docker" "docker-compose" "openssl")
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            error "$dep is not installed. Please install it first."
            exit 1
        fi
    done
    
    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        error "Docker daemon is not running. Please start Docker first."
        exit 1
    fi
    
    log "All dependencies are satisfied ✓"
}

# Generate secure random passwords
generate_password() {
    openssl rand -base64 32 | tr -d "=+/" | cut -c1-25
}

# Load or create environment variables
setup_environment() {
    log "Setting up environment variables..."
    
    local env_file=".env"
    
    if [[ -f "$env_file" ]]; then
        log "Loading existing environment from $env_file"
        source "$env_file"
    else
        log "Creating new environment file: $env_file"
        cat > "$env_file" << EOF
# Abraham of London WordPress Environment Configuration
# Generated on $(date)

# Database Configuration
MYSQL_ROOT_PASSWORD=$(generate_password)
MYSQL_DATABASE=abraham_london_wp
MYSQL_USER=wp_user
MYSQL_PASSWORD=$(generate_password)

# WordPress Configuration
WORDPRESS_DB_HOST=db:3306
WORDPRESS_DB_NAME=abraham_london_wp
WORDPRESS_DB_USER=wp_user
WORDPRESS_DB_PASSWORD=\${MYSQL_PASSWORD}

# WordPress Security
WORDPRESS_TABLE_PREFIX=aol_
WORDPRESS_DEBUG=false

# Site Configuration
WORDPRESS_SITE_URL=http://localhost:8080
WORDPRESS_ADMIN_USER=abraham
WORDPRESS_ADMIN_PASSWORD=$(generate_password)
WORDPRESS_ADMIN_EMAIL=${WORDPRESS_ADMIN_EMAIL:-admin@abrahamoflondon.local}

# Security Keys (WordPress Salts)
WORDPRESS_AUTH_KEY=$(openssl rand -base64 64 | tr -d "\n")
WORDPRESS_SECURE_AUTH_KEY=$(openssl rand -base64 64 | tr -d "\n")
WORDPRESS_LOGGED_IN_KEY=$(openssl rand -base64 64 | tr -d "\n")
WORDPRESS_NONCE_KEY=$(openssl rand -base64 64 | tr -d "\n")
WORDPRESS_AUTH_SALT=$(openssl rand -base64 64 | tr -d "\n")
WORDPRESS_SECURE_AUTH_SALT=$(openssl rand -base64 64 | tr -d "\n")
WORDPRESS_LOGGED_IN_SALT=$(openssl rand -base64 64 | tr -d "\n")
WORDPRESS_NONCE_SALT=$(openssl rand -base64 64 | tr -d "\n")

# Docker Configuration
COMPOSE_PROJECT_NAME=abraham_london
DOCKER_NETWORK=abraham_network
EOF
        
        # Set restrictive permissions on .env file
        chmod 600 "$env_file"
        
        # Add .env to .gitignore if it exists
        if [[ -f ".gitignore" ]] && ! grep -q "^\.env$" .gitignore; then
            echo ".env" >> .gitignore
            log "Added .env to .gitignore"
        fi
        
        source "$env_file"
        log "Environment file created successfully ✓"
    fi
}

# Create Docker Compose configuration
create_docker_compose() {
    log "Creating Docker Compose configuration..."
    
    cat > docker-compose.yml << EOF
version: '3.8'

services:
  db:
    image: mysql:8.0
    container_name: \${COMPOSE_PROJECT_NAME}_db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: \${MYSQL_DATABASE}
      MYSQL_USER: \${MYSQL_USER}
      MYSQL_PASSWORD: \${MYSQL_PASSWORD}
    volumes:
      - db_data:/var/lib/mysql
      - ./mysql-init:/docker-entrypoint-initdb.d
    networks:
      - \${DOCKER_NETWORK}
    command: --default-authentication-plugin=mysql_native_password

  wordpress:
    image: wordpress:6.4-php8.2-apache
    container_name: \${COMPOSE_PROJECT_NAME}_wp
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: \${WORDPRESS_DB_HOST}
      WORDPRESS_DB_NAME: \${WORDPRESS_DB_NAME}
      WORDPRESS_DB_USER: \${WORDPRESS_DB_USER}
      WORDPRESS_DB_PASSWORD: \${WORDPRESS_DB_PASSWORD}
      WORDPRESS_TABLE_PREFIX: \${WORDPRESS_TABLE_PREFIX}
      WORDPRESS_DEBUG: \${WORDPRESS_DEBUG}
      WORDPRESS_AUTH_KEY: \${WORDPRESS_AUTH_KEY}
      WORDPRESS_SECURE_AUTH_KEY: \${WORDPRESS_SECURE_AUTH_KEY}
      WORDPRESS_LOGGED_IN_KEY: \${WORDPRESS_LOGGED_IN_KEY}
      WORDPRESS_NONCE_KEY: \${WORDPRESS_NONCE_KEY}
      WORDPRESS_AUTH_SALT: \${WORDPRESS_AUTH_SALT}
      WORDPRESS_SECURE_AUTH_SALT: \${WORDPRESS_SECURE_AUTH_SALT}
      WORDPRESS_LOGGED_IN_SALT: \${WORDPRESS_LOGGED_IN_SALT}
      WORDPRESS_NONCE_SALT: \${WORDPRESS_NONCE_SALT}
    volumes:
      - wordpress_data:/var/www/html
      - ./wp-content:/var/www/html/wp-content
      - ./uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
    depends_on:
      - db
    networks:
      - \${DOCKER_NETWORK}

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:5.2
    container_name: \${COMPOSE_PROJECT_NAME}_phpmyadmin
    restart: unless-stopped
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db
      PMA_USER: \${MYSQL_USER}
      PMA_PASSWORD: \${MYSQL_PASSWORD}
    depends_on:
      - db
    networks:
      - \${DOCKER_NETWORK}

volumes:
  db_data:
    driver: local
  wordpress_data:
    driver: local

networks:
  \${DOCKER_NETWORK}:
    driver: bridge
EOF

    log "Docker Compose configuration created ✓"
}

# Create PHP configuration for file uploads
create_php_config() {
    log "Creating PHP configuration..."
    
    cat > uploads.ini << EOF
file_uploads = On
memory_limit = 256M
upload_max_filesize = 64M
post_max_size = 64M
max_execution_time = 600
max_input_time = 600
EOF

    log "PHP configuration created ✓"
}

# Create MySQL initialization script
create_mysql_init() {
    log "Creating MySQL initialization script..."
    
    mkdir -p mysql-init
    cat > mysql-init/01-security.sql << EOF
-- Security improvements for MySQL
-- Remove anonymous users
DELETE FROM mysql.user WHERE User='';

-- Remove remote root access
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');

-- Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

-- Reload privilege tables
FLUSH PRIVILEGES;
EOF

    log "MySQL initialization script created ✓"
}

# Start the WordPress environment
start_environment() {
    log "Starting WordPress environment..."
    
    docker-compose up -d
    
    if [[ $? -eq 0 ]]; then
        log "WordPress environment started successfully ✓"
        
        # Wait for services to be ready
        log "Waiting for services to initialize..."
        sleep 30
        
        # Display access information
        echo ""
        echo -e "${BLUE}=== Abraham of London WordPress Environment ===${NC}"
        echo -e "${GREEN}WordPress Site:${NC} http://localhost:8080"
        echo -e "${GREEN}Admin Login:${NC} http://localhost:8080/wp-admin"
        echo -e "${GREEN}phpMyAdmin:${NC} http://localhost:8081"
        echo ""
        echo -e "${YELLOW}Admin Credentials:${NC}"
        echo -e "Username: ${WORDPRESS_ADMIN_USER}"
        echo -e "Password: ${WORDPRESS_ADMIN_PASSWORD}"
        echo -e "Email: ${WORDPRESS_ADMIN_EMAIL}"
        echo ""
        echo -e "${YELLOW}Database Credentials:${NC}"
        echo -e "Host: localhost:3306"
        echo -e "Database: ${MYSQL_DATABASE}"
        echo -e "Username: ${MYSQL_USER}"
        echo -e "Password: ${MYSQL_PASSWORD}"
        echo ""
        echo -e "${RED}IMPORTANT: Store these credentials securely!${NC}"
        echo -e "${RED}The .env file contains all sensitive information.${NC}"
    else
        error "Failed to start WordPress environment"
        exit 1
    fi
}

# Stop the environment
stop_environment() {
    log "Stopping WordPress environment..."
    docker-compose down
    log "Environment stopped ✓"
}

# Clean up environment (removes all data)
cleanup_environment() {
    warn "This will remove ALL data including database and uploaded files!"
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log "Cleaning up environment..."
        docker-compose down -v --remove-orphans
        docker network prune -f
        sudo rm -rf mysql-init wp-content uploads.ini
        log "Environment cleaned up ✓"
    else
        log "Cleanup cancelled"
    fi
}

# Show help
show_help() {
    echo "Abraham of London - WordPress Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     Start the WordPress environment (default)"
    echo "  stop      Stop the WordPress environment"
    echo "  restart   Restart the WordPress environment"
    echo "  status    Show status of running containers"
    echo "  logs      Show logs from all services"
    echo "  cleanup   Remove all data and containers"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 logs wordpress"
    echo "  $0 cleanup"
}

# Main execution
main() {
    local command="${1:-start}"
    
    case "$command" in
        start)
            check_dependencies
            setup_environment
            create_docker_compose
            create_php_config
            create_mysql_init
            start_environment
            ;;
        stop)
            stop_environment
            ;;
        restart)
            stop_environment
            sleep 5
            start_environment
            ;;
        status)
            docker-compose ps
            ;;
        logs)
            local service="${2:-}"
            if [[ -n "$service" ]]; then
                docker-compose logs -f "$service"
            else
                docker-compose logs -f
            fi
            ;;
        cleanup)
            cleanup_environment
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
