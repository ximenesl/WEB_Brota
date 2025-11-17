import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Perfil = () => {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    telefone: '+55 (11) 98765-4321', // mock
    localizacao: 'São Paulo, SP', // mock
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would call a service to update the user profile.
    console.log('Updating profile with:', formData);
    alert('Perfil atualizado com sucesso! (mock)');
  };

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    const first = names[0]?.[0] || '';
    const last = names.length > 1 ? names[names.length - 1]?.[0] : '';
    return `${first}${last}`.toUpperCase();
  }

  return (
    <div>
        <div className="bg-white border border-border-color rounded-[14px] p-6 flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-semibold flex-shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="flex-grow">
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-secondary-text">{user?.email}</p>
            </div>
            <Button variant="secondary">Alterar Foto</Button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-border-color rounded-[14px]">
            <div className="p-6 border-b border-border-light">
                <h3 className="text-lg font-semibold">Informações Pessoais</h3>
                <p className="text-secondary-text text-sm">Atualize suas informações de perfil.</p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-dark-text">Nome Completo</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-dark-text">Email</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="telefone" className="text-sm font-medium text-dark-text">Telefone</label>
                    <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="localizacao" className="text-sm font-medium text-dark-text">Localização</label>
                    <Input id="localizacao" name="localizacao" value={formData.localizacao} onChange={handleChange} />
                </div>
            </div>
            <div className="p-4 px-6 border-t border-border-light flex justify-end">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
            </div>
        </form>
    </div>
  );
};

export default Perfil;
