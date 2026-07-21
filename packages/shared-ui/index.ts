// Shared UI Primitives across Command Centre Web and Tauri Desktop apps
import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'indigo' | 'emerald' | 'amber' | 'rose';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'indigo' }) => {
  const styles = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[variant]}`}>
      {children}
    </span>
  );
};

export interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex items-center justify-between">
      <div>
        <p className="text-xs text-slate-400 font-medium">{title}</p>
        <h3 className="text-xl font-bold text-slate-100 mt-1">{value}</h3>
        {subtitle && <p className="text-[10px] text-emerald-400 mt-1">{subtitle}</p>}
      </div>
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>
      )}
    </div>
  );
};
