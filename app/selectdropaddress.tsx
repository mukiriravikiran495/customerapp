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



export default function SelectTruck() {
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
                                <View style={styles.locationSeparator} />
                                <TouchableOpacity onPress={() => router.push('/dropaddress')} activeOpacity={0.8}>
                                    <View style={styles.searchBar}>
                                        <Ionicons
                                            name="location-sharp"
                                            size={20}
                                            color="#8E1515"
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
                            <Ionicons name="location-sharp" size={20} color="#8E1515" style={styles.mapIcon} />
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
        elevation: 0.5,
    },
    separator: {
        height: 1,
        backgroundColor: '#F1F1F1',
        marginHorizontal: 16,
    },
    locationSeparator: {
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
        color: '#8E1515',
        fontSize: 16,
        fontWeight: '500',
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },

    addressTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#222222',
    },

    addressSubtitle: {
        fontSize: 12,
        color: '#222222',
        marginTop: 2,
    },
    
});
