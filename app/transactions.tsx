import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
                    <Ionicons name="arrow-back" size={26} color="#222222" />
                    <Text style={styles.headerTitle}>Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.supportButton} onPress={() => alert("Support Clicked!")}>
                    <MaterialIcons name="support-agent" size={20} color="#222222" />
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

                                <Text style={styles.orderType}>{order.type}</Text>

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
    supportButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C1C1C1',
    },
    supportText: {
        color: "#222222",
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "600",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 8,
        color: '#222222',
        paddingHorizontal: 12,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },

    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },

    toggleButtonActive: {
        backgroundColor: '#e6f0ff',
        borderColor: '#3b82f6',
    },

    toggleButtonText: {
        color: '#222222',
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
        fontWeight: '500',
        fontSize: 15,
    },

    

    orderType: {
        fontSize: 13,
        color: '#333',
    },

    orderAmount: {
        fontSize: 16,
        fontWeight: '500',
        color: '#15803D',
    },
});
