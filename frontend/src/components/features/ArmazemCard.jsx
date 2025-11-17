import { FiEdit, FiTrash2, FiArchive } from 'react-icons/fi';

const ArmazemCard = ({ armazem, onEdit, onDelete }) => {
  const { nome, localização, responsável } = armazem;

  return (
    <div className="bg-white border border-border-color rounded-[14px] p-6 flex flex-col gap-4 transition-shadow duration-200 ease-in-out hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="bg-[#E0E7FF] text-[#4F46E5] rounded-[10px] w-10 h-10 flex items-center justify-center flex-shrink-0">
          <FiArchive className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-dark-text">{nome}</h3>
          <p className="text-sm text-secondary-text">{localização}</p>
        </div>
      </div>
      <div className="text-sm text-secondary-text">
        <strong>Responsável:</strong> {responsável}
      </div>
      <div className="mt-auto pt-4 border-t border-border-light flex justify-end gap-2">
        <button onClick={onEdit} aria-label={`Editar ${nome}`} className="p-2 rounded-lg text-secondary-text transition-colors hover:bg-input-background hover:text-dark-text">
          <FiEdit />
        </button>
        <button onClick={onDelete} aria-label={`Excluir ${nome}`} className="p-2 rounded-lg text-secondary-text transition-colors hover:bg-input-background hover:text-dark-text">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default ArmazemCard;
