import { LayoutDashboard, Warehouse, Users, Sprout, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../shared/components/ui/button';
import { Avatar, AvatarFallback } from '../shared/components/ui/avatar';
import type { User as UserType } from '../App';
import logo from '../assets/images/logoBrota.png';

interface SidebarProps {
  onLogout: () => void;
  user: UserType;
}

export function Sidebar({ onLogout, user }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/warehouses', label: 'Armazéns', icon: Warehouse },
    { to: '/suppliers', label: 'Fornecedores', icon: Users },
    { to: '/seeds', label: 'Sementes', icon: Sprout },
    { to: '/profile', label: 'Perfil', icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <img
          src={logo}
          alt="Brota - Sistema de Sementes"
          className="h-12"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3 p-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gray-900 text-white text-sm">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-900 truncate font-medium">{user.name}</div>
            <div className="text-xs text-gray-500 truncate">{user.email}</div>
          </div>
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full justify-start text-gray-600 hover:text-gray-900 border-gray-200"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </aside>
  );
}