import { useState, useCallback, useRef } from 'react';
import { WheelOption } from '../types';
import { getColorForIndex, generateId } from '../utils/colors';

const DEFAULT_OPTIONS: WheelOption[] = [
  { id: generateId(), label: 'Opção 1', color: getColorForIndex(0) },
  { id: generateId(), label: 'Opção 2', color: getColorForIndex(1) },
  { id: generateId(), label: 'Opção 3', color: getColorForIndex(2) },
  { id: generateId(), label: 'Opção 4', color: getColorForIndex(3) },
  { id: generateId(), label: 'Opção 5', color: getColorForIndex(4) },
  { id: generateId(), label: 'Opção 6', color: getColorForIndex(5) },
  { id: generateId(), label: 'Opção 7', color: getColorForIndex(6) },
];

export const useWheel = () => {
  const [options, setOptions] = useState<WheelOption[]>(DEFAULT_OPTIONS);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<WheelOption | null>(null);
  const [rotation, setRotation] = useState(0);
  const spinTimeoutRef = useRef<number | null>(null);

  const addOption = useCallback((label: string) => {
    if (label.trim()) {
      const newOption: WheelOption = {
        id: generateId(),
        label: label.trim(),
        color: getColorForIndex(options.length),
      };
      setOptions((prev) => [...prev, newOption]);
    }
  }, [options.length]);

  const removeOption = useCallback((id: string) => {
    setOptions((prev) => {
      const filtered = prev.filter((opt) => opt.id !== id);
      // Recolor remaining options
      return filtered.map((opt, index) => ({
        ...opt,
        color: getColorForIndex(index),
      }));
    });
  }, []);

  const updateOption = useCallback((id: string, label: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, label } : opt))
    );
  }, []);

  const shuffleOptions = useCallback(() => {
    setOptions((prev) => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return shuffled.map((opt, index) => ({
        ...opt,
        color: getColorForIndex(index),
      }));
    });
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || options.length < 2) return;

    setIsSpinning(true);
    setWinner(null);

    // Filter out options with "Diogo" (case insensitive)
    const eligibleOptions = options.filter(
      (opt) => !opt.label.toLowerCase().includes('diogo')
    );

    // If all options are "Diogo", don't spin
    if (eligibleOptions.length === 0) {
      setIsSpinning(false);
      return;
    }

    // Select random winner from eligible options
    const winnerIndex = Math.floor(Math.random() * eligibleOptions.length);
    const selectedWinner = eligibleOptions[winnerIndex];

    // Find the actual index in the original options array
    const actualIndex = options.findIndex((opt) => opt.id === selectedWinner.id);

    const segmentAngle = 360 / options.length;

    // The wheel segments start at -90° (top).
    // Segment 0: from -90° to -90° + segmentAngle
    // Segment N: from -90° + N*segmentAngle to -90° + (N+1)*segmentAngle
    //
    // The pointer is at the RIGHT (0° in standard coordinates).
    // When we rotate the wheel by R degrees (CSS transform),
    // a point that was at angle A is now at angle A + R.
    //
    // For the pointer (at 0°) to point at segment N's center,
    // we need: segmentCenter + R ≡ 0° (mod 360)
    // Where segmentCenter = -90 + N*segmentAngle + segmentAngle/2
    // So: R = -segmentCenter = 90 - N*segmentAngle - segmentAngle/2

    const segmentCenter = -90 + actualIndex * segmentAngle + segmentAngle / 2;
    const baseRotation = -segmentCenter;

    // Add multiple full spins (5-7 rotations)
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const finalRotation = fullSpins * 360 + baseRotation;

    setRotation(finalRotation);

    // Set winner after animation completes
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
    }

    spinTimeoutRef.current = window.setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedWinner);
    }, 5000); // Match animation duration
  }, [isSpinning, options]);

  const clearWinner = useCallback(() => {
    setWinner(null);
  }, []);

  return {
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
  };
};
