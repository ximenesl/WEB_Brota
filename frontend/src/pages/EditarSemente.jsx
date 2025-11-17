import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSeeds } from '../hooks/useSeeds';
import SeedForm from '../components/features/SeedForm';

const EditarSemente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSeed, updateSeed, loading } = useSeeds();
  const [seed, setSeed] = useState(null);

  useEffect(() => {
    const fetchSeed = async () => {
      const seedData = await getSeed(id);
      setSeed(seedData);
    };
    fetchSeed();
  }, [id, getSeed]);

  const handleSubmit = async (seedData) => {
    await updateSeed(id, seedData);
    navigate('/sementes');
  };

  const handleCancel = () => {
    navigate('/sementes');
  };

  if (loading || !seed) {
    return <p className="text-center p-12">Carregando dados da semente...</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-normal">Editar Semente</h1>
      </div>
      <SeedForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialSeed={seed}
        loading={loading}
      />
    </div>
  );
};

export default EditarSemente;
