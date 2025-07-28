import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const categories = [
    { id: "furniture", name: "Furniture", icon: "🪑" },
    { id: "electronics", name: "Electronics", icon: "📺" },
    { id: "kitchen", name: "Kitchen Items", icon: "🍽️" },
    { id: "clothes", name: "Clothes", icon: "👕" },
    { id: "books", name: "Books", icon: "📚" },
    { id: "appliances", name: "Appliances", icon: "🔌" },
    { id: "decorative", name: "Decorative", icon: "🎨" },
    { id: "sports", name: "Sports", icon: "⚽" },
];

type CategoryKey = 'furniture' | 'electronics' | 'kitchen';

interface Item {
    id: number;
    name: string;
    image: string;
    category: CategoryKey;
}

const items: Record<CategoryKey, Item[]> = {
    furniture: [
        {
            id: 1,
            name: "Sofa Set",
            image:
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
            category: "furniture",
        },
        {
            id: 2,
            name: "Dining Table",
            image:
                "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop",
            category: "furniture",
        },
        {
            id: 3,
            name: "Bed",
            image:
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop",
            category: "furniture",
        },
        {
            id: 4,
            name: "Wardrobe",
            image:
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
            category: "furniture",
        },
        {
            id: 5,
            name: "Coffee Table",
            image:
                "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop",
            category: "furniture",
        },
        {
            id: 6,
            name: "Bookshelf",
            image:
                "https://images.unsplash.com/photo-1562113530-57ba12c1c9a4?w=200&h=200&fit=crop",
            category: "furniture",
        },
        {
            id: 17,
            name: "Television",
            image:
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
            category: "electronics",
        },
    ],
    electronics: [
        {
            id: 7,
            name: "Television",
            image:
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
            category: "electronics",
        },
        {
            id: 8,
            name: "Refrigerator",
            image:
                "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200&h=200&fit=crop",
            category: "electronics",
        },
        {
            id: 9,
            name: "Washing Machine",
            image:
                "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
            category: "electronics",
        },
        {
            id: 10,
            name: "Laptop",
            image:
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
            category: "electronics",
        },
        {
            id: 11,
            name: "Microwave",
            image:
                "https://images.unsplash.com/photo-1574269909862-7e1d70bb8aa3?w=200&h=200&fit=crop",
            category: "electronics",
        },
        {
            id: 12,
            name: "Air Conditioner",
            image:
                "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=200&fit=crop",
            category: "electronics",
        },
    ],
    kitchen: [
        {
            id: 13,
            name: "Plates Set",
            image:
                "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop",
            category: "kitchen",
        },
        {
            id: 14,
            name: "Pots & Pans",
            image:
                "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
            category: "kitchen",
        },
        {
            id: 15,
            name: "Cutlery Set",
            image:
                "https://images.unsplash.com/photo-1551018651-6ecffde734da?w=200&h=200&fit=crop",
            category: "kitchen",
        },
        {
            id: 16,
            name: "Kitchen Cabinet",
            image:
                "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop",
            category: "kitchen",
        },
    ],
};
const offers = [
    {
      id: 1,
      image: require('@/assets/images/offer4.jpg'),
      title: "50% Off First Move",
    },
    {
      id: 2,
      image: require('@/assets/images/offer1.jpg'),
      title: "Free Packaging",
    },
    {
      id: 3,
      image: require('@/assets/images/offer3.jpg'),
      title: "Insurance Cover",
    },
    {
      id: 4,
      image: require('@/assets/images/offer4.jpg'),
      title: "Same Day Delivery",
    },
    {
      id: 5,
      image:
        require('@/assets/images/offer4.jpg'),
      title: "Premium Movers",
    },
    {
      id: 6,
      image:
        require('@/assets/images/offer4.jpg'),
      title: "24/7 Support",
    },
    {
      id: 7,
      image:
        require('@/assets/images/offer4.jpg'),
      title: "Expert Packing",
    },
    {
      id: 8,
      image:
        require('@/assets/images/offer4.jpg'),
      title: "Secure Transit",
    },
  ];

export default function CategoryItemsScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [cart, setCart] = useState<Record<number, number>>({});
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('furniture');
    const [searchText, setSearchText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const isValidCategory = (value: string): value is CategoryKey => {
        return ['furniture', 'electronics', 'kitchen'].includes(value);
    };

    const renderCategory = (cat: { id: string; name: string; icon: string }) => (
        <TouchableOpacity
            key={cat.id}
            style={[
                styles.categoryItem,
                selectedCategory === cat.id && styles.activeCategory,
            ]}
            onPress={() => {
                if (isValidCategory(cat.id)) {
                    setSelectedCategory(cat.id);
                }
            }}
        >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryLabel}>{cat.name}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }: { item: Item }) => {
        const quantity = cart[item.id] || 0;

        const increase = () => {
            setCart((prev) => ({
                ...prev,
                [item.id]: quantity + 1,
            }));
        };

        const decrease = () => {
            setCart((prev) => {
                const currentQty = prev[item.id] || 0;
                if (currentQty <= 1) {
                    const updated = { ...prev };
                    delete updated[item.id];
                    return updated;
                }
                return { ...prev, [item.id]: currentQty - 1 };
            });
        };

        return (
            <View style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.name}</Text>
                {quantity === 0 ? (
                    <TouchableOpacity style={styles.addButton} onPress={increase}>
                        <Text style={styles.addText}>ADD</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.counterContainer}>
                        <TouchableOpacity onPress={decrease} style={styles.counterButton}>
                            <Text style={styles.counterText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={increase} style={styles.counterButton}>
                            <Text style={styles.counterText}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    const selectedItemsCount = Object.keys(cart).length;

    const filteredItems = items[selectedCategory].filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            <View style={styles.container}>
                <View style={styles.categoryList}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {categories.map(renderCategory)}
                    </ScrollView>
                </View>

                {/* Remove this to show offers Grid of Items */}
                    <FlatList
                        data={filteredItems}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        renderItem={renderItem}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                    />

                

            </View>

            {/* Footer */}
            <View style={styles.footer}>

                <TouchableOpacity
                    style={[
                        styles.footerButton,
                        {
                            backgroundColor: selectedItemsCount > 0 ? '#ba1c1c' : '#ccc',
                            opacity: selectedItemsCount > 0 ? 1 : 0.5,
                        },
                    ]}
                    disabled={selectedItemsCount === 0}
                    onPress={() => {
                        console.log('Navigating to /vendors'); // 👈 Debug log
                        router.push('/vendors');
                    }}>
                    <Text style={styles.findMoversText}>
                        <Text style={styles.findMoversMain}>Find Movers{'\n'}</Text>
                        <Text style={styles.findMoversSub}>
                            {selectedItemsCount} item{selectedItemsCount > 1 ? 's' : ''} selected
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingTop: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    categoryList: {
        width: width * 0.25,
        backgroundColor: '#f9f9f9',
        paddingVertical: 15,
        paddingLeft: 10,
    },
    categoryItem: {
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderRadius: 10,
        marginBottom: 8,
    },
    activeCategory: {
        backgroundColor: '#f1d1d1',
    },
    categoryIcon: {
        fontSize: 26,
        marginBottom: 4,
    },
    categoryLabel: {
        fontSize: 12,
        textAlign: 'center',
    },
    itemsGrid: {
        flex: 1,
        padding: 5,
        
    },
    itemCard: {
        top: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,
        width: (width * 0.7) / 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        padding: 10,
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    addButton: {
        borderColor: '#ba1c1c',
        borderWidth: 1.5,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 8,
        width: 80, // 👈 Set desired width (e.g., 100)
        alignItems: 'center', // 👈 Center the text inside
    },
    addText: {
        color: '#ba1c1c',
        fontWeight: 'bold',
        fontSize: 12,
    },
    itemName: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 6,
        color: '#333',
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
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        borderWidth: 1.5,
        borderColor: '#ba1c1c',
        borderRadius: 6,
        overflow: 'hidden',
    },
    counterButton: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#ba1c1c',
    },
    counterText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    quantityText: {
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 14,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backgroundColor: 'transparent',
    },

    findMoversText: {
        textAlign: 'center',
    },

    findMoversMain: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    findMoversSub: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '400',
        textTransform: 'lowercase',
    },
    footerButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,

        position: 'absolute',
        bottom: 30, // 🔼 This adds space above the bottom edge (footer)

        backgroundColor: 'red',
        // padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    offersContainer: {
        marginBottom: 10,
    },

    offerCard: {
        width: 150,
        marginRight: 12,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    offerImage: {
        width: '100%',
        height: 80,
        resizeMode: 'cover',
    },

    offerTitle: {
        padding: 6,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },

});
