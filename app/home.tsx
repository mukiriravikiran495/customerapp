import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import MapView from 'react-native-maps';
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [shiftDate, setShiftDate] = useState('');
    const [shiftType, setShiftType] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showShiftTypeDropdown, setShowShiftTypeDropdown] = useState(false);
    const router = useRouter();

    const mapHeight = Dimensions.get('window').height * 0.7;

    const mapStyle = [
        {
            elementType: "geometry",
            stylers: [{ color: "#E5E4E2" }],
        },
        {
            elementType: "labels.text.fill",
            stylers: [{ color: "#000000" }],
        },
        // {
        //     elementType: "labels.text.stroke",
        //     stylers: [{ color: "#E5E4E2" }],
        // },
        {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "poi",
            elementType: 'labels',
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }],
        },
        {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "transit",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "off" }],
        },
    ];
    return (
        <View style={styles.container}>
            {/* Map Section */}
            <View style={{ height: mapHeight }}>
                <MapView
                    style={StyleSheet.absoluteFillObject}
                    initialRegion={{
                        latitude: 17.385044,
                        longitude: 78.486671,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    customMapStyle={mapStyle}
                />
                {/* Floating Pickup Card */}
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Ionicons name="menu" size={24} color="#000" style={styles.leftIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Pick up Location"
                            placeholderTextColor="#aaa"
                            value={pickup}
                            onChangeText={setPickup}
                        />
                    </View>
                </View>
            </View>

            {/* Bottom Section with White Background */}
            {/* Bottom Section with White Background */}
            <ScrollView style={styles.whiteBackground} keyboardShouldPersistTaps="handled">
                {/* Drop + Shift info card */}
                <View style={styles.comboCard}>
                    {/* Drop Location */}
                    <View style={styles.fullWidthRow}>
                        <TextInput
                            style={styles.destinationInput}
                            placeholder="Select Destination"
                            placeholderTextColor="#aaa"
                            value={drop}
                            onChangeText={setDrop}
                        />
                    </View>

                    {/* Shift Date + Type */}
                    <View style={styles.splitRow}>
                        {/* Shift Date Field */}
                        <TouchableOpacity
                            style={styles.shiftDateContainer}
                            onPress={() => setShowDatePicker(true)}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="calendar" size={18} color="#000" style={{ marginRight: 8 }} />
                            <Text style={{ color: shiftDate ? '#000' : '#aaa', fontSize: 16 }}>
                                {shiftDate || 'Shift date'}
                            </Text>
                        </TouchableOpacity>

                        {/* Shift Type Dropdown */}
                        <TouchableOpacity
                            style={styles.shiftTypeContainer}
                            activeOpacity={0.8}
                            onPress={() => setShowShiftTypeDropdown(!showShiftTypeDropdown)}
                        >
                            <Text style={{ color: shiftType ? '#000' : '#aaa', fontSize: 16 }}>
                                {shiftType || 'Shift type'}
                            </Text>
                            <Ionicons name="chevron-down" size={18} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Shift Type Dropdown Options */}
                    {showShiftTypeDropdown && (
                        <View style={styles.dropdown}>
                            {['ONE BHK', 'TWO BHK', 'THREE BHK'].map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => {
                                        setShiftType(type);
                                        setShowShiftTypeDropdown(false);
                                    }}
                                    style={styles.dropdownItem}
                                >
                                    <Text style={styles.dropdownText}>{type}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    const formattedDate = selectedDate.toISOString().split('T')[0];
                                    setShiftDate(formattedDate);
                                }
                            }}
                        />
                    )}
                </View>

                {/* Continue Button */}
                <View style={styles.bottomOverlay}>
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => {
                            console.log({ pickup, drop, shiftDate, shiftType });
                            router.push('/items');
                        }}
                    >
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        position: 'absolute',
        top: height * 0.08,
        left: width * 0.03,
        right: width * 0.03,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
        zIndex: 10,
    },
    leftIcon: {
        paddingLeft: width * 0.04,
        paddingRight: width * 0.02,
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: height * 0.06,
        fontSize: width * 0.04,
        color: '#000',
        backgroundColor: '#fff',
    },
    comboCard: {

        marginHorizontal: width * 0.05,
        marginTop: height * 0.02,
        marginBottom: height * 0.01,
        backgroundColor: '#E5E4E2',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
    },
    fullWidthRow: {
        // paddingHorizontal: width * 0.01,

        backgroundColor: '#E5E4E2',
        padding: width * 0.04,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        height: height * 0.06,
    },
    destinationInput: {

        flex: 1, // makes the TextInput expand to full row
        fontSize: width * 0.045,
        color: '#000',
        padding: 0, // optional to remove internal padding
        fontWeight: 'regular',

        textAlignVertical: 'center',
        // marginBottom: 2,
        alignItems: 'center',
        height: height * 0.06,
    },
    label: {
        fontWeight: 'regular',
        fontSize: width * 0.045,
        color: '#000',
        marginBottom: 4,
        alignItems: 'center',
        height: height * 0.06,
    },
    splitRow: {
        flexDirection: 'row',

    },

    bottomOverlay: {
        marginTop: height * 0.01,
        paddingHorizontal: width * 0.05,
        marginBottom: height * 0.025,
    },
    continueButton: {
        backgroundColor: '#ba1c1c', //F1BC0F
        height: height * 0.065,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    whiteBackground: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    shiftDateContainer: {
        width: '50%',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    shiftTypeContainer: {
        width: '50%',
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderColor: '#ccc',
    },

    dropdown: {
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 4,
        overflow: 'hidden',
    },

    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

    dropdownText: {
        fontSize: 16,
        color: '#000',
    },
    
});