import { FiEdit, FiTrash2, FiPackage } from 'react-icons/fi';
import Badge from '../common/Badge';

const SeedCard = ({ seed, onEdit, onDelete }) => {
  const { name, category, quantity, status, harvestDate, image } = seed;

  return (
    <div className="bg-white border border-border-color rounded-[14px] overflow-hidden flex flex-col transition-shadow duration-200 ease-in-out hover:shadow-lg">
      <img src={image} alt={name} className="w-full h-[180px] object-cover" />
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-[#DCFCE7] text-primary rounded-[10px] w-8 h-8 flex items-center justify-center">
              <FiPackage className="w-[18px] h-[18px]" />
            </div>
            <h3 className="text-lg font-semibold text-dark-text">{name}</h3>
          </div>
          <Badge>{status}</Badge>
        </div>
        <p className="text-sm text-secondary-text mb-4">{category}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-sm">
            <strong className="text-dark-text block mb-0.5">Quantidade</strong>
            <span className="text-secondary-text">{quantity}</span>
          </div>
          <div className="text-sm">
            <strong className="text-dark-text block mb-0.5">Próx. Colheita</strong>
            <span className="text-secondary-text">{new Date(harvestDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-border-light flex justify-end gap-2">
          <button onClick={onEdit} aria-label={`Editar ${name}`} className="flex items-center justify-center p-2 rounded-lg text-secondary-text transition-colors hover:bg-input-background hover:text-dark-text">
            <FiEdit className="w-4 h-4" />
          </button>
          <button onClick={onDelete} aria-label={`Excluir ${name}`} className="flex items-center justify-center p-2 rounded-lg text-secondary-text transition-colors hover:bg-input-background hover:text-dark-text">
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeedCard;
