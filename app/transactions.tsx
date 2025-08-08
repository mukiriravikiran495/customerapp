import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
const { width } = Dimensions.get('window');
const orders = [
    {
        name: 'Mukiri Ravi kiran',
        type: 'ONE BHK',
        shiftDate: '22 Jul 2025 10:43:00',
        dropDate: '24 Jul 2025 11:43:00',
        amount: '17,400',
        status: 'Completed',
    },
    {
        name: 'Bala Anusha',
        type: 'ONE BHK',
        shiftDate: '22 Jul 2025 10:43:00',
        dropDate: '24 Jul 2025 11:43:00',
        amount: '12,400',
        status: 'Completed',
    },
  ];
export default function transactions() {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState('Today');
    const [selectedFilter, setSelectedFilter] = useState('Completed');
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with Back, Toggle, Notification */}
            <View style={styles.header}>
                {/* Back */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                    <Text style={styles.headerTitle}>Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/support')} style={styles.supportButton}>
                    <Ionicons name="headset-outline" size={20} color="#000" style={{ marginRight: 6 }} />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.toggleGroup}>
                {['Today', 'Weekly', 'Monthly'].map((label) => (
                    <TouchableOpacity
                        key={label}
                        style={[
                            styles.toggleButton,
                            selectedTab === label && styles.toggleButtonActive,
                        ]}
                        onPress={() => setSelectedTab(label)}
                    >
                        <Text
                            style={[
                                styles.toggleButtonText,
                                selectedTab === label && styles.toggleButtonTextActive,
                            ]}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {orders
                .filter(order => order.status === selectedFilter)
                .map((order, idx) => (
                    <View key={idx} style={styles.orderCard}>
                        <View style={styles.orderLeft}>
                            <View style={styles.orderCircle} />
                            <View>
                                <Text style={styles.orderName}>{order.name}</Text>

                                <Text style={styles.orderDate}>{order.type}</Text>

                            </View>
                        </View>
                        <Text style={styles.orderAmount}>₹{order.amount}</Text>
                    </View>
                ))}


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4bc373',
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 24,
        height: 38,

    },
    statusText: {
        marginRight: 8,
        fontSize: width * 0.045,
        color: '#555',
    },
    notificationIcon: {
        paddingLeft: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0B4ED3',
        marginBottom: 10,
    },
    subtext: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    supportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    supportText: {
        fontSize: 15,
        color: '#000',
        fontWeight: '500',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#000',
        paddingHorizontal: 12,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 20,
    },

    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    toggleButtonActive: {
        backgroundColor: '#e6f0ff',
        borderColor: '#3b82f6',
    },

    toggleButtonText: {
        color: '#000',
        fontSize: 16,
    },

    toggleButtonTextActive: {
        color: '#3b82f6',
        fontWeight: '600',
    },
    orderCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
        backgroundColor: '#fff',
        elevation: 1,
    },

    orderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },

    orderCircle: {
        width: 28,
        height: 28,
        backgroundColor: '#f9caca',
        borderRadius: 12,
    },

    orderName: {
        fontWeight: 'bold',
        fontSize: 15,
    },

    orderType: {
        position: 'absolute',
        right: 0,
        top: 0,
        fontSize: 12,
        fontWeight: '600',
        color: '#555',
    },

    orderDate: {
        fontSize: 13,
        color: '#333',
    },

    orderAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
});
