import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function help() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with Back, Toggle, Notification */}
            <View style={styles.header}>
                {/* Back */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                    <Text style={styles.headerTitle}>Help</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={18} color="#000" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search your issue"
                    placeholderTextColor="#555"
                    style={styles.searchInput}
                />
            </View>
            <View style={styles.helpCard}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.helpTitle}>Need Help?</Text>
                    <Text style={styles.helpSubtitle}>Chat with support team</Text>
                </View>
                <TouchableOpacity style={styles.chatButton} onPress={() => router.push('/chatbox')} >
                    <Text style={styles.chatButtonText}>Chat with us</Text>
                </TouchableOpacity>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    searchPlaceholder: {
        fontSize: 15,
        color: '#777',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10, // Optional: Make it more pill-like
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 20,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,

        // Elevation for Android
        elevation: 1,
        backgroundColor: '#fff', // Needed for shadow visibility
    },


    searchIcon: {
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },
    helpCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        marginBottom: 20,
    },

    helpTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },

    helpSubtitle: {
        fontSize: 14,
        color: '#555',
    },

    chatButton: {
        backgroundColor: '#BA1C1C',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
    },

    chatButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },

});
