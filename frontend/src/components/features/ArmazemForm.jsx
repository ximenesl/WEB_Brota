import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const ArmazemForm = ({ onSubmit, onCancel, initialData, loading }) => {
  const [armazem, setArmazem] = useState({
    nome: '',
    localização: '',
    responsável: '',
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-white border border-border-color rounded-[14px] max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className="text-sm font-medium text-dark-text">Nome do Armazém</label>
        <Input
          id="nome"
          name="nome"
          value={armazem.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="localização" className="text-sm font-medium text-dark-text">Localização</label>
        <Input
          id="localização"
          name="localização"
          value={armazem.localização}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="responsável" className="text-sm font-medium text-dark-text">Responsável</label>
        <Input
          id="responsável"
          name="responsável"
          value={armazem.responsável}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Adicionar Armazém')}
        </Button>
      </div>
    </form>
  );
};

export default ArmazemForm;
