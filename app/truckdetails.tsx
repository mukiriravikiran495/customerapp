import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SelectTruck() {
    const router = useRouter();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    {/* Gray Section from top to Drop Location */}
                    <View style={styles.topSection}>
                        {/* Back Arrow */}
                        <TouchableOpacity
                            onPress={() => router.push('/selectdropaddress')}
                            style={styles.arrowWrapper}
                        >
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        {/* Pickup & Drop Card */}
                        <View style={styles.locationCard}>
                            {/* Pickup Row */}
                            <View style={styles.row}>
                                <Ionicons name="location-sharp" size={20} color="green" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Pickup Location"
                                    placeholderTextColor="#ccc"
                                    multiline={false}
                                    numberOfLines={1}
                                />
                            </View>

                            {/* Separator */}
                            <View style={styles.separator} />

                            {/* Drop Row */}
                            <View style={styles.row}>
                                <Ionicons name="location-sharp" size={20} color="#BA1C1C" style={styles.icon}
                                    onPress={() => router.push('/truckdetails')} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Drop Location"
                                    placeholderTextColor="#ccc"
                                    multiline={false}
                                    numberOfLines={1}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.vehicleList}>
                        {/* Scooter */}
                        <View style={styles.vehicleItem}>
                            <View style={styles.vehicleInfo}>
                                <Ionicons name="bicycle" size={28} color="#ba1c1c" style={{ marginRight: 12 }} />
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.vehicleName}>Scooter</Text>
                                        <View style={styles.newBadge}>
                                            <Text style={styles.newBadgeText}>NEW</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.vehicleDetails}>20 Kg · 3 mins</Text>
                                </View>
                            </View>
                            <Text style={styles.price}>₹93</Text>
                        </View>

                        {/* 14ft Truck */}
                        <View style={styles.vehicleItem}>
                            <View style={styles.vehicleInfo}>
                                <Ionicons name="bus" size={28} color="#ba1c1c" style={{ marginRight: 12 }} />
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.vehicleName}>14ft</Text>
                                        <View style={styles.newBadge}>
                                            <Text style={styles.newBadgeText}>NEW</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.vehicleDetails}>3500 Kg · --</Text>
                                </View>
                            </View>
                            <Text style={styles.price}>₹1593</Text>
                        </View>

                        {/* 17ft Truck */}
                        <View style={styles.vehicleItem}>
                            <View style={styles.vehicleInfo}>
                                <Ionicons name="bus" size={28} color="#ba1c1c" style={{ marginRight: 12 }} />
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.vehicleName}>17ft</Text>
                                        <View style={styles.newBadge}>
                                            <Text style={styles.newBadgeText}>NEW</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.vehicleDetails}>6000 Kg · 9 mins</Text>
                                </View>
                            </View>
                            <Text style={styles.price}>₹2667</Text>
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => router.push('/truckbookingdetails')}
                        >
                            <Text style={styles.submitButtonText}>Proceed</Text>
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
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    topSection: {
        backgroundColor: '#F2F2F2', // gray background
        padding: 16,
        paddingBottom: 16, // spacing under card
    },
    arrowWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 6,
        borderColor: '#282424',
        borderWidth: 0.3,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    locationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
        elevation: 4,
    },
    separator: {
        height: 1,
        backgroundColor: '#e8e5e5',

    },
    icon: {
        marginRight: 4,
        marginLeft: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        paddingVertical: 18,
    },
    serviceSectionTitle: {
        flex: 1,
        fontSize: 16,
        marginTop: 10,
        paddingLeft: 16,
        color: '#2e2d2d',
        fontFamily: 'Roboto_400Regular',
    },
    continueButton: {
        backgroundColor: '#ba1c1c', // iOS blue style
        marginHorizontal: 16,
        marginTop: 12,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    vehicleList: {
        paddingHorizontal: 36,
        marginTop: 12,

    },
    vehicleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        // borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginTop: 12,

    },
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1a1a1a',
        marginRight: 6,
        fontFamily: 'Roboto_700Bold',
    },
    vehicleDetails: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    newBadge: {
        backgroundColor: 'green',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    newBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
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
}

});
