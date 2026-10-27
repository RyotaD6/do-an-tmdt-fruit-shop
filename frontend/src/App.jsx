import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  ShoppingBag, Search, Heart, Store, Sun, Moon, Trash2, Plus, Minus,
  CheckCircle2, AlertTriangle, Truck, Wallet, Ticket, Tag, Star, ArrowLeft,
  Send, CreditCard, Sparkles, Package, Flag, Clock, Code2, SlidersHorizontal,
  Leaf, Zap, X, Copy, Check, DollarSign, MessageSquare
} from 'lucide-react';

const API_BASE = 'http://127.0.0.1:8000/api';

// --- MINH HỌA SVG TRÁI CÂY NÔNG SẢN ---
const FruitArtwork = ({ type, className = 'w-full h-full' }) => {
  const artworks = {
    durian: (
      <svg viewBox="0 0 200 160" className={className}>
        <rect width="200" height="160" rx="16" fill="#fef9c3" />
        <path d="M55,35 L78,32 L105,30 L132,34 L142,72 L138,100 L118,136 L88,138 L58,132 L38,74 Z" fill="#65a30d" stroke="#365314" strokeWidth="2.5" />
        <ellipse cx="86" cy="82" rx="18" ry="26" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <ellipse cx="116" cy="84" rx="17" ry="24" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
      </svg>
    ),
    strawberry: (
      <svg viewBox="0 0 200 160" className={className}>
        <rect width="200" height="160" rx="16" fill="#ffe4e6" />
        <path d="M100,28 L82,42 L86,48 L100,45 L114,48 L118,42 Z" fill="#16a34a" />
        <path d="M68,55 C52,72 64,116 100,136 C136,116 148,72 132,55 Z" fill="#e11d48" />
        <circle cx="85" cy="85" r="2.5" fill="#fef08a" />
        <circle cx="100" cy="95" r="2.5" fill="#fef08a" />
        <circle cx="115" cy="85" r="2.5" fill="#fef08a" />
      </svg>
    ),
    grape: (
      <svg viewBox="0 0 200 160" className={className}>
        <rect width="200" height="160" rx="16" fill="#ecfccb" />
        <path d="M85,22 Q102,32 120,20" stroke="#713f12" strokeWidth="4" fill="none" />
        {[ [78, 52], [100, 50], [122, 52], [68, 70], [90, 68], [112, 68], [88, 96], [100, 114] ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="15" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1" />
        ))}
      </svg>
    ),
    giftbox: (
      <svg viewBox="0 0 200 160" className={className}>
        <rect width="200" height="160" rx="16" fill="#ffedd5" />
        <path d="M62,85 C62,22 138,22 138,85" stroke="#92400e" strokeWidth="5" fill="none" />
        <path d="M48,84 L152,84 L138,134 C135,140 65,140 62,134 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
        <circle cx="80" cy="78" r="16" fill="#ef4444" />
        <circle cx="105" cy="74" r="18" fill="#f59e0b" />
        <circle cx="126" cy="80" r="14" fill="#84cc16" />
      </svg>
    )
  };
  return artworks[type] || artworks.durian;
};

const formatVND = (num) => `${Number(num || 0).toLocaleString('vi-VN')}đ`;

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentRole, setCurrentRole] = useState('buyer'); // buyer | seller | admin
  const [activeView, setActiveView] = useState('home'); // home | detail | cart | orders | wallet | affiliate | chat

  // Dữ liệu từ Django API & State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFlashSale, setOnlyFlashSale] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [buyerWallet, setBuyerWallet] = useState(500000);
  const [toast, setToast] = useState(null);

  // Chatbot AI State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { id: 1, sender: 'bot', text: 'Xin chào! Mình là Trợ lý AI FreshMart 🍓 kết nối trực tiếp với cơ sở dữ liệu SQL Server. Bạn muốn tìm trái cây theo nhu cầu dinh dưỡng hay ngân sách nào?' }
  ]);

  const showNotice = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // 1. GỌI API LẤY SẢN PHẨM & DANH MỤC TỪ DJANGO BACKEND
  useEffect(() => {
    axios.get(`${API_BASE}/products/`)
      .then(res => {
        setProducts(res.data);
        if (res.data.length > 0) {
          setSelectedProduct(res.data[0]);
          setSelectedVariant(res.data[0].variants?.[0]);
        }
      })
      .catch(() => showNotice('Đang chạy ở chế độ dự phòng nếu chưa bật Backend.'));

    axios.get(`${API_BASE}/categories/`)
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, []);

  // Lọc sản phẩm
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory && p.category_name !== selectedCategory) return false;
      if (onlyFlashSale && !p.is_flash_sale) return false;
      if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [products, selectedCategory, onlyFlashSale, searchQuery]);

  // Thêm vào giỏ
  const addToCart = (product, variant, qty = 1) => {
    const chosen = variant || product.variants?.[0];
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id && item.variant.id === chosen.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += qty;
        return updated;
      }
      return [...prev, { product, variant: chosen, quantity: qty }];
    });
    showNotice(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  // Gọi Chatbot AI qua Backend Django
  const handleSendAi = (customQuery) => {
    const q = (customQuery || aiInput).trim();
    if (!q) return;
    setAiMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: q }]);
    if (!customQuery) setAiInput('');

    axios.post(`${API_BASE}/ai/advisor/`, { message: q })
      .then(res => {
        setAiMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          text: res.data.reply,
          suggestedProducts: res.data.products
        }]);
      })
      .catch(() => {
        setAiMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'AI gợi ý bạn chọn Dâu Tây Hana Đà Lạt (ăn kiêng, ít calo) hoặc Sầu Riêng Ri6 Tiền Giang (Flash Sale hôm nay) nhé!'
        }]);
      });
  };

  return (
    <div className={darkMode ? 'min-h-screen bg-slate-950 text-slate-100 font-sans' : 'min-h-screen bg-emerald-50/40 text-slate-800 font-sans'}>
      {/* TOAST THÔNG BÁO */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white border border-emerald-500 shadow-xl text-xs font-semibold">
          {toast}
        </div>
      )}

      {/* HEADER PHÂN QUYỀN DEMO ĐỒ ÁN */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <span className="flex items-center gap-1 font-bold text-amber-300">
            <Leaf className="w-3.5 h-3.5" /> Đồ án: Python Django + SQL Server + ReactJS
          </span>
          <div className="flex items-center gap-2">
            <span>Vai trò:</span>
            {['buyer', 'seller', 'admin'].map(r => (
              <button
                key={r}
                onClick={() => { setCurrentRole(r); setActiveView('home'); }}
                className={`px-2.5 py-0.5 rounded font-bold ${currentRole === r ? 'bg-amber-400 text-slate-900' : 'bg-emerald-800'}`}
              >
                {r === 'buyer' ? 'Khách hàng' : r === 'seller' ? 'Nhà vườn' : 'Admin'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* THANH ĐIỀU HƯỚNG CHÍNH */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur px-4 py-3 ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-emerald-100'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button onClick={() => setActiveView('home')} className="flex items-center gap-2 text-left">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-emerald-600 leading-none">FreshMart AI</div>
              <div className="text-[10px] text-slate-400">Nông sản sạch từ nhà vườn</div>
            </div>
          </button>

          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm sầu riêng Ri6, dâu tây Đà Lạt, nho mẫu đơn..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setActiveView('wallet')} className="px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ví: {formatVND(buyerWallet)}</span>
            </button>
            <button onClick={() => setActiveView('cart')} className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow">
              <ShoppingBag className="w-4 h-4" />
              <span>Giỏ ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl border border-slate-200 dark:border-slate-700">
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* BANNER NỔI BẬT */}
        {activeView === 'home' && (
          <div className="space-y-6">
            <div className="rounded-3xl p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-wrap items-center justify-between gap-6 shadow-lg">
              <div className="space-y-2 max-w-lg">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold">
                  TUẦN LỄ NÔNG SẢN VIỆT — GIAO NHANH 2H QUA GHN
                </span>
                <h1 className="text-3xl font-extrabold">Đại Tiệc Trái Cây Tươi & Giỏ Quà Cao Cấp</h1>
                <p className="text-xs text-white/90">
                  Cam kết sầu riêng bao ăn 1 đổi 1 trong 24h. Hoàn tiền tự động về ví nếu dập hỏng!
                </p>
                <div className="pt-2 flex gap-3">
                  <button onClick={() => setOnlyFlashSale(!onlyFlashSale)} className="px-4 py-2 rounded-xl bg-amber-400 text-slate-900 font-bold text-xs shadow">
                    {onlyFlashSale ? 'Xem tất cả trái cây' : '⚡ Săn Flash Sale'}
                  </button>
                  <button onClick={() => setIsAiOpen(true)} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Nhờ AI chọn giúp
                  </button>
                </div>
              </div>
              <div className="w-44 h-32 rounded-2xl overflow-hidden shadow-2xl">
                <FruitArtwork type="durian" />
              </div>
            </div>

            {/* DANH SÁCH TRÁI CÂY TỪ SQL SERVER */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-base flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600" /> Trái Cây Đang Bán ({filteredProducts.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts.map(p => {
                  const variant = p.variants?.[0] || {};
                  return (
                    <div key={p.id} className="rounded-2xl border p-3.5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="h-36 rounded-xl overflow-hidden mb-3">
                          <FruitArtwork type={p.art_type || 'durian'} />
                        </div>
                        <div className="text-[11px] text-emerald-600 font-bold">{p.origin} • {p.brand}</div>
                        <h3 className="font-bold text-sm line-clamp-2 mt-0.5">{p.name}</h3>
                        {p.ai_review_summary && (
                          <div className="mt-2 p-2 rounded-lg bg-emerald-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                            <strong>AI Tóm tắt:</strong> {p.ai_review_summary}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t flex items-center justify-between">
                        <div>
                          <div className="text-base font-extrabold text-emerald-600">
                            {formatVND(variant.price || 129000)}
                          </div>
                          <div className="text-[10px] text-slate-400">{variant.label || 'Khay 500g'}</div>
                        </div>
                        <button
                          onClick={() => addToCart(p, variant, 1)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                        >
                          + Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* GIỎ HÀNG */}
        {activeView === 'cart' && (
          <div className="max-w-xl mx-auto rounded-3xl p-6 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" /> Giỏ Hàng Của Bạn
            </h2>
            {cart.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">Chưa có sản phẩm nào trong giỏ hàng.</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-xl text-xs">
                    <div>
                      <div className="font-bold">{item.product.name}</div>
                      <div className="text-slate-400">{item.variant.label} x {item.quantity}</div>
                    </div>
                    <div className="font-extrabold text-emerald-600">
                      {formatVND(item.variant.price * item.quantity)}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setCart([]);
                    showNotice('Đặt hàng thành công! Đơn hàng đã ghi nhận vào SQL Server.');
                    setActiveView('home');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow"
                >
                  Thanh Toán Ngay ({formatVND(cart.reduce((s, i) => s + (i.variant.price * i.quantity), 0))})
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* WIDGET CHATBOT AI TƯ VẤN (GỌI API DJANGO) */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isAiOpen ? (
          <button
            onClick={() => setIsAiOpen(true)}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 hover:scale-105 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Chatbot AI Tư Vấn Trái Cây</span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 rounded-3xl shadow-2xl border overflow-hidden flex flex-col bg-white dark:bg-slate-900 border-emerald-200 dark:border-slate-700">
            <div className="p-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
              <span className="font-bold text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" /> Trợ Lý AI FreshMart (Django + SQL)
              </span>
              <button onClick={() => setIsAiOpen(false)}><X className="w-4 h-4" /></button>
            </div>

            <div className="p-3 space-y-2 max-h-72 overflow-y-auto text-xs">
              {aiMessages.map(m => (
                <div key={m.id} className={`p-2.5 rounded-2xl ${m.sender === 'user' ? 'bg-emerald-600 text-white ml-auto max-w-[80%]' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 mr-auto max-w-[90%]'}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <div className="p-2 border-t flex gap-2">
              <input
                type="text"
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendAi()}
                placeholder="Hỏi AI trái cây giảm cân, giỏ quà biếu..."
                className="flex-1 px-3 py-1.5 rounded-xl text-xs border bg-transparent"
              />
              <button onClick={() => handleSendAi()} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}