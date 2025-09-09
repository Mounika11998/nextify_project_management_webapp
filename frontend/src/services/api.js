// Placeholder API service for backend integration
// Base URL reads from env; defaults to localhost:8000
const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function apiGet(path, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, init);
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}

export async function apiPost(path, body, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    body: JSON.stringify(body),
    ...init,
  });
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}

export async function apiPut(path, body, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    body: JSON.stringify(body),
    ...init,
  });
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}

export async function apiDelete(path, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, { method: 'DELETE', ...init });
  if (!response.ok) throw new Error('Request failed');
  return true;
}


