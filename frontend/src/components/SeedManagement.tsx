import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import api from '../services/api';

interface Semente {
  id: number;
  name: string;
  category: string;
  quantity: number;
  status: string;
  harvestDate: string;
  image: string;
}

export function SeedManagement() {
  const [seeds, setSeeds] = useState<Semente[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSeed, setEditingSeed] = useState<Semente | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    status: '',
    harvestDate: '',
    image: '',
  });

  useEffect(() => {
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
    try {
      const response = await api.get('/sementes');
      setSeeds(response.data);
    } catch (error) {
      console.error('Failed to fetch seeds:', error);
    }
  };

  const filteredSeeds = seeds.filter(seed =>
    seed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seed.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      quantity: Number(formData.quantity),
    };

    try {
      if (editingSeed) {
        await api.put('/sementes', { ...data, id: editingSeed.id });
      } else {
        await api.post('/sementes', data);
      }
      fetchSeeds();
      setIsDialogOpen(false);
      setEditingSeed(null);
      setFormData({ name: '', category: '', quantity: '', status: '', harvestDate: '', image: '' });
    } catch (error) {
      console.error('Failed to save seed:', error);
    }
  };

  const handleEdit = (seed: Semente) => {
    setEditingSeed(seed);
    setFormData({
      name: seed.name,
      category: seed.category,
      quantity: seed.quantity.toString(),
      status: seed.status,
      harvestDate: new Date(seed.harvestDate).toISOString().split('T')[0],
      image: seed.image,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta semente?')) {
      try {
        await api.delete(`/sementes/${id}`);
        fetchSeeds();
      } catch (error) {
        console.error('Failed to delete seed:', error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl text-gray-900 mb-1">Sementes</h1>
          <p className="text-gray-500">Gerencie todo o estoque de sementes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white" 
              onClick={() => {
                setEditingSeed(null);
                setFormData({ name: '', category: '', quantity: '', status: '', harvestDate: '', image: '' });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Semente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingSeed ? 'Editar Semente' : 'Nova Semente'}</DialogTitle>
              <DialogDescription>
                {editingSeed ? 'Atualize as informações da semente' : 'Adicione uma nova semente ao estoque'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Semente</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ex: Milho, Soja"
                    className="h-11"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="harvestDate">Data da Colheita</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                  {editingSeed ? 'Atualizar' : 'Cadastrar'}
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
            placeholder="Buscar sementes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-white border-gray-200"
          />
        </div>
      </div>

      {/* Table */}
      <Card className="border-gray-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium text-gray-700">Nome</TableHead>
                  <TableHead className="font-medium text-gray-700">Categoria</TableHead>
                  <TableHead className="font-medium text-gray-700">Quantidade</TableHead>
                  <TableHead className="font-medium text-gray-700">Status</TableHead>
                  <TableHead className="font-medium text-gray-700">Data da Colheita</TableHead>
                  <TableHead className="text-right font-medium text-gray-700">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSeeds.map((seed) => (
                  <TableRow key={seed.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={seed.image} alt={seed.name} className="h-10 w-10 rounded-md object-cover" />
                        <div className="text-gray-900 font-medium">{seed.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{seed.category}</TableCell>
                    <TableCell className="text-gray-900 font-medium">
                      {seed.quantity}
                    </TableCell>
                    <TableCell>{seed.status}</TableCell>
                    <TableCell>
                      {new Date(seed.harvestDate).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          onClick={() => handleEdit(seed)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(seed.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredSeeds.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma semente encontrada</p>
        </div>
      )}
    </div>
  );
}
