import { useState, useEffect } from 'react';
import { useFornecedor } from '../hooks/useFornecedor';
import FornecedorCard from '../components/features/FornecedorCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import FornecedorForm from '../components/features/FornecedorForm';
import { FiPlus, FiSearch } from 'react-icons/fi';

const GestaoFornecedor = () => {
  const { fornecedores, loading, fetchFornecedores, deleteFornecedor, addFornecedor, updateFornecedor } = useFornecedor();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState(null);

  useEffect(() => {
    fetchFornecedores();
  }, [fetchFornecedores]);

  const handleEdit = (fornecedor) => {
    setEditingFornecedor(fornecedor);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      await deleteFornecedor(id);
    }
  };

  const handleFormSubmit = async (fornecedorData) => {
    if (editingFornecedor) {
      await updateFornecedor(editingFornecedor.id, fornecedorData);
    } else {
      await addFornecedor(fornecedorData);
    }
    setIsModalOpen(false);
    setEditingFornecedor(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFornecedor(null);
  };

  const filteredFornecedores = fornecedores.filter((fornecedor) =>
    fornecedor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-normal font-['Arimo'] leading-9 text-neutral-950">Gestão de Fornecedores</h1>
          <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-600">Gerencie seus fornecedores</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-gray-950 rounded-lg">
          <FiPlus className="w-4 h-4" />
          Adicionar Fornecedor
        </Button>
      </div>

      <div className="mb-6">
        <Input
          icon={<FiSearch />}
          type="text"
          placeholder="Buscar fornecedores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-zinc-100"
        />
      </div>

      {loading && <p className="text-center p-12">Carregando...</p>}

      {!loading && filteredFornecedores.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFornecedores.map((fornecedor) => (
            <FornecedorCard
              key={fornecedor.id}
              fornecedor={fornecedor}
              onEdit={() => handleEdit(fornecedor)}
              onDelete={() => handleDelete(fornecedor.id)}
            />
          ))}
        </div>
      )}

      {!loading && filteredFornecedores.length === 0 && (
        <p>Nenhum fornecedor encontrado.</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <FornecedorForm
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            initialData={editingFornecedor}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
};

export default GestaoFornecedor;