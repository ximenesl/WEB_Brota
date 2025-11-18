import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import logo from '../assets/Logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Falha ao fazer login.');
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
              Insira suas credenciais para acessar o sistema
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
              {error && <p className="text-[#D90000] text-sm text-center mt-2">{error}</p>}
            </form>
            <p className="mt-6 text-center text-secondary-text">
              Não tem uma conta? <Link to="/cadastro" className="text-primary font-medium no-underline hover:underline">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;