import { Ionicons } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

export default function DropAddress() {
    const router = useRouter();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [address, setAddress] = useState('Fetching location...');
    const screenHeight = Dimensions.get('window').height;
    const snapPoints = useMemo(() => [screenHeight / 1.7], [screenHeight]);
    const [selected, setSelected] = useState<string | null>('Home');

    // Show bottom sheet on screen load
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
                    {/* Map */}
                    <MapView
                        style={StyleSheet.absoluteFillObject}
                        initialRegion={{
                            latitude: 17.44452,
                            longitude: 78.35292,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    />

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.push('/selectdropaddress')}>
                            <Ionicons style={styles.backArrow} name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Enter Drop Address</Text>
                    </View>

                    {/* Bottom Drawer */}
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={snapPoints}
                        index={1}
                        enablePanDownToClose={false}
                    >
                        <BottomSheetView>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={styles.sheetContent}
                            >
                                {/* Location Row */}
                                <View style={styles.locationRow}>
                                    <Ionicons name="location-sharp" size={22} color="green" style={{ marginRight: 8 }} />
                                    <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
                                        {address}
                                    </Text>
                                    <TouchableOpacity style={styles.changeButton} onPress={() => router.push('/changedropaddress')} >
                                        <Text style={styles.changeButtonText}>Change</Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Apartment / Flat / Building (optional)"
                                    placeholderTextColor="#999"
                                />
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>Receiver's Name</Text>
                                    <View style={styles.inputWithIcon}>
                                        <TextInput
                                            style={styles.inputField}
                                            placeholderTextColor="#999"
                                        />
                                        <Ionicons
                                            name="book-outline"
                                            size={22}
                                            color="green"
                                            style={styles.iconRight}
                                        />
                                    </View>
                                </View>
                                {/* <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mobile Number"
                                    keyboardType="phone-pad"
                                    placeholderTextColor="#999"
                                /> */}
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>Mobile Number</Text>
                                    <View style={styles.inputWithIcon}>
                                        <TextInput
                                            style={styles.inputField}
                                            placeholderTextColor="#999"
                                        />
                                    </View>
                                </View>
                                {/* Save as label */}
                                <Text style={styles.saveAsLabel}>Save as (optional):</Text>

                                {/* Buttons Row */}
                                <View style={styles.saveAsButtons}>
                                    {['Home', 'Office', 'Others'].map((label) => (
                                        <TouchableOpacity
                                            key={label}
                                            style={[
                                                styles.saveButton,
                                                selected === label && { borderColor: '#BA1C1C' },
                                            ]}
                                            onPress={() => setSelected(label)}
                                        >
                                            <Text
                                                style={[
                                                    styles.saveButtonText,
                                                    selected === label && { color: '#BA1C1C' },
                                                ]}
                                            >
                                                {label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/truckdetails')}>
                                    <Text style={styles.submitButtonText}>Submit Drop Location</Text>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>
                        </BottomSheetView>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 30,

    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12,
    },
    sheetContent: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',

    },
    backArrow: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 6,
        borderColor: '#282424',
        borderWidth: 0.3,

    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    submitButton: {
        backgroundColor: '#BA1C1C',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
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
    // inputWithIcon: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 8,
    //     backgroundColor: '#fff',
    //     paddingHorizontal: 12,
    //     marginBottom: 16,
    // },
    // inputField: {
    //     flex: 1,
    //     height: 48,
    // },
    // iconRight: {
    //     marginLeft: 8,
    // },
    saveAsLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#646262',
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
    inputWrapper: {
        marginBottom: 16,
        position: 'relative',
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
});
