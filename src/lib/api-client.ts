const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const APP_URL = API_BASE.replace(/\/api$/, '');

export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return '/images/placeholder.svg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${APP_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function setToken(token: string) {
  localStorage.setItem('auth_token', token);
}

export function removeToken() {
  localStorage.removeItem('auth_token');
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  const url = new URL(`${API_BASE}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(fetchOptions.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url.toString(), { ...fetchOptions, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  // ─── Auth ─────────────────────────────────────
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: number; name: string; email: string } }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    ),

  logout: () =>
    request<{ message: string }>('/auth/logout', { method: 'POST' }),

  getMe: () =>
    request<{ id: number; name: string; email: string }>('/auth/me'),

  // ─── News ─────────────────────────────────────
  getNews: (params?: { category?: string; featured?: boolean; per_page?: number }) =>
    request<{ data: any[]; current_page: number; last_page: number; total: number }>('/news', { params: params as any }),

  getNewsItem: (slug: string) =>
    request<any>(`/news/${slug}`),

  createNews: (data: { title: string; category?: string; summary?: string; content: string; image?: string; featured?: boolean }) =>
    request<any>('/news', { method: 'POST', body: JSON.stringify(data) }),

  updateNews: (id: string, data: { title?: string; category?: string; summary?: string; content?: string; image?: string; featured?: boolean }) =>
    request<any>(`/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteNews: (id: string) =>
    request<{ message: string }>(`/news/${id}`, { method: 'DELETE' }),

  // ─── Help Requests ────────────────────────────
  getHelpRequests: (params?: { status?: string; type?: string; per_page?: number }) =>
    request<{ data: any[]; current_page: number; last_page: number; total: number }>('/help-requests', { params: params as any }),

  getHelpRequestItem: (id: string) =>
    request<any>(`/help-requests/${id}`),

  submitHelpRequest: (data: { name: string; phone: string; email?: string; type?: string; description: string; amount?: number; address?: string }) =>
    request<any>('/help-requests', { method: 'POST', body: JSON.stringify(data) }),

  updateHelpRequest: (id: string, data: { status?: string; notes?: string; name?: string; phone?: string; email?: string; type?: string; description?: string; amount?: number; address?: string }) =>
    request<any>(`/help-requests/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteHelpRequest: (id: string) =>
    request<{ message: string }>(`/help-requests/${id}`, { method: 'DELETE' }),

  // ─── Donations ────────────────────────────────
  getDonations: (params?: { method?: string; per_page?: number }) =>
    request<{ data: any[]; current_page: number; last_page: number; total: number }>('/donations', { params: params as any }),

  getDonationStats: () =>
    request<{ total_donations: number; total_count: number; by_method: any[] }>('/donations/stats'),

  submitDonation: (data: { donor_name?: string; phone?: string; amount: number; method?: string; transaction_id?: string; notes?: string }) =>
    request<any>('/donations', { method: 'POST', body: JSON.stringify(data) }),

  updateDonation: (id: string, data: { donor_name?: string; phone?: string; amount?: number; method?: string; transaction_id?: string; notes?: string }) =>
    request<any>(`/donations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteDonation: (id: string) =>
    request<{ message: string }>(`/donations/${id}`, { method: 'DELETE' }),

  // ─── Upload ───────────────────────────────────
  upload: (file: File, oldUrl?: string) => {
    const form = new FormData();
    form.append('file', file);
    if (oldUrl) form.append('old_url', oldUrl);
    return request<{ url: string; path: string; thumbnail_url: string; thumbnail_path: string }>(
      '/upload',
      { method: 'POST', body: form }
    );
  },

  uploadWithProgress: (file: File, onProgress?: (pct: number) => void, oldUrl?: string) => {
    return new Promise<{ url: string; path: string; thumbnail_url: string; thumbnail_path: string }>(
      (resolve, reject) => {
        const form = new FormData();
        form.append('file', file);
        if (oldUrl) form.append('old_url', oldUrl);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_BASE}/upload`);

        const token = getToken();
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable && onProgress) {
            onProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            try {
              const err = JSON.parse(xhr.responseText);
              reject(new Error(err.message || `HTTP ${xhr.status}`));
            } catch {
              reject(new Error(`Upload failed (${xhr.status})`));
            }
          }
        };

        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(form);
      }
    );
  },
};
