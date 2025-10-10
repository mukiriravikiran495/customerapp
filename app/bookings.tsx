import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
                    <Ionicons name="arrow-back" size={26} color="#222222" />
                    <Text style={styles.headerTitle}>My Bookings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.supportButton} onPress={() => alert("Support Clicked!")}>
                    <MaterialIcons name="support-agent" size={20} color="#222222" />
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
        backgroundColor: "#FFFFFF",
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
        fontWeight: "400",
        marginLeft: 8,
        color: "#222222",
        paddingHorizontal: 12,
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
    card: {
        backgroundColor: "#F1F1F1",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#222222",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        // elevation: 3,
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
        color: "#058103",
        fontWeight: '400',
    },
    paymentStatus: {
        fontSize: 15,
        color: "#8E1515",
    },
    divider: {
        height: 1,
        backgroundColor: "#C1C1C1",
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
        backgroundColor: "#C1C1C1",
    },
    dateLabel: {
        fontSize: 13,
        color: "#222222",
    },
    dateValue: {
        fontSize: 14,
        fontWeight: "400",
        marginTop: 2,
        color: "#222222",
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
        fontWeight: "400",
        color: "#222222",
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
        fontWeight: "500",
        color: "#058103",
    },
});
