import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Code,
  Monitor,
  LayoutTemplate,
  PanelRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore, useCMSStore } from '@/stores/firebaseStore';
import type { Banner } from '@/types';

const positionIcons = {
  top: Monitor,
  middle: LayoutTemplate,
  bottom: LayoutTemplate,
  sidebar: PanelRight
};

export function AdminBannersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { banners, isLoading, fetchBanners, addBanner, updateBanner, deleteBanner } = useCMSStore();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({
    name: '',
    position: 'top' as const,
    code: ''
  });
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch banners on mount
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Protect route
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setActionLoading(true);
    await updateBanner(id, { isActive: !currentStatus });
    setActionLoading(false);
  };

  const handleDelete = (id: string) => {
    setBannerToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (bannerToDelete) {
      setActionLoading(true);
      await deleteBanner(bannerToDelete);
      setActionLoading(false);
      setDeleteDialogOpen(false);
      setBannerToDelete(null);
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner({ ...banner });
    setEditDialogOpen(true);
  };

  const saveEdit = async () => {
    if (editingBanner) {
      setActionLoading(true);
      await updateBanner(editingBanner.id, {
        name: editingBanner.name,
        position: editingBanner.position,
        code: editingBanner.code,
        isActive: editingBanner.isActive
      });
      setActionLoading(false);
      setEditDialogOpen(false);
      setEditingBanner(null);
    }
  };

  const handleAdd = async () => {
    if (newBanner.name && newBanner.code) {
      setActionLoading(true);
      const now = new Date().toISOString();
      await addBanner({
        position: newBanner.position,
        name: newBanner.name,
        code: newBanner.code,
        isActive: true,
        createdAt: now,
        updatedAt: now
      });
      setActionLoading(false);
      setAddDialogOpen(false);
      setNewBanner({ name: '', position: 'top', code: '' });
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
              <span className="text-white/80">{t('admin.banners')}</span>
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
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Manage Google AdSense and custom banners
          </p>
          <Button onClick={() => setAddDialogOpen(true)} disabled={isLoading}>
            <Plus className="w-4 h-4 mr-2" />
            Add Banner
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#003366]" />
          </div>
        )}

        {/* Banners Grid */}
        {!isLoading && (
          <div className="grid gap-4">
            {banners.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No banners yet. Add your first banner to get started.</p>
              </Card>
            ) : (
              banners.map((banner) => {
                const Icon = positionIcons[banner.position as keyof typeof positionIcons] || Monitor;
                return (
                  <Card key={banner.id} className={!banner.isActive ? 'opacity-60' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#003366]/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#003366]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{banner.name}</h3>
                              <Badge variant="outline">{banner.position}</Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              <Code className="w-3 h-3 inline mr-1" />
                              {banner.code.length > 50 ? banner.code.substring(0, 50) + '...' : banner.code}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={banner.isActive}
                            onCheckedChange={() => handleToggleActive(banner.id, banner.isActive)}
                            disabled={actionLoading}
                          />
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(banner)} disabled={actionLoading}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => handleDelete(banner.id)}
                            disabled={actionLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}

        {/* Info Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Google AdSense Setup Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Sign up for Google AdSense at <a href="https://www.google.com/adsense" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] underline">google.com/adsense</a></li>
              <li>Get your ad unit code from the AdSense dashboard</li>
              <li>Paste the code in the banner configuration above</li>
              <li>Enable the banner to start displaying ads</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this banner?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={actionLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
          </DialogHeader>
          {editingBanner && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={editingBanner.name}
                  onChange={(e) => setEditingBanner({...editingBanner, name: e.target.value})}
                />
              </div>
              <div>
                <Label>Position</Label>
                <select
                  value={editingBanner.position}
                  onChange={(e) => setEditingBanner({...editingBanner, position: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="top">Top</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                  <option value="sidebar">Sidebar</option>
                </select>
              </div>
              <div>
                <Label>Ad Code (HTML/JavaScript)</Label>
                <Textarea
                  value={editingBanner.code}
                  onChange={(e) => setEditingBanner({...editingBanner, code: e.target.value})}
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} disabled={actionLoading}>
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Banner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={newBanner.name}
                onChange={(e) => setNewBanner({...newBanner, name: e.target.value})}
                placeholder="Banner name"
              />
            </div>
            <div>
              <Label>Position</Label>
              <select
                value={newBanner.position}
                onChange={(e) => setNewBanner({...newBanner, position: e.target.value as any})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
                <option value="sidebar">Sidebar</option>
              </select>
            </div>
            <div>
              <Label>Ad Code (HTML/JavaScript)</Label>
              <Textarea
                value={newBanner.code}
                onChange={(e) => setNewBanner({...newBanner, code: e.target.value})}
                placeholder="<!-- Paste your ad code here -->"
                rows={6}
                className="font-mono text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)} disabled={actionLoading}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Add Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
