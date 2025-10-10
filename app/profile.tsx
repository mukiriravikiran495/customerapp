import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
                    <Ionicons name="arrow-back" size={26} color="#222222" />
                    <Text style={styles.headerTitle}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.supportButton} onPress={() => alert("Support Clicked!")}>
                    <MaterialIcons name="support-agent" size={20} color="#222222" />
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
                    <Text style={styles.value}>Mukiri Ravi Kiran</Text>
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
    scrollContent: {
        paddingBottom: 40, // enough space for scroll
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#8E1515',
        alignSelf: 'center',
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 8,
        color: '#222222',
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
        color: "#222222",
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
        color: '#8E1515',
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
