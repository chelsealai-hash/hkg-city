import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Filter as FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListingCard } from '@/components/cards/ListingCard';
import { AdBanner } from '@/components/ads/AdBanner';
import { AnnouncementBanner } from '@/components/admin/AnnouncementBanner';
import { RegionFilter } from '@/components/filters/RegionFilter';
import { SortDropdown } from '@/components/filters/SortDropdown';
import { FilterDropdown } from '@/components/filters/FilterDropdown';
import { categories, regions } from '@/data/categories';
import { listings as staticListings } from '@/data/listings';
import { useFilterStore } from '@/stores/firebaseStore';
import type { Announcement } from '@/types';

// Sample announcements for demo
const sampleAnnouncements: Announcement[] = [
  {
    id: 'cat-1',
    categoryId: 'transport',
    title: {
      en: 'MTR Service Update',
      'zh-HK': '港鐵服務更新',
      'zh-CN': '港铁服务更新',
      ja: 'MTRサービス更新',
      ko: 'MTR 서비스 업데이트',
      fr: 'Mise à jour du service MTR',
      de: 'MTR Service-Update',
      es: 'Actualización del servicio MTR',
      pt: 'Atualização do serviço MTR',
      th: 'อัปเดตบริการ MTR'
    },
    content: {
      en: 'Check the latest MTR schedules and service status before your journey.',
      'zh-HK': '出行前請查看最新港鐵時間表及服務狀態。',
      'zh-CN': '出行前请查看最新港铁时间表及服务状态。',
      ja: 'ご旅行前に最新のMTR時刻表とサービス状況をご確認ください。',
      ko: '여행 전 최신 MTR 일정 및 서비스 상태를 확인하세요.',
      fr: 'Vérifiez les derniers horaires MTR et l\'état du service avant votre voyage.',
      de: 'Überprüfen Sie vor Ihrer Reise die aktuellen MTR-Fahrpläne und den Servicestatus.',
      es: 'Verifique los últimos horarios de MTR y el estado del servicio antes de su viaje.',
      pt: 'Verifique os últimos horários do MTR e o status do serviço antes de sua viagem.',
      th: 'ตรวจสอบตารางเวลา MTR ล่าสุดและสถานะบริการก่อนเดินทาง'
    },
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

interface CategoryPageProps {
  slug?: string;
}

export function CategoryPage({ slug: propSlug }: CategoryPageProps = {}) {
  const { slug: paramsSlug } = useParams<{ slug: string }>();
  const slug = propSlug || paramsSlug;
  const { t, i18n } = useTranslation();
  const { region, subRegion, filters, sortBy, clearFilters } = useFilterStore();
  const [isLoading] = useState(false);

  const currentLang = i18n.language;

  // Static data loaded directly, no Firebase fetch needed

  // Get category data
  const category = useMemo(() => {
    return categories.find(c => c.slug === slug);
  }, [slug]);

  // Get listings for this category - use static data (Firebase integration temporarily disabled)
  const listings = useMemo(() => {
    if (!category) return [];
    return staticListings.filter(l => l.categoryId === category.id && l.isActive);
  }, [category]);

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Apply region filter
    if (region) {
      result = result.filter(l => l.region === region);
    }

    // Apply sub-region filter
    if (subRegion) {
      result = result.filter(l => l.subRegion === subRegion);
    }

    // Apply custom filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === 'isPublic') {
          result = result.filter(l => l.metadata.isPublic === (value === 'true'));
        } else if (key === 'stars') {
          result = result.filter(l => l.metadata.stars === parseInt(value));
        } else if (key === 'priceRange') {
          result = result.filter(l => l.metadata.priceRange === value);
        } else if (key === 'type') {
          result = result.filter(l => l.metadata.tags?.includes(value));
        }
      }
    });

    // Apply sorting
    switch (sortBy) {
      case 'nameAsc':
        result.sort((a, b) => {
          const nameA = a.name[currentLang as keyof typeof a.name] || a.name.en;
          const nameB = b.name[currentLang as keyof typeof b.name] || b.name.en;
          return nameA.localeCompare(nameB);
        });
        break;
      case 'nameDesc':
        result.sort((a, b) => {
          const nameA = a.name[currentLang as keyof typeof a.name] || a.name.en;
          const nameB = b.name[currentLang as keyof typeof b.name] || b.name.en;
          return nameB.localeCompare(nameA);
        });
        break;
      case 'popular':
        result.sort((a, b) => b.clickCount - a.clickCount);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        result.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return result;
  }, [listings, region, subRegion, filters, sortBy, currentLang]);

  // Get region name for display
  const regionName = useMemo(() => {
    if (!region) return null;
    const r = regions.find(reg => reg.id === region);
    return r?.name[currentLang as keyof typeof r.name] || r?.name.en;
  }, [region, currentLang]);

  const subRegionName = useMemo(() => {
    if (!region || !subRegion) return null;
    const r = regions.find(reg => reg.id === region);
    const sr = r?.subRegions?.find(s => s.id === subRegion);
    return sr?.name[currentLang as keyof typeof sr.name] || sr?.name.en;
  }, [region, subRegion, currentLang]);

  // Reset filters when category changes
  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, [slug, clearFilters]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('common.error')}</h1>
          <p className="text-gray-600 mb-4">Category not found</p>
          <Button asChild>
            <Link to="/">{t('common.back')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const categoryName = category.name[currentLang as keyof typeof category.name] || category.name.en;
  const categoryDescription = category.description[currentLang as keyof typeof category.description] || category.description.en;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#003366] text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/10 mb-4"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.back')}
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{categoryName}</h1>
          <p className="text-lg text-white/80 max-w-2xl">{categoryDescription}</p>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mt-4 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition-colors">{t('common.home')}</Link>
            <span>/</span>
            <span className="text-white">{categoryName}</span>
          </div>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <AdBanner position="top" className="mx-auto" />
        </div>
      </div>

      {/* Announcement Banner */}
      <div className="pb-6">
        <div className="container mx-auto px-4">
          <AnnouncementBanner 
            announcements={sampleAnnouncements} 
            categoryId={category.id}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="pb-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Region Filter */}
              <div className="flex-1">
                <RegionFilter />
              </div>
              
              {/* Custom Filters */}
              {category.filters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {category.filters.map((filter) => (
                    <FilterDropdown key={filter.key} filter={filter} />
                  ))}
                </div>
              )}
              
              {/* Sort */}
              <div className="flex items-center gap-2">
                <SortDropdown />
              </div>
            </div>
            
            {/* Active Filters */}
            {(region || subRegion || Object.values(filters).some(Boolean)) && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <FilterIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">{t('common.filter')}:</span>
                {region && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#003366]/10 text-[#003366] text-xs rounded-full">
                    <MapPin className="w-3 h-3" />
                    {[subRegionName, regionName].filter(Boolean).join(', ')}
                  </span>
                )}
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  const filter = category.filters.find(f => f.key === key);
                  const option = filter?.options?.find(o => o.value === value);
                  const label = option?.label[currentLang as keyof typeof option.label] || option?.label.en || value;
                  return (
                    <span key={key} className="px-2 py-1 bg-[#0066CC]/10 text-[#0066CC] text-xs rounded-full">
                      {label}
                    </span>
                  );
                })}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  {t('common.cancel')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="pb-12">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {isLoading ? 'Loading...' : `${filteredListings.length} ${t('common.listings')}`}
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-8 h-8 border-4 border-[#003366] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading listings...</p>
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <div className="text-gray-400 mb-4">
                <FilterIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('search.noResults')}
              </h3>
              <p className="text-gray-500 mb-4">{t('search.tryDifferent')}</p>
              <Button onClick={clearFilters} variant="outline">
                {t('common.cancel')} {t('common.filter')}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <AdBanner position="bottom" className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
