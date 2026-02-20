import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Menu, 
  X, 
  Search, 
  Globe, 
  ChevronDown,
  Train,
  Hotel,
  Hospital,
  Stethoscope,
  UtensilsCrossed,
  Palette,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { languages } from '@/i18n';
import type { LanguageCode } from '@/i18n';
import { useLanguageStore, useSearchStore, useUIStore } from '@/stores/firebaseStore';
import { searchListings } from '@/data/listings';

const navItems = [
  { key: 'transport', href: '/transport', icon: Train },
  { key: 'hotels', href: '/hotels', icon: Hotel },
  { key: 'hospitals', href: '/hospitals', icon: Hospital },
  { key: 'clinics', href: '/clinics', icon: Stethoscope },
  { key: 'dining', href: '/dining', icon: UtensilsCrossed },
  { key: 'culture', href: '/culture', icon: Palette },
  { key: 'others', href: '/others', icon: Wrench },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { setQuery, setResults, setIsSearching } = useSearchStore();
  const { isMobileMenuOpen, setMobileMenuOpen, scrollY, setScrollY } = useUIStore();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollY]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const isScrolled = scrollY > 50;
  const isCompact = scrollY > 100;

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setQuery(searchInput);
      setIsSearching(true);
      const results = searchListings(searchInput, i18n.language);
      setResults(results);
      navigate('/search');
      setIsSearchOpen(false);
      setSearchInput('');
    }
  };

  const currentLang = languages.find(l => l.code === currentLanguage) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
      style={{
        height: isCompact ? '60px' : '80px',
      }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <span className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-[#003366]' : 'text-[#003366]'
            }`}
            style={{ fontSize: isCompact ? '20px' : '24px' }}
            >
              HKG<span className="text-[#0066CC]">.</span>CITY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                    ${isActive 
                      ? 'bg-[#003366] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#003366]'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(`nav.${item.key}`)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={`transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-auto'}`}>
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder={t('common.searchPlaceholder')}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pr-8 h-9"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-700 hover:text-[#003366] hover:bg-gray-100"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center gap-1 text-gray-700 hover:text-[#003366] hover:bg-gray-100"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase text-xs">{currentLang.code}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as LanguageCode)}
                    className={`flex items-center gap-2 ${
                      currentLanguage === lang.code ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-[#003366] hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-3
                    ${isActive 
                      ? 'bg-[#003366] text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#003366]'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{t(`nav.${item.key}`)}</span>
                </Link>
              );
            })}
            
            {/* Mobile Language Selector */}
            <div className="border-t pt-4 mt-2">
              <p className="text-xs text-gray-500 mb-2 px-4">{t('common.language')}</p>
              <div className="grid grid-cols-2 gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as LanguageCode)}
                    className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all
                      ${currentLanguage === lang.code 
                        ? 'bg-[#003366] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
