import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 w-[calc(100%-256px)] min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
