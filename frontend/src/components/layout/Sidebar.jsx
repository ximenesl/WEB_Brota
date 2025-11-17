import { NavLink } from 'react-router-dom';
import { FiGrid, FiList, FiUser, FiLogOut, FiArchive, FiTruck } from 'react-icons/fi';
import logo from '../../assets/Logo.png';

const navLinks = [
  { to: '/dashboard', icon: <FiGrid />, label: 'Dashboard' },
  { to: '/sementes', icon: <FiList />, label: 'Gestão de Sementes' },
  { to: '/armazem', icon: <FiArchive />, label: 'Armazéns' },
  { to: '/fornecedor', icon: <FiTruck />, label: 'Fornecedores' },
  { to: '/perfil', icon: <FiUser />, label: 'Perfil' },
];

const Sidebar = () => {
  const navLinkClasses = "flex items-center gap-3 p-3 rounded-lg text-secondary-text font-medium transition-colors hover:bg-input-background hover:text-dark-text";
  const activeNavLinkClasses = "bg-primary text-white";

  return (
    <aside className="flex flex-col w-64 h-screen fixed top-0 left-0 bg-white border-r border-border-light p-6">
      <div className="h-[75px] mb-6 flex justify-center items-center">
        <img src={logo} alt="Brota Logo" className="max-h-full w-auto" />
      </div>
      <nav className="flex-grow flex flex-col">
        <ul className="list-none m-0 p-0 flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
                }
              >
                <span className="w-5 h-5">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <button className="flex items-center gap-3 p-3 rounded-lg text-secondary-text font-medium transition-colors mt-auto w-full hover:bg-input-background hover:text-dark-text">
          <span className="w-5 h-5"><FiLogOut /></span>
          <span>Sair</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
