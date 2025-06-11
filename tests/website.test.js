/**
 * @jest-environment jsdom
 */

describe('Website Functionality', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <nav id="navbar" class="navbar">
                <div id="nav-toggle" class="nav-toggle"></div>
                <div id="nav-menu" class="nav-menu"></div>
            </nav>
        `;
        jest.resetModules();
        require('../scripts/main.js');
        document.dispatchEvent(new Event('DOMContentLoaded'));
    });

    test('Mobile menu toggle works', () => {
        const toggle = document.getElementById('nav-toggle');
        const menu = document.getElementById('nav-menu');
        toggle.click();
        expect(menu.classList.contains('active')).toBe(true);
        expect(toggle.classList.contains('active')).toBe(true);
    });

    test('Navbar hides on scroll down', () => {
        const navbar = document.getElementById('navbar');
        Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });
        window.dispatchEvent(new Event('scroll'));
        expect(navbar.classList.contains('scroll-down')).toBe(true);
    });
});
