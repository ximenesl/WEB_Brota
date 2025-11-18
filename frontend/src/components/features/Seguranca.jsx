import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const Seguranca = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('A nova senha e a confirmação não correspondem.');
      return;
    }
    console.log('Changing password...');
    alert('Senha alterada com sucesso! (mock)');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 p-6">
      <div className="border-b border-black/10 pb-6 mb-6">
        <h3 className="text-base font-normal font-['Arimo'] leading-4 text-neutral-950">Segurança</h3>
        <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-500">Gerencie suas configurações de segurança</p>
      </div>
      <div className="flex flex-col gap-6">
        <Input label="Senha Atual" name="current" type="password" value={passwords.current} onChange={handleChange} placeholder="Digite sua senha atual" className="bg-zinc-100" />
        <Input label="Nova Senha" name="new" type="password" value={passwords.new} onChange={handleChange} placeholder="Digite sua nova senha" className="bg-zinc-100" />
        <Input label="Confirmar Nova Senha" name="confirm" type="password" value={passwords.confirm} onChange={handleChange} placeholder="Confirme sua nova senha" className="bg-zinc-100" />
      </div>
      <div className="flex justify-end mt-6">
        <Button type="submit" className="bg-gray-950 rounded-lg">
          Alterar Senha
        </Button>
      </div>
    </form>
  );
};

export default Seguranca;
