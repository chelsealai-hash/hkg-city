import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Calendar,
  Download,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore, useTrafficStatsStore, useCMSStore } from '@/stores/firebaseStore';

// Mock stats data (will be replaced with real data from Firebase)
const mockDailyStats = [
  { date: '2024-02-14', views: 1200, visitors: 850 },
  { date: '2024-02-15', views: 1350, visitors: 920 },
  { date: '2024-02-16', views: 1100, visitors: 780 },
  { date: '2024-02-17', views: 1580, visitors: 1100 },
  { date: '2024-02-18', views: 1420, visitors: 980 },
  { date: '2024-02-19', views: 1650, visitors: 1200 },
  { date: '2024-02-20', views: 1800, visitors: 1350 },
];

const mockTopPages = [
  { page: '/', views: 4520 },
  { page: '/transport', views: 3210 },
  { page: '/hotels', views: 2890 },
  { page: '/hospitals', views: 2150 },
  { page: '/dining', views: 1980 },
];

const mockReferrers = [
  { source: 'Google', count: 4520 },
  { source: 'Direct', count: 3210 },
  { source: 'Facebook', count: 1890 },
  { source: 'Bing', count: 980 },
  { source: 'Yahoo', count: 650 },
];

export function AdminStatsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { fetchStats } = useTrafficStatsStore();
  const { categories, listings, fetchCategories, fetchListings, isLoading } = useCMSStore();
  const [dateRange, setDateRange] = useState('7d');

  // Fetch data on mount
  useEffect(() => {
    fetchCategories();
    fetchListings();
    fetchStats(7);
  }, [fetchCategories, fetchListings, fetchStats]);

  // Protect route
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const totalViews = mockDailyStats.reduce((sum, day) => sum + day.views, 0);
  const totalVisitors = mockDailyStats.reduce((sum, day) => sum + day.visitors, 0);
  const avgViews = Math.round(totalViews / mockDailyStats.length);

  // Calculate category stats
  const categoryStats = categories.map((cat, index) => {
    const catListings = listings.filter(l => l.categoryId === cat.id);
    const totalClicks = catListings.reduce((sum, l) => sum + (l.clickCount || 0), 0);
    return {
      ...cat,
      listingCount: catListings.length,
      totalClicks,
      rank: index + 1
    };
  }).sort((a, b) => b.totalClicks - a.totalClicks).slice(0, 5);

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
              <span className="text-white/80">{t('admin.stats')}</span>
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
        {/* Date Range Selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <Button
                key={range}
                variant={dateRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange(range)}
              >
                {range === '24h' && 'Last 24 Hours'}
                {range === '7d' && 'Last 7 Days'}
                {range === '30d' && 'Last 30 Days'}
                {range === '90d' && 'Last 90 Days'}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#003366]" />
          </div>
        )}

        {!isLoading && (
          <>
            {/* Overview Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Page Views
                  </CardTitle>
                  <Eye className="w-4 h-4 text-[#0066CC]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5% vs last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Unique Visitors
                  </CardTitle>
                  <Users className="w-4 h-4 text-[#0066CC]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.3% vs last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Avg. Daily Views
                  </CardTitle>
                  <Calendar className="w-4 h-4 text-[#0066CC]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgViews.toLocaleString()}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    Per day average
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Listings
                  </CardTitle>
                  <MousePointer className="w-4 h-4 text-[#0066CC]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{listings.length}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    Across {categories.length} categories
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Daily Traffic */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Traffic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockDailyStats.map((day) => {
                      const maxViews = Math.max(...mockDailyStats.map(d => d.views));
                      const percentage = (day.views / maxViews) * 100;
                      return (
                        <div key={day.date} className="flex items-center gap-3">
                          <div className="w-20 text-sm text-gray-500">
                            {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#0066CC] rounded-full flex items-center justify-end pr-2"
                              style={{ width: `${percentage}%` }}
                            >
                              <span className="text-xs text-white font-medium">{day.views}</span>
                            </div>
                          </div>
                          <div className="w-16 text-sm text-gray-600 text-right">
                            {day.visitors}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t text-xs text-gray-500">
                    <span>Date</span>
                    <span>Views / Visitors</span>
                  </div>
                </CardContent>
              </Card>

              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTopPages.map((page, index) => {
                      const maxViews = mockTopPages[0].views;
                      const percentage = (page.views / maxViews) * 100;
                      return (
                        <div key={page.page} className="flex items-center gap-3">
                          <div className="w-6 text-sm font-medium text-gray-400">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{page.page}</div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                              <div 
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          <div className="w-16 text-sm text-gray-600 text-right">
                            {page.views.toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockReferrers.map((ref) => {
                      const maxCount = mockReferrers[0].count;
                      const percentage = (ref.count / maxCount) * 100;
                      return (
                        <div key={ref.source} className="flex items-center gap-3">
                          <div className="w-24 text-sm font-medium">{ref.source}</div>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-500 rounded-full flex items-center justify-end pr-2"
                              style={{ width: `${percentage}%` }}
                            >
                              <span className="text-xs text-white font-medium">{ref.count}</span>
                            </div>
                          </div>
                          <div className="w-16 text-sm text-gray-600 text-right">
                            {((ref.count / totalViews) * 100).toFixed(1)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Category Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryStats.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No category data available</p>
                    ) : (
                      categoryStats.map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#003366]/10 rounded-lg flex items-center justify-center text-sm font-bold text-[#003366]">
                              {cat.rank}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{cat.name?.en || 'Unknown'}</div>
                              <div className="text-xs text-gray-500">{cat.listingCount} listings</div>
                            </div>
                          </div>
                          <Badge variant="outline">{cat.totalClicks} clicks</Badge>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
