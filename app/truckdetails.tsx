import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SelectTruck() {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 120 }} // to avoid overlapping with button
                        showsVerticalScrollIndicator={false}
                    >
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
                                    <Ionicons name="location-sharp" size={20} color="#8E1515" style={styles.icon}
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
                            <TouchableOpacity
                                style={[styles.vehicleItem, expanded && styles.expandedCard]}
                                onPress={() => setExpanded(!expanded)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.vehicleInfo}>
                                    <Image
                                        source={require('../assets/images/bikeicon.png')}
                                        style={styles.serviceImage}
                                    />
                                    <View style={{ padding: 16 }}>
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
                            </TouchableOpacity>
                            {/* 14ft Truck */}
                            <TouchableOpacity style={styles.vehicleItem}>
                                <View style={styles.vehicleInfo}>
                                    <Image
                                        source={require('../assets/images/truckicon.png')}
                                        style={styles.serviceImage}
                                    />
                                    <View style={{ padding: 16, }}>
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
                            </TouchableOpacity>

                            {/* 17ft Truck */}
                            <TouchableOpacity style={styles.vehicleItem}>
                                <View style={styles.vehicleInfo}>
                                    <Image
                                        source={require('../assets/images/truck4.png')}
                                        style={styles.serviceImage}
                                    />
                                    <View style={{ padding: 16, }}>
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
                            </TouchableOpacity>
                            {/* 17ft Truck */}
                            <TouchableOpacity style={styles.vehicleItem}>
                                <View style={styles.vehicleInfo}>
                                    <Image
                                        source={require('../assets/images/truck4.png')}
                                        style={styles.serviceImage}
                                    />
                                    <View style={{ padding: 16, }}>
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
                            </TouchableOpacity>
                            {/* 17ft Truck */}
                            <TouchableOpacity style={styles.vehicleItem}>
                                <View style={styles.vehicleInfo}>
                                    <Image
                                        source={require('../assets/images/truck4.png')}
                                        style={styles.serviceImage}
                                    />
                                    <View style={{ padding: 16, }}>
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
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
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
        backgroundColor: '#FFFFFF',
        paddingTop: 30,
    },
    topSection: {
        backgroundColor: '#FFFFFF', // gray background
        padding: 16,
        paddingBottom: 16, // spacing under card
    },
    arrowWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 6,
        borderColor: '#FFFFFF',
        borderWidth: 0.3,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    locationCard: {
        backgroundColor: '#F2F2F2',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F2F2F2',
        overflow: 'hidden',
        
    },
    separator: {
        height: 1,
        backgroundColor: '#DBDBDB',
        marginHorizontal: 16,
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
        color: '#222222',
        paddingVertical: 18,
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
        // borderBottomColor: '#eee',
        

    },
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#222222',
        marginRight: 6,
        
    },
    vehicleDetails: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    newBadge: {
        backgroundColor: '#15803D',
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
        fontWeight: '400',
        color: '#222222',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#FFFFFF',
        marginBottom: 30,
    },

    submitButton: {
        backgroundColor: '#8E1515',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
    },
    serviceImage: {
        width: 72,
        height: 72,
        borderRadius: 10,
    },
    extraInfo: {
        marginTop: 8,
    },
    extraText: {
        fontSize: 12,
        color: '#222222',
        marginBottom: 4,
    },
    expandedCard: {
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderWidth: 0.5,
        borderColor: '#8E1515',
        width: '110%', // Full width
        alignSelf: 'center',
    },
});
