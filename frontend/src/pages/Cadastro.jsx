import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import logo from '../assets/Logo.png';

const Cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) => {
      setError(err.message || 'Falha ao criar conta.');
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1523901102639-0834861a70b2?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="w-1/2 flex flex-col justify-center items-center p-12">
        <div className="w-96 bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] border border-black/10">
          <div className="p-8">
            <img className="w-80 h-40 mx-auto" src={logo} alt="Brota Logo" />
            <div className="text-center text-gray-500 text-base font-normal font-['Arimo'] leading-6 mb-8">
              Crie sua conta para começar a gerenciar suas sementes
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Nome Completo"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-zinc-100"
              />
              <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-100"
              />
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-100"
              />
              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Criando...' : 'Criar Conta'}
              </Button>
              {error && <p className="text-[#D90000] text-sm text-center mt-2">{error}</p>}
            </form>
            <p className="mt-6 text-center text-secondary-text">
              Já tem uma conta? <Link to="/login" className="text-primary font-medium no-underline hover:underline">Faça login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;