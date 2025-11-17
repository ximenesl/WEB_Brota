import { useNavigate } from 'react-router-dom';
import { useSeeds } from '../hooks/useSeeds';
import SeedForm from '../components/features/SeedForm';

const AdicionarSemente = () => {
  const navigate = useNavigate();
  const { addSeed, loading } = useSeeds();

  const handleSubmit = async (seedData) => {
    await addSeed(seedData);
    navigate('/sementes');
  };

  const handleCancel = () => {
    navigate('/sementes');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-normal">Adicionar Nova Semente</h1>
      </div>
      <SeedForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        loading={loading} 
      />
    </div>
  );
};

export default AdicionarSemente;
