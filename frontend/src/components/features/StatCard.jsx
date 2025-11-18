import React from 'react';

const StatCard = ({ title, value, icon, bgColor, percentage, period }) => {
  return (
    <div className="bg-white rounded-2xl outline outline-1 outline-black/10 flex flex-col justify-start items-start gap-6 p-6">
      <div className="w-full h-16 inline-flex justify-between items-center">
        <div className="h-5 flex justify-start items-start">
          <div className="justify-start text-neutral-950 text-sm font-normal font-['Arimo'] leading-5">{title}</div>
        </div>
        <div className={`w-8 h-8 ${bgColor} rounded-full flex justify-center items-center`}>
          {icon}
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col justify-start items-start gap-1">
        <div className="self-stretch h-8 inline-flex justify-start items-start">
          <div className="flex-1 justify-start text-neutral-950 text-2xl font-normal font-['Arimo'] leading-8">{value}</div>
        </div>
        <div className="self-stretch h-4 inline-flex justify-start items-start">
          <div className="flex-1 justify-start text-gray-600 text-xs font-normal font-['Arimo'] leading-4">
            <span className="text-green-500">{percentage}</span> {period}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
