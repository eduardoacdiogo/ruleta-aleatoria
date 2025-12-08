import { motion } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SpinButtonProps {
  onClick: () => void;
  isSpinning: boolean;
  disabled: boolean;
}

export const SpinButton = ({ onClick, isSpinning, disabled }: SpinButtonProps) => {
  const { t } = useTranslation();

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isSpinning}
      whileHover={{ scale: disabled || isSpinning ? 1 : 1.05 }}
      whileTap={{ scale: disabled || isSpinning ? 1 : 0.95 }}
      className={`
        relative px-12 py-4 rounded-full font-bold text-xl text-white
        bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500
        shadow-lg shadow-purple-500/30
        disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden
        transition-all duration-300
        ${!disabled && !isSpinning ? 'hover:shadow-xl hover:shadow-purple-500/50' : ''}
      `}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
        animate={{
          backgroundPosition: isSpinning ? ['0% 50%', '100% 50%'] : '0% 50%',
        }}
        transition={{
          duration: 1,
          repeat: isSpinning ? Infinity : 0,
          ease: 'linear',
        }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Content */}
      <span className="relative flex items-center gap-3">
        {isSpinning ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>{t('wheel.spinning')}</span>
          </>
        ) : (
          <>
            <Play className="w-6 h-6" />
            <span>{t('wheel.spin')}</span>
          </>
        )}
      </span>

      {/* Shine effect */}
      {!isSpinning && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      )}
    </motion.button>
  );
};
