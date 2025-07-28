import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // For back icon
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
    Home: undefined;
    Bookings: undefined;
};

type BookingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Bookings'>;

interface BookingsProps {
    navigation: BookingsScreenNavigationProp;
}


const Bookings: React.FC<BookingsProps> = ({ navigation }) => {
    const booking = {
        pickupdate: 'Jan 21, 2025',
        dropdate: 'Jan 21, 2025',
        pickup: 'Near Victoria Memorial Metro Station, Metro Pillar No. 1634, Green Hills Colony, Main Road, Kothapet, Hyderabad, Telangana 500035',
        drop: 'Near Victoria Memorial Metro Station, Metro Pillar No. 1634, Green Hills Colony, Main Road, Kothapet, Hyderabad, Telangana 500035',
        status: 'Booking Completed',
        bhk: '1BHK',
        paymentStatus: 'Unpaid',
        vendorName: 'Leo Packers and Movers',
        contact: '7816035340',
        totalAmount: '19340',
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Bookings</Text>
            </View>

            {/* Booking Card */}
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.card}>
                    {/* Dates Row */}
                    <View style={styles.dateRow}>
                        <View style={styles.dateLeft}>
                            <MaterialCommunityIcons name="home-city" size={28} color="#BA1C1C" />
                            <Text style={styles.dateText}>{booking.pickupdate}</Text>
                        </View>
                        <Text style={styles.dots}>...</Text>
                        <Text style={styles.dateText}>{booking.dropdate}</Text>
                    </View>

                    {/* Locations */}
                    <View style={styles.locationSection}>
                        <View style={styles.locationRow}>
                            <MaterialCommunityIcons style={{marginLeft:10}} name="circle-slice-8" size={14} color='green' />
                            <Text style={styles.locationText}>{booking.pickup}</Text>
                        </View>
                        <View style={styles.locationRow}>
                            <MaterialCommunityIcons style={{marginLeft:10}} name="circle-slice-8" size={14} color="#ba1c1c" />
                            <Text style={styles.locationText}>{booking.drop}</Text>
                        </View>
                    </View>

                    {/* Status, BHK, Payment */}
                    <View style={styles.statusRow}>
                        <Text style={styles.statusText}>{booking.status}</Text>
                        <Text style={styles.bhkText}>{booking.bhk}</Text>
                        <Text style={styles.unpaidText}>{booking.paymentStatus}</Text>
                    </View>

                    {/* Vendor Info */}
                    <View style={styles.vendorRow}>
                        <View style={styles.vendorLeft}>
                            <View style={styles.vendorIcon}>
                                <Text style={styles.vendorInitials}>RK</Text>
                            </View>
                            <View>
                                <Text style={styles.vendorName}>{booking.vendorName}</Text>
                                <Text style={styles.vendorContact}>{booking.contact}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.amountLabel}>Total Amount</Text>
                            <Text style={styles.amountValue}>{booking.totalAmount}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
};

export default Bookings;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 30,
    },


    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    date: {
        fontSize: 16,
        fontWeight: '600',
    },
    label: {
        fontSize: 14,
        color: '#555',
    },
    locationSection: {
        marginVertical: 12,
    },

    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    statusText: {
        fontWeight: 'bold',
    },
    bhkText: {
        fontWeight: 'bold',
    },
    unpaidText: {
        color: 'red',
        fontWeight: 'bold',
    },
    vendorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    vendorLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vendorIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    vendorInitials: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    vendorName: {
        fontSize: 14,
        fontWeight: '500',
    },

    bulletPoint: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0C4087',
        marginRight: 8,
        marginTop: 6,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 12,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        marginBottom: 20,
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },

    locationText: {
        fontSize: 13,
        color: '#333',
        marginLeft: 10,
        flex: 1,
        
    },

    vendorContact: {
        color: '#008c23ff',
        fontSize: 14,
        marginTop: 2,
    },
    amountLabel: {
        fontSize: 13,
        color: '#666',
        textAlign: 'right',
    },
    amountValue: {
        color: '#008c23ff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10,

    },
    dateLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        flexShrink: 1,
        minWidth: 80,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#000000',
    },
    dots: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },


});
