// app/login.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Image,
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
                <Image source={require('@/assets/images/hero.jpg')} style={styles.banner} resizeMode="cover" />

                <Text style={styles.heading}>3-Steps away to your favourite Packers & Movers</Text>
                <Text style={styles.subHeading}>Log in or sign up</Text>

                <View style={styles.phoneInputContainer}>
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput
                        placeholder="Enter Phone Number"
                        keyboardType="number-pad"
                        style={styles.phoneInput}
                    />
                </View>

                <TouchableOpacity style={styles.continueButton} onPress={() => {
                    console.log('Navigating to /verifyotp'); // 👈 Debug log
                    router.push('/verifyotp');
                }}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>

                <Text style={styles.or}>or</Text>

                <View style={styles.authButtons}>
                    <TouchableOpacity style={styles.authButton}>
                        <Ionicons name="logo-google" size={24} color="#BA1c1c" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.authButton}>
                        <Ionicons name="mail" size={24} color="#000000" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.terms}>
                    By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text>{' '}
                    <Text style={styles.link}>Privacy Policy</Text> <Text style={styles.link}>Content Policy</Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 40,
    },
    banner: {
        width: '100%',
        height: 350,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        paddingHorizontal: 20,
    },
    subHeading: {
        marginTop: 8,
        color: '#555',
        fontSize: 14,
    },
    phoneInputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        width: '90%',
        paddingHorizontal: 10,
        backgroundColor: '#fafafa',
        height: 50,
    },
    flag: {
        width: 24,
        height: 16,
        marginRight: 8,
    },
    countryCode: {
        fontSize: 16,
        marginRight: 8,
    },
    phoneInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    },
    continueButton: {
        marginTop: 20,
        backgroundColor: '#ba1c1c',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    or: {
        marginVertical: 15,
        fontSize: 14,
        color: '#888',
    },
    authButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '40%',
    },
    authButton: {
        width: 50,
        height: 50,
        borderRadius: 25, // half of width/height to make it a circle
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    terms: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 12,
        color: '#999',
        paddingHorizontal: 24,
    },
    link: {
        textDecorationLine: 'underline',
        color: '#444',
    },
}); 