import { useNavigate } from 'react-router-dom';
import { useSeeds } from '../hooks/useSeeds';
import SeedCard from '../components/features/SeedCard';
import Button from '../components/common/Button';
import { FiPlus } from 'react-icons/fi';

const GestaoSementes = () => {
  const { seeds, loading, deleteSeed } = useSeeds();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/sementes/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta semente?')) {
      await deleteSeed(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-normal">Gestão de Sementes</h1>
        <Button onClick={() => navigate('/sementes/adicionar')}>
          <FiPlus />
          Adicionar Semente
        </Button>
      </div>

      {loading && <p className="text-center p-12">Carregando sementes...</p>}

      {!loading && seeds.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seeds.map((seed) => (
            <SeedCard
              key={seed.id}
              seed={seed}
              onEdit={() => handleEdit(seed.id)}
              onDelete={() => handleDelete(seed.id)}
            />
          ))}
        </div>
      )}

      {!loading && seeds.length === 0 && (
        <p>Nenhuma semente encontrada.</p>
      )}
    </div>
  );
};

export default GestaoSementes;
