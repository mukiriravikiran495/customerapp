import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions, Image, Platform,
  SafeAreaView, ScrollView, StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function profileInfo() {
    const router = useRouter();

    const [isEditingNumber, setIsEditingNumber] = useState(false);
    const [registeredNumber, setRegisteredNumber] = useState('7671813023');

    const [isEditingLanguage, setIsEditingLanguage] = useState(false);
    const [languages, setLanguages] = useState('English, Hindi');

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with Back, Toggle, Notification */}
            <View style={styles.header}>
                {/* Back */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                    <Text style={styles.headerTitle}>Profile Info</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/support')} style={styles.supportButton}>
                    <Ionicons name="headset-outline" size={20} color="#000" style={{ marginRight: 6 }} />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Image
                    source={require('../assets/images/profile.jpg')} // or use a URI
                    style={styles.profileImage}
                />
                {/* Profile Info */}
                <View style={styles.infoContainer}>
                    {/* Name */}
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>Bala Anusha</Text>
                    <View style={styles.line} />

                    {/* Registered Number */}
                    <View style={styles.rowBetween}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>Registered Number</Text>
                            {isEditingNumber ? (
                                <TextInput
                                    style={styles.input}
                                    value={registeredNumber}
                                    onChangeText={setRegisteredNumber}
                                    keyboardType="number-pad"
                                />
                            ) : (
                                <Text style={styles.value}>{registeredNumber}</Text>
                            )}
                        </View>
                        {isEditingNumber ? (
                            <TouchableOpacity onPress={() => setIsEditingNumber(false)}>
                                <Text style={styles.editText}>Save</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setIsEditingNumber(true)}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.line} />
                    

                    {/* Gender */}
                    <Text style={styles.label}>Gender</Text>
                    <Text style={styles.value}>Male</Text>
                    <View style={styles.line} />

                    {/* Date of Birth */}
                    <Text style={styles.label}>Date of Birth</Text>
                    <Text style={styles.value}>19 August, 1992</Text>
                    <View style={styles.line} />

                    {/* Languages */}
                    <View style={styles.rowBetween}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>Languages I Speak</Text>
                            {isEditingLanguage ? (
                                <TextInput
                                    style={styles.input}
                                    value={languages}
                                    onChangeText={setLanguages}
                                />
                            ) : (
                                <Text style={styles.value}>{languages}</Text>
                            )}
                        </View>
                        {isEditingLanguage ? (
                            <TouchableOpacity onPress={() => setIsEditingLanguage(false)}>
                                <Text style={styles.editText}>Save</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setIsEditingLanguage(true)}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.line} />
                    
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
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
    scrollContent: {
        paddingBottom: 40, // enough space for scroll
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#0C4087',
        alignSelf: 'center',
        marginBottom: 30,
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
    infoContainer: {
        width: '100%',
    },
    label: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    line: {
        height: 1,
        backgroundColor: '#D1D5DB',
        marginBottom: 16,
        width: '100%',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editText: {
        color: '#0C4087',
        fontWeight: '600',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        paddingVertical: 4,
    },

});
