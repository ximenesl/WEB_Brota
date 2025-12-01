import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Phone, Mail, Building } from 'lucide-react';
import { Button } from '../shared/components/ui/button';
import { Input } from '../shared/components/ui/input';
import { Card, CardContent } from '../shared/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../shared/components/ui/dialog';
import { Label } from '../shared/components/ui/label';
import { Badge } from '../shared/components/ui/badge';
import api from '../services/api';

interface Fornecedor {
  id: number;
  nome: string;
  cnpjcpf: string;
  endereco: string;
  telefone: string;
  email: string;
  produtos: string;
}

export function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Fornecedor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Fornecedor | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    cnpjcpf: '',
    endereco: '',
    telefone: '',
    email: '',
    produtos: '',
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/fornecedor');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.produtos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSupplier) {
        await api.put('/fornecedor', { ...formData, id: editingSupplier.id });
      } else {
        await api.post('/fornecedor', formData);
      }
      fetchSuppliers();
      setIsDialogOpen(false);
      setEditingSupplier(null);
      setFormData({ nome: '', cnpjcpf: '', endereco: '', telefone: '', email: '', produtos: '' });
    } catch (error) {
      console.error('Failed to save supplier:', error);
    }
  };

  const handleEdit = (supplier: Fornecedor) => {
    setEditingSupplier(supplier);
    setFormData({
      nome: supplier.nome,
      cnpjcpf: supplier.cnpjcpf,
      endereco: supplier.endereco,
      telefone: supplier.telefone,
      email: supplier.email,
      produtos: supplier.produtos,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      try {
        await api.delete(`/fornecedor/${id}`);
        fetchSuppliers();
      } catch (error) {
        console.error('Failed to delete supplier:', error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl text-gray-900 mb-1">Fornecedores</h1>
          <p className="text-gray-500">Gerencie seus fornecedores de sementes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white" 
              onClick={() => {
                setEditingSupplier(null);
                setFormData({ nome: '', cnpjcpf: '', endereco: '', telefone: '', email: '', produtos: '' });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Fornecedor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}</DialogTitle>
              <DialogDescription>
                {editingSupplier ? 'Atualize as informações do fornecedor' : 'Adicione um novo fornecedor ao sistema'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Empresa</Label>
                <Input
                  id="name"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpjcpf">CNPJ/CPF</Label>
                <Input
                  id="cnpjcpf"
                  value={formData.cnpjcpf}
                  onChange={(e) => setFormData({ ...formData, cnpjcpf: e.target.value })}
                  className="h-11"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="produtos">Produtos</Label>
                <Input
                  id="produtos"
                  value={formData.produtos}
                  onChange={(e) => setFormData({ ...formData, produtos: e.target.value })}
                  placeholder="Ex: Milho, Soja"
                  className="h-11"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                  {editingSupplier ? 'Atualizar' : 'Cadastrar'}
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
            placeholder="Buscar fornecedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-white border-gray-200"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="border-gray-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{supplier.nome}</h3>
                  <p className="text-sm text-gray-500">{supplier.cnpjcpf}</p>
                </div>
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  {supplier.produtos}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{supplier.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span>{supplier.endereco}</span>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => handleEdit(supplier)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(supplier.id)}
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

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum fornecedor encontrado</p>
        </div>
      )}
    </div>
  );
}
