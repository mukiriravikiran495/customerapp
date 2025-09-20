import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';


const { width } = Dimensions.get('window');

export default function ChatBox() {
    const router = useRouter();
  

    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        // Simulate automatic messages
        setTimeout(() => {
            setMessages([
                'Hi Partner, Welcome to Shiftyng Partner Support',
                'Please select language',
            ]);
        }, 1000);
    }, []);

    const languages = ['English', 'हिंदी', 'मराठी', 'తెలుగు', 'தமிழ்', 'বাংলা', 'ಕನ್ನಡ'];

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                    <Text style={styles.headerTitle}>Live Support</Text>
                </TouchableOpacity>
            </View>

            {/* Chat Messages */}
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.chatContainer}>
                    {messages.map((msg, index) => (
                        <View key={index} style={styles.messageRow}>
                            <View style={styles.avatar}>
                                <Ionicons name="flash" size={18} color="#fff" />
                            </View>
                            <View style={styles.messageBubble}>
                                <Text>{msg}</Text>
                            </View>
                        </View>
                    ))}

                    {/* Language selection buttons */}
                    <View style={styles.languageWrap}>
                        {languages.map((lang, i) => (
                            <TouchableOpacity key={i} style={styles.languageBtn}>
                                <Text style={styles.languageText}>{lang}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
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
    chatContainer: {
        paddingHorizontal: 8,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    avatar: {
        width: 30,
        height: 30,
        backgroundColor: '#FAD02E',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        marginTop: 5,
    },
    messageBubble: {
        backgroundColor: '#F9E79F',
        borderRadius: 8,
        padding: 10,
        maxWidth: '80%',
    },
    languageWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 10,
    },
    languageBtn: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        margin: 5,
        elevation: 2,
    },
    languageText: {
        fontWeight: '600',
        fontSize: 14,
    },

});
