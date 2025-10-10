import { Ionicons } from '@expo/vector-icons';
import messaging from '@react-native-firebase/messaging';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import {
    Animated, Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
// import { default as Icon } from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from "@expo/vector-icons";
export default function VerifyOtp() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '']);
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

    // const handleVerify = () => {
    //     const code = otp.join('');
    //     if (code.length === 4) {
    //         setIsSuccess(true);

    //         // Animate tick
    //         Animated.spring(scaleAnim, {
    //             toValue: 1,
    //             useNativeDriver: true,
    //         }).start();

    //         // After 2 seconds, navigate to home
    //         setTimeout(() => {
    //             router.push('/home');
    //         }, 2000);
    //     } else {
    //         alert('Please enter the 4-digit OTP');
    //     }
    // };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length === 4) {
            try {
                // Request FCM permission (important for iOS)
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (!enabled) {
                    console.log('❌ FCM permission not granted');
                    alert('Please enable notification permissions');
                    return;
                }

                // ✅ Get FCM token
                const fcmToken = await messaging().getToken();
                console.log('✅ FCM Token:', fcmToken);

                // TODO: send this token + mobile number to your backend after OTP verification

                // Animate success
                setIsSuccess(true);
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start();

                setTimeout(() => {
                    router.push('/home');
                }, 2000);

            } catch (error) {
                console.error('Error fetching FCM token:', error);
            }

        } else {
            alert('Please enter the 4-digit OTP');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.leftSection}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Verify OTP</Text>
                </View>
                <TouchableOpacity style={styles.supportButton} onPress={() => alert("Support Clicked!")}>
                    <MaterialIcons name="support-agent" size={20} color="#222222" />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>



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


            <Text style={styles.resendText}>
                Didn’t get the OTP? Resend SMS in {timer}s
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                    <Text style={styles.verifyText}>Verify OTP</Text>
                </TouchableOpacity>
            </View>


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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 40 : 60,
        // paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },

    backIcon: {
        marginRight: 8,
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
    },

    subText: {
        fontSize: 14,
        color: '#222222',
        textAlign: 'center',
        marginTop: 50,
    },
    phoneNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 4,
        color: '#222222',
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        width: '100%',
        gap: 12,
    },
    otpInput: {
        width: 48,
        height: 55,
        borderWidth: 1,
        borderColor: '#C1C1C1',
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
        color: '#222222',

        marginTop: 10,
        marginBottom: 30,
        textAlign: 'center',
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    verifyButton: {
        backgroundColor: "#8E1515",
        paddingVertical: 16,
        borderRadius: 30,
        width: "80%",
        alignItems: "center",
    },
    verifyText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "400",
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
    topSection: {
        backgroundColor: '#FFFFFF', // gray background
        padding: 16,
        paddingBottom: 8, // spacing under card
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: "space-between",


    },
    supportButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C1C1C1',
    },
    supportText: {
        color: "#222222",
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "600",
    },
});
