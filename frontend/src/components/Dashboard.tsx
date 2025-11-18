import { Warehouse, Users, Sprout, Package, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import type { User } from '../App';

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const stats = [
    {
      title: 'Total de Sementes',
      value: '15.420',
      change: '+12%',
      icon: Sprout,
    },
    {
      title: 'Armazéns Ativos',
      value: '8',
      change: '+2 novos',
      icon: Warehouse,
    },
    {
      title: 'Fornecedores',
      value: '24',
      change: '+4 este mês',
      icon: Users,
    },
    {
      title: 'Estoque Total',
      value: '8.750 kg',
      change: '-5% vs mês anterior',
      icon: Package,
    },
  ];

  const seedsByType = [
    { name: 'Milho', quantidade: 4200 },
    { name: 'Soja', quantidade: 3800 },
    { name: 'Trigo', quantidade: 2900 },
    { name: 'Arroz', quantidade: 2100 },
    { name: 'Feijão', quantidade: 1800 },
    { name: 'Outros', quantidade: 620 },
  ];

  const monthlyData = [
    { mes: 'Jan', entrada: 1200, saida: 800 },
    { mes: 'Fev', entrada: 1500, saida: 900 },
    { mes: 'Mar', entrada: 1800, saida: 1200 },
    { mes: 'Abr', entrada: 1300, saida: 1100 },
    { mes: 'Mai', entrada: 2000, saida: 1400 },
    { mes: 'Jun', entrada: 1700, saida: 1300 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-1">Bem-vindo, {user.name}</h1>
        <p className="text-gray-500">Aqui está um resumo da sua gestão de sementes</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card key={index} className="border-gray-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="border-gray-100">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-1">Sementes por Tipo</h3>
              <p className="text-sm text-gray-500">Distribuição do estoque atual</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={seedsByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="quantidade" fill="#111827" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="border-gray-100">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-1">Movimentação de Estoque</h3>
              <p className="text-sm text-gray-500">Entradas e saídas em kg</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="mes" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                  iconType="circle"
                />
                <Line 
                  type="monotone" 
                  dataKey="entrada" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  name="Entrada"
                />
                <Line 
                  type="monotone" 
                  dataKey="saida" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b', r: 4 }}
                  name="Saída"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
