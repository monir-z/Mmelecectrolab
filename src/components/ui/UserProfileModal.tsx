import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { ViewName } from '../../types';
import {
  X,
  User,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  Save,
  Wrench,
  Clock,
  LogOut,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface UserProfileModalProps {
  onNavigate: (view: ViewName, targetId?: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ onNavigate }) => {
  const { user, userProfile, isProfileModalOpen, setIsProfileModalOpen, updateProfileData, signOutUser } = useAuth();
  const { bookings } = useOrders();

  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [upazila, setUpazila] = useState('সুন্দরগঞ্জ');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings'>('profile');

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || user?.displayName || '');
      setPhone(userProfile.phone || '');
      setAddress(userProfile.address || '');
      setUpazila(userProfile.upazila || 'সুন্দরগঞ্জ');
    }
  }, [userProfile, user]);

  if (!isProfileModalOpen || !user) return null;

  // Filter bookings matching this user's phone or userId
  const myBookings = bookings.filter((b) => {
    if (b.userId && b.userId === user.uid) return true;
    if (userProfile?.phone && b.phone && b.phone.includes(userProfile.phone.slice(-8))) return true;
    return false;
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfileData({
        displayName,
        phone,
        address,
        upazila
      });
      setIsProfileModalOpen(false);
    } catch {
      // Toast handles error message
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0D1527] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#090F1C]/80">
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-600 dark:border-cyan-400 shadow-xs"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 flex items-center justify-center font-bold text-lg">
                {user.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                {userProfile?.displayName || user.displayName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>{user.email}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 bg-white dark:bg-[#0D1527]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-blue-600 dark:border-cyan-400 text-blue-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>প্রোফাইল তথ্য</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-blue-600 dark:border-cyan-400 text-blue-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>সার্ভিস হিস্ট্রি ({myBookings.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'profile' ? (
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  পূর্ণ নাম
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                  placeholder="আপনার নাম লিখুন"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  মোবাইল নম্বর (হোম সার্ভিস ও ডেলিভারির জন্য)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 font-mono"
                    placeholder="০১XXXXXXXXX"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  ল্যাব টেকনিশিয়ান কল দিয়ে সার্ভিসের আপডেট জানাবেন
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    উপজেলা / থানা
                  </label>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="সুন্দরগঞ্জ">সুন্দরগঞ্জ</option>
                    <option value="গাইবান্ধা সদর">গাইবান্ধা সদর</option>
                    <option value="পলাশবাড়ী">পলাশবাড়ী</option>
                    <option value="সাদুল্লাপুর">সাদুল্লাপুর</option>
                    <option value="গোবিন্দগঞ্জ">গোবিন্দগঞ্জ</option>
                    <option value="ফুলছড়ি">ফুলছড়ি</option>
                    <option value="সাঘাটা">সাঘাটা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    গ্রাম / এলাকা ও রোড
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                    placeholder="যেমন: বাজার রোড, সুন্দরগঞ্জ"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    signOutUser();
                    setIsProfileModalOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>লগআউট</span>
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'তথ্য সংরক্ষণ করুন'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-3">
              {myBookings.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">কোনো সার্ভিস বুকিং পাওয়া যায়নি</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                      আপনার টিভি ডিসপ্লে, ইনভার্টার ফ্রিজ বা এসি মেরামতের জন্য এখনই ল্যাব বুকিং দিন।
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileModalOpen(false);
                      onNavigate('service-booking');
                    }}
                    className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
                  >
                    নতুন সার্ভিস বুকিং দিন
                  </button>
                </div>
              ) : (
                myBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-blue-700 dark:text-cyan-400">
                        টোকেন: {b.id}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {b.status === 'completed' ? 'সম্পন্ন' : 'চলমান ল্যাব সার্ভিস'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-800 dark:text-slate-200 font-semibold">
                      {b.deviceType} ({b.brand})
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {b.issueDescription}
                    </p>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {b.serviceType === 'lab_drop' ? 'ল্যাব ড্রপ' : 'হোম সার্ভিস'}
                      </span>
                      <button
                        onClick={() => {
                          setIsProfileModalOpen(false);
                          onNavigate('track', b.id);
                        }}
                        className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>লাইভ ট্র্যাক করুন</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
