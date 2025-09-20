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

export default function support() {
    const router = useRouter();

  
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqList = [
        {
            question: 'Learn more about your earnings',
            answer: 'You can view your earnings summary in the earnings section of the app, updated daily.'
        },
        {
            question: 'I have an issue with an order earning.',
            answer: 'Please contact support with your order ID. We will review and resolve your issue quickly.'
        },
        {
            question: 'Route/location related issues',
            answer: 'Ensure location services are enabled. If issues persist, try restarting your device.'
        },
        {
            question: 'How can I transfer my earnings to my bank account?',
            answer: 'Go to "Bank Details" in your profile, add your account, and click on "Transfer Earnings".'
        },
        {
            question: 'I am facing an issue with transferring my earnings to my bank account.',
            answer: 'Check if your bank details are correct. If the issue continues, contact support.'
        }
    ];

    const toggleAnswer = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with Back, Toggle, Notification */}
            <View style={styles.header}>
                {/* Back */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                    <Text style={styles.headerTitle}>Support</Text>
                </TouchableOpacity>
            </View>
            {/* FAQ List */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Earnings and Wallet</Text>
                {faqList.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => toggleAnswer(index)}
                        >
                            <Text style={styles.itemText}>{item.question}</Text>
                        </TouchableOpacity>
                        {activeIndex === index && (
                            <Text style={styles.answerText}>{item.answer}</Text>
                        )}
                    </View>
                ))}
            </View>

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
    section: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },

    item: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    itemText: {
        fontSize: 15,
        color: '#000',
    },

    answerText: {
        fontSize: 14,
        color: '#555',
        marginHorizontal: 10,
        marginBottom: 10,
    },

});
