import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import TopBg from '../assets/images/hero.jpg';
// @ts-ignore
import GoogleLogo from '../assets/images/google.png';
export default function OyoLoginScreen() {
    const [phone, setPhone] = useState('');
    const router = useRouter();
    const handleSendOtp = () => {
        router.push('/verifyotp'); // Change this to your home or next screen
    };

    return (
        <View style={styles.container}>
            <Image source={TopBg} style={styles.topBgImage} resizeMode="cover" />

            {/* Offer text */}
            <Text style={styles.offerText}>Choose Packers & Movers</Text>

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
                <TextInput
                    style={styles.input}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            {/* Continue button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleSendOtp}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            {/* OR divider */}
            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
            </View>

            {/* Google login */}
            <TouchableOpacity style={styles.outlineButton}>
                <Image source={GoogleLogo} style={styles.googleIcon} />
                <Text style={styles.outlineButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Truecaller login */}
            <TouchableOpacity style={styles.outlineButton}>
                {/* <MaterialIcons name="phone" size={20} color="#007AFF" /> */}
                <FontAwesome name="whatsapp" size={22} color="#08b447ff" />
                <Text style={styles.outlineButtonText}>login with Whats App</Text>
            </TouchableOpacity>

            {/* Signup later */}
            <TouchableOpacity>
                <Text style={styles.signupLater}>by continue you are accepting all the terms and conditions</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 60 : 60,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    topBgImage: {
        width: '100%',
        height: 240, // Adjust height as needed
        marginBottom: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    flagIcon: {
        width: 20,
        height: 14,
        marginRight: 4,
        borderRadius: 2,
    },

    offerText: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 20,
        height: 50,
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
        backgroundColor: '#ba1c1c',
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 14,
        alignItems: 'center',
        elevation: 2,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#999',
    },
    outlineButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#9a9494',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    outlineButtonText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    googleIcon: {
        width: 20,
        height: 20,

        resizeMode: 'contain',
    },
    signupLater: {
        marginTop: 5,
        textAlign: 'center',
        color: '#000',
        fontSize: 14,
    },
});
