// app/coupons.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Coupons() {
    const router = useRouter();

    const coupons = [
        {
            id: 1,
            title: "10% OFF",
            description: "Get 10% off on your first booking.",
            code: "FIRST10",
            expiry: "Expires on 31 Jul 2025",
        },
        {
            id: 2,
            title: "₹100 Cashback",
            description: "Flat ₹100 cashback on bookings above ₹999.",
            code: "SAVE100",
            expiry: "Expires on 15 Aug 2025",
        },
        {
            id: 3,
            title: "20% OFF",
            description: "Save 20% on premium services.",
            code: "PREMIUM20",
            expiry: "Expires on 10 Aug 2025",
        },
        {
            id: 4,
            title: "₹50 OFF",
            description: "Get ₹50 off on local shifting.",
            code: "LOCAL50",
            expiry: "Expires on 30 Jul 2025",
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <SafeAreaView style={styles.container}>
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={26} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Coupon List */}
                <View style={styles.couponList}>
                    {coupons.map((coupon) => (
                        <View key={coupon.id} style={styles.couponCard}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{coupon.title}</Text>
                                <Text style={{ color: '#555', marginTop: 4 }}>{coupon.description}</Text>
                                <Text style={{ color: '#888', fontSize: 12, marginTop: 2 }}>{coupon.expiry}</Text>
                                <Text style={{ color: '#ba1c1c', marginTop: 4, fontWeight: 'bold' }}>Code: {coupon.code}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => {
                                    // Navigate back and pass selected coupon as query
                                    router.push({
                                        pathname: '/bookingdetails',
                                        params: {
                                            selectedCouponCode: coupon.code,
                                            discount: coupon.title, // optional
                                        }
                                    });
                                }}
                            >
                                {/* <Ionicons name="checkmark" color="#fff" size={16} /> */}
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#FFFFFF' }}>Select</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: height * 0.1,
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f1f1ff',
    },
    header: {
        padding: width * 0.04,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 10,
    },
    couponList: {
        padding: 12,
    },
    couponCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    code: {
        fontSize: 13,
        color: '#333',
    },
    codeBold: {
        fontWeight: 'bold',
        color: '#000',
    },
    expiry: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    selectButton: {
        backgroundColor: '#ba1c1c',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    selectText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
