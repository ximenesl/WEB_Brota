import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const FornecedorForm = ({ onSubmit, onCancel, initialData, loading }) => {
  const [fornecedor, setFornecedor] = useState({
    name: '',
    cnpj: '',
    address: '',
    phone: '',
    email: '',
    products: '',
  });

  const isEditMode = !!initialData;

  useEffect(() => {
    if (isEditMode) {
      setFornecedor(initialData);
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(fornecedor);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="text-lg font-bold font-['Arimo'] leading-4 text-neutral-950">
        {isEditMode ? 'Editar Fornecedor' : 'Novo Fornecedor'}
      </div>
      <div className="text-sm font-normal font-['Arimo'] leading-5 text-gray-500">
        {isEditMode ? 'Atualize os detalhes do fornecedor' : 'Adicione um novo fornecedor ao inventário'}
      </div>
      
      <Input
        label="Nome"
        name="name"
        value={fornecedor.name}
        onChange={handleChange}
        placeholder="Nome do fornecedor"
        required
        className="bg-zinc-100"
      />
      
      <Input
        label="CNPJ/CPF"
        name="cnpj"
        value={fornecedor.cnpj}
        onChange={handleChange}
        placeholder="CNPJ ou CPF do fornecedor"
        required
        className="bg-zinc-100"
      />

      <Input
        label="Endereço"
        name="address"
        value={fornecedor.address}
        onChange={handleChange}
        placeholder="Endereço do fornecedor"
        required
        className="bg-zinc-100"
      />

      <Input
        label="Telefone"
        name="phone"
        value={fornecedor.phone}
        onChange={handleChange}
        placeholder="Telefone do fornecedor"
        required
        className="bg-zinc-100"
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={fornecedor.email}
        onChange={handleChange}
        placeholder="Email do fornecedor"
        required
        className="bg-zinc-100"
      />

      <Input
        label="Produtos"
        name="products"
        value={fornecedor.products}
        onChange={handleChange}
        placeholder="Produtos fornecidos"
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

export default FornecedorForm;