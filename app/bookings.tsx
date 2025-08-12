import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function BookingScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                    <Text style={styles.headerTitle}>My bookings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/support')} style={styles.supportButton}>
                    <Ionicons name="headset-outline" size={20} color="#000" style={{ marginRight: 6 }} />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>

            {/* Booking Card */}
            <TouchableOpacity onPress={() => router.push('/bookingsuccess')}>
            <View style={styles.card}>
                {/* Top Row */}
                <View style={styles.leftSection}>
                    <Image
                        source={{ uri: "https://via.placeholder.com/50" }}
                        style={styles.logo}
                    />

                    <View style={{ flex: 1 }}>
                        {/* Company name */}
                        <Text style={styles.companyName}>Leo Packers and Movers</Text>

                        {/* ONE BHK & Amount in same row */}
                        <View style={styles.subRow}>
                            <Text style={styles.subText}>ONE BHK</Text>
                            <Text style={styles.amount}>₹17,400</Text>
                        </View>
                    </View>
                </View>

                {/* Middle Row */}
                <View style={styles.middleRow}>
                    <Text style={styles.status}>Booking Completed</Text>
                    <Text style={styles.paymentStatus}>Unpaid</Text>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Bottom Row */}
                <View style={styles.bottomRow}>
                    <View style={styles.dateSection}>
                        <Text style={styles.dateLabel}>Shift date</Text>
                        <Text style={styles.dateValue}>22 JUL 2025</Text>
                    </View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.dateSection}>
                        <Text style={styles.dateLabel}>Drop date</Text>
                        <Text style={styles.dateValue}>22 JUL 2025</Text>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 30,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
        color: "#000",
        paddingHorizontal: 12,
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
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    middleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    status: {
        fontSize: 15,
        color: "green",
        fontWeight: '400',
    },
    paymentStatus: {
        fontSize: 15,
        color: "#BA1C1C",
    },
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 8,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dateSection: {
        flex: 1,
        alignItems: "center",
    },
    verticalDivider: {
        width: 1,
        backgroundColor: "#eee",
    },
    dateLabel: {
        fontSize: 13,
        color: "#000",
    },
    dateValue: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 2,
        color: "#000",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#F2B6B6",
        marginRight: 10,
    },
    companyName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    subRow: {
        flexDirection: "row",
        justifyContent: "space-between", // pushes amount to right edge
        alignItems: "center",
    },
    subText: {
        fontSize: 13,
        color: "#666",
    },
    amount: {
        fontSize: 14,
        fontWeight: "bold",
        color: "green",
    },
});
