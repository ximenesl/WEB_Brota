import React from 'react';

const StatItem = ({ value, label }) => (
  <div className="bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex-1 px-6 pt-6 flex flex-col justify-start items-center gap-2">
    <div className="text-green-600 text-2xl font-normal font-['Arimo'] leading-8">{value}</div>
    <div className="text-gray-600 text-sm font-normal font-['Arimo'] leading-5">{label}</div>
  </div>
);

const ProfileStats = ({ stats }) => {
  return (
    <div className="flex justify-start items-start gap-6">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
};

export default ProfileStats;
