import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Menu() {
    const router = useRouter();

    const menuItems = [

        { label: 'Home', icon: <Feather name="user" size={20} color="#2e3a59" />, route: '/home' },
        { label: 'Profile', icon: <Feather name="user" size={20} color="#2e3a59" />, route: '/profile' },
        { label: 'My Bookings', icon: <Ionicons name="cube-outline" size={20} color="#2e3a59" />, route: '/bookings', active: false },
        { label: 'Transactions', icon: <Ionicons name="arrow-forward-circle" size={22} color="#2e3a59" />, route: '/transactions' },
        { label: 'FAQ', icon: <Feather name="help-circle" size={20} color="#2e3a59" />, route: '/faq' },
        { label: 'Contact Us', icon: <Feather name="phone" size={20} color="#2e3a59" />, route: '/contact' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header with Back and Bell Icon */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/home')}>
                        <Ionicons name="arrow-back" size={24} color="#000000" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/')}>
                        <Ionicons name="notifications-outline" size={22} color="#000000" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.logo}>Shiftyng</Text>

                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.menuItem, item.active && styles.activeMenuItem]}
                        onPress={() => router.push(item.route as any)}
                    >
                        <View style={styles.iconContainer}>{item.icon}</View>
                        <Text style={[styles.menuText, item.active && styles.activeMenuText]}>{item.label}</Text>
                        <Feather name="chevron-right" size={18} color="#999" style={{ marginLeft: 'auto' }} />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.logoutItem} onPress={() => router.push('/login')}>
                    <Feather name="log-out" size={20} color="#c0392b" />
                    <Text style={styles.logoutText}>Logout</Text>
                    <Feather name="chevron-right" size={18} color="#c0392b" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    container: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        minHeight: height,
    },
    backIcon: {
        marginBottom: 20,
        marginTop: 10,
    },
    logo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ba1c1c',
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 7,
        marginBottom: 10,
        // backgroundColor: '#f4f4f4',

    },
    activeMenuItem: {
        backgroundColor: '#f4f4f4',
    },
    iconContainer: {
        width: 28,
        alignItems: 'center',
    },
    menuText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#2e3a59',

    },
    activeMenuText: {
        color: '#000',
        fontWeight: 'bold',
    },
    logoutItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 7,
        marginTop: 20,
        backgroundColor: '#fff3f3',
        borderWidth: 1,
        borderColor: '#f0dcdc',
    },
    logoutText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#c0392b',
        fontWeight: '500',
    },
});
