import { FiEdit, FiTrash2, FiArchive } from 'react-icons/fi';

const ArmazemCard = ({ armazem, onEdit, onDelete }) => {
  const { name, location, manager } = armazem;

  return (
    <div className="bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-[10px] flex justify-center items-center">
            <FiArchive className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-normal font-['Arimo'] leading-6 text-neutral-950">{name}</h3>
            <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-500">{location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-normal font-['Arimo'] leading-5">Responsável:</span>
            <span className="text-neutral-950 text-base font-normal font-['Arimo'] leading-6">{manager}</span>
          </div>
        </div>
        <div className="flex justify-start items-start gap-2 pt-2 mt-4 border-t border-gray-100">
          <button onClick={onEdit} className="flex-1 h-8 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center gap-2">
            <FiEdit className="w-4 h-4" />
            <span className="text-neutral-950 text-sm font-normal font-['Arimo'] leading-5">Editar</span>
          </button>
          <button onClick={onDelete} className="flex-1 h-8 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center gap-2">
            <FiTrash2 className="w-4 h-4" />
            <span className="text-neutral-950 text-sm font-normal font-['Arimo'] leading-5">Excluir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArmazemCard;
