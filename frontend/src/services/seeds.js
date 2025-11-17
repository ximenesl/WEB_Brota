const API_URL = 'http://localhost:8080/api/sementes';

export const getSeeds = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch seeds');
    }
    return response.json();
  };
  
  export const getSeed = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch seed');
    }
    return response.json();
  };
  
  export const addSeed = async (seedData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seedData),
      });
    if (!response.ok) {
      throw new Error('Failed to add seed');
    }
    return response.json();
  };
  
  export const updateSeed = async (id, seedData) => {
      const response = await fetch(`${API_URL}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...seedData, id }),
        });
      if (!response.ok) {
        throw new Error('Failed to update seed');
      }
      return response.json();
    };
  
  export const deleteSeed = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete seed');
    }
    return response.text();
  };
