import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
type Item = {
    id: number;
    name: string;
    image: string;
    category: string;
};
const categories = [
    { id: '1', name: 'All', icon: '🪑' },
    { id: '2', name: "Electronics", icon: "📺" },
    { id: '3', name: "Kitchen Items", icon: "🍽️" },
    { id: '4', name: "Clothes", icon: "👕" },
    { id: '5', name: "Books", icon: "📚" },
    { id: '6', name: "Appliances", icon: "🔌" },
    { id: '7', name: "Decorative", icon: "🎨" },
    { id: '8', name: "Sports", icon: "⚽" },
];
type CategoryKey = 'furniture' | 'electronics' | 'kitchen' | 'clothes' | 'books' | 'appliances' | 'decorative' | 'sports';
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
            id: 22,
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
    clothes: [{
        id: 17,
        name: "clothes",
        image:
            "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop",
        category: "Clothes",
    },
    ],
    appliances: [
        {
        id: 18,
        name: "Appliances",
        image:
            "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop",
        category: "Appliances",
    },
    ],
    decorative: [
        {
        id: 19,
        name: "Decorative",
        image:
            "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop",
        category: "Decorative",
    },
    ],
    sports: [
        {
        id: 20,
        name: "sports",
        image:
            "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop",
        category: "Sports",
    },
    ],
    books: [
        {
        id: 21,
        name: "Kitchen Cabinet",
        image:
            "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop",
        category: "Books",
    },
    ],
};
const allItems = Object.values(items).flat();
const categoryNameToKey: Record<string, CategoryKey> = {
  'Electronics': 'electronics',
  'Kitchen Items': 'kitchen',
  'Clothes': 'clothes',
  'Books': 'books',
  'Appliances': 'appliances',
  'Decorative': 'decorative',
  'Sports': 'sports',
  
};

const getFilteredItems = (categoryId: string) => {
  const categoryName = categories.find(c => c.id === categoryId)?.name;
  if (!categoryName) return [];

  if (categoryName === 'All') return allItems;

  const key = categoryNameToKey[categoryName];
  return items[key as CategoryKey] || [];
};



export default function App() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('1');
    const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [itemCounts, setItemCounts] = useState<{ [key: number]: number }>({});
    const hasSelectedItems = Object.values(itemCounts).some(count => count > 0);
    const handleFindMovers = () => {
        console.log('Finding movers for:', itemCounts);
        router.push('/vendors');
    };
    const handleAdd = (itemId: number) => {
        setItemCounts(prev => ({ ...prev, [itemId]: 1 }));
    };

    const increaseCount = (itemId: number) => {
        setItemCounts(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const decreaseCount = (itemId: number) => {
        setItemCounts(prev => {
            const newCount = (prev[itemId] || 0) - 1;
            if (newCount <= 0) {
                const updated = { ...prev };
                delete updated[itemId];
                return updated;
            }
            return { ...prev, [itemId]: newCount };
        });
    };

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.headerWrapper}>
                <View style={styles.statusBarSpacer} />
                <View style={styles.header}>
                    {/* LEFT: Back Button */}
                    <View style={styles.sideContainer}>
                        <TouchableOpacity onPress={() => router.push('/moversselectdropaddress')} style={styles.iconHitBox}>
                            <Ionicons name="chevron-back" size={24} color="#212121" />
                        </TouchableOpacity>
                    </View>

                    {/* CENTER: Title or Search */}
                    <View style={styles.centerContainer}>
                        {isSearching ? (
                            <TextInput
                                value={searchText}
                                onChangeText={setSearchText}
                                placeholder="Search..."
                                placeholderTextColor="#999"
                                style={styles.searchInput}
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.title} numberOfLines={1}>
                                Select Items
                            </Text>
                        )}
                    </View>

                    {/* RIGHT: Search / Close Button */}
                    <View style={styles.sideContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                setIsSearching(!isSearching);
                                if (isSearching) setSearchText('');
                            }}
                            style={styles.iconHitBox}
                        >
                            <Ionicons name={isSearching ? 'close' : 'search'} size={22} color="#212121" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.contentWrapper}>
                {/* LEFT CATEGORIES */}
                <ScrollView style={styles.leftPanel} contentContainerStyle={{ paddingVertical: 10 }}>
                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.categoryItem,
                                selectedCategory === cat.id && styles.activeCategory
                            ]}
                            onPress={() => setSelectedCategory(cat.id)}
                        >
                            {typeof cat.icon === 'string' ? (
                                <Text style={styles.categoryEmoji}>{cat.icon}</Text>
                            ) : (
                                <Image source={cat.icon} style={styles.categoryIcon} />
                            )}
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === cat.id && styles.activeCategoryText
                                ]}
                            >
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* RIGHT ITEMS */}
                <FlatList
                    data={getFilteredItems(selectedCategory)}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        const count = itemCounts[item.id] || 0;

                        return (
                            <View style={styles.itemCard}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />

                                {count === 0 ? (
                                    <TouchableOpacity
                                        style={styles.addButton}
                                        onPress={() => handleAdd(item.id)}
                                    >
                                        <Text style={styles.addButtonText}>ADD</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View style={styles.counterContainer}>
                                        <TouchableOpacity onPress={() => decreaseCount(item.id)}>
                                            <Text style={styles.counterButton}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.countText}>{count}</Text>
                                        <TouchableOpacity onPress={() => increaseCount(item.id)}>
                                            <Text style={styles.counterButton}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                <View style={styles.itemDetails}>
                                    <Text style={styles.description}>{item.name}</Text>
                                </View>
                            </View>
                        );
                    }}

                    numColumns={2}
                    contentContainerStyle={styles.rightPanel}
                    showsVerticalScrollIndicator={false}
                />
                {hasSelectedItems && (
                    <TouchableOpacity style={styles.findMoversButton} onPress={handleFindMovers}>
                        <Text style={styles.findMoversText}>Find Movers</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 120) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerWrapper: {
        backgroundColor: '#FFF',
        ...Platform.select({
            android: {
                elevation: 8,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
        }),
        zIndex: 10,
    },
    statusBarSpacer: {
        height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    counterButton: {
        fontSize: 18,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#ba1c1c',
        color: '#fff',
        borderRadius: 6,
        textAlign: 'center',
        
    },
    countText: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: 'bold',
    },
    findMoversButton: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        transform: [{ translateX: -75 }], // Half of the button width
        width: 150, // Fixed width for centering
        paddingVertical: 16,

        backgroundColor: 'red',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',

        elevation: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },


    findMoversText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    header: {
        height: 56,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    categoryEmoji: {
        fontSize: 30,
        marginBottom: 6,
    },
    sideContainer: {
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
        textAlign: 'center',
    },
    searchInput: {
        fontSize: 16,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#AAA',
        color: '#212121',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212121',
    },
    iconHitBox: {
        padding: 8,
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'row',
        
    },
    leftPanel: {
        width: 80,
        backgroundColor: '#fff',
        elevation: 8,
       
    },
    categoryItem: {
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 12,
        marginBottom: 10,
        marginHorizontal: 2,
    },
    activeCategory: {
        backgroundColor: '#f3d0d0',
    },
    categoryIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',

        fontSize: 26,
        marginBottom: 4,
    },
    categoryText: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
    },
    activeCategoryText: {
        fontWeight: 'bold',
        color: '#C2185B',
    },
    rightPanel: {
        padding: 10,
        
    },
    itemCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        margin: 6,
        width: cardWidth,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        
    },
    itemImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        resizeMode: 'contain',
        marginBottom: 6,
    },
    addButton: {
        position: 'absolute',
        right: 10,
        top: 90,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ba1c1c',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
    },
    addButtonText: {
        color: '#ba1c1c',
        fontWeight: '600',
        fontSize: 12,
    },

    itemDetails: {
        marginTop: 10,
    },
    itemPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#212121',
    },
    strike: {
        fontSize: 12,
        color: '#999',
        textDecorationLine: 'line-through',
        marginLeft: 4,
    },
    weight: {
        fontSize: 12,
        color: '#555',
    },
    discount: {
        fontSize: 12,
        color: 'green',
        marginVertical: 2,
    },
    description: {
        fontSize: 13,
        fontWeight: '500',
        color: '#212121',
    },
    sourced: {
        fontSize: 10,
        color: '#00BFA5',
        marginVertical: 2,
    },
    rating: {
        fontSize: 10,
        color: '#555',
    },
});
