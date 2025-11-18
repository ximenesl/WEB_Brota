import { useState } from 'react';
import { useSeeds } from '../hooks/useSeeds';
import SeedCard from '../components/features/SeedCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import SeedForm from '../components/features/SeedForm';
import { FiPlus, FiSearch } from 'react-icons/fi';

const GestaoSementes = () => {
  const { seeds, loading, deleteSeed, addSeed, updateSeed } = useSeeds();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeed, setEditingSeed] = useState(null);

  const handleEdit = (seed) => {
    setEditingSeed(seed);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta semente?')) {
      await deleteSeed(id);
    }
  };

  const handleFormSubmit = async (seedData) => {
    if (editingSeed) {
      await updateSeed(editingSeed.id, seedData);
    } else {
      await addSeed(seedData);
    }
    setIsModalOpen(false);
    setEditingSeed(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSeed(null);
  };

  const filteredSeeds = seeds.filter((seed) =>
    seed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-normal font-['Arimo'] leading-9 text-neutral-950">Gestão de Sementes</h1>
          <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-600">Gerencie seu inventário de sementes</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-gray-950 rounded-lg">
          <FiPlus className="w-4 h-4" />
          Adicionar Semente
        </Button>
      </div>

      <div className="mb-6">
        <Input
          icon={<FiSearch />}
          type="text"
          placeholder="Buscar sementes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-zinc-100"
        />
      </div>

      {loading && <p className="text-center p-12">Carregando sementes...</p>}

      {!loading && filteredSeeds.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeeds.map((seed) => (
            <SeedCard
              key={seed.id}
              seed={seed}
              onEdit={() => handleEdit(seed)}
              onDelete={() => handleDelete(seed.id)}
            />
          ))}
        </div>
      )}

      {!loading && filteredSeeds.length === 0 && (
        <p>Nenhuma semente encontrada.</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <SeedForm
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            initialSeed={editingSeed}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
};

export default GestaoSementes;