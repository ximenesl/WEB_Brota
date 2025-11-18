import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Select from '../common/Select';

const SeedForm = ({ onSubmit, onCancel, initialSeed, loading }) => {
  const [seed, setSeed] = useState({
    name: '',
    category: '',
    type: '',
    quantity: 0,
    harvest_time: 0,
  });

  const isEditMode = !!initialSeed;

  useEffect(() => {
    if (isEditMode) {
      setSeed(initialSeed);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="text-lg font-bold font-['Arimo'] leading-4 text-neutral-950">
        {isEditMode ? 'Editar Semente' : 'Nova Semente'}
      </div>
      <div className="text-sm font-normal font-['Arimo'] leading-5 text-gray-500">
        {isEditMode ? 'Atualize os detalhes da semente' : 'Adicione uma nova semente ao inventário'}
      </div>
      
      <Input
        label="Nome"
        name="name"
        value={seed.name}
        onChange={handleChange}
        placeholder="Nome da semente"
        required
        className="bg-zinc-100"
      />
      
      <Select
        label="Categoria"
        name="category"
        value={seed.category}
        onChange={handleChange}
        required
        className="bg-zinc-100"
      >
        <option value="">Selecione uma categoria</option>
        <option value="Hortaliças">Hortaliças</option>
        <option value="Frutas">Frutas</option>
        <option value="Ervas">Ervas</option>
        <option value="Grãos">Grãos</option>
      </Select>

      <Input
        label="Tipo"
        name="type"
        value={seed.type}
        onChange={handleChange}
        placeholder="Ex: Vegetal, Erva"
        required
        className="bg-zinc-100"
      />

      <Input
        label="Quantidade"
        name="quantity"
        type="number"
        value={seed.quantity}
        onChange={handleChange}
        required
        className="bg-zinc-100"
      />

      <Input
        label="Dias até Colheita"
        name="harvest_time"
        type="number"
        value={seed.harvest_time}
        onChange={handleChange}
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

export default SeedForm;