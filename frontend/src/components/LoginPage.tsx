import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/9d8b431034ecb5072aecc352eeb853907fab1063.png';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image with Organic Shapes */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1717885738221-e98064d1ee61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFncmljdWx0dXJlJTIwZmllbGQlMjByb3dzfGVufDF8fHx8MTc2MzQzNjk5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Agriculture Field"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Organic Shapes Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute -left-20 top-0 h-full w-auto" viewBox="0 0 400 800" fill="none">
            <path d="M0 0 Q150 200 200 400 T 200 800 L0 800 Z" fill="white" fillOpacity="0.15"/>
          </svg>
          <svg className="absolute left-32 -top-32 w-96 h-96" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="3" fill="none" opacity="0.3"/>
          </svg>
          <svg className="absolute left-0 top-1/4 w-64 h-64" viewBox="0 0 200 200">
            <circle cx="0" cy="100" r="100" stroke="white" strokeWidth="3" fill="none" opacity="0.25"/>
          </svg>
          <svg className="absolute left-40 bottom-0 w-80 h-80" viewBox="0 0 200 200">
            <path d="M0 200 Q50 50 200 0 L200 200 Z" fill="white" fillOpacity="0.1"/>
          </svg>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <ImageWithFallback
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
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Não tem uma conta? <span className="font-medium underline">Cadastre-se</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}