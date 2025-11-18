import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

const InformacoesPessoais = ({ user, onUpdate }) => {
  const { loading } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    telefone: user?.telefone || '',
    localizacao: user?.localizacao || '',
    bio: user?.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(user.id, formData);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Falha ao atualizar o perfil.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 p-6">
      <div className="border-b border-black/10 pb-6 mb-6">
        <h3 className="text-base font-normal font-['Arimo'] leading-4 text-neutral-950">Informações Pessoais</h3>
        <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-500">Atualize suas informações de perfil</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Nome Completo" name="name" value={formData.name} onChange={handleChange} className="bg-zinc-100" />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} className="bg-zinc-100" />
        <Input label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} className="bg-zinc-100" />
        <Input label="Localização" name="localizacao" value={formData.localizacao} onChange={handleChange} className="bg-zinc-100" />
      </div>
      <div className="mt-6">
        <Input label="Bio" name="bio" value={formData.bio} onChange={handleChange} className="bg-zinc-100" />
      </div>
      <div className="flex justify-end mt-6">
        <Button type="submit" className="bg-gray-950 rounded-lg" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  );
};

export default InformacoesPessoais;