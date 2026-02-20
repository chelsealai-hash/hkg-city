import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore, useCMSStore } from '@/stores/firebaseStore';

export function AdminCategoriesPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { categories, fetchCategories, addCategory, updateCategory, deleteCategory, isLoading } = useCMSStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    slug: ''
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Protect route
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const currentLang = i18n.language;

  // Filter categories
  const filteredCategories = categories.filter(cat => {
    const name = cat.name[currentLang as keyof typeof cat.name] || cat.name.en;
    return searchQuery === '' || name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await updateCategory(id, { isActive: !currentStatus });
  };

  const handleDelete = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleAdd = async () => {
    if (newCategory.name && newCategory.slug) {
      const categoryData = {
        slug: newCategory.slug,
        name: { 
          en: newCategory.name, 
          'zh-HK': newCategory.name, 
          'zh-CN': newCategory.name,
          ja: newCategory.name,
          ko: newCategory.name,
          fr: newCategory.name,
          de: newCategory.name,
          es: newCategory.name,
          pt: newCategory.name,
          th: newCategory.name
        },
        description: { 
          en: newCategory.description, 
          'zh-HK': newCategory.description, 
          'zh-CN': newCategory.description,
          ja: newCategory.description,
          ko: newCategory.description,
          fr: newCategory.description,
          de: newCategory.description,
          es: newCategory.description,
          pt: newCategory.description,
          th: newCategory.description
        },
        image: '/images/categories/default.jpg',
        icon: 'MapPin',
        sortOrder: categories.length + 1,
        isActive: true,
        filters: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await addCategory(categoryData as any);
      setAddDialogOpen(false);
      setNewCategory({ name: '', description: '', slug: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#003366] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-xl font-bold">
                HKG<span className="text-[#0066CC]">.</span>CITY
              </Link>
              <span className="text-white/40">|</span>
              <span className="text-white/80">{t('admin.categories')}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/admin/dashboard')}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setAddDialogOpen(true)} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Category
          </Button>
        </div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-[#003366]" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => (
              <Card key={category.id} className={!category.isActive ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#003366]/10 rounded-lg flex items-center justify-center">
                        <span className="text-[#003366] font-bold">
                          {(category.name[currentLang as keyof typeof category.name] || category.name.en).charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {category.name[currentLang as keyof typeof category.name] || category.name.en}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {category.filters?.length || 0} filters
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={category.isActive}
                        onCheckedChange={() => handleToggleActive(category.id, category.isActive)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {!isLoading && filteredCategories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No categories found.
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? All listings in this category will also be affected.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="Category name"
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={newCategory.slug}
                onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                placeholder="category-slug"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Category description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Add Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
