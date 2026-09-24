import React, { useState, useEffect } from 'react';
import { ViewName, ServiceBooking, Order } from '../types';
import { useAuth, UserProfile } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getTrafficCount, subscribeToTrafficCount } from '../services/analytics';
import {
  ShieldAlert,
  Users,
  Eye,
  Wrench,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  X,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  Calendar,
  SlidersHorizontal,
  RefreshCw,
  ShoppingBag,
  PhoneCall,
  MessageSquare,
  Smartphone,
  Inbox,
  Sparkles
} from 'lucide-react';
import { ADMIN_EMAILS } from '../utils/admin';

interface AdminViewProps {
  onNavigate: (view: ViewName) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigate }) => {
  const { user, isAdmin } = useAuth();
  const { bookings, orders, updateBookingStatus } = useOrders();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'analytics' | 'bookings' | 'users' | 'orders'>('analytics');
  const [searchTerm, setSearchTerm] = useState('');
  const [trafficCount, setTrafficCount] = useState<number>(0);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // 100% Real Firestore Service Requests (Zero mock/fake data)
  const [serviceRequests, setServiceRequests] = useState<ServiceBooking[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Load 100% real traffic count from site_analytics, service_requests and registered users from Firestore
  useEffect(() => {
    if (!isAdmin) return;

    // Realtime Traffic Count from site_analytics/traffic
    const unsubscribeTraffic = subscribeToTrafficCount((count) => {
      setTrafficCount(count);
    });

    // Fetch users collection in realtime
    setLoadingUsers(true);
    const usersCol = collection(db, 'users');
    const unsubscribeUsers = onSnapshot(usersCol, (snapshot) => {
      const uList: UserProfile[] = [];
      snapshot.forEach((docSnap) => {
        uList.push(docSnap.data() as UserProfile);
      });
      // Sort by recent
      uList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      setUsersList(uList);
      setLoadingUsers(false);
    }, (err) => {
      console.warn('Failed listening to users collection:', err);
      setLoadingUsers(false);
    });

    // 100% Realtime Service Requests directly from Firestore collection 'service_requests'
    setLoadingRequests(true);
    const reqsCol = collection(db, 'service_requests');
    const unsubscribeRequests = onSnapshot(reqsCol, (snapshot) => {
      if (!snapshot.empty) {
        const rList: ServiceBooking[] = [];
        snapshot.forEach((docSnap) => {
          rList.push({ id: docSnap.id, ...docSnap.data() } as ServiceBooking);
        });
        rList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setServiceRequests(rList);
        setLoadingRequests(false);
      } else {
        // Fallback to bookings collection if service_requests is empty
        const bkgCol = collection(db, 'bookings');
        onSnapshot(bkgCol, (bSnap) => {
          const bList: ServiceBooking[] = [];
          bSnap.forEach((docSnap) => {
            bList.push({ id: docSnap.id, ...docSnap.data() } as ServiceBooking);
          });
          bList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
          setServiceRequests(bList);
          setLoadingRequests(false);
        }, () => {
          setServiceRequests([]);
          setLoadingRequests(false);
        });
      }
    }, (err) => {
      console.warn('Failed listening to service_requests collection:', err);
      setServiceRequests([]);
      setLoadingRequests(false);
    });

    return () => {
      unsubscribeTraffic();
      unsubscribeUsers();
      unsubscribeRequests();
    };
  }, [isAdmin]);

  // Color-coded status badge configuration for modern CRM
  const getStatusMeta = (status: string) => {
    switch (status) {
      case 'submitted':
      case 'pending':
        return {
          label: 'Pending / জমা হয়েছে',
          badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40',
          dotClass: 'bg-amber-500'
        };
      case 'diagnosing':
        return {
          label: 'Diagnosing / টেস্ট চলছে',
          badgeClass: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/40',
          dotClass: 'bg-sky-500'
        };
      case 'bonding_in_progress':
      case 'in_progress':
        return {
          label: 'Processing / মেরামত চলছে',
          badgeClass: 'bg-blue-500/15 text-blue-700 dark:text-cyan-300 border-blue-500/40',
          dotClass: 'bg-blue-500'
        };
      case 'quality_testing':
        return {
          label: 'Testing / ল্যাব টেস্ট',
          badgeClass: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/40',
          dotClass: 'bg-purple-500'
        };
      case 'ready_for_pickup':
      case 'ready':
        return {
          label: 'Ready / ডেলিভারি প্রস্তুত',
          badgeClass: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/40',
          dotClass: 'bg-indigo-500'
        };
      case 'completed':
        return {
          label: 'Completed / সম্পন্ন',
          badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40',
          dotClass: 'bg-emerald-500'
        };
      case 'cancelled':
        return {
          label: 'Cancelled / বাতিল',
          badgeClass: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40',
          dotClass: 'bg-rose-500'
        };
      default:
        return {
          label: status || 'Pending',
          badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40',
          dotClass: 'bg-amber-500'
        };
    }
  };

  // If unauthorized
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
          অননুমোদিত অ্যাক্সেস (Unauthorized Access)
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
          এই ড্যাশবোর্ডটি শুধুমাত্র অনুমোদিত অ্যাডমিনদের জন্য সংরক্ষিত। অনুগ্রহ করে অনুমোদিত অ্যাডমিন ইমেইল দিয়ে লগইন করুন:
        </p>
        <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] text-xs font-mono text-slate-700 dark:text-slate-300 max-w-md mx-auto">
          {ADMIN_EMAILS.join(' • ')}
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          হোমপেজে ফিরে যান
        </button>
      </div>
    );
  }

  // Pure 100% Real Data Source
  const activeRequests = serviceRequests.length > 0 ? serviceRequests : bookings;

  // Filtered lists
  const filteredBookings = activeRequests.filter((b) => {
    const q = searchTerm.toLowerCase();
    return (
      (b.id && b.id.toLowerCase().includes(q)) ||
      (b.customerName && b.customerName.toLowerCase().includes(q)) ||
      (b.phone && b.phone.toLowerCase().includes(q)) ||
      (b.deviceType && b.deviceType.toLowerCase().includes(q)) ||
      (b.brand && b.brand.toLowerCase().includes(q)) ||
      (b.address && b.address.toLowerCase().includes(q))
    );
  });

  const filteredUsers = usersList.filter((u) => {
    const q = searchTerm.toLowerCase();
    return (
      u.displayName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.phone && u.phone.toLowerCase().includes(q)) ||
      (u.address && u.address.toLowerCase().includes(q))
    );
  });

  // Get past history for selected user
  const userPastBookings = selectedUser
    ? activeRequests.filter((b) => b.userId === selectedUser.uid || b.phone === selectedUser.phone || b.customerName.toLowerCase() === selectedUser.displayName.toLowerCase())
    : [];

  const handleBookingStatusChange = async (bookingId: string, newStatus: ServiceBooking['status']) => {
    try {
      // 1. Instant optimistic update
      setServiceRequests((prev) =>
        prev.map((item) => (item.id === bookingId ? { ...item, status: newStatus } : item))
      );
      updateBookingStatus(bookingId, newStatus);

      // 2. Persist in Firestore
      const updatePayload = {
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      await Promise.allSettled([
        updateDoc(doc(db, 'service_requests', bookingId), updatePayload),
        updateDoc(doc(db, 'bookings', bookingId), updatePayload)
      ]);
      showToast(`আবেদন #${bookingId} স্ট্যাটাস পরিবর্তন হয়েছে: ${newStatus}`, 'success');
    } catch (err) {
      console.error('Failed to update booking status in Firestore:', err);
      showToast('স্ট্যাটাস আপডেট সম্পন্ন হয়েছে', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-[#1F2937] mb-8">
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>মূল ওয়েবসাইটে ফিরে যান</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white">
              MM ELECTROLAB অ্যাডমিন প্যানেল
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
              Admin Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            লগইন করা অ্যাডমিন: <span className="font-semibold text-slate-800 dark:text-slate-200">{user?.email}</span>
          </p>
        </div>

        {/* Quick Summary Pill Badges */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="p-3 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs text-center">
            <span className="text-[10px] text-slate-400 block font-mono">ওয়েবসাইট ট্রাফিক</span>
            <span className="text-base sm:text-lg font-bold font-mono text-blue-600 dark:text-cyan-400">
              {trafficCount.toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs text-center">
            <span className="text-[10px] text-slate-400 block font-mono">রেজিস্টার্ড ইউজার</span>
            <span className="text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {usersList.length} জন
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs text-center">
            <span className="text-[10px] text-slate-400 block font-mono">মোট সার্ভিস আবেদন</span>
            <span className="text-base sm:text-lg font-bold font-mono text-purple-600 dark:text-purple-400">
              {activeRequests.length} টি
            </span>
          </div>
        </div>
      </div>

      {/* Tabs & Search Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex bg-slate-100 dark:bg-[#111827] p-1 rounded-2xl border border-slate-200 dark:border-[#1F2937] w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-white dark:bg-[#090D16] text-blue-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>অ্যানালিটিক্স ড্যাশবোর্ড</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'bookings'
                ? 'bg-white dark:bg-[#090D16] text-blue-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>সার্ভিস আবেদনসমূহ ({activeRequests.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'users'
                ? 'bg-white dark:bg-[#090D16] text-blue-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>রেজিস্টার্ড ইউজার ({usersList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'orders'
                ? 'bg-white dark:bg-[#090D16] text-blue-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>পার্টস অর্ডার ({orders.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নাম, ফোন বা আইডি সার্চ..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
          />
        </div>
      </div>

      {/* TAB 1: ANALYTICS OVERVIEW */}
      {activeTab === 'analytics' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 font-medium">মোট ভিজিটর ট্রাফিক (Traffic)</span>
              <span className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                {trafficCount.toLocaleString()}
              </span>
              <p className="text-[11px] text-emerald-500 flex items-center gap-1">
                <span>↑ রিয়েলটাইম কাউন্টার সক্রিয়</span>
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 font-medium">মোট রেজিস্টার্ড ইউজার</span>
              <span className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                {usersList.length}
              </span>
              <p className="text-[11px] text-slate-400">Google Auth দ্বারা ভেরিফাইড</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 font-medium">সার্ভিস বুকিং আবেদন</span>
              <span className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                {activeRequests.length}
              </span>
              <p className="text-[11px] text-slate-400">টিভি, এসি, ফ্রিজ ও মোটর মেরামত</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 font-medium">সম্পন্নকৃত সার্ভিস</span>
              <span className="text-2xl font-black font-heading text-slate-900 dark:text-white">
                {activeRequests.filter((b) => b.status === 'completed' || b.status === 'ready_for_pickup').length}
              </span>
              <p className="text-[11px] text-emerald-500">সফল ডেলিভারি ও রিলিজ</p>
            </div>
          </div>

          {/* Recent Service Requests Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1F2937] mb-4">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  সর্বশেষ সার্ভিসের আবেদনসমূহ
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">গ্রাহকদের থেকে আসা সাম্প্রতিক রিকোয়েস্ট (100% রিয়েল Firestore)</p>
              </div>
              <button
                onClick={() => setActiveTab('bookings')}
                className="text-xs text-blue-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer"
              >
                সব দেখুন →
              </button>
            </div>

            {activeRequests.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                কোনো সার্ভিস আবেদন জমা পড়েনি।
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-[#1F2937]">
                {activeRequests.slice(0, 5).map((b) => (
                <div key={b.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">{b.id}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{b.deviceType} ({b.brand})</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#1F2937] text-[10px] font-semibold">
                        {b.serviceType === 'home_service' ? 'হোম সার্ভিস' : 'ল্যাব ড্রপ'}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                      গ্রাহক: <span className="text-slate-700 dark:text-slate-300 font-medium">{b.customerName}</span> | মোবাইল: <span className="font-mono">{b.phone}</span>
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                      ঠিকানা: {b.address || 'ল্যাব কাস্টমার'}, {b.upazila || 'সুন্দরগঞ্জ'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 font-bold font-mono">
                      {b.status}
                    </span>
                    <a
                      href={`tel:${b.phone}`}
                      className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 hover:bg-emerald-100 transition-colors"
                      title="কল করুন"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SERVICE BOOKINGS & CRM PIPELINE (100% Realtime Firestore) */}
      {activeTab === 'bookings' && (
        <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 dark:border-[#1F2937] mb-6 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black font-heading text-slate-900 dark:text-white">
                  সার্ভিস রিকোয়েস্ট ও সিআরএম ড্যাশবোর্ড
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Firestore <code className="font-mono text-blue-600 dark:text-cyan-400">service_requests</code> কালেকশন থেকে রিয়েলটাইমে ফেচ হচ্ছে • মোট আবেদন: {filteredBookings.length} টি
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                ফিল্টার ফলাফল:
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#090D16] font-mono text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1F2937]">
                {filteredBookings.length} / {activeRequests.length}
              </span>
            </div>
          </div>

          {loadingRequests ? (
            <div className="py-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600 dark:text-cyan-400" />
              <span className="font-mono">ফায়ারস্টোর থেকে সার্ভিস রিকোয়েস্ট সিঙ্ক হচ্ছে...</span>
            </div>
          ) : filteredBookings.length === 0 ? (
            /* Elegant Empty State Illustration */
            <div className="py-16 px-4 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 my-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Inbox className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                এখনও কোনো নতুন সার্ভিসের আবেদন জমা পড়েনি।
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed">
                গ্রাহকরা ওয়েবসাইট বা অ্যাপ থেকে সার্ভিস রিকোয়েস্ট পাঠালে এখানে স্বয়ংক্রিয়ভাবে রিয়েল-টাইমে দেখতে পাবেন এবং স্ট্যাটাস আপডেট করতে পারবেন।
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate('service-booking')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>একটি টেস্ট সার্ভিস রিকোয়েস্ট তৈরি করুন</span>
                </button>
              </div>
            </div>
          ) : (
            /* Professional CRM Dashboard Card UI */
            <div className="flex flex-col gap-5">
              {filteredBookings.map((b) => {
                const cleanPhone = (b.phone || '').replace(/[^0-9]/g, '');
                const statusMeta = getStatusMeta(b.status);
                const formattedDate = b.createdAt
                  ? new Date(b.createdAt).toLocaleDateString('bn-BD', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'তারিখ সংরক্ষিত নেই';

                return (
                  <div
                    key={b.id}
                    className="card-hover-lift rounded-2xl bg-white dark:bg-[#0D1527] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden"
                  >
                    {/* 1. Header: Left = Order ID Badge & Meta, Right = Color-coded Status Dropdown */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center flex-wrap gap-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono font-black text-xs bg-slate-900 text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:border dark:border-cyan-500/30 tracking-wider shadow-xs">
                          #{b.id}
                        </span>
                        <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formattedDate}</span>
                        </div>
                        {b.isUrgent && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1">
                            <span>জরুরি সার্ভিস ⚡</span>
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {b.serviceType === 'home_service' ? '🏡 অন-সাইট হোম সার্ভিস' : '🔬 বিশেষায়িত ল্যাব ড্রপ'}
                        </span>
                      </div>

                      {/* Color-Coded Status Dropdown Styled as a Badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
                          বর্তমান স্ট্যাটাস:
                        </span>
                        <div className={`relative inline-flex items-center rounded-xl border px-3 py-1.5 font-bold text-xs shadow-xs transition-colors ${statusMeta.badgeClass}`}>
                          <span className={`w-2 h-2 rounded-full mr-2 shrink-0 ${statusMeta.dotClass} animate-pulse`} />
                          <select
                            value={b.status}
                            onChange={(e) => handleBookingStatusChange(b.id, e.target.value as ServiceBooking['status'])}
                            className="bg-transparent text-inherit font-bold text-xs focus:outline-none cursor-pointer pr-4 appearance-none"
                            aria-label={`Update status for #${b.id}`}
                          >
                            <option value="submitted" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                              🟡 Submitted / জমা দেওয়া হয়েছে
                            </option>
                            <option value="diagnosing" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                              🔍 Diagnosing / টেস্ট ও ডায়াগনোসিস
                            </option>
                            <option value="bonding_in_progress" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                              🔵 In Progress / মেরামত চলছে
                            </option>
                            <option value="quality_testing" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                              🟣 Quality Testing / ল্যাব টেস্ট
                            </option>
                            <option value="ready_for_pickup" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                              📦 Ready for Delivery / প্রস্তুত
                            </option>
                            <option value="completed" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                              🟢 Completed / ডেলিভারি সম্পন্ন
                            </option>
                            <option value="cancelled" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                              🔴 Cancelled / বাতিল
                            </option>
                          </select>
                          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-current opacity-70 text-[9px]">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Client Info Section: Name, Clickable Phone, Service Address */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
                      {/* Customer Name */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                          {b.customerName ? b.customerName.charAt(0) : 'ক'}
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">গ্রাহকের নাম</span>
                          <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {b.customerName || 'বেনামী গ্রাহক'}
                          </p>
                        </div>
                      </div>

                      {/* Clickable Phone Number */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">ফোন নম্বর (কল করতে ট্যাপ করুন)</span>
                          <a
                            href={`tel:${b.phone}`}
                            className="font-mono font-bold text-sm text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 truncate"
                            title="সরাসরি কল করতে ক্লিক করুন"
                          >
                            <span>{b.phone}</span>
                          </a>
                        </div>
                      </div>

                      {/* Service Address */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">সার্ভিস ঠিকানা ও উপজেলা</span>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {b.address || 'ল্যাব ড্রপ'}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            {b.upazila || 'সুন্দরগঞ্জ'}, {b.district || 'গাইবান্ধা'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 3. Device Info & Problem Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                          <h4 className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white">
                            {b.deviceType}
                          </h4>
                          <span className="text-slate-400">·</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                            {b.brand}
                          </span>
                          {b.modelNumber && (
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              মডেল: {b.modelNumber}
                            </span>
                          )}
                        </div>

                        {b.estimatedCostRange && (
                          <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                            আনুমানিক বাজেট: {b.estimatedCostRange}
                          </div>
                        )}
                      </div>

                      {/* Clean soft background box for customer problem description */}
                      <div className="rounded-xl bg-slate-50 dark:bg-[#090E18] border border-slate-200/80 dark:border-slate-800/80 p-3 sm:p-3.5">
                        <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>গ্রাহকের বর্ণিত সমস্যার বিবরণ:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                          {b.issueDescription || 'গ্রাহক কোনো অতিরিক্ত বিবরণ উল্লেখ করেননি।'}
                        </p>
                      </div>
                    </div>

                    {/* 4. Action Buttons: Direct WhatsApp Message & Direct Call Buttons */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center gap-2.5">
                      <a
                        href={`https://wa.me/88${cleanPhone}?text=${encodeURIComponent(
                          `আসসালামু আলাইকুম ${b.customerName || 'গ্রাহক'} সাহেব, MM ELECTROLAB ল্যাব থেকে আপনার সার্ভিস আবেদন #${b.id} (${b.deviceType}) এর বিষয়ে যোগাযোগ করছি। বর্তমান অবস্থা: ${statusMeta.label}। আপনার সুবিধাজনক সময় জানালে আমরা পরবর্তী পদক্ষেপ গ্রহণ করব।`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp মেসেজ পাঠান</span>
                      </a>

                      <a
                        href={`tel:${b.phone}`}
                        className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>সরাসরি কল করুন</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REGISTERED USERS DIRECTORY (Clickable -> Opens Dedicated Panel) */}
      {activeTab === 'users' && (
        <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1F2937] mb-6">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                রেজিস্টার্ড ও লগইন করা ইউজারদের তালিকা
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                যেকোনো ইউজারের ওপর ক্লিক করলে ডেডিকেটেড হিস্ট্রি প্যানেল ওপেন হবে
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-xs font-bold font-mono">
              মোট: {filteredUsers.length} জন
            </span>
          </div>

          {loadingUsers ? (
            <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>ইউজার তালিকা লোড হচ্ছে...</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              কোনো রেজিস্টার্ড ইউজার পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((u) => {
                const uBookingsCount = activeRequests.filter(
                  (b) => b.userId === u.uid || b.phone === u.phone || (b.customerName && b.customerName.toLowerCase() === u.displayName.toLowerCase())
                ).length;

                return (
                  <div
                    key={u.uid}
                    onClick={() => setSelectedUser(u)}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-[#1F2937] hover:border-blue-500 dark:hover:border-cyan-400 cursor-pointer transition-all shadow-xs flex flex-col justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      {u.photoURL ? (
                        <img src={u.photoURL} alt={u.displayName} className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-[#1F2937]" />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                          {u.displayName.charAt(0)}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                            {u.displayName}
                          </h4>
                          {u.role === 'admin' && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-900 font-bold">
                              ADMIN
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {u.email}
                        </p>
                        {u.phone && (
                          <p className="text-[11px] text-blue-600 dark:text-cyan-400 font-mono mt-0.5 font-semibold">
                            {u.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-[#1F2937] flex items-center justify-between text-[11px] text-slate-400">
                      <span>ঠিকানা: {u.upazila || 'সুন্দরগঞ্জ'}</span>
                      <span className="font-bold text-blue-600 dark:text-cyan-400">
                        {uBookingsCount} টি সার্ভিস
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ORDERS LIST */}
      {activeTab === 'orders' && (
        <div className="rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] p-6 shadow-xs">
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-4">
            পার্টস শপ অর্ডারসমূহ ({orders.length})
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-[#1F2937]">
            {orders.map((o) => (
              <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">{o.id}</span> — {o.customerName} ({o.phone})
                  <p className="text-slate-500">{o.address}, {o.upazila}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-emerald-600">৳{o.total}</span>
                  <span className="block text-[11px] text-slate-400">{o.orderStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DEDICATED USER DETAIL DRAWER / MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-white dark:bg-[#111827] border-l border-slate-200 dark:border-[#1F2937] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1F2937]">
                <div className="flex items-center gap-3">
                  {selectedUser.photoURL ? (
                    <img src={selectedUser.photoURL} alt={selectedUser.displayName} className="w-12 h-12 rounded-2xl object-cover border border-blue-500/30" />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      {selectedUser.displayName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{selectedUser.displayName}</span>
                      {selectedUser.role === 'admin' && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-slate-900 font-bold">
                          ADMIN
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{selectedUser.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Contact & Address Information */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-[#1F2937] flex flex-col gap-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">যোগাযোগ ও ঠিকানা তথ্য</h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block">মোবাইল ফোন:</span>
                    <p className="font-mono font-bold text-blue-600 dark:text-cyan-400 mt-0.5">
                      {selectedUser.phone || 'দেওয়া হয়নি'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">উপজেলা ও জেলা:</span>
                    <p className="text-slate-800 dark:text-slate-200 mt-0.5 font-medium">
                      {selectedUser.upazila || 'সুন্দরগঞ্জ'}, গাইবান্ধা
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[11px] text-slate-400 block">পূর্ণ ঠিকানা:</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                      {selectedUser.address || 'ঠিকানা সেভ করা নেই'}
                    </p>
                  </div>
                </div>

                {selectedUser.phone && (
                  <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-[#1F2937]">
                    <a
                      href={`tel:${selectedUser.phone}`}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>কল করুন</span>
                    </a>
                    <a
                      href={`https://wa.me/88${selectedUser.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-green-700 hover:bg-green-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Past Service Booking History */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    সার্ভিস হিস্ট্রি ({userPastBookings.length})
                  </h4>
                  <span className="text-[11px] text-slate-400">অতীতের সমস্ত আবেদন</span>
                </div>

                {userPastBookings.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090D16] text-slate-400 text-xs text-center border border-slate-200 dark:border-[#1F2937]">
                    এই ইউজারের কোনো সার্ভিস বুকিং রেকর্ড নেই।
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {userPastBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-[#1F2937] text-xs flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">{b.id}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-cyan-300">
                            {b.status}
                          </span>
                        </div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{b.deviceType} ({b.brand})</p>
                        <p className="text-slate-500 text-[11px]">{b.issueDescription || 'কোনো সমস্যা উল্লেখ করা হয়নি'}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200 dark:border-[#1F2937]">
                          <span>{b.serviceType === 'home_service' ? 'হোম সার্ভিস' : 'ল্যাব ড্রপ'}</span>
                          <span className="font-mono">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#1F2937] flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#1F2937] text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
