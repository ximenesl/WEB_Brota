import { useState, useEffect } from 'react';
import { useArmazem } from '../hooks/useArmazem';
import ArmazemCard from '../components/features/ArmazemCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import ArmazemForm from '../components/features/ArmazemForm';
import { FiPlus, FiSearch } from 'react-icons/fi';

const GestaoArmazem = () => {
  const { armazens, loading, fetchArmazens, deleteArmazem, addArmazem, updateArmazem } = useArmazem();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArmazem, setEditingArmazem] = useState(null);

  useEffect(() => {
    fetchArmazens();
  }, [fetchArmazens]);

  const handleEdit = (armazem) => {
    setEditingArmazem(armazem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este armazém?')) {
      await deleteArmazem(id);
    }
  };

  const handleFormSubmit = async (armazemData) => {
    if (editingArmazem) {
      await updateArmazem(editingArmazem.id, armazemData);
    } else {
      await addArmazem(armazemData);
    }
    setIsModalOpen(false);
    setEditingArmazem(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArmazem(null);
  };

  const filteredArmazens = armazens.filter((armazem) =>
    armazem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-normal font-['Arimo'] leading-9 text-neutral-950">Gestão de Armazéns</h1>
          <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-600">Gerencie seus armazéns</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-gray-950 rounded-lg">
          <FiPlus className="w-4 h-4" />
          Adicionar Armazém
        </Button>
      </div>

      <div className="mb-6">
        <Input
          icon={<FiSearch />}
          type="text"
          placeholder="Buscar armazéns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-zinc-100"
        />
      </div>

      {loading && <p className="text-center p-12">Carregando...</p>}

      {!loading && filteredArmazens.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArmazens.map((armazem) => (
            <ArmazemCard
              key={armazem.id}
              armazem={armazem}
              onEdit={() => handleEdit(armazem)}
              onDelete={() => handleDelete(armazem.id)}
            />
          ))}
        </div>
      )}

      {!loading && filteredArmazens.length === 0 && (
        <p>Nenhum armazém encontrado.</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ArmazemForm
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            initialData={editingArmazem}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
};

export default GestaoArmazem;