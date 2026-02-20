import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListingCard } from '@/components/cards/ListingCard';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { AdBanner } from '@/components/ads/AdBanner';
import { categories } from '@/data/categories';
import { listings as staticListings } from '@/data/listings';
import { useSearchStore, useCMSStore } from '@/stores/firebaseStore';
import { Train, Hotel, Hospital, Stethoscope, UtensilsCrossed, Palette, Wrench, MapPin } from 'lucide-react';

const categoryIcons = {
  transport: Train,
  hotels: Hotel,
  hospitals: Hospital,
  clinics: Stethoscope,
  dining: UtensilsCrossed,
  culture: Palette,
  others: Wrench,
};

export function SearchResultsPage() {
  const { t, i18n } = useTranslation();
  const { query, results, setQuery, setResults, clearSearch } = useSearchStore();
  const { listings, fetchListings } = useCMSStore();

  const currentLang = i18n.language;

  // Fetch listings from Firebase on mount
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Search categories
  const categoryResults = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return categories.filter(c => {
      const name = c.name[currentLang as keyof typeof c.name] || c.name.en;
      const description = c.description[currentLang as keyof typeof c.description] || c.description.en;
      return name.toLowerCase().includes(lowerQuery) || 
             description.toLowerCase().includes(lowerQuery);
    });
  }, [query, currentLang]);

  // Search listings from Firebase (or static data as fallback)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      const sourceListings = listings.length > 0 ? listings : staticListings;
      const newResults = sourceListings.filter(listing => {
        const name = listing.name[currentLang as keyof typeof listing.name] || listing.name.en;
        const description = listing.description?.[currentLang as keyof typeof listing.description] || listing.description?.en;
        return name.toLowerCase().includes(lowerQuery) || 
               description?.toLowerCase().includes(lowerQuery) ||
               listing.metadata.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
      });
      setResults(newResults);
    }
  };

  // Clear search and go home
  const handleClear = () => {
    clearSearch();
  };

  const hasResults = results.length > 0 || categoryResults.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#003366] text-white py-8">
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
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{t('search.title')}</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('common.searchPlaceholder')}
                className="pl-12 pr-12 py-6 text-lg bg-white text-gray-900"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <AdBanner position="top" className="mx-auto" />
        </div>
      </div>

      {/* Results */}
      <div className="py-6 pb-12">
        <div className="container mx-auto px-4">
          {/* Query Display */}
          {query && (
            <div className="mb-6">
              <p className="text-gray-600">
                {t('search.resultsFor')}: <span className="font-semibold text-gray-900">"{query}"</span>
              </p>
            </div>
          )}

          {hasResults ? (
            <div className="space-y-10">
              {/* Category Results */}
              {categoryResults.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {t('search.categories')} ({categoryResults.length})
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryResults.map((category) => {
                      const icon = categoryIcons[category.id as keyof typeof categoryIcons] || MapPin;
                      return (
                        <CategoryCard 
                          key={category.id} 
                          category={category} 
                          icon={icon}
                        />
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Listing Results */}
              {results.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {t('search.listings')} ({results.length})
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {results.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : query ? (
            /* No Results */
            <div className="text-center py-16">
              <div className="text-gray-300 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {t('search.noResults')}
              </h2>
              <p className="text-gray-500 mb-6">{t('search.tryDifferent')}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => setQuery('')} variant="outline">
                  {t('common.search')}
                </Button>
                <Button onClick={handleClear} asChild>
                  <Link to="/">{t('common.home')}</Link>
                </Button>
              </div>
            </div>
          ) : (
            /* Empty Search */
            <div className="text-center py-16">
              <div className="text-gray-300 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {t('common.search')}
              </h2>
              <p className="text-gray-500 mb-6">
                Enter keywords to search for categories and listings
              </p>
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
