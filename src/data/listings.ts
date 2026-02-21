import type { Listing } from '@/types';

export const listings: Listing[] = [
  // Transportation
  {
    id: 'mtr',
    categoryId: 'transport',
    name: {
      en: 'MTR Corporation',
      'zh-HK': '港鐵公司',
      'zh-CN': '港铁公司',
      ja: 'MTRコーポレーション',
      ko: 'MTR 코퍼레이션',
      fr: 'MTR Corporation',
      de: 'MTR Corporation',
      es: 'MTR Corporation',
      pt: 'MTR Corporation',
      th: 'MTR คอร์ปอเรชั่น'
    },
    description: {
      en: 'Hong Kong\'s comprehensive rail system covering urban and airport routes',
      'zh-HK': '香港綜合鐵路系統，覆蓋市區及機場路線',
      'zh-CN': '香港综合铁路系统，覆盖市区及机场路线',
      ja: '香港の総合鉄道システム、都市部と空港路線をカバー',
      ko: '홍콩의 종합 철도 시스템, 도시 및 공항 노선 커버',
      fr: 'Système ferroviaire complet de Hong Kong couvrant les zones urbaines et l\'aéroport',
      de: 'Hongkongs umfassendes Bahnnetz mit Stadt- und Flughafenrouten',
      es: 'Sistema ferroviario integral de Hong Kong que cubre rutas urbanas y del aeropuerto',
      pt: 'Sistema ferroviário abrangente de Hong Kong cobrindo rotas urbanas e do aeroporto',
      th: 'ระบบรถไฟครอบคลุมของฮ่องกง ครอบคลุมเส้นทางในเมืองและสนามบิน'
    },
    url: 'https://www.mtr.com.hk',
    image: '/images/listings/mtr.jpg',
    region: 'hongkong-island',
    subRegion: 'central',
    metadata: {
      tags: ['mtr', 'rail', 'airport-express']
    },
    sortOrder: 1,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'citybus',
    categoryId: 'transport',
    name: {
      en: 'Citybus',
      'zh-HK': '城巴',
      'zh-CN': '城巴',
      ja: 'シティバス',
      ko: '시티버스',
      fr: 'Citybus',
      de: 'Citybus',
      es: 'Citybus',
      pt: 'Citybus',
      th: 'ซิตี้บัส'
    },
    description: {
      en: 'Major bus operator serving Hong Kong Island and cross-harbour routes',
      'zh-HK': '主要巴士營運商，服務香港島及過海路線',
      'zh-CN': '主要巴士营运商，服务香港岛及过海路线',
      ja: '香港島と港を横断する路線を運営する主要バス事業者',
      ko: '홍콩 섬 및 횡단 항로를 운영하는 주요 버스 운영업체',
      fr: 'Principal opérateur de bus desservant l\'île de Hong Kong et les routes trans-harbour',
      de: 'Großer Busanbieter für Hongkong-Insel und Hafenüberquerungsrouten',
      es: 'Principal operador de autobuses que sirve la isla de Hong Kong y rutas transpuerto',
      pt: 'Principal operador de ônibus atendendo a Ilha de Hong Kong e rotas trans-baía',
      th: 'ผู้ให้บริการรถบัสรายใหญ่ให้บริการเกาะฮ่องกงและเส้นทางข้ามอ่าว'
    },
    url: 'https://www.citybus.com.hk',
    image: '/images/listings/citybus.jpg',
    region: 'hongkong-island',
    subRegion: 'central',
    metadata: {
      tags: ['bus', 'citybus']
    },
    sortOrder: 2,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'kmb',
    categoryId: 'transport',
    name: {
      en: 'KMB',
      'zh-HK': '九巴',
      'zh-CN': '九巴',
      ja: 'KMB',
      ko: 'KMB',
      fr: 'KMB',
      de: 'KMB',
      es: 'KMB',
      pt: 'KMB',
      th: 'KMB'
    },
    description: {
      en: 'Kowloon Motor Bus - largest bus operator in Hong Kong',
      'zh-HK': '九龍巴士 - 香港最大的巴士營運商',
      'zh-CN': '九龙巴士 - 香港最大的巴士营运商',
      ja: '九龍モーターバス - 香港最大のバス事業者',
      ko: '구룡 모터 버스 - 홍콩 최대 버스 운영업체',
      fr: 'Kowloon Motor Bus - plus grand opérateur de bus de Hong Kong',
      de: 'Kowloon Motor Bus - größter Busanbieter in Hongkong',
      es: 'Kowloon Motor Bus - mayor operador de autobuses de Hong Kong',
      pt: 'Kowloon Motor Bus - maior operador de ônibus de Hong Kong',
      th: 'คอวลูน มอเตอร์ บัส - ผู้ให้บริการรถบัสรายใหญ่ที่สุดในฮ่องกง'
    },
    url: 'https://www.kmb.hk',
    image: '/images/listings/kmb.jpg',
    region: 'kowloon',
    subRegion: 'mong-kok',
    metadata: {
      tags: ['bus', 'kmb']
    },
    sortOrder: 3,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'hk-airport',
    categoryId: 'transport',
    name: {
      en: 'Hong Kong International Airport',
      'zh-HK': '香港國際機場',
      'zh-CN': '香港国际机场',
      ja: '香港国際空港',
      ko: '홍콩 국제공항',
      fr: 'Aéroport international de Hong Kong',
      de: 'Internationaler Flughafen Hongkong',
      es: 'Aeropuerto Internacional de Hong Kong',
      pt: 'Aeroporto Internacional de Hong Kong',
      th: 'สนามบินนานาชาติฮ่องกง'
    },
    description: {
      en: 'World-class airport with flights to destinations worldwide',
      'zh-HK': '世界級機場，航班通往世界各地',
      'zh-CN': '世界级机场，航班通往世界各地',
      ja: '世界中の目的地へのフライトを持つ世界クラスの空港',
      ko: '전 세계 목적지로의 항공편을 갖춘 세계적 수준의 공항',
      fr: 'Aéroport de classe mondiale avec des vols vers des destinations dans le monde entier',
      de: 'Weltklasse-Flughafen mit Flügen zu Zielen weltweit',
      es: 'Aeropuerto de clase mundial con vuelos a destinos de todo el mundo',
      pt: 'Aeroporto de classe mundial com voos para destinos em todo o mundo',
      th: 'สนามบินระดับโลกพร้อมเที่ยวบินไปยังจุดหมายปลายทางทั่วโลก'
    },
    url: 'https://www.hongkongairport.com',
    image: '/images/listings/airport.jpg',
    region: 'outlying-islands',
    subRegion: 'lantau',
    metadata: {
      tags: ['airport', 'aviation']
    },
    sortOrder: 4,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'hk-taxi',
    categoryId: 'transport',
    name: {
      en: 'Hong Kong Taxi',
      'zh-HK': '香港的士',
      'zh-CN': '香港的士',
      ja: '香港タクシー',
      ko: '홍콩 택시',
      fr: 'Taxi de Hong Kong',
      de: 'Hongkong-Taxi',
      es: 'Taxi de Hong Kong',
      pt: 'Táxi de Hong Kong',
      th: 'แท็กซี่ฮ่องกง'
    },
    description: {
      en: 'Urban, New Territories, and Lantau taxi services',
      'zh-HK': '市區、新界及大嶼山的士服務',
      'zh-CN': '市区、新界及大屿山的士服务',
      ja: '都市部、新界、ランタオのタクシーサービス',
      ko: '도시, 신제, 란타오 택시 서비스',
      fr: 'Services de taxi urbains, New Territories et Lantau',
      de: 'Stadt-, New Territories- und Lantau-Taxiservices',
      es: 'Servicios de taxi urbano, Nuevos Territorios y Lantau',
      pt: 'Serviços de táxi urbano, Novos Territórios e Lantau',
      th: 'บริการแท็กซี่ในเมือง นิวเทอริทอรี่ส์ และลันเตา'
    },
    url: 'https://www.td.gov.hk',
    image: '/images/listings/taxi.jpg',
    region: 'hongkong-island',
    subRegion: 'central',
    metadata: {
      tags: ['taxi', 'transport']
    },
    sortOrder: 5,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  // Hotels
  {
    id: 'sheraton-hk',
    categoryId: 'hotels',
    name: {
      en: 'Sheraton Hong Kong Hotel & Towers',
      'zh-HK': '香港喜來登酒店',
      'zh-CN': '香港喜来登酒店',
      ja: 'シェラトン香港ホテル&タワーズ',
      ko: '쉐라톤 홍콩 호텔 & 타워',
      fr: 'Sheraton Hong Kong Hotel & Towers',
      de: 'Sheraton Hong Kong Hotel & Towers',
      es: 'Sheraton Hong Kong Hotel & Towers',
      pt: 'Sheraton Hong Kong Hotel & Towers',
      th: 'เชอราตัน ฮ่องกง โฮเทล แอนด์ ทาวเวอร์ส'
    },
    description: {
      en: 'Luxury 5-star hotel in Tsim Sha Tsui with harbour views',
      'zh-HK': '尖沙咀豪華五星級酒店，享有海景',
      'zh-CN': '尖沙咀豪华五星级酒店，享有海景',
      ja: '尖沙咀の高級5つ星ホテル、ハーバービュー',
      ko: '침사추이의 럭셔리 5성급 호텔, 항구 전망',
      fr: 'Hôtel 5 étoiles de luxe à Tsim Sha Tsui avec vue sur le port',
      de: 'Luxuriöses 5-Sterne-Hotel in Tsim Sha Tsui mit Hafenblick',
      es: 'Hotel de lujo de 5 estrellas en Tsim Sha Tsui con vistas al puerto',
      pt: 'Hotel 5 estrelas de luxo em Tsim Sha Tsui com vista para o porto',
      th: 'โรงแรมหรู 5 ดาวในจิมซาโจ่ย พร้อมวิวอ่าว'
    },
    url: 'https://www.marriott.com/hotels/travel/hkgst-sheraton-hong-kong-hotel-and-towers',
    image: '/images/listings/sheraton.jpg',
    region: 'kowloon',
    subRegion: 'tsim-sha-tsui',
    metadata: {
      stars: 5,
      priceRange: 'luxury',
      phone: '+852 2369 1111',
      address: '20 Nathan Road, Tsim Sha Tsui'
    },
    sortOrder: 1,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'peninsula-hk',
    categoryId: 'hotels',
    name: {
      en: 'The Peninsula Hong Kong',
      'zh-HK': '香港半島酒店',
      'zh-CN': '香港半岛酒店',
      ja: 'ザ・ペニンシュラ香港',
      ko: '더 페닌슐라 홍콩',
      fr: 'The Peninsula Hong Kong',
      de: 'The Peninsula Hong Kong',
      es: 'The Peninsula Hong Kong',
      pt: 'The Peninsula Hong Kong',
      th: 'เดอะ เพนินซูลา ฮ่องกง'
    },
    description: {
      en: 'Iconic luxury hotel known for its timeless elegance',
      'zh-HK': '標誌性豪華酒店，以永恆優雅聞名',
      'zh-CN': '标志性豪华酒店，以永恒优雅闻名',
      ja: '時代を超越した優雅さで知られる象徴的な高級ホテル',
      ko: '시대를 초월한 우아함으로 유명한 상징적인 럭셔리 호텔',
      fr: 'Hôtel de luxe emblématique connu pour son élégance intemporelle',
      de: 'Ikonisches Luxushotel bekannt für seine zeitlose Eleganz',
      es: 'Hotel de lujo icónico conocido por su elegancia atemporal',
      pt: 'Hotel de luxo icônico conhecido por sua elegância atemporal',
      th: 'โรงแรมหรูระดับไอคอนที่มีชื่อเสียงในความสง่างามเหนือกาลเวลา'
    },
    url: 'https://www.peninsula.com/hong-kong',
    image: '/images/listings/peninsula.jpg',
    region: 'kowloon',
    subRegion: 'tsim-sha-tsui',
    metadata: {
      stars: 5,
      priceRange: 'luxury',
      phone: '+852 2920 2888',
      address: 'Salisbury Road, Tsim Sha Tsui'
    },
    sortOrder: 2,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'ibis-hk',
    categoryId: 'hotels',
    name: {
      en: 'ibis Hong Kong Central & Sheung Wan',
      'zh-HK': '宜必思香港中上環酒店',
      'zh-CN': '宜必思香港中上环酒店',
      ja: 'イビス香港セントラル&シェンワン',
      ko: '이비스 홍콩 센트럴 & 셩완',
      fr: 'ibis Hong Kong Central & Sheung Wan',
      de: 'ibis Hong Kong Central & Sheung Wan',
      es: 'ibis Hong Kong Central & Sheung Wan',
      pt: 'ibis Hong Kong Central & Sheung Wan',
      th: 'ไอบิส ฮ่องกง เซ็นทรัล แอนด์ เชืองวาน'
    },
    description: {
      en: 'Budget-friendly hotel in Central with easy MTR access',
      'zh-HK': '中環經濟型酒店，鄰近港鐵站',
      'zh-CN': '中环经济型酒店，邻近港铁站',
      ja: 'MTRへのアクセスが便利なセントラルの手頃なホテル',
      ko: '중앙에 위치한 저렴한 호텔, MTR 접근성 좋음',
      fr: 'Hôtel économique à Central avec accès facile au MTR',
      de: 'Preisgünstiges Hotel in Central mit einfachem MTR-Zugang',
      es: 'Hotel económico en Central con fácil acceso al MTR',
      pt: 'Hotel econômico em Central com fácil acesso ao MTR',
      th: 'โรงแรมราคาประหยัดในเซ็นทรัล เข้าถึง MTR ได้ง่าย'
    },
    url: 'https://all.accor.com/hotel/2163',
    image: '/images/listings/ibis.jpg',
    region: 'hongkong-island',
    subRegion: 'central',
    metadata: {
      stars: 3,
      priceRange: 'budget',
      phone: '+852 2252 2929',
      address: 'No. 28 Des Voeux Road West, Sheung Wan'
    },
    sortOrder: 3,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  // Hospitals
  {
    id: 'qh',
    categoryId: 'hospitals',
    name: {
      en: 'Queen Mary Hospital',
      'zh-HK': '瑪麗醫院',
      'zh-CN': '玛丽医院',
      ja: 'クイーンメリー病院',
      ko: '퀸 메리 병원',
      fr: 'Hôpital Queen Mary',
      de: 'Queen Mary Krankenhaus',
      es: 'Hospital Queen Mary',
      pt: 'Hospital Queen Mary',
      th: 'โรงพยาบาลควีนแมรี่'
    },
    description: {
      en: 'Major public teaching hospital on Hong Kong Island',
      'zh-HK': '香港島主要公立教學醫院',
      'zh-CN': '香港岛主要公立教学医院',
      ja: '香港島の主要公立教育病院',
      ko: '홍콩 섬의 주요 공공 교육 병원',
      fr: 'Grand hôpital public d\'enseignement sur l\'île de Hong Kong',
      de: 'Großes öffentliches Lehrkrankenhaus auf Hongkong-Insel',
      es: 'Gran hospital público de enseñanza en la isla de Hong Kong',
      pt: 'Grande hospital público de ensino na Ilha de Hong Kong',
      th: 'โรงพยาบาลสอนมหาวิทยาลัยขนาดใหญ่บนเกาะฮ่องกง'
    },
    url: 'https://www.ha.org.hk/qmh',
    image: '/images/listings/qmh.jpg',
    region: 'hongkong-island',
    subRegion: 'central',
    metadata: {
      isPublic: true,
      phone: '+852 2255 3838',
      address: '102 Pok Fu Lam Road'
    },
    sortOrder: 1,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pwh',
    categoryId: 'hospitals',
    name: {
      en: 'Prince of Wales Hospital',
      'zh-HK': '威爾斯親王醫院',
      'zh-CN': '威尔斯亲王医院',
      ja: 'プリンスオブウェールズ病院',
      ko: '프린스 오브 웨일즈 병원',
      fr: 'Hôpital Prince de Galles',
      de: 'Prince of Wales Krankenhaus',
      es: 'Hospital Príncipe de Gales',
      pt: 'Hospital Príncipe de Gales',
      th: 'โรงพยาบาลเจ้าชายเวลส์'
    },
    description: {
      en: 'Regional acute hospital serving Sha Tin and New Territories East',
      'zh-HK': '服務沙田及新界東的區域急症醫院',
      'zh-CN': '服务沙田及新界东的区域急症医院',
      ja: '沙田と新界東をサービスする地域急性病院',
      ko: '사틴과 신제 동부를 서비스하는 지역 급성 병원',
      fr: 'Hôpital régional aigu desservant Sha Tin et les Nouveaux Territoires Est',
      de: 'Regionales Akutkrankenhaus für Sha Tin und Neue Territorien Ost',
      es: 'Hospital regional agudo que sirve Sha Tin y Nuevos Territorios Este',
      pt: 'Hospital regional agudo atendendo Sha Tin e Novos Territórios Leste',
      th: 'โรงพยาบาลระดับภูมิภาคให้บริการซาตินและนิวเทอริทอรี่ส์ตะวันออก'
    },
    url: 'https://www.ha.org.hk/pwh',
    image: '/images/listings/pwh.jpg',
    region: 'new-territories',
    subRegion: 'sha-tin',
    metadata: {
      isPublic: true,
      phone: '+852 3505 2211',
      address: '30-32 Ngan Shing Street, Sha Tin'
    },
    sortOrder: 2,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'canossa',
    categoryId: 'hospitals',
    name: {
      en: 'Canossa Hospital',
      'zh-HK': '嘉諾撒醫院',
      'zh-CN': '嘉诺撒医院',
      ja: 'カノッサ病院',
      ko: '칸ossa 병원',
      fr: 'Hôpital Canossa',
      de: 'Canossa Krankenhaus',
      es: 'Hospital Canossa',
      pt: 'Hospital Canossa',
      th: 'โรงพยาบาลคานอสซา'
    },
    description: {
      en: 'Private hospital in Mid-Levels with comprehensive medical services',
      'zh-HK': '半山區私立醫院，提供全面醫療服務',
      'zh-CN': '半山区私立医院，提供全面医疗服务',
      ja: 'ミッドレベルの私立病院、包括的医療サービス',
      ko: '미드레벨의 사립 병원, 종합 의료 서비스',
      fr: 'Hôpital privé à Mid-Levels avec services médicaux complets',
      de: 'Privates Krankenhaus in Mid-Levels mit umfassenden medizinischen Dienstleistungen',
      es: 'Hospital privado en Mid-Levels con servicios médicos integrales',
      pt: 'Hospital privado em Mid-Levels com serviços médicos abrangentes',
      th: 'โรงพยาบาลเอกชนในมิด-เลเวลส์ พร้อมบริการทางการแพทย์ครบวงจร'
    },
    url: 'https://www.canossahospital.org.hk',
    image: '/images/listings/canossa.jpg',
    region: 'hongkong-island',
    subRegion: 'central',
    metadata: {
      isPublic: false,
      phone: '+852 2522 2181',
      address: '1 Old Peak Road'
    },
    sortOrder: 3,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  // Dining
  {
    id: 'openrice',
    categoryId: 'dining',
    name: {
      en: 'OpenRice',
      'zh-HK': '開飯喇',
      'zh-CN': '开饭喇',
      ja: 'OpenRice',
      ko: 'OpenRice',
      fr: 'OpenRice',
      de: 'OpenRice',
      es: 'OpenRice',
      pt: 'OpenRice',
      th: 'OpenRice'
    },
    description: {
      en: 'Hong Kong\'s most popular restaurant guide and review platform',
      'zh-HK': '香港最受歡迎的餐廳指南及評論平台',
      'zh-CN': '香港最受欢迎的餐厅指南及评论平台',
      ja: '香港で最も人気のあるレストランガイドとレビュープラットフォーム',
      ko: '홍콩에서 가장 인기 있는 레스토랑 가이드 및 리뷰 플랫폼',
      fr: 'Guide et plateforme d\'avis de restaurants la plus populaire de Hong Kong',
      de: 'Beliebteste Restaurantführer- und Bewertungsplattform Hongkongs',
      es: 'La plataforma de guía y reseñas de restaurantes más popular de Hong Kong',
      pt: 'Guia e plataforma de avaliação de restaurantes mais popular de Hong Kong',
      th: 'แพลตฟอร์มรีวิวและแนะนำร้านอาหารที่ได้รับความนิยมมากที่สุดในฮ่องกง'
    },
    url: 'https://www.openrice.com',
    image: '/images/listings/openrice.jpg',
    region: 'hongkong-island',
    subRegion: 'central',
    metadata: {
      tags: ['portal', 'dining']
    },
    sortOrder: 1,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cafe-de-coral',
    categoryId: 'dining',
    name: {
      en: 'Café de Coral',
      'zh-HK': '大家樂',
      'zh-CN': '大家乐',
      ja: 'カフェ・ド・コーラル',
      ko: '카페 드 코랄',
      fr: 'Café de Coral',
      de: 'Café de Coral',
      es: 'Café de Coral',
      pt: 'Café de Coral',
      th: 'คาเฟ่ เดอ คอรัล'
    },
    description: {
      en: 'Hong Kong\'s largest local fast food chain',
      'zh-HK': '香港最大的本地快餐連鎖店',
      'zh-CN': '香港最大的本地快餐连锁店',
      ja: '香港最大のローカルファストフードチェーン',
      ko: '홍콩 최대의 현지 패스트푸드 체인',
      fr: 'Plus grande chaîne de restauration rapide locale de Hong Kong',
      de: 'Größte lokale Fast-Food-Kette Hongkongs',
      es: 'La cadena de comida rápida local más grande de Hong Kong',
      pt: 'Maior rede de fast food local de Hong Kong',
      th: 'เชนฟาสต์ฟู้ดท้องถิ่นที่ใหญ่ที่สุดในฮ่องกง'
    },
    url: 'https://www.cafedecoral.com',
    image: '/images/listings/cafe-de-coral.jpg',
    region: 'kowloon',
    subRegion: 'mong-kok',
    metadata: {
      tags: ['chain', 'fast-food']
    },
    sortOrder: 2,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  // Culture
  {
    id: 'hk-museum-history',
    categoryId: 'culture',
    name: {
      en: 'Hong Kong Museum of History',
      'zh-HK': '香港歷史博物館',
      'zh-CN': '香港历史博物馆',
      ja: '香港歴史博物館',
      ko: '홍콩 역사 박물관',
      fr: 'Musée d\'histoire de Hong Kong',
      de: 'Hongkong Museum für Geschichte',
      es: 'Museo de Historia de Hong Kong',
      pt: 'Museu de História de Hong Kong',
      th: 'พิพิธภัณฑ์ประวัติศาสตร์ฮ่องกง'
    },
    description: {
      en: 'Comprehensive museum showcasing Hong Kong\'s history and culture',
      'zh-HK': '全面展示香港歷史文化的博物館',
      'zh-CN': '全面展示香港历史文化的博物馆',
      ja: '香港の歴史と文化を展示する包括的な博物館',
      ko: '홍콩의 역사와 문화를 보여주는 종합 박물관',
      fr: 'Musée complet présentant l\'histoire et la culture de Hong Kong',
      de: 'Umfassendes Museum, das Hongkongs Geschichte und Kultur zeigt',
      es: 'Museo integral que muestra la historia y cultura de Hong Kong',
      pt: 'Museu abrangente que apresenta a história e cultura de Hong Kong',
      th: 'พิพิธภัณฑ์ครอบคลุมที่จัดแสดงประวัติศาสตร์และวัฒนธรรมฮ่องกง'
    },
    url: 'https://hk.history.museum',
    image: '/images/listings/hk-museum-history.jpg',
    region: 'kowloon',
    subRegion: 'tsim-sha-tsui',
    metadata: {
      tags: ['museum', 'culture']
    },
    sortOrder: 1,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'ocean-park',
    categoryId: 'culture',
    name: {
      en: 'Ocean Park Hong Kong',
      'zh-HK': '香港海洋公園',
      'zh-CN': '香港海洋公园',
      ja: 'オーシャンパーク香港',
      ko: '오션파크 홍콩',
      fr: 'Ocean Park Hong Kong',
      de: 'Ocean Park Hongkong',
      es: 'Ocean Park Hong Kong',
      pt: 'Ocean Park Hong Kong',
      th: 'โอเชี่ยนปาร์ค ฮ่องกง'
    },
    description: {
      en: 'Marine mammal park, oceanarium, and amusement park',
      'zh-HK': '海洋哺乳動物公園、水族館及遊樂園',
      'zh-CN': '海洋哺乳动物公园、水族馆及游乐园',
      ja: '海洋哺乳類公園、水族館、遊園地',
      ko: '해양 포유동물 공원, 수족관, 놀이공원',
      fr: 'Parc de mammifères marins, océanarium et parc d\'attractions',
      de: 'Meeressäugetierpark, Ozeanarium und Vergnügungspark',
      es: 'Parque de mamíferos marinos, oceanario y parque de atracciones',
      pt: 'Parque de mamíferos marinhos, oceanário e parque de diversões',
      th: 'สวนสัตว์ทะเล พิพิธภัณฑ์สัตว์น้ำ และสวนสนุก'
    },
    url: 'https://www.oceanpark.com.hk',
    image: '/images/listings/ocean-park.jpg',
    region: 'hongkong-island',
    subRegion: 'stanley',
    metadata: {
      tags: ['themepark', 'attraction']
    },
    sortOrder: 2,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'disneyland',
    categoryId: 'culture',
    name: {
      en: 'Hong Kong Disneyland',
      'zh-HK': '香港迪士尼樂園',
      'zh-CN': '香港迪士尼乐园',
      ja: '香港ディズニーランド',
      ko: '홍콩 디즈니랜드',
      fr: 'Hong Kong Disneyland',
      de: 'Hongkong Disneyland',
      es: 'Hong Kong Disneyland',
      pt: 'Hong Kong Disneyland',
      th: 'ฮ่องกง ดิสนีย์แลนด์'
    },
    description: {
      en: 'Magical theme park experience on Lantau Island',
      'zh-HK': '大嶼山上的奇妙主題公園體驗',
      'zh-CN': '大屿山上的奇妙主题公园体验',
      ja: 'ランタオ島の魔法のテーマパーク体験',
      ko: '란타우 섬의 마법 같은 테마파크 경험',
      fr: 'Expérience magique de parc à thème sur l\'île de Lantau',
      de: 'Magische Themenparkerfahrung auf der Insel Lantau',
      es: 'Experiencia mágica de parque temático en la isla de Lantau',
      pt: 'Experiência mágica de parque temático na Ilha de Lantau',
      th: 'ประสบการณ์สวนสนุกเวทมนตร์บนเกาะลันเตา'
    },
    url: 'https://www.hongkongdisneyland.com',
    image: '/images/listings/disneyland.jpg',
    region: 'outlying-islands',
    subRegion: 'lantau',
    metadata: {
      tags: ['themepark', 'attraction']
    },
    sortOrder: 3,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'the-peak',
    categoryId: 'culture',
    name: {
      en: 'The Peak',
      'zh-HK': '山頂',
      'zh-CN': '山顶',
      ja: 'ザ・ピーク',
      ko: '더 피크',
      fr: 'The Peak',
      de: 'The Peak',
      es: 'The Peak',
      pt: 'The Peak',
      th: 'เดอะ พีค'
    },
    description: {
      en: 'Iconic viewpoint with panoramic city views',
      'zh-HK': '標誌性觀景點，享有全景城市景觀',
      'zh-CN': '标志性观景点，享有全景城市景观',
      ja: 'パノラマの街並みが楽しめる象徴的な展望台',
      ko: '파노라마 도시 전망을 갖춘 상징적인 전망대',
      fr: 'Point de vue emblématique avec vue panoramique sur la ville',
      de: 'Ikonischer Aussichtspunkt mit panoramischer Stadtaussicht',
      es: 'Mirador icónico con vistas panorámicas de la ciudad',
      pt: 'Mirante icônico com vistas panorâmicas da cidade',
      th: 'จุดชมวิวระดับไอคอนพร้อมวิวเมืองแบบพาโนรามา'
    },
    url: 'https://www.thepeak.com.hk',
    image: '/images/listings/the-peak.jpg',
    region: 'hongkong-island',
    subRegion: 'central',
    metadata: {
      tags: ['attraction', 'viewpoint']
    },
    sortOrder: 4,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  // Others
  {
    id: 'avis-hk',
    categoryId: 'others',
    name: {
      en: 'Avis Hong Kong',
      'zh-HK': '安飛士香港',
      'zh-CN': '安飞士香港',
      ja: 'アビス香港',
      ko: '아비스 홍콩',
      fr: 'Avis Hong Kong',
      de: 'Avis Hongkong',
      es: 'Avis Hong Kong',
      pt: 'Avis Hong Kong',
      th: 'เอวิส ฮ่องกง'
    },
    description: {
      en: 'International car rental service with multiple locations',
      'zh-HK': '國際租車服務，設有多個據點',
      'zh-CN': '国际租车服务，设有多个据点',
      ja: '複数の拠点を持つ国際レンタカーサービス',
      ko: '여러 지점을 가진 국제 렌터카 서비스',
      fr: 'Service de location de voitures international avec plusieurs emplacements',
      de: 'Internationaler Autovermietservice mit mehreren Standorten',
      es: 'Servicio internacional de alquiler de coches con múltiples ubicaciones',
      pt: 'Serviço internacional de aluguel de carros com vários locais',
      th: 'บริการเช่ารถระหว่างประเทศพร้อมหลายสาขา'
    },
    url: 'https://www.avis.com.hk',
    image: '/images/listings/avis.jpg',
    region: 'kowloon',
    subRegion: 'tsim-sha-tsui',
    metadata: {
      tags: ['car', 'rental']
    },
    sortOrder: 1,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'hk-emergency',
    categoryId: 'others',
    name: {
      en: 'Emergency Services',
      'zh-HK': '緊急服務',
      'zh-CN': '紧急服务',
      ja: '緊急サービス',
      ko: '긴급 서비스',
      fr: 'Services d\'urgence',
      de: 'Notdienste',
      es: 'Servicios de emergencia',
      pt: 'Serviços de emergência',
      th: 'บริการฉุกเฉิน'
    },
    description: {
      en: 'Police, Fire Services, and Ambulance - Dial 999',
      'zh-HK': '警察、消防及救護 - 致電999',
      'zh-CN': '警察、消防及救护 - 致电999',
      ja: '警察、消防、救急 - 999番',
      ko: '경찰, 소방, 구급 - 999번',
      fr: 'Police, pompiers et ambulance - Composez le 999',
      de: 'Polizei, Feuerwehr und Krankenwagen - Wählen Sie 999',
      es: 'Policía, bomberos y ambulancia - Marque 999',
      pt: 'Polícia, bombeiros e ambulância - Discar 999',
      th: 'ตำรวจ ดับเพลิง และรถพยาบาล - โทร 999'
    },
    url: 'https://www.gov.hk',
    image: '/images/listings/emergency.jpg',
    region: 'hongkong-island',
    subRegion: 'central',
    metadata: {
      tags: ['emergency', 'government']
    },
    sortOrder: 2,
    isActive: true,
    clickCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Load custom listings from localStorage
const loadCustomListings = (): Listing[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('cms-listings');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Merge default listings with custom listings
export const getAllListings = (): Listing[] => {
  const customListings = loadCustomListings();
  // Create a map of existing IDs to avoid duplicates
  const existingIds = new Set(listings.map(l => l.id));
  // Filter out custom listings that have the same ID as default ones
  const uniqueCustomListings = customListings.filter(l => !existingIds.has(l.id));
  return [...listings, ...uniqueCustomListings];
};

export const getListingsByCategory = (categoryId: string): Listing[] => {
  const allListings = getAllListings();
  return allListings.filter(listing => listing.categoryId === categoryId && listing.isActive);
};

export const getListingById = (id: string): Listing | undefined => {
  const allListings = getAllListings();
  return allListings.find(listing => listing.id === id);
};

export const searchListings = (query: string, language: string = 'en'): Listing[] => {
  const allListings = getAllListings();
  const lowerQuery = query.toLowerCase();
  return allListings.filter(listing => {
    const name = listing.name[language as keyof typeof listing.name] || listing.name.en;
    const description = listing.description?.[language as keyof typeof listing.description] || listing.description?.en;
    return name.toLowerCase().includes(lowerQuery) || 
           description?.toLowerCase().includes(lowerQuery) ||
           listing.metadata.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
  });
};
export const subscribeToListingsChanges = (callback: () => void): () => void => {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'cms-listings') {
      callback();
    }
  };
  
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
};

export const refreshListings = (): Listing[] => {
  return getAllListings();
};
