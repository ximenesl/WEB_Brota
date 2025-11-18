import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, MapPin, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  status: 'active' | 'inactive';
}

export function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch('/api/armazens');
        if (!response.ok) {
          throw new Error('Failed to fetch warehouses');
        }
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWarehouses();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    currentStock: '',
    status: 'active' as 'active' | 'inactive',
  });

  const fetchWarehouses = async () => {
    try {
      const response = await fetch('/api/armazens');
      if (!response.ok) {
        throw new Error('Failed to fetch warehouses');
      }
      const data = await response.json();
      setWarehouses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingWarehouse ? `/api/armazens/${editingWarehouse.id}` : '/api/armazens';
    const method = editingWarehouse ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData, 
          capacity: Number(formData.capacity), 
          currentStock: Number(formData.currentStock) 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save warehouse');
      }

      setIsDialogOpen(false);
      setEditingWarehouse(null);
      setFormData({ name: '', location: '', capacity: '', currentStock: '', status: 'active' });
      fetchWarehouses(); // Refetch warehouses after submission
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setFormData({
      name: warehouse.name,
      location: warehouse.location,
      capacity: warehouse.capacity.toString(),
      currentStock: warehouse.currentStock.toString(),
      status: warehouse.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este armazém?')) {
      try {
        const response = await fetch(`/api/armazens/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete warehouse');
        }

        fetchWarehouses(); // Refetch warehouses after deletion
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getUtilization = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
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
                setFormData({ name: '', location: '', capacity: '', currentStock: '', status: 'active' });
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Cidade, Estado"
                  className="h-11"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidade (kg)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentStock">Estoque Atual (kg)</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full h-11 border border-gray-300 rounded-md px-3"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
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
        {filteredWarehouses.map((warehouse) => {
          const utilization = getUtilization(warehouse.currentStock, warehouse.capacity);
          
          return (
            <Card key={warehouse.id} className="border-gray-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{warehouse.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{warehouse.location}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={warehouse.status === 'active' ? 'default' : 'secondary'}
                    className={warehouse.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                  >
                    {warehouse.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Ocupação</span>
                      <span className="text-gray-900 font-medium">{utilization}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 transition-all ${
                          utilization > 80 ? 'bg-red-500' : utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${utilization}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Capacidade</p>
                      <p className="text-sm text-gray-900 font-medium">{warehouse.capacity.toLocaleString()} kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Estoque</p>
                      <p className="text-sm text-gray-900 font-medium">{warehouse.currentStock.toLocaleString()} kg</p>
                    </div>
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
          );
        })}
      </div>

      {filteredWarehouses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum armazém encontrado</p>
        </div>
      )}
    </div>
  );
}
