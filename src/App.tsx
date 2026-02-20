import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { CategoryPage } from '@/pages/CategoryPage';
import { SearchResultsPage } from '@/pages/SearchResultsPage';
import { 
  TransportPage, 
  HotelsPage, 
  HospitalsPage, 
  ClinicsPage, 
  DiningPage, 
  CulturePage, 
  OthersPage 
} from '@/pages/categories';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminListingsPage } from '@/pages/admin/AdminListingsPage';
import { AdminCategoriesPage } from '@/pages/admin/AdminCategoriesPage';
import { AdminBannersPage } from '@/pages/admin/AdminBannersPage';
import { AdminStatsPage } from '@/pages/admin/AdminStatsPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';

// Layout component for pages with Navbar and Footer
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Admin layout without Navbar and Footer
function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } 
        />
        <Route 
          path="/search" 
          element={
            <MainLayout>
              <SearchResultsPage />
            </MainLayout>
          } 
        />
        
        {/* Category Routes */}
        <Route 
          path="/transport" 
          element={
            <MainLayout>
              <TransportPage />
            </MainLayout>
          } 
        />
        <Route 
          path="/hotels" 
          element={
            <MainLayout>
              <HotelsPage />
            </MainLayout>
          } 
        />
        <Route 
          path="/hospitals" 
          element={
            <MainLayout>
              <HospitalsPage />
            </MainLayout>
          } 
        />
        <Route 
          path="/clinics" 
          element={
            <MainLayout>
              <ClinicsPage />
            </MainLayout>
          } 
        />
        <Route 
          path="/dining" 
          element={
            <MainLayout>
              <DiningPage />
            </MainLayout>
          } 
        />
        <Route 
          path="/culture" 
          element={
            <MainLayout>
              <CulturePage />
            </MainLayout>
          } 
        />
        <Route 
          path="/others" 
          element={
            <MainLayout>
              <OthersPage />
            </MainLayout>
          } 
        />
        
        {/* Generic Category Route */}
        <Route 
          path="/category/:slug" 
          element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/login" 
          element={
            <AdminLayout>
              <AdminLoginPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/listings" 
          element={
            <AdminLayout>
              <AdminListingsPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/categories" 
          element={
            <AdminLayout>
              <AdminCategoriesPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/banners" 
          element={
            <AdminLayout>
              <AdminBannersPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/stats" 
          element={
            <AdminLayout>
              <AdminStatsPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <AdminLayout>
              <AdminSettingsPage />
            </AdminLayout>
          } 
        />
        
        {/* 404 - Redirect to Home */}
        <Route path="*" element={<MainLayout><HomePage /></MainLayout>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
