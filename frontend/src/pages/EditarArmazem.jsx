import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArmazem } from '../hooks/useArmazem';
import ArmazemForm from '../components/features/ArmazemForm';

const EditarArmazem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArmazem, saveArmazem, loading } = useArmazem();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArmazem(id);
      setInitialData(data);
    };
    fetchData();
  }, [id, getArmazem]);

  const handleSubmit = async (data) => {
    await saveArmazem({ ...data, id });
    navigate('/armazem');
  };

  const handleCancel = () => {
    navigate('/armazem');
  };

  if (loading || !initialData) {
    return <p className="text-center p-12">Carregando...</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-normal">Editar Armazém</h1>
      </div>
      <ArmazemForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={initialData}
        loading={loading}
      />
    </div>
  );
};

export default EditarArmazem;
