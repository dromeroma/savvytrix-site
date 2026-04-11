export type ThemeMode = 'light' | 'dark' | 'fun';

export type PaletteId = 'tropical' | 'neon' | 'sunset' | 'ocean' | 'candy' | 'forest' | 'lava';

export interface Palette {
  id: PaletteId;
  label: string;
  primary: string;
  accent: string;
  bg: string;
}

export const PALETTES: Palette[] = [
  { id: 'tropical', label: 'Tropical', primary: '#FF6B6B', accent: '#4ECDC4', bg: '#FFF8F0' },
  { id: 'neon', label: 'Neon', primary: '#A855F7', accent: '#22D3EE', bg: '#0F0F23' },
  { id: 'sunset', label: 'Sunset', primary: '#F97316', accent: '#EC4899', bg: '#FFF7ED' },
  { id: 'ocean', label: 'Ocean', primary: '#0EA5E9', accent: '#06B6D4', bg: '#F0F9FF' },
  { id: 'candy', label: 'Candy', primary: '#EC4899', accent: '#8B5CF6', bg: '#FDF2F8' },
  { id: 'forest', label: 'Forest', primary: '#22C55E', accent: '#84CC16', bg: '#F0FDF4' },
  { id: 'lava', label: 'Lava', primary: '#EF4444', accent: '#F59E0B', bg: '#FEF2F2' },
];
