import { test, expect, request, APIRequestContext } from '@playwright/test';

const API_BASE = 'http://localhost:4000';

test.describe('API Tests via Playwright', () => {
  let apiContext: APIRequestContext;
  let itemId: string;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext();
  });

  test('Login with valid credentials', async () => {
    const res = await apiContext.post(`${API_BASE}/login`, {
      data: { username: 'user', password: 'pass' },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toBeDefined();
  });

  test('Create a new todo item', async () => {
    const res = await apiContext.post(`${API_BASE}/items`, {
      data: { text: 'Test item from API' },
    });

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.text).toBe('Test item from API');
    itemId = body.id;
  });

  test('Get all todo items', async () => {
    const res = await apiContext.get(`${API_BASE}/items`);
    expect(res.status()).toBe(200);

    const items = await res.json();
    expect(Array.isArray(items)).toBe(true);
    expect(items.some((item: { id: string; }) => item.id === itemId)).toBe(true);
  });

  test('Update a todo item', async () => {
    const res = await apiContext.put(`${API_BASE}/items/${itemId}`, {
      data: { text: 'Updated via API' },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.text).toBe('Updated via API');
  });

  test('Delete a todo item', async () => {
    const res = await apiContext.delete(`${API_BASE}/items/${itemId}`);
    expect(res.status()).toBe(204);
  });
});
