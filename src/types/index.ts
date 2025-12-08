export interface WheelOption {
  id: string;
  label: string;
  color: string;
}

export interface WheelState {
  options: WheelOption[];
  isSpinning: boolean;
  winner: WheelOption | null;
  rotation: number;
}
