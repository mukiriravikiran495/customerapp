import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Animated, Dimensions,
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <SafeAreaView style={styles.container}>
                {/* Space for status bar */}
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={26} color="#000" />
                    </TouchableOpacity>
                    {/* <MaterialCommunityIcons name="check-decagram" size={60} color="#16a34a" />
                    <FontAwesome5 name="shield-alt" size={50} color="#10b981" />
                    <Ionicons name="checkmark-done-circle-sharp" size={60} color="#059669" /> */}

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
                        <MaterialCommunityIcons name="check-decagram" size={60} color="#16a34a" />
                        <Text style={styles.sectionTitle}>Booking Confirmed!</Text>
                        <Text style={styles.messageTitle}>Your move has been successfully scheduled</Text>
                    </View>

                </View>



                {/* Booking Details */}
                <View style={styles.bookingCard}>

                    <Text style={styles.bookingTitle}>Booking Id : SH0076124534</Text>
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
                        <Ionicons name="radio-button-on" size={16} color="green" style={{ marginRight: 8 }} />
                        <Text style={styles.addressText} numberOfLines={2}>
                            Near Victoria Memorial Metro Station, Metro Pillar No. 1634, Green Hills Colony, Main Road, Kothapet, Hyderabad, Telangana 500035
                        </Text>
                    </View>

                    <View style={styles.addressRow}>
                        <Ionicons name="radio-button-on" size={16} color="red" style={{ marginRight: 8 }} />
                        <Text style={styles.addressText} numberOfLines={2}>
                            Near Victoria Memorial Metro Station, Metro Pillar No. 1634, Green Hills Colony, Main Road, Kothapet, Hyderabad, Telangana 500035
                        </Text>
                    </View>

                    {/* House type + Button */}
                    <View style={styles.houseRow}>
                        <Text style={styles.houseType}>House One BHK</Text>


                        <>
                            {/* Button to open modal */}
                            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.viewBtn}>
                                <Text style={styles.viewBtnText}>VIEW ITEMS</Text>
                            </TouchableOpacity>

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
                </View>

                {/* Booking Progress Timeline */}
                <View style={styles.timelineContainer}>
                    {[
                        { label: 'Booking placed on', date: 'Jan 21, 09:26 PM', completed: true },
                        { label: 'Pickup Completed', date: 'Jan 21, 09:26 PM', completed: true },
                        { label: 'Drop Completed', date: 'Jan 21, 09:26 PM', completed: false },
                    ].map((item, index, array) => {
                        const animatedHeight = useRef(new Animated.Value(0)).current;

                        useEffect(() => {
                            if (index !== 0 && array[index - 1].completed) {
                                Animated.timing(animatedHeight, {
                                    toValue: 30,
                                    duration: 600,
                                    useNativeDriver: false,
                                }).start();
                            }
                        }, []);

                        return (
                            <View key={index} style={styles.timelineItem}>
                                {/* Animated vertical line */}
                                {index !== 0 && (
                                    <Animated.View
                                        style={[
                                            styles.timelineLine,
                                            {
                                                height: animatedHeight,
                                                backgroundColor: array[index - 1].completed ? '#28a745' : '#ccc',
                                            },
                                        ]}
                                    />
                                )}

                                {/* Dot */}
                                <View
                                    style={[
                                        styles.timelineDot,
                                        {
                                            backgroundColor: item.completed ? '#28a745' : '#ccc',
                                            borderColor: item.completed ? '#28a745' : '#ccc',
                                        },
                                    ]}
                                />

                                {/* Text */}
                                <View style={styles.timelineContent}>
                                    <Text style={styles.timelineLabel}>{item.label}</Text>
                                    <Text style={styles.timelineDate}>{item.date}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>



                {/* View All Coupons Button */}
                <TouchableOpacity style={styles.couponButton} >
                    <View style={styles.couponLeft}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/color/48/discount--v1.png' }}
                            style={styles.couponIcon}
                        />
                        <Text style={styles.couponText}>Used Coupon</Text>
                    </View>
                    {/* <Ionicons style={styles.couponArrow} name="chevron-forward" size={20} color="#000" /> */}
                    <Text style={styles.couponArrow}>WELCOME</Text>
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
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>₹11,200</Text>
                    </View>
                </View>

                {/* Vendor details  */}
                <View style={styles.customerBox}>
                    <Text style={styles.sectionTitle}>Packers & Movers Details</Text>
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

                {/* Customer Details */}
                <View style={styles.customerBox}>
                    <Text style={styles.sectionTitle}>Customer Details</Text>
                    <View style={styles.companyRow}>
                        <View style={styles.headerInfo}>
                            <Text style={styles.companyName}>Mukiri Ravi kiran</Text>
                            <Text style={styles.address}>Hyderabad, Telangana</Text>
                            <Text style={styles.rating}>7816035340</Text>
                        </View>

                        <View style={styles.imageBox}>
                            <View style={styles.placeholderImage} />
                        </View>
                    </View>
                </View>
                {/* <View style={styles.customerBox}>
                    <Text style={styles.customerTitle}>Customer Details</Text>

                    <TextInput
                        placeholder="Enter Full Name"
                        placeholderTextColor="#888"
                        style={styles.customerInput}
                        value={customerName}
                        onChangeText={setCustomerName}
                    />

                    <TextInput
                        placeholder="Enter Email Id"
                        placeholderTextColor="#888"
                        style={styles.customerInput}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View> */}

                <View style={styles.actionButtonsContainer}>
                    {/* <TouchableOpacity
                        style={[styles.actionButton, styles.cancelButton]}
                        onPress={() => {
                            // Handle cancellation
                            alert('Booking Cancelled');
                        }}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => setShowCancelPopup(true)}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.payButton]}
                        onPress={() => {
                            // Navigate to payment or handle logic
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
                                    onPress={() => {setConfirmPopupVisible(false); router.push('/bookingsuccess');}}
                                >
                                    <Text style={{ textAlign: 'center', color: '#000' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

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

    bookingTitle: {
        fontSize: width * 0.05,
        fontWeight: '600',
        marginBottom: height * 0.017,

        marginLeft: width * 0.02,
    },
    sectionTitle: {
        fontSize: width * 0.05,
        fontWeight: '600',
        marginBottom: height * 0.017,

        marginLeft: width * 0.02,
    },
    messageTitle: {
        fontSize: width * 0.038,
        fontWeight: '600',
        marginBottom: height * 0.017,

        marginLeft: width * 0.02,
    },
    bookingCard: {
        backgroundColor: '#fff',
        margin: width * 0.00,
        // borderRadius: 12,
        padding: width * 0.04,
        marginTop: 7,

    },
    bookingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.015,
        marginLeft: width * 0.02,
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
        marginLeft: width * 0.02,
        marginTop: height * 0.01,
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
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: height * 0.018,
        height: height * 0.06,
        marginTop: 7,
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
        fontSize: width * 0.04,
        fontWeight: '900',
        color: '#058103ff',
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
        marginHorizontal: 0,

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

    timelineContainer: {
        paddingHorizontal: 48,

        paddingVertical: 16,
        marginTop: 7,
        backgroundColor: '#dae0f1ff',
    },

    timelineItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'relative',
        marginBottom: 16,
    },

    timelineLine: {
        position: 'absolute',
        width: 2,
        left: 8,
        top: 18,
        zIndex: -1,
    },


    timelineDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        marginRight: 12,
        marginTop: 2,
    },

    timelineContent: {
        flex: 1,
    },

    timelineLabel: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#000',
    },

    timelineDate: {
        fontSize: width * 0.035,
        color: '#555',
        marginTop: 2,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 20,
    },

    actionButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 6,
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

});
