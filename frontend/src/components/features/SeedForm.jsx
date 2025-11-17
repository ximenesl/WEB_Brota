import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Select from '../common/Select';

const SeedForm = ({ onSubmit, onCancel, initialSeed, loading }) => {
  const [seed, setSeed] = useState({
    name: '',
    category: '',
    quantity: 0,
    status: 'Disponível',
    harvestDate: '',
  });

  const isEditMode = !!initialSeed;

  useEffect(() => {
    if (isEditMode) {
      setSeed({
        ...initialSeed,
        harvestDate: initialSeed.harvestDate ? new Date(initialSeed.harvestDate).toISOString().split('T')[0] : '',
      });
    }
  }, [initialSeed, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeed((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(seed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-white border border-border-color rounded-[14px] max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-dark-text">Nome da Semente</label>
        <Input
          id="name"
          name="name"
          value={seed.name}
          onChange={handleChange}
          placeholder="Ex: Tomate Cereja"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-sm font-medium text-dark-text">Categoria</label>
        <Input
          id="category"
          name="category"
          value={seed.category}
          onChange={handleChange}
          placeholder="Ex: Fruta, Verdura"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="quantity" className="text-sm font-medium text-dark-text">Quantidade</label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          value={seed.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="status" className="text-sm font-medium text-dark-text">Status</label>
        <Select id="status" name="status" value={seed.status} onChange={handleChange} required>
            <option value="Disponível">Disponível</option>
            <option value="Esgotado">Esgotado</option>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="harvestDate" className="text-sm font-medium text-dark-text">Data da Próxima Colheita</label>
        <Input
          id="harvestDate"
          name="harvestDate"
          type="date"
          value={seed.harvestDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Adicionar Semente')}
        </Button>
      </div>
    </form>
  );
};

export default SeedForm;
