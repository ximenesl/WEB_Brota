import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArmazem } from '../hooks/useArmazem';
import ArmazemCard from '../components/features/ArmazemCard';
import Button from '../components/common/Button';
import { FiPlus } from 'react-icons/fi';

const GestaoArmazem = () => {
  const { armazens, loading, fetchArmazens, deleteArmazem } = useArmazem();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArmazens();
  }, [fetchArmazens]);

  const handleEdit = (id) => {
    navigate(`/armazem/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este armazém?')) {
      await deleteArmazem(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-normal">Gestão de Armazéns</h1>
        <Button onClick={() => navigate('/armazem/adicionar')}>
          <FiPlus />
          Adicionar Armazém
        </Button>
      </div>

      {loading && <p className="text-center p-12">Carregando...</p>}

      {!loading && armazens.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {armazens.map((armazem) => (
            <ArmazemCard
              key={armazem.id}
              armazem={armazem}
              onEdit={() => handleEdit(armazem.id)}
              onDelete={() => handleDelete(armazem.id)}
            />
          ))}
        </div>
      )}

      {!loading && armazens.length === 0 && (
        <p>Nenhum armazém encontrado.</p>
      )}
    </div>
  );
};

export default GestaoArmazem;
