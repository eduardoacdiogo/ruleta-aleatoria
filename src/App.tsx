import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Wheel } from './components/Wheel';
import { OptionsPanel } from './components/OptionsPanel';
import { SpinButton } from './components/SpinButton';
import { WinnerModal } from './components/WinnerModal';
import { Header } from './components/Header';
import { useWheel } from './hooks/useWheel';

function App() {
  const { t } = useTranslation();
  const {
    options,
    isSpinning,
    winner,
    rotation,
    addOption,
    removeOption,
    updateOption,
    shuffleOptions,
    spin,
    clearWinner,
  } = useWheel();

  // Update page title based on language
  useEffect(() => {
    document.title = t('app.title');
  }, [t]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12">
          {/* Wheel Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <Wheel
              options={options}
              rotation={rotation}
              isSpinning={isSpinning}
            />

            <SpinButton
              onClick={spin}
              isSpinning={isSpinning}
              disabled={options.length < 2}
            />

            {options.length < 2 && (
              <p className="text-yellow-400 text-sm">
                {t('wheel.minOptions')}
              </p>
            )}
          </motion.div>

          {/* Options Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <OptionsPanel
              options={options}
              onAddOption={addOption}
              onRemoveOption={removeOption}
              onUpdateOption={updateOption}
              onShuffle={shuffleOptions}
              isSpinning={isSpinning}
            />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-white/40 text-sm"
        >
          <p>{t('app.footer')}</p>
        </motion.footer>
      </div>

      {/* Winner Modal */}
      <WinnerModal winner={winner} onClose={clearWinner} />
    </div>
  );
}

export default App;
