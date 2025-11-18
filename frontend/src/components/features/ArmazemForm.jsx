import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const ArmazemForm = ({ onSubmit, onCancel, initialData, loading }) => {
  const [armazem, setArmazem] = useState({
    name: '',
    location: '',
    manager: '',
  });

  const isEditMode = !!initialData;

  useEffect(() => {
    if (isEditMode) {
      setArmazem(initialData);
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArmazem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(armazem);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="text-lg font-bold font-['Arimo'] leading-4 text-neutral-950">
        {isEditMode ? 'Editar Armazém' : 'Novo Armazém'}
      </div>
      <div className="text-sm font-normal font-['Arimo'] leading-5 text-gray-500">
        {isEditMode ? 'Atualize os detalhes do armazém' : 'Adicione um novo armazém ao inventário'}
      </div>
      
      <Input
        label="Nome"
        name="name"
        value={armazem.name}
        onChange={handleChange}
        placeholder="Nome do armazém"
        required
        className="bg-zinc-100"
      />
      
      <Input
        label="Localização"
        name="location"
        value={armazem.location}
        onChange={handleChange}
        placeholder="Localização do armazém"
        required
        className="bg-zinc-100"
      />

      <Input
        label="Responsável"
        name="manager"
        value={armazem.manager}
        onChange={handleChange}
        placeholder="Nome do responsável"
        required
        className="bg-zinc-100"
      />

      <div className="flex justify-end gap-4 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={loading} className="bg-gray-950">
          {loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Adicionar')}
        </Button>
      </div>
    </form>
  );
};

export default ArmazemForm;