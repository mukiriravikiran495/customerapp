import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import {
    Animated, Keyboard, KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function VerifyOtp() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isSuccess, setIsSuccess] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current;

    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, []);
    useEffect(() => {
        if (isSuccess) {
            Keyboard.dismiss(); // Hide the keyboard when success is triggered
        }
    }, [isSuccess]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const code = otp.join('');
        if (code.length === 6) {
            setIsSuccess(true);

            // Animate tick
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }).start();

            // After 2 seconds, navigate to home
            setTimeout(() => {
                router.push('/home');
            }, 2000);
        } else {
            alert('Please enter the 6-digit OTP');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>OTP Verification</Text>
                <Text style={styles.subText}>We have sent a verification code to</Text>
                <Text style={styles.phoneNumber}>+91-7816035340</Text>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={text => handleChange(text, index)}
                            onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
                            ref={ref => {
                                inputRefs.current[index] = ref!;
                            }}
                        />
                    ))}
                </View>

                <Text style={styles.checkText}>Check text messages for your OTP</Text>
                <Text style={styles.resendText}>
                    Didn’t get the OTP? Resend SMS in {timer}s
                </Text>

                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.backToLogin}>Go back to login methods</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                    <Text style={styles.verifyText}>Verify OTP</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* ✅ Fullscreen success overlay */}
            {isSuccess && (
                <View style={styles.successOverlay}>
                    <LottieView
                        source={require('@/assets/animations/success-check.json')}
                        autoPlay
                        loop={false}
                        style={styles.lottie}
                    />
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
        top: 40,
    },
    backIcon: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    phoneNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        width: '100%',
    },
    otpInput: {
        width: 48,
        height: 55,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#fff',
    },
    checkText: {
        color: '#007bff',
        marginBottom: 6,
    },
    resendText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 20,
    },
    backToLogin: {
        fontSize: 14,
        color: '#ba1c1c',
        textDecorationLine: 'underline',
        marginBottom: 30,
    },
    verifyButton: {
        backgroundColor: '#ba1c1c',
        paddingVertical: 16,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    verifyText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    lottie: {
        width: 250,
        height: 250,
    },

    successOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    tickWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tickCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
