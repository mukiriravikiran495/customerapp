import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function rechargewallet() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Welcome to React Native!</Text>
      <Text>Start building your app 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
