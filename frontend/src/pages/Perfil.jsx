import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ProfileHeader from '../components/features/ProfileHeader';
import ProfileStats from '../components/features/ProfileStats';
import InformacoesPessoais from '../components/features/InformacoesPessoais';
import Notificacoes from '../components/features/Notificacoes';
import Seguranca from '../components/features/Seguranca';

const Perfil = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('info');

  const stats = [
    { value: '24', label: 'Sementes Cadastradas' },
    { value: '8', label: 'Jornadas Ativas' },
    { value: '15', label: 'Colheitas Realizadas' },
    { value: '87%', label: 'Taxa de Sucesso' },
  ];

  const handleUpdatePhoto = () => {
    alert('Funcionalidade de alterar foto ainda não implementada.');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <InformacoesPessoais user={user} onUpdate={updateUser} />;
      case 'notifications':
        return <Notificacoes />;
      case 'security':
        return <Seguranca />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-normal font-['Arimo'] leading-9 text-neutral-950">Perfil</h1>
        <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-600">Gerencie suas informações pessoais e preferências</p>
      </div>
      <div className="mb-6">
        <ProfileHeader user={user} onUpdatePhoto={handleUpdatePhoto} />
      </div>
      <div className="mb-8">
        <ProfileStats stats={stats} />
      </div>
      
      <div className="flex justify-start items-start gap-2 mb-8">
        <button onClick={() => setActiveTab('info')} className={`px-4 py-2 rounded-lg ${activeTab === 'info' ? 'bg-white' : 'bg-transparent'}`}>
          Informações Pessoais
        </button>
        <button onClick={() => setActiveTab('notifications')} className={`px-4 py-2 rounded-lg ${activeTab === 'notifications' ? 'bg-white' : 'bg-transparent'}`}>
          Notificações
        </button>
        <button onClick={() => setActiveTab('security')} className={`px-4 py-2 rounded-lg ${activeTab === 'security' ? 'bg-white' : 'bg-transparent'}`}>
          Segurança
        </button>
      </div>

      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Perfil;