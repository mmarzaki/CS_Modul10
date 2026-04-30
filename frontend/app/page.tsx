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
function LoginPage({ onLogin }: { onLogin: () => void }) {
  return (
    <>
      <style>{helveticaStyle}</style>
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center pt-12">
        <div className="h-[90px] w-[90px] mb-8 rounded-xl overflow-hidden bg-contain bg-no-repeat bg-center bg-white border-2 border-white shadow-sm"
        style={{ backgroundImage: "url('/images/logo.jpg')" }}>
        </div>

        <div className="bg-white w-full max-w-[400px] p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-[#333] mb-2">Hello</h1>
          <p className="text-center text-sm text-gray-600 mb-8">
            Sign in to UI Store or <span className="text-[#0053a0] hover:underline cursor-pointer">create an account</span>
          </p>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email or username"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#0053a0] focus:ring-1 focus:ring-[#0053a0]"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#0053a0] focus:ring-1 focus:ring-[#0053a0]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3665f3] text-white font-bold py-3 rounded-full hover:bg-[#004080] transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button className="w-full bg-white border border-gray-300 text-[#333] font-bold py-3 rounded-full mb-3 hover:bg-gray-50 flex items-center justify-center gap-2">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}


// NAVIGAITIO BAR
function Navbar({ onLogout }: { onLogout: () => void }) {
  return (
    <>
      <nav className="border-b border-gray-200 py-2 bg-[#FAF9F6]">
        <div className="max-w-[1300px] mx-auto px-4 flex justify-between items-center text-[12px]">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">
              Hi <span className="font-bold">User!</span> | {' '}
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

function AllItemsPage({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [sortBy, setSortBy] = useState('Best Match');

  const toggleWishlist = (id: number) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <style>{helveticaStyle}</style>
      <div className="min-h-screen bg-[#FAF9F6] text-[#333]">
        <Navbar onLogout={onLogout} />

        <main className="max-w-[1300px] mx-auto px-4 py-6">
          <div className="text-[12px] text-gray-500 mb-4 flex items-center gap-1">
            <span className="text-[#0053a0] hover:underline cursor-pointer" onClick={onBack}>Home</span>
            <span>/</span>
            <span className="text-[#333]">All Items</span>
          </div>

          {/* Page Title + Sort */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Exploring all items</h1>
              <p className="text-sm text-gray-500 mt-1">Founded · {allProducts.length} Items</p>
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

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
            {allProducts.map((item) => (
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

function LandingPage({ onLogout, onViewAll }: { onLogout: () => void; onViewAll: () => void }) {
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
        <Navbar onLogout={onLogout} />

        {/* BANNER 1 */}
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
  const [currentPage, setCurrentPage] = useState<'home' | 'all-items'>('home');

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;

  if (currentPage === 'all-items') {
    return (
      <AllItemsPage
        onBack={() => setCurrentPage('home')}
        onLogout={() => { setIsLoggedIn(false); setCurrentPage('home'); }}
      />
    );
  }

  return (
    <LandingPage
      onLogout={() => setIsLoggedIn(false)}
      onViewAll={() => setCurrentPage('all-items')}
    />
  );
}