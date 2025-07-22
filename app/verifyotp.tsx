import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function VerifyOtp() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30);

    const inputs = useRef<TextInput[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>We have sent a verification code to</Text>
            <Text style={styles.phoneNumber}>+91-7816035340</Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            if (ref) inputs.current[index] = ref;
                        }}
                        style={styles.otpBox}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(value) => handleChange(value, index)}
                    />
                ))}
            </View>

            <Text style={styles.hint}>Check text messages for your OTP</Text>

            <Text style={styles.resend}>
                Didn’t get the OTP?{" "}
                {timer === 0 ? (
                    <Text style={styles.resendLink}>Resend SMS</Text>
                ) : (
                    `Resend SMS in ${timer}s`
                )}
            </Text>

            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.backToLogin}>Go back to login methods</Text>
            </TouchableOpacity>

            {/* VERIFY BUTTON at the bottom */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={() => {
                        console.log("Verifying OTP:", otp.join(""));
                        // Here you can call your OTP verification API
                        router.push('/home');
                    }}
                >
                    <Text style={styles.verifyButtonText}>Verify OTP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    subtitle: {
        marginTop: 20,
        fontSize: 16,
        color: "#444",
    },
    phoneNumber: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
    },
    otpContainer: {
        flexDirection: "row",
        marginTop: 30,
        justifyContent: "space-between",
        width: "100%",
    },
    otpBox: {
        width: 45,
        height: 55,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        textAlign: "center",
        fontSize: 18,
    },
    hint: {
        marginTop: 20,
        color: "#007AFF",
    },
    resend: {
        marginTop: 15,
        fontSize: 14,
        color: "#000",
    },
    resendLink: {
        color: "#007AFF",
        fontWeight: "bold",
    },
    backToLogin: {
        marginTop: 40,
        color: "#D22B2B",
        fontSize: 14,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
    },

    verifyButton: {
        backgroundColor: '#ba1c1c',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    verifyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
