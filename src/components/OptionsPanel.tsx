import { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Plus,
  Trash2,
  Shuffle,
  Settings,
  Palette,
  X,
  GripVertical,
} from 'lucide-react';
import { WheelOption } from '../types';

interface OptionsPanelProps {
  options: WheelOption[];
  onAddOption: (label: string) => void;
  onRemoveOption: (id: string) => void;
  onUpdateOption: (id: string, label: string) => void;
  onShuffle: () => void;
  isSpinning: boolean;
}

export const OptionsPanel = ({
  options,
  onAddOption,
  onRemoveOption,
  onUpdateOption,
  onShuffle,
  isSpinning,
}: OptionsPanelProps) => {
  const { t } = useTranslation();
  const [newOption, setNewOption] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOption = () => {
    if (newOption.trim()) {
      onAddOption(newOption);
      setNewOption('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddOption();
    }
  };

  const handleEditKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    id: string,
    value: string
  ) => {
    if (e.key === 'Enter') {
      onUpdateOption(id, value);
      setEditingId(null);
    }
    if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass rounded-2xl overflow-hidden w-80"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-white" />
          <h2 className="text-white font-bold">{t('options.title')}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onShuffle}
            disabled={isSpinning || options.length < 2}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={t('options.shuffle')}
          >
            <Shuffle className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Palette className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Add new option */}
            <div className="p-4 border-b border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('options.newPlaceholder')}
                  disabled={isSpinning}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                />
                <button
                  onClick={handleAddOption}
                  disabled={isSpinning || !newOption.trim()}
                  className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Options list */}
            <div className="p-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {options.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 mb-2 group"
                  >
                    <GripVertical className="w-4 h-4 text-white/30 cursor-grab" />
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: option.color }}
                    />
                    {editingId === option.id ? (
                      <input
                        type="text"
                        defaultValue={option.label}
                        autoFocus
                        onBlur={(e) => {
                          onUpdateOption(option.id, e.target.value);
                          setEditingId(null);
                        }}
                        onKeyDown={(e) =>
                          handleEditKeyDown(
                            e,
                            option.id,
                            (e.target as HTMLInputElement).value
                          )
                        }
                        className="flex-1 px-2 py-1 rounded bg-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <span
                        className="flex-1 text-white text-sm cursor-pointer hover:text-purple-300 transition-colors truncate"
                        onClick={() => !isSpinning && setEditingId(option.id)}
                      >
                        {option.label}
                      </span>
                    )}
                    <button
                      onClick={() => onRemoveOption(option.id)}
                      disabled={isSpinning || options.length <= 2}
                      className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500/30 transition-all disabled:opacity-0 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{t('options.total', { count: options.length })}</span>
                <span>{t('options.min')}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
