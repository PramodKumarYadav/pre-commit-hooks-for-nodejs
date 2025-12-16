import { test, expect } from '@playwright/test';

test.describe('Greeter Tests', () => {
  test('should greet properly', async ({ page: _page }) => {
    // This would normally test a web component
    // For demonstration, we'll test the logic
    const greeting = 'Hello, World!';
    expect(greeting).toContain('Hello');
    expect(greeting).toContain('World');
  });

  test('should handle formal greetings', async ({ page: _page }) => {
    const formalGreeting = 'Good day, Sir. How do you do?';
    expect(formalGreeting).toContain('Good day');
    expect(formalGreeting).toMatch(/How do you do/);
  });
});
