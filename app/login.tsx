// app/login.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function Login() {
    const router = useRouter();
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.logo}>Shiftyng</Text>
                <Text style={styles.heading}>Choose your Favourite Packers & Movers</Text>

                <TextInput
                    placeholder="Enter phone number or email"
                    style={styles.input}
                    keyboardType="default"
                />

                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => router.push('/verifyotp')}
                >
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.or}>or</Text>
                    <View style={styles.line} />
                </View>

                <TouchableOpacity style={styles.altLoginButton}>
                    <Ionicons name="logo-google" size={20} color="#BA1C1C" />
                    <Text style={styles.altLoginText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.altLoginButton}>
                    <Ionicons name="logo-apple" size={20} color="#000" />
                    <Text style={styles.altLoginText}>Continue with Apple</Text>
                </TouchableOpacity>





                <Text style={styles.terms}>
                    By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Shiftyng and its affiliates to the number provided.
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#BA1C1C', // Deep red brand color
        marginBottom: 30,
        textAlign: 'center',
        
    },

    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 14,
        width: '100%',
        fontSize: 16,
        backgroundColor: '#fafafa',
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: '#BA1C1C', // Light blue from screenshot
        paddingVertical: 14,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 12,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    or: {
        marginHorizontal: 10,
        color: '#888',
        fontSize: 14,
    },
    altLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        marginBottom: 12,
    },
    altLoginText: {
        marginLeft: 10,
        fontSize: 15,
        color: '#000',
    },
    qrButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        marginBottom: 20,
    },
    terms: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
});
