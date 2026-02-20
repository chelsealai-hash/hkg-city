import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Train, 
  Hotel, 
  Hospital, 
  Stethoscope, 
  UtensilsCrossed, 
  Palette, 
  Wrench,
  ArrowRight,
  MapPin,
  Users,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { AdBanner } from '@/components/ads/AdBanner';
import { AnnouncementBanner } from '@/components/admin/AnnouncementBanner';
import { categories } from '@/data/categories';
import { listings as staticListings } from '@/data/listings';
import { useTrafficStatsStore, useCMSStore } from '@/stores/firebaseStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categoryIcons = {
  transport: Train,
  hotels: Hotel,
  hospitals: Hospital,
  clinics: Stethoscope,
  dining: UtensilsCrossed,
  culture: Palette,
  others: Wrench,
};

// Sample announcements for demo
const sampleAnnouncements = [
  {
    id: '1',
    title: {
      en: 'Welcome to HKG.CITY',
      'zh-HK': '歡迎來到 HKG.CITY',
      'zh-CN': '欢迎来到 HKG.CITY',
      ja: 'HKG.CITY へようこそ',
      ko: 'HKG.CITY에 오신 것을 환영합니다',
      fr: 'Bienvenue sur HKG.CITY',
      de: 'Willkommen bei HKG.CITY',
      es: 'Bienvenido a HKG.CITY',
      pt: 'Bem-vindo ao HKG.CITY',
      th: 'ยินดีต้อนรับสู่ HKG.CITY'
    },
    content: {
      en: 'Your comprehensive guide to Hong Kong. Explore transportation, hotels, hospitals, dining, and more.',
      'zh-HK': '您的香港綜合指南。探索交通、酒店、醫院、餐飲等。',
      'zh-CN': '您的香港综合指南。探索交通、酒店、医院、餐饮等。',
      ja: '香港の総合ガイド。交通、ホテル、病院、飲食などを探索。',
      ko: '홍콩 종합 가이드. 교통, 호텔, 병원, 다이닝 등을 탐색하세요.',
      fr: 'Votre guide complet de Hong Kong. Explorez les transports, hôtels, hôpitaux, restauration et plus.',
      de: 'Ihr umfassender Guide für Hongkong. Entdecken Sie Transport, Hotels, Krankenhäuser, Gastronomie und mehr.',
      es: 'Su guía completa de Hong Kong. Explore transporte, hoteles, hospitales, restaurantes y más.',
      pt: 'Seu guia completo de Hong Kong. Explore transporte, hotéis, hospitais, restaurantes e mais.',
      th: 'คู่มือฮ่องกงที่ครอบคลุมของคุณ สำรวจการคมนาคม โรงแรม โรงพยาบาล ร้านอาหาร และอื่นๆ'
    },
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export function HomePage() {
  const { t } = useTranslation();
  const { incrementPageView } = useTrafficStatsStore();
  const { listings, fetchListings } = useCMSStore();
  const [listingsCount, setListingsCount] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Track page view and fetch listings
  useEffect(() => {
    incrementPageView();
    fetchListings();
  }, [incrementPageView, fetchListings]);

  // Update listings count - use Firebase data if available, fallback to static
  useEffect(() => {
    const count = listings.length > 0 ? listings.length : staticListings.length;
    setListingsCount(count);
  }, [listings]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      });
      
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: 'back.out(1.7)',
      });

      // About section
      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Categories section
      gsap.from('.category-card', {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // CTA section
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const activeCategories = categories.filter(c => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/80 via-[#003366]/60 to-[#003366]/80" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="hero-title block">{t('hero.title1')}</span>
              <span className="hero-title block text-[#0066CC]">{t('hero.title2')}</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#0066CC] hover:bg-[#0052a3] text-white px-8"
                asChild
              >
                <Link to="/transport">
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#003366]"
                asChild
              >
                <Link to="/hotels">
                  {t('common.explore')} {t('nav.hotels')}
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#0066CC]">7+</div>
              <div className="text-sm text-gray-300">{t('common.categories')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#0066CC]">{listingsCount > 0 ? listingsCount : '...'}</div>
              <div className="text-sm text-gray-300">{t('common.listings')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#0066CC]">10</div>
              <div className="text-sm text-gray-300"><Globe className="w-4 h-4 inline mr-1"/>{t('common.language')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#0066CC]">24/7</div>
              <div className="text-sm text-gray-300"><Users className="w-4 h-4 inline mr-1"/>Support</div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Top Ad Banner */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdBanner position="top" className="mx-auto" />
        </div>
      </section>

      {/* Announcement Banner */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <AnnouncementBanner announcements={sampleAnnouncements} />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="about-card bg-gradient-to-br from-[#003366] to-[#0066CC] rounded-2xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('about.card1Title')}</h3>
              <p className="text-white/80">{t('about.card1Desc')}</p>
            </div>
            
            <div className="about-card bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('about.card2Title')}</h3>
              <p className="text-white/80">{t('about.card2Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Middle Ad Banner */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdBanner position="middle" className="mx-auto" />
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('categories.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('categories.subtitle')}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeCategories.map((category) => {
              const icon = categoryIcons[category.id as keyof typeof categoryIcons] || MapPin;
              return (
                <div key={category.id} className="category-card">
                  <CategoryCard category={category} icon={icon} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="relative py-24 md:py-32 overflow-hidden"
      >
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-[#003366]/80" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="cta-content max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              {t('cta.description')}
            </p>
            <Button 
              size="lg" 
              className="bg-white text-[#003366] hover:bg-gray-100 px-8"
              asChild
            >
              <Link to="/transport">
                {t('cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom Ad Banner */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdBanner position="bottom" className="mx-auto" />
        </div>
      </section>
    </div>
  );
}
