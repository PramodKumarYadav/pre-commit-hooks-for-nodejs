import { test, expect } from '@playwright/test';

test.describe('Example Tests', () => {
  test('basic assertions work', async ({ page: _page }) => {
    // Example: Testing basic assertions
    expect(2 + 2).toBe(4);
    expect('hello').toBe('hello');
    expect([1, 2, 3]).toHaveLength(3);
  });

  test('object comparison works', async ({ page: _page }) => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toEqual({ name: 'test', value: 42 });
    expect(obj).toHaveProperty('name');
  });

  test('string operations work', async ({ page: _page }) => {
    const str = 'Hello, World!';
    expect(str).toContain('Hello');
    expect(str).toMatch(/World/);
    expect(str.toLowerCase()).toBe('hello, world!');
  });
});
