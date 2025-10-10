import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function bankAccount() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(true);
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');

    const handleSave = () => {
        if (accountName && accountNumber && ifscCode) {
            setIsEditing(false); // Switch to view mode
        }
    };

    const handleChange = () => {
        setIsEditing(true); // Switch to edit mode
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with Back, Toggle, Notification */}
            <View style={styles.header}>
                {/* Back */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#222222" />
                    <Text style={styles.headerTitle}>Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.supportButton} onPress={() => alert("Support Clicked!")}>
                    <MaterialIcons name="support-agent" size={20} color="#222222" />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>
            {/* Add Bank Details Section */}
            <View style={{ marginTop: 10 }}>
                {isEditing ? (
                    <>
                        <TextInput
                            placeholder="Enter Account Holder Name"
                            value={accountName}
                            onChangeText={setAccountName}
                            style={styles.input}
                            placeholderTextColor = '#ccc'
                        />
                        <TextInput
                            placeholder="Enter Account Number"
                            value={accountNumber}
                            onChangeText={setAccountNumber}
                            style={styles.input}
                            keyboardType="numeric"
                            placeholderTextColor = '#ccc'
                        />
                        <TextInput
                            placeholder="Enter IFSC Code"
                            value={ifscCode}
                            onChangeText={setIfscCode}
                            style={styles.input}
                            autoCapitalize="characters"
                            placeholderTextColor = '#ccc'
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.label}>Account Holder: {accountName}</Text>
                        <Text style={styles.label}>Account Number: {accountNumber}</Text>
                        <Text style={styles.label}>IFSC Code: {ifscCode}</Text>
                        <TouchableOpacity style={styles.button} onPress={handleChange}>
                            <Text style={styles.buttonText}>Change</Text>
                        </TouchableOpacity>
                    </>
                )}
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
        backgroundColor: '#15803D',
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
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C1C1C1',
    },
    supportText: {
        color: "#222222",
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "600",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#222222',
        paddingHorizontal: 12,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#8E1515',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
    },

    label: {
        fontSize: 16,
        marginBottom: 6,
        color: '#C1C1C1',
    },

});
