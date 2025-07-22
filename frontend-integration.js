// 📁 frontend-integration.js
// Exemplo de configuração para integração com frontend

const API_BASE_URL = 'http://localhost:3000';

// 🔐 Configuração de Autenticação
const authConfig = {
  // Armazenar token JWT
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },
  
  getToken: () => {
    return localStorage.getItem('authToken');
  },
  
  removeToken: () => {
    localStorage.removeItem('authToken');
  },
  
  // Headers para requisições autenticadas
  getAuthHeaders: () => {
    const token = authConfig.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }
};

// 🌐 Cliente HTTP
const apiClient = {
  // GET request
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  // POST request
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: authConfig.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // PUT request
  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: authConfig.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // PATCH request
  async patch(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: authConfig.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // DELETE request
  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: authConfig.getAuthHeaders(),
    });
    return response.json();
  }
};

// 📝 Exemplos de Uso

// 1. Autenticação
const authService = {
  async register(userData) {
    const response = await apiClient.post('/auth/register', userData);
    if (response.token) {
      authConfig.setToken(response.token);
    }
    return response;
  },

  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.token) {
      authConfig.setToken(response.token);
    }
    return response;
  },

  async logout() {
    await apiClient.post('/auth/logout');
    authConfig.removeToken();
  }
};

// 2. Categorias
const categoryService = {
  async getAll() {
    return await apiClient.get('/category');
  },

  async getById(id) {
    return await apiClient.get(`/category/${id}`);
  },

  async search(name) {
    return await apiClient.get(`/category/search/${name}`);
  }
};

// 3. Profissionais
const professionalService = {
  async getAll() {
    return await apiClient.get('/user/professionals');
  },

  async search(query) {
    return await apiClient.get(`/user/search?q=${encodeURIComponent(query)}`);
  },

  async getByCategory(categoryId) {
    return await apiClient.get(`/user/category/${categoryId}`);
  },

  async getById(id) {
    return await apiClient.get(`/user/${id}`);
  }
};

// 4. Avaliações
const reviewService = {
  async create(reviewData) {
    return await apiClient.post('/review', reviewData);
  },

  async getByProfessional(professionalId) {
    return await apiClient.get(`/review/professional/${professionalId}`);
  },

  async getAverageRating(professionalId) {
    return await apiClient.get(`/review/professional/${professionalId}/average`);
  },

  async update(id, reviewData) {
    return await apiClient.patch(`/review/${id}`, reviewData);
  },

  async delete(id) {
    return await apiClient.delete(`/review/${id}`);
  }
};

// 📱 Exemplos de Uso no Frontend

// React/Vue/Angular - Exemplo de componente
/*
import { authService, categoryService, professionalService, reviewService } from './api';

// Login
const handleLogin = async () => {
  try {
    const response = await authService.login({
      email: 'user@example.com',
      password: 'password123'
    });
    console.log('Login successful:', response);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Buscar categorias
const loadCategories = async () => {
  try {
    const categories = await categoryService.getAll();
    console.log('Categories:', categories);
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
};

// Buscar profissionais
const searchProfessionals = async (query) => {
  try {
    const professionals = await professionalService.search(query);
    console.log('Professionals:', professionals);
  } catch (error) {
    console.error('Failed to search professionals:', error);
  }
};

// Criar avaliação
const createReview = async (professionalId, rating, comment) => {
  try {
    const review = await reviewService.create({
      professionalId,
      rating,
      comment
    });
    console.log('Review created:', review);
  } catch (error) {
    console.error('Failed to create review:', error);
  }
};
*/

export {
  authService,
  categoryService,
  professionalService,
  reviewService,
  authConfig,
  apiClient
}; 