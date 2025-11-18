import React from 'react';

const AtividadeItem = ({ title, type, time, statusColor }) => {
  return (
    <div className="self-stretch h-16 relative border-b border-gray-100">
      <div className={`w-2 h-2 left-0 top-[8px] absolute ${statusColor} rounded-full`} />
      <div className="w-96 h-12 left-[20px] top-0 absolute inline-flex flex-col justify-start items-start gap-1">
        <div className="self-stretch h-6 relative">
          <div className="left-0 top-[-2px] absolute justify-start text-neutral-950 text-base font-normal font-['Arimo'] leading-6">{title}</div>
        </div>
        <div className="self-stretch h-5 inline-flex justify-start items-start">
          <div className="flex-1 justify-start text-gray-600 text-sm font-normal font-['Arimo'] leading-5">{type}</div>
        </div>
      </div>
      <div className="w-auto h-5 left-auto right-0 top-0 absolute inline-flex justify-start items-start">
        <div className="justify-start text-gray-500 text-sm font-normal font-['Arimo'] leading-5">{time}</div>
      </div>
    </div>
  );
};

const AtividadesRecentes = ({ atividades }) => {
  return (
    <div className="w-full bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 p-6">
      <div className="w-full h-16 inline-flex flex-col justify-start items-start">
        <div className="w-full h-4 relative">
          <div className="left-0 top-[-2px] absolute justify-start text-neutral-950 text-base font-normal font-['Arimo'] leading-4">Atividades Recentes</div>
        </div>
        <div className="w-full h-6 relative">
          <div className="left-0 top-[-2px] absolute justify-start text-gray-500 text-base font-normal font-['Arimo'] leading-6">Últimas atualizações do sistema</div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-4 mt-8">
        {atividades.map((atividade, index) => (
          <AtividadeItem key={index} {...atividade} />
        ))}
      </div>
    </div>
  );
};

export default AtividadesRecentes;
