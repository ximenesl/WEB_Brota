const API_URL = 'http://localhost:8080/api/auth';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Credenciais inválidas.');
  }
  
  const user = await response.json();
  // Assuming the backend returns a token
  if (user.token) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  return user;
};

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
    
      if (!response.ok) {
        throw new Error('Falha ao criar conta.');
      }

      const user = await response.json();
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
};

export const logout = async () => {
  // No backend endpoint for logout, just remove from local storage
  localStorage.removeItem('user');
  return Promise.resolve();
};

export const updateProfile = async (userId, userData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar perfil.');
  }

  const updatedUser = await response.json();
  return updatedUser;
};

  