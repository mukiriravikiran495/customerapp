import { useColorScheme as rnUseColorScheme } from 'react-native';

export function useColorScheme(): 'light' | 'dark' | null {
  const scheme = rnUseColorScheme();
  return scheme ?? null;
}
