import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const FornecedorForm = ({ onSubmit, onCancel, initialData, loading }) => {
  const [fornecedor, setFornecedor] = useState({
    nome: '',
    CNPJCPF: '',
    endereco: '',
    telefone: '',
    email: '',
    produtos: '',
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-white border border-border-color rounded-[14px] max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className="text-sm font-medium text-dark-text">Nome do Fornecedor</label>
        <Input id="nome" name="nome" value={fornecedor.nome} onChange={handleChange} required />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="CNPJCPF" className="text-sm font-medium text-dark-text">CNPJ/CPF</label>
        <Input id="CNPJCPF" name="CNPJCPF" value={fornecedor.CNPJCPF} onChange={handleChange} required />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="endereco" className="text-sm font-medium text-dark-text">Endereço</label>
        <Input id="endereco" name="endereco" value={fornecedor.endereco} onChange={handleChange} required />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="telefone" className="text-sm font-medium text-dark-text">Telefone</label>
        <Input id="telefone" name="telefone" value={fornecedor.telefone} onChange={handleChange} required />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-dark-text">Email</label>
        <Input id="email" name="email" type="email" value={fornecedor.email} onChange={handleChange} required />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="produtos" className="text-sm font-medium text-dark-text">Produtos</label>
        <Input id="produtos" name="produtos" value={fornecedor.produtos} onChange={handleChange} required />
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Adicionar Fornecedor')}
        </Button>
      </div>
    </form>
  );
};

export default FornecedorForm;
