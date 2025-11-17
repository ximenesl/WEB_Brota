import { useState, useCallback } from 'react';
import { getArmazens as getArmazensService, getArmazem as getArmazemService, saveArmazem as saveArmazemService, deleteArmazem as deleteArmazemService } from '../services/armazem';

export const useArmazem = () => {
  const [armazens, setArmazens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArmazens = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getArmazensService();
      setArmazens(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getArmazem = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await getArmazemService(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveArmazem = useCallback(async (armazem) => {
    try {
      setLoading(true);
      await saveArmazemService(armazem);
      await fetchArmazens(); // Refetch list
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchArmazens]);

  const deleteArmazem = useCallback(async (id) => {
    try {
      setLoading(true);
      await deleteArmazemService(id);
      await fetchArmazens(); // Refetch list
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchArmazens]);

  return { armazens, loading, error, fetchArmazens, getArmazem, saveArmazem, deleteArmazem };
};
