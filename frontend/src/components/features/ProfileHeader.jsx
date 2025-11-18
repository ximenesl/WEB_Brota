import React from 'react';
import Button from '../common/Button';

const ProfileHeader = ({ user, onUpdatePhoto }) => {
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    const first = names[0]?.[0] || '';
    const last = names.length > 1 ? names[names.length - 1]?.[0] : '';
    return `${first}${last}`.toUpperCase();
  };

  return (
    <div className="pl-6 py-6 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex items-center gap-6">
      <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-normal font-['Arimo'] leading-8 flex-shrink-0">
        {getInitials(user?.name)}
      </div>
      <div className="flex-grow">
        <h2 className="text-base font-normal font-['Arimo'] leading-6 text-neutral-950">{user?.name}</h2>
        <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-600">{user?.email}</p>
        <p className="text-sm font-normal font-['Arimo'] leading-5 text-gray-500">Apaixonado por agricultura sustentável e cultivo orgânico.</p>
      </div>
      <Button onClick={onUpdatePhoto} variant="secondary" className="bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10">
        Alterar Foto
      </Button>
    </div>
  );
};

export default ProfileHeader;
