import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterConfig } from '@/types';
import { useFilterStore } from '@/stores/firebaseStore';

interface FilterDropdownProps {
  filter: FilterConfig;
}

export function FilterDropdown({ filter }: FilterDropdownProps) {
  const { t, i18n } = useTranslation();
  const { filters, setFilter } = useFilterStore();
  
  const currentLang = i18n.language;
  const filterValue = filters[filter.key] || 'all';
  
  const label = filter.label[currentLang as keyof typeof filter.label] || filter.label.en;

  const handleChange = (value: string) => {
    setFilter(filter.key, value === 'all' ? '' : value);
  };

  return (
    <Select value={filterValue || 'all'} onValueChange={handleChange}>
      <SelectTrigger className="w-full sm:w-40">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <SelectValue placeholder={label} />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{t('common.all')}</SelectItem>
        {filter.options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label[currentLang as keyof typeof option.label] || option.label.en}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
