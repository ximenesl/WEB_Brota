import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFornecedor } from '../hooks/useFornecedor';
import FornecedorCard from '../components/features/FornecedorCard';
import Button from '../components/common/Button';
import { FiPlus } from 'react-icons/fi';

const GestaoFornecedor = () => {
  const { fornecedores, loading, fetchFornecedores, deleteFornecedor } = useFornecedor();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFornecedores();
  }, [fetchFornecedores]);

  const handleEdit = (id) => {
    navigate(`/fornecedor/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      await deleteFornecedor(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-normal">Gestão de Fornecedores</h1>
        <Button onClick={() => navigate('/fornecedor/adicionar')}>
          <FiPlus />
          Adicionar Fornecedor
        </Button>
      </div>

      {loading && <p className="text-center p-12">Carregando...</p>}

      {!loading && fornecedores.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fornecedores.map((fornecedor) => (
            <FornecedorCard
              key={fornecedor.id}
              fornecedor={fornecedor}
              onEdit={() => handleEdit(fornecedor.id)}
              onDelete={() => handleDelete(fornecedor.id)}
            />
          ))}
        </div>
      )}

      {!loading && fornecedores.length === 0 && (
        <p>Nenhum fornecedor encontrado.</p>
      )}
    </div>
  );
};

export default GestaoFornecedor;
