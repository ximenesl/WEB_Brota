const API_URL = 'http://localhost:8080/api/fornecedor';

export const getFornecedores = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch fornecedores');
  }
  return response.json();
};

export const getFornecedor = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch fornecedor');
  }
  return response.json();
};

export const saveFornecedor = async (fornecedor) => {
  const isUpdating = !!fornecedor.id;
  const url = isUpdating ? `${API_URL}` : API_URL;
  const method = isUpdating ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fornecedor),
  });

  if (!response.ok) {
    throw new Error('Failed to save fornecedor');
  }
  return response.json();
};

export const deleteFornecedor = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete fornecedor');
  }
  return response.text();
};
