// app/payment.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PaymentScreen() {
    const router = useRouter();

    const handlePayment = () => {
        // Simulate a successful payment
        Alert.alert('Payment Success', 'Your payment was successful!', [
            {
                text: 'OK',
                onPress: () => router.push('/bookingsuccess'), // navigate to success page
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Ionicons name="card-outline" size={64} color="#16a34a" />
            <Text style={styles.title}>Make Payment</Text>
            <Text style={styles.amount}>₹11,200</Text>

            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginTop: 20,
    },
    amount: {
        fontSize: width * 0.08,
        fontWeight: '600',
        color: '#16a34a',
        marginVertical: 30,
    },
    payButton: {
        backgroundColor: '#16a34a',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginBottom: 20,
    },
    payButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#ef4444',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});
