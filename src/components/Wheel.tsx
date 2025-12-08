import { useMemo } from 'react';
import { WheelOption } from '../types';

interface WheelProps {
  options: WheelOption[];
  rotation: number;
  isSpinning: boolean;
}

export const Wheel = ({ options, rotation, isSpinning }: WheelProps) => {
  const wheelSize = 400;
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const radius = wheelSize / 2 - 10;

  const segments = useMemo(() => {
    if (options.length === 0) return [];

    const segmentAngle = 360 / options.length;

    return options.map((option, index) => {
      const startAngle = index * segmentAngle - 90; // Start from top
      const endAngle = startAngle + segmentAngle;

      // Convert to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      // Calculate path
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);

      const largeArc = segmentAngle > 180 ? 1 : 0;

      const pathD = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');

      // Text position (middle of segment)
      const midAngle = startAngle + segmentAngle / 2;
      const midRad = (midAngle * Math.PI) / 180;
      const textRadius = radius * 0.65;
      const textX = centerX + textRadius * Math.cos(midRad);
      const textY = centerY + textRadius * Math.sin(midRad);

      return {
        ...option,
        pathD,
        textX,
        textY,
        textRotation: midAngle + 90,
      };
    });
  }, [options, centerX, centerY, radius]);

  return (
    <div className="relative">
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, #9333ea, #ec4899, #f59e0b, #22c55e, #3b82f6, #9333ea)',
          filter: 'blur(20px)',
          opacity: 0.5,
          transform: 'scale(1.1)',
        }}
      />

      {/* Wheel container */}
      <div
        className="relative"
        style={{
          width: wheelSize,
          height: wheelSize,
        }}
      >
        {/* Wheel SVG */}
        <svg
          width={wheelSize}
          height={wheelSize}
          className="drop-shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
              : 'none',
          }}
        >
          {/* Outer ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 5}
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="8"
          />

          {/* Segments */}
          {segments.map((segment) => (
            <g key={segment.id}>
              <path
                d={segment.pathD}
                fill={segment.color}
                stroke="#fff"
                strokeWidth="2"
                className="drop-shadow-md"
              />
              <text
                x={segment.textX}
                y={segment.textY}
                transform={`rotate(${segment.textRotation}, ${segment.textX}, ${segment.textY})`}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontWeight="bold"
                fontSize={options.length > 8 ? '12' : '14'}
                className="wheel-text select-none"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                {segment.label.length > 12
                  ? segment.label.substring(0, 12) + '...'
                  : segment.label}
              </text>
            </g>
          ))}

          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={40}
            fill="url(#centerGradient)"
            stroke="#fff"
            strokeWidth="4"
            className="drop-shadow-lg"
          />

          {/* Inner shine */}
          <circle
            cx={centerX - 10}
            cy={centerY - 10}
            r={15}
            fill="rgba(255,255,255,0.3)"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <radialGradient id="centerGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
          </defs>
        </svg>

        {/* Pointer */}
        <div
          className="absolute top-1/2 -right-4 -translate-y-1/2"
          style={{ zIndex: 10 }}
        >
          <svg width="50" height="40" viewBox="0 0 50 40">
            <defs>
              <linearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="pointerShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.5" />
              </filter>
            </defs>
            <polygon
              points="50,20 10,0 10,40"
              fill="url(#pointerGradient)"
              stroke="#fff"
              strokeWidth="2"
              filter="url(#pointerShadow)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
