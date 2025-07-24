import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Pressable,
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
        image: require('@/assets/images/movers1.jpg'),
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
        image: require('@/assets/images/movers2.jpg'),
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
        image: require('@/assets/images/movers3.jpg'),
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
        image: require('@/assets/images/movers4.jpg'),
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
        image: require('@/assets/images/movers1.jpg'),
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
            <FlatList
                data={vendors}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 10 }}
                ListHeaderComponent={
                     <View>
                        {/* Search bar */}
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

                        {/* Filter dropdowns */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.dropdownRow}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                        >
                            {filterKeys.map((key, index) => (
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
                    </View>
                }
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push('/bookingdetails')}
                        style={({ pressed }) => [
                            styles.cardTouchable,
                            pressed && styles.cardPressed,
                        ]}
                        >
                        <View style={styles.card}>
                            <View style={styles.imageContainer}>
                                <Image source={item.image} style={styles.image} resizeMode="cover" />
                            </View>

                            <View style={{ padding: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.vendorName}>{item.name}</Text>
                                    {item.verified && (
                                        <View style={styles.verifiedTag}>
                                            <Text style={{ color: 'white', fontSize: 10 }}>✔ Verified</Text>
                                        </View>
                                    )}
                                </View>

                                <Text style={styles.ratingText}>
                                    ⭐ {item.rating}  |  ({item.reviews} reviews)
                                </Text>

                                <View style={styles.priceRow}>
                                    {item.discount > 0 && (
                                        <Text style={styles.discountTag}>{item.discount}% OFF</Text>
                                    )}
                                    <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</Text>
                                    <Text style={styles.finalPrice}>₹{item.price.toLocaleString()}</Text>
                                </View>

                                <View style={styles.tagsContainer}>
                                    {item.services.slice(0, 3).map((service, i) => (
                                        <Text key={i} style={styles.tag}>{service}</Text>
                                    ))}
                                    {item.services.length > 3 && (
                                        <Text style={styles.moreTag}>+{item.services.length - 3} more</Text>
                                    )}
                                </View>

                                <View style={styles.greenTagsRow}>
                                    {item.features.slice(0, 2).map((feature, i) => (
                                        <Text key={i} style={styles.greenTag}>✓ {feature}</Text>
                                    ))}
                                    {item.features.length > 2 && (
                                        <Text style={styles.greenTag}>+{item.features.length - 2} more</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}
            />

            {/* Modal outside FlatList for dropdown filter */}
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
        paddingTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: height * 0.06,
        elevation: 3,
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
        marginTop: 15,
        marginBottom: 15,
    },
    dropdownButton: {
        backgroundColor: '#eee',
        paddingVertical: 3,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginRight: 10,
        height: 30,
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

    //added
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 3,

    },
    imageContainer: {
        width: '100%',
        height: 180,
        backgroundColor: '#ccc',

    },
    image: {
        width: '100%',
        height: '100%',
    },
    vendorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        flex: 1,
    },
    verifiedTag: {
        backgroundColor: '#28a745',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 5,
    },
    ratingText: {
        marginTop: 5,
        color: '#666',
        fontSize: 13,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    discountTag: {
        backgroundColor: '#dc3545',
        color: '#fff',
        paddingHorizontal: 6,
        fontSize: 12,
        borderRadius: 3,
        marginRight: 6,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#888',
        marginRight: 6,
    },
    finalPrice: {
        color: '#d32f2f',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    tag: {
        backgroundColor: '#eee',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 15,
        fontSize: 12,
        marginRight: 6,
        marginTop: 4,
    },
    moreTag: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
    greenTagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
    },
    greenTag: {
        backgroundColor: '#d4f4dd',
        color: '#1e7e34',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 15,
        fontSize: 12,
        marginRight: 6,
        marginTop: 4,
    },
    cardTouchable: {
        // Any base touchable style (if needed)
    },

    cardPressed: {
        opacity: 0.8, // Optional: adjust for click feedback
    },
});
