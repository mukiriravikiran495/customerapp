import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { ColorValue, StyleSheet, View, ViewStyle } from 'react-native';

interface GradientBackgroundProps {
  children: ReactNode;
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]]; // tuple type
  style?: ViewStyle;
}

export default function GradientBackground({
  children,
  colors = ['#FFFFFF', '#FFFFFF'] as const, // 💡 cast as const tuple
  style,
}: GradientBackgroundProps) {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={colors} // ✅ now matches expected type
        style={StyleSheet.absoluteFillObject}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
