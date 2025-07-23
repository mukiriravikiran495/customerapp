import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Dummy vendor data
const vendors = [
  { id: '1', name: 'Fast Movers', price: 1200, rating: 4.5 },
  { id: '2', name: 'Quick Shift', price: 1500, rating: 4.2 },
  { id: '3', name: 'Pack & Go', price: 1000, rating: 4.8 },
];

const VendorsScreen = () => {
  const renderItem = ({ item }: { item: typeof vendors[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>Price: ₹{item.price}</Text>
      <Text style={styles.details}>Rating: ⭐ {item.rating}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Vendors</Text>
      <FlatList
        data={vendors}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default VendorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
