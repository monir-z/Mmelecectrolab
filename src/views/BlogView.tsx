import React, { useState } from 'react';
import { ViewName, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blog';
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  BookOpen,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface BlogViewProps {
  onNavigate: (view: ViewName) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { showToast } = useToast();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('লিঙ্ক কপি করা হয়েছে!', 'info');
    }
  };

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20">
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-cyan-400 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল গাইডে ফিরে যান</span>
        </button>

        <article className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900">
              {selectedPost.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{selectedPost.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{selectedPost.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>{selectedPost.author}</span>
            </div>
            <button onClick={handleShare} className="ml-auto text-slate-400 dark:text-slate-500 hover:text-blue-700 dark:hover:text-cyan-400 cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white leading-snug">
            {selectedPost.titleBn}
          </h1>

          <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm flex flex-col gap-4">
            {selectedPost.contentBn.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between mt-6">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block text-xs">আপনার কি একই সমস্যা রয়েছে?</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">আমাদের ল্যাব টেকনিশিয়ানের সাথে সরাসরি কথা বলতে পারেন</span>
            </div>
            <button
              onClick={() => onNavigate('service-booking')}
              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
            >
              বুকিং দিন
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 flex flex-col gap-10">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
          Technical Guides & Maintenance Blog
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mt-1">
          ইলেকট্রনিক্স যত্ন ও মেরামত সহায়িকা
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          টিভি ডিসপ্লে কেন নষ্ট হয়, ইনভার্টার ফ্রিজের বিদ্যুৎ সাশ্রয়ী ব্যবহার ও বজ্রপাত থেকে সার্কিট রক্ষার উপায়।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-3">
                <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-cyan-400 uppercase bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
              </div>

              <h3
                onClick={() => setSelectedPost(post)}
                className="text-base font-bold font-heading text-slate-900 dark:text-white hover:text-blue-700 dark:hover:text-cyan-400 transition-colors cursor-pointer leading-snug line-clamp-2"
              >
                {post.titleBn}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                {post.excerptBn}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 dark:text-slate-500">{post.date}</span>

              <button
                onClick={() => setSelectedPost(post)}
                className="text-xs font-bold text-blue-700 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>সম্পূর্ণ পড়ুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
