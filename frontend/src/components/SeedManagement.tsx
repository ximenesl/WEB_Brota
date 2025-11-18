import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface Seed {
  id: string;
  name: string;
  type: string;
  variety: string;
  supplier: string;
  warehouse: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  batchNumber: string;
  status: 'available' | 'low' | 'expired';
}

export function SeedManagement() {
  const [seeds, setSeeds] = useState<Seed[]>([]);

  useEffect(() => {
    const fetchSementes = async () => {
      try {
        const response = await fetch('/api/sementes');
        if (!response.ok) {
          throw new Error('Failed to fetch sementes');
        }
        const data = await response.json();
        setSeeds(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSementes();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSeed, setEditingSeed] = useState<Seed | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    variety: '',
    supplier: '',
    warehouse: '',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    batchNumber: '',
  });

  const fetchSementes = async () => {
    try {
      const response = await fetch('/api/sementes');
      if (!response.ok) {
        throw new Error('Failed to fetch sementes');
      }
      const data = await response.json();
      setSeeds(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSementes();
  }, []);

  const filteredSeeds = seeds.filter(seed =>
    seed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seed.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seed.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seed.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingSeed ? `/api/sementes/${editingSeed.id}` : '/api/sementes';
    const method = editingSeed ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, quantity: Number(formData.quantity) }),
      });

      if (!response.ok) {
        throw new Error('Failed to save semente');
      }

      setIsDialogOpen(false);
      setEditingSeed(null);
      setFormData({ name: '', type: '', variety: '', supplier: '', warehouse: '', quantity: '', unit: 'kg', expiryDate: '', batchNumber: '' });
      fetchSementes(); // Refetch sementes after submission
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (seed: Seed) => {
    setEditingSeed(seed);
    setFormData({
      name: seed.name,
      type: seed.type,
      variety: seed.variety,
      supplier: seed.supplier,
      warehouse: seed.warehouse,
      quantity: seed.quantity.toString(),
      unit: seed.unit,
      expiryDate: seed.expiryDate,
      batchNumber: seed.batchNumber,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta semente?')) {
      try {
        const response = await fetch(`/api/sementes/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete semente');
        }

        fetchSementes(); // Refetch sementes after deletion
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      available: { label: 'Disponível', className: 'bg-green-100 text-green-700' },
      low: { label: 'Estoque Baixo', className: 'bg-yellow-100 text-yellow-700' },
      expired: { label: 'Vencido', className: 'bg-red-100 text-red-700' },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={`${variant.className} hover:${variant.className}`}>{variant.label}</Badge>;
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
                setFormData({ name: '', type: '', variety: '', supplier: '', warehouse: '', quantity: '', unit: 'kg', expiryDate: '', batchNumber: '' });
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
                  <Label htmlFor="type">Tipo</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="Ex: Milho, Soja"
                    className="h-11"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variety">Variedade</Label>
                  <Input
                    id="variety"
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batchNumber">Número do Lote</Label>
                  <Input
                    id="batchNumber"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Fornecedor</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Armazém</Label>
                  <Input
                    id="warehouse"
                    value={formData.warehouse}
                    onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
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
                  <Label htmlFor="unit">Unidade</Label>
                  <select
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full h-11 border border-gray-300 rounded-md px-3"
                  >
                    <option value="kg">kg</option>
                    <option value="ton">ton</option>
                    <option value="saca">saca</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Validade</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="h-11"
                    required
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
                  <TableHead className="font-medium text-gray-700">Tipo</TableHead>
                  <TableHead className="font-medium text-gray-700">Variedade</TableHead>
                  <TableHead className="font-medium text-gray-700">Lote</TableHead>
                  <TableHead className="font-medium text-gray-700">Quantidade</TableHead>
                  <TableHead className="font-medium text-gray-700">Armazém</TableHead>
                  <TableHead className="font-medium text-gray-700">Validade</TableHead>
                  <TableHead className="font-medium text-gray-700">Status</TableHead>
                  <TableHead className="text-right font-medium text-gray-700">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSeeds.map((seed) => (
                  <TableRow key={seed.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="text-gray-900 font-medium">{seed.name}</div>
                        <div className="text-sm text-gray-500">{seed.supplier}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                        {seed.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{seed.variety}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Package className="h-3.5 w-3.5 text-gray-400" />
                        <span className="font-mono text-xs">{seed.batchNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900 font-medium">
                      {seed.quantity.toLocaleString()} {seed.unit}
                    </TableCell>
                    <TableCell className="text-gray-600">{seed.warehouse}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        {new Date(seed.expiryDate).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(seed.status)}</TableCell>
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
