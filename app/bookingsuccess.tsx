import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');
const electronics = [
    {
        id: 7,
        name: "Television",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
    },
    {
        id: 8,
        name: "Refrigerator",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200&h=200&fit=crop",
    },
    {
        id: 9,
        name: "Washing Machine",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
    },
    {
        id: 10,
        name: "Laptop",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
    },
    {
        id: 11,
        name: "Microwave",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8aa3?w=200&h=200&fit=crop",
    },
    {
        id: 12,
        name: "Air Conditioner",
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=200&fit=crop",
    },
    {
        id: 1,
        name: "Television",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
    },
    {
        id: 2,
        name: "Refrigerator",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200&h=200&fit=crop",
    },
    {
        id: 3,
        name: "Washing Machine",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
    },
    {
        id: 4,
        name: "Laptop",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
    },
    {
        id: 5,
        name: "Microwave",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8aa3?w=200&h=200&fit=crop",
    },
    {
        id: 6,
        name: "Air Conditioner",
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=200&fit=crop",
    },
];

export default function BookingDetails() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <SafeAreaView style={styles.container}>
                    {/* Space for status bar */}
                    <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={26} color="#000" />
                        </TouchableOpacity>
                        <View style={{
                            backgroundColor: '#d1fae5',
                            padding: 20,
                            // borderRadius: 100,
                            shadowColor: '#16a34a',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.4,
                            shadowRadius: 10,
                            elevation: 10,
                            alignItems: 'center',
                            width: '100%',
                        }}>
                            <LottieView
                                source={require('@/assets/animations/success3.json')}
                                autoPlay
                                loop={true}

                                style={styles.lottie}
                            />
                            <Text style={styles.sectionTitle}>Booking Confirmed!</Text>
                            <Text style={styles.messageTitle}>Your move has been successfully scheduled</Text>
                        </View>
                    </View>

                    {/* Booking Details */}

                    <Text style={styles.sectionTitle}>Booking Details</Text>

                    {/* Address Rows */}
                    <View style={styles.locationCard}>
                        {/* From Location */}
                        <View style={styles.addressRow}>
                            <Ionicons name="location-sharp" size={16} color="green" style={{ marginRight: 8 }} />
                            <Text style={styles.addressText} numberOfLines={2}>
                                Near Victoria Memorial Metro Station, Metro Pillar No. 1634, Green Hills Colony, Main Road, Kothapet, Hyderabad, Telangana 500035
                            </Text>
                        </View>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* To Location */}
                        <View style={styles.addressRow}>
                            <Ionicons name="location-sharp" size={16} color="#BA1C1C" style={{ marginRight: 8 }} />
                            <Text style={styles.addressText} numberOfLines={2}>
                                Near Victoria Memorial Metro Station, Metro Pillar No. 1634, Green Hills Colony, Main Road, Kothapet, Hyderabad, Telangana 500035
                            </Text>
                        </View>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* ONE BHK and View Items Row */}
                        <View style={styles.infoRow}>
                            <Text style={styles.bhkText}>ONE BHK</Text>
                            {/* Vertical Divider */}
                            <View style={styles.verticalDivider} />
                            <View style={styles.viewItemsRow}>
                                <Ionicons name="eye-outline" size={16} color="#BA1C1C" style={{ marginRight: 4 }} />
                                <TouchableOpacity onPress={() => setShowModal(true)} >
                                    <Text style={styles.viewItemsText}>VIEW ITEMS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.companyRow}>
                        {/* Shift Date section */}
                        <View style={styles.dateSection}>
                            <Text style={styles.dateLabel}>Shift Date</Text>
                            <Text style={styles.dateValue}>12 Aug 2025</Text>
                        </View>

                        {/* Vertical Divider */}
                        <View style={styles.verticalDivider} />

                        {/* Drop Date section */}
                        <View style={styles.dateSection}>
                            <Text style={styles.dateLabel}>Drop Date</Text>
                            <Text style={styles.dateValue}>13 Aug 2025</Text>
                        </View>
                    </View>

                    {/* House type + Button */}
                    <View style={styles.houseRow}>
                        <>
                            {/* MODAL */}
                            <Modal visible={showModal} animationType="slide" transparent={true}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
                                    <View style={{ width: '90%', height: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>

                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowModal(false);
                                                router.push('/items');
                                            }}
                                            style={{ marginTop: 10, marginBottom: 10 }}
                                        >
                                            <Text style={{ color: '#ba1c1c', textAlign: 'right', textDecorationLine: 'underline', fontWeight: '500' }}>
                                                + Add items
                                            </Text>
                                        </TouchableOpacity>

                                        {/* Constrain FlatList height to avoid overflow */}
                                        <View style={{ flex: 1 }}>
                                            <FlatList
                                                data={electronics}
                                                keyExtractor={(item) => item.id.toString()}
                                                numColumns={2}
                                                showsVerticalScrollIndicator={false}
                                                contentContainerStyle={{
                                                    paddingHorizontal: 5,
                                                    paddingBottom: 20,
                                                }}
                                                columnWrapperStyle={{
                                                    justifyContent: 'center',
                                                    marginBottom: 15,
                                                }}
                                                renderItem={({ item }) => (
                                                    <View
                                                        style={{
                                                            width: width / 3.8, // slightly reduced to fit inside modal
                                                            backgroundColor: '#fff',
                                                            borderRadius: 10,
                                                            alignItems: 'center',
                                                            elevation: 2,
                                                            padding: 5,
                                                            margin: 5, // use margin instead of marginHorizontal
                                                        }}
                                                    >
                                                        <Image
                                                            source={{ uri: item.image }}
                                                            style={{ width: 80, height: 80, borderRadius: 5 }}
                                                        />
                                                        <Text style={{ fontSize: 12, marginVertical: 4 }}>{item.name}</Text>
                                                        <TouchableOpacity
                                                            style={{
                                                                backgroundColor: '#ba1c1c',
                                                                paddingVertical: 5,
                                                                paddingHorizontal: 10,
                                                                borderRadius: 5,
                                                            }}
                                                        >
                                                            <Text style={{ color: '#fff', fontSize: 12 }}>ADD</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            />

                                        </View>

                                        {/* Buttons */}
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                            <TouchableOpacity
                                                style={{
                                                    width: 120,
                                                    backgroundColor: '#ba1c1c',
                                                    padding: 12,
                                                    borderRadius: 5,
                                                    marginHorizontal: 8,
                                                }}
                                                onPress={() => setShowModal(false)}
                                            >
                                                <Text style={{ textAlign: 'center', color: '#fff' }}>Done</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{
                                                    width: 120,
                                                    backgroundColor: '#BA1C1C',
                                                    padding: 12,
                                                    borderRadius: 5,
                                                    marginHorizontal: 8,
                                                }}
                                                onPress={() => setShowModal(false)}
                                            >
                                                <Text style={{ textAlign: 'center', color: '#fff' }}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </>
                    </View>


                    {/* View All Coupons Button */}
                    <TouchableOpacity style={styles.trackingButton} onPress={() => { router.push('/moverstracking'); }}>

                       
                            <Text style={styles.viewItemsText}>VIEW TRACKING</Text>
                       
                    </TouchableOpacity>



                    {/* Price Breakdown Section */}
                    {/* <Text style={styles.sectionTitle}>Price Details</Text> */}
                    <View style={styles.priceCard}>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Base Price</Text>
                            <Text style={styles.priceValue}>10,000</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Install Uninstall</Text>
                            <Text style={styles.priceValue}>10,000</Text>
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
                            <Text style={styles.priceValue}>1,800</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Discount</Text>
                            <Text style={styles.discountValue}>-₹600</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.priceRow}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>₹11,200</Text>
                        </View>
                    </View>


                    {/* Vendor details  */}
                    <View >

                        <View style={styles.moversRow}>

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





                </SafeAreaView>
            </ScrollView>
            {/* Confirm Button */}
            <View style={styles.footer}>
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => setShowCancelPopup(true)}>
                        <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.payButton]}
                        onPress={() => {
                            router.push('/payment');
                        }}
                    >
                        <Text style={styles.payButtonText}>Make Payment</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={showCancelPopup}
                    animationType="fade"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: '#00000099', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, width: '80%' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }}>
                                Are you sure you want to Cancel the booking?
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#BA1C1C',
                                        padding: 10,
                                        borderRadius: 5,
                                        flex: 1,
                                        marginRight: 10,
                                    }}
                                    // onPress={() => {
                                    //     setConfirmPopupVisible(false);
                                    //     alert('Booking Confirmed!'); // Replace this with actual logic
                                    // }}
                                    onPress={() => {
                                        setConfirmPopupVisible(false);
                                        router.push('/bookings'); // ✅ navigate to summary page
                                    }}
                                >
                                    <Text style={{ color: '#fff', textAlign: 'center' }}>OK</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#ccc',
                                        padding: 10,
                                        borderRadius: 5,
                                        flex: 1,
                                        marginLeft: 10,
                                    }}
                                    onPress={() => { setConfirmPopupVisible(false); router.push('/bookingsuccess'); }}
                                >
                                    <Text style={{ textAlign: 'center', color: '#000' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: height * 0.1, // Ensure there’s space at bottom
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    leftHeader: {
        flexDirection: 'column',
        flex: 1,

    },
    header: {
        padding: width * 0.04,
        backgroundColor: '#F2F2F2',
    },

    backButton: {
        marginBottom: 10,
    },
    companyName: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginTop: height * 0.01,
        marginLeft: width * 0.02,
    },
    address: {
        fontSize: width * 0.035,
        color: '#555',
        marginTop: 2,
        marginLeft: width * 0.02,
    },
    rating: {
        fontSize: width * 0.035,
        fontWeight: '500',
        color: '#111',
        marginTop: 4,
        marginLeft: width * 0.02,
    },
    placeholderImage: {
        width: 60,
        height: 60,
        backgroundColor: '#e5d5eaff',
        borderRadius: 8,
    },
    headerInfo: {
        flex: 1,
    },

    imageBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        marginBottom: 30,
        
    },

    actionButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 5,
    },

    cancelButton: {
        backgroundColor: '#BA1C1C', // red-500
    },

    payButton: {
        backgroundColor: '#16a34a', // green-600
    },

    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    payButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    lottie: {
        width: 50,
        height: 50,
    },
    locationCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginVertical: 10,
        marginHorizontal: 12,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 6,
        color: '555',
    },
    addressText: {
        fontSize: 14,
        color: '#555',
        flex: 1,
        fontWeight: '500',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        marginHorizontal: 24,
    },
    bhkText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',

    },
    viewItemsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verticalDivider: {
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        height: 16,
        marginHorizontal: 10,
    },
    viewItemsText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#BA1C1C',
    },
    houseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height * 0.01,
        marginLeft: width * 0.02,
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
    dateSection: {
        flex: 1, // equal width for both sides
        alignItems: 'center',
        padding: 8,
    },
    dateLabel: {
        fontSize: 12,
        color: '#555',
        fontWeight: '500',
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
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

    trackingButton: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.018,
        height: height * 0.06,
        
        margin: width * 0.00,
        marginHorizontal: 12,
        borderRadius: 30,
        elevation: 2,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#BA1C1C'
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
        color: '#BA1C1C'
    },
    couponText: {
        fontSize: width * 0.04,
        fontWeight: '600',

        color: '#555',           // softer color for secondary info

        letterSpacing: 0.3,

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
        marginTop: 7,
        marginHorizontal: 12,
        borderRadius: 10,
        elevation: 2,
        marginBottom: 10,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.01,
        marginLeft: width * 0.02,
        marginRight: width * 0.02,
        marginTop: height * 0.01,

    },
    priceLabel: {
        fontSize: width * 0.038, // slightly smaller for labels
        color: '#555',           // softer color for secondary info
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    divider: {
        height: 1,
        backgroundColor: '#ecebeb',
        marginVertical: height * 0.01,
        marginHorizontal: -12,
    },
    priceValue: {
        fontSize: width * 0.04,  // slightly bigger for values
        fontWeight: '600',
        color: '#111',           // darker for stronger visual
    },
    discountValue: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#BA1C1C',        // red for discount
    },

    totalLabel: {
        fontSize: width * 0.042,
        fontWeight: '700',
        color: '#000',
    },

    totalValue: {
        fontSize: width * 0.045,
        fontWeight: '800',
        color: '#000',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: height * 0.015,

        marginLeft: width * 0.04,
    },
    messageTitle: {
        fontSize: width * 0.038,
        fontWeight: '600',
        marginBottom: height * 0.017,

        marginLeft: width * 0.02,
    },
    companyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        padding: 8,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    moversRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        padding: 8,
        borderRadius: 10,
        marginBottom: 40,
        elevation: 2,
    },
    customerBox: {
        backgroundColor: '#fff',
        marginHorizontal: 12,
        borderRadius: 10,
        padding: width * 0.04,
        elevation: 2,
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
        marginHorizontal: 12,
        borderRadius: 10,
        marginTop: height * 0.02,
        marginBottom: height * 0.05,
        alignItems: 'center',
        elevation: 4,

    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: width * 0.045,
        fontFamily: 'Roboto_500Medium',
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        marginTop: 10,
    },
});
