test('Button is present in DOM', () => {
  document.body.innerHTML = '<button id="clickMe">Click</button>'
  const btn = document.getElementById('clickMe')
  expect(btn).not.toBeNull()
})
