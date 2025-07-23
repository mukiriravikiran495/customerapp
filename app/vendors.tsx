import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    FlatList, Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
type DropdownKey = 'Rating' | 'Price' | 'Services' | 'Vehicle' | 'Sort';
const filterOptions: Record<DropdownKey, string[]> = {
    Rating: ['4.0+', '4.5+', '5.0'],
    Price: ['Low to High', 'High to Low'],
    Services: ['Packing', 'Loading', 'Unpacking'],
    Vehicle: ['Truck', 'Mini Truck', 'Tempo'],
    Sort: ['Recommended', 'Fastest', 'Cheapest'],
};


// Dummy vendor data
const vendors = [
    {
        id: 1,
        name: "Swift Movers & Packers",
        rating: 4.8,
        reviews: 1250,
        price: 12500,
        originalPrice: 15000,
        deliveryTime: "Same Day",
        image: "/icons/movers1.jpg",
        vehicleType: "Truck",
        services: [
            "Packing",
            "Loading",
            "Transportation",
            "Unpacking",
            "Insurance",
        ],
        verified: true,
        discount: 17,
        features: ["Free Cancellation", "Live Tracking", "Professional Team"],
    },
    {
        id: 2,
        name: "Premier Relocations",
        rating: 4.6,
        reviews: 890,
        price: 11200,
        originalPrice: 14000,
        deliveryTime: "Next Day",
        image: "/icons/movers2.jpg",
        vehicleType: "Mini Truck",
        services: ["Packing", "Loading", "Transportation", "Insurance"],
        verified: true,
        discount: 20,
        features: ["Trained Staff", "Quality Packaging", "Door to Door"],
    },
    {
        id: 3,
        name: "Safe Move Express",
        rating: 4.9,
        reviews: 2100,
        price: 13800,
        originalPrice: 16000,
        deliveryTime: "Same Day",
        image: "/icons/movers3.jpg",
        vehicleType: "Large Truck",
        services: [
            "Packing",
            "Loading",
            "Transportation",
            "Unpacking",
            "Insurance",
            "Storage",
        ],
        verified: true,
        discount: 14,
        features: ["Premium Insurance", "24/7 Support", "GPS Tracking"],
    },
    {
        id: 4,
        name: "Quick Shift Logistics",
        rating: 4.5,
        reviews: 670,
        price: 10500,
        originalPrice: 12000,
        deliveryTime: "Next Day",
        image: "/icons/movers4.jpg",
        vehicleType: "Tempo",
        services: ["Packing", "Loading", "Transportation"],
        verified: false,
        discount: 13,
        features: ["Budget Friendly", "Quick Service", "Local Experts"],
    },
    {
        id: 5,
        name: "Elite Packers & Movers",
        rating: 4.7,
        reviews: 1500,
        price: 15200,
        originalPrice: 18000,
        deliveryTime: "Same Day",
        image: "/icons/movers1.jpg",
        vehicleType: "Container",
        services: [
            "Packing",
            "Loading",
            "Transportation",
            "Unpacking",
            "Insurance",
            "Assembly",
        ],
        verified: true,
        discount: 16,
        features: ["Premium Service", "White Glove"],
    },
];




const VendorsScreen = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const filterKeys: DropdownKey[] = ['Rating', 'Price', 'Services', 'Vehicle', 'Sort'];
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
    const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
    const toggleDropdown = (key: DropdownKey) => {
        setActiveDropdown(activeDropdown === key ? null : key);
    };

    const selectFilter = (key: string, value: string) => {
        setSelectedFilters(prev => ({ ...prev, [key]: value }));
        setActiveDropdown(null); // Use null instead of ''
    };

    return (
        <SafeAreaView style={styles.screen}>
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

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.dropdownRow}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            >
                {(Object.keys(filterOptions) as DropdownKey[]).map((key, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.dropdownButton}
                        onPress={() => toggleDropdown(key)}
                    >
                        <Text style={styles.dropdownText}>
                            {key}: {selectedFilters[key] || 'All'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Modal for dropdown */}
            <Modal
                transparent
                visible={!!activeDropdown}
                animationType="fade"
                onRequestClose={() => setActiveDropdown(null)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setActiveDropdown(null)}
                    activeOpacity={1}
                >
                    {activeDropdown && (
                        <View style={styles.modalContent}>
                            <FlatList
                                data={filterOptions[activeDropdown]}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => selectFilter(activeDropdown, item)}
                                        style={styles.modalItem}
                                    >
                                        <Text style={styles.modalItemText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>



    );
};

export default VendorsScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingTop: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 15,
        height: height * 0.06,
        
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
    dropdownRow: {
        marginTop: 10,
        marginBottom: 8,
    },
    dropdownButton: {
        backgroundColor: '#eee',
        paddingVertical: 3,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginRight: 10,
        height:30,
    },
    dropdownText: {
        fontSize: 14,
        color: '#000000',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        maxHeight: '60%',
    },
    modalItem: {
        paddingVertical: 10,
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
});
