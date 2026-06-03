import type { ProductPayload } from '../contracts/product';

export const defaultContent: Record<string, string> = {
  // Hero
  hero_title: "研削盤と超仕上機の総合メーカー",
  hero_subtitle: "IZUMI MACHINE TOOLS",
  hero_description: "和泉金属工業株式会社 — ご要望にいち早くきめ細やかに対応することであなたの製造プロセスを輝かせます",
  hero_bg_image: "/images/hero-bg.jpg",
  hero_cta_primary: "製品情報",
  hero_cta_secondary: "採用情報",
  // About
  about_title: "IZUMI KINZOKU – Grinding the Future",
  about_description:
    "和泉金属工業株式会社は、大阪府富田林市に本社を構える高精度研削盤・超仕上機の専業メーカーです。1953年の創業以来、一貫して研削技術の研究開発に取り組み、自動車部品、軸受、工作機械など幅広い業界のお客様に最適な研削ソリューションを提供しています。\n\n豊富な実績を活かし、お客様のニーズに応じた製品を造り上げていくことが出来ます。また、設計からアフターまで長期的なサービスをご提供します。\n\n和泉金属工業は省エネ、そしてサステナビリティを考慮した機械を製造しています。また、今ある設備を更に長くご使用していただけるよう、オーバホールなども行っております。",
  about_image: "/images/about-factory.jpg",
  about_stat_1: "1953",
  about_stat_1_label: "年創業",
  about_stat_2: "70+",
  about_stat_2_label: "年の研削技術",
  about_stat_3: "30+",
  about_stat_3_label: "か国へ輸出",
  // Products
  products_title: "製品情報",
  products_subtitle: "高精度・高剛性・高生産性を追求した研削盤・超仕上機ラインナップ",
  // Gateway
  gateway_client_title: "お客様の製造プロセスを輝かせます",
  gateway_client_slogan: "輝かせたいか？",
  gateway_client_description:
    "世界規格への対応。豊富な実績を活かし、御要望に応じた製品を造り上げていくことが出来ます。",
  gateway_client_image: "/images/gateway-client.jpg",
  gateway_recruit_title: "共に未来を創る仲間を求めています",
  gateway_recruit_slogan: "輝きたいか？",
  gateway_recruit_description:
    "Looking for a career? Be part of the IZK Family. We work as a family. We succeed as a family.",
  gateway_recruit_image: "/images/gateway-recruit.jpg",
  // Contact
  contact_title: "お問い合わせ",
  contact_description:
    "製品に関するご質問・お見積もり・技術相談など、お気軽にお問い合わせください。",
  contact_address: "〒584-0022 大阪府富田林市中野町東2丁目1-68",
  contact_phone: "0721-26-0211",
  contact_fax: "0721-24-1491",
  contact_email: "izk-sales@izk-osaka.com",
  // Footer
  footer_company_name: "和泉金属工業株式会社",
  footer_company_name_en: "IZUMI KINZOKU KOGYO CO.,LTD.",
};

export const siteContentItems = Object.entries(defaultContent).map(([key, value]) => {
  const section = key.split('_')[0] === 'hero' ? 'hero'
    : key.startsWith('about') ? 'about'
    : key.startsWith('products') ? 'products'
    : key.startsWith('gateway') ? 'gateway'
    : key.startsWith('contact') ? 'contact'
    : 'footer';
  return { key, value, section, label: key };
});

export const defaultProductPayloads: ProductPayload[] = [
  {
    slug: "internal-grinders",
    nameJa: "内面研削盤",
    nameEn: "INTERNAL GRINDERS",
    nameZh: "内圆磨床",
    nameKo: "내경 연삭기",
    shortDesc: "高性能とフレキシブリティの追求。長年製造してきた量産型研削盤の技術を基に、さらに高精度、高剛性、操作性の向上を目指した研削盤。",
    shortDescZh: "追求高性能与灵活性。基于多年量产型磨床制造技术，实现更高精度、更高刚性、更好操作性的磨床。",
    shortDescEn: "Pursuit of high performance and flexibility. Grinding machines with higher precision, rigidity, and operability based on mass-production grinding machine technology.",
    shortDescKo: "고성능과 유연성을 추구합니다. 수년간의 양산형 연삭기 제조 기술을 바탕으로 한 보다 높은 정밀도, 강성, 조작성을 실현한 연삭기.",
    image: "/images/product-internal.png",
    detailImage: "/images/product-internal.png",
    gallery: ["/images/product-internal.png"],
    fullDesc: `内面研削盤は、ワークの内径面を高精度に研削するための工作機械です。IZUMIの内面研削盤は、長年の研削技術の蓄積と革新的な設計により、世界最高水準の加工精度を実現しています。

**主な特徴**
・高剛性の機械構造により、微細な内径加工でも安定した加工精度を確保
・静圧式主軸を採用し、回転精度と耐久性を向上
・多彩な測定器オプションにより、インラインでの高精度測定が可能
・NC制御による自動化により、高生産性を実現
・コンパクト設計で省スペース化を実現

**適用範囲**
自動車部品（エンジン部品、トランスミッション部品）、軸受（内輪）、油圧・空圧機器部品、各種産業機械部品など、内径の高精度加工が必要なあらゆる分野でご利用いただけます。`,
    specs: [
      { label: "最大研削内径", value: "5〜300mm" },
      { label: "最大研削深さ", value: "10〜200mm" },
      { label: "主軸回転数", value: "10,000〜120,000rpm" },
      { label: "ワーク回転数", value: "50〜3,000rpm" },
      { label: "占地面積", value: "1,200×1,500mm〜" },
      { label: "機械重量", value: "2,000〜8,000kg" },
    ],
    features: [
      { title: "高剛性設計", desc: "特殊なキャスティング構造と厳選された素材により、研削時の振動を最小限に抑え、高精度な仕上げ面を実現します。" },
      { title: "静圧主軸", desc: "独自開発の静圧式工作主軸を搭載。回転精度0.1μm以下を達成し、長時間連続運転でも安定した加工が可能です。" },
      { title: "NC全軸制御", desc: "X軸・Z軸・主軸傾斜角をNC制御。複雑な形状の内面加工もプログラムで簡単に設定できます。" },
    ],
    downloads: [],
    videos: [],
    sortOrder: 1,
    isActive: "active",
  },
  {
    slug: "external-grinders",
    nameJa: "外面研削盤",
    nameEn: "EXTERNAL GRINDERS",
    nameZh: "外圆磨床",
    nameKo: "외경 연삭기",
    shortDesc: "長年の経験と製造実績。高剛性の主軸切込機構、安定したローダなどにより、高精度な研削加工を目指した研削盤。",
    shortDescZh: "多年的经验与制造实绩。通过高刚性主轴切入机构、稳定的装载器等，实现高精度磨削加工。",
    shortDescEn: "Years of experience and manufacturing achievements. High-precision grinding through rigid spindle plunge mechanisms and stable loaders.",
    shortDescKo: "오랜 경험과 제조 실적. 고강성 스핀들 절입 기구, 안정적인 로더 등에 의해 고정밀 연삭 가공을 실현합니다.",
    image: "/images/product-external.png",
    detailImage: "/images/product-external.png",
    gallery: ["/images/product-external.png"],
    fullDesc: `外面研削盤は、ワークの外径面を高精度に研削するための工作機械です。IZUMIの外面研削盤は、自動車、航空宇宙、精密機器などの分野で高い評価を受けています。

**主な特徴**
・CNC全軸制御により複雑な外径形状の加工が可能
・高剛性の主軸切込機構で安定した加工を実現
・多彩な自動化オプション（ローダ、アンローダ、測定器など）
・マルチステージ加工対応で高生産性を実現
・環境に配慮した省エネ設計

**適用範囲**
シャフト類、ローラー類、ピン類、ベアリング外輪、自動車部品（カムシャフト、クランクシャフト）、各種産業用ローラーなど、外径の高精度加工が必要な分野でご利用いただけます。`,
    specs: [
      { label: "最大研削外径", value: "5〜500mm" },
      { label: "最大研削長さ", value: "10〜600mm" },
      { label: "主軸回転数", value: "1,000〜15,000rpm" },
      { label: "ワーク回転数", value: "10〜2,000rpm" },
      { label: "占地面積", value: "1,800×2,000mm〜" },
      { label: "機械重量", value: "3,000〜15,000kg" },
    ],
    features: [
      { title: "高剛性主軸", desc: "独自の軸受配置と高剛性スピンドルハウジングにより、重切削時でも振動を抑制します。" },
      { title: "自動化システム", desc: "ガントリーローダー・マガジン式供給装置など、様々な自動化オプションを用意しています。" },
      { title: "多様な測定機能", desc: "加工前測定・加工後測定・フラグ処理など、品質管理に必要な機能を標準搭載しています。" },
    ],
    downloads: [],
    videos: [],
    sortOrder: 2,
    isActive: "active",
  },
  {
    slug: "dual-grinders",
    nameJa: "複合研削盤",
    nameEn: "DUAL GRINDERS",
    nameZh: "复合磨床",
    nameKo: "복합 연삭기",
    shortDesc: "省スペース・高精度。ワンチャックにて内外面を複合研削することにより高精度・高能率を実現します。",
    shortDescZh: "省空间・高精度。通过一次卡盘同时复合磨削内外圆，实现高精度・高效率。",
    shortDescEn: "Space-saving and high-precision. Achieves high precision and efficiency by simultaneously grinding internal and external diameters in one chucking.",
    shortDescKo: "공간 절약 · 고정밀. 원척에 의해 내외면을 복합 연삭함으로써 고정밀 · 고효율을 실현합니다.",
    image: "/images/product-composite.png",
    detailImage: "/images/product-composite.png",
    gallery: ["/images/product-composite.png"],
    fullDesc: `複合研削盤は、ワンチャックにて内面・外面を同時に研削できる画期的な工作機械です。チャンキング誤差を排除し、内面と外面の同軸度を極限まで追求できます。

**主な特徴**
・ワンチャックで内面・外面同時研削、チャンキング誤差ゼロ
・高精度・高能率・省人化を同時に実現
・自動ローディングシステムで省人化を実現
・内外面とも測定器で高精度測定が可能
・コンパクト設計で省スペース化を実現

**適用範囲**
ベアリング（内輪・外輪同時加工）、自動車部品、油圧・空圧機器部品、各種産業機械部品など、内面と外面の同軸度が要求される精密部品の加工に最適です。`,
    specs: [
      { label: "最大研削外径", value: "5〜200mm" },
      { label: "最大研削内径", value: "5〜150mm" },
      { label: "最大研削長さ", value: "10〜200mm" },
      { label: "主軸回転数", value: "5,000〜60,000rpm" },
      { label: "占地面積", value: "1,500×1,800mm〜" },
      { label: "機械重量", value: "2,500〜6,000kg" },
    ],
    features: [
      { title: "ワンチャック加工", desc: "内面・外面を同時に加工することで、チャンキング誤差を完全に排除し、最高レベルの同軸度を実現します。" },
      { title: "自動ローディング", desc: "加工物の搬入・搬出位置を常に一定に保ち、人手を介さない自動化ラインを構築できます。" },
      { title: "高精度測定", desc: "内外面ともに高精度測定器を搭載し、加工中・加工後の品質をリアルタイムで確認できます。" },
    ],
    downloads: [],
    videos: [],
    sortOrder: 3,
    isActive: "active",
  },
  {
    slug: "tripod-grinders",
    nameJa: "トリポート研削盤",
    nameEn: "TRIPOD GRINDERS",
    nameZh: "三脚磨床",
    nameKo: "트라이포드 연삭기",
    shortDesc: "特殊研削盤。多彩な外面研削に対応可能なトリポートローラー3軸の外径を研削する専用機。",
    shortDescZh: "特殊磨床。三脚滚子的三个外径可同时磨削，实现高精度・高效率。",
    shortDescEn: "Special grinding machine. Three outer diameters of tripod rollers can be ground simultaneously for high precision and efficiency.",
    shortDescKo: "특수 연삭기. 트라이포드 롤러의 3축 외경을 동시에 연삭하여 고정밀 · 고효율을 실현합니다.",
    image: "/images/product-tripod.png",
    detailImage: "/images/product-tripod.png",
    gallery: ["/images/product-tripod.png"],
    fullDesc: `トリポート研削盤は、特殊形状の外径加工に特化した専用工作機械です。トリポートローラー3軸の外径を同時に研削でき、自動車用CVT部品など特殊形状部品の高精度加工に最適です。

**主な特徴**
・3軸同時外面研削で高生産性を実現
・特殊形状外径に対応可能な柔軟なプログラミング
・CNC制御による複雑な形状加工
・高精度の測定・補正システムを搭載
・専用機設計により極限の精度を追求

**適用範囲**
CVT用トリポートローラー、精密シャフト類、コンベアローラー、産業用特殊ローラーなど、トリポート形状や特殊外径の高精度加工が必要な分野でご利用いただけます。`,
    specs: [
      { label: "最大研削外径", value: "20〜200mm" },
      { label: "同時研削軸数", value: "3軸" },
      { label: "主軸回転数", value: "2,000〜20,000rpm" },
      { label: "ワーク回転数", value: "50〜1,500rpm" },
      { label: "占地面積", value: "2,000×2,200mm〜" },
      { label: "機械重量", value: "4,000〜10,000kg" },
    ],
    features: [
      { title: "3軸同時研削", desc: "トリポートローラーの3つの外径を同時に研削し、加工時間を大幅に短縮します。" },
      { title: "特殊形状対応", desc: "複雑な外形輪郭もCNCプログラムで自在に加工可能です。" },
      { title: "自動補正機能", desc: "測定器からのフィードバックで自動的に補正を行い、常に安定した加工精度を維持します。" },
    ],
    downloads: [],
    videos: [],
    sortOrder: 4,
    isActive: "active",
  },
  {
    slug: "super-finishing",
    nameJa: "超仕上機",
    nameEn: "SUPER FINISHING MACHINES",
    nameZh: "超精机",
    nameKo: "초정밀기",
    shortDesc: "軽量化されたヘッドが高速で揺動することにより、安定した仕上げ面が得られる超仕上げ機。",
    shortDescZh: "轻量化磨头高速摆动，可获得稳定的精加工面。",
    shortDescEn: "Lightweight grinding head oscillates at high speed to achieve a stable finished surface.",
    shortDescKo: "경량화된 헤드가 고속으로 흔들림으로써 안정된 마감면을 얻을 수 있는 초정밀기.",
    image: "/images/product-super.png",
    detailImage: "/images/product-super.png",
    gallery: ["/images/product-super.png"],
    fullDesc: `超仕上機は、研削加工後の表面をさらに精密に仕上げるための工作機械です。IZUMIの超仕上機は、独自の高速揺動機構により、表面粗さRa0.01μm以下のミラー仕上げを実現します。

**主な特徴**
・軽量化された仕上げヘッドが高速で揺動し、安定した仕上げ面を実現
・表面粗さRa0.01μm以下のミラー仕上げが可能
・石目方向の制御により、異方性のある仕上げ面にも対応
・多彩なワーク形状に対応可能
・環境に配慮した省エネ・低騒音設計

**適用範囲**
軸受（内輪・外輪）、自動車部品（シャフト・ローラー）、油圧シリンダー、各種精密機器部品など、高い表面品質が要求される分野でご利用いただけます。`,
    specs: [
      { label: "加工可能外径", value: "3〜500mm" },
      { label: "最大加工長さ", value: "5〜400mm" },
      { label: "揺動周波数", value: "50〜3,000回/分" },
      { label: "表面粗さ", value: "Ra0.01μm以下" },
      { label: "占地面積", value: "1,000×1,200mm〜" },
      { label: "機械重量", value: "1,000〜5,000kg" },
    ],
    features: [
      { title: "高速揺動ヘッド", desc: "軽量化された独自設計の揺動ヘッドが高速で動作し、均一な仕上げ面を形成します。" },
      { title: "ミラー仕上げ", desc: "表面粗さRa0.01μm以下を達成し、研磨工程を省略する高精細な仕上げ面を提供します。" },
      { title: "異方性対応", desc: "石目方向を自在に制御でき、異方性のある機能的な仕上げ面も実現できます。" },
    ],
    downloads: [],
    videos: [],
    sortOrder: 5,
    isActive: "active",
  },
];
