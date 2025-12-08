import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { Trophy, X, PartyPopper } from 'lucide-react';
import { WheelOption } from '../types';

interface WinnerModalProps {
  winner: WheelOption | null;
  onClose: () => void;
}

export const WinnerModal = ({ winner, onClose }: WinnerModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (winner) {
      // Trigger confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [winner]);

  return (
    <AnimatePresence>
      {winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="relative glass rounded-3xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Trophy icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', damping: 10 }}
              className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/30"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>

            {/* Confetti icons */}
            <div className="flex justify-center gap-4 mb-4">
              <motion.div
                animate={{ rotate: [-10, 10, -10], y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <PartyPopper className="w-8 h-8 text-pink-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: [10, -10, 10], y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
              >
                <PartyPopper className="w-8 h-8 text-purple-400 scale-x-[-1]" />
              </motion.div>
            </div>

            {/* Winner text */}
            <h2 className="text-2xl font-bold text-white mb-2">{t('winner.title')}</h2>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div
                className="text-4xl font-bold py-4 px-6 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${winner.color}40, ${winner.color}80)`,
                  border: `3px solid ${winner.color}`,
                }}
              >
                <span className="text-white drop-shadow-lg">{winner.label}</span>
              </div>
            </motion.div>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              {t('winner.spinAgain')}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
