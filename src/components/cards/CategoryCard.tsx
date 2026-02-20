import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  icon: LucideIcon;
}

export function CategoryCard({ category, icon: Icon }: CategoryCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const name = category.name[currentLang as keyof typeof category.name] || category.name.en;
  const description = category.description[currentLang as keyof typeof category.description] || category.description.en;

  return (
    <Link to={`/${category.slug}`}>
      <Card className="group h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer bg-white">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${category.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Icon Badge */}
          <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5 text-[#003366]" />
          </div>
        </div>
        
        {/* Content */}
        <CardContent className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#003366] transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {description}
          </p>
          <div className="flex items-center text-[#0066CC] text-sm font-medium">
            <span>{t('common.explore')}</span>
            <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
