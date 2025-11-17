import { useAuth } from '../hooks/useAuth';
import { FiTrendingUp, FiPackage, FiCheckCircle, FiStar } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Sementes Ativas', value: '12', icon: <FiPackage /> },
    { title: 'Taxa de Germinação', value: '87%', icon: <FiTrendingUp /> },
    { title: 'Colheitas Concluídas', value: '34', icon: <FiCheckCircle /> },
    { title: 'Novas Avaliações', value: '5', icon: <FiStar /> },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-normal mb-1">Bem-vindo, {user?.name || 'Usuário'}!</h1>
        <p className="text-secondary-text">Aqui está um resumo da sua horta.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-border-color rounded-[14px] p-6 flex items-start gap-4">
                <div className="bg-[#E6F6EC] text-primary rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="w-6 h-6">{stat.icon}</span>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-dark-text">{stat.value}</h3>
                    <p className="text-sm text-secondary-text">{stat.title}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-border-color rounded-[14px] p-6 min-h-[300px] flex items-center justify-center text-secondary-text italic">
            Gráfico de Atividade (Placeholder)
        </div>
        <div className="bg-white border border-border-color rounded-[14px] p-6 min-h-[300px] flex items-center justify-center text-secondary-text italic">
            Resumo de Categorias (Placeholder)
        </div>
        <div className="bg-white border border-border-color rounded-[14px] p-6 min-h-[300px] flex items-center justify-center text-secondary-text italic">
            Outro Gráfico (Placeholder)
        </div>
      </div>
    </div>
  );
};

export default Dashboard;