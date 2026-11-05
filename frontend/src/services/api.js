import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const categoryAPI = {
  getAll: (opts = {}) => {
    const params = {}
    if (opts.limit) params.limit = opts.limit
    if (opts.lang) params.lang = opts.lang
    return api.get('/categories', { params })
  },
  getById: (id, lang) => api.get(`/categories/${id}`, { params: { lang } }),
}

export const articleAPI = {
  getByCategory: (slug, lang) => api.get(`/articles/category/${slug}`, { params: { lang } }),
  getBySlug: (slug, lang) => api.get(`/articles/${slug}`, { params: { lang } }),
}

export const teamAPI = {
  getAll: (lang) => api.get('/team', { params: { lang } }),
  getById: (id, lang) => api.get(`/team/${id}`, { params: { lang } }),
}

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
}

export default api
