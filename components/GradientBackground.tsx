import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function GradientBackground({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF']}
        style={StyleSheet.absoluteFillObject} // 💡 Full background
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
