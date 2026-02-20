import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  MoreVertical,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { categories } from '@/data/categories';
import type { Listing } from '@/types';

export function AdminListingsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { listings, fetchListings, addListing, updateListing, deleteListing, isLoading } = useCMSStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [newListing, setNewListing] = useState({
    name: '',
    url: '',
    categoryId: '',
    description: '',
    region: 'hongkong-island',
    phone: '',
    address: ''
  });

  // Fetch listings on mount
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Protect route
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const currentLang = i18n.language;

  // Filter listings
  const filteredListings = listings.filter(listing => {
    const matchesSearch = searchQuery === '' || 
      listing.name[currentLang as keyof typeof listing.name]?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    setListingToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (listingToDelete) {
      await deleteListing(listingToDelete);
      setDeleteDialogOpen(false);
      setListingToDelete(null);
    }
  };

  const handleAdd = async () => {
    if (newListing.name && newListing.url && newListing.categoryId) {
      const listingData = {
        categoryId: newListing.categoryId,
        name: { 
          en: newListing.name, 
          'zh-HK': newListing.name, 
          'zh-CN': newListing.name,
          ja: newListing.name,
          ko: newListing.name,
          fr: newListing.name,
          de: newListing.name,
          es: newListing.name,
          pt: newListing.name,
          th: newListing.name
        },
        description: newListing.description ? {
          en: newListing.description,
          'zh-HK': newListing.description,
          'zh-CN': newListing.description,
          ja: newListing.description,
          ko: newListing.description,
          fr: newListing.description,
          de: newListing.description,
          es: newListing.description,
          pt: newListing.description,
          th: newListing.description
        } : undefined,
        url: newListing.url,
        region: newListing.region,
        metadata: {
          phone: newListing.phone || undefined,
          address: newListing.address || undefined
        },
        sortOrder: listings.length + 1,
        isActive: true,
        clickCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await addListing(listingData as any);
      setAddDialogOpen(false);
      setNewListing({ name: '', url: '', categoryId: '', description: '', region: 'hongkong-island', phone: '', address: '' });
    }
  };

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (editingListing) {
      await updateListing(editingListing.id, editingListing);
      setEditDialogOpen(false);
      setEditingListing(null);
    }
  };

  const handleToggleActive = async (listing: Listing) => {
    await updateListing(listing.id, { isActive: !listing.isActive });
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
              <span className="text-white/80">{t('admin.listings')}</span>
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
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name[currentLang as keyof typeof cat.name] || cat.name.en}
              </option>
            ))}
          </select>
          <Button onClick={() => setAddDialogOpen(true)} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Listing
          </Button>
        </div>

        {/* Listings Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Listings ({filteredListings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-[#003366]" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Region</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Clicks</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredListings.map((listing) => {
                      const category = categories.find(c => c.id === listing.categoryId);
                      return (
                        <tr key={listing.id} className={`border-b hover:bg-gray-50 ${!listing.isActive ? 'opacity-50' : ''}`}>
                          <td className="py-3 px-4">
                            <div className="font-medium">
                              {listing.name[currentLang as keyof typeof listing.name] || listing.name.en}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {category?.name[currentLang as keyof typeof category.name] || category?.name.en}
                          </td>
                          <td className="py-3 px-4">{listing.region}</td>
                          <td className="py-3 px-4">
                            <button 
                              onClick={() => handleToggleActive(listing)}
                              className="cursor-pointer"
                            >
                              <Badge variant={listing.isActive ? 'default' : 'secondary'}>
                                {listing.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </button>
                          </td>
                          <td className="py-3 px-4">{listing.clickCount}</td>
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => window.open(listing.url, '_blank')}>
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(listing)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(listing.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {!isLoading && filteredListings.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No listings found. Add your first listing!
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Listing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={newListing.name}
                onChange={(e) => setNewListing({...newListing, name: e.target.value})}
                placeholder="Listing name"
              />
            </div>
            <div>
              <Label>URL *</Label>
              <Input
                value={newListing.url}
                onChange={(e) => setNewListing({...newListing, url: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Category *</Label>
              <select
                value={newListing.categoryId}
                onChange={(e) => setNewListing({...newListing, categoryId: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name[currentLang as keyof typeof cat.name] || cat.name.en}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Region</Label>
              <select
                value={newListing.region}
                onChange={(e) => setNewListing({...newListing, region: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="hongkong-island">Hong Kong Island</option>
                <option value="kowloon">Kowloon</option>
                <option value="new-territories">New Territories</option>
                <option value="outlying-islands">Outlying Islands</option>
              </select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                placeholder="Brief description..."
                rows={3}
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                value={newListing.phone}
                onChange={(e) => setNewListing({...newListing, phone: e.target.value})}
                placeholder="+852 1234 5678"
              />
              <p className="text-xs text-gray-500 mt-1">Will be clickable on mobile devices</p>
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={newListing.address}
                onChange={(e) => setNewListing({...newListing, address: e.target.value})}
                placeholder="Full address for Google Maps"
              />
              <p className="text-xs text-gray-500 mt-1">Will link to Google Maps</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!newListing.name || !newListing.url || !newListing.categoryId || isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
              Add Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          {editingListing && (
            <div className="space-y-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={editingListing.name.en}
                  onChange={(e) => setEditingListing({
                    ...editingListing, 
                    name: { ...editingListing.name, en: e.target.value }
                  })}
                  placeholder="Listing name"
                />
              </div>
              <div>
                <Label>URL *</Label>
                <Input
                  value={editingListing.url}
                  onChange={(e) => setEditingListing({...editingListing, url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label>Category *</Label>
                <select
                  value={editingListing.categoryId}
                  onChange={(e) => setEditingListing({...editingListing, categoryId: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name[currentLang as keyof typeof cat.name] || cat.name.en}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Region</Label>
                <select
                  value={editingListing.region}
                  onChange={(e) => setEditingListing({...editingListing, region: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="hongkong-island">Hong Kong Island</option>
                  <option value="kowloon">Kowloon</option>
                  <option value="new-territories">New Territories</option>
                  <option value="outlying-islands">Outlying Islands</option>
                </select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingListing.description?.en || ''}
                  onChange={(e) => setEditingListing({
                    ...editingListing, 
                    description: { ...editingListing.description, en: e.target.value } as any
                  })}
                  placeholder="Brief description..."
                  rows={3}
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={editingListing.metadata?.phone || ''}
                  onChange={(e) => setEditingListing({
                    ...editingListing, 
                    metadata: { ...editingListing.metadata, phone: e.target.value }
                  })}
                  placeholder="+852 1234 5678"
                />
                <p className="text-xs text-gray-500 mt-1">Will be clickable on mobile devices</p>
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={editingListing.metadata?.address || ''}
                  onChange={(e) => setEditingListing({
                    ...editingListing, 
                    metadata: { ...editingListing.metadata, address: e.target.value }
                  })}
                  placeholder="Full address for Google Maps"
                />
                <p className="text-xs text-gray-500 mt-1">Will link to Google Maps</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
