import React, { useState } from 'react';
import {
  PackageCheck,
  Search,
  Wrench,
  Activity,
  CheckCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Info,
  ChevronRight
} from 'lucide-react';

export type RepairStepId = 'received' | 'diagnosing' | 'repairing' | 'testing' | 'ready';

export interface RepairStep {
  id: RepairStepId;
  index: number;
  label: string;
  labelEn: string;
  subLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  details: string[];
  estimatedDuration: string;
  equipment: string;
}

export const REPAIR_STEPS: RepairStep[] = [
  {
    id: 'received',
    index: 0,
    label: 'রিসিভড',
    labelEn: 'Received',
    subLabel: 'ডিভাইস জমা ও নিবন্ধন',
    icon: PackageCheck,
    description: 'ডিভাইসটি MM ELECTROLAB কাউন্টারে সফলভাবে গ্রহণ করা হয়েছে এবং ডিজিটাল সার্ভিস টোকেন তৈরি হয়েছে।',
    details: [
      'ডিভাইসের বাহ্যিক কন্ডিশন ও মডেল নম্বর রেকর্ড',
      'গ্রাহকের বর্ণিত সমস্যার ডিজিটাল এন্ট্রি',
      'সুরক্ষিত ল্যাব শেলফে ইনভেন্টরি ট্যাগিং'
    ],
    estimatedDuration: 'তাৎক্ষণিক (১০-১৫ মিনিট)',
    equipment: 'ডিজিটাল বারকোড ও ইনভেন্টরি রেজিস্টার'
  },
  {
    id: 'diagnosing',
    index: 1,
    label: 'ডায়াগনোসিস',
    labelEn: 'Diagnosing',
    subLabel: 'ল্যাব ফল্ট অ্যানালাইসিস',
    icon: Search,
    description: 'BTEB সার্টিফাইড ল্যাব টেকনিশিয়ান ডিজিটাল অসিলোস্কোপ ও মাল্টিমিটার দিয়ে নিখুঁতভাবে ত্রুটি শনাক্ত করছেন।',
    details: [
      'পাওয়ার সাপ্লাই, ব্যাকলাইট ও ইনভার্টার ভোল্টেজ পরীক্ষা',
      'COF/TAB রিবন মাইক্রোস্কোপিক পরিদর্শন',
      'আইসি ও সার্কিট শর্ট সার্কিট ডিটেকশন'
    ],
    estimatedDuration: '১-২ ঘণ্টা',
    equipment: 'ডিজিটাল স্টোরেজ অসিলোস্কোপ ও ফ্লুক মাল্টিমিটার'
  },
  {
    id: 'repairing',
    index: 2,
    label: 'রিপেয়ারিং',
    labelEn: 'Repairing',
    subLabel: 'বন্ডিং ও পার্টস প্রতিস্থাপন',
    icon: Wrench,
    description: 'জাপানি পালস-হিট COF বন্ডিং মেশিন বা অরিজিনাল কম্পোনেন্ট দিয়ে মাইক্রো-প্রিসিশন রিপেয়ার কাজ চলছে।',
    details: [
      'অরিজিনাল জাপানি এসিএফ (ACF) কন্ডাক্টিভ ফিল্ম প্রয়োগ',
      'লেজার অপটিক্যাল অ্যালাইনমেন্ট ও পালস-হিট বন্ডিং',
      'অরিজিনাল ইনভার্টার আইসি / গ্যাস চার্জিং সম্পাদন'
    ],
    estimatedDuration: '২-৪ ঘণ্টা',
    equipment: 'জাপানি অটোমেটিক পালস-হিট লেজার বন্ডিং মেশিন'
  },
  {
    id: 'testing',
    index: 3,
    label: 'টেস্টিং',
    labelEn: 'Testing',
    subLabel: 'কোয়ালিটি ও স্ট্রেস টেস্ট',
    icon: Activity,
    description: 'মেরামতকৃত ডিভাইসে একটানা বার্ন-ইন কোয়ালিটি টেস্ট ও পিকচার ক্ল্যারিটি পরীক্ষা করা হচ্ছে।',
    details: [
      'RGB কালার ব্যালেন্স ও পিক্সেল স্ট্রেস টেস্ট',
      'ভোল্টেজ ফ্ল্যাকচুয়েশন প্রতিরোধ ক্ষমতা যাচাই',
      'থার্মাল ক্যামেরা দিয়ে তাপমাত্রা পর্যবেক্ষণ'
    ],
    estimatedDuration: '২-৩ ঘণ্টা (বার্ন-ইন রান)',
    equipment: 'ভিডিও প্যাটার্ন জেনারেটর ও থার্মাল ইমেজার'
  },
  {
    id: 'ready',
    index: 4,
    label: 'রেডি',
    labelEn: 'Ready',
    subLabel: 'ডেলিভারির জন্য প্রস্তুত',
    icon: CheckCheck,
    description: 'ডিভাইসটি সম্পূর্ণ ঠিকঠাক! ১৮০ দিনের ডিজিটাল ওয়ারেন্টি কার্ড সহ হস্তান্তরের জন্য পুরোপুরি প্রস্তুত।',
    details: [
      'ল্যাব চিফ ইঞ্জিনিয়ার ফাইনাল কোয়ালিটি সাইন-অফ',
      '১৮০ দিনের ডিজিটাল ওয়ারেন্টি সিল ও কিউআর কোড',
      'অ্যান্টি-স্ট্যাটিক বাবল র‍্যাপে নিরাপদ প্যাকেজিং'
    ],
    estimatedDuration: 'প্রস্তুত (একই দিনে ডেলিভারি)',
    equipment: 'প্রটেক্টিভ প্যাকিং ও ওয়ারেন্টি ম্যানেজমেন্ট'
  }
];

export const mapStatusToStepIndex = (status?: string): number => {
  if (!status) return 0;
  const s = status.toLowerCase();
  if (s === 'received' || s === 'submitted') return 0;
  if (s === 'diagnosing' || s === 'diagnosis' || s === 'processing') return 1;
  if (s === 'repairing' || s === 'bonding_in_progress' || s === 'repair' || s === 'shipped') return 2;
  if (s === 'testing' || s === 'quality_testing') return 3;
  if (s === 'ready' || s === 'ready_for_pickup' || s === 'completed' || s === 'delivered') return 4;
  return 0;
};

interface RepairProgressStepperProps {
  status: string;
  trackingId?: string;
  deviceTitle?: string;
  technicianNotes?: string;
  className?: string;
  showDetails?: boolean;
}

export const RepairProgressStepper: React.FC<RepairProgressStepperProps> = ({
  status,
  trackingId,
  deviceTitle,
  technicianNotes,
  className = '',
  showDetails = true
}) => {
  const currentStepIndex = mapStatusToStepIndex(status);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(currentStepIndex);

  // Sync selected step when status prop updates
  React.useEffect(() => {
    setSelectedStepIndex(currentStepIndex);
  }, [currentStepIndex]);

  const activeStepData = REPAIR_STEPS[selectedStepIndex] || REPAIR_STEPS[currentStepIndex];
  const progressPercentage = (currentStepIndex / (REPAIR_STEPS.length - 1)) * 100;

  return (
    <div
      className={`rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm p-4 sm:p-6 transition-all ${className}`}
    >
      {/* Header Info Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-[#1F2937]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/50">
              <Sparkles className="w-3 h-3" />
              <span>Lab Service Lifecycle</span>
            </span>
            {trackingId && (
              <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                #{trackingId}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white mt-1">
            {deviceTitle ? `${deviceTitle} — সার্ভিস প্রগ্রেস` : 'সার্ভিস ও রিপেয়ার অগ্রগতি ট্র্যাকার'}
          </h3>
        </div>

        {/* Current status pill */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
              বর্তমান ল্যাব পর্যায়
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-700 dark:text-cyan-400 flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{REPAIR_STEPS[currentStepIndex].labelEn} ({REPAIR_STEPS[currentStepIndex].label})</span>
            </span>
          </div>
        </div>
      </div>

      {/* Visual Stepper Track (Desktop / Tablet) */}
      <div className="py-7 px-2 sm:px-4">
        {/* Track Line */}
        <div className="relative">
          {/* Background track line */}
          <div className="absolute left-6 right-6 top-5 -translate-y-1/2 h-1.5 bg-slate-200 dark:bg-[#1F2937] rounded-full z-0" />

          {/* Active progress fill line */}
          <div
            className="absolute left-6 top-5 -translate-y-1/2 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-full transition-all duration-700 ease-out z-0 shadow-xs"
            style={{
              width: `calc(${progressPercentage}% * (100% - 48px) / 100)`
            }}
          />

          {/* Stepper Nodes */}
          <div className="relative z-10 flex items-start justify-between">
            {REPAIR_STEPS.map((step) => {
              const isCompleted = currentStepIndex > step.index;
              const isCurrent = currentStepIndex === step.index;
              const isSelected = selectedStepIndex === step.index;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setSelectedStepIndex(step.index)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none transition-all duration-200 max-w-[70px] sm:max-w-[100px]"
                  title={`পর্যায় ${step.index + 1}: ${step.labelEn} (${step.label}) - বিস্তারিত দেখতে ক্লিক করুন`}
                >
                  {/* Step Circle with Icon */}
                  <div className="relative">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                        isCompleted
                          ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-emerald-500/25 ring-2 ring-emerald-500/20'
                          : isCurrent
                          ? 'bg-blue-600 dark:bg-cyan-500 text-white shadow-blue-500/35 ring-4 ring-blue-500/25 dark:ring-cyan-500/25 scale-110'
                          : 'bg-slate-100 dark:bg-[#090D16] text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-[#1F2937] group-hover:border-slate-400 dark:group-hover:border-slate-600'
                      } ${isSelected && !isCurrent ? 'ring-2 ring-blue-400' : ''}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      ) : (
                        <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>

                    {/* Pulsing indicator for active step */}
                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                      </span>
                    )}
                  </div>

                  {/* Labels */}
                  <div className="mt-2.5 text-center flex flex-col items-center">
                    <span
                      className={`text-xs sm:text-xs font-bold leading-tight transition-colors ${
                        isCurrent
                          ? 'text-blue-600 dark:text-cyan-400 font-black'
                          : isCompleted
                          ? 'text-slate-800 dark:text-slate-200'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {step.labelEn}
                    </span>
                    <span
                      className={`text-[10px] sm:text-[11px] font-medium leading-tight mt-0.5 truncate hidden sm:block ${
                        isCurrent
                          ? 'text-blue-700 dark:text-cyan-300'
                          : isCompleted
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>

                    {/* Mini Status Tag */}
                    <span
                      className={`mt-1 text-[9px] px-1.5 py-0.2 rounded-md font-mono font-semibold hidden md:inline-block ${
                        isCompleted
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                          : isCurrent
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-300 animate-pulse'
                          : 'bg-slate-100 dark:bg-[#1F2937]/50 text-slate-400'
                      }`}
                    >
                      {isCompleted ? 'Done' : isCurrent ? 'Active' : 'Pending'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Step Deep-Dive Card */}
      {showDetails && activeStepData && (
        <div className="mt-2 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-[#1F2937] animate-in fade-in duration-200 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-[#1F2937]">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-xs ${
                  currentStepIndex > activeStepData.index
                    ? 'bg-emerald-600'
                    : currentStepIndex === activeStepData.index
                    ? 'bg-blue-600 dark:bg-cyan-500'
                    : 'bg-slate-400 dark:bg-slate-700'
                }`}
              >
                {activeStepData.index + 1}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>
                    পর্যায় {activeStepData.index + 1}: {activeStepData.labelEn} — {activeStepData.subLabel}
                  </span>
                  {currentStepIndex === activeStepData.index && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-cyan-300 font-bold">
                      বর্তমানে চলমান
                    </span>
                  )}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activeStepData.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono shrink-0">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>{activeStepData.estimatedDuration}</span>
              </span>
            </div>
          </div>

          {/* Checklist of Protocols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>ল্যাব প্রোটোকল ও যাচাইকরণ তালিকা:</span>
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {activeStepData.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between rounded-xl p-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937]">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">
                  ব্যবহৃত ল্যাব ইনস্ট্রুমেন্ট
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                  {activeStepData.equipment}
                </span>
              </div>
              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-[#1F2937] flex items-center justify-between text-[11px]">
                <span className="text-slate-400">টেকনিক্যাল স্ট্যান্ডার্ড:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  BTEB & OEM সার্টিফাইড
                </span>
              </div>
            </div>
          </div>

          {/* Technician Notes if available */}
          {technicianNotes && currentStepIndex === activeStepData.index && (
            <div className="mt-3 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-blue-900 dark:text-cyan-300 text-[11px] block">
                  ল্যাব ইঞ্জিনিয়ার লাইভ নোট:
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed mt-0.5">
                  {technicianNotes}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
