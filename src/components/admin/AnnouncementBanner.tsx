import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Megaphone } from 'lucide-react';
import type { Announcement } from '@/types';

interface AnnouncementBannerProps {
  announcements: Announcement[];
  categoryId?: string;
}

export function AnnouncementBanner({ announcements, categoryId }: AnnouncementBannerProps) {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [dismissed, setDismissed] = useState<string[]>([]);

  // Filter active announcements
  const now = new Date().toISOString();
  const activeAnnouncements = announcements.filter(
    (ann) =>
      ann.isActive &&
      ann.startDate <= now &&
      ann.endDate >= now &&
      (categoryId ? ann.categoryId === categoryId : !ann.categoryId) &&
      !dismissed.includes(ann.id)
  );

  // Auto-rotate announcements
  useEffect(() => {
    if (activeAnnouncements.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeAnnouncements.length]);

  if (activeAnnouncements.length === 0 || !isVisible) {
    return null;
  }

  const currentAnnouncement = activeAnnouncements[currentIndex];
  const title = currentAnnouncement.title[i18n.language as keyof typeof currentAnnouncement.title] || 
                currentAnnouncement.title.en;
  const content = currentAnnouncement.content[i18n.language as keyof typeof currentAnnouncement.content] || 
                  currentAnnouncement.content.en;

  const handleDismiss = () => {
    setDismissed((prev) => [...prev, currentAnnouncement.id]);
    if (currentIndex >= activeAnnouncements.length - 1) {
      setIsVisible(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#003366] to-[#0066CC] text-white rounded-lg overflow-hidden shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Megaphone className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded">
                {t('common.announcement')}
              </span>
              {activeAnnouncements.length > 1 && (
                <span className="text-xs text-white/70">
                  {currentIndex + 1} / {activeAnnouncements.length}
                </span>
              )}
            </div>
            
            <h4 className="font-semibold text-sm mb-1">{title}</h4>
            <p className="text-sm text-white/90 line-clamp-2">{content}</p>
            
            {currentAnnouncement.image && (
              <div className="mt-2">
                <img 
                  src={currentAnnouncement.image} 
                  alt={title}
                  className="max-h-32 rounded object-cover"
                />
              </div>
            )}
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
            aria-label={t('common.close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Pagination Dots */}
        {activeAnnouncements.length > 1 && (
          <div className="flex justify-center gap-1 mt-2">
            {activeAnnouncements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
                aria-label={`Go to announcement ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
