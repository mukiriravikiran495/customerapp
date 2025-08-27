import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
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
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Menu() {
  const router = useRouter();


  const menuItems = [
    { label: 'Home', icon: <Ionicons name="grid" size={20} color="#2e3a59" />, route: '/home' },
    { label: 'My Bookings', icon: <Ionicons name="cube-outline" size={20} color="#2e3a59" />, route: '/bookings' },
    // { label: 'My Earnings', icon: <Ionicons name="cash-outline" size={20} color="#2e3a59" />, route: '/myearnings' },
    { label: 'Transactions', icon: <Ionicons name="swap-horizontal" size={20} color="#2e3a59" />, route: '/transactions' },
    // { label: 'Profile', icon: <Feather name="user" size={20} color="#2e3a59" />, route: '/profile' },
    { label: 'Bank Account', icon: <FontAwesome name="bank" size={20} color="#2e3a59" />, route: '/bank' },
    { label: 'FAQ', icon: <Feather name="help-circle" size={20} color="#2e3a59" />, route: '/faq' },
    { label: 'Help & Support', icon: <Feather name="phone" size={20} color="#2e3a59" />, route: '/contact' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with Back, Toggle, Notification */}
        <View style={styles.header}>
          {/* Back */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={26} color="#000" />
            <Text style={styles.headerTitle}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/support')} style={styles.supportButton}>
            <Ionicons name="headset-outline" size={20} color="#000" style={{ marginRight: 6 }} />
            <Text style={styles.supportText}>Support</Text>
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.logo}></Text> */}
        <View style={styles.profileCard}>
          {/* Profile Section navigates to /profile */}
          <TouchableOpacity
            style={styles.profileRow}
            onPress={() => {
              console.log('Navigating to profile');
              router.push('/profile');
            }}
            activeOpacity={0.9}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>RK</Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.company}>Mukiri Ravi kiran</Text>
              <Text style={styles.email}>mukiriravikiran112@gmail.com</Text>
              <Text style={styles.phone}>7816035340</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>

          {/* Wallet Section navigates to /rechargewallet */}
          <TouchableOpacity
            style={styles.walletSection}
            onPress={() => {
              console.log('Navigating to rechargewallet');
              router.push('/rechargewallet');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.walletText}>Recharge Your Wallet</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>


        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.menuText}>{item.label}</Text>
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
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    paddingHorizontal: 10,
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
    color: '#0C4087',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 7,

    backgroundColor: '#fff',
    marginLeft: 2,
    height: 160,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 7,
    marginBottom: 15,
    backgroundColor: '#fff',
    marginLeft: 2,
    height: 55,
  },
  activeMenuItem: {

    backgroundColor: '#0C4087',
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
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 40,
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
  profileCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#caced2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f7b1b1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
  },

  profileDetails: {
    flex: 1,
  },

  company: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },

  email: {
    fontSize: 14,
    color: '#444',
  },

  phone: {
    fontSize: 14,
    color: '#444',
  },

  walletSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 16,
  },

  walletText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8, // space between icon and text
    color: '#000',
    paddingHorizontal: 12,
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
});
