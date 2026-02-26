'use client';

import {
  HelpCircle,
  Shield,
  Info,
  User as UserIcon,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

const BantuanMenuSection = ({
  onOpenBantuan,
  onOpenPrivasi,
  onOpenTentang,
  onOpenPengembang,
}) => (
  <div>
    <p className='text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-2'>
      Bantuan & Info
    </p>
    <div className='bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col'>
      <button
        onClick={onOpenBantuan}
        className='w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-50 dark:border-slate-800'
      >
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-500 dark:text-blue-400'>
            <HelpCircle size={18} />
          </div>
          <span className='font-semibold text-slate-700 dark:text-slate-200 text-sm'>
            Bantuan & FAQ
          </span>
        </div>
        <ChevronRight
          size={16}
          className='text-slate-300 dark:text-slate-600'
        />
      </button>

      <button
        onClick={onOpenPrivasi}
        className='w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-50 dark:border-slate-800'
      >
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-500 dark:text-emerald-400'>
            <Shield size={18} />
          </div>
          <span className='font-semibold text-slate-700 dark:text-slate-200 text-sm'>
            Kebijakan Privasi
          </span>
        </div>
        <ChevronRight
          size={16}
          className='text-slate-300 dark:text-slate-600'
        />
      </button>

      <button
        onClick={onOpenTentang}
        className='w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-50 dark:border-slate-800'
      >
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-500 dark:text-purple-400'>
            <Info size={18} />
          </div>
          <span className='font-semibold text-slate-700 dark:text-slate-200 text-sm'>
            Tentang MyRamadhan
          </span>
        </div>
        <ChevronRight
          size={16}
          className='text-slate-300 dark:text-slate-600'
        />
      </button>

      <button
        onClick={onOpenPengembang}
        className='w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-50 dark:border-slate-800 group'
      >
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-500 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors'>
            <UserIcon size={18} />
          </div>
          <span className='font-semibold text-slate-700 dark:text-slate-200 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400'>
            Pengembang Aplikasi
          </span>
        </div>
        <ChevronRight
          size={16}
          className='text-slate-300 dark:text-slate-600'
        />
      </button>

      <a
        href='https://docs.google.com/forms/d/e/1FAIpQLSeB0TrSZDDrJ-xbmEjdiH5mV30Z4A28PFwSfAmTY0Y_qV265A/viewform?usp=publish-editor'
        target='_blank'
        rel='noreferrer'
        className='w-full flex items-center justify-between p-4 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-colors group'
      >
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors'>
            <MessageSquare size={18} />
          </div>
          <span className='font-semibold text-slate-700 dark:text-slate-200 text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400'>
            Kirim Feedback
          </span>
        </div>
        <ChevronRight
          size={16}
          className='text-slate-300 dark:text-slate-600'
        />
      </a>
    </div>
  </div>
);

export default BantuanMenuSection;
