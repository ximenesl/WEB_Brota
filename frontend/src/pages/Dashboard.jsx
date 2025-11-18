import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/features/StatCard';
import JornadasEmProgresso from '../components/features/JornadasEmProgresso';
import AtividadesRecentes from '../components/features/AtividadesRecentes';
import { FiTrendingUp, FiPackage, FiCheckCircle, FiStar } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total de Sementes', value: '1,234', icon: <FiPackage className="text-white" />, bgColor: 'bg-green-500', percentage: '+12%', period: 'este mês' },
    { title: 'Sementes Plantadas', value: '856', icon: <FiTrendingUp className="text-white" />, bgColor: 'bg-blue-500', percentage: '+8%', period: 'este mês' },
    { title: 'Jornadas Ativas', value: '23', icon: <FiCheckCircle className="text-white" />, bgColor: 'bg-purple-500', percentage: '5 novas', period: 'esta semana' },
    { title: 'Taxa de Germinação', value: '87%', icon: <FiStar className="text-white" />, bgColor: 'bg-orange-500', percentage: '+3%', period: 'este mês' },
  ];

  const jornadas = [
    { title: 'Milho Crioulo', current: 105, total: 130 },
    { title: 'Milho Verde', current: 42, total: 95 },
    { title: 'Feijão Preto', current: 85, total: 90 },
    { title: 'Pimentão Vermelho', current: 24, total: 120 },
  ];

  const atividades = [
    { title: 'Tomate Cereja', type: 'Plantio', time: '2 horas atrás', statusColor: 'bg-green-500' },
    { title: 'Alface Romana', type: 'Germinação', time: '5 horas atrás', statusColor: 'bg-green-500' },
    { title: 'Manjericão', type: 'Rega', time: '1 dia atrás', statusColor: 'bg-blue-500' },
    { title: 'Cenoura', type: 'Colheita', time: '2 dias atrás', statusColor: 'bg-green-500' },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-normal font-['Arimo'] leading-9 text-neutral-950">Dashboard</h1>
        <p className="text-base font-normal font-['Arimo'] leading-6 text-gray-600">Bem-vindo ao sistema de gestão de sementes, {user?.name || 'Usuário'}!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <JornadasEmProgresso jornadas={jornadas} />
        <AtividadesRecentes atividades={atividades} />
      </div>
    </div>
  );
};

export default Dashboard;