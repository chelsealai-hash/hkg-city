import { useTranslation } from 'react-i18next';
import { ExternalLink, MapPin, Phone, Star, Clock, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Listing } from '@/types';
import { regions } from '@/data/categories';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const name = listing.name[currentLang as keyof typeof listing.name] || listing.name.en;
  const description = listing.description?.[currentLang as keyof typeof listing.description] || listing.description?.en;
  
  // Get region name
  const region = regions.find(r => r.id === listing.region);
  const regionName = region?.name[currentLang as keyof typeof region.name] || region?.name.en;
  
  // Get subregion name
  const subRegion = region?.subRegions?.find(sr => sr.id === listing.subRegion);
  const subRegionName = subRegion?.name[currentLang as keyof typeof subRegion.name] || subRegion?.name.en;

  const handleClick = () => {
    // Track click (in production, this would call an API)
    console.log(`Listing clicked: ${listing.id}`);
    window.open(listing.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      className="group h-full overflow-hidden border border-gray-200 hover:border-[#0066CC] hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
      onClick={handleClick}
    >
      {/* Image */}
      {listing.image && (
        <div className="relative h-40 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${listing.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {listing.metadata.isPublic !== undefined && (
              <Badge 
                variant={listing.metadata.isPublic ? 'default' : 'secondary'}
                className={`text-xs ${listing.metadata.isPublic ? 'bg-green-600' : 'bg-amber-600'}`}
              >
                {listing.metadata.isPublic ? t('common.public') : t('common.private')}
              </Badge>
            )}
            {listing.metadata.stars && (
              <Badge className="bg-[#003366] text-xs flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-current" />
                {listing.metadata.stars}
              </Badge>
            )}
          </div>
        </div>
      )}
      
      {/* Content */}
      <CardContent className={`p-4 ${!listing.image ? 'pt-5' : ''}`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-[#003366] transition-colors line-clamp-1">
            {name}
          </h3>
          <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {description}
          </p>
        )}
        
        {/* Meta Info */}
        <div className="space-y-1.5">
          {/* Location */}
          {(regionName || subRegionName) && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="line-clamp-1">
                {[subRegionName, regionName].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
          
          {/* Address - Clickable to Google Maps */}
          {listing.metadata.address && (
            <div className="flex items-center gap-1.5 text-xs">
              <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.metadata.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="line-clamp-1 text-[#0066CC] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {listing.metadata.address}
              </a>
            </div>
          )}
          
          {/* Phone - Clickable to call */}
          {listing.metadata.phone && (
            <div className="flex items-center gap-1.5 text-xs">
              <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
              <a 
                href={`tel:${listing.metadata.phone.replace(/\s/g, '')}`}
                className="text-[#0066CC] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {listing.metadata.phone}
              </a>
            </div>
          )}
          
          {/* Opening Hours */}
          {listing.metadata.openingHours && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="line-clamp-1">{listing.metadata.openingHours}</span>
            </div>
          )}
          
          {/* Price Range */}
          {listing.metadata.priceRange && (
            <div className="flex items-center gap-1.5 text-xs">
              <Badge variant="outline" className="text-xs py-0">
                {listing.metadata.priceRange === 'luxury' && t('common.luxury')}
                {listing.metadata.priceRange === 'mid' && t('common.midRange')}
                {listing.metadata.priceRange === 'budget' && t('common.budget')}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
