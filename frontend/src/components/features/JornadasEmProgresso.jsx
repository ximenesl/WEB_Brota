import React from 'react';

const JornadaItem = ({ title, current, total }) => {
  const progress = (current / total) * 100;
  return (
    <div className="self-stretch h-10 flex flex-col justify-start items-start gap-2">
      <div className="self-stretch h-6 inline-flex justify-between items-center">
        <div className="w-auto h-6 relative">
          <div className="left-0 top-[-2px] absolute justify-start text-neutral-950 text-base font-normal font-['Arimo'] leading-6">{title}</div>
        </div>
        <div className="w-auto h-5 relative">
          <div className="w-auto left-0 top-[-2px] absolute justify-start text-gray-600 text-sm font-normal font-['Arimo'] leading-5">{current}/{total} dias</div>
        </div>
      </div>
      <div className="self-stretch h-2 bg-gray-950/20 rounded-full flex flex-col justify-start items-start overflow-hidden">
        <div className="self-stretch h-2 relative bg-gray-950" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

const JornadasEmProgresso = ({ jornadas }) => {
  return (
    <div className="self-stretch h-96 inline-flex flex-col justify-start items-start">
      <div className="self-stretch self-stretch bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex flex-col justify-start items-start gap-6 p-6">
        <div className="w-full h-16 inline-flex flex-col justify-start items-start">
          <div className="w-full h-4 relative">
            <div className="left-0 top-[-2px] absolute justify-start text-neutral-950 text-base font-normal font-['Arimo'] leading-4">Jornadas em Progresso</div>
          </div>
          <div className="w-full h-6 relative">
            <div className="left-0 top-[-2px] absolute justify-start text-gray-500 text-base font-normal font-['Arimo'] leading-6">Acompanhe o desenvolvimento das suas sementes</div>
          </div>
        </div>
        <div className="w-full h-64 flex flex-col justify-start items-start gap-6">
          {jornadas.map((jornada, index) => (
            <JornadaItem key={index} {...jornada} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JornadasEmProgresso;
