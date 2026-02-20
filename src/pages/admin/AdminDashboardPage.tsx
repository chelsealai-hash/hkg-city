import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  List, 
  FolderTree, 
  Image, 
  BarChart3, 
  Settings,
  LogOut,
  Users,
  Eye,
  Plus,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore, useTrafficStatsStore, useCMSStore } from '@/stores/firebaseStore';

const menuItems = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/admin/dashboard', label: 'Dashboard' },
  { key: 'listings', icon: List, href: '/admin/listings', label: 'Listings' },
  { key: 'categories', icon: FolderTree, href: '/admin/categories', label: 'Categories' },
  { key: 'banners', icon: Image, href: '/admin/banners', label: 'Banners' },
  { key: 'stats', icon: BarChart3, href: '/admin/stats', label: 'Statistics' },
  { key: 'settings', icon: Settings, href: '/admin/settings', label: 'Settings' },
];

export function AdminDashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { pageViews } = useTrafficStatsStore();
  const { listings, categories, fetchListings, fetchCategories } = useCMSStore();

  // Protect route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // Initialize CMS data
  useEffect(() => {
    fetchListings();
    fetchCategories();
  }, [fetchListings, fetchCategories]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#003366] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-bold">
                HKG<span className="text-[#0066CC]">.</span>CITY
              </Link>
              <span className="text-white/40">|</span>
              <span className="text-white/80">{t('admin.dashboard')}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80">
                {t('admin.welcome')}, {user?.username}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('admin.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.key}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[#003366] text-white' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{t(`admin.${item.key}`)}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {t('admin.dashboard')}
            </h1>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {t('admin.totalPageViews')}
                  </CardTitle>
                  <Eye className="w-4 h-4 text-[#0066CC]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pageViews.toLocaleString()}</div>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {t('admin.totalListings')}
                  </CardTitle>
                  <List className="w-4 h-4 text-[#0066CC]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{listings.length}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    Across {categories.length} categories
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {t('admin.totalCategories')}
                  </CardTitle>
                  <FolderTree className="w-4 h-4 text-[#0066CC]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{categories.length}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    All active
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                <Link to="/admin/listings">
                  <Plus className="w-6 h-6" />
                  <span>Add Listing</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                <Link to="/admin/categories">
                  <FolderTree className="w-6 h-6" />
                  <span>Manage Categories</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                <Link to="/admin/banners">
                  <Image className="w-6 h-6" />
                  <span>Update Banners</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                <Link to="/admin/stats">
                  <BarChart3 className="w-6 h-6" />
                  <span>View Stats</span>
                </Link>
              </Button>
            </div>

            {/* Recent Activity */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {t('admin.recentActivity')}
            </h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Plus className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New listing added</p>
                        <p className="text-xs text-gray-500">Sheraton Hong Kong Hotel</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Traffic spike</p>
                        <p className="text-xs text-gray-500">+45% page views</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">5 hours ago</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <Settings className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Settings updated</p>
                        <p className="text-xs text-gray-500">Banner configuration</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
