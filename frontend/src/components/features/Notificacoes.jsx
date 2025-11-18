import React, { useState } from 'react';
import Button from '../common/Button';
import Toggle from '../common/Toggle';

const Notificacoes = () => {
  const [prefs, setPrefs] = useState({
    email: true,
    push: true,
    weeklyReport: false,
    harvestReminders: true,
  });

  const handleToggle = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving notification preferences:', prefs);
    alert('Preferências de notificação salvas com sucesso! (mock)');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 p-6">
      <div className="border-b border-black/10 pb-6 mb-6">
        <h3 className="text-base font-normal font-['Arimo'] leading-4 text-neutral-950">Preferências de Notificação</h3>
        <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-500">Gerencie como você recebe notificações</p>
      </div>
      <div className="flex flex-col gap-6">
        <Toggle
          label="Notificações por Email"
          description="Receba atualizações importantes por email"
          enabled={prefs.email}
          onToggle={() => handleToggle('email')}
        />
        <Toggle
          label="Notificações Push"
          description="Receba notificações no navegador"
          enabled={prefs.push}
          onToggle={() => handleToggle('push')}
        />
        <Toggle
          label="Relatório Semanal"
          description="Receba um resumo semanal das suas atividades"
          enabled={prefs.weeklyReport}
          onToggle={() => handleToggle('weeklyReport')}
        />
        <Toggle
          label="Lembretes de Colheita"
          description="Receba lembretes quando suas sementes estiverem prontas"
          enabled={prefs.harvestReminders}
          onToggle={() => handleToggle('harvestReminders')}
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button type="submit" className="bg-gray-950 rounded-lg">
          Salvar Preferências
        </Button>
      </div>
    </form>
  );
};

export default Notificacoes;
