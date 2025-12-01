import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../shared/components/ui/button';
import { Input } from '../shared/components/ui/input';
import logo from '../assets/images/logoBrota.png';
import backgroundImage from '../assets/images/campo3.png';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={backgroundImage}
          alt="Agriculture Field"
          className="absolute inset-0 w-full h-full object-cover"
        />

      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <img
              src={logo}
              alt="Brota - Sistema de Sementes"
              className="h-16 mb-6"
            />
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <p className="text-gray-600">
              Insira suas credenciais para acessar o sistema
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-700 font-medium">Email</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700 font-medium">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              Entrar
            </Button>

            <div className="text-center">
              <Link
                to="/register"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Não tem uma conta? <span className="font-medium underline">Cadastre-se</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}