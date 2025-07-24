import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    ScrollView, StyleSheet, TextInput,
    TouchableOpacity,
    View
} from 'react-native';
const { width, height } = Dimensions.get('window');
export default function BookingDetails() {
const { vendorId } = useLocalSearchParams();
const [searchQuery, setSearchQuery] = useState('');
const router = useRouter();


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ paddingHorizontal: 10, marginBottom: 5 }}>
                            <View style={styles.searchContainer}>
                                <TouchableOpacity onPress={() => router.back()} style={styles.iconContainer}>
                                    <Ionicons name="arrow-back" size={22} color="#000" />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Search items"
                                    placeholderTextColor="#888"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                            </View>
                        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 15,
        height: height * 0.06,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        marginHorizontal: 10,
    },
    iconContainer: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
});
