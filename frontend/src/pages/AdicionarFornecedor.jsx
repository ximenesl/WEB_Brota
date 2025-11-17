import { useNavigate } from 'react-router-dom';
import { useFornecedor } from '../hooks/useFornecedor';
import FornecedorForm from '../components/features/FornecedorForm';

const AdicionarFornecedor = () => {
  const navigate = useNavigate();
  const { saveFornecedor, loading } = useFornecedor();

  const handleSubmit = async (data) => {
    await saveFornecedor(data);
    navigate('/fornecedor');
  };

  const handleCancel = () => {
    navigate('/fornecedor');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-normal">Adicionar Novo Fornecedor</h1>
      </div>
      <FornecedorForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        loading={loading} 
      />
    </div>
  );
};

export default AdicionarFornecedor;
