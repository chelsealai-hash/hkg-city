import type { Category, Region } from '@/types';

export const categories: Category[] = [
  {
    id: 'transport',
    slug: 'transport',
    name: {
      en: 'Transportation',
      'zh-HK': '交通運輸',
      'zh-CN': '交通运输',
      ja: '交通',
      ko: '교통',
      fr: 'Transport',
      de: 'Transport',
      es: 'Transporte',
      pt: 'Transporte',
      th: 'การคมนาคม'
    },
    description: {
      en: 'Public transport, airport, and getting around Hong Kong',
      'zh-HK': '公共交通、機場及香港出行指南',
      'zh-CN': '公共交通、机场及香港出行指南',
      ja: '公共交通、空港、香港での移動方法',
      ko: '대중교통, 공항, 홍콩 이동 방법',
      fr: 'Transports publics, aéroport et déplacements à Hong Kong',
      de: 'Öffentliche Verkehrsmittel, Flughafen und Fortbewegung in Hongkong',
      es: 'Transporte público, aeropuerto y cómo moverse por Hong Kong',
      pt: 'Transporte público, aeroporto e como se locomover em Hong Kong',
      th: 'การคมนาคมสาธารณะ สนามบิน และการเดินทางในฮ่องกง'
    },
    image: '/images/categories/transport.jpg',
    icon: 'Train',
    sortOrder: 1,
    isActive: true,
    filters: [
      {
        key: 'type',
        type: 'select',
        label: {
          en: 'Type',
          'zh-HK': '類型',
          'zh-CN': '类型',
          ja: '種類',
          ko: '유형',
          fr: 'Type',
          de: 'Typ',
          es: 'Tipo',
          pt: 'Tipo',
          th: 'ประเภท'
        },
        options: [
          { value: 'mtr', label: { en: 'MTR', 'zh-HK': '港鐵', 'zh-CN': '港铁', ja: 'MTR', ko: '지하철', fr: 'MTR', de: 'MTR', es: 'MTR', pt: 'MTR', th: 'รถไฟฟ้า' } },
          { value: 'bus', label: { en: 'Bus', 'zh-HK': '巴士', 'zh-CN': '巴士', ja: 'バス', ko: '버스', fr: 'Bus', de: 'Bus', es: 'Autobús', pt: 'Ônibus', th: 'รถบัส' } },
          { value: 'taxi', label: { en: 'Taxi', 'zh-HK': '的士', 'zh-CN': '的士', ja: 'タクシー', ko: '택시', fr: 'Taxi', de: 'Taxi', es: 'Taxi', pt: 'Táxi', th: 'แท็กซี่' } },
          { value: 'airport', label: { en: 'Airport', 'zh-HK': '機場', 'zh-CN': '机场', ja: '空港', ko: '공항', fr: 'Aéroport', de: 'Flughafen', es: 'Aeropuerto', pt: 'Aeroporto', th: 'สนามบิน' } }
        ]
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'hotels',
    slug: 'hotels',
    name: {
      en: 'Hotels',
      'zh-HK': '酒店',
      'zh-CN': '酒店',
      ja: 'ホテル',
      ko: '호텔',
      fr: 'Hôtels',
      de: 'Hotels',
      es: 'Hoteles',
      pt: 'Hotéis',
      th: 'โรงแรม'
    },
    description: {
      en: 'Hotels and accommodations by district and star rating',
      'zh-HK': '按地區和星級分類的酒店及住宿',
      'zh-CN': '按地区和星级分类的酒店及住宿',
      ja: '地区と星評価別のホテルと宿泊施設',
      ko: '지역 및 등급별 호텔 및 숙박시설',
      fr: 'Hôtels et hébergements par quartier et étoiles',
      de: 'Hotels und Unterkünfte nach Stadtteil und Sternebewertung',
      es: 'Hoteles y alojamientos por distrito y categoría',
      pt: 'Hotéis e acomodações por distrito e classificação',
      th: 'โรงแรมและที่พักตามเขตและระดับดาว'
    },
    image: '/images/categories/hotels.jpg',
    icon: 'Hotel',
    sortOrder: 2,
    isActive: true,
    filters: [
      {
        key: 'stars',
        type: 'select',
        label: {
          en: 'Star Rating',
          'zh-HK': '星級',
          'zh-CN': '星级',
          ja: '星評価',
          ko: '등급',
          fr: 'Étoiles',
          de: 'Sternebewertung',
          es: 'Categoría',
          pt: 'Classificação',
          th: 'ระดับดาว'
        },
        options: [
          { value: '5', label: { en: '5 Stars', 'zh-HK': '五星級', 'zh-CN': '五星级', ja: '5つ星', ko: '5성급', fr: '5 étoiles', de: '5 Sterne', es: '5 estrellas', pt: '5 estrelas', th: '5 ดาว' } },
          { value: '4', label: { en: '4 Stars', 'zh-HK': '四星級', 'zh-CN': '四星级', ja: '4つ星', ko: '4성급', fr: '4 étoiles', de: '4 Sterne', es: '4 estrellas', pt: '4 estrelas', th: '4 ดาว' } },
          { value: '3', label: { en: '3 Stars', 'zh-HK': '三星級', 'zh-CN': '三星级', ja: '3つ星', ko: '3성급', fr: '3 étoiles', de: '3 Sterne', es: '3 estrellas', pt: '3 estrelas', th: '3 ดาว' } },
          { value: 'budget', label: { en: 'Budget', 'zh-HK': '經濟型', 'zh-CN': '经济型', ja: '格安', ko: '저렴한', fr: 'Économique', de: 'Günstig', es: 'Económico', pt: 'Econômico', th: 'ราคาประหยัด' } }
        ]
      },
      {
        key: 'priceRange',
        type: 'select',
        label: {
          en: 'Price Range',
          'zh-HK': '價格範圍',
          'zh-CN': '价格范围',
          ja: '価格帯',
          ko: '가격대',
          fr: 'Gamme de prix',
          de: 'Preisspanne',
          es: 'Rango de precios',
          pt: 'Faixa de preço',
          th: 'ช่วงราคา'
        },
        options: [
          { value: 'luxury', label: { en: 'Luxury (HK$2000+)', 'zh-HK': '豪華 (HK$2000+)', 'zh-CN': '豪华 (HK$2000+)', ja: '高級 (HK$2000+)', ko: '럭셔리 (HK$2000+)', fr: 'Luxe (HK$2000+)', de: 'Luxus (HK$2000+)', es: 'Lujo (HK$2000+)', pt: 'Luxo (HK$2000+)', th: 'หรูหรา (HK$2000+)' } },
          { value: 'mid', label: { en: 'Mid-range (HK$800-2000)', 'zh-HK': '中檔 (HK$800-2000)', 'zh-CN': '中档 (HK$800-2000)', ja: '中級 (HK$800-2000)', ko: '중급 (HK$800-2000)', fr: 'Milieu de gamme (HK$800-2000)', de: 'Mittelklasse (HK$800-2000)', es: 'Gama media (HK$800-2000)', pt: 'Médio (HK$800-2000)', th: 'ระดับกลาง (HK$800-2000)' } },
          { value: 'budget', label: { en: 'Budget (Under HK$800)', 'zh-HK': '經濟型 (HK$800以下)', 'zh-CN': '经济型 (HK$800以下)', ja: '格安 (HK$800以下)', ko: '저렴한 (HK$800미만)', fr: 'Économique (Moins de HK$800)', de: 'Günstig (Unter HK$800)', es: 'Económico (Menos de HK$800)', pt: 'Econômico (Menos de HK$800)', th: 'ราคาประหยัด (ต่ำกว่า HK$800)' } }
        ]
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'hospitals',
    slug: 'hospitals',
    name: {
      en: 'Hospitals',
      'zh-HK': '醫院',
      'zh-CN': '医院',
      ja: '病院',
      ko: '병원',
      fr: 'Hôpitaux',
      de: 'Krankenhäuser',
      es: 'Hospitales',
      pt: 'Hospitais',
      th: 'โรงพยาบาล'
    },
    description: {
      en: 'Public and private hospitals by district',
      'zh-HK': '按地區分類的公立及私立醫院',
      'zh-CN': '按地区分类的公立及私立医院',
      ja: '地区別の公立・私立病院',
      ko: '지역별 공공 및 사립 병원',
      fr: 'Hôpitaux publics et privés par quartier',
      de: 'Öffentliche und private Krankenhäuser nach Stadtteil',
      es: 'Hospitales públicos y privados por distrito',
      pt: 'Hospitais públicos e privados por distrito',
      th: 'โรงพยาบาลรัฐและเอกชนตามเขต'
    },
    image: '/images/categories/hospitals.jpg',
    icon: 'Hospital',
    sortOrder: 3,
    isActive: true,
    filters: [
      {
        key: 'isPublic',
        type: 'select',
        label: {
          en: 'Type',
          'zh-HK': '類型',
          'zh-CN': '类型',
          ja: '種類',
          ko: '유형',
          fr: 'Type',
          de: 'Typ',
          es: 'Tipo',
          pt: 'Tipo',
          th: 'ประเภท'
        },
        options: [
          { value: 'true', label: { en: 'Public', 'zh-HK': '公立', 'zh-CN': '公立', ja: '公立', ko: '공공', fr: 'Public', de: 'Öffentlich', es: 'Público', pt: 'Público', th: 'รัฐ' } },
          { value: 'false', label: { en: 'Private', 'zh-HK': '私立', 'zh-CN': '私立', ja: '私立', ko: '사립', fr: 'Privé', de: 'Privat', es: 'Privado', pt: 'Privado', th: 'เอกชน' } }
        ]
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'clinics',
    slug: 'clinics',
    name: {
      en: 'Clinics',
      'zh-HK': '診所',
      'zh-CN': '诊所',
      ja: 'クリニック',
      ko: '의원',
      fr: 'Cliniques',
      de: 'Kliniken',
      es: 'Clínicas',
      pt: 'Clínicas',
      th: 'คลินิก'
    },
    description: {
      en: 'Medical clinics with opening hours information',
      'zh-HK': '附帶營業時間資訊的醫療診所',
      'zh-CN': '附带营业时间资讯的医疗诊所',
      ja: '営業時間情報付きの医療クリニック',
      ko: '영업시간 정보가 있는 의료 의원',
      fr: 'Cliniques médicales avec informations d\'ouverture',
      de: 'Medizinische Kliniken mit Öffnungszeiten',
      es: 'Clínicas médicas con información de horario',
      pt: 'Clínicas médicas com informações de horário',
      th: 'คลินิกการแพทย์พร้อมข้อมูลเวลาทำการ'
    },
    image: '/images/categories/clinics.jpg',
    icon: 'Stethoscope',
    sortOrder: 4,
    isActive: true,
    filters: [
      {
        key: 'openingHours',
        type: 'select',
        label: {
          en: 'Opening Hours',
          'zh-HK': '營業時間',
          'zh-CN': '营业时间',
          ja: '営業時間',
          ko: '영업시간',
          fr: 'Heures d\'ouverture',
          de: 'Öffnungszeiten',
          es: 'Horario',
          pt: 'Horário',
          th: 'เวลาทำการ'
        },
        options: [
          { value: '24h', label: { en: '24 Hours', 'zh-HK': '24小時', 'zh-CN': '24小时', ja: '24時間', ko: '24시간', fr: '24 heures', de: '24 Stunden', es: '24 horas', pt: '24 horas', th: '24 ชั่วโมง' } },
          { value: 'weekends', label: { en: 'Weekends', 'zh-HK': '週末營業', 'zh-CN': '周末营业', ja: '週末営業', ko: '주말영업', fr: 'Week-ends', de: 'Wochenenden', es: 'Fines de semana', pt: 'Fins de semana', th: 'สุดสัปดาห์' } },
          { value: 'weekdays', label: { en: 'Weekdays Only', 'zh-HK': '僅平日', 'zh-CN': '仅平日', ja: '平日のみ', ko: '평일만', fr: 'Semaine uniquement', de: 'Nur Wochentage', es: 'Solo días laborables', pt: 'Apenas dias úteis', th: 'วันธรรมดาเท่านั้น' } }
        ]
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'dining',
    slug: 'dining',
    name: {
      en: 'Dining',
      'zh-HK': '餐飲',
      'zh-CN': '餐饮',
      ja: '飲食',
      ko: '다이닝',
      fr: 'Restauration',
      de: 'Gastronomie',
      es: 'Restaurantes',
      pt: 'Restauração',
      th: 'ร้านอาหาร'
    },
    description: {
      en: 'Restaurants, dining guides, and famous chains',
      'zh-HK': '餐廳、美食指南及知名連鎖店',
      'zh-CN': '餐厅、美食指南及知名连锁店',
      ja: 'レストラン、飲食ガイド、有名チェーン店',
      ko: '레스토랑, 다이닝 가이드, 유명 체인점',
      fr: 'Restaurants, guides gastronomiques et chaînes célèbres',
      de: 'Restaurants, Gastronomieführer und bekannte Ketten',
      es: 'Restaurantes, guías gastronómicas y cadenas famosas',
      pt: 'Restaurantes, guias gastronômicos e redes famosas',
      th: 'ร้านอาหาร คู่มือร้านอาหาร และเชนดัง'
    },
    image: '/images/categories/dining.jpg',
    icon: 'UtensilsCrossed',
    sortOrder: 5,
    isActive: true,
    filters: [
      {
        key: 'type',
        type: 'select',
        label: {
          en: 'Type',
          'zh-HK': '類型',
          'zh-CN': '类型',
          ja: '種類',
          ko: '유형',
          fr: 'Type',
          de: 'Typ',
          es: 'Tipo',
          pt: 'Tipo',
          th: 'ประเภท'
        },
        options: [
          { value: 'portal', label: { en: 'Dining Portal', 'zh-HK': '美食平台', 'zh-CN': '美食平台', ja: '飲食ポータル', ko: '다이닝 포털', fr: 'Portail restauration', de: 'Gastronomie-Portal', es: 'Portal gastronómico', pt: 'Portal de restauração', th: 'พอร์ทัลร้านอาหาร' } },
          { value: 'chain', label: { en: 'Chain Store', 'zh-HK': '連鎖店', 'zh-CN': '连锁店', ja: 'チェーン店', ko: '체인점', fr: 'Chaîne', de: 'Kette', es: 'Cadena', pt: 'Rede', th: 'เชน' } },
          { value: 'event', label: { en: 'Dining Event', 'zh-HK': '美食活動', 'zh-CN': '美食活动', ja: '飲食イベント', ko: '다이닝 이벤트', fr: 'Événement', de: 'Veranstaltung', es: 'Evento', pt: 'Evento', th: 'กิจกรรม' } }
        ]
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'culture',
    slug: 'culture',
    name: {
      en: 'Culture & Amusement',
      'zh-HK': '文化娛樂',
      'zh-CN': '文化娱乐',
      ja: '文化・娯楽',
      ko: '문화 및 오락',
      fr: 'Culture et Loisirs',
      de: 'Kultur und Unterhaltung',
      es: 'Cultura y Entretenimiento',
      pt: 'Cultura e Lazer',
      th: 'วัฒนธรรมและความบันเทิง'
    },
    description: {
      en: 'Museums, theme parks, and tourist attractions',
      'zh-HK': '博物館、主題公園及旅遊景點',
      'zh-CN': '博物馆、主题公园及旅游景点',
      ja: '博物館、テーマパーク、観光名所',
      ko: '박물관, 테마파크, 관광 명소',
      fr: 'Musées, parcs à thème et attractions touristiques',
      de: 'Museen, Themenparks und Touristenattraktionen',
      es: 'Museos, parques temáticos y atracciones turísticas',
      pt: 'Museus, parques temáticos e atrações turísticas',
      th: 'พิพิธภัณฑ์ สวนสนุก และสถานที่ท่องเที่ยว'
    },
    image: '/images/categories/culture.jpg',
    icon: 'Palette',
    sortOrder: 6,
    isActive: true,
    filters: [
      {
        key: 'type',
        type: 'select',
        label: {
          en: 'Type',
          'zh-HK': '類型',
          'zh-CN': '类型',
          ja: '種類',
          ko: '유형',
          fr: 'Type',
          de: 'Typ',
          es: 'Tipo',
          pt: 'Tipo',
          th: 'ประเภท'
        },
        options: [
          { value: 'museum', label: { en: 'Museum', 'zh-HK': '博物館', 'zh-CN': '博物馆', ja: '博物館', ko: '박물관', fr: 'Musée', de: 'Museum', es: 'Museo', pt: 'Museu', th: 'พิพิธภัณฑ์' } },
          { value: 'themepark', label: { en: 'Theme Park', 'zh-HK': '主題公園', 'zh-CN': '主题公园', ja: 'テーマパーク', ko: '테마파크', fr: 'Parc à thème', de: 'Themenpark', es: 'Parque temático', pt: 'Parque temático', th: 'สวนสนุก' } },
          { value: 'attraction', label: { en: 'Attraction', 'zh-HK': '景點', 'zh-CN': '景点', ja: '名所', ko: '명소', fr: 'Attraction', de: 'Attraktion', es: 'Atracción', pt: 'Atração', th: 'สถานที่ท่องเที่ยว' } },
          { value: 'sports', label: { en: 'Sports', 'zh-HK': '體育', 'zh-CN': '体育', ja: 'スポーツ', ko: '스포츠', fr: 'Sports', de: 'Sport', es: 'Deportes', pt: 'Esportes', th: 'กีฬา' } }
        ]
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'others',
    slug: 'others',
    name: {
      en: 'Other Services',
      'zh-HK': '其他服務',
      'zh-CN': '其他服务',
      ja: 'その他のサービス',
      ko: '기타 서비스',
      fr: 'Autres Services',
      de: 'Weitere Dienstleistungen',
      es: 'Otros Servicios',
      pt: 'Outros Serviços',
      th: 'บริการอื่นๆ'
    },
    description: {
      en: 'Car rental, emergency services, and more',
      'zh-HK': '租車、緊急服務等',
      'zh-CN': '租车、紧急服务等',
      ja: 'レンタカー、緊急サービスなど',
      ko: '렌터카, 긴급 서비스 등',
      fr: 'Location de voitures, services d\'urgence et plus',
      de: 'Autovermietung, Notdienste und mehr',
      es: 'Alquiler de coches, servicios de emergencia y más',
      pt: 'Aluguel de carros, serviços de emergência e mais',
      th: 'เช่ารถ บริการฉุกเฉิน และอื่นๆ'
    },
    image: '/images/categories/others.jpg',
    icon: 'Wrench',
    sortOrder: 7,
    isActive: true,
    filters: [
      {
        key: 'type',
        type: 'select',
        label: {
          en: 'Type',
          'zh-HK': '類型',
          'zh-CN': '类型',
          ja: '種類',
          ko: '유형',
          fr: 'Type',
          de: 'Typ',
          es: 'Tipo',
          pt: 'Tipo',
          th: 'ประเภท'
        },
        options: [
          { value: 'car', label: { en: 'Car Rental', 'zh-HK': '租車', 'zh-CN': '租车', ja: 'レンタカー', ko: '렌터카', fr: 'Location', de: 'Autovermietung', es: 'Alquiler', pt: 'Aluguel', th: 'เช่ารถ' } },
          { value: 'emergency', label: { en: 'Emergency', 'zh-HK': '緊急服務', 'zh-CN': '紧急服务', ja: '緊急サービス', ko: '긴급 서비스', fr: 'Urgence', de: 'Notdienst', es: 'Emergencia', pt: 'Emergência', th: 'ฉุกเฉิน' } }
        ]
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const regions: Region[] = [
  {
    id: 'hongkong-island',
    name: {
      en: 'Hong Kong Island',
      'zh-HK': '香港島',
      'zh-CN': '香港岛',
      ja: '香港島',
      ko: '홍콩 섬',
      fr: 'Île de Hong Kong',
      de: 'Hongkong-Insel',
      es: 'Isla de Hong Kong',
      pt: 'Ilha de Hong Kong',
      th: 'เกาะฮ่องกง'
    },
    subRegions: [
      { id: 'central', name: { en: 'Central', 'zh-HK': '中環', 'zh-CN': '中环', ja: 'セントラル', ko: '중앙', fr: 'Central', de: 'Zentral', es: 'Central', pt: 'Central', th: 'เซ็นทรัล' } },
      { id: 'wan-chai', name: { en: 'Wan Chai', 'zh-HK': '灣仔', 'zh-CN': '湾仔', ja: 'ワンチャイ', ko: '완차이', fr: 'Wan Chai', de: 'Wan Chai', es: 'Wan Chai', pt: 'Wan Chai', th: 'วานไช่' } },
      { id: 'causeway-bay', name: { en: 'Causeway Bay', 'zh-HK': '銅鑼灣', 'zh-CN': '铜锣湾', ja: 'コーズウェイベイ', ko: '코즈웨이베이', fr: 'Causeway Bay', de: 'Causeway Bay', es: 'Causeway Bay', pt: 'Causeway Bay', th: 'คอสเวย์เบย์' } },
      { id: 'stanley', name: { en: 'Stanley', 'zh-HK': '赤柱', 'zh-CN': '赤柱', ja: 'スタンレー', ko: '스탠리', fr: 'Stanley', de: 'Stanley', es: 'Stanley', pt: 'Stanley', th: 'สแตนเลย์' } }
    ]
  },
  {
    id: 'kowloon',
    name: {
      en: 'Kowloon',
      'zh-HK': '九龍',
      'zh-CN': '九龙',
      ja: '九龍',
      ko: '구룡',
      fr: 'Kowloon',
      de: 'Kowloon',
      es: 'Kowloon',
      pt: 'Kowloon',
      th: 'เกาลูน'
    },
    subRegions: [
      { id: 'tsim-sha-tsui', name: { en: 'Tsim Sha Tsui', 'zh-HK': '尖沙咀', 'zh-CN': '尖沙咀', ja: '尖沙咀', ko: '침사추이', fr: 'Tsim Sha Tsui', de: 'Tsim Sha Tsui', es: 'Tsim Sha Tsui', pt: 'Tsim Sha Tsui', th: 'จิมซาโจ่ย' } },
      { id: 'mong-kok', name: { en: 'Mong Kok', 'zh-HK': '旺角', 'zh-CN': '旺角', ja: '旺角', ko: '몽콕', fr: 'Mong Kok', de: 'Mong Kok', es: 'Mong Kok', pt: 'Mong Kok', th: 'มงก๊ก' } },
      { id: 'yau-ma-tei', name: { en: 'Yau Ma Tei', 'zh-HK': '油麻地', 'zh-CN': '油麻地', ja: '油麻地', ko: '야우마테이', fr: 'Yau Ma Tei', de: 'Yau Ma Tei', es: 'Yau Ma Tei', pt: 'Yau Ma Tei', th: 'ย่าม่าตี๋' } },
      { id: 'kowloon-bay', name: { en: 'Kowloon Bay', 'zh-HK': '九龍灣', 'zh-CN': '九龙湾', ja: '九龍灣', ko: '구룡만', fr: 'Kowloon Bay', de: 'Kowloon Bay', es: 'Kowloon Bay', pt: 'Kowloon Bay', th: 'อ่าวเกาลูน' } }
    ]
  },
  {
    id: 'new-territories',
    name: {
      en: 'New Territories',
      'zh-HK': '新界',
      'zh-CN': '新界',
      ja: '新界',
      ko: '신제',
      fr: 'Nouveaux Territoires',
      de: 'Neue Territorien',
      es: 'Nuevos Territorios',
      pt: 'Novos Territórios',
      th: 'นิวเทอริทอรี่ส์'
    },
    subRegions: [
      { id: 'sha-tin', name: { en: 'Sha Tin', 'zh-HK': '沙田', 'zh-CN': '沙田', ja: '沙田', ko: '사틴', fr: 'Sha Tin', de: 'Sha Tin', es: 'Sha Tin', pt: 'Sha Tin', th: 'ซาติน' } },
      { id: 'tuen-mun', name: { en: 'Tuen Mun', 'zh-HK': '屯門', 'zh-CN': '屯门', ja: '屯門', ko: '툰먼', fr: 'Tuen Mun', de: 'Tuen Mun', es: 'Tuen Mun', pt: 'Tuen Mun', th: 'ทวนมุน' } },
      { id: 'tsuen-wan', name: { en: 'Tsuen Wan', 'zh-HK': '荃灣', 'zh-CN': '荃湾', ja: '荃灣', ko: '취완', fr: 'Tsuen Wan', de: 'Tsuen Wan', es: 'Tsuen Wan', pt: 'Tsuen Wan', th: 'ชวนวาน' } },
      { id: 'tseung-kwan-o', name: { en: 'Tseung Kwan O', 'zh-HK': '將軍澳', 'zh-CN': '将军澳', ja: '將軍澳', ko: '장군오', fr: 'Tseung Kwan O', de: 'Tseung Kwan O', es: 'Tseung Kwan O', pt: 'Tseung Kwan O', th: 'เจื้องกวนออ' } }
    ]
  },
  {
    id: 'outlying-islands',
    name: {
      en: 'Outlying Islands',
      'zh-HK': '離島',
      'zh-CN': '离岛',
      ja: '離島',
      ko: '이도',
      fr: 'Îles périphériques',
      de: 'Außeninseln',
      es: 'Islas periféricas',
      pt: 'Ilhas periféricas',
      th: 'เกาะรอบนอก'
    },
    subRegions: [
      { id: 'lantau', name: { en: 'Lantau Island', 'zh-HK': '大嶼山', 'zh-CN': '大屿山', ja: '大嶼山', ko: '란타우섬', fr: 'Île de Lantau', de: 'Lantau-Insel', es: 'Isla Lantau', pt: 'Ilha Lantau', th: 'เกาะลันเตา' } },
      { id: 'cheung-chau', name: { en: 'Cheung Chau', 'zh-HK': '長洲', 'zh-CN': '长洲', ja: '長洲', ko: '청주', fr: 'Cheung Chau', de: 'Cheung Chau', es: 'Cheung Chau', pt: 'Cheung Chau', th: 'เชืองเจา' } },
      { id: 'lamma', name: { en: 'Lamma Island', 'zh-HK': '南丫島', 'zh-CN': '南丫岛', ja: '南丫島', ko: '라마섬', fr: 'Île Lamma', de: 'Lamma-Insel', es: 'Isla Lamma', pt: 'Ilha Lamma', th: 'เกาะลัมมา' } }
    ]
  }
];
