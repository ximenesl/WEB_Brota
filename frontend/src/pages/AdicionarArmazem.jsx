import { useNavigate } from 'react-router-dom';
import { useArmazem } from '../hooks/useArmazem';
import ArmazemForm from '../components/features/ArmazemForm';

const AdicionarArmazem = () => {
  const navigate = useNavigate();
  const { saveArmazem, loading } = useArmazem();

  const handleSubmit = async (data) => {
    await saveArmazem(data);
    navigate('/armazem');
  };

  const handleCancel = () => {
    navigate('/armazem');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-normal">Adicionar Novo Armazém</h1>
      </div>
      <ArmazemForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        loading={loading} 
      />
    </div>
  );
};

export default AdicionarArmazem;
