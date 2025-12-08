import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex justify-end mb-4">
        <LanguageSelector />
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </div>
        <p className="text-white/60 text-lg">
          {t('app.subtitle')}
        </p>
      </div>
    </motion.header>
  );
};
