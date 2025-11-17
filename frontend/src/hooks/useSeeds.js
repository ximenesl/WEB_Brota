import { useState, useEffect, useCallback } from 'react';
import { getSeeds as getSeedsService, getSeed as getSeedService, addSeed as addSeedService, updateSeed as updateSeedService, deleteSeed as deleteSeedService } from '../services/seeds';

export const useSeeds = () => {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSeeds = useCallback(async () => {
    try {
      setLoading(true);
      const seedsData = await getSeedsService();
      setSeeds(seedsData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeeds();
  }, [fetchSeeds]);

  const getSeed = useCallback(async (id) => {
    try {
        setLoading(true);
        const seedData = await getSeedService(id);
        return seedData;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
  }, []);

  const addSeed = useCallback(async (seedData) => {
    try {
      setLoading(true);
      await addSeedService(seedData);
      await fetchSeeds(); // Refetch all seeds after adding
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchSeeds]);

  const updateSeed = useCallback(async (id, seedData) => {
    try {
        setLoading(true);
        await updateSeedService(id, seedData);
        await fetchSeeds(); // Refetch all seeds after updating
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
  }, [fetchSeeds]);

  const deleteSeed = useCallback(async (id) => {
    try {
        setLoading(true);
        await deleteSeedService(id);
        await fetchSeeds(); // Refetch all seeds after deleting
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
  }, [fetchSeeds]);

  return { seeds, loading, error, fetchSeeds, getSeed, addSeed, updateSeed, deleteSeed };
};
