import { useState, useCallback } from 'react';
import { getFornecedores as getFornecedoresService, getFornecedor as getFornecedorService, saveFornecedor as saveFornecedorService, deleteFornecedor as deleteFornecedorService } from '../services/fornecedor';

export const useFornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFornecedores = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFornecedoresService();
      setFornecedores(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getFornecedor = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await getFornecedorService(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveFornecedor = useCallback(async (fornecedor) => {
    try {
      setLoading(true);
      await saveFornecedorService(fornecedor);
      await fetchFornecedores(); // Refetch list
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchFornecedores]);

  const deleteFornecedor = useCallback(async (id) => {
    try {
      setLoading(true);
      await deleteFornecedorService(id);
      await fetchFornecedores(); // Refetch list
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchFornecedores]);

  return { fornecedores, loading, error, fetchFornecedores, getFornecedor, saveFornecedor, deleteFornecedor };
};
