const API_URL = 'http://localhost:8080/api/armazem';

export const getArmazens = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch armazens');
  }
  return response.json();
};

export const getArmazem = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch armazem');
  }
  return response.json();
};

export const saveArmazem = async (armazem) => {
  const isUpdating = !!armazem.id;
  const url = isUpdating ? `${API_URL}` : API_URL;
  const method = isUpdating ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(armazem),
  });

  if (!response.ok) {
    throw new Error('Failed to save armazem');
  }
  return response.json();
};

export const deleteArmazem = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete armazem');
  }
  return response.text();
};
