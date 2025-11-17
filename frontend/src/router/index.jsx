import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import MainLayout from '../components/layout/MainLayout';

// Pages
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import GestaoSementes from '../pages/GestaoSementes';
import AdicionarSemente from '../pages/AdicionarSemente';
import EditarSemente from '../pages/EditarSemente';
import Perfil from '../pages/Perfil';
import GestaoArmazem from '../pages/GestaoArmazem';
import AdicionarArmazem from '../pages/AdicionarArmazem';
import EditarArmazem from '../pages/EditarArmazem';
import GestaoFornecedor from '../pages/GestaoFornecedor';
import AdicionarFornecedor from '../pages/AdicionarFornecedor';
import EditarFornecedor from '../pages/EditarFornecedor';

// A wrapper for routes that require authentication.
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }
  
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page.
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes within the main layout.
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/',
    element: <Login />, // Temporarily render Login directly
  },
  {
    path: '/dashboard', // Move dashboard outside of the root protected route for now
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />, // Dashboard will be the default protected route
      },
      {
        path: 'sementes',
        element: <GestaoSementes />,
      },
      {
        path: 'sementes/adicionar',
        element: <AdicionarSemente />,
      },
      {
        path: 'sementes/editar/:id',
        element: <EditarSemente />,
      },
      {
        path: 'armazem',
        element: <GestaoArmazem />,
      },
      {
        path: 'armazem/adicionar',
        element: <AdicionarArmazem />,
      },
      {
        path: 'armazem/editar/:id',
        element: <EditarArmazem />,
      },
      {
        path: 'fornecedor',
        element: <GestaoFornecedor />,
      },
      {
        path: 'fornecedor/adicionar',
        element: <AdicionarFornecedor />,
      },
      {
        path: 'fornecedor/editar/:id',
        element: <EditarFornecedor />,
      },
      {
        path: 'perfil',
        element: <Perfil />,
      },
    ],
  },
  // Fallback route for any other path
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

export default router;
