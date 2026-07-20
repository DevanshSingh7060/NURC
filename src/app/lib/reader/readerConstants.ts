import type { ReaderSettings } from '../../components/ReaderModeContext';

/** Color maps for the three Reading Comfort Modes (independent of layout themes). */
export const readingModeColors = {
  default: { bg: '#FAF9F6', text: '#1F2937', card: '#FFFFFF', border: '#E5E7EB', muted: '#4B5563' },
  night: { bg: '#F4EAD7', text: '#3D352A', card: '#FAF4EB', border: '#EADFCB', muted: '#7A6D5C' },
  dark: { bg: '#111111', text: '#F5F5F5', card: '#1C1C1E', border: '#2C2C2E', muted: '#8E8E93' },
};

export const fontSizeMap: Record<ReaderSettings['fontSize'], string> = {
  small: '15px',
  medium: '17px',
  large: '19px',
};

/** Line spacing is locked to standard/default (controls removed from the UI). */
export const readerLineHeight = '1.65';
