import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TruckBookingDetails() {
    const router = useRouter();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                        {/* Gray Section from top to Drop Location */}
                        <View style={styles.topSection}>
                            {/* Back Arrow */}
                            <TouchableOpacity
                                onPress={() => router.push('/truckdetails')}
                                style={styles.arrowWrapper}
                            >
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>Booking details</Text>
                        </View>

                        <Text style={styles.mainHeading}>Item Details </Text>
                        <View style={styles.goodsTypeCard}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                <Ionicons name="cube-outline" size={16} color="#ba1c1c" style={{ marginRight: 6 }} />
                                <Text style={styles.label}>Shiftyng Type</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.value}>Household Items </Text>
                                <TouchableOpacity>
                                    <Text style={styles.changeText}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.mainHeading}>Bike Details </Text>
                        <View style={styles.goodsTypeCard}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                                {/* Left side: Image + two lines of text */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../assets/images/bikeicon.png')}
                                        style={styles.serviceImage}
                                    />

                                    {/* Texts stacked vertically */}
                                    <View style={{ marginLeft: 8 }}>
                                        <Text style={styles.value}>Bike Transport</Text>
                                        <Text style={styles.weightValue}>50 Kgs</Text>
                                    </View>
                                </View>

                                {/* Right side: Change button */}
                                <TouchableOpacity>
                                    <Text style={styles.changeText}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.mainHeading}>Offers & Coupons </Text>
                        <TouchableOpacity style={styles.goodsTypeCard} activeOpacity={0.9} onPress={() => router.push('/coupons')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                {/* Left: Coupon icon + text */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="pricetag-sharp" size={22} color="#BA1C1C" />
                                    <Text style={[styles.value, { marginLeft: 8 }]}>Apply Coupon</Text>
                                </View>

                                {/* Right: Arrow icon */}
                                <Ionicons name="chevron-forward" size={22} color="#555" style={{ marginRight: 6 }} />
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.mainHeading}>Price Details </Text>
                        <View style={styles.priceCard}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.TripValue}>Fare Amount </Text>
                                <TouchableOpacity>
                                    <Text style={styles.amountText}>₹93.39</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.TripValue}>Net Amount </Text>
                                <TouchableOpacity>
                                    <Text style={styles.amountText}>₹93</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.appliedCoupon}>Coupon </Text>
                                <TouchableOpacity>
                                    <Text style={styles.changeText}>WELCOME</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.totalValue}>Total Amount </Text>
                                <TouchableOpacity>
                                    <Text style={styles.totalText}>₹93</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.newseparator} />
                        </View>
                    </ScrollView>


                    <View style={styles.bottomContainer}>
                        {/* Wrap icon + text in a row */}
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

                            {/* Left side: Icon + Text + Dropdown */}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.iconBox}>
                                    <Ionicons name="cash-outline" size={24} color="#0A7F44" />
                                </View>

                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.title}>Choose Payment Method</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.subtitle}>Cash</Text>
                                        <Ionicons
                                            name="chevron-down"
                                            size={18}
                                            color="#555"
                                            style={{ marginLeft: 4 }}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/* Right side: Amount */}
                            <Text style={styles.amount}>₹1,200</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => {
                                Alert.alert(
                                    'Confirm Booking',
                                    'Are you sure you want to confirm this booking?',
                                    [
                                        {
                                            text: 'Yes',
                                            onPress: () => router.push('/truckbookingsuccess'),
                                            
                                        },
                                        {
                                            text: 'No',
                                            onPress: () => router.push('/truckbookingdetails'),
                                        },
                                    ],
                                    { cancelable: true }
                                );
                            }}
                        >
                            <Text style={styles.submitButtonText}>Confirm Booking</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        paddingTop: 30,
    },
    topSection: {
        backgroundColor: '#FFFFFF', // gray background
        padding: 16,
        paddingBottom: 8, // spacing under card
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
    },
    arrowWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 6,

        borderColor: '#282424',
        borderWidth: 0.3,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        marginBottom: 30,
        
    },

    submitButton: {
        backgroundColor: '#ba1c1c',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },

    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    shiftType: {
        backgroundColor: '#FFFFFF',
        elevation: 4,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,

    },
    goodsTypeCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 8,
        elevation: 3,
    },
    priceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 8,
        elevation: 3,
        marginBottom: 50,
    },
    label: {
        fontSize: 14,
        color: '#1A1A1A',
    },
    value: {
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    appliedCoupon: {
        fontWeight: 'regular',

        fontSize: 16,
        color: '1A1A1A',
    },
    weightValue: {
        fontSize: 14,
        color: '#555',
    },
    mainHeading: {
        marginHorizontal: 16,
        marginTop: 24,
        fontSize: 15,
        fontWeight: '500',
        color: '#000',

    },
    changeText: {
        fontSize: 14,
        color: 'green',
        fontWeight: '500',
    },
    totalText: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    amountText: {

        fontWeight: 500,
        fontSize: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    serviceImage: {
        width: 72,
        height: 72,
        borderRadius: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#e8e5e5',
        marginTop: 14,
        marginBottom: 14,
    },
    newseparator: {
        height: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 14,
        marginBottom: 14,
    },
    TripValue: {
        fontWeight: '300',

        fontSize: 16,
        color: '1A1A1A',
    },
    totalValue: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },
    paymentMode: {
        fontFamily: 'Roboto_400Regular',
    },
    cashIcon: {
        borderColor: '#F2F2F2',
        padding: 4,
    },
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
    },
    subtitle: {
        fontSize: 12,
        color: '#6b6b6b',
        marginTop: 2,
        marginBottom: 6,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
        marginVertical: 4,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#E6F4EA',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
        color: 'green',

    },
});
