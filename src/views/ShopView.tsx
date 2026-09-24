import React, { useState, useMemo } from 'react';
import { ViewName, Product } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Sparkles,
  Check,
  ChevronDown
} from 'lucide-react';

interface ShopViewProps {
  onNavigate: (view: ViewName, productId?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CATEGORIES = [
  { key: 'all', label: 'সব পার্টস' },
  { key: 'cof_ic', label: 'COF / TAB IC' },
  { key: 'motherboard', label: 'টিভি মাদারবোর্ড' },
  { key: 'tcon_board', label: 'T-Con বোর্ড' },
  { key: 'backlight_led', label: 'LED ব্যাকলাইট' },
  { key: 'inverter_pcb', label: 'ইনভার্টার সার্কিট' },
  { key: 'copper_wire', label: 'কপার ওয়্যার ও ফ্যান' },
  { key: 'tools', label: 'ল্যাব টুলস ও টেপ' }
];

const BRANDS = ['Hitachi', 'Novatek', 'Samsung', 'LG', 'BOE', 'Singer', 'Walton', 'Universal'];

export const ShopView: React.FC<ShopViewProps> = ({
  onNavigate,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setMaxPrice(10000);
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      if (p.price > maxPrice) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesNameBn = p.nameBn.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesNameBn && !matchesBrand && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedBrands, maxPrice, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
      {/* Header Breadcrumb & Title */}
      <div className="mb-6">
        <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
          Genuine Electronic Components & Replacement Catalog
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#0F172A] dark:text-[#F8FAFC] mt-1">
          সার্ভিস পার্টস ও রিপ্লেসমেন্ট ক্যাটালগ
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          ১০০% অরিজিনাল ডিসপ্লে COF IC, স্মার্ট টিভি মাদারবোর্ড ও ইনভার্টার সার্কিট।
        </p>

        {/* Temporary Repair Only Notice as per user instruction */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-start gap-3 text-amber-900 dark:text-amber-200">
          <span className="text-base sm:text-lg shrink-0">⚠️</span>
          <div className="text-xs leading-relaxed">
            <span className="font-bold block">জরুরী বিজ্ঞপ্তি: সরাসরি কেনা-বেচা সাময়িকভাবে স্থগিত</span>
            বর্তমানে শুধুমাত্র ল্যাব মেরামত ও হোম সার্ভিসিং কার্যক্রম চালু রয়েছে। স্পেয়ার পার্টস আলাদাভাবে খুচরা বিক্রয় করা হচ্ছে না; সার্ভিস বুকিং দিলে আমাদের ল্যাব টেকনিশিয়ান জেনুইন পার্টস সঙ্গে নিয়ে প্রফেশনাল ফিটিং ও টেস্টিং সেবা প্রদান করবেন।
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters (3 cols) + Product List (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar (3 cols on desktop) */}
        <aside className="lg:col-span-3 bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-5">
            <span className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
              <span>ফিল্টারসমূহ</span>
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>রিসেট</span>
            </button>
          </div>

          {/* Category List */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              ক্যাটাগরি
            </h4>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    selectedCategory === cat.key
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 font-bold border-l-3 border-blue-600 dark:border-cyan-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">সর্বোচ্চ বাজেট</span>
              <span className="font-mono font-bold text-blue-700 dark:text-cyan-400">৳{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={200}
              max={10000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-700 dark:accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">
              <span>৳২০০</span>
              <span>৳১০,০০০+</span>
            </div>
          </div>

          {/* Brand Checklist */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              ব্র্যান্ড নির্বাচন
            </h4>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {BRANDS.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded border-slate-300 dark:border-slate-700 text-blue-700 dark:text-cyan-400 focus:ring-blue-600 accent-blue-700 dark:accent-cyan-400"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Product Grid Area (9 cols) */}
        <section className="lg:col-span-9 flex flex-col gap-6">
          {/* Top Sort & Search Toolbar */}
          <div className="bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পার্টস বা মডেল নম্বর সার্চ..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                মোট <strong className="text-slate-900 dark:text-white font-mono">{filteredProducts.length}</strong> টি পণ্য পাওয়া গেছে
              </div>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 cursor-pointer"
              >
                <option value="featured">ফিচার্ড পার্টস</option>
                <option value="price-asc">মূল্য: কম থেকে বেশি</option>
                <option value="price-desc">মূল্য: বেশি থেকে কম</option>
                <option value="rating">সর্বোচ্চ রেটিং</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory !== 'all' || selectedBrands.length > 0 || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500">সক্রিয় ফিল্টার:</span>
              {selectedCategory !== 'all' && (
                <span className="px-2.5 py-1 rounded-md text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                  <span>{CATEGORIES.find((c) => c.key === selectedCategory)?.label}</span>
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-blue-900 dark:hover:text-white cursor-pointer">×</button>
                </span>
              )}
              {selectedBrands.map((b) => (
                <span key={b} className="px-2.5 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1">
                  <span>{b}</span>
                  <button onClick={() => toggleBrand(b)} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">×</button>
                </span>
              ))}
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-md text-xs bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                  <span>সার্চ: {searchQuery}</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-amber-950 dark:hover:text-white cursor-pointer">×</button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">কোনো পার্টস খুঁজে পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                আপনার দেওয়া শর্তের সাথে মেলে এমন কোনো পণ্য বর্তমানে পাওয়া যাচ্ছে না। দয়া করে ফিল্টার পরিবর্তন করুন।
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-700 dark:bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
