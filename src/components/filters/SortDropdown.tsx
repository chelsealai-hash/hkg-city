import { useTranslation } from 'react-i18next';
import { ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFilterStore } from '@/stores/firebaseStore';

const sortOptions = [
  { value: 'default', labelKey: 'filters.default' },
  { value: 'nameAsc', labelKey: 'filters.nameAsc' },
  { value: 'nameDesc', labelKey: 'filters.nameDesc' },
  { value: 'popular', labelKey: 'filters.popular' },
  { value: 'newest', labelKey: 'filters.newest' },
];

export function SortDropdown() {
  const { t } = useTranslation();
  const { sortBy, setSortBy } = useFilterStore();

  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-full sm:w-44">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
          <SelectValue placeholder={t('filters.sortBy')} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {t(option.labelKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
