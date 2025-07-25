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

export default function BookingSummary() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Status Bar padding for Android */}
            <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking Summary</Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.confirmationText}>🎉 Your booking has been confirmed!</Text>

                <View style={styles.summaryBox}>
                    <Text style={styles.label}>Customer Name:</Text>
                    <Text style={styles.value}>John Doe</Text>

                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>john.doe@example.com</Text>

                    <Text style={styles.label}>Pickup Location:</Text>
                    <Text style={styles.value}>Kothapet, Hyderabad</Text>

                    <Text style={styles.label}>Drop Location:</Text>
                    <Text style={styles.value}>Madhapur, Hyderabad</Text>

                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>22nd August 2025, 10:00 AM</Text>

                    <Text style={styles.label}>Selected Items:</Text>
                    <Text style={styles.value}>TV, Washing Machine, Sofa...</Text>

                    <Text style={styles.label}>Total Amount:</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]}>₹11,200</Text>
                </View>

                {/* Home Button */}
                <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/home')}>
                    <Text style={styles.homeButtonText}>Go to Home</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.04,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#000',
    },
    content: {
        padding: width * 0.05,
    },
    confirmationText: {
        fontSize: width * 0.05,
        fontWeight: '600',
        color: '#2a9d8f',
        marginBottom: height * 0.02,
        textAlign: 'center',
    },
    summaryBox: {
        backgroundColor: '#fff',
        padding: width * 0.05,
        borderRadius: 8,
        elevation: 2,
    },
    label: {
        fontSize: width * 0.038,
        fontWeight: '600',
        color: '#444',
        marginTop: height * 0.015,
    },
    value: {
        fontSize: width * 0.038,
        color: '#000',
        marginTop: 4,
    },
    homeButton: {
        marginTop: height * 0.03,
        backgroundColor: '#BA1C1C',
        paddingVertical: height * 0.018,
        borderRadius: 6,
        alignItems: 'center',
    },
    homeButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});
