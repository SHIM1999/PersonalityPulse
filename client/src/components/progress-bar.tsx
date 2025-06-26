import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{label || '진행률'}</span>
        <span>{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div 
          className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
