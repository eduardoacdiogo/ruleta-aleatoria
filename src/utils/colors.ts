// Vibrant color palette for wheel segments
export const WHEEL_COLORS = [
  '#e74c3c', // Red
  '#3498db', // Blue
  '#2ecc71', // Green
  '#f39c12', // Orange
  '#9b59b6', // Purple
  '#1abc9c', // Teal
  '#e91e63', // Pink
  '#00bcd4', // Cyan
  '#ff5722', // Deep Orange
  '#8bc34a', // Light Green
  '#673ab7', // Deep Purple
  '#ffc107', // Amber
];

export const getColorForIndex = (index: number): string => {
  return WHEEL_COLORS[index % WHEEL_COLORS.length];
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};
