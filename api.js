// API Configuration
const API_URL = 'http://localhost:5000/api';
console.log('API URL configured as:', API_URL);

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Auth API calls
const authAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return handleResponse(response);
  },

  // Logout user
  logout: async () => {
    localStorage.removeItem('token');
  },
};

// Profile API calls
const profileAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },

  // Update password
  updatePassword: async (passwordData) => {
    const response = await fetch(`${API_URL}/profile/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(passwordData),
    });
    return handleResponse(response);
  },
};

// Career API calls
const careerAPI = {
  // Get career suggestions
  getSuggestions: async (data) => {
    console.log('Making API request to:', `${API_URL}/career/suggestions`);
    console.log('Request data:', data);
    console.log('Auth token:', localStorage.getItem('token'));
    
    const response = await fetch(`${API_URL}/career/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    
    console.log('API response status:', response.status);
    const responseData = await handleResponse(response);
    console.log('API response data:', responseData);
    
    return responseData;
  },
};

// Export all API functions
export { authAPI, profileAPI, careerAPI }; 