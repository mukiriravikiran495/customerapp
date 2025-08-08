import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import {
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useMemo, useRef, useState } from 'react';



export default function SelectTruck() {
    const router = useRouter();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const [dropLocation, setDropLocation] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverMobile, setReceiverMobile] = useState('');

    const snapPoints = useMemo(() => ['40%'], []);

    // Show bottom drawer when drop location is entered
    const handleDropChange = (text: string) => {
        setDropLocation(text);
        if (text.trim().length > 0) {
            bottomSheetModalRef.current?.present();
        }
    };

    const handleSubmit = () => {
        console.log('Receiver:', receiverName, receiverMobile);
        bottomSheetModalRef.current?.close();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>

                    {/* Gray Section from top to Drop Location */}
                    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                        <View style={styles.topSection}>

                            {/* Back Arrow */}
                            <TouchableOpacity
                                onPress={() => router.push('/home')}
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
                                {/* <TouchableOpacity style={styles.row} onPress={() => router.push('/dropaddress')}>
                                    <Ionicons name="location-sharp" size={20} color="#BA1C1C" style={styles.icon}
                                         />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Drop Location"
                                        placeholderTextColor="#ccc"
                                        multiline={false}
                                        numberOfLines={1}
                                        value={dropLocation}
                                       
                                    />
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => router.push('/dropaddress')} activeOpacity={0.8}>
                                    <View style={styles.searchBar}>
                                        <Ionicons
                                            name="location-sharp"
                                            size={20}
                                            color="#BA1C1C"
                                            style={styles.icon}
                                        />
                            
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Drop location"
                                            placeholderTextColor="#888"
                                            editable={false}
                                            
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Select on Map Button */}
                        <TouchableOpacity style={styles.mapButton} onPress={() => router.push('/pickupaddress')}>
                            <Ionicons name="location-sharp" size={20} color="#Ba1C1C" style={styles.mapIcon} />
                            <Text style={styles.mapButtonText}>Select on Map</Text>
                        </TouchableOpacity>

                        <View style={styles.separator} />
                        <TouchableOpacity
                            style={styles.addressCard}
                            activeOpacity={0.7} onPress={() => router.push('/dropaddress')}
                        >
                            <Ionicons name="time-outline" size={22} color="#555" />

                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Text style={styles.addressTitle}>97, South Kamala Nagar </Text>
                                </View>

                                <Text style={styles.addressSubtitle} numberOfLines={1}>
                                    Kamalanagar, Anupuram Colony, Kapra, Secunderabad
                                </Text>
                            </View>

                            <Ionicons name="heart-outline" size={20} color="#555" />
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity
                            style={styles.addressCard}
                            activeOpacity={0.7}
                            onPress={() => router.push('/dropaddress')}
                        >
                            <Ionicons name="time-outline" size={22} color="#555" />
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Text style={styles.addressTitle}>48, Mahesh Nagar </Text>

                                </View>
                                <Text style={styles.addressSubtitle} numberOfLines={1}>
                                    Mahesh nagar, Kapra, ECIL, Hyderabad, 500062
                                </Text>
                            </View>
                            <Ionicons name="heart-outline" size={20} color="#555" />
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity
                            style={styles.addressCard}
                            activeOpacity={0.7}
                            onPress={() => router.push('/dropaddress')}
                        >
                            <Ionicons name="time-outline" size={22} color="#555" />
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Text style={styles.addressTitle}>105, Kukatpally </Text>

                                </View>
                                <Text style={styles.addressSubtitle} numberOfLines={1}>
                                    Kukatpally, Near JNTUH, Hyderabad, 500048
                                </Text>
                            </View>
                            <Ionicons name="heart-outline" size={20} color="#555" />
                        </TouchableOpacity>
                    </ScrollView>

                    {/* Bottom Drawer for Receiver Details */}
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={snapPoints}
                        index={0}
                        enablePanDownToClose
                    >
                        <View style={{ flex: 1, padding: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Receiver Details</Text>

                            <TextInput
                                style={styles.bottomInput}
                                placeholder="Receiver Name"
                                value={receiverName}
                                onChangeText={setReceiverName}
                            />

                            <TextInput
                                style={styles.bottomInput}
                                placeholder="Mobile Number"
                                value={receiverMobile}
                                onChangeText={setReceiverMobile}
                                keyboardType="phone-pad"
                            />

                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetModal>

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
        paddingBottom: 24, // spacing under card
    },
    searchBar:{
        flexDirection: 'row',
        alignItems: 'center',
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
        elevation: 2,
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
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,

        marginHorizontal: 0, // full width like card
    },
    mapIcon: {
        marginRight: 6,
    },
    mapButtonText: {
        color: '#BA1C1C',
        fontSize: 16,
        fontWeight: '600',
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },

    addressTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },

    addressSubtitle: {
        fontSize: 12,
        color: '#1A1A1A',
        marginTop: 2,
    },
    bottomContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#ba1c1c',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 30,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        marginBottom: 12,
    },
});
