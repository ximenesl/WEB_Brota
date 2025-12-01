import { useState, useEffect } from 'react';
import { Warehouse, Users, Sprout, Package, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '../shared/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import type { User } from '../App';
import api from '../services/api';

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const [stats, setStats] = useState({
    totalSementes: 0,
    armazensAtivos: 0,
    fornecedores: 0,
    estoqueTotal: 0,
  });
  const [seedsByType, setSeedsByType] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sementesRes, armazemRes, fornecedorRes] = await Promise.all([
          api.get('/sementes'),
          api.get('/armazem'),
          api.get('/fornecedor'),
        ]);

        const totalSementes = sementesRes.data.length;
        const estoqueTotal = sementesRes.data.reduce((acc, s) => acc + s.quantity, 0);

        setStats({
          totalSementes,
          armazensAtivos: armazemRes.data.length,
          fornecedores: fornecedorRes.data.length,
          estoqueTotal,
        });

        const sementesPorTipo = sementesRes.data.reduce((acc, s) => {
          const tipo = s.name;
          if (!acc[tipo]) {
            acc[tipo] = 0;
          }
          acc[tipo] += s.quantity;
          return acc;
        }, {});

        setSeedsByType(Object.entries(sementesPorTipo).map(([name, quantidade]) => ({ name, quantidade })));
        
        // Mock monthly data for now
        setMonthlyData([
          { mes: 'Jan', entrada: 1200, saida: 800 },
          { mes: 'Fev', entrada: 1500, saida: 900 },
          { mes: 'Mar', entrada: 1800, saida: 1200 },
          { mes: 'Abr', entrada: 1300, saida: 1100 },
          { mes: 'Mai', entrada: 2000, saida: 1400 },
          { mes: 'Jun', entrada: 1700, saida: 1300 },
        ]);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);
  
  const statsCards = [
    {
      title: 'Total de Sementes',
      value: stats.totalSementes.toLocaleString(),
      icon: Sprout,
    },
    {
      title: 'Armazéns Ativos',
      value: stats.armazensAtivos,
      icon: Warehouse,
    },
    {
      title: 'Fornecedores',
      value: stats.fornecedores,
      icon: Users,
    },
    {
      title: 'Estoque Total',
      value: stats.estoqueTotal.toLocaleString(),
      icon: Package,
    },
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
        {statsCards.map((stat, index) => {
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
