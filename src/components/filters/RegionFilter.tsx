import { useTranslation } from 'react-i18next';
import { ChevronDown, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { regions } from '@/data/categories';
import { useFilterStore } from '@/stores/firebaseStore';

export function RegionFilter() {
  const { t, i18n } = useTranslation();
  const { region, subRegion, setRegion, setSubRegion } = useFilterStore();

  const currentLang = i18n.language;
  
  // Get selected region data
  const selectedRegion = regions.find(r => r.id === region);
  const subRegions = selectedRegion?.subRegions || [];

  const handleRegionChange = (value: string) => {
    setRegion(value === 'all' ? null : value);
  };

  const handleSubRegionChange = (value: string) => {
    setSubRegion(value === 'all' ? null : value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Region Select */}
      <div className="flex-1">
        <Select value={region || 'all'} onValueChange={handleRegionChange}>
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <SelectValue placeholder={t('filters.allRegions')} />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('filters.allRegions')}</SelectItem>
            {regions.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.name[currentLang as keyof typeof r.name] || r.name.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sub-region Select */}
      {subRegions.length > 0 && (
        <div className="flex-1">
          <Select value={subRegion || 'all'} onValueChange={handleSubRegionChange}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder={t('filters.allDistricts')} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters.allDistricts')}</SelectItem>
              {subRegions.map((sr) => (
                <SelectItem key={sr.id} value={sr.id}>
                  {sr.name[currentLang as keyof typeof sr.name] || sr.name.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
