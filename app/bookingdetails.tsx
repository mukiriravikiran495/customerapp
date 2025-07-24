import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function BookingDetails() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <SafeAreaView style={styles.container}>
                {/* Space for status bar */}
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={26} color="#000" />
                    </TouchableOpacity>

                    <View style={styles.companyRow}>
                        <View style={styles.headerInfo}>
                            <Text style={styles.companyName}>Leo Packers and Movers</Text>
                            <Text style={styles.address}>Hyderabad, Telangana</Text>
                            <Text style={styles.rating}>Rating 4+</Text>
                        </View>

                        <View style={styles.imageBox}>
                            <View style={styles.placeholderImage} />
                        </View>
                    </View>
                </View>



                {/* Booking Details */}
                <View style={styles.bookingCard}>
                    <Text style={styles.sectionTitle}>Booking Details</Text>

                    <View style={styles.bookingRow}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/emoji/48/house-emoji.png' }}
                            style={styles.icon}
                        />
                        <Text style={styles.dateText}>Jan 21, 09:26 PM</Text>
                        <Ionicons name="ellipsis-horizontal" size={20} color="#000" style={{ marginHorizontal: 5 }} />
                        <Text style={styles.dateText}>Jan 22, 09:26 PM</Text>
                    </View>

                    {/* Address Rows */}
                    <View style={styles.addressRow}>
                        <Ionicons name="radio-button-on" size={16} color="blue" style={{ marginRight: 8 }} />
                        <Text style={styles.addressText} numberOfLines={2}>
                            Near Victoria Memorial Metro Station, Metro Pillar No. 1634, Green Hills Colony, Main Road, Kothapet, Hyderabad, Telangana 500035
                        </Text>
                    </View>

                    <View style={styles.addressRow}>
                        <Ionicons name="location" size={16} color="green" style={{ marginRight: 8 }} />
                        <Text style={styles.addressText} numberOfLines={2}>
                            Near Victoria Memorial Metro Station, Metro Pillar No. 1634, Green Hills Colony, Main Road, Kothapet, Hyderabad, Telangana 500035
                        </Text>
                    </View>

                    {/* House type + Button */}
                    <View style={styles.houseRow}>
                        <Text style={styles.houseType}>House One BHK</Text>
                        <TouchableOpacity style={styles.viewBtn}>
                            <Text style={styles.viewBtnText}>VIEW ITEMS</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* View All Coupons Button */}
                <TouchableOpacity style={styles.couponButton} onPress={() => { }}>
                    <View style={styles.couponLeft}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/color/48/discount--v1.png' }}
                            style={styles.couponIcon}
                        />
                        <Text style={styles.couponText}>View all  Coupons</Text>
                    </View>
                    <Ionicons style={styles.couponArrow} name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>

                {/* Saving */}
                <TouchableOpacity style={styles.couponButton} onPress={() => { }}>
                    <View style={styles.couponLeft}>

                        <Text style={styles.totalSaving}>Your Total Saving</Text>
                    </View>
                    <Text style={styles.savedAmount}>1200</Text>
                </TouchableOpacity>

                {/* Price Breakdown Section */}
                <View style={styles.priceCard}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Base Price</Text>
                        <Text style={styles.priceValue}>₹10,000</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Install Uninstall</Text>
                        <Text style={styles.priceValue}>₹10,000</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Wrapping Charges</Text>
                        <Text style={styles.priceValue}>FREE</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>labour Charges</Text>
                        <Text style={styles.priceValue}>FREE</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>GST (18%)</Text>
                        <Text style={styles.priceValue}>₹1,800</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Discount</Text>
                        <Text style={styles.discountValue}>-₹600</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.priceRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>₹11,200</Text>
                    </View>
                </View>


                {/* Customer Details */}
                <View style={styles.customerBox}>
                    <Text style={styles.customerTitle}>Customer Details</Text>

                    <TextInput
                        placeholder="Enter Full Name"
                        placeholderTextColor="#888"
                        style={styles.customerInput}
                    />

                    <TextInput
                        placeholder="Enter Email Id"
                        placeholderTextColor="#888"
                        style={styles.customerInput}
                    />
                </View>

                {/* Confirm Button */}
                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: height * 0.1, // Ensure there’s space at bottom
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f1f1ff',
    },
    // header: {
    //     flexDirection: 'row',
    //     alignItems: 'flex-start',
    //     padding: width * 0.04,
    //     backgroundColor: '#fff',
    //     justifyContent: 'space-between',
    // },
    leftHeader: {
        flexDirection: 'column',
        flex: 1,

    },

    // headerInfo: {
    //     flex: 1,
    //     marginLeft: width * 0.03,
    // },
    companyName: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginTop: height * 0.01,
        marginLeft: width * 0.01,
    },
    address: {
        fontSize: width * 0.035,
        color: '#555',
        marginTop: 2,
        marginLeft: width * 0.01,
    },
    rating: {
        fontSize: width * 0.035,
        fontWeight: '500',
        color: '#111',
        marginTop: 4,
        marginLeft: width * 0.01,
    },
    // imageBox: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    placeholderImage: {
        width: 60,
        height: 60,
        backgroundColor: '#e5d5eaff',
        borderRadius: 8,
    },

    bookingCard: {
        backgroundColor: '#fff',
        margin: width * 0.00,
        // borderRadius: 12,
        padding: width * 0.04,
        marginTop: 10,
        marginRight: width * 0.01,
        marginLeft: width * 0.01,
    },
    sectionTitle: {
        fontSize: width * 0.045,
        fontWeight: '600',
        marginBottom: height * 0.015,
    },
    bookingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.015,
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 8,
    },
    dateText: {
        fontSize: width * 0.039,
        color: '#000',
        fontWeight: '500',
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: height * 0.012,
    },
    addressText: {
        fontSize: width * 0.035,
        color: '#333',
        flex: 1,
    },
    houseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height * 0.015,
    },
    houseType: {
        fontSize: width * 0.04,
        fontWeight: '500',
        marginLeft: width * 0.01,
    },
    viewBtn: {
        borderWidth: 1,
        borderColor: '#BA1C1C',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: width * 0.02,
    },
    viewBtnText: {
        color: '#BA1C1C',
        fontWeight: '600',
        fontSize: width * 0.035,

    },

    form: {
        paddingHorizontal: width * 0.04,
        marginTop: height * 0.01,
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.04,
        borderRadius: width * 0.02,
        fontSize: width * 0.04,
        color: '#000',
        marginBottom: height * 0.012,
    },
    couponButton: {
        backgroundColor: '#d6dff8ff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: height * 0.018,
        height: height * 0.06,
        marginTop: 10,
        margin: width * 0.00,
    },
    couponLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    couponIcon: {
        width: 22,
        height: 22,
        marginRight: width * 0.05,
        marginLeft: width * 0.05,

    },
    couponText: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#000',

    },
    couponArrow: {
        marginRight: width * 0.05,
    },
    totalSaving: {
        marginLeft: 25,
        fontWeight: '600',
        color: '#058103ff',
    },
    savedAmount: {
        fontWeight: '900',
        color: '#058103ff',
        marginRight: width * 0.06,
    },
    priceCard: {
        backgroundColor: '#fff',
        padding: width * 0.04,
        marginTop: 10,
        marginHorizontal: 0,

    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.01,
        marginLeft: width * 0.02,
        marginRight: width * 0.02,
    },
    priceLabel: {
        fontSize: width * 0.038,
        color: '#333',
    },
    priceValue: {
        fontSize: width * 0.038,
        fontWeight: '500',
        color: '#000',
    },
    discountValue: {
        fontSize: width * 0.038,
        fontWeight: '500',
        color: '#BA1C1C',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: height * 0.01,
    },
    totalLabel: {
        fontSize: width * 0.045,
        fontWeight: '700',
        color: '#000',
    },
    totalValue: {
        fontSize: width * 0.045,
        fontWeight: '700',
        color: '#000',
    },

    header: {
        padding: width * 0.04,
        backgroundColor: '#fff',
    },

    backButton: {
        marginBottom: 10,
    },

    companyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerInfo: {
        flex: 1,
    },

    imageBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },

    customerBox: {
        backgroundColor: '#fff',
        
        
        padding: width * 0.04,
        
        marginTop: height * 0.01,
    },

    customerTitle: {
        fontSize: width * 0.045,
        fontWeight: '600',
        marginBottom: height * 0.015,
        color: '#000',
    },

    customerInput: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.04,
        borderRadius: 4,
        fontSize: width * 0.04,
        color: '#000',
        marginBottom: height * 0.015,
    },

    confirmButton: {
        backgroundColor: '#BA1C1C',
        paddingVertical: height * 0.018,
        marginHorizontal: width * 0.04,
        borderRadius: 4,
        marginTop: height * 0.02,
        marginBottom: height * 0.05,
        alignItems: 'center',
    },

    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: width * 0.045,
    },

});
