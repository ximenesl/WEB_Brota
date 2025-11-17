import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFornecedor } from '../hooks/useFornecedor';
import FornecedorForm from '../components/features/FornecedorForm';

const EditarFornecedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFornecedor, saveFornecedor, loading } = useFornecedor();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFornecedor(id);
      setInitialData(data);
    };
    fetchData();
  }, [id, getFornecedor]);

  const handleSubmit = async (data) => {
    await saveFornecedor({ ...data, id });
    navigate('/fornecedor');
  };

  const handleCancel = () => {
    navigate('/fornecedor');
  };

  if (loading || !initialData) {
    return <p className="text-center p-12">Carregando...</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-normal">Editar Fornecedor</h1>
      </div>
      <FornecedorForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={initialData}
        loading={loading}
      />
    </div>
  );
};

export default EditarFornecedor;
