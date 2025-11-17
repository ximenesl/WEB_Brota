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
    } catch (err) {
      setError(err.message || 'Falha ao criar conta.');
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white">
      <div className="w-1/2 bg-[url('https://images.unsplash.com/photo-1523901102639-0834861a70b2?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center relative before:content-[''] before:absolute before:inset-0 before:bg-black/30" />
      <div className="w-1/2 flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md flex flex-col">
          <img src={logo} alt="Brota Logo" className="w-[150px] mb-6 self-center" />
          <h1 className="text-2xl font-semibold mb-2 text-dark-text text-center">Crie sua conta</h1>
          <p className="text-base mb-8 text-secondary-text text-center">Junte-se à nossa comunidade</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
  );
};

export default Cadastro;
