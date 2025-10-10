import { useRouter } from 'expo-router';
import { useState } from 'react';
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
// import { default as Icon } from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from "@expo/vector-icons";
// @ts-ignore
import TopBg from '../assets/images/hero1.png';
// @ts-ignore
export default function OyoLoginScreen() {
    const [phone, setPhone] = useState('');
    const router = useRouter();
    const handleSendOtp = () => {
        router.push('/verifyotp'); // Change this to your home or next screen
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust if header overlaps
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <View style={styles.topSection}>
                        <TouchableOpacity style={styles.supportButton} onPress={() => alert("Support Clicked!")}>
                            <MaterialIcons name="support-agent" size={20} color="#222222" />
                            <Text style={styles.supportText}>Support</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={TopBg} style={styles.topBgImage} resizeMode="cover" />

                    {/* Offer text */}
                    <Text style={styles.offerText}>Welcome, What is your Number ? </Text>

                    {/* Phone input */}
                    <View style={styles.inputWrapper}>
                        <View style={styles.prefix}>
                            <Image
                                source={{ uri: 'https://flagcdn.com/w40/in.png' }}
                                style={styles.flagIcon}
                            />
                            <Text style={styles.countryCode}>+91</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={16} color="#000" />
                        </View>
                        <TextInput style={styles.input} placeholder="Enter mobile number" placeholderTextColor="#c1c1c1"
                            keyboardType="phone-pad" value={phone} onChangeText={setPhone}
                        />
                    </View>

                    {/* Continue button */}
                    <TouchableOpacity style={styles.continueButton} onPress={handleSendOtp}>
                        <Text style={styles.continueButtonText}>Send OTP</Text>
                    </TouchableOpacity>
                    <Text style={styles.signupLater}>By continue I accept all the Terms and Conditions and Privacy Policy</Text>
                    {/* Signup later */}
                    {/* <View style={styles.bottomContainer}>
                        <TouchableOpacity>
                            <Text style={styles.signupLater}>By continue I accept all the Terms and Conditions and Privacy Policy</Text>
                        </TouchableOpacity>
                    </View> */}

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 40 : 60,
        // paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    topBgImage: {
        width: '100%',
        height: 280, // Adjust height as needed
        marginBottom: 16,
    },
    flagIcon: {
        width: 20,
        height: 14,
        marginRight: 4,
        borderRadius: 2,
        marginLeft: 12,
    },

    offerText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '400',
        color: '#222222',
        textAlign: 'center',
        marginHorizontal: 16,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        marginTop: 20,
        height: 50,
        marginHorizontal: 20,
    },
    prefix: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    countryCode: {
        fontSize: 16,
        marginRight: 4,
        color: '#000',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    continueButton: {
        backgroundColor: '#8E1515',
        borderRadius: 30,
        marginTop: 20,
        paddingVertical: 14,
        alignItems: 'center',
        elevation: 2,
        marginHorizontal: 20,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
    },
    googleIcon: {
        width: 20,
        height: 20,

        resizeMode: 'contain',
    },
    signupLater: {
        marginTop: 20,
        textAlign: 'center',
        color: '#7c7c7c',
        fontSize: 12,
        marginHorizontal: 16,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: '#FFFFFF',
        marginBottom: 30,

    },
    topSection: {
        backgroundColor: '#fff9f3',
        padding: 16,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        justifyContent: "flex-end",
    },
    supportButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff9f3",
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
