export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  category: 'led_tv_parts' | 'display_cof' | 'mainboards' | 'tcon' | 'refrigeration' | 'ac_electronics' | 'tools_consumables' | 'accessories';
  brand: string;
  price: number;
  regularPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  warranty: string;
  specs: ProductSpec[];
  tags: string[];
  description: string;
  descriptionBn: string;
  badge?: string;
  imageUrl: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  nameBn: string;
  category: 'led_bonding' | 'smart_tv' | 'inverter_fridge' | 'ac_inverter' | 'motor_fan' | 'wiring' | 'appliances' | 'used_appliances';
  priceRange: string;
  estimatedTime: string;
  warrantyPeriod: string;
  features: string[];
  featuresBn: string[];
  description: string;
  descriptionBn: string;
  icon: string;
  imageUrl?: string;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'cod';

export interface Order {
  id: string; // e.g. "MM-9482"
  customerName: string;
  phone: string;
  altPhone?: string;
  address: string;
  district: string;
  upazila: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending_verification' | 'verified' | 'cod';
  transactionId?: string;
  orderStatus: 'received' | 'diagnosing' | 'processing' | 'shipped' | 'delivered' | 'completed';
  createdAt: string;
  notes?: string;
  deliveryDateEstimate: string;
}

export interface ServiceBooking {
  id: string; // e.g. "SRV-4120"
  userId?: string;
  customerName: string;
  phone: string;
  deviceType: string;
  brand: string;
  modelNumber?: string;
  issueDescription: string;
  serviceType: 'lab_drop' | 'home_service';
  address: string;
  district: string;
  upazila: string;
  preferredDate: string;
  preferredTimeSlot: string;
  isUrgent: boolean;
  status: 'submitted' | 'diagnosing' | 'bonding_in_progress' | 'quality_testing' | 'ready_for_pickup' | 'completed';
  createdAt: string;
  estimatedCostRange: string;
  technicianAssigned?: string;
  technicianNotes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameBn: string;
  role: string;
  location: string;
  rating: number;
  deviceRepaired: string;
  comment: string;
  commentBn: string;
  date: string;
  verifiedRepair: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  contentBn: string[];
  readTime: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  category: 'bonding' | 'warranty' | 'service' | 'delivery' | 'payment';
}

export interface RepairGalleryItem {
  id: string;
  title: string;
  titleBn: string;
  deviceType: string; // e.g. "LED TV", "ইনভার্টার ফ্রিজ", "ইনভার্টার এসি", "স্মার্ট টিভি"
  brand: string;
  modelNumber?: string;
  problemDescription: string;
  problemDescriptionBn: string;
  solutionApplied: string;
  solutionAppliedBn: string;
  beforeImageUrl?: string;
  afterImageUrl: string;
  customerLocation: string;
  rating: number;
  turnaroundHours: number;
  isVerified: boolean;
  createdAt: string;
  likesCount?: number;
}

export type ViewName = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'services' 
  | 'service-booking' 
  | 'track' 
  | 'cart' 
  | 'checkout' 
  | 'order-success' 
  | 'about' 
  | 'contact' 
  | 'blog' 
  | 'blog-detail' 
  | 'faq' 
  | 'warranty' 
  | 'admin';
