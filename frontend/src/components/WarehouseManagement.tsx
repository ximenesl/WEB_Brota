import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import api from '../services/api';

interface Armazem {
  id: number;
  nome: string;
  localizacao: string;
  responsavel: string;
}

export function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState<Armazem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Armazem | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    localizacao: '',
    responsavel: '',
  });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await api.get('/armazem');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
    }
  };

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingWarehouse) {
        await api.put('/armazem', { ...formData, id: editingWarehouse.id });
      } else {
        await api.post('/armazem', formData);
      }
      fetchWarehouses();
      setIsDialogOpen(false);
      setEditingWarehouse(null);
      setFormData({ nome: '', localizacao: '', responsavel: '' });
    } catch (error) {
      console.error('Failed to save warehouse:', error);
    }
  };

  const handleEdit = (warehouse: Armazem) => {
    setEditingWarehouse(warehouse);
    setFormData({
      nome: warehouse.nome,
      localizacao: warehouse.localizacao,
      responsavel: warehouse.responsavel,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este armazém?')) {
      try {
        await api.delete(`/armazem/${id}`);
        fetchWarehouses();
      } catch (error) {
        console.error('Failed to delete warehouse:', error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl text-gray-900 mb-1">Armazéns</h1>
          <p className="text-gray-500">Gerencie todos os seus armazéns e estoques</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white" 
              onClick={() => {
                setEditingWarehouse(null);
                setFormData({ nome: '', localizacao: '', responsavel: '' });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Armazém
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingWarehouse ? 'Editar Armazém' : 'Novo Armazém'}</DialogTitle>
              <DialogDescription>
                {editingWarehouse ? 'Atualize as informações do armazém' : 'Adicione um novo armazém ao sistema'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Armazém</Label>
                <Input
                  id="name"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={formData.localizacao}
                  onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                  placeholder="Cidade, Estado"
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                  className="h-11"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                  {editingWarehouse ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar armazéns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-white border-gray-200"
          />
        </div>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWarehouses.map((warehouse) => (
            <Card key={warehouse.id} className="border-gray-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{warehouse.nome}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{warehouse.localizacao}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Responsável</p>
                    <p className="text-sm text-gray-900 font-medium">{warehouse.responsavel}</p>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => handleEdit(warehouse)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(warehouse.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {filteredWarehouses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum armazém encontrado</p>
        </div>
      )}
    </div>
  );
}
