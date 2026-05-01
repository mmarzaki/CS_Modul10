'use client';

import React, { useState } from 'react';
import { ShoppingCart, Bell, ArrowRight, ArrowLeft, Heart } from 'lucide-react';


// GLOBAL FONT (I F LOVE YOU HELVETICA)
const helveticaStyle = `
  @font-face {
    font-family: 'Helvetica';
    src: url('/Helvetica.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  * {
    font-family: 'Helvetica', Arial, sans-serif !important;
  }
`;


// LOGIN PAGE COMPONENTS
function LoginPage({ onLogin }: { onLogin: (username: string) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const API = 'https://abyan-modul10-backend.vercel.app';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      // Backend route: POST /auth/login
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.message || 'Login failed. Check the email and password.');
        return;
      }
      const token = data.token || data.payload?.token;
      const name = data.payload?.name || data.user?.name || loginEmail.split('@')[0];
      localStorage.setItem('token', token);
      localStorage.setItem('username', name);
      onLogin(name);
    } catch {
      setLoginError('Cannot connected to the database server');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (regPassword !== regConfirm) {
      setRegError('Password dan konfirmasi tidak cocok.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password minimal 6 karakter.');
      return;
    }

    setRegLoading(true);
    try {
      // Backend route: POST /user/register
      const res = await fetch(`${API}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = Array.isArray(data.errors)
          ? data.errors.map((e: { msg: string }) => e.msg).join(', ')
          : data.message || 'Registrasi gagal. Coba lagi.';
        setRegError(msg);
        return;
      }
      setRegSuccess('Akun berhasil dibuat! Silakan sign in.');
      setRegName(''); setRegEmail(''); setRegPassword(''); setRegConfirm('');
      setTimeout(() => { setMode('login'); setRegSuccess(''); }, 2000);
    } catch {
      setRegError('Cannot connected to the database');
    } finally {
      setRegLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#0053a0] focus:ring-1 focus:ring-[#0053a0]";

  return (
    <>
      <style>{helveticaStyle}</style>
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center pt-12 pb-16">
        {/* Logo */}
        <div
          className="h-[90px] w-[90px] mb-8 rounded-xl overflow-hidden bg-contain bg-no-repeat bg-center bg-white border-2 border-white shadow-sm"
          style={{ backgroundImage: "url('/images/logo.jpg')" }}
        />

        <div className="bg-white w-full max-w-[420px] rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Tab Toggle */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => { setMode('login'); setLoginError(''); }}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${
                mode === 'login'
                  ? 'text-[#0053a0] border-b-2 border-[#0053a0] bg-white'
                  : 'text-gray-400 hover:text-gray-600 bg-gray-50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setRegError(''); setRegSuccess(''); }}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${
                mode === 'register'
                  ? 'text-[#0053a0] border-b-2 border-[#0053a0] bg-white'
                  : 'text-gray-400 hover:text-gray-600 bg-gray-50'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            {/* ===== LOGIN FORM ===== */}
            {mode === 'login' && (
              <>
                <h1 className="text-2xl font-bold text-center text-[#333] mb-1">Welcome back</h1>
                <p className="text-center text-sm text-gray-500 mb-6">Sign in to your UI Store account</p>

                {loginError && (
                  <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex justify-end mb-6">
                    <span className="text-xs text-[#0053a0] hover:underline cursor-pointer">Forgot password?</span>
                  </div>
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full bg-[#0053a0] text-white font-bold py-3 rounded-full hover:bg-[#004080] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loginLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Didn't have an account?{' '}
                  <span
                    onClick={() => setMode('register')}
                    className="text-[#0053a0] font-bold hover:underline cursor-pointer"
                  >
                    Create account
                  </span>
                </p>
              </>
            )}

            {/* ===== REGISTER FORM ===== */}
            {mode === 'register' && (
              <>
                <h1 className="text-2xl font-bold text-center text-[#333] mb-1">Create new Account</h1>
                <p className="text-center text-sm text-gray-500 mb-6">Create account to access the content</p>

                {regError && (
                  <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                    {regError}
                  </div>
                )}
                {regSuccess && (
                  <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-600 font-bold text-center">
                    ✓ {regSuccess}
                  </div>
                )}

                <form onSubmit={handleRegister}>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Password</label>
                    <input
                      type="password"
                      placeholder="Min. 6 karakter"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={regConfirm}
                      onChange={(e) => setRegConfirm(e.target.value)}
                      className={`${inputClass} ${regConfirm && regPassword !== regConfirm ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
                    />
                    {regConfirm && regPassword !== regConfirm && (
                      <p className="text-xs text-red-500 mt-1">Password tidak cocok</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full bg-[#0053a0] text-white font-bold py-3 rounded-full hover:bg-[#004080] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {regLoading ? 'Creating account...' : 'Create account'}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Already have an account ?{' '}
                  <span
                    onClick={() => setMode('login')}
                    className="text-[#0053a0] font-bold hover:underline cursor-pointer"
                  >
                    Sign in
                  </span>
                </p>
              </>
            )}
          </div>
        </div>

        <p className="text-[11px] text-gray-400 mt-6 text-center max-w-[320px]">
          Dengan membuat akun, kamu menyetujui{' '}
          <span className="underline cursor-pointer">Syarat & Ketentuan</span> dan{' '}
          <span className="underline cursor-pointer">Kebijakan Privasi</span> UI Store.
        </p>
      </div>
    </>
  );
}


// NAVIGAITIO BAR
function Navbar({ onLogout, username }: { onLogout: () => void; username: string }) {
  return (
    <>
      <nav className="border-b border-gray-200 py-2 bg-[#FAF9F6]">
        <div className="max-w-[1300px] mx-auto px-4 flex justify-between items-center text-[12px]">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">
              Hi <span className="font-bold">{username}!</span> | {' '}
              <button onClick={onLogout} className="text-[#0053a0] hover:underline ml-1">Sign out</button>
            </span>
            <span className="cursor-pointer hover:underline">Help & Contact</span>
          </div>
          <div className="flex gap-5 items-center">
            <span className="cursor-pointer hover:underline">Wishlist</span>
            <Bell size={18} className="cursor-pointer hover:text-blue-600" />
            <ShoppingCart size={18} className="cursor-pointer hover:text-blue-600" />
          </div>
        </div>
      </nav>

      <header className="py-4">
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="bg-[#0053a0] rounded-sm px-8 py-6 relative flex items-center shadow-md" style={{ minHeight: '160px' }}>
            {/* UI STORE TEXT*/}
            <h1 className="text-white font-black tracking-tight leading-none" style={{ fontSize: 'clamp(72px, 10vw, 130px)' }}>
              UI STORE
            </h1>
            {/* LOGO */}
            <div className="absolute middle-4 right-20 cursor-pointer shrink-0">
              <div
                className="h-[90px] w-[90px] rounded-xl overflow-hidden bg-contain bg-no-repeat bg-center bg-white border-2 border-white shadow-sm"
                style={{ backgroundImage: "url('/images/logo.jpg')" }}
              ></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


// PRODUCT CARD
function ProductCard({
  item,
  isWishlisted,
  onToggleWishlist,
  showDiscount = false,
  showDelivery = false,
  showCondition = false,
  showBadge = false,
}: {
  item: {
    id: number;
    title: string;
    price: string;
    delivery?: string;
    condition?: string;
    badge?: string;
    img: string;
    discount?: string;
  };
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  showDiscount?: boolean;
  showDelivery?: boolean;
  showCondition?: boolean;
  showBadge?: boolean;
}) {

  return (
    <div className="flex flex-col group cursor-pointer">
      {/* IMAGE CONTAINER */}
      <div className="relative rounded-2xl overflow-hidden bg-[#EBEBEB] aspect-square mb-3">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* WISHIST HEART */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(item.id); }}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50"
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* INFO BELOW IMAGE */}
      <div className="px-1">
        <h3 className="text-sm leading-snug mb-2 line-clamp-2 group-hover:underline text-[#111]">
          {item.title}
        </h3>
        {showCondition && item.condition && (
          <p className="text-[11px] text-gray-500 mb-1">{item.condition}</p>
        )}
        <p className="text-base font-bold text-[#111]">{item.price}</p>
        {showDelivery && item.delivery && (
          <p className="text-[11px] text-gray-500">{item.delivery}</p>
        )}
        {showBadge && item.badge && (
          <p className="text-[11px] text-[#0053a0] font-bold mt-1">✓ {item.badge}</p>
        )}
        {showDiscount && item.discount && (
          <p className="text-[12px] text-[#e53238] font-bold mt-0.5">{item.discount}</p>
        )}
      </div>
    </div>
  );
}


// ALL ITEMS PAGE 
const allProducts = [
  { id: 1, title: 'Death Stranding 2: On The Beach - PlayStation 5', price: 'IDR 2.320.000', delivery: 'Free delivery', condition: 'New', badge: '', img: '/images/death_stranding.png', discount: 'Extra 15% off' },
  { id: 2, title: 'Canon AE-1 Program 35mm SLR Film Camera + 50mm 1:1.8', price: 'IDR 5.248.000', delivery: 'Free delivery', condition: 'Used', badge: '', img: '/images/canon.png', discount: 'Free Shipping' },
  { id: 3, title: 'Apple 2024 MacBook Pro with Apple M4 Chip', price: 'IDR 23.504.000', delivery: '+ IDR 1.800.000 delivery', condition: 'New', badge: '', img: '/images/macbook.png', discount: 'Extra 15% off' },
  { id: 4, title: 'Dune Part 2 4K Ultra HD Blu Ray Original', price: 'IDR 3.184.000', delivery: 'Free delivery', condition: 'New', badge: '', img: '/images/dune.png', discount: 'Limited Deal' },
  { id: 5, title: 'Samsung Odyssey Neo Quantum Mini LED G8', price: 'IDR 22.400.000', delivery: '+ IDR 500.000 delivery', condition: 'New', badge: 'Top Rated Plus', img: '/images/monitor_samsung.png', discount: 'Extra 10% off' },
  { id: 6, title: 'Razer Huntsman V2 Analog Gaming Keyboard', price: 'IDR 4.000.000', delivery: 'Free delivery', condition: 'New', badge: '', img: '/images/razer_keyboard.png', discount: 'Save IDR 500K' },
  { id: 7, title: 'KLIM K8 Portable Cassette Tape Player + Recorder AM/FM ', price: 'IDR 1.000.000', delivery: '+ IDR 1.000.000 delivery', condition: 'New', badge: 'Top Rated Plus', img: '/images/walkman.png', discount: 'Extra 5% off' },
  { id: 8, title: 'Sony PS5 DualSense Controller - Icon Blue Special Edition', price: 'IDR 3.600.000', delivery: 'Free delivery', condition: 'New', badge: '', img: '/images/dualshock.png', discount: 'Free Shipping' },
  { id: 9, title: 'Logitech - G502 X PLUS LIGHTSPEED Wireless', price: 'IDR 2.800.000', delivery: 'Free delivery', condition: 'New', badge: 'Top Rated', img: '/images/logitech_g502x.png', discount: 'Limited Deal' },
  { id: 10, title: '"Sunflowers" by Vincent Van Gogh, 1887', price: 'IDR 5.000.000.000', delivery: '+ IDR 100.000 delivery', condition: 'Antique', badge: 'Trusted', img: '/images/van_gogh.png' },
];

// Type for product
type Product = {
  id: number;
  title: string;
  price: string;
  delivery?: string;
  condition?: string;
  badge?: string;
  img: string;
  discount?: string;
};

function normalizeItem(item: Record<string, unknown>): Product {
  const rawPrice = Number(item.price ?? 0);
  return {
    id: item.id as number,
    title: (item.title ?? item.name ?? 'Unnamed Item') as string,
    price: rawPrice > 0
      ? `IDR ${rawPrice.toLocaleString('id-ID')}`
      : (item.price as string) || 'Harga tidak tersedia',
    delivery: (item.delivery ?? 'Free delivery') as string,
    condition: (item.condition ?? 'New') as string,
    badge: (item.badge ?? '') as string,
    img: (item.img ?? item.image_url ?? '/images/macbook.png') as string,
    discount: (item.discount ?? '') as string,
  };
}

function AllItemsPage({ onBack, onLogout, username }: { onBack: () => void; onLogout: () => void; username: string }) {
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [sortBy, setSortBy] = useState('Popular');
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const API = 'https://abyan-modul10-backend.vercel.app';

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        // GET /items 
        const res = await fetch(`${API}/items`);
        const data = await res.json();
        if (res.ok) {
          // Backend returns array 
          const raw: Record<string, unknown>[] = Array.isArray(data)
            ? data
            : Array.isArray(data.payload)
            ? data.payload
            : [];
          if (raw.length > 0) {
            setProducts(raw.map(normalizeItem));
          }
        } else {
          setFetchError('Menampilkan data lokal (server tidak tersedia).');
        }
      } catch {
        setFetchError('Cannot connected to the database, menampilkan data lokal.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [API]);

  // Client-side sort
  const sortedProducts = React.useMemo(() => {
    const parsePrice = (p: string) => parseInt(p.replace(/\D/g, '')) || 0;
    if (sortBy === 'Price: Lowest first')
      return [...products].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === 'Price: Highest first')
      return [...products].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return products;
  }, [products, sortBy]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <style>{helveticaStyle}</style>
      <div className="min-h-screen bg-[#FAF9F6] text-[#333]">
        <Navbar onLogout={onLogout} username={username} />

        <main className="max-w-[1300px] mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="text-[12px] text-gray-500 mb-4 flex items-center gap-1">
            <span className="text-[#0053a0] hover:underline cursor-pointer" onClick={onBack}>Home</span>
            <span>/</span>
            <span className="text-[#333]">All Items</span>
          </div>

          {/* Page Title + Sort */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Exploring all items</h1>
              <p className="text-sm text-gray-500 mt-1">
                {loading ? 'Memuat...' : `${sortedProducts.length} items ditemukan`}
              </p>
              {fetchError && (
                <p className="text-xs text-amber-600 mt-1">⚠ {fetchError}</p>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-500">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#0053a0]"
              >
                <option>Popular</option>
                <option>Price: Lowest first</option>
                <option>Price: Highest first</option>
              </select>
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
              {sortedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  isWishlisted={!!wishlist[item.id]}
                  onToggleWishlist={toggleWishlist}
                  showDiscount
                  showDelivery
                  showCondition
                  showBadge
                />
              ))}
            </div>
          )}

          {/* Back Button */}
          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-[#0053a0] text-white px-8 py-3 font-bold hover:bg-[#004080] shadow-sm rounded-sm"
            >
              <ArrowLeft size={18} /> Back to home
            </button>
          </div>
        </main>
      </div>
    </>
  );
}


// LANDING PAGE
const landingProducts = [
  { id: 101, title: 'Death Stranding 2: On The Beach - PlayStation 5', price: 'IDR 2.320.000', delivery: 'Free delivery', condition: 'New', badge: '', img: '/images/death_stranding.png', discount: 'Extra 15% off' },
  { id: 102, title: 'Canon AE-1 Program 35mm SLR Film Camera + 50mm 1:1.8', price: 'IDR 5.248.000', delivery: 'Free delivery', condition: 'Used', badge: '', img: '/images/canon.png', discount: 'Free Shipping' },
  { id: 103, title: 'Apple 2024 MacBook Pro with Apple M4 Chip', price: 'IDR 23.504.000', delivery: '+ IDR 1.800.000 delivery', condition: 'New', badge: '', img: '/images/macbook.png', discount: 'Extra 15% off' },
  { id: 104, title: 'Razer Huntsman V2 Analog Gaming Keyboard', price: 'IDR 4.000.000', delivery: 'Free delivery', condition: 'New', badge: '', img: '/images/razer_keyboard.png', discount: 'Save IDR 500K' },
  { id: 105, title: 'Dune Part 2 4K Ultra HD Blu Ray Original', price: 'IDR 3.184.000', delivery: 'Free delivery', condition: 'New', badge: '', img: '/images/dune.png', discount: 'Limited Deal' },
  { id: 106, title: 'KLIM K8 Portable Cassette Tape Player + Recorder AM/FM ', price: 'IDR 1.000.000', delivery: '+ IDR 1.000.000 delivery', condition: 'New', badge: 'Top Rated Plus', img: '/images/walkman.png', discount: 'Extra 5% off' },
];

function LandingPage({ onLogout, onViewAll, username }: { onLogout: () => void; onViewAll: () => void; username: string }) {
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});

  const toggleWishlist = (id: number) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const diskonItems = landingProducts.slice(0, 2);
  const terlarisItems = landingProducts.slice(2);

  return (
    <>
      <style>{helveticaStyle}</style>
      <div className="min-h-screen bg-[#FAF9F6] text-[#333]">
        <Navbar onLogout={onLogout} username={username} />
        <div className="max-w-[1300px] mx-auto px-4">
          <div
            className="relative h-[680px] rounded-sm overflow-hidden flex items-end pb-12 px-8 md:px-12 mb-10 mt-2 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/banner1.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/20 z-0"></div>
            <div className="max-w-md z-10 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-2 leading-tight drop-shadow-md">Shopping with Ease</h2>
              <p className="text-lg md:text-xl mb-6 drop-shadow-md">Cari barang sesuai dengan kebutuhan-mu</p>
              <button onClick={onViewAll} 
              className="flex items-center justify-center gap-2 bg-white text-[#333] px-10 py-3 font-bold hover:bg-gray-100 transition-colors rounded-sm shadow-lg">
              Cari barang <ArrowRight size={18} />
            </button>
            </div>
          </div>
        </div>

        {/* BARANG DISKON */}
        <div className="max-w-[1300px] mx-auto px-4 mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Pesta Diskon Besar!</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 max-w-[500px] mx-auto">
            {diskonItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                isWishlisted={!!wishlist[item.id]}
                onToggleWishlist={toggleWishlist}
                showDiscount
              />
            ))}
          </div>
        </div>

        {/* BANNER 2 */}
        <div
          className="max-w-[1800px] relative h-[350px] w-full mx-auto mb-16 bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/images/banner2.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/30 z-0"></div>
        </div>

        {/* BARANG TERLARIS */}
        <main className="max-w-[1300px] mx-auto px-4 pb-20">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Barang Terlaris</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
            {terlarisItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                isWishlisted={!!wishlist[item.id]}
                onToggleWishlist={toggleWishlist}
                showDiscount
              />
            ))}
          </div>

          {/* VIEW ALL ITEMS BUTTON */}
          <div className="flex justify-center mt-12">
            <button
              onClick={onViewAll}
              className="flex items-center gap-2 bg-[#0053a0] text-white px-8 py-3 font-bold hover:bg-[#004080] shadow-sm rounded-sm"
            >
              View all items <ArrowRight size={18} />
            </button>
          </div>
        </main>
      </div>
    </>
  );
}


export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState<'home' | 'all-items'>('home');

  const handleLogin = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setCurrentPage('home');
  };

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  if (currentPage === 'all-items') {
    return (
      <AllItemsPage
        onBack={() => setCurrentPage('home')}
        onLogout={handleLogout}
        username={username}
      />
    );
  }

  return (
    <LandingPage
      onLogout={handleLogout}
      onViewAll={() => setCurrentPage('all-items')}
      username={username}
    />
  );
}