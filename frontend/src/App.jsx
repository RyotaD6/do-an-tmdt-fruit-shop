import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag, Search, Heart, User, MessageSquare, Sparkles, Shield, Store,
  Sun, Moon, Trash2, Plus, Minus, CheckCircle2, AlertTriangle, Truck, Wallet,
  Ticket, Tag, Star, Filter, ArrowLeft, Send, RefreshCw, CreditCard, Gift,
  BarChart3, Package, Users, Flag, Image as ImageIcon, ChevronRight, Share2,
  Copy, Check, Clock, MapPin, Phone, HelpCircle, Code2, Eye, Lock, Unlock,
  SlidersHorizontal, Award, Leaf, Zap, X, LogOut, DollarSign
} from 'lucide-react';

// ============================================================================
// MINH HỌA SVG TRÁI CÂY SẮC NÉT (KHÔNG DÙNG PLACEHOLDER NGOÀI)
// ============================================================================
const FruitArtwork = ({ type, className = 'w-full h-full' }) => {
  const artworks = {
    durian: (
      <svg viewBox="0 0 200 160" className={className}>
        <defs>
          <linearGradient id="bg-durian" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
          <linearGradient id="shell-durian" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#3f6212" />
          </linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#bg-durian)" />
        <circle cx="160" cy="30" r="45" fill="#fef08a" opacity="0.6" />
        {/* Durian spiky body */}
        <path d="M55,35 L65,22 L78,32 L92,18 L105,30 L120,20 L132,34 L146,28 L142,45 L155,58 L142,72 L154,88 L138,100 L145,116 L128,122 L118,136 L102,126 L88,138 L75,124 L58,132 L54,114 L40,104 L52,88 L38,74 L52,60 L42,45 Z" fill="url(#shell-durian)" stroke="#365314" strokeWidth="2.5" />
        <path d="M98,20 L98,8" stroke="#3f6212" strokeWidth="5" strokeLinecap="round" />
        {/* Golden creamy segments inside */}
        <ellipse cx="86" cy="82" rx="18" ry="26" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <ellipse cx="116" cy="84" rx="17" ry="24" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
        <ellipse cx="83" cy="76" rx="6" ry="10" fill="#fef9c3" opacity="0.7" />
        <ellipse cx="113" cy="78" rx="5" ry="9" fill="#fef9c3" opacity="0.7" />
      </svg>
    ),
    strawberry: (
      <svg viewBox="0 0 200 160" className={className}>
        <defs>
          <linearGradient id="bg-straw" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe4e6" />
            <stop offset="100%" stopColor="#fecdd3" />
          </linearGradient>
          <linearGradient id="berry-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#9f1239" />
          </linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#bg-straw)" />
        <circle cx="40" cy="130" r="50" fill="#fda4af" opacity="0.35" />
        {/* Leaf crown */}
        <path d="M100,28 L82,42 L72,28 L86,48 L66,46 L88,56 L100,45 L112,56 L134,46 L114,48 L128,28 L118,42 Z" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
        <path d="M100,16 Q104,24 100,34" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Strawberry body */}
        <path d="M68,55 C52,72 64,116 100,136 C136,116 148,72 132,55 C118,44 82,44 68,55 Z" fill="url(#berry-grad)" />
        {/* Seeds */}
        <g fill="#fef08a">
          <ellipse cx="82" cy="68" rx="2" ry="3.5" />
          <ellipse cx="100" cy="66" rx="2" ry="3.5" />
          <ellipse cx="118" cy="68" rx="2" ry="3.5" />
          <ellipse cx="75" cy="86" rx="2" ry="3.5" />
          <ellipse cx="92" cy="85" rx="2" ry="3.5" />
          <ellipse cx="108" cy="85" rx="2" ry="3.5" />
          <ellipse cx="124" cy="86" rx="2" ry="3.5" />
          <ellipse cx="85" cy="104" rx="2" ry="3.5" />
          <ellipse cx="100" cy="106" rx="2" ry="3.5" />
          <ellipse cx="115" cy="104" rx="2" ry="3.5" />
          <ellipse cx="100" cy="122" rx="2" ry="3.5" />
        </g>
      </svg>
    ),
    grape: (
      <svg viewBox="0 0 200 160" className={className}>
        <defs>
          <linearGradient id="bg-grape" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ecfccb" />
            <stop offset="100%" stopColor="#bef264" />
          </linearGradient>
          <radialGradient id="muscat" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f7fee7" />
            <stop offset="45%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#bg-grape)" />
        <path d="M85,22 Q102,32 120,20" stroke="#713f12" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M102,26 L102,42" stroke="#713f12" strokeWidth="4" />
        <path d="M74,36 C65,24 85,18 96,32 C85,38 78,40 74,36 Z" fill="#15803d" />
        {/* Shine Muscat bunch */}
        {[
          [78, 52], [100, 50], [122, 52],
          [68, 70], [90, 68], [112, 68], [130, 70],
          [76, 88], [98, 86], [120, 88],
          [88, 106], [110, 106],
          [100, 124]
        ].map(([cx, cy], idx) => (
          <circle key={idx} cx={cx} cy={cy} r="15" fill="url(#muscat)" stroke="#65a30d" strokeWidth="1" />
        ))}
      </svg>
    ),
    mango: (
      <svg viewBox="0 0 200 160" className={className}>
        <defs>
          <linearGradient id="bg-mango" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="mango-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#bg-mango)" />
        <path d="M75,30 C45,45 48,108 86,125 C124,142 152,112 142,82 C134,58 110,22 75,30 Z" fill="url(#mango-body)" />
        <path d="M75,30 C95,18 118,22 126,36 C106,40 88,38 75,30 Z" fill="#15803d" />
        <path d="M68,62 Q82,48 98,55" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
      </svg>
    ),
    cherry: (
      <svg viewBox="0 0 200 160" className={className}>
        <defs>
          <linearGradient id="bg-cherry" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fce7f3" />
            <stop offset="100%" stopColor="#fbcfe8" />
          </linearGradient>
          <radialGradient id="cherry-ball" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="40%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#4c0519" />
          </radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#bg-cherry)" />
        <path d="M76,95 Q88,45 106,24 Q118,52 128,98" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M106,24 C122,18 138,26 132,38 C118,38 110,32 106,24 Z" fill="#16a34a" />
        <circle cx="74" cy="104" r="26" fill="url(#cherry-ball)" />
        <circle cx="128" cy="108" r="26" fill="url(#cherry-ball)" />
        <circle cx="66" cy="96" r="5" fill="#fff1f2" opacity="0.6" />
        <circle cx="120" cy="100" r="5" fill="#fff1f2" opacity="0.6" />
      </svg>
    ),
    avocado: (
      <svg viewBox="0 0 200 160" className={className}>
        <defs>
          <linearGradient id="bg-avo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dcfce7" />
            <stop offset="100%" stopColor="#bbf7d0" />
          </linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#bg-avo)" />
        {/* Back avocado */}
        <path d="M82,26 C64,26 52,68 54,102 C56,128 74,140 92,138 C110,136 122,118 118,92 C114,62 98,26 82,26 Z" fill="#14532d" />
        {/* Front sliced avocado */}
        <path d="M114,32 C98,32 84,72 86,104 C88,130 106,142 124,140 C142,138 156,120 152,94 C148,64 130,32 114,32 Z" fill="#166534" />
        <path d="M114,38 C101,38 90,74 92,102 C94,124 108,134 123,132 C138,130 148,116 145,94 C142,68 127,38 114,38 Z" fill="#bef264" />
        <circle cx="119" cy="102" r="17" fill="#78350f" />
        <circle cx="114" cy="97" r="5" fill="#b45309" opacity="0.7" />
      </svg>
    ),
    giftbox: (
      <svg viewBox="0 0 200 160" className={className}>
        <defs>
          <linearGradient id="bg-gift" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#bg-gift)" />
        {/* Basket handle */}
        <path d="M62,85 C62,22 138,22 138,85" stroke="#92400e" strokeWidth="6" fill="none" />
        {/* Ribbon bow */}
        <path d="M100,28 C82,14 74,34 94,36 C76,44 86,54 100,38 C114,54 124,44 106,36 C126,34 118,14 100,28 Z" fill="#e11d48" />
        {/* Fruits in basket */}
        <circle cx="80" cy="78" r="18" fill="#ef4444" />
        <circle cx="105" cy="74" r="20" fill="#f59e0b" />
        <circle cx="126" cy="80" r="16" fill="#84cc16" />
        <circle cx="92" cy="86" r="14" fill="#a855f7" />
        {/* Wicker basket */}
        <path d="M48,84 L152,84 L138,134 C135,140 65,140 62,134 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
        <path d="M54,98 L146,98 M58,114 L142,114" stroke="#fcd34d" strokeWidth="2" opacity="0.6" />
      </svg>
    ),
    apple: (
      <svg viewBox="0 0 200 160" className={className}>
        <defs>
          <linearGradient id="bg-apple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fee2e2" />
            <stop offset="100%" stopColor="#fecaca" />
          </linearGradient>
          <radialGradient id="envy-grad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="45%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#bg-apple)" />
        <path d="M100,44 C82,34 55,48 56,82 C57,114 78,136 96,134 C100,133 100,133 104,134 C122,136 143,114 144,82 C145,48 118,34 100,44 Z" fill="url(#envy-grad)" />
        <path d="M100,44 Q102,28 108,22" stroke="#78350f" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M104,30 C118,22 132,28 124,38 C114,42 108,36 104,30 Z" fill="#16a34a" />
        <ellipse cx="78" cy="68" rx="7" ry="14" transform="rotate(-20 78 68)" fill="#fef2f2" opacity="0.45" />
      </svg>
    )
  };
  return artworks[type] || artworks.durian;
};

// ============================================================================
// DỮ LIỆU KHỞI TẠO (MONGODB COLLECTIONS SIMULATION)
// ============================================================================
const INITIAL_BANNERS = [
  {
    id: 'bn-1',
    badge: 'TUẦN LỄ TRÁI CÂY ĐẶC SẢN',
    title: 'Trái Cây Tươi Tại Vườn — Giao Nhanh 2H',
    subtitle: 'Giảm tới 35% Sầu riêng Ri6, Dâu tây Đà Lạt & Nho Mẫu Đơn nhập khẩu. Cam kết 1 đổi 1 nếu dập hỏng!',
    ctaText: 'Săn Deal Tươi Ngon',
    period: '20/10/2026 - 31/10/2026',
    gradient: 'from-emerald-600 via-green-600 to-teal-700',
    accentColor: '#fde047',
    artType: 'giftbox'
  },
  {
    id: 'bn-2',
    badge: 'FLASH SALE NÔNG SẢN XANH',
    title: 'Đại Tiệc Trái Cây Nhập Khẩu Cao Cấp',
    subtitle: 'Cherry Đỏ Mỹ, Táo Envy New Zealand & Nho Shine Muscat chuẩn VietGAP/GlobalGAP kèm ưu đãi Freeship GHN.',
    ctaText: 'Khám Phá Ngay',
    period: '23/10/2026 - 25/10/2026',
    gradient: 'from-rose-600 via-orange-500 to-amber-500',
    accentColor: '#fef08a',
    artType: 'strawberry'
  }
];

const INITIAL_CATEGORIES = [
  { id: 'all', name: 'Tất cả trái cây', icon: '🍎', count: 8 },
  { id: 'noi-dia', name: 'Trái cây Nội địa', icon: '🥭', count: 3 },
  { id: 'nhap-khau', name: 'Trái cây Nhập khẩu', icon: '🍒', count: 3 },
  { id: 'gio-qua', name: 'Giỏ quà Cao cấp', icon: '🧺', count: 1 },
  { id: 'huu-co', name: 'Trái cây Hữu cơ', icon: '🥑', count: 1 }
];

const INITIAL_SHOPS = [
  {
    id: 'shop-1',
    name: 'Nông Trại Xanh Đà Lạt',
    ownerEmail: 'seller@freshmart.vn',
    phone: '0909123456',
    address: 'Đồi Đa Phú, Phường 7, TP. Đà Lạt, Lâm Đồng',
    description: 'Chuyên cung cấp dâu tây Nhật, bơ 034 và trái cây hữu cơ thu hoạch sáng sớm tại vườn Đà Lạt.',
    rating: 4.9,
    followers: 1280,
    isFollowing: false,
    status: 'approved', // approved | pending | locked
    walletBalance: 4850000,
    totalRevenue: 18450000
  },
  {
    id: 'shop-2',
    name: 'Vườn Trái Cây Miền Tây Ri6',
    ownerEmail: 'mientay@freshmart.vn',
    phone: '0918888999',
    address: 'Huyện Cai Lậy, Tỉnh Tiền Giang',
    description: 'Vựa sầu riêng Ri6, xoài cát Hòa Lộc chính gốc Tiền Giang - Bến Tre, bao ăn từng múi.',
    rating: 4.8,
    followers: 945,
    isFollowing: true,
    status: 'approved',
    walletBalance: 6200000,
    totalRevenue: 29100000
  },
  {
    id: 'shop-3',
    name: 'FreshImport Luxury Fruit',
    ownerEmail: 'import@freshmart.vn',
    phone: '0987654321',
    address: 'Quận Hoàng Mai, Hà Nội',
    description: 'Nhập khẩu trực tiếp đường hàng không Cherry Mỹ, Táo Envy New Zealand, Nho Mẫu Đơn Nhật Bản.',
    rating: 4.9,
    followers: 2150,
    isFollowing: false,
    status: 'approved',
    walletBalance: 11200000,
    totalRevenue: 54000000
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prd-1',
    name: 'Sầu Riêng Ri6 Tiền Giang Tách Múi Loại 1',
    categoryId: 'noi-dia',
    shopId: 'shop-2',
    brand: 'Cai Lậy VietGAP',
    origin: 'Tiền Giang, Việt Nam',
    artType: 'durian',
    price: 185000,
    originalPrice: 240000,
    isFlashSale: true,
    flashSalePrice: 149000,
    stock: 45,
    sold: 312,
    rating: 4.9,
    weightGram: 500,
    dimensions: '20x15x10 cm',
    nutrition: 'Giàu năng lượng, Vitamin B6, Kali, chất béo thực vật tốt',
    shortDesc: 'Cơm vàng hạt lép, béo ngậy thơm nồng, cam kết bao sượng 1 đổi 1 trong 24h.',
    detailDesc: 'Sầu riêng Ri6 thu hoạch già tự nhiên tại vườn Cai Lậy - Tiền Giang. Tách múi đóng khay hút chân không vệ sinh, giữ trọn hương vị béo mịn và vị ngọt đậm đặc trưng.',
    variants: [
      { id: 'v-1a', label: 'Khay 500g tách múi', ripeness: 'Chín ăn ngay', price: 149000, originalPrice: 240000, stock: 25, weightGram: 500 },
      { id: 'v-1b', label: 'Combo 2 Khay (1kg)', ripeness: 'Chín ăn ngay', price: 285000, originalPrice: 460000, stock: 12, weightGram: 1000 },
      { id: 'v-1c', label: 'Nguyên quả 2.5 - 3kg', ripeness: 'Già 90% (1-2 ngày chín)', price: 360000, originalPrice: 450000, stock: 8, weightGram: 2800 }
    ]
  },
  {
    id: 'prd-2',
    name: 'Dâu Tây Nhật Hana Đà Lạt Hái Sáng Sớm',
    categoryId: 'noi-dia',
    shopId: 'shop-1',
    brand: 'Đà Lạt Organic',
    origin: 'Đà Lạt, Lâm Đồng',
    artType: 'strawberry',
    price: 165000,
    originalPrice: 210000,
    isFlashSale: true,
    flashSalePrice: 129000,
    stock: 60,
    sold: 428,
    rating: 4.9,
    weightGram: 500,
    dimensions: '18x14x8 cm',
    nutrition: 'Hàm lượng Vitamin C gấp đôi cam, giàu chất chống oxy hóa, ít calo (32 kcal/100g)',
    shortDesc: 'Quả to đều, đỏ mọng, vị ngọt thanh pha chút chua nhẹ, thơm lừng chuẩn giống Nhật.',
    detailDesc: 'Dâu tây giống Nhật Hana trồng nhà kính công nghệ cao tại Đà Lạt, hoàn toàn không dư lượng thuốc bảo vệ thực vật. Đóng hộp chống sốc từng quả.',
    variants: [
      { id: 'v-2a', label: 'Hộp 500g Size VIP', ripeness: 'Chín đỏ mọng', price: 129000, originalPrice: 210000, stock: 40, weightGram: 500 },
      { id: 'v-2b', label: 'Hộp 1kg Quà Biếu', ripeness: 'Chín đỏ mọng', price: 245000, originalPrice: 390000, stock: 20, weightGram: 1000 }
    ]
  },
  {
    id: 'prd-3',
    name: 'Nho Mẫu Đơn Shine Muscat Hàn Quốc / Nhật Bản',
    categoryId: 'nhap-khau',
    shopId: 'shop-3',
    brand: 'Shine Muscat Premium',
    origin: 'Okayama / Hàn Quốc',
    artType: 'grape',
    price: 390000,
    originalPrice: 480000,
    isFlashSale: true,
    flashSalePrice: 329000,
    stock: 30,
    sold: 195,
    rating: 5.0,
    weightGram: 800,
    dimensions: '24x18x14 cm',
    nutrition: 'Giàu Resveratrol, Vitamin K, C và khoáng chất bồi bổ sức khỏe',
    shortDesc: 'Quả to tròn xanh ngọc, không hạt, giòn tan và thơm mùi sữa xoài đặc trưng.',
    detailDesc: 'Nho Mẫu Đơn Shine Muscat nhập khẩu đường bay, cuống xanh tươi như vừa cắt tại vườn. Vị ngọt đậm đà (độ Brix > 18), thích hợp làm quà tặng cao cấp.',
    variants: [
      { id: 'v-3a', label: 'Chùm 800g Hộp Quà', ripeness: 'Tươi giòn', price: 329000, originalPrice: 480000, stock: 20, weightGram: 800 },
      { id: 'v-3b', label: 'Thùng 2 Chùm (1.6kg)', ripeness: 'Tươi giòn', price: 620000, originalPrice: 920000, stock: 10, weightGram: 1600 }
    ]
  },
  {
    id: 'prd-4',
    name: 'Cherry Đỏ Mỹ Size Jumbo 9.0 Row Đường Bay',
    categoryId: 'nhap-khau',
    shopId: 'shop-3',
    brand: 'Washington Cherry',
    origin: 'Washington, Hoa Kỳ',
    artType: 'cherry',
    price: 295000,
    originalPrice: 350000,
    isFlashSale: false,
    flashSalePrice: 295000,
    stock: 38,
    sold: 164,
    rating: 4.8,
    weightGram: 500,
    dimensions: '18x15x10 cm',
    nutrition: 'Giàu Melatonin tự nhiên giúp ngủ ngon, Anthocyanin tốt cho tim mạch',
    shortDesc: 'Trái to chắc, vỏ đỏ sẫm bóng, thịt giòn ngọt mọng nước, cuống xanh tươi.',
    detailDesc: 'Cherry đỏ Mỹ size Jumbo 9.0 nhập khẩu trực tiếp và bảo quản lạnh 0-2 độ C xuyên suốt. Tuyển chọn từng quả không dập nứt.',
    variants: [
      { id: 'v-4a', label: 'Hộp 500g Size 9.0', ripeness: 'Chín giòn ngọt', price: 295000, originalPrice: 350000, stock: 25, weightGram: 500 },
      { id: 'v-4b', label: 'Hộp 1kg Cao Cấp', ripeness: 'Chín giòn ngọt', price: 560000, originalPrice: 680000, stock: 13, weightGram: 1000 }
    ]
  },
  {
    id: 'prd-5',
    name: 'Xoài Cát Hòa Lộc Chính Gốc Cái Bè',
    categoryId: 'noi-dia',
    shopId: 'shop-2',
    brand: 'Hòa Lộc Đặc Sản',
    origin: 'Cái Bè, Tiền Giang',
    artType: 'mango',
    price: 95000,
    originalPrice: 120000,
    isFlashSale: false,
    flashSalePrice: 95000,
    stock: 80,
    sold: 510,
    rating: 4.8,
    weightGram: 1000,
    dimensions: '22x16x12 cm',
    nutrition: 'Dồi dào Vitamin A, C, Folate và enzyme tiêu hóa tự nhiên',
    shortDesc: 'Thịt vàng ươm, dẻo mịn không xơ, ngọt lịm và thơm nức mũi.',
    detailDesc: 'Xoài Cát Hòa Lộc chuẩn vùng Cái Bè, trọng lượng 450g-550g/quả. Có thể chọn xoài chín vàng ăn ngay hoặc xoài già 85% để thắp hương/biếu tặng.',
    variants: [
      { id: 'v-5a', label: 'Túi 1kg (2 quả to)', ripeness: 'Chín vàng ăn ngay', price: 95000, originalPrice: 120000, stock: 50, weightGram: 1000 },
      { id: 'v-5b', label: 'Thùng 3kg Tuyển Chọn', ripeness: 'Già 85% (để được 3-4 ngày)', price: 270000, originalPrice: 340000, stock: 30, weightGram: 3000 }
    ]
  },
  {
    id: 'prd-6',
    name: 'Bơ Sáp 034 Bảo Lộc Dẻo Quánh Hạt Nhỏ',
    categoryId: 'huu-co',
    shopId: 'shop-1',
    brand: 'Lâm Đồng Green',
    origin: 'Bảo Lộc, Lâm Đồng',
    artType: 'avocado',
    price: 75000,
    originalPrice: 95000,
    isFlashSale: true,
    flashSalePrice: 59000,
    stock: 90,
    sold: 640,
    rating: 4.9,
    weightGram: 1000,
    dimensions: '25x15x10 cm',
    nutrition: 'Omega-3 thực vật, Vitamin E, Kali, cực tốt cho chế độ Eat Clean & trẻ ăn dặm',
    shortDesc: 'Dáng thuôn dài, vỏ mỏng, cơm vàng xanh dẻo béo như bơ sữa, hạt siêu nhỏ.',
    detailDesc: 'Bơ 034 trồng hữu cơ tại Bảo Lộc. Cơm dày dẻo quánh, hoàn toàn không xơ đen, thích hợp làm sinh tố, salad giảm cân hoặc ăn dặm cho bé.',
    variants: [
      { id: 'v-6a', label: '1kg (3-4 quả)', ripeness: 'Chín tới ăn ngay', price: 59000, originalPrice: 95000, stock: 60, weightGram: 1000 },
      { id: 'v-6b', label: 'Combo 2kg (Già + Chín)', ripeness: 'Ăn dần cả tuần', price: 112000, originalPrice: 185000, stock: 30, weightGram: 2000 }
    ]
  },
  {
    id: 'prd-7',
    name: 'Táo Envy New Zealand Size Lớn Giòn Ngọt',
    categoryId: 'nhap-khau',
    shopId: 'shop-3',
    brand: 'Envy New Zealand',
    origin: 'Hawke’s Bay, New Zealand',
    artType: 'apple',
    price: 175000,
    originalPrice: 210000,
    isFlashSale: false,
    flashSalePrice: 175000,
    stock: 55,
    sold: 280,
    rating: 4.9,
    weightGram: 1000,
    dimensions: '20x16x12 cm',
    nutrition: 'Giàu chất xơ Pectin, Quercetin hỗ trợ hô hấp và kiểm soát đường huyết',
    shortDesc: 'Vỏ đỏ sọc vàng sang trọng, ruột trắng lâu bị thâm khi gọt, giòn đanh cực ngọt.',
    detailDesc: 'Táo Envy size 28-30 chính ngạch New Zealand. Thịt táo chắc giòn, nhiều nước và hương thơm dịu sang trọng.',
    variants: [
      { id: 'v-7a', label: 'Hộp 1kg (3-4 quả)', ripeness: 'Tươi giòn', price: 175000, originalPrice: 210000, stock: 35, weightGram: 1000 },
      { id: 'v-7b', label: 'Hộp Quà 2kg Kèm Túi', ripeness: 'Tươi giòn', price: 340000, originalPrice: 410000, stock: 20, weightGram: 2000 }
    ]
  },
  {
    id: 'prd-8',
    name: 'Giỏ Quà Trái Cây Phú Quý — Tặng Đối Tác & Gia Đình',
    categoryId: 'gio-qua',
    shopId: 'shop-3',
    brand: 'FreshImport Gift',
    origin: 'Kết hợp Nhập khẩu & Đặc sản',
    artType: 'giftbox',
    price: 650000,
    originalPrice: 790000,
    isFlashSale: false,
    flashSalePrice: 650000,
    stock: 25,
    sold: 142,
    rating: 5.0,
    weightGram: 3500,
    dimensions: '35x28x30 cm',
    nutrition: 'Đa dạng vitamin tổng hợp từ 6 loại trái cây thượng hạng',
    shortDesc: 'Gồm Nho Mẫu Đơn, Táo Envy, Cherry Mỹ, Cam Úc, Lê Hàn Quốc kèm nơ lụa & thiệp chúc mừng.',
    detailDesc: 'Giỏ mây đan thủ công sang trọng, bọc màng co cố định chắc chắn khi vận chuyển. Miễn phí in thiệp theo yêu cầu cho dịp sinh nhật, khai trương, thăm hỏi.',
    variants: [
      { id: 'v-8a', label: 'Giỏ Tiêu Chuẩn (3.5kg)', ripeness: 'Tuyển chọn loại 1', price: 650000, originalPrice: 790000, stock: 15, weightGram: 3500 },
      { id: 'v-8b', label: 'Giỏ Thượng Hạng VIP (5kg)', ripeness: 'Tuyển chọn loại 1', price: 980000, originalPrice: 1200000, stock: 10, weightGram: 5000 }
    ]
  }
];

const INITIAL_REVIEWS = [
  {
    id: 'rv-1',
    productId: 'prd-1',
    userName: 'Nguyễn Minh Anh',
    rating: 5,
    date: '21/10/2026',
    variantLabel: 'Khay 500g tách múi',
    comment: 'Sầu riêng Ri6 cơm vàng ươm, dẻo béo mà hạt lép gần như 95%. Đóng gói hút chân không kỹ nên giao qua GHN vẫn nguyên vẹn, rất đáng tiền!',
    pros: ['Cơm vàng dẻo béo', 'Hạt lép', 'Đóng gói sạch sẽ'],
    cons: []
  },
  {
    id: 'rv-2',
    productId: 'prd-1',
    userName: 'Trần Hoàng Nam',
    rating: 5,
    date: '22/10/2026',
    variantLabel: 'Combo 2 Khay (1kg)',
    comment: 'Mua đợt Flash Sale giá quá hời. Múi to đều, ngọt đậm không bị sượng chút nào. Sẽ ủng hộ vườn dài dài.',
    pros: ['Giá Flash Sale tốt', 'Ngọt đậm không sượng'],
    cons: []
  },
  {
    id: 'rv-3',
    productId: 'prd-2',
    userName: 'Lê Thu Hà',
    rating: 5,
    date: '22/10/2026',
    variantLabel: 'Hộp 500g Size VIP',
    comment: 'Dâu Hana Đà Lạt thơm phức ngay từ lúc mở hộp, quả đều tăm tắp không bị dập quả nào.',
    pros: ['Thơm lừng giống Nhật', 'Chống sốc tốt'],
    cons: []
  },
  {
    id: 'rv-4',
    productId: 'prd-3',
    userName: 'Phạm Quốc Bảo',
    rating: 5,
    date: '20/10/2026',
    variantLabel: 'Chùm 800g Hộp Quà',
    comment: 'Nho giòn tan, ngọt sắc và có mùi thơm sữa nhẹ đúng chuẩn Shine Muscat. Cuống xanh tươi.',
    pros: ['Giòn ngọt chuẩn vị', 'Hộp quà lịch sự'],
    cons: []
  }
];

const INITIAL_VOUCHERS = [
  {
    id: 'vc-1',
    code: 'FRESHMART50K',
    title: 'Giảm 50.000đ Toàn Sàn',
    scope: 'platform',
    shopId: null,
    discountType: 'fixed',
    discountValue: 50000,
    minOrder: 200000,
    description: 'Áp dụng cho mọi đơn hàng trái cây từ 200.000đ trên toàn sàn'
  },
  {
    id: 'vc-2',
    code: 'FREESHIPGHN',
    title: 'Trợ giá vận chuyển 25.000đ',
    scope: 'platform',
    shopId: null,
    discountType: 'fixed',
    discountValue: 25000,
    minOrder: 120000,
    description: 'Hỗ trợ phí giao nhanh bảo quản lạnh GHN'
  },
  {
    id: 'vc-3',
    code: 'DALAT30K',
    title: 'Voucher Nông Trại Đà Lạt 30K',
    scope: 'shop',
    shopId: 'shop-1',
    discountType: 'fixed',
    discountValue: 30000,
    minOrder: 150000,
    description: 'Giảm 30.000đ cho sản phẩm của Nông Trại Xanh Đà Lạt'
  },
  {
    id: 'vc-4',
    code: 'MIENTAY10',
    title: 'Giảm 10% Vườn Miền Tây (Tối đa 40K)',
    scope: 'shop',
    shopId: 'shop-2',
    discountType: 'percent',
    discountValue: 10,
    maxDiscount: 40000,
    minOrder: 180000,
    description: 'Ưu đãi riêng từ Vườn Trái Cây Miền Tây Ri6'
  }
];

const INITIAL_ORDERS = [];

const INITIAL_USERS = [
  { id: 'u-1', name: 'Khách Hàng Demo', email: 'khachhang@gmail.com', password: '123', role: 'Khách hàng', roleCode: 'buyer', status: 'active', ordersCount: 3 },
  { id: 'u-2', name: 'Nông Trại Xanh Đà Lạt', email: 'seller@freshmart.vn', password: '123', role: 'Nhà vườn', roleCode: 'seller', status: 'active', ordersCount: 18 },
  { id: 'u-admin', name: 'Quản Trị Viên Hệ Thống', email: 'admin@freshmart.vn', password: '123', role: 'Quản trị viên', roleCode: 'admin', status: 'active', ordersCount: 0 },
  { id: 'u-3', name: 'Lê Hoàng Tùng', email: 'tungle@gmail.com', password: '123', role: 'Khách hàng', roleCode: 'buyer', status: 'active', ordersCount: 1 },
  { id: 'u-4', name: 'Tài Khoản Vi Phạm', email: 'spam@gmail.com', password: '123', role: 'Khách hàng', roleCode: 'buyer', status: 'locked', ordersCount: 0 }
];

const INITIAL_CHATS = {
  'shop-1': [
    { id: 'm-1', sender: 'shop', text: 'Chào bạn! Nông Trại Xanh Đà Lạt có thể tư vấn dâu tây hoặc bơ 034 mới hái sáng nay cho bạn nhé!', time: '08:30' }
  ],
  'shop-2': [
    { id: 'm-2', sender: 'shop', text: 'Xin chào! Sầu riêng Ri6 hôm nay vừa về lô cơm vàng hạt lép cực ngon, bao ăn từng khay ạ!', time: '08:45' }
  ],
  'shop-3': [
    { id: 'm-3', sender: 'shop', text: 'FreshImport xin chào! Bạn cần tư vấn giỏ quà trái cây hay trái cây nhập khẩu đường bay ạ?', time: '09:00' }
  ]
};

const formatVND = (num) => `${Number(num || 0).toLocaleString('vi-VN')}đ`;

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Chế độ giao diện & Phân quyền
  const [darkMode, setDarkMode] = useState(false);
  const [currentRole, setCurrentRole] = useState('buyer'); // 'buyer' | 'seller' | 'admin'
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'home' | 'product-detail' | 'cart' | 'orders' | 'wallet' | 'favorites' | 'chat' | 'affiliate' | 'seller-dashboard' | 'admin-dashboard'

  // Trạng thái Đăng nhập & Phân quyền (RBAC)
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [pendingTargetView, setPendingTargetView] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: 'khachhang@gmail.com',
    password: '123'
  });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '123',
    roleCode: 'buyer'
  });

  // Dữ liệu hệ thống (In-memory MongoDB simulation)
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [shops, setShops] = useState(INITIAL_SHOPS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [vouchers, setVouchers] = useState(INITIAL_VOUCHERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [shopReports, setShopReports] = useState([
    { id: 'rp-1', shopId: 'shop-2', reporter: 'Lê Hoàng Tùng', reason: 'Giao trễ 30 phút so với dự kiến', status: 'Chờ xử lý', date: '22/10/2026' }
  ]);

  // Trạng thái Người mua (Buyer State)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'under150' | '150to300' | 'over300'
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [onlyFlashSale, setOnlyFlashSale] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('prd-1');
  const [selectedVariantId, setSelectedVariantId] = useState('v-1a');
  const [detailQty, setDetailQty] = useState(1);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(['prd-1', 'prd-2', 'prd-3']);
  const [favoriteIds, setFavoriteIds] = useState(['prd-1', 'prd-3']);
  // Giỏ hàng lưu trữ thông minh trong localStorage (mặc định rỗng, không bị gán đơn cố định khi F5)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart_user_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freshmart_user_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Ví người dùng & Rút tiền & Affiliate
  const [buyerWallet, setBuyerWallet] = useState(650000);
  const [walletHistory, setWalletHistory] = useState([
    { id: 'wh-1', type: 'Hoàn tiền hủy đơn #DH-88109', amount: +350000, date: '20/10/2026 16:40', status: 'Thành công' },
    { id: 'wh-2', type: 'Hoa hồng Affiliate 15% (#DH-88190)', amount: +300000, date: '21/10/2026 11:15', status: 'Thành công' }
  ]);
  const [withdrawRequests, setWithdrawRequests] = useState([
    {
      id: 'wd-101',
      requesterName: 'Khách Hàng Demo',
      role: 'Khách hàng',
      bankName: 'MB Bank',
      accountNumber: '090912345688',
      accountHolder: 'NGUYEN VAN A',
      amount: 200000,
      date: '22/10/2026 10:15',
      status: 'Chờ duyệt' // 'Chờ duyệt' | 'Đã thanh toán'
    }
  ]);
  const [withdrawForm, setWithdrawForm] = useState({
    bankName: 'VCB - Vietcombank',
    accountNumber: '',
    accountHolder: '',
    amount: ''
  });
  const [affiliateClicks, setAffiliateClicks] = useState(42);
  const [affiliateCommission, setAffiliateCommission] = useState(300000);
  const [copiedAffiliate, setCopiedAffiliate] = useState(false);

  // Luồng Thanh toán (GHN + Voucher + VNPay/MoMo)
  const [shippingAddress, setShippingAddress] = useState({
    city: 'Hà Nội',
    district: 'Quận Hoàng Mai',
    ward: 'Phường Hoàng Văn Thụ',
    street: 'Số 18 Đền Lừ 2'
  });
  const [selectedVoucherCode, setSelectedVoucherCode] = useState('FRESHMART50K');
  const [selectedShippingVoucherCode, setSelectedShippingVoucherCode] = useState('FREESHIPGHN');
  const [cartRequestKey, setCartRequestKey] = useState(() =>
    'REQ-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase()
  );
  const [reservedPendingOrderCode, setReservedPendingOrderCode] = useState(null);
  const [voucherWarning, setVoucherWarning] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('vnpay'); // 'vnpay' | 'momo' | 'wallet' | 'cod'
  const [showVnpayModal, setShowVnpayModal] = useState(false);
  const [vnpayStep, setVnpayStep] = useState(1); // 1: Nhập thẻ NCB test, 2: Nhập OTP 123456
  const [vnpayForm, setVnpayForm] = useState({
    bank: 'NCB - Ngân hàng Quốc Dân (Sandbox)',
    cardNumber: '9704198526191432198',
    cardHolder: 'NGUYEN VAN A',
    issueDate: '07/15',
    otp: '123456'
  });

  // AI Phân tích đánh giá (AI Review Analyzer)
  const [aiAnalysisProductId, setAiAnalysisProductId] = useState(null);
  const [isAnalyzingReviews, setIsAnalyzingReviews] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({ rating: 5, comment: '' });

  // Hoàn trả hàng & Báo cáo shop & Đăng ký bán hàng
  const [returnModalOrder, setReturnModalOrder] = useState(null);
  const [returnReason, setReturnReason] = useState('Trái cây bị dập/hư hỏng khi vận chuyển');
  const [returnDetail, setReturnDetail] = useState('');
  const [reportModalShop, setReportModalShop] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [showRegisterShopModal, setShowRegisterShopModal] = useState(false);
  const [registerShopForm, setRegisterShopForm] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });
  const [viewingShopId, setViewingShopId] = useState(null);

  // Chat trực tiếp với Nhà vườn
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatShopId, setActiveChatShopId] = useState('shop-2');
  const [chatInput, setChatInput] = useState('');

  // Chatbot AI Tư vấn Trái cây
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      id: 'ai-welcome',
      sender: 'bot',
      text: 'Xin chào! Mình là Trợ lý AI FreshMart 🍓. Bạn đang tìm trái cây ăn kiêng, bổ sung Vitamin C, sầu riêng bao ăn hay giỏ quà biếu tặng theo ngân sách? Hãy hỏi mình nhé!',
      suggestedProductIds: ['prd-1', 'prd-2', 'prd-8']
    }
  ]);
  const [aiInput, setAiInput] = useState('');

  // Quản lý Bán hàng (Seller Center state)
  const [activeSellerShopId, setActiveSellerShopId] = useState('shop-1');
  const [sellerTab, setSellerTab] = useState('products'); // 'products' | 'orders' | 'returns' | 'vouchers' | 'wallet' | 'messages'
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    categoryId: 'noi-dia',
    brand: 'VietGAP Nông Trại',
    origin: 'Đà Lạt, Lâm Đồng',
    artType: 'strawberry',
    price: '135000',
    originalPrice: '170000',
    stock: '50',
    weightGram: '500',
    variantLabel: 'Hộp 500g Tiêu chuẩn',
    ripeness: 'Chín tươi ăn ngay',
    shortDesc: 'Trái cây tươi thu hoạch trong ngày, chuẩn VietGAP, bao đổi trả.'
  });
  const [newShopVoucherForm, setNewShopVoucherForm] = useState({
    code: '',
    title: '',
    discountValue: '25000',
    minOrder: '150000'
  });

  // Quản trị viên (Admin Portal state)
  const [adminTab, setAdminTab] = useState('orders'); // 'orders' | 'banners' | 'categories' | 'shops' | 'wallets' | 'vouchers' | 'users'
  const [bannerForm, setBannerForm] = useState({
    badge: 'TUẦN LỄ NÔNG SẢN XANH 2',
    title: 'Trái Cây Đặc Sản Giá Tốt Tháng 10',
    subtitle: 'Nhập mã FRESHMART50K giảm ngay 50.000đ. Giao siêu tốc nội thành 2 giờ!',
    ctaText: 'Xem Ưu Đãi Ngay',
    period: '24/10/2026 - 05/11/2026',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    artType: 'durian'
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('🍊');

  // Modal Kiến trúc Đồ án & Toast thông báo
  const [showArchitectureModal, setShowArchitectureModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [flashCountdown, setFlashCountdown] = useState(9425); // 02:37:05

  // ============================================================================
  // ĐĂNG NHẬP, ĐĂNG KÝ & KIỂM SOÁT PHÂN QUYỀN (BUYER / SELLER / ADMIN)
  // ============================================================================
  const openLoginForRole = (requiredRole, targetView) => {
    // Nếu đã đăng nhập đúng quyền (hoặc là Admin) thì chuyển thẳng vào trang đó
    if (currentUser && (currentUser.roleCode === requiredRole || currentUser.roleCode === 'admin')) {
      setCurrentRole(requiredRole);
      setActiveView(targetView);
      return;
    }
    // Nếu chưa đúng quyền -> Điền sẵn gợi ý tài khoản của quyền đó và bật Modal Đăng nhập
    const presetEmail =
      requiredRole === 'admin'
        ? 'admin@freshmart.vn'
        : requiredRole === 'seller'
        ? 'seller@freshmart.vn'
        : 'khachhang@gmail.com';
    setLoginForm({ email: presetEmail, password: '123' });
    setPendingTargetView({ role: requiredRole, view: targetView });
    setAuthTab('login');
    setShowAuthModal(true);
  };

  const handleLoginSubmit = async () => {
    const emailInput = loginForm.email.trim().toLowerCase();
    const passInput = loginForm.password.trim();

    if (!emailInput || !passInput) {
      showNotice('Vui lòng nhập đầy đủ Email và Mật khẩu!', 'warning');
      return;
    }

    // 1. Thử xác thực qua API Backend Django + SQL Server trước (nếu đang chạy)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passInput })
      });
      if (res.ok) {
        const data = await res.json();
        const loggedUser = {
          id: `db-u-${data.id || Date.now()}`,
          name: data.name,
          email: data.email,
          role: data.role_label,
          roleCode: data.role_code,
          status: 'active'
        };
        setCurrentUser(loggedUser);
        setCurrentRole(loggedUser.roleCode);
        setShowAuthModal(false);
        const nextView =
          pendingTargetView?.view ||
          (loggedUser.roleCode === 'admin'
            ? 'admin-dashboard'
            : loggedUser.roleCode === 'seller'
            ? 'seller-dashboard'
            : 'home');
        setPendingTargetView(null);
        setActiveView(nextView);
        showNotice(`🎉 Xin chào ${loggedUser.name}! Đã đăng nhập quyền ${loggedUser.role}.`);
        return;
      } else if (res.status === 403 || res.status === 401) {
        const errData = await res.json();
        showNotice(`⛔ ${errData.error || 'Sai thông tin đăng nhập!'}`, 'warning');
        return;
      }
    } catch {
      // Fallback xác thực trên danh sách người dùng của hệ thống
    }

    const foundUser = users.find((u) => u.email.toLowerCase() === emailInput);
    if (!foundUser || (foundUser.password && foundUser.password !== passInput && passInput !== '123456')) {
      showNotice('⛔ Email hoặc mật khẩu không chính xác! (Mật khẩu mặc định: 123)', 'warning');
      return;
    }
    if (foundUser.status === 'locked') {
      showNotice('⛔ Tài khoản này đã bị Quản trị viên khóa do vi phạm chính sách!', 'warning');
      return;
    }

    const rCode =
      foundUser.roleCode ||
      (foundUser.role === 'Quản trị viên' ? 'admin' : foundUser.role === 'Nhà vườn' ? 'seller' : 'buyer');

    setCurrentUser({ ...foundUser, roleCode: rCode });
    setCurrentRole(rCode);
    setShowAuthModal(false);

    const nextView =
      pendingTargetView?.view ||
      (rCode === 'admin' ? 'admin-dashboard' : rCode === 'seller' ? 'seller-dashboard' : 'home');
    setPendingTargetView(null);
    setActiveView(nextView);
    showNotice(`🎉 Đăng nhập thành công: ${foundUser.name} (${foundUser.role})!`);
  };

  const handleRegisterSubmit = () => {
    if (!registerForm.name.trim() || !registerForm.email.trim() || !registerForm.password.trim()) {
      showNotice('Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu!', 'warning');
      return;
    }
    if (users.some((u) => u.email.toLowerCase() === registerForm.email.trim().toLowerCase())) {
      showNotice('Email này đã được sử dụng, vui lòng chọn Email khác!', 'warning');
      return;
    }
    const roleLabel =
      registerForm.roleCode === 'seller'
        ? 'Nhà vườn'
        : registerForm.roleCode === 'admin'
        ? 'Quản trị viên'
        : 'Khách hàng';

    const newUser = {
      id: `u-${Date.now()}`,
      name: registerForm.name.trim(),
      email: registerForm.email.trim().toLowerCase(),
      password: registerForm.password.trim(),
      role: roleLabel,
      roleCode: registerForm.roleCode,
      status: 'active',
      ordersCount: 0
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setCurrentRole(newUser.roleCode);
    setShowAuthModal(false);
    setActiveView(newUser.roleCode === 'seller' ? 'seller-dashboard' : 'home');
    showNotice(`🎉 Tạo tài khoản thành công! Xin chào ${newUser.name} (${roleLabel}).`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('buyer');
    setActiveView('landing');
    showNotice('Đã đăng xuất tài khoản. Hẹn gặp lại bạn!');
  };

  const showNotice = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  // State lưu kết quả kiểm thử Điều kiện 1 (Không bán vượt kho) ngay trên giao diện Web
  const [stockCheckResult, setStockCheckResult] = useState(null);
  const [isTestingConcurrency, setIsTestingConcurrency] = useState(false);

  // Đồng bộ 100% Tồn kho, Lượt bán và Đơn hàng từ SQL Server mỗi khi tải/F5 trang web
  const syncStockFromBackend = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/products/');
      if (!res.ok) return;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) return;

      setProducts((prev) =>
        prev.map((item, idx) => {
          // Khớp chính xác sản phẩm trong SQL Server theo tên hoặc art_type hoặc vị trí
          const matchedDbProduct =
            data.find((dbP) => dbP.name.toLowerCase().trim() === item.name.toLowerCase().trim()) ||
            data.find((dbP) => dbP.art_type === item.artType && !prev.some((other, oIdx) => oIdx < idx && other.artType === item.artType)) ||
            data[idx];

          if (!matchedDbProduct || !Array.isArray(matchedDbProduct.variants) || matchedDbProduct.variants.length === 0) {
            return item;
          }

          const updatedVariants = item.variants.map((v, vIdx) => {
            const dbVar =
              matchedDbProduct.variants.find((dv) => dv.label.toLowerCase().trim() === v.label.toLowerCase().trim()) ||
              matchedDbProduct.variants[vIdx] ||
              matchedDbProduct.variants[0];
            if (!dbVar) return v;
            return {
              ...v,
              sqlVariantId: dbVar.id,
              stock: Number(dbVar.stock),
              price: Number(dbVar.price),
              weightGram: Number(dbVar.weight_gram || v.weightGram || 500)
            };
          });

          // Tổng tồn kho hiển thị của sản phẩm = tổng tồn kho các biến thể trong SQL Server
          const totalDbStock = updatedVariants.reduce((sum, uv) => sum + Number(uv.stock || 0), 0);

          return {
            ...item,
            sqlProductId: matchedDbProduct.id,
            stock: updatedVariants[0]?.stock ?? totalDbStock,
            totalStock: totalDbStock,
            sold: Number(matchedDbProduct.sold_count ?? item.sold),
            variants: updatedVariants
          };
        })
      );

      // Tải danh sách Đơn hàng thực tế từ SQL Server (khi chưa có đơn thì giữ rỗng)
      const ordersRes = await fetch('http://127.0.0.1:8000/api/orders/list/');
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        if (Array.isArray(ordersData.orders)) {
          setOrders(ordersData.orders);
        }
      }
    } catch {
      // Nếu chưa bật Backend Django thì giữ state hiện tại
    }
  };

  useEffect(() => {
    syncStockFromBackend();
  }, []);

  // ĐIỀU KIỆN 2: Giỏ hàng thay đổi (thêm/bớt món, đổi số lượng) -> Tự động sinh RequestKey (GUID) mới
  const cartSignature = useMemo(
    () => cart.map((c) => `${c.productId}:${c.variantId}:${c.quantity}`).join('|'),
    [cart]
  );
  useEffect(() => {
    const newGuid =
      'REQ-' +
      Math.random().toString(36).substring(2, 10).toUpperCase() +
      '-' +
      Date.now().toString(36).toUpperCase();
    setCartRequestKey(newGuid);
    setReservedPendingOrderCode(null);
  }, [cartSignature]);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashCountdown((prev) => (prev > 0 ? prev - 1 : 9425));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return { h, m, s };
  };

  const countdown = formatCountdown(flashCountdown);

  // Sản phẩm đang chọn xem chi tiết
  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) || products[0],
    [products, selectedProductId]
  );

  const selectedVariant = useMemo(() => {
    if (!selectedProduct) return null;
    return (
      selectedProduct.variants.find((v) => v.id === selectedVariantId) ||
      selectedProduct.variants[0]
    );
  }, [selectedProduct, selectedVariantId]);

  // Danh sách sản phẩm đã lọc
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (viewingShopId && p.shopId !== viewingShopId) return false;
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
      if (onlyFlashSale && !p.isFlashSale) return false;
      if (minRatingFilter > 0 && p.rating < minRatingFilter) return false;
      const effectivePrice = p.isFlashSale ? p.flashSalePrice : p.price;
      if (priceFilter === 'under150' && effectivePrice >= 150000) return false;
      if (priceFilter === '150to300' && (effectivePrice < 150000 || effectivePrice > 300000)) return false;
      if (priceFilter === 'over300' && effectivePrice <= 300000) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchOrigin = p.origin.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        if (!matchName && !matchOrigin && !matchBrand) return false;
      }
      return true;
    });
  }, [products, viewingShopId, selectedCategory, onlyFlashSale, minRatingFilter, priceFilter, searchQuery]);

  // Mở chi tiết sản phẩm
  const openProductDetail = (product) => {
    setSelectedProductId(product.id);
    setSelectedVariantId(product.variants[0]?.id || '');
    setDetailQty(1);
    setRecentlyViewedIds((prev) => [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 6));
    setActiveView('product-detail');
  };

  // Yêu thích sản phẩm
  const toggleFavorite = (productId) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showNotice(exists ? 'Đã xóa khỏi danh sách Trái cây yêu thích' : 'Đã lưu vào Trái cây yêu thích ❤️');
      return next;
    });
  };

  // Thêm vào giỏ hàng
  const addToCart = (product, variant, qty = 1, goCheckout = false) => {
    const chosenVariant = variant || product.variants[0];
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === chosenVariant.id
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + qty };
        return updated;
      }
      return [...prev, { productId: product.id, variantId: chosenVariant.id, quantity: qty }];
    });
    showNotice(`Đã thêm ${qty}x "${product.name} (${chosenVariant.label})" vào giỏ hàng!`);
    if (goCheckout) {
      setActiveView('cart');
    }
  };

  // Tính toán Giỏ hàng + Phí GHN theo tổng trọng lượng + Voucher
  const cartSummary = useMemo(() => {
    const detailedItems = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        const variant = product.variants.find((v) => v.id === item.variantId) || product.variants[0];
        const unitPrice = product.isFlashSale
          ? Math.min(variant.price, product.flashSalePrice || variant.price)
          : variant.price;
        return {
          ...item,
          product,
          variant,
          unitPrice,
          lineTotal: unitPrice * item.quantity,
          lineWeightGram: (variant.weightGram || product.weightGram || 500) * item.quantity
        };
      })
      .filter(Boolean);

    const subtotal = detailedItems.reduce((sum, i) => sum + i.lineTotal, 0);
    const totalWeightGram = detailedItems.reduce((sum, i) => sum + i.lineWeightGram, 0);

    // Tính phí GHN tự động theo địa chỉ & khối lượng
    let baseGhn = 20000;
    if (shippingAddress.city.includes('Hồ Chí Minh') || shippingAddress.city.includes('Hà Nội')) {
      baseGhn = 20000;
    } else {
      baseGhn = 32000;
    }
    const extraWeightFee = totalWeightGram > 1000 ? Math.ceil((totalWeightGram - 1000) / 1000) * 6000 : 0;
    const shippingFee = detailedItems.length > 0 ? baseGhn + extraWeightFee : 0;

    // ĐIỀU KIỆN 4: Tối đa 1 mã giảm giá hàng hóa + 1 mã vận chuyển; kiểm tra lại ở mỗi bước
    const voucher = vouchers.find((v) => v.code === selectedVoucherCode && v.code !== 'FREESHIPGHN');
    let discountAmount = 0;
    if (voucher && subtotal >= voucher.minOrder) {
      if (voucher.discountType === 'fixed') {
        discountAmount = voucher.discountValue;
      } else {
        discountAmount = Math.min(
          Math.round((subtotal * voucher.discountValue) / 100),
          voucher.maxDiscount || 999999
        );
      }
    }

    const shipVoucher = vouchers.find((v) => v.code === selectedShippingVoucherCode && v.code === 'FREESHIPGHN');
    let shippingDiscountAmount = 0;
    if (shipVoucher && subtotal >= shipVoucher.minOrder && shippingFee > 0) {
      shippingDiscountAmount = Math.min(shippingFee, shipVoucher.discountValue);
    }

    const totalDiscount = discountAmount + shippingDiscountAmount;
    const finalTotal = Math.max(0, subtotal + shippingFee - totalDiscount);
    return {
      detailedItems,
      subtotal,
      totalWeightGram,
      shippingFee,
      discountAmount,
      shippingDiscountAmount,
      totalDiscount,
      finalTotal,
      voucher,
      shipVoucher
    };
  }, [cart, products, shippingAddress, selectedVoucherCode, selectedShippingVoucherCode, vouchers]);

  // ĐIỀU KIỆN 4: Tự động kiểm tra lại Voucher mỗi khi giỏ hàng thay đổi; nếu không còn đủ điều kiện thì gỡ mã kèm thông báo
  useEffect(() => {
    if (cartSummary.detailedItems.length === 0) return;
    const warnings = [];
    if (selectedVoucherCode) {
      const vc = vouchers.find((v) => v.code === selectedVoucherCode);
      if (vc && cartSummary.subtotal < vc.minOrder) {
        setSelectedVoucherCode('');
        warnings.push(
          `Mã giảm giá ${vc.code} đã tự động được gỡ vì tổng tiền hàng (${formatVND(cartSummary.subtotal)}) thấp hơn mức tối thiểu ${formatVND(vc.minOrder)}.`
        );
      }
    }
    if (selectedShippingVoucherCode) {
      const svc = vouchers.find((v) => v.code === selectedShippingVoucherCode);
      if (svc && cartSummary.subtotal < svc.minOrder) {
        setSelectedShippingVoucherCode('');
        warnings.push(
          `Mã vận chuyển ${svc.code} đã tự động được gỡ vì đơn hàng chưa đạt tối thiểu ${formatVND(svc.minOrder)}.`
        );
      }
    }
    if (warnings.length > 0) {
      setVoucherWarning(warnings.join(' '));
      showNotice(`⚠️ ${warnings[0]}`, 'warning');
    }
  }, [cartSummary.subtotal, cartSummary.detailedItems.length, selectedVoucherCode, selectedShippingVoucherCode, vouchers]);

  // ============================================================================
  // TÍCH HỢP CẢ 4 ĐIỀU KIỆN (1.DOCX): KHO SERIALIZABLE + CHỐNG TRÙNG + GIỮ CHỖ 30P + GIÁ SERVER
  // ============================================================================
  const executeCondition1StockTransaction = async (
    itemsToBuy,
    callerLabel = 'Đặt hàng',
    reserveOnly = false
  ) => {
    const sortedItems = [...itemsToBuy].sort((a, b) =>
      `${a.productId}-${a.variantId}`.localeCompare(`${b.productId}-${b.variantId}`)
    );

    try {
      const payload = {
        request_key: cartRequestKey,
        reserve_only: reserveOnly,
        items: sortedItems.map((i) => ({
          variant_id: i.variant.sqlVariantId || 1,
          quantity: i.quantity,
          client_price: i.unitPrice
        })),
        discount_voucher_code: selectedVoucherCode || '',
        shipping_voucher_code: selectedShippingVoucherCode || '',
        shipping_address: `${shippingAddress.street}, ${shippingAddress.ward}, ${shippingAddress.district}, ${shippingAddress.city}`,
        payment_method: paymentMethod
      };

      const res = await fetch('http://127.0.0.1:8000/api/orders/checkout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        setStockCheckResult({
          type: 'rollback',
          title: 'GIAO DỊCH BỊ CHẶN & ROLLBACK TOÀN BỘ',
          caller: callerLabel,
          errorDetail: data.error || 'Không đủ tồn kho, đã rollback toàn bộ đơn hàng!'
        });
        showNotice(`⚠️ ${data.error}`, 'warning');
        await syncStockFromBackend();
        return { ok: false, error: data.error };
      }

      if (Array.isArray(data.voucher_warnings) && data.voucher_warnings.length > 0) {
        setVoucherWarning(data.voucher_warnings.join(' '));
      }

      await syncStockFromBackend();
      return {
        ok: true,
        orderCode: data.order_code,
        isDuplicate: Boolean(data.is_duplicate),
        serverTotal: data.total_amount,
        serverStatus: data.status_display || data.status,
        message: data.message
      };
    } catch {
      for (const item of sortedItems) {
        const latestProd = products.find((p) => p.id === item.productId);
        const latestVar = latestProd?.variants.find((v) => v.id === item.variantId) || item.variant;
        const currentStock = Number(latestVar?.stock ?? 0);
        if (item.quantity > currentStock) {
          const msg = `Sản phẩm "${item.product.name} (${item.variant.label})" không đủ tồn kho! Khách đặt ${item.quantity} nhưng kho chỉ còn ${currentStock}. Toàn bộ đơn đã được Rollback.`;
          setStockCheckResult({
            type: 'rollback',
            title: 'GIAO DỊCH BỊ CHẶN & ROLLBACK TOÀN BỘ',
            caller: callerLabel,
            errorDetail: msg
          });
          showNotice(`⚠️ ${msg}`, 'warning');
          return { ok: false, error: msg };
        }
      }

      const existing = orders.find((o) => o.requestKey === cartRequestKey);
      if (existing) {
        return {
          ok: true,
          orderCode: existing.id,
          isDuplicate: true,
          serverTotal: existing.totalAmount,
          message: `Phát hiện RequestKey trùng (${cartRequestKey}) -> Trả về đơn cũ #${existing.id}, không trừ kho lần 2!`
        };
      }

      setProducts((prev) =>
        prev.map((p) => {
          const boughtInProd = sortedItems.filter((i) => i.productId === p.id);
          if (boughtInProd.length === 0) return p;
          const totalBoughtQty = boughtInProd.reduce((s, i) => s + i.quantity, 0);
          const nextVariants = p.variants.map((v) => {
            const matchItem = boughtInProd.find((i) => i.variantId === v.id);
            if (!matchItem) return v;
            return { ...v, stock: Math.max(0, v.stock - matchItem.quantity) };
          });
          return {
            ...p,
            stock: nextVariants[0]?.stock ?? p.stock,
            sold: p.sold + totalBoughtQty,
            variants: nextVariants
          };
        })
      );

      const genCode = `FM-${Math.floor(100000 + Math.random() * 900000)}`;
      return {
        ok: true,
        orderCode: genCode,
        isDuplicate: false,
        serverTotal: cartSummary.finalTotal
      };
    }
  };

  // Xử lý bấm nút "Tiến Hành Thanh Toán"
  const handleProceedCheckout = async () => {
    if (cartSummary.detailedItems.length === 0) {
      showNotice('Giỏ hàng đang trống, hãy chọn trái cây trước nhé!', 'warning');
      return;
    }
    if (!shippingAddress.street.trim()) {
      showNotice('Vui lòng nhập địa chỉ giao hàng để tính phí GHN!', 'warning');
      return;
    }

    if (paymentMethod === 'wallet' && buyerWallet < cartSummary.finalTotal) {
      showNotice('Số dư Ví FreshMart không đủ, vui lòng chọn VNPay/MoMo hoặc COD!', 'warning');
      return;
    }

    // ĐIỀU KIỆN 3: Nếu chọn thanh toán Online (VNPay / MoMo), đặt đơn là GIỮ CHỖ NGAY (trừ kho, Voucher sang Reserved trong 30 phút) trước khi mở cổng thanh toán!
    if (paymentMethod === 'vnpay' || paymentMethod === 'momo') {
      const reserveRes = await executeCondition1StockTransaction(
        cartSummary.detailedItems,
        'Giữ chỗ thanh toán Online 30 phút',
        true
      );
      if (!reserveRes.ok) return;

      setReservedPendingOrderCode(reserveRes.orderCode);
      if (reserveRes.isDuplicate) {
        showNotice(`ℹ️ Đã nhận diện đơn giữ chỗ #${reserveRes.orderCode} (Chống tạo trùng đơn). Đang mở lại cổng thanh toán!`);
      } else {
        showNotice(`🔒 Đã giữ chỗ kho & Voucher (Reserved 30 phút) cho đơn #${reserveRes.orderCode}!`);
      }
      setVnpayStep(1);
      setShowVnpayModal(true);
      return;
    }

    await finalizeOrder(paymentMethod === 'wallet' ? 'Ví Nội Bộ FreshMart' : 'Thanh toán khi nhận hàng (COD)');
  };

  // Hoàn tất thanh toán (hoặc xác nhận OTP VNPay)
  const finalizeOrder = async (methodLabel) => {
    if (reservedPendingOrderCode) {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/orders/confirm-payment/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_code: reservedPendingOrderCode })
        });
        if (res.ok) {
          await syncStockFromBackend();
          setCart([]);
          setReservedPendingOrderCode(null);
          setShowVnpayModal(false);
          setActiveView('orders');
          showNotice(`🎉 Thanh toán thành công đơn #${reservedPendingOrderCode}! Voucher đã chuyển sang Used.`);
          return;
        }
      } catch {
        // Fallback local
      }
    }

    const txResult = await executeCondition1StockTransaction(
      cartSummary.detailedItems,
      `Thanh toán qua ${methodLabel}`,
      false
    );

    if (!txResult.ok) {
      setShowVnpayModal(false);
      return;
    }

    const newOrderId = txResult.orderCode || `FM-${Math.floor(100000 + Math.random() * 900000)}`;
    if (!txResult.isDuplicate) {
      const newOrder = {
        id: newOrderId,
        requestKey: cartRequestKey,
        createdAt: '30/10/2026 00:20',
        buyerName: 'Khách Hàng Demo',
        address: `${shippingAddress.street}, ${shippingAddress.ward}, ${shippingAddress.district}, ${shippingAddress.city}`,
        paymentMethod: methodLabel,
        status: methodLabel.includes('COD') ? 'Chờ xác nhận' : 'Đã thanh toán',
        voucherStatus: (selectedVoucherCode || selectedShippingVoucherCode) ? 'Used' : 'None',
        items: cartSummary.detailedItems.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          variantLabel: i.variant.label,
          price: i.unitPrice,
          quantity: i.quantity,
          shopId: i.product.shopId,
          artType: i.product.artType
        })),
        shippingFee: cartSummary.shippingFee,
        discountAmount: cartSummary.totalDiscount,
        totalAmount: txResult.serverTotal ?? cartSummary.finalTotal,
        returnReason: '',
        returnDetail: '',
        reviewed: false
      };

      if (paymentMethod === 'wallet') {
        setBuyerWallet((prev) => prev - cartSummary.finalTotal);
        setWalletHistory((prev) => [
          {
            id: `wh-${Date.now()}`,
            type: `Thanh toán đơn hàng #${newOrderId}`,
            amount: -cartSummary.finalTotal,
            date: '30/10/2026 00:20',
            status: 'Thành công'
          },
          ...prev
        ]);
      }

      setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrderId)]);
    }

    await syncStockFromBackend();
    setCart([]);
    setReservedPendingOrderCode(null);
    setShowVnpayModal(false);
    setActiveView('orders');
    showNotice(
      txResult.isDuplicate
        ? `ℹ️ Chống đặt trùng: Đã trả lại đơn hàng cũ #${newOrderId} (không trừ kho lần 2)!`
        : `🎉 Đặt hàng thành công mã #${newOrderId} qua ${methodLabel}!`
    );
  };

  // ĐIỀU KIỆN 3: Khi khách đóng ngang cổng VNPay (Bỏ dở thanh toán Online) -> Đơn nằm ở trạng thái "Chờ thanh toán (Giữ chỗ 30p)"
  const handleAbandonVnpayModal = async () => {
    setShowVnpayModal(false);
    await syncStockFromBackend();
    setCart([]);
    setActiveView('orders');
    showNotice(
      `⏳ Bạn đã đóng cổng thanh toán. Đơn #${reservedPendingOrderCode} đang GIỮ CHỖ KHO & VOUCHER (Reserved) trong 30 phút!`,
      'warning'
    );
  };

  // ĐIỀU KIỆN 3: Hủy đơn hàng -> Máy trạng thái chuyển sang Đã hủy, CỘNG LẠI KHO & trả Voucher về Released!
  const handleCancelOrder = async (order) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/orders/cancel/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_code: order.id })
      });
      const data = await res.json();
      if (!res.ok) {
        showNotice(`⚠️ Máy trạng thái từ chối: ${data.error}`, 'warning');
        return;
      }
      await syncStockFromBackend();
      setBuyerWallet((prev) => prev + order.totalAmount);
      showNotice(`✅ ${data.message}`);
      return;
    } catch {
      // Fallback local
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: 'Đã hủy', voucherStatus: 'Released' } : o
      )
    );
    setBuyerWallet((prev) => prev + order.totalAmount);
    showNotice(`Đã hủy đơn #${order.id}, cộng lại tồn kho và trả Voucher về Released!`);
  };

  // ĐIỀU KIỆN 3: Quét các đơn giữ chỗ quá hạn 30 phút chưa thanh toán -> Tự động hoàn kho & trả Voucher về Released
  const handleSweepExpiredOrders = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/orders/release-expired/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ force_all_pending_online: true })
      });
      const data = await res.json();
      await syncStockFromBackend();
      showNotice(`🔄 ${data.message}`);
    } catch {
      showNotice('Vui lòng bật Backend Django để chạy dịch vụ quét đơn quá hạn 30 phút!', 'warning');
    }
  };

  // Khách hàng xác nhận đã nhận hàng -> Cộng tiền vào Ví người bán
  const handleConfirmReceived = (order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: 'Hoàn thành' } : o))
    );
    const shopId = order.items[0]?.shopId || 'shop-1';
    setShops((prev) =>
      prev.map((s) =>
        s.id === shopId
          ? {
              ...s,
              walletBalance: s.walletBalance + order.totalAmount,
              totalRevenue: s.totalRevenue + order.totalAmount
            }
          : s
      )
    );
    showNotice(`Cảm ơn bạn đã xác nhận nhận hàng! Đơn #${order.id} đã hoàn thành.`);
  };

  // Gửi yêu cầu trả hàng / hoàn tiền (như phút 13:05 trong video)
  const handleSubmitReturn = () => {
    if (!returnModalOrder) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === returnModalOrder.id
          ? {
              ...o,
              status: 'Yêu cầu hoàn trả',
              returnReason,
              returnDetail: returnDetail || 'Trái cây bị dập khi mở hộp, đề nghị hoàn tiền vào ví.'
            }
          : o
      )
    );
    showNotice(`Đã gửi yêu cầu hoàn trả cho đơn #${returnModalOrder.id}. Chờ Nhà vườn/Admin duyệt!`);
    setReturnModalOrder(null);
    setReturnDetail('');
  };

  // Nhà vườn / Admin duyệt hoàn trả -> Hoàn tiền tự động về Ví người mua (phút 13:45 trong video)
  const handleApproveReturn = (order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: 'Đã hoàn tiền' } : o))
    );
    setBuyerWallet((prev) => prev + order.totalAmount);
    setWalletHistory((prev) => [
      {
        id: `wh-${Date.now()}`,
        type: `Hoàn tiền trả hàng đơn #${order.id} (${order.returnReason || 'Hàng lỗi'})`,
        amount: +order.totalAmount,
        date: '23/10/2026 09:20',
        status: 'Đã hoàn vào Ví'
      },
      ...prev
    ]);
    showNotice(`Đã duyệt hoàn trả đơn #${order.id}! Số tiền ${formatVND(order.totalAmount)} đã hoàn về Ví người mua.`);
  };

  // Tạo yêu cầu rút tiền từ Ví (như phút 09:56 trong video)
  const handleCreateWithdraw = () => {
    const amountNum = Number(withdrawForm.amount);
    if (!withdrawForm.accountNumber.trim() || !withdrawForm.accountHolder.trim() || !amountNum) {
      showNotice('Vui lòng điền đầy đủ số tài khoản, tên chủ thẻ và số tiền cần rút!', 'warning');
      return;
    }
    if (amountNum < 10000 || amountNum > buyerWallet) {
      showNotice('Số tiền rút phải từ 10.000đ và không vượt quá số dư Ví hiện tại!', 'warning');
      return;
    }
    const reqId = `wd-${Math.floor(100 + Math.random() * 900)}`;
    setWithdrawRequests((prev) => [
      {
        id: reqId,
        requesterName: 'Khách Hàng Demo',
        role: 'Khách hàng',
        bankName: withdrawForm.bankName,
        accountNumber: withdrawForm.accountNumber,
        accountHolder: withdrawForm.accountHolder.toUpperCase(),
        amount: amountNum,
        date: '23/10/2026 09:22',
        status: 'Chờ duyệt'
      },
      ...prev
    ]);
    setBuyerWallet((prev) => prev - amountNum);
    setWalletHistory((prev) => [
      {
        id: `wh-${Date.now()}`,
        type: `Yêu cầu rút tiền về ${withdrawForm.bankName} (${withdrawForm.accountNumber})`,
        amount: -amountNum,
        date: '23/10/2026 09:22',
        status: 'Chờ Admin duyệt'
      },
      ...prev
    ]);
    setWithdrawForm({ ...withdrawForm, accountNumber: '', accountHolder: '', amount: '' });
    showNotice('Đã tạo yêu cầu rút tiền! Bạn có thể chuyển sang quyền Admin để duyệt thanh toán.');
  };

  // Admin xác nhận đã hoàn tiền / rút tiền (phút 10:13 trong video)
  const handleAdminConfirmWithdraw = (reqId) => {
    setWithdrawRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'Đã thanh toán' } : r))
    );
    showNotice(`Admin đã xác nhận chuyển khoản thành công cho yêu cầu #${reqId}!`);
  };

  // Phân tích đánh giá bằng AI (như phút 22:36 trong video)
  const triggerAiReviewAnalysis = (productId) => {
    setIsAnalyzingReviews(true);
    setAiAnalysisProductId(null);
    setTimeout(() => {
      setIsAnalyzingReviews(false);
      setAiAnalysisProductId(productId);
    }, 650);
  };

  // Thêm đánh giá mới cho sản phẩm
  const handleAddReview = () => {
    if (!newReviewForm.comment.trim()) {
      showNotice('Vui lòng nhập nội dung đánh giá trái cây!', 'warning');
      return;
    }
    const created = {
      id: `rv-${Date.now()}`,
      productId: selectedProduct.id,
      userName: 'Khách Hàng Demo',
      rating: newReviewForm.rating,
      date: '23/10/2026',
      variantLabel: selectedVariant?.label || 'Tiêu chuẩn',
      comment: newReviewForm.comment,
      pros: ['Trái cây tươi ngon', 'Giao hàng đúng hẹn'],
      cons: []
    };
    setReviews((prev) => [created, ...prev]);
    setNewReviewForm({ rating: 5, comment: '' });
    setAiAnalysisProductId(selectedProduct.id);
    showNotice('Đã gửi đánh giá sản phẩm! Bạn có thể bấm Phân tích bằng AI ngay bên dưới.');
  };

  // Gửi tin nhắn cho Nhà vườn (Chat trực tiếp như phút 24:15)
  const handleSendShopMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: `m-${Date.now()}`, sender: 'buyer', text: chatInput, time: '09:25' };
    const shopObj = shops.find((s) => s.id === activeChatShopId);
    setChats((prev) => ({
      ...prev,
      [activeChatShopId]: [...(prev[activeChatShopId] || []), userMsg]
    }));
    setChatInput('');
    setTimeout(() => {
      const autoReply = {
        id: `m-${Date.now() + 1}`,
        sender: 'shop',
        text: `Cảm ơn bạn đã nhắn cho ${shopObj?.name || 'Nhà vườn'}! Trái cây bên mình đều hái mới trong ngày và bảo hành 1 đổi 1 nếu dập hỏng ạ.`,
        time: '09:25'
      };
      setChats((prev) => ({
        ...prev,
        [activeChatShopId]: [...(prev[activeChatShopId] || []), autoReply]
      }));
    }, 500);
  };

  // Xử lý Chatbot AI tư vấn trái cây thông minh
  const handleSendAiPrompt = (customPrompt) => {
    const queryText = (customPrompt ?? aiInput).trim();
    if (!queryText) return;
    const userMsg = { id: `ai-u-${Date.now()}`, sender: 'user', text: queryText };
    const lower = queryText.toLowerCase();

    let replyText = '';
    let suggestedIds = [];

    if (lower.includes('giảm cân') || lower.includes('ăn kiêng') || lower.includes('eat clean') || lower.includes('calo')) {
      replyText =
        'Với chế độ **Eat Clean / Giảm cân**, AI gợi ý 2 lựa chọn lý tưởng nhất tại sàn: **Dâu Tây Nhật Hana Đà Lạt** (chỉ 32 kcal/100g, giàu Vitamin C) và **Bơ Sáp 034 Bảo Lộc** (chất béo tốt Omega-3 giúp no lâu, đẹp da). Bạn có thể thêm trực tiếp vào giỏ bên dưới nhé!';
      suggestedIds = ['prd-2', 'prd-6'];
    } else if (lower.includes('biếu') || lower.includes('tặng') || lower.includes('giỏ quà') || lower.includes('sinh nhật')) {
      replyText =
        'Nếu bạn cần **Quà biếu sang trọng**, mình đề xuất **Giỏ Quà Trái Cây Phú Quý (650.000đ)** gồm 6 loại trái cây nhập khẩu kèm thiệp miễn phí, hoặc **Nho Mẫu Đơn Shine Muscat (Flash Sale 329.000đ)** và **Cherry Đỏ Mỹ Size Jumbo**.';
      suggestedIds = ['prd-8', 'prd-3', 'prd-4'];
    } else if (lower.includes('sầu riêng') || lower.includes('miền tây') || lower.includes('ngọt')) {
      replyText =
        'Nếu bạn mê vị ngọt đậm béo ngậy thì **Sầu Riêng Ri6 Tiền Giang Tách Múi** đang có Flash Sale chỉ **149.000đ/khay 500g** (bao sượng 1 đổi 1) và **Xoài Cát Hòa Lộc Cái Bè (95.000đ/kg)** là chân ái!';
      suggestedIds = ['prd-1', 'prd-5'];
    } else if (lower.includes('mã giảm giá') || lower.includes('voucher') || lower.includes('khuyến mãi')) {
      replyText =
        'Hiện tại bạn có thể áp dụng mã **FRESHMART50K** (giảm 50.000đ cho đơn từ 200K), **FREESHIPGHN** (giảm 25.000đ phí vận chuyển) hoặc **DALAT30K** của Nông Trại Đà Lạt ngay ở bước Giỏ hàng!';
      suggestedIds = ['prd-1', 'prd-2'];
    } else {
      replyText =
        'Mình gợi ý Top 3 trái cây bán chạy nhất hôm nay tại FreshMart: **Sầu Riêng Ri6 Tiền Giang**, **Dâu Tây Nhật Hana Đà Lạt** và **Táo Envy New Zealand**. Tất cả đều cam kết tươi ngon và giao nhanh 2H qua GHN!';
      suggestedIds = ['prd-1', 'prd-2', 'prd-7'];
    }

    const botMsg = {
      id: `ai-b-${Date.now() + 1}`,
      sender: 'bot',
      text: replyText,
      suggestedProductIds: suggestedIds
    };

    setAiMessages((prev) => [...prev, userMsg, botMsg]);
    if (!customPrompt) setAiInput('');
  };

  // Đăng ký mở Gian hàng / Nhà vườn mới (như phút 15:25 trong video)
  const handleRegisterNewShop = () => {
    if (!registerShopForm.name.trim() || !registerShopForm.phone.trim()) {
      showNotice('Vui lòng nhập Tên nhà vườn và Số điện thoại liên hệ!', 'warning');
      return;
    }
    const newShop = {
      id: `shop-${Date.now()}`,
      name: registerShopForm.name,
      ownerEmail: 'nhavuonmoi@freshmart.vn',
      phone: registerShopForm.phone,
      address: registerShopForm.address || 'Hoàng Mai, Hà Nội',
      description: registerShopForm.description || 'Nhà vườn cung cấp trái cây tươi sạch theo mùa.',
      rating: 5.0,
      followers: 1,
      isFollowing: false,
      status: 'pending',
      walletBalance: 0,
      totalRevenue: 0
    };
    setShops((prev) => [newShop, ...prev]);
    setShowRegisterShopModal(false);
    setRegisterShopForm({ name: '', phone: '', address: '', description: '' });
    showNotice('Đăng ký gian hàng thành công! Hãy chuyển sang quyền Admin -> Quản lý Nhà vườn để bấm Duyệt.');
  };

  // Nhà vườn thêm sản phẩm trái cây mới (như phút 04:15 trong video)
  const handleSellerCreateProduct = () => {
    if (!newProductForm.name.trim()) {
      showNotice('Vui lòng nhập tên sản phẩm trái cây!', 'warning');
      return;
    }
    const priceNum = Number(newProductForm.price) || 120000;
    const origNum = Number(newProductForm.originalPrice) || priceNum + 30000;
    const newPrd = {
      id: `prd-${Date.now()}`,
      name: newProductForm.name,
      categoryId: newProductForm.categoryId,
      shopId: activeSellerShopId,
      brand: newProductForm.brand,
      origin: newProductForm.origin,
      artType: newProductForm.artType,
      price: priceNum,
      originalPrice: origNum,
      isFlashSale: true,
      flashSalePrice: priceNum,
      stock: Number(newProductForm.stock) || 50,
      sold: 0,
      rating: 5.0,
      weightGram: Number(newProductForm.weightGram) || 500,
      dimensions: '20x15x10 cm',
      nutrition: 'Giàu Vitamin tự nhiên, chất xơ và khoáng chất tươi sạch',
      shortDesc: newProductForm.shortDesc,
      detailDesc: `${newProductForm.shortDesc} Thu hoạch trực tiếp tại ${newProductForm.origin}, đóng gói tiêu chuẩn tính phí tự động qua Giao Hàng Nhanh (GHN).`,
      variants: [
        {
          id: `v-${Date.now()}-1`,
          label: newProductForm.variantLabel || 'Hộp 500g',
          ripeness: newProductForm.ripeness || 'Chín tươi ăn ngay',
          price: priceNum,
          originalPrice: origNum,
          stock: Number(newProductForm.stock) || 50,
          weightGram: Number(newProductForm.weightGram) || 500
        }
      ]
    };
    setProducts((prev) => [newPrd, ...prev]);
    setNewProductForm({ ...newProductForm, name: '' });
    showNotice(`Đã đăng bán "${newPrd.name}" lên sàn thành công!`);
  };

  // Admin thêm Banner mới (như phút 01:10 trong video)
  const handleAdminAddBanner = () => {
    if (!bannerForm.title.trim()) {
      showNotice('Vui lòng nhập tiêu đề Banner!', 'warning');
      return;
    }
    const created = {
      id: `bn-${Date.now()}`,
      ...bannerForm,
      accentColor: '#fde047'
    };
    setBanners((prev) => [created, ...prev]);
    setActiveBannerIdx(0);
    showNotice('Đã cập nhật Banner mới lên Trang chủ thành công!');
  };

  // ĐIỀU KIỆN 3: Máy trạng thái đơn hàng (State Machine) — chỉ cho phép các bước chuyển hợp lệ
  const handleAdminUpdateOrderStatus = async (orderId, nextStatus) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/orders/transition/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_code: orderId, next_status: nextStatus })
      });
      const data = await res.json();
      if (!res.ok) {
        showNotice(`⛔ Máy trạng thái chặn: ${data.error}`, 'warning');
        return;
      }
      await syncStockFromBackend();
      showNotice(`✅ ${data.message}`);
      return;
    } catch {
      // Fallback local
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    showNotice(`Đã chuyển trạng thái đơn #${orderId} sang "${nextStatus}"`);
  };

  const currentBanner = banners[activeBannerIdx % banners.length] || banners[0];
  const productReviews = reviews.filter((r) => r.productId === selectedProduct?.id);

  return (
    <div className={darkMode ? 'min-h-screen bg-slate-950 text-slate-100 font-sans' : 'min-h-screen bg-emerald-50/40 text-slate-800 font-sans'}>
      {/* TOAST THÔNG BÁO */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border bg-slate-900 text-white border-emerald-500/40 max-w-md animate-bounce">
          {toast.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP BAR: ĐIỀU HƯỚNG VAI TRÒ & ĐĂNG NHẬP CĂN LỀ PHẢI */}
      <div className="bg-emerald-900 text-emerald-50 text-xs py-2 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Cụm bên trái: Cam kết & Chuyển trang */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="hidden xl:inline text-emerald-200 mr-2">
              🌾 Cam kết 100% Trái cây sạch VietGAP • Giao nhanh 2H
            </span>
            <button
              type="button"
              onClick={() => setActiveView('landing')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                activeView === 'landing'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              🌿 Landing Page
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentRole('buyer');
                setActiveView('home');
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                currentRole === 'buyer' && activeView !== 'landing'
                  ? 'bg-amber-400 text-slate-900 shadow-sm'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              🛒 Khách hàng
            </button>
            <button
              type="button"
              onClick={() => openLoginForRole('seller', 'seller-dashboard')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                currentRole === 'seller' && activeView === 'seller-dashboard'
                  ? 'bg-amber-400 text-slate-900 shadow-sm'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              🏪 Quản lý Bán hàng (Nhà vườn)
            </button>
            <button
              type="button"
              onClick={() => openLoginForRole('admin', 'admin-dashboard')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                currentRole === 'admin' && activeView === 'admin-dashboard'
                  ? 'bg-amber-400 text-slate-900 shadow-sm'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              🛡️ Quản trị viên (Admin)
            </button>
          </div>

          {/* Cụm bên phải (Căn sát lề phải trang bằng ml-auto): Nút Đăng nhập / Đăng ký */}
          <div className="ml-auto flex items-center justify-end gap-2">
            {currentUser ? (
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('login');
                    setShowAuthModal(true);
                  }}
                  className="px-3 py-1 rounded-lg bg-emerald-950/90 text-amber-300 font-bold inline-flex items-center gap-1.5 hover:bg-emerald-950 border border-emerald-700"
                  title="Bấm để đổi tài khoản / Đăng nhập tài khoản khác"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{currentUser.name} ({currentUser.role})</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold inline-flex items-center gap-1"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Đăng xuất</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthTab('login');
                  setShowAuthModal(true);
                }}
                className="px-3.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold inline-flex items-center gap-1.5 shadow"
              >
                <User className="w-3.5 h-3.5" /> Đăng nhập / Đăng ký
              </button>
            )}
          </div>
        </div>
      </div>

      {/* HEADER CHÍNH */}
      <header className={darkMode ? 'sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800' : 'sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm'}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo */}
          <button
            type="button"
            onClick={() => {
              setCurrentRole('buyer');
              setViewingShopId(null);
              setActiveView('home');
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-md">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight flex items-center gap-1.5">
                <span className="text-emerald-600">FreshMart</span>
              </div>
              <p className="text-[11px] text-slate-500">Sàn Trái Cây Tươi Sạch Toàn Quốc</p>
            </div>
          </button>

          {/* Thanh tìm kiếm */}
          <div className="flex-1 min-w-[220px] max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'home') setActiveView('home');
              }}
              placeholder="Tìm Sầu riêng Ri6, Dâu tây Đà Lạt, Nho Mẫu Đơn..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-100'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />
          </div>

          {/* Cụm nút điều hướng nhanh căn sát lề phải */}
          <div className="ml-auto flex items-center justify-end gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setShowRegisterShopModal(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 inline-flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5" /> Bắt đầu bán hàng
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentRole('buyer');
                setActiveView('affiliate');
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1 ${
                activeView === 'affiliate'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" /> Affiliate 15%
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentRole('buyer');
                setActiveView('wallet');
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1 border ${
                activeView === 'wallet'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : darkMode
                  ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-500" />
              <span>Ví: {formatVND(buyerWallet)}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentRole('buyer');
                setActiveView('orders');
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1 border ${
                activeView === 'orders'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : darkMode
                  ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Đơn hàng ({orders.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentRole('buyer');
                setActiveView('favorites');
              }}
              className="p-2 rounded-xl border border-transparent hover:border-slate-200 relative"
              title="Trái cây yêu thích"
            >
              <Heart className={`w-5 h-5 ${favoriteIds.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              <span className=" -top-1 -right-1 text-[10px] bg-rose-500 text-white rounded-full px-1.5 font-bold">
                {favoriteIds.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentRole('buyer');
                setActiveView('chat');
              }}
              className="p-2 rounded-xl border border-transparent hover:border-slate-200 relative"
              title="Tin nhắn với Nhà vườn"
            >
              <MessageSquare className="w-5 h-5 text-emerald-600" />
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentRole('buyer');
                setActiveView('cart');
              }}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Giỏ ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
            </button>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border ${
                darkMode ? 'border-slate-700 bg-slate-800 text-amber-400' : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}
              title="Chế độ Sáng / Tối"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* NỘI DUNG CHÍNH THEO VIEW */}
      {/* ===================================================================== */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* ----------------------------------------------------------------- */}
        {/* 0. LANDING PAGE — TRANG ĐÍCH GIỚI THIỆU HỆ SINH THÁI FRESHMART AI */}
        {/* ----------------------------------------------------------------- */}
        {activeView === 'landing' && (
          <div className="space-y-12">
            {/* HERO SECTION LANDING PAGE */}
            <section className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-amber-300 text-xs font-extrabold tracking-wide">
                    <Sparkles className="w-4 h-4" />
                    <span>SÀN THƯƠNG MẠI ĐIỆN TỬ NÔNG SẢN SẠCH TÍCH HỢP AI ĐẦU TIÊN</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                    Trái Cây Tươi Từ Vườn <br />
                    <span className="text-amber-300">Giao Lạnh 2 Giờ</span> Tới Bàn Ăn
                  </h1>
                  <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
                    Kết nối trực tiếp hơn 50 nhà vườn đạt chuẩn VietGAP &amp; trái cây nhập khẩu đường bay.
                    Ứng dụng Trí tuệ Nhân tạo (AI) tư vấn dinh dưỡng, phân tích đánh giá thực tế và cam kết
                    <strong> Bảo hành 1 đổi 1 — Hoàn tiền tự động 100% vào Ví trong 24h</strong> nếu dập hỏng.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveView('home')}
                      className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-xl transition inline-flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Khám Phá Cửa Hàng Ngay
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAiChatOpen(true)}
                      className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" /> Nhờ AI Tư Vấn Thực Đơn
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthTab('login');
                        setShowAuthModal(true);
                      }}
                      className="px-5 py-3.5 rounded-2xl border border-emerald-400/40 hover:bg-emerald-800/50 text-emerald-100 font-bold text-sm inline-flex items-center gap-2"
                    >
                      <User className="w-4 h-4" /> Đăng Nhập Phân Quyền
                    </button>
                  </div>

                  {/* 4 Chỉ số thống kê nổi bật */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
                    {[
                      { num: '50+', label: 'Nhà vườn VietGAP' },
                      { num: '2 Giờ', label: 'Giao lạnh nội thành GHN' },
                      { num: '99.4%', label: 'Đánh giá hài lòng' },
                      { num: '1 Đổi 1', label: 'Hoàn tiền Ví tự động' }
                    ].map((stat, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-white/10 backdrop-blur">
                        <div className="text-xl font-extrabold text-amber-300">{stat.num}</div>
                        <div className="text-xs text-emerald-100">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Khung minh họa bộ sưu tập trái cây */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                  {[
                    { type: 'durian', name: 'Sầu Riêng Ri6 Cai Lậy', tag: 'Cơm vàng hạt lép' },
                    { type: 'strawberry', name: 'Dâu Tây Hana Đà Lạt', tag: 'Hái sáng sớm 05:00' },
                    { type: 'grape', name: 'Nho Mẫu Đơn Shine Muscat', tag: 'Nhập khẩu đường bay' },
                    { type: 'giftbox', name: 'Giỏ Quà Trái Cây Phú Quý', tag: 'Tặng đối tác & gia đình' }
                  ].map((card, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveView('home')}
                      className="cursor-pointer group rounded-2xl bg-white/10 hover:bg-white/20 p-3 backdrop-blur border border-white/15 transition"
                    >
                      <div className="h-28 rounded-xl overflow-hidden mb-2">
                        <FruitArtwork type={card.type} />
                      </div>
                      <div className="font-bold text-xs text-white group-hover:text-amber-300 transition">
                        {card.name}
                      </div>
                      <div className="text-[11px] text-emerald-200">{card.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4 GIÁ TRỊ CỐT LÕI KHÁC BIỆT (USP) */}
            <section className="space-y-4">
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                  Vì Sao Chọn FreshMart?
                </span>
                <h2 className="text-2xl font-extrabold">
                  4 Tiêu Chuẩn Bảo Chứng Chất Lượng Nông Sản
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: <Shield className="w-6 h-6 text-emerald-600" />,
                    title: 'Đảm Bảo Tồn Kho & Chống Trùng Đơn',
                    desc: 'Giao dịch SQL Server Serializable khóa dòng (UPDLOCK, HOLDLOCK) và RequestKey chống đặt trùng đơn tuyệt đối.'
                  },
                  {
                    icon: <Truck className="w-6 h-6 text-teal-600" />,
                    title: 'Vận Chuyển Lạnh GHN Theo Gram',
                    desc: 'Tự động tính phí Giao Hàng Nhanh theo tổng khối lượng thực tế và giữ lạnh xuyên suốt từ vườn tới tay khách.'
                  },
                  {
                    icon: <Wallet className="w-6 h-6 text-amber-600" />,
                    title: 'Giữ Chỗ 30 Phút & Hoàn Ví Tự Động',
                    desc: 'Giữ chỗ kho & Voucher 30 phút khi thanh toán VNPay; hoàn tiền 100% về Ví nội bộ ngay khi hủy hoặc trả hàng.'
                  },
                  {
                    icon: <Sparkles className="w-6 h-6 text-rose-600" />,
                    title: 'Trợ Lý AI Dinh Dưỡng & Đánh Giá',
                    desc: 'AI gợi ý trái cây theo chế độ Eat Clean / tiểu đường và tóm tắt ưu nhược điểm khách quan từ bình luận người mua.'
                  }
                ].map((usp, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-3xl border space-y-2.5 ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      {usp.icon}
                    </div>
                    <h3 className="font-extrabold text-sm">{usp.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{usp.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* QUY TRÌNH 4 BƯỚC TỪ NHÀ VƯỜN TỚI BÀN ĂN */}
            <section className={`p-6 sm:p-8 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-emerald-200'}`}>
              <div className="text-center max-w-xl mx-auto mb-6">
                <span className="text-xs font-extrabold uppercase text-emerald-600">Hành Trình Tươi Ngon</span>
                <h2 className="text-xl sm:text-2xl font-extrabold mt-1">
                  Quy Trình 4 Bước Từ Cành Cây Tới Bàn Ăn
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: 'Bước 01', time: '05:00 Sáng', title: 'Thu Hoạch Tại Vườn', desc: 'Hái trái cây đúng độ chín chuẩn tại Đà Lạt, Tiền Giang và nhập khẩu Air-freight.' },
                  { step: 'Bước 02', time: '07:00 Sáng', title: 'Kiểm Định Độ Ngọt Brix', desc: 'Phân loại biến thể độ chín (Chín ăn ngay / Già 85% biếu tặng) và đóng hộp chống sốc.' },
                  { step: 'Bước 03', time: 'Tức Thì', title: 'Đặt Hàng & Khóa Kho SQL', desc: 'Máy chủ tính giá chuẩn, áp dụng đồng thời 1 mã giảm giá hàng + 1 mã vận chuyển.' },
                  { step: 'Bước 04', time: 'Trong 2 Giờ', title: 'Giao Tận Nơi & Bảo Hành', desc: 'Khách kiểm tra hàng, xác nhận hài lòng hoặc yêu cầu đổi trả hoàn tiền về Ví 100%.' }
                ].map((st, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-emerald-100'}`}>
                    <div className="flex items-center justify-between text-xs font-extrabold text-emerald-600 mb-1">
                      <span>{st.step}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px]">{st.time}</span>
                    </div>
                    <div className="font-bold text-sm mb-1">{st.title}</div>
                    <p className="text-xs text-slate-500">{st.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SẢN PHẨM TIÊU BIỂU TRÊN LANDING PAGE */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase text-emerald-600">Đặc Sản Hôm Nay</span>
                  <h2 className="text-xl font-extrabold">Trái Cây Nổi Bật Được Yêu Thích Nhất</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView('home')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                >
                  Xem Toàn Bộ 8+ Sản Phẩm →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-2xl border p-4 flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="h-36 rounded-xl overflow-hidden mb-3">
                        <FruitArtwork type={p.artType} />
                      </div>
                      <div className="text-[11px] font-bold text-emerald-600">{p.origin}</div>
                      <h3 className="font-bold text-sm mt-0.5 line-clamp-2">{p.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.shortDesc}</p>
                    </div>
                    <div className="pt-3 mt-3 border-t flex items-center justify-between">
                      <span className="font-extrabold text-base text-emerald-600">
                        {formatVND(p.isFlashSale ? p.flashSalePrice : p.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => openProductDetail(p)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PHÂN HỆ ĐĂNG NHẬP NHANH THEO 3 VAI TRÒ NGAY TRÊN LANDING PAGE */}
            <section className={`p-6 sm:p-8 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-200 shadow-sm'}`}>
              <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
                <span className="text-xs font-extrabold uppercase text-emerald-600">Hệ Thống Phân Quyền Đa Vai Trò (RBAC)</span>
                <h2 className="text-xl sm:text-2xl font-extrabold">
                  Chọn 1 trong 3 vai trò dưới đây để đăng nhập và khám phá chức năng chuyên biệt của từng phân hệ:
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    role: 'buyer',
                    view: 'home',
                    badge: 'Vai trò 1 • Khách hàng',
                    title: 'Khách Hàng Mua Sắm',
                    email: 'khachhang@gmail.com',
                    features: [
                      'Lọc trái cây, chọn biến thể quy cách & độ chín',
                      'Tính cước GHN theo gram & thanh toán VNPay',
                      'Ví nội bộ hoàn tiền tự động & Affiliate 15%',
                      'Chat với Nhà vườn & Trợ lý AI dinh dưỡng'
                    ],
                    btnLabel: 'Đăng Nhập Quyền Khách Hàng'
                  },
                  {
                    role: 'seller',
                    view: 'seller-dashboard',
                    badge: 'Vai trò 2 • Nhà vườn',
                    title: 'Kênh Quản Lý Nhà Vườn',
                    email: 'seller@freshmart.vn',
                    features: [
                      'Đăng bán nông sản mới & quản lý tồn kho',
                      'Bật / tắt chương trình Flash Sale trong ngày',
                      'Tạo mã giảm giá Voucher riêng của Shop',
                      'Duyệt yêu cầu trả hàng & rút doanh thu'
                    ],
                    btnLabel: 'Đăng Nhập Quyền Nhà Vườn'
                  },
                  {
                    role: 'admin',
                    view: 'admin-dashboard',
                    badge: 'Vai trò 3 • Quản trị viên',
                    title: 'Trung Tâm Quản Trị (Admin)',
                    email: 'admin@freshmart.vn',
                    features: [
                      'Điều phối đơn hàng qua Máy trạng thái (State Machine)',
                      'Thêm / xóa Banner chiến dịch ngoài trang chủ',
                      'Duyệt mở gian hàng mới & xử lý báo cáo vi phạm',
                      'Duyệt rút tiền Ví & Khóa/Mở khóa tài khoản'
                    ],
                    btnLabel: 'Đăng Nhập Quyền Admin'
                  }
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
                    }`}
                  >
                    <div className="space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                        {card.badge}
                      </span>
                      <h3 className="font-extrabold text-base">{card.title}</h3>
                      <div className="text-[11px] font-mono text-slate-500">
                        Tài khoản: <strong>{card.email}</strong> | MK: <strong>123</strong>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1">
                        {card.features.map((f, fi) => (
                          <li key={fi}>✓ {f}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => openLoginForRole(card.role, card.view)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow"
                    >
                      {card.btnLabel} →
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 1. TRANG CHỦ KHÁCH HÀNG (BANNER ĐỘNG, DANH MỤC, FLASH SALE, LỌC) */}
        {/* ----------------------------------------------------------------- */}
        {activeView === 'home' && (
          <div className="space-y-8">
            {/* Banner Hero Động (Quản lý trực tiếp từ Admin) */}
            <div className={`rounded-3xl bg-gradient-to-r ${currentBanner.gradient} text-white p-6 sm:p-8 shadow-lg relative overflow-hidden`}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-3 z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{currentBanner.badge}</span>
                    <span className="opacity-80">| {currentBanner.period}</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                    {currentBanner.title}
                  </h1>
                  <p className="text-sm sm:text-base text-white/90 max-w-xl">
                    {currentBanner.subtitle}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setOnlyFlashSale(true)}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm shadow-md transition"
                    >
                      {currentBanner.ctaText}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAiChatOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm backdrop-blur inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" /> Nhờ AI chọn trái cây
                    </button>
                  </div>
                </div>
                <div className="md:col-span-5 flex justify-center">
                  <div className="w-56 h-44 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/25">
                    <FruitArtwork type={currentBanner.artType || 'giftbox'} />
                  </div>
                </div>
              </div>

              {/* Nút chuyển Banner */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/15 text-xs">
                <div className="flex items-center gap-2">
                  {banners.map((b, idx) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setActiveBannerIdx(idx)}
                      className={`px-2.5 py-1 rounded-full font-semibold transition ${
                        idx === activeBannerIdx % banners.length
                          ? 'bg-white text-slate-900'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      Banner #{idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentRole('admin');
                    setAdminTab('banners');
                    setActiveView('admin-dashboard');
                  }}
                  className="underline text-white/90 hover:text-white font-medium"
                >
                  Sửa Banner trong Admin →
                </button>
              </div>
            </div>

            {/* Danh mục Trái cây */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Tag className="w-5 h-5 text-emerald-600" /> Danh Mục Trái Cây
                </h2>
                {viewingShopId && (
                  <button
                    type="button"
                    onClick={() => setViewingShopId(null)}
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    ✕ Đang lọc theo Gian hàng (Bấm để xem toàn sàn)
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : darkMode
                        ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'
                        : 'bg-white border-emerald-100 hover:border-emerald-300 shadow-sm'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <div className="font-bold text-sm leading-snug">{cat.name}</div>
                      <div className={`text-xs ${selectedCategory === cat.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                        Tươi mới mỗi ngày
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Khu vực FLASH SALE Trái Cây Trong Ngày */}
            <section className={darkMode ? 'rounded-3xl p-5 bg-slate-900 border border-rose-500/30' : 'rounded-3xl p-5 bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border border-rose-200'}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-600 text-white font-extrabold text-sm shadow">
                    <Zap className="w-4 h-4 fill-amber-300 text-amber-300" /> FLASH SALE TƯƠI TRONG NGÀY
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold">
                    <span className="px-2 py-1 rounded bg-slate-900 text-white">{countdown.h}</span>
                    <span>:</span>
                    <span className="px-2 py-1 rounded bg-slate-900 text-white">{countdown.m}</span>
                    <span>:</span>
                    <span className="px-2 py-1 rounded bg-rose-600 text-white">{countdown.s}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOnlyFlashSale(!onlyFlashSale)}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  {onlyFlashSale ? 'Hiển thị tất cả sản phẩm' : 'Xem tất cả Flash Sale →'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products
                  .filter((p) => p.isFlashSale)
                  .slice(0, 4)
                  .map((p) => {
                    const discountPct = Math.round(((p.originalPrice - p.flashSalePrice) / p.originalPrice) * 100);
                    return (
                      <div
                        key={p.id}
                        className={`rounded-2xl p-3.5 border transition flex flex-col justify-between ${
                          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-rose-100 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div>
                          <div className="relative h-36 rounded-xl overflow-hidden mb-3">
                            <FruitArtwork type={p.artType} />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[11px] font-extrabold">
                              -{discountPct}% FLASH
                            </span>
                          </div>
                          <div className="text-[11px] text-emerald-600 font-semibold">{p.origin}</div>
                          <h3 className="font-bold text-sm line-clamp-2 mt-0.5">{p.name}</h3>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-extrabold text-rose-600">
                              {formatVND(p.flashSalePrice)}
                            </span>
                            <span className="text-xs line-through text-slate-400">
                              {formatVND(p.originalPrice)}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openProductDetail(p)}
                              className="flex-1 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                            >
                              Mua Deal Ngay
                            </button>
                            <button
                              type="button"
                              onClick={() => addToCart(p, p.variants[0], 1, false)}
                              className="p-1.5 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200"
                              title="Thêm nhanh vào giỏ"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>

            {/* Bộ lọc nâng cao & Danh sách sản phẩm */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Cột Bộ lọc */}
              <aside className={`lg:col-span-3 rounded-2xl p-4 border h-fit space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-emerald-600" /> Bộ Lọc Trái Cây
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceFilter('all');
                      setMinRatingFilter(0);
                      setOnlyFlashSale(false);
                      setViewingShopId(null);
                      setSearchQuery('');
                    }}
                    className="text-xs text-emerald-600 hover:underline font-medium"
                  >
                    Đặt lại
                  </button>
                </div>

                {/* Khoảng giá */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-500">Khoảng giá</div>
                  {[
                    { id: 'all', label: 'Tất cả mức giá' },
                    { id: 'under150', label: 'Dưới 150.000đ' },
                    { id: '150to300', label: 'Từ 150.000đ - 300.000đ' },
                    { id: 'over300', label: 'Trên 300.000đ (Quà biếu)' }
                  ].map((pf) => (
                    <button
                      key={pf.id}
                      type="button"
                      onClick={() => setPriceFilter(pf.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                        priceFilter === pf.id
                          ? 'bg-emerald-600 text-white'
                          : 'hover:bg-emerald-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pf.label}
                    </button>
                  ))}
                </div>

                {/* Đánh giá sao */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-500">Đánh giá từ</div>
                  {[0, 4.8, 4.9, 5.0].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setMinRatingFilter(star)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                        minRatingFilter === star
                          ? 'bg-emerald-600 text-white'
                          : 'hover:bg-emerald-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {star === 0 ? 'Mọi mức đánh giá' : `⭐ Từ ${star} sao trở lên`}
                    </button>
                  ))}
                </div>

                {/* Lọc theo Nhà vườn */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-500">Gian hàng Nhà vườn</div>
                  {shops
                    .filter((s) => s.status === 'approved')
                    .map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setViewingShopId(viewingShopId === s.id ? null : s.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                          viewingShopId === s.id
                            ? 'bg-emerald-600 text-white'
                            : 'hover:bg-emerald-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">{s.name}</span>
                        <span className="text-[10px] opacity-75">★{s.rating}</span>
                      </button>
                    ))}
                </div>
              </aside>

              {/* Lưới Sản phẩm */}
              <div className="lg:col-span-9 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base">
                    Danh Sách Trái Cây ({filteredProducts.length} sản phẩm)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => {
                    const shop = shops.find((s) => s.id === product.shopId);
                    const isFav = favoriteIds.includes(product.id);
                    const displayPrice = product.isFlashSale ? product.flashSalePrice : product.price;
                    return (
                      <div
                        key={product.id}
                        className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition ${
                          darkMode
                            ? 'bg-slate-900 border-slate-800 hover:border-emerald-600'
                            : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div>
                          <div className="relative h-44">
                            <FruitArtwork type={product.artType} />
                            <button
                              type="button"
                              onClick={() => toggleFavorite(product.id)}
                              className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-slate-700 hover:text-rose-600 shadow"
                              title="Yêu thích"
                            >
                              <Heart className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : ''}`} />
                            </button>
                            <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-lg bg-slate-900/75 text-white text-[11px] font-medium">
                              {product.origin}
                            </span>
                          </div>

                          <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span className="font-semibold text-emerald-600 truncate">
                                🏪 {shop?.name || 'FreshMart'}
                              </span>
                              <span>⭐ {product.rating} ({product.sold} đã bán)</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] pt-0.5">
                              <span className="text-slate-400">Quy cách: {product.variants?.[0]?.label}</span>
                              <span className={`px-2 py-0.5 rounded-full font-bold ${
                                (product.variants?.[0]?.stock ?? product.stock) > 0
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-rose-100 text-rose-700'
                              }`}>
                                Kho DB: {product.variants?.[0]?.stock ?? product.stock}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm line-clamp-2 min-h-[40px]">
                              {product.name}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2">
                              {product.shortDesc}
                            </p>
                          </div>
                        </div>

                        <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                          <div>
                            <div className="text-base font-extrabold text-emerald-600">
                              {formatVND(displayPrice)}
                            </div>
                            <div className="text-[11px] line-through text-slate-400">
                              {formatVND(product.originalPrice)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openProductDetail(product)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100"
                            >
                              Chi tiết
                            </button>
                            <button
                              type="button"
                              onClick={() => addToCart(product, product.variants[0], 1, false)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                            >
                              + Giỏ
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sản phẩm đã xem gần đây (như phút 07:31 trong video) */}
                {recentlyViewedIds.length > 0 && (
                  <div className={`rounded-2xl p-4 border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Trái cây đã xem gần đây
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setRecentlyViewedIds([]);
                          showNotice('Đã xóa lịch sử trái cây vừa xem');
                        }}
                        className="text-xs text-rose-500 hover:underline"
                      >
                        Xóa lịch sử
                      </button>
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-1">
                      {recentlyViewedIds.map((id) => {
                        const p = products.find((item) => item.id === id);
                        if (!p) return null;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => openProductDetail(p)}
                            className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shrink-0 text-left"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <FruitArtwork type={p.artType} />
                            </div>
                            <div>
                              <div className="text-xs font-bold max-w-[140px] truncate">{p.name}</div>
                              <div className="text-[11px] text-emerald-600 font-semibold">
                                {formatVND(p.isFlashSale ? p.flashSalePrice : p.price)}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 2. CHI TIẾT SẢN PHẨM + BIẾN THỂ + AI PHÂN TÍCH ĐÁNH GIÁ + SHOP */}
        {/* ----------------------------------------------------------------- */}
        {activeView === 'product-detail' && selectedProduct && (
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => setActiveView('home')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại danh sách trái cây
            </button>

            <div className={`rounded-3xl p-6 border grid grid-cols-1 lg:grid-cols-12 gap-8 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'}`}>
              <div className="lg:col-span-5 space-y-4">
                <div className="h-72 rounded-2xl overflow-hidden border border-emerald-100 shadow-inner">
                  <FruitArtwork type={selectedProduct.artType} />
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                  <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <Leaf className="w-4 h-4" /> Giá trị dinh dưỡng & Bảo quản
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{selectedProduct.nutrition}</p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {selectedProduct.brand}
                  </span>
                  <span className="text-xs text-slate-500">Xuất xứ: {selectedProduct.origin}</span>
                  <span className="text-xs text-amber-500 font-bold">★ {selectedProduct.rating}</span>
                </div>

                <h1 className="text-2xl font-extrabold">{selectedProduct.name}</h1>
                <p className="text-sm text-slate-500">{selectedProduct.detailDesc}</p>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-800 flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-emerald-600">
                    {formatVND(selectedVariant?.price || selectedProduct.price)}
                  </span>
                  <span className="text-sm line-through text-slate-400">
                    {formatVND(selectedVariant?.originalPrice || selectedProduct.originalPrice)}
                  </span>
                  <span className="ml-auto text-xs text-slate-500">
                    Tồn kho: <strong>{selectedVariant?.stock || selectedProduct.stock}</strong> phần
                  </span>
                </div>

                {/* Chọn Biến thể Quy cách & Độ chín (như phút 05:45 trong video) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500">
                    Chọn quy cách đóng gói & Độ chín:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {selectedProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`p-3 rounded-xl border text-left transition ${
                          selectedVariant?.id === v.id
                            ? 'border-emerald-600 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                            : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                        }`}
                      >
                        <div className="font-bold text-xs">{v.label}</div>
                        <div className="text-[11px] text-emerald-600 mt-0.5">{v.ripeness}</div>
                        <div className="text-xs font-extrabold mt-1">{formatVND(v.price)}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Số lượng & Nút Mua */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setDetailQty((q) => Math.max(1, q - 1))}
                      className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-sm">{detailQty}</span>
                    <button
                      type="button"
                      onClick={() => setDetailQty((q) => q + 1)}
                      className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(selectedProduct, selectedVariant, detailQty, false)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2 shadow"
                  >
                    <ShoppingBag className="w-4 h-4" /> Thêm vào giỏ hàng
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart(selectedProduct, selectedVariant, detailQty, true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm shadow"
                  >
                    Mua & Thanh toán ngay
                  </button>
                </div>

                {/* Thông tin Gian hàng Nhà vườn (như phút 06:55 trong video: Xem shop, Theo dõi, Chat, Báo cáo) */}
                {(() => {
                  const shop = shops.find((s) => s.id === selectedProduct.shopId) || shops[0];
                  return (
                    <div className={`mt-4 p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                      <div>
                        <div className="font-bold text-sm flex items-center gap-2">
                          <Store className="w-4 h-4 text-emerald-600" />
                          <span>{shop.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            ★ {shop.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          📍 {shop.address} • {shop.followers} người theo dõi
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveChatShopId(shop.id);
                            setActiveView('chat');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Chat với Nhà vườn
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setViewingShopId(shop.id);
                            setActiveView('home');
                          }}
                          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold"
                        >
                          Xem Shop
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShops((prev) =>
                              prev.map((s) =>
                                s.id === shop.id
                                  ? {
                                      ...s,
                                      isFollowing: !s.isFollowing,
                                      followers: s.isFollowing ? s.followers - 1 : s.followers + 1
                                    }
                                  : s
                              )
                            );
                            showNotice(shop.isFollowing ? `Đã bỏ theo dõi ${shop.name}` : `Đã theo dõi ${shop.name}!`);
                          }}
                          className="px-3 py-1.5 rounded-xl border border-emerald-500 text-emerald-600 text-xs font-bold"
                        >
                          {shop.isFollowing ? '✓ Đang theo dõi' : '+ Theo dõi'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setReportModalShop(shop)}
                          className="px-2.5 py-1.5 rounded-xl text-xs text-rose-500 hover:bg-rose-50 inline-flex items-center gap-1"
                        >
                          <Flag className="w-3.5 h-3.5" /> Báo cáo
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* PHÂN TÍCH ĐÁNH GIÁ BẰNG AI (Như phút 22:36 trong video) */}
            <div className={`rounded-3xl p-6 border space-y-5 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" /> Đánh Giá Khách Hàng & Phân Tích AI ({productReviews.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    AI tổng hợp ưu điểm, nhược điểm và độ tươi ngon thực tế từ người mua
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerAiReviewAnalysis(selectedProduct.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold inline-flex items-center gap-2 shadow"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {isAnalyzingReviews ? 'AI đang phân tích...' : 'Phân tích đánh giá bằng AI'}
                </button>
              </div>

              {aiAnalysisProductId === selectedProduct.id && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Kết Quả AI Tóm Tắt Đánh Giá
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                      Độ hài lòng: 98% (Rất nên mua)
                    </span>
                  </div>
                  <p className="text-sm">
                    <strong>Nhận định chung:</strong> Sản phẩm <strong>{selectedProduct.name}</strong> được người mua đánh giá độ tươi ngon rất ổn định, hương vị đúng mô tả ({selectedProduct.shortDesc.toLowerCase()}) và đóng gói chống sốc kỹ khi giao qua GHN.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700">
                      <div className="font-bold text-emerald-600 mb-1">✓ Điểm mạnh nổi bật:</div>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                        <li>• Trái cây tươi mới, độ ngọt và độ chín chuẩn cam kết</li>
                        <li>• Đóng gói khay/hộp sạch sẽ, giao nhanh không dập nát</li>
                        <li>• Giá Flash Sale tiết kiệm hơn thị trường 15-25%</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800 border border-amber-200 dark:border-slate-700">
                      <div className="font-bold text-amber-600 mb-1">! Lưu ý khi đặt mua:</div>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                        <li>• Nên bảo quản ngăn mát 4-8°C ngay sau khi nhận hàng</li>
                        <li>• Chọn đúng biến thể độ chín (Ăn ngay hoặc Già 85% để biếu)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Form viết đánh giá mới */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="text-xs font-bold">Viết đánh giá của bạn cho trái cây này:</div>
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={newReviewForm.rating}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: Number(e.target.value) })}
                    className="px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 sao - Tuyệt vời)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 sao - Tốt)</option>
                    <option value={3}>⭐⭐⭐ (3 sao - Bình thường)</option>
                  </select>
                  <input
                    type="text"
                    value={newReviewForm.comment}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                    placeholder="Chia sẻ cảm nhận về độ tươi, vị ngọt, đóng gói..."
                    className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddReview}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </div>

              {/* Danh sách đánh giá */}
              <div className="space-y-3">
                {productReviews.map((rv) => (
                  <div key={rv.id} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{rv.userName}</span>
                      <span className="text-slate-400">{rv.date} • Phân loại: {rv.variantLabel}</span>
                    </div>
                    <div className="text-amber-500 text-xs">{'★'.repeat(rv.rating)}</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{rv.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 3. GIỎ HÀNG & THANH TOÁN (GHN API + VOUCHER + VNPAY/MOMO/VÍ)      */}
        {/* ----------------------------------------------------------------- */}
        {activeView === 'cart' && (
          <div className="space-y-6">
            {/* Thông báo khi đơn hàng bị chặn & Rollback do vượt quá tồn kho */}
            {stockCheckResult && stockCheckResult.type === 'rollback' && (
              <div className="p-4 rounded-2xl border border-rose-300 bg-rose-50 dark:bg-rose-950/60 dark:border-rose-800 text-rose-700 dark:text-rose-200 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{stockCheckResult.errorDetail}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStockCheckResult(null)}
                  className="text-xs underline shrink-0"
                >
                  Đóng
                </button>
              </div>
            )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-emerald-600" /> Giỏ Hàng Trái Cây Tươi
              </h2>

              {cartSummary.detailedItems.length === 0 ? (
                <div className="rounded-3xl p-8 border bg-white dark:bg-slate-900 text-center space-y-3">
                  <p className="text-slate-500">Giỏ hàng của bạn đang trống.</p>
                  <button
                    type="button"
                    onClick={() => setActiveView('home')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold"
                  >
                    Tiếp tục chọn trái cây
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartSummary.detailedItems.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className={`p-4 rounded-2xl border flex items-center gap-4 ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'
                      }`}
                    >
                      <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0">
                        <FruitArtwork type={item.product.artType} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.product.name}</h4>
                        <p className="text-xs text-slate-500">
                          Quy cách: {item.variant.label} ({item.variant.ripeness}) • {item.lineWeightGram}g
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm font-extrabold text-emerald-600">
                            {formatVND(item.unitPrice)}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              item.quantity > item.variant.stock
                                ? 'bg-rose-100 text-rose-700 border border-rose-300'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            Kho còn: {item.variant.stock}
                          </span>
                          {item.quantity > item.variant.stock && (
                            <span className="text-[11px] font-bold text-rose-600">
                              ⚠️ Vượt quá tồn kho ({item.quantity} &gt; {item.variant.stock})!
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setCart((prev) =>
                                prev
                                  .map((c) =>
                                    c.productId === item.productId && c.variantId === item.variantId
                                      ? { ...c, quantity: c.quantity - 1 }
                                      : c
                                  )
                                  .filter((c) => c.quantity > 0)
                              )
                            }
                            className="p-1.5 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = Math.max(1, parseInt(e.target.value, 10) || 1);
                              setCart((prev) =>
                                prev.map((c) =>
                                  c.productId === item.productId && c.variantId === item.variantId
                                    ? { ...c, quantity: val }
                                    : c
                                )
                              );
                            }}
                            className="w-14 text-center text-xs font-bold py-1 rounded-lg border bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setCart((prev) =>
                                prev.map((c) =>
                                  c.productId === item.productId && c.variantId === item.variantId
                                    ? { ...c, quantity: c.quantity + 1 }
                                    : c
                                )
                              )
                            }
                            className="p-1.5 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Địa chỉ nhận hàng tính phí Giao Hàng Nhanh (như phút 08:10 trong video) */}
              <div className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" /> Địa Chỉ Giao Hàng & Tự Động Tính Phí GHN
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                  >
                    <option value="Hà Nội">TP. Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">TP. Đà Nẵng</option>
                  </select>
                  <input
                    type="text"
                    value={shippingAddress.district}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, district: e.target.value })}
                    placeholder="Quận / Huyện"
                    className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <input
                    type="text"
                    value={shippingAddress.ward}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, ward: e.target.value })}
                    placeholder="Phường / Xã"
                    className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                </div>
                <input
                  type="text"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  placeholder="Số nhà, tên đường..."
                  className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                />
                <div className="text-xs text-emerald-600 font-medium">
                  📦 Tổng trọng lượng đóng gói: <strong>{cartSummary.totalWeightGram}g</strong> → Phí Giao Hàng Nhanh (GHN): <strong>{formatVND(cartSummary.shippingFee)}</strong>
                </div>
              </div>
            </div>

            {/* Cột Voucher & Thanh toán */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`p-5 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-emerald-600" /> Ưu Đãi Đơn Hàng (Tối đa 1 Mã Giảm Giá + 1 Mã Vận Chuyển)
                  </h3>
                </div>

                {voucherWarning && (
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 text-amber-800 dark:text-amber-200 text-[11px] flex items-center justify-between gap-2">
                    <span>⚠️ {voucherWarning}</span>
                    <button type="button" onClick={() => setVoucherWarning(null)} className="underline shrink-0">Đóng</button>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">1. Mã giảm giá trái cây (Chọn tối đa 1):</div>
                  {vouchers.filter((vc) => vc.code !== 'FREESHIPGHN').map((vc) => (
                    <button
                      key={vc.id}
                      type="button"
                      onClick={() => setSelectedVoucherCode(selectedVoucherCode === vc.code ? '' : vc.code)}
                      className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                        selectedVoucherCode === vc.code
                          ? 'border-emerald-600 bg-emerald-500/10'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-emerald-600">{vc.code} — {vc.title}</div>
                        <div className="text-[11px] text-slate-500">{vc.description} (Đơn từ {formatVND(vc.minOrder)})</div>
                      </div>
                      <span className="text-xs font-bold shrink-0">
                        {selectedVoucherCode === vc.code ? '✓ Đang dùng' : 'Áp dụng'}
                      </span>
                    </button>
                  ))}

                  <div className="text-[11px] font-bold text-slate-500 uppercase pt-1">2. Mã hỗ trợ vận chuyển (Chọn tối đa 1):</div>
                  {vouchers.filter((vc) => vc.code === 'FREESHIPGHN').map((vc) => (
                    <button
                      key={vc.id}
                      type="button"
                      onClick={() => setSelectedShippingVoucherCode(selectedShippingVoucherCode === vc.code ? '' : vc.code)}
                      className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                        selectedShippingVoucherCode === vc.code
                          ? 'border-teal-600 bg-teal-500/10'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-teal-600">{vc.code} — {vc.title}</div>
                        <div className="text-[11px] text-slate-500">{vc.description} (Đơn từ {formatVND(vc.minOrder)})</div>
                      </div>
                      <span className="text-xs font-bold shrink-0">
                        {selectedShippingVoucherCode === vc.code ? '✓ Đang dùng' : 'Áp dụng'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Phương thức thanh toán */}
                <div className="space-y-2 pt-2">
                  <div className="font-bold text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" /> Phương Thức Thanh Toán
                  </div>
                  {[
                    { id: 'vnpay', label: 'Cổng thanh toán VNPay (Thẻ ATM / QR Sandbox)' },
                    { id: 'momo', label: 'Ví điện tử MoMo' },
                    { id: 'wallet', label: `Ví nội bộ FreshMart (Số dư: ${formatVND(buyerWallet)})` },
                    { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)' }
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between ${
                        paymentMethod === pm.id
                          ? 'border-emerald-600 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{pm.label}</span>
                      {paymentMethod === pm.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>

                {/* Tổng kết tiền */}
                <div className="pt-3 border-t space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span>Tạm tính ({cartSummary.detailedItems.length} món):</span>
                    <span className="font-semibold">{formatVND(cartSummary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển GHN ({cartSummary.totalWeightGram}g):</span>
                    <span className="font-semibold">{formatVND(cartSummary.shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Mã giảm giá hàng ({selectedVoucherCode || 'Không dùng'}):</span>
                    <span className="font-bold">-{formatVND(cartSummary.discountAmount)}</span>
                  </div>
                  <div className="flex justify-between text-teal-600">
                    <span>Mã giảm phí vận chuyển ({selectedShippingVoucherCode || 'Không dùng'}):</span>
                    <span className="font-bold">-{formatVND(cartSummary.shippingDiscountAmount)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>RequestKey (Chống trùng đơn):</span>
                    <span className="font-mono font-semibold text-slate-500">{cartRequestKey}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold pt-2 border-t">
                    <span>Tổng thanh toán (Server tính):</span>
                    <span className="text-rose-600">{formatVND(cartSummary.finalTotal)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProceedCheckout}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg"
                >
                  Tiến Hành Thanh Toán ({formatVND(cartSummary.finalTotal)})
                </button>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 4. QUẢN LÝ ĐƠN HÀNG (HỦY ĐƠN HOÀN TIỀN VÀO VÍ, TRẢ HÀNG, ĐÁNH GIÁ)*/}
        {/* ----------------------------------------------------------------- */}
        {activeView === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-extrabold flex items-center gap-2">
                  <Package className="w-6 h-6 text-emerald-600" /> Đơn Hàng Của Bạn ({orders.length})
                </h2>
                <span className="text-xs text-slate-500">
                  Đơn thanh toán Online bỏ dở sẽ giữ chỗ 30 phút (trừ kho, Voucher ở trạng thái Reserved). Hủy hoặc quá 30 phút sẽ tự động cộng lại kho & nhả Voucher về Released!
                </span>
              </div>
              <button
                type="button"
                onClick={handleSweepExpiredOrders}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4" /> Quét & Thu Hồi Đơn Giữ Chỗ Quá Hạn 30 Phút
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="p-8 rounded-3xl border text-center space-y-3 bg-white dark:bg-slate-900 border-emerald-100 dark:border-slate-800">
                <p className="text-slate-500 text-sm">Bạn chưa có đơn hàng nào.</p>
                <button
                  type="button"
                  onClick={() => setActiveView('home')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Khám phá trái cây ngay
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className={`p-5 rounded-3xl border space-y-3 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
                  }`}
                >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-sm">#{order.id}</span>
                    <span className="text-slate-400">• {order.createdAt}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                      {order.paymentMethod}
                    </span>
                    {order.requestKey && (
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-mono text-[10px]">
                        Key: {order.requestKey}
                      </span>
                    )}
                    {order.voucherStatus && order.voucherStatus !== 'None' && (
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        order.voucherStatus === 'Reserved'
                          ? 'bg-amber-100 text-amber-800'
                          : order.voucherStatus === 'Released'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Voucher: {order.voucherStatus}
                      </span>
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600">
                    Trạng thái: {order.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg overflow-hidden">
                          <FruitArtwork type={it.artType || 'durian'} />
                        </div>
                        <div>
                          <div className="font-bold">{it.name}</div>
                          <div className="text-slate-400">Phân loại: {it.variantLabel} × {it.quantity}</div>
                        </div>
                      </div>
                      <div className="font-bold">{formatVND(it.price * it.quantity)}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Giao tới: {order.address} • Tổng thanh toán: <strong className="text-rose-600 text-sm">{formatVND(order.totalAmount)}</strong>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {(order.status === 'Đã thanh toán' || order.status === 'Chờ xác nhận') && (
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(order)}
                        className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold"
                      >
                        Hủy đơn & Hoàn tiền về Ví
                      </button>
                    )}

                    {order.status === 'Đã giao hàng' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleConfirmReceived(order)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                        >
                          Đã nhận hàng (Hài lòng)
                        </button>
                        <button
                          type="button"
                          onClick={() => setReturnModalOrder(order)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-900 text-xs font-bold"
                        >
                          Yêu cầu Trả hàng / Hoàn tiền
                        </button>
                      </>
                    )}

                    {order.status === 'Hoàn thành' && (
                      <button
                        type="button"
                        onClick={() => {
                          const p = products.find((item) => item.id === order.items[0]?.productId) || products[0];
                          openProductDetail(p);
                        }}
                        className="px-3 py-1.5 rounded-xl border border-emerald-600 text-emerald-600 text-xs font-bold"
                      >
                        Đánh giá sản phẩm
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )))
          }
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 5. VÍ NỘI BỘ & YÊU CẦU RÚT TIỀN (Như phút 09:40 trong video)       */}
        {/* ----------------------------------------------------------------- */}
        {activeView === 'wallet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg space-y-2">
                <div className="text-xs uppercase tracking-wider opacity-80">Số dư Ví FreshMart của bạn</div>
                <div className="text-3xl font-extrabold">{formatVND(buyerWallet)}</div>
                <p className="text-xs text-emerald-100">
                  Tiền hoàn từ đơn hàng hủy/lỗi và hoa hồng Affiliate 15% được cộng trực tiếp vào đây.
                </p>
              </div>

              <div className={`p-5 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                <h3 className="font-bold text-sm">Tạo Yêu Cầu Rút Tiền Về Ngân Hàng</h3>
                <select
                  value={withdrawForm.bankName}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, bankName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                >
                  <option value="VCB - Vietcombank">VCB - Vietcombank</option>
                  <option value="MB Bank">MB Bank - Ngân hàng Quân Đội</option>
                  <option value="Techcombank">Techcombank</option>
                  <option value="BIDV">BIDV</option>
                </select>
                <input
                  type="text"
                  value={withdrawForm.accountNumber}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value })}
                  placeholder="Số tài khoản ngân hàng"
                  className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                />
                <input
                  type="text"
                  value={withdrawForm.accountHolder}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, accountHolder: e.target.value })}
                  placeholder="Tên chủ thẻ (Ví dụ: LUON TRAN)"
                  className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                />
                <input
                  type="number"
                  value={withdrawForm.amount}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                  placeholder="Số tiền cần rút (tối thiểu 10.000đ)"
                  className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                />
                <button
                  type="button"
                  onClick={handleCreateWithdraw}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Tạo Yêu Cầu Rút Tiền
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className={`p-5 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                <h3 className="font-bold text-sm">Lịch Sử Biến Động Số Dư Ví</h3>
                <div className="space-y-2">
                  {walletHistory.map((wh) => (
                    <div key={wh.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold">{wh.type}</div>
                        <div className="text-slate-400">{wh.date} • {wh.status}</div>
                      </div>
                      <span className={`font-extrabold ${wh.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {wh.amount >= 0 ? `+${formatVND(wh.amount)}` : formatVND(wh.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 6. SẢN PHẨM YÊU THÍCH & AFFILIATE 15% & CHAT NHÀ VƯỜN             */}
        {/* ----------------------------------------------------------------- */}
        {activeView === 'favorites' && (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> Trái Cây Yêu Thích ({favoriteIds.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products
                .filter((p) => favoriteIds.includes(p.id))
                .map((p) => (
                  <div key={p.id} className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                    <div className="h-36 rounded-xl overflow-hidden">
                      <FruitArtwork type={p.artType} />
                    </div>
                    <h4 className="font-bold text-sm">{p.name}</h4>
                    <div className="text-emerald-600 font-extrabold text-sm">
                      {formatVND(p.isFlashSale ? p.flashSalePrice : p.price)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openProductDetail(p)}
                        className="flex-1 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                      >
                        Xem chi tiết
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(p.id)}
                        className="p-1.5 rounded-xl border text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeView === 'affiliate' && (
          <div className={`p-6 rounded-3xl border space-y-5 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  Tiếp thị liên kết — Nhận 15% Hoa hồng
                </span>
                <h2 className="text-2xl font-extrabold mt-2">Kiếm Tiền Cùng Sàn Trái Cây FreshMart</h2>
                <p className="text-sm text-slate-500">
                  Chia sẻ đường link giới thiệu sản phẩm trái cây cho bạn bè. Khi phát sinh đơn hàng thành công, bạn nhận ngay 15% giá trị đơn vào Ví!
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-right">
                <div className="text-xs text-slate-500">Hoa hồng đã nhận ({affiliateClicks} lượt click)</div>
                <div className="text-2xl font-extrabold text-emerald-600">{formatVND(affiliateCommission)}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 flex flex-wrap items-center justify-between gap-3">
              <code className="text-xs font-mono text-emerald-600 break-all">
                https://freshmart.vn/?ref=khachhang_demo_15pct
              </code>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCopiedAffiliate(true);
                    showNotice('Đã sao chép đường link Affiliate 15%!');
                    setTimeout(() => setCopiedAffiliate(false), 2000);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                >
                  {copiedAffiliate ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedAffiliate ? 'Đã sao chép' : 'Copy Link Giới Thiệu'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const bonus = 75000;
                    setAffiliateClicks((c) => c + 1);
                    setAffiliateCommission((prev) => prev + bonus);
                    setBuyerWallet((prev) => prev + bonus);
                    setWalletHistory((prev) => [
                      {
                        id: `wh-${Date.now()}`,
                        type: 'Hoa hồng Affiliate 15% (Đơn hàng qua link chia sẻ)',
                        amount: +bonus,
                        date: '23/10/2026 09:28',
                        status: 'Thành công'
                      },
                      ...prev
                    ]);
                    showNotice(`Mô phỏng thành công: Bạn vừa nhận +${formatVND(bonus)} hoa hồng Affiliate (15%) vào Ví!`);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-900 text-xs font-bold"
                >
                  Mô phỏng Khách mua qua Link (+75.000đ)
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'chat' && (
          <div className={`rounded-3xl border overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[440px] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'}`}>
            <div className="md:col-span-4 border-r border-slate-100 dark:border-slate-800 p-4 space-y-2">
              <h3 className="font-bold text-sm mb-3">Hộp Thư Chat Với Nhà Vườn</h3>
              {shops.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveChatShopId(s.id)}
                  className={`w-full p-3 rounded-xl text-left transition ${
                    activeChatShopId === s.id
                      ? 'bg-emerald-600 text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-xs">{s.name}</div>
                  <div className="text-[11px] opacity-80 truncate">
                    {(chats[s.id] || []).slice(-1)[0]?.text || 'Bắt đầu trò chuyện...'}
                  </div>
                </button>
              ))}
            </div>
            <div className="md:col-span-8 flex flex-col justify-between p-4">
              <div className="space-y-3 overflow-y-auto max-h-80 pr-2">
                {(chats[activeChatShopId] || []).map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md px-3.5 py-2.5 rounded-2xl text-xs ${
                        m.sender === 'buyer'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      <div>{m.text}</div>
                      <div className="text-[10px] opacity-70 mt-1 text-right">{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendShopMessage()}
                  placeholder="Nhập tin nhắn hỏi Nhà vườn về độ tươi, sỉ/lẻ..."
                  className="flex-1 px-3.5 py-2 rounded-xl text-xs border bg-transparent"
                />
                <button
                  type="button"
                  onClick={handleSendShopMessage}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> Gửi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 7. BẢNG ĐIỀU KHIỂN NHÀ VƯỜN (SELLER CENTER - QUẢN LÝ BÁN HÀNG)    */}
        {/* ----------------------------------------------------------------- */}
        {activeView === 'seller-dashboard' && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-gradient-to-r from-teal-700 to-emerald-700 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-amber-300">Kênh Người Bán / Nhà Vườn</span>
                <h2 className="text-2xl font-extrabold">
                  {shops.find((s) => s.id === activeSellerShopId)?.name}
                </h2>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={activeSellerShopId}
                  onChange={(e) => setActiveSellerShopId(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white/15 text-white text-xs font-bold border border-white/25"
                >
                  {shops.map((s) => (
                    <option key={s.id} value={s.id} className="text-slate-900">
                      Đang quản lý: {s.name}
                    </option>
                  ))}
                </select>
                <div className="px-4 py-2 rounded-xl bg-white/15 text-xs">
                  Số dư Ví Nhà vườn: <strong className="text-amber-300 text-sm">{formatVND(shops.find((s) => s.id === activeSellerShopId)?.walletBalance)}</strong>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/15 text-xs">
                  Tổng doanh thu: <strong className="text-white text-sm">{formatVND(shops.find((s) => s.id === activeSellerShopId)?.totalRevenue)}</strong>
                </div>
              </div>
            </div>

            {/* Tabs Seller */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'products', label: '🍎 Quản lý Trái cây & Flash Sale' },
                { id: 'returns', label: '↩️ Duyệt Hoàn trả hàng' },
                { id: 'vouchers', label: '🎟️ Mã giảm giá của Shop' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSellerTab(t.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${
                    sellerTab === t.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {sellerTab === 'products' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form thêm sản phẩm trái cây mới */}
                <div className={`lg:col-span-5 p-5 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                  <h3 className="font-bold text-sm">Đăng Bán Trái Cây Mới (Tích hợp tính phí GHN)</h3>
                  <input
                    type="text"
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    placeholder="Tên trái cây (VD: Măng Cụt Lái Thiêu Loại 1)"
                    className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newProductForm.categoryId}
                      onChange={(e) => setNewProductForm({ ...newProductForm, categoryId: e.target.value })}
                      className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                    >
                      {categories.filter((c) => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <select
                      value={newProductForm.artType}
                      onChange={(e) => setNewProductForm({ ...newProductForm, artType: e.target.value })}
                      className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                    >
                      <option value="strawberry">Ảnh: Dâu tây</option>
                      <option value="durian">Ảnh: Sầu riêng</option>
                      <option value="grape">Ảnh: Nho Mẫu Đơn</option>
                      <option value="mango">Ảnh: Xoài Cát</option>
                      <option value="cherry">Ảnh: Cherry Mỹ</option>
                      <option value="avocado">Ảnh: Bơ 034</option>
                      <option value="apple">Ảnh: Táo Envy</option>
                      <option value="giftbox">Ảnh: Giỏ quà</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={newProductForm.price}
                      onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                      placeholder="Giá khuyến mãi (VNĐ)"
                      className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                    />
                    <input
                      type="number"
                      value={newProductForm.originalPrice}
                      onChange={(e) => setNewProductForm({ ...newProductForm, originalPrice: e.target.value })}
                      placeholder="Giá gốc (VNĐ)"
                      className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newProductForm.variantLabel}
                      onChange={(e) => setNewProductForm({ ...newProductForm, variantLabel: e.target.value })}
                      placeholder="Biến thể (VD: Hộp 1kg)"
                      className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                    />
                    <input
                      type="number"
                      value={newProductForm.weightGram}
                      onChange={(e) => setNewProductForm({ ...newProductForm, weightGram: e.target.value })}
                      placeholder="Khối lượng (gram) tính GHN"
                      className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                    />
                  </div>
                  <textarea
                    value={newProductForm.shortDesc}
                    onChange={(e) => setNewProductForm({ ...newProductForm, shortDesc: e.target.value })}
                    rows={2}
                    placeholder="Mô tả ngắn gọn..."
                    className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleSellerCreateProduct}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    + Tạo Sản Phẩm Lên Sàn
                  </button>
                </div>

                {/* Danh sách sản phẩm của shop */}
                <div className="lg:col-span-7 space-y-3">
                  {products
                    .filter((p) => p.shopId === activeSellerShopId)
                    .map((p) => (
                      <div key={p.id} className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-12 rounded-xl overflow-hidden">
                            <FruitArtwork type={p.artType} />
                          </div>
                          <div>
                            <div className="font-bold text-sm">{p.name}</div>
                            <div className="text-xs text-slate-500">
                              Giá: {formatVND(p.price)} • Kho: {p.stock} • Khối lượng GHN: {p.weightGram}g
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setProducts((prev) =>
                                prev.map((item) =>
                                  item.id === p.id ? { ...item, isFlashSale: !item.isFlashSale } : item
                                )
                              );
                              showNotice(`Đã ${p.isFlashSale ? 'tắt' : 'bật'} Flash Sale cho "${p.name}"`);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                              p.isFlashSale ? 'bg-rose-600 text-white' : 'border border-slate-300 text-slate-600'
                            }`}
                          >
                            {p.isFlashSale ? '⚡ Đang Flash Sale' : 'Bật Flash Sale'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setProducts((prev) => prev.filter((item) => item.id !== p.id));
                              showNotice('Đã xóa sản phẩm khỏi gian hàng');
                            }}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {sellerTab === 'returns' && (
              <div className={`p-5 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                <h3 className="font-bold text-sm">Danh Sách Yêu Cầu Hoàn Trả Hàng Từ Người Mua</h3>
                {orders.filter((o) => o.status === 'Yêu cầu hoàn trả' || o.status === 'Đã hoàn tiền').length === 0 ? (
                  <p className="text-xs text-slate-500">Hiện chưa có đơn hàng nào yêu cầu hoàn trả.</p>
                ) : (
                  orders
                    .filter((o) => o.status === 'Yêu cầu hoàn trả' || o.status === 'Đã hoàn tiền')
                    .map((o) => (
                      <div key={o.id} className="p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs space-y-1">
                          <div className="font-bold text-sm">Đơn #{o.id} — {formatVND(o.totalAmount)}</div>
                          <div className="text-rose-600 font-semibold">Lý do: {o.returnReason}</div>
                          <div className="text-slate-500">Mô tả: {o.returnDetail}</div>
                        </div>
                        {o.status === 'Yêu cầu hoàn trả' ? (
                          <button
                            type="button"
                            onClick={() => handleApproveReturn(o)}
                            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                          >
                            Chấp nhận & Hoàn tiền về Ví người mua
                          </button>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                            ✓ Đã hoàn tiền về Ví
                          </span>
                        )}
                      </div>
                    ))
                )}
              </div>
            )}

            {sellerTab === 'vouchers' && (
              <div className={`p-5 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                <h3 className="font-bold text-sm">Tạo Mã Giảm Giá Riêng Của Gian Hàng</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newShopVoucherForm.code}
                    onChange={(e) => setNewShopVoucherForm({ ...newShopVoucherForm, code: e.target.value.toUpperCase() })}
                    placeholder="Mã (VD: VUONXANH40K)"
                    className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <input
                    type="text"
                    value={newShopVoucherForm.title}
                    onChange={(e) => setNewShopVoucherForm({ ...newShopVoucherForm, title: e.target.value })}
                    placeholder="Tên chương trình"
                    className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <input
                    type="number"
                    value={newShopVoucherForm.discountValue}
                    onChange={(e) => setNewShopVoucherForm({ ...newShopVoucherForm, discountValue: e.target.value })}
                    placeholder="Số tiền giảm (VNĐ)"
                    className="px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newShopVoucherForm.code.trim()) return;
                      setVouchers((prev) => [
                        ...prev,
                        {
                          id: `vc-${Date.now()}`,
                          code: newShopVoucherForm.code,
                          title: newShopVoucherForm.title || `Giảm ${formatVND(newShopVoucherForm.discountValue)}`,
                          scope: 'shop',
                          shopId: activeSellerShopId,
                          discountType: 'fixed',
                          discountValue: Number(newShopVoucherForm.discountValue) || 25000,
                          minOrder: Number(newShopVoucherForm.minOrder) || 150000,
                          description: 'Mã giảm giá riêng của Nhà vườn'
                        }
                      ]);
                      setNewShopVoucherForm({ code: '', title: '', discountValue: '25000', minOrder: '150000' });
                      showNotice('Đã tạo mã giảm giá của Shop thành công!');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    + Tạo Voucher Shop
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* 8. QUẢN TRỊ VIÊN (ADMIN PORTAL - BANNER, ĐƠN HÀNG, VÍ, SHOP, USER)*/}
        {/* ----------------------------------------------------------------- */}
        {activeView === 'admin-dashboard' && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400">System Administrator</span>
                <h2 className="text-2xl font-extrabold">Trung Tâm Quản Trị Sàn Trái Cây FreshMart</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'orders', label: '📦 Quản lý Đơn hàng' },
                  { id: 'banners', label: '🖼️ Quản lý Banner' },
                  { id: 'shops', label: '🏪 Duyệt Nhà vườn & Khiếu nại' },
                  { id: 'wallets', label: '💳 Quản lý Ví & Rút tiền' },
                  { id: 'categories', label: '📂 Danh mục' },
                  { id: 'users', label: '👥 Người dùng' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAdminTab(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      adminTab === tab.id ? 'bg-amber-400 text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin: Quản lý Đơn hàng (Chuyển trạng thái nhanh để đi bảo vệ đồ án như phút 12:10) */}
            {adminTab === 'orders' && (
              <div className={`p-5 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                <h3 className="font-bold text-sm">
                  Cập Nhật Trạng Thái Đơn Hàng Nhanh (Hỗ trợ Demo Bảo vệ Đồ án không cần chờ GHN)
                </h3>
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div key={o.id} className="p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-sm">
                          #{o.id} — {o.buyerName} — <span className="text-emerald-600">{formatVND(o.totalAmount)}</span>
                        </div>
                        <div className="text-slate-500">
                          Hiện tại: <strong>{o.status}</strong> • Địa chỉ: {o.address}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {['Đã thanh toán', 'Đang vận chuyển', 'Đã giao hàng', 'Hoàn thành'].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleAdminUpdateOrderStatus(o.id, st)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold ${
                              o.status === st
                                ? 'bg-emerald-600 text-white'
                                : 'border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin: Quản lý Banner Trang chủ (như phút 01:10 trong video) */}
            {adminTab === 'banners' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className={`lg:col-span-5 p-5 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                  <h3 className="font-bold text-sm">Thêm / Cập Nhật Banner Trang Chủ</h3>
                  <input
                    type="text"
                    value={bannerForm.badge}
                    onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                    placeholder="Nhãn sự kiện (VD: TUẦN LỄ TRÁI CÂY 2)"
                    className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <input
                    type="text"
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                    placeholder="Tiêu đề chính"
                    className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <input
                    type="text"
                    value={bannerForm.ctaText}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                    placeholder="Tên nút Button (VD: Xem Ưu Đãi 2)"
                    className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <select
                    value={bannerForm.gradient}
                    onChange={(e) => setBannerForm({ ...bannerForm, gradient: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs border bg-transparent"
                  >
                    <option value="from-emerald-600 via-teal-600 to-cyan-700">Màu nền: Xanh Nông Sản</option>
                    <option value="from-rose-600 via-orange-500 to-amber-500">Màu nền: Đỏ Cam Nhiệt Đới</option>
                    <option value="from-purple-600 via-indigo-600 to-blue-700">Màu nền: Tím Nho Mẫu Đơn</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAdminAddBanner}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    + Lưu & Hiển Thị Banner Mới
                  </button>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  {banners.map((b) => (
                    <div key={b.id} className={`p-4 rounded-2xl bg-gradient-to-r ${b.gradient} text-white flex items-center justify-between`}>
                      <div>
                        <div className="text-[10px] font-bold uppercase opacity-80">{b.badge}</div>
                        <div className="font-extrabold text-base">{b.title}</div>
                        <div className="text-xs opacity-90">Nút: {b.ctaText} • {b.period}</div>
                      </div>
                      {banners.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setBanners((prev) => prev.filter((item) => item.id !== b.id))}
                          className="p-2 rounded-xl bg-black/20 hover:bg-black/40 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin: Duyệt Nhà vườn & Khiếu nại (như phút 16:15 trong video) */}
            {adminTab === 'shops' && (
              <div className="space-y-4">
                <div className={`p-5 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                  <h3 className="font-bold text-sm">Danh Sách Gian Hàng Nhà Vườn (Duyệt Mở Shop / Khóa Vi Phạm)</h3>
                  {shops.map((s) => (
                    <div key={s.id} className="p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs space-y-0.5">
                        <div className="font-bold text-sm">{s.name}</div>
                        <div className="text-slate-500">{s.address} • SĐT: {s.phone}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600">
                          {s.status === 'approved' ? 'Đang hoạt động' : s.status === 'pending' ? 'Chờ duyệt mới' : 'Đã khóa'}
                        </span>
                        {s.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => {
                              setShops((prev) =>
                                prev.map((item) => (item.id === s.id ? { ...item, status: 'approved' } : item))
                              );
                              showNotice(`Đã duyệt gian hàng "${s.name}" thành công!`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                          >
                            ✓ Duyệt Gian Hàng
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            const next = s.status === 'locked' ? 'approved' : 'locked';
                            setShops((prev) =>
                              prev.map((item) => (item.id === s.id ? { ...item, status: next } : item))
                            );
                            showNotice(next === 'locked' ? `Đã khóa gian hàng ${s.name}` : `Đã mở khóa ${s.name}`);
                          }}
                          className="px-3 py-1.5 rounded-xl border border-rose-500 text-rose-500 text-xs font-bold"
                        >
                          {s.status === 'locked' ? 'Mở khóa Shop' : 'Khóa Shop'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin: Quản lý Ví & Yêu cầu Rút tiền (như phút 10:10 trong video) */}
            {adminTab === 'wallets' && (
              <div className={`p-5 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                <h3 className="font-bold text-sm">Quản Lý Yêu Cầu Rút Tiền Từ Ví Người Dùng & Nhà Vườn</h3>
                {withdrawRequests.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs space-y-1">
                      <div className="font-bold text-sm">
                        #{r.id} — {r.requesterName} ({r.role}) — <span className="text-rose-600">{formatVND(r.amount)}</span>
                      </div>
                      <div className="text-slate-500">
                        Ngân hàng: {r.bankName} • STK: {r.accountNumber} • Chủ thẻ: {r.accountHolder}
                      </div>
                    </div>
                    {r.status === 'Chờ duyệt' ? (
                      <button
                        type="button"
                        onClick={() => handleAdminConfirmWithdraw(r.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                      >
                        Xác nhận đã hoàn tiền / chuyển khoản
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        ✓ Đã thanh toán
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Admin: Quản lý Danh mục */}
            {adminTab === 'categories' && (
              <div className={`p-5 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                <h3 className="font-bold text-sm">Thêm Danh Mục Trái Cây Mới</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryIcon}
                    onChange={(e) => setNewCategoryIcon(e.target.value)}
                    className="w-16 px-3 py-2 rounded-xl text-center border bg-transparent"
                  />
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Tên danh mục (VD: Trái cây Sấy dẻo)"
                    className="flex-1 px-3 py-2 rounded-xl text-xs border bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newCategoryName.trim()) return;
                      setCategories((prev) => [
                        ...prev,
                        { id: `cat-${Date.now()}`, name: newCategoryName, icon: newCategoryIcon || '🍊', count: 0 }
                      ]);
                      setNewCategoryName('');
                      showNotice('Đã thêm danh mục mới lên Trang chủ!');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    + Thêm Danh Mục
                  </button>
                </div>
              </div>
            )}

            {/* Admin: Quản lý Người dùng (Khóa/Mở khóa & Đặt lại mật khẩu như phút 21:25) */}
            {adminTab === 'users' && (
              <div className={`p-5 rounded-3xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'}`}>
                <h3 className="font-bold text-sm">Quản Lý Tài Khoản Người Dùng</h3>
                {users.map((u) => (
                  <div key={u.id} className="p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-sm">{u.name} ({u.role})</div>
                      <div className="text-slate-500">{u.email} • Số đơn đã đặt: {u.ordersCount}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => showNotice(`Đã gửi mật khẩu mới mặc định (123456) tới ${u.email}`)}
                        className="px-3 py-1.5 rounded-xl border text-xs font-semibold"
                      >
                        Đặt lại mật khẩu
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUsers((prev) =>
                            prev.map((item) =>
                              item.id === u.id
                                ? { ...item, status: item.status === 'active' ? 'locked' : 'active' }
                                : item
                            )
                          );
                          showNotice(`Đã cập nhật trạng thái tài khoản ${u.email}`);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          u.status === 'active' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {u.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ===================================================================== */}
      {/* FLOATING WIDGET: CHATBOT AI TƯ VẤN TRÁI CÂY THÔNG MINH                */}
      {/* ===================================================================== */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isAiChatOpen ? (
          <button
            type="button"
            onClick={() => setIsAiChatOpen(true)}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 ring-4 ring-emerald-500/30 hover:scale-105 transition"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Chatbot AI Tư Vấn Trái Cây</span>
          </button>
        ) : (
          <div className={`w-80 sm:w-96 rounded-3xl shadow-2xl border overflow-hidden flex flex-col ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-emerald-200'}`}>
            <div className="p-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <div>
                  <div className="font-bold text-xs">FreshMart AI Assistant</div>
                  <div className="text-[10px] text-emerald-100">Tư vấn dinh dưỡng, mùa vụ & giỏ quà</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAiChatOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Gợi ý câu hỏi nhanh */}
            <div className="px-3 py-2 bg-emerald-50/70 dark:bg-slate-800/70 flex gap-1.5 overflow-x-auto text-[11px]">
              {[
                'Trái cây giảm cân Eat Clean?',
                'Tư vấn giỏ quà biếu?',
                'Sầu riêng Flash Sale?',
                'Mã giảm giá hôm nay?'
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendAiPrompt(q)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-300 font-semibold shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Nội dung hội thoại AI */}
            <div className="p-3.5 space-y-3 max-h-80 overflow-y-auto text-xs">
              {aiMessages.map((msg) => (
                <div key={msg.id} className={`space-y-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block px-3.5 py-2.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.suggestedProductIds && msg.suggestedProductIds.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {msg.suggestedProductIds.map((pid) => {
                        const prd = products.find((p) => p.id === pid);
                        if (!prd) return null;
                        return (
                          <div
                            key={pid}
                            className="p-2 rounded-xl border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-9 h-8 rounded overflow-hidden shrink-0">
                                <FruitArtwork type={prd.artType} />
                              </div>
                              <div className="truncate">
                                <div className="font-bold text-[11px] truncate">{prd.name}</div>
                                <div className="text-[10px] text-emerald-600 font-bold">
                                  {formatVND(prd.isFlashSale ? prd.flashSalePrice : prd.price)}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => addToCart(prd, prd.variants[0], 1, false)}
                              className="px-2 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold shrink-0"
                            >
                              + Giỏ
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiPrompt()}
                placeholder="Hỏi AI về trái cây, calo, quà biếu..."
                className="flex-1 px-3 py-2 rounded-xl text-xs border bg-transparent"
              />
              <button
                type="button"
                onClick={() => handleSendAiPrompt()}
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* MODAL CỔNG THANH TOÁN VNPAY SANDBOX (Thẻ NCB + OTP 123456 như video)  */}
      {/* ===================================================================== */}
      {showVnpayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 space-y-4 border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {paymentMethod === 'vnpay' ? 'VNPAY SANDBOX GATEWAY' : 'MOMO TEST GATEWAY'}
                </span>
                <h3 className="font-extrabold text-base mt-1">
                  Thanh Toán Đơn Trái Cây ({formatVND(cartSummary.finalTotal)})
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAbandonVnpayModal}
                className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1"
                title="Đóng cổng thanh toán (Bỏ dở đơn giữ chỗ)"
              >
                <span>Bỏ dở / Đóng</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {vnpayStep === 1 ? (
              <div className="space-y-3 text-xs">
                <p className="text-slate-500">
                  Thông tin thẻ টেস্ট VNPay (Ngân hàng NCB) đã được điền sẵn giống trong video demo để bạn test nhanh:
                </p>
                <div>
                  <label className="font-semibold">Ngân hàng:</label>
                  <input
                    type="text"
                    value={vnpayForm.bank}
                    onChange={(e) => setVnpayForm({ ...vnpayForm, bank: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="font-semibold">Số thẻ ATM nội địa:</label>
                  <input
                    type="text"
                    value={vnpayForm.cardNumber}
                    onChange={(e) => setVnpayForm({ ...vnpayForm, cardNumber: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-transparent font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold">Tên chủ thẻ:</label>
                    <input
                      type="text"
                      value={vnpayForm.cardHolder}
                      onChange={(e) => setVnpayForm({ ...vnpayForm, cardHolder: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-xl border bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Ngày phát hành:</label>
                    <input
                      type="text"
                      value={vnpayForm.issueDate}
                      onChange={(e) => setVnpayForm({ ...vnpayForm, issueDate: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-xl border bg-transparent"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setVnpayStep(2)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Đồng ý & Tiếp tục sang bước OTP
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-slate-500">
                  Nhập mã OTP xác thực giao dịch (Mặc định môi trường test: <strong>123456</strong>):
                </p>
                <input
                  type="text"
                  value={vnpayForm.otp}
                  onChange={(e) => setVnpayForm({ ...vnpayForm, otp: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border text-center text-base font-extrabold tracking-widest bg-transparent"
                />
                <button
                  type="button"
                  onClick={() =>
                    finalizeOrder(paymentMethod === 'vnpay' ? 'VNPay Sandbox (NCB)' : 'Ví MoMo')
                  }
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Xác Nhận Thanh Toán ({formatVND(cartSummary.finalTotal)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL YÊU CẦU TRẢ HÀNG / HOÀN TIỀN (Như phút 13:05 trong video)      */}
      {/* ===================================================================== */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 space-y-4 border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base">
                Yêu Cầu Trả Hàng & Hoàn Tiền (#{returnModalOrder.id})
              </h3>
              <button type="button" onClick={() => setReturnModalOrder(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <label className="font-semibold block">Lý do hoàn trả:</label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border bg-transparent"
              >
                <option value="Trái cây bị dập/hư hỏng khi vận chuyển">Trái cây bị dập/hư hỏng khi vận chuyển</option>
                <option value="Sầu riêng bị sượng / Chưa đạt độ chín cam kết">Sầu riêng bị sượng / Chưa đạt độ chín cam kết</option>
                <option value="Giao thiếu trọng lượng / Sai quy cách hộp">Giao thiếu trọng lượng / Sai quy cách hộp</option>
              </select>
              <label className="font-semibold block">Mô tả chi tiết tình trạng:</label>
              <textarea
                rows={3}
                value={returnDetail}
                onChange={(e) => setReturnDetail(e.target.value)}
                placeholder="Mô tả tình trạng quả khi mở hộp..."
                className="w-full px-3 py-2 rounded-xl border bg-transparent"
              />
              <button
                type="button"
                onClick={handleSubmitReturn}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-900 font-bold"
              >
                Gửi Yêu Cầu Hoàn Trả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL ĐĂNG KÝ BÁN HÀNG (MỞ GIAN HÀNG NHÀ VƯỜN MỚI)                   */}
      {/* ===================================================================== */}
      {showRegisterShopModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 space-y-4 border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base">Đăng Ký Gian Hàng Nhà Vườn Mới</h3>
              <button type="button" onClick={() => setShowRegisterShopModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                value={registerShopForm.name}
                onChange={(e) => setRegisterShopForm({ ...registerShopForm, name: e.target.value })}
                placeholder="Tên gian hàng (VD: Vườn Cam Cao Phong Hòa Bình)"
                className="w-full px-3 py-2 rounded-xl border bg-transparent"
              />
              <input
                type="text"
                value={registerShopForm.phone}
                onChange={(e) => setRegisterShopForm({ ...registerShopForm, phone: e.target.value })}
                placeholder="Số điện thoại chủ vườn"
                className="w-full px-3 py-2 rounded-xl border bg-transparent"
              />
              <input
                type="text"
                value={registerShopForm.address}
                onChange={(e) => setRegisterShopForm({ ...registerShopForm, address: e.target.value })}
                placeholder="Địa chỉ kho lấy hàng tính phí GHN"
                className="w-full px-3 py-2 rounded-xl border bg-transparent"
              />
              <textarea
                rows={2}
                value={registerShopForm.description}
                onChange={(e) => setRegisterShopForm({ ...registerShopForm, description: e.target.value })}
                placeholder="Mô tả các loại trái cây chủ lực của vườn..."
                className="w-full px-3 py-2 rounded-xl border bg-transparent"
              />
              <button
                type="button"
                onClick={handleRegisterNewShop}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold"
              >
                Gửi Đăng Ký Gian Hàng (Chờ Admin Duyệt)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL BÁO CÁO GIAN HÀNG VI PHẠM                                       */}
      {/* ===================================================================== */}
      {reportModalShop && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 space-y-4 border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base">Báo Cáo Gian Hàng: {reportModalShop.name}</h3>
              <button type="button" onClick={() => setReportModalShop(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <textarea
                rows={3}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Nhập lý do báo cáo gian hàng (VD: Trái cây không đúng nguồn gốc VietGAP...)"
                className="w-full px-3 py-2 rounded-xl border bg-transparent"
              />
              <button
                type="button"
                onClick={() => {
                  setShopReports((prev) => [
                    {
                      id: `rp-${Date.now()}`,
                      shopId: reportModalShop.id,
                      reporter: 'Khách Hàng Demo',
                      reason: reportReason || 'Nghi ngờ sai nguồn gốc xuất xứ',
                      status: 'Chờ xử lý',
                      date: '23/10/2026'
                    },
                    ...prev
                  ]);
                  setReportModalShop(null);
                  setReportReason('');
                  showNotice('Đã gửi báo cáo gian hàng tới Admin!');
                }}
                className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-bold"
              >
                Gửi Báo Cáo Vi Phạm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL KIẾN TRÚC DATABASE MONGODB & NODEJS API (HỖ TRỢ BẢO VỆ ĐỒ ÁN)  */}
      {/* ===================================================================== */}
      {/* ===================================================================== */}
      {/* MODAL ĐĂNG NHẬP & ĐĂNG KÝ THEO PHÂN QUYỀN (BUYER / SELLER / ADMIN)    */}
      {/* ===================================================================== */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 space-y-4 border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-emerald-100'}`}>
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Xác Thực &amp; Phân Quyền Hệ Thống</h3>
                  <p className="text-[11px] text-slate-500">Đăng nhập theo vai trò Khách hàng, Nhà vườn hoặc Admin</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAuthModal(false);
                  setPendingTargetView(null);
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chuyển Tab Đăng nhập / Đăng ký */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthTab('login')}
                className={`py-2 rounded-lg transition ${
                  authTab === 'login' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500'
                }`}
              >
                Đăng Nhập
              </button>
              <button
                type="button"
                onClick={() => setAuthTab('register')}
                className={`py-2 rounded-lg transition ${
                  authTab === 'register' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500'
                }`}
              >
                Đăng Ký Tài Khoản
              </button>
            </div>

            {authTab === 'login' ? (
              <div className="space-y-3 text-xs">
                {/* Chọn nhanh tài khoản mẫu theo 3 quyền */}
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-500">Chọn nhanh tài khoản Demo theo Phân quyền:</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: '🛒 Khách hàng', email: 'khachhang@gmail.com', role: 'buyer' },
                      { label: '🏪 Nhà vườn', email: 'seller@freshmart.vn', role: 'seller' },
                      { label: '🛡️ Admin', email: 'admin@freshmart.vn', role: 'admin' }
                    ].map((preset) => (
                      <button
                        key={preset.role}
                        type="button"
                        onClick={() => setLoginForm({ email: preset.email, password: '123' })}
                        className={`p-2 rounded-xl border text-center font-bold transition ${
                          loginForm.email === preset.email
                            ? 'border-emerald-600 bg-emerald-500/10 text-emerald-600'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div>{preset.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Email đăng nhập:</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="Nhập email tài khoản..."
                    className="w-full px-3 py-2 rounded-xl border bg-transparent"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Mật khẩu (Mặc định: 123):</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleLoginSubmit()}
                    placeholder="Nhập mật khẩu..."
                    className="w-full px-3 py-2 rounded-xl border bg-transparent"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleLoginSubmit}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg"
                >
                  Đăng Nhập Hệ Thống
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Họ và tên / Tên nhà vườn:</label>
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    placeholder="VD: Nguyễn Văn B hoặc Vườn Bưởi Da Xanh"
                    className="w-full px-3 py-2 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Địa chỉ Email:</label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="email@freshmart.vn"
                    className="w-full px-3 py-2 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Mật khẩu:</label>
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Đăng ký với Phân quyền:</label>
                  <select
                    value={registerForm.roleCode}
                    onChange={(e) => setRegisterForm({ ...registerForm, roleCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border bg-transparent"
                  >
                    <option value="buyer">🛒 Khách hàng mua sắm (Buyer)</option>
                    <option value="seller">🏪 Chủ nhà vườn / Người bán (Seller)</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleRegisterSubmit}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg"
                >
                  Tạo Tài Khoản &amp; Đăng Nhập Ngay
                </button>
              </div>
            )}
          </div>
        </div>
      )}


    </div>
  );
}