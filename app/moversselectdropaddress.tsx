import { Ionicons } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useEffect, useMemo, useRef, useState } from 'react';



export default function MoversSelectDropAddress() {
    const router = useRouter();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [address, setAddress] = useState('Fetching location...');
    const [dropLocation, setDropLocation] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverMobile, setReceiverMobile] = useState('');

    const screenHeight = Dimensions.get('window').height;
    const snapPoints = useMemo(() => [screenHeight / 1.7], [screenHeight]);
    const [selected, setSelected] = useState<string | null>('Home');
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

    useEffect(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setAddress('Permission denied');
                return;
            }

            // Show last known location immediately if available
            const lastKnown = await Location.getLastKnownPositionAsync();
            if (lastKnown) {
                Location.reverseGeocodeAsync(lastKnown.coords).then(([rev]) => {
                    if (rev) {
                        const formatted = `${rev.name || ''}, ${rev.street || ''}, ${rev.city || ''}`.trim();
                        setAddress(formatted);
                    }
                });
            }

            // Fetch more accurate location in background
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const [rev] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (rev) {
                const formatted = `${rev.name || ''}, ${rev.street || ''}, ${rev.city || ''}`.trim();
                setAddress(formatted);
            }
        })();
    }, []);

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
                                <TouchableOpacity onPress={() => router.push('/moversdropaddress')} activeOpacity={0.8}>
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
                        <TouchableOpacity style={styles.mapButton} onPress={() => router.push('/moverspickupaddress')}>
                            <Ionicons name="location-sharp" size={20} color="#Ba1C1C" style={styles.mapIcon} />
                            <Text style={styles.mapButtonText}>Select on Map</Text>
                        </TouchableOpacity>

                        <View style={styles.separator} />
                        <TouchableOpacity
                            style={styles.addressCard}
                            activeOpacity={0.7} onPress={() => router.push('/moversdropaddress')}
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
                            onPress={() => router.push('/moversdropaddress')}
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
                            onPress={() => router.push('/moversdropaddress')}
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
    searchBar: {
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
    sheetContent: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    inputWrapper: {
        marginBottom: 16,
        position: 'relative',
    },
    saveAsButtons: {
        flexDirection: 'row',
        gap: 10, // works in RN 0.71+, else use marginRight
        marginBottom: 16,
    },
    saveButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    saveAsLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#646262',
    },
    inputLabel: {
        position: 'absolute',
        top: -10,
        left: 12,
        backgroundColor: '#fff', // Matches background so it looks cut out from border
        paddingHorizontal: 4,
        fontSize: 12,
        color: '#999',
        zIndex: 1,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingRight: 8,
        height: 48,
        backgroundColor: '#fff',
    },
    inputField: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#000',
    },
    iconRight: {
        marginLeft: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    changeButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderColor: '#BA1C1C',
        borderWidth: 0.3,
    },
    changeButtonText: {
        color: '#ba1c1c',
        fontSize: 14,
        fontWeight: '500',
    },

});
