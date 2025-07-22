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

export default function HomeScreen() {
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [shiftDate, setShiftDate] = useState('');
    const [shiftType, setShiftType] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const router = useRouter();

    const mapHeight = Dimensions.get('window').height * 0.65;

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
            <ScrollView style={styles.whiteBackground} keyboardShouldPersistTaps="handled">
                {/* Drop Location */}
                <View style={styles.dropCard}>
                    <TextInput
                        style={styles.input}
                        placeholder="Drop Location"
                        placeholderTextColor="#aaa"
                        value={drop}
                        onChangeText={setDrop}
                    />
                </View>

                {/* Shift Date and Type */}
                <View style={styles.detailsCard}>
                    <View style={styles.splitRow}>
                        <TouchableOpacity
                            style={[styles.dateInputContainer, { width: '50%', borderColor: '#ccc' }]}
                            onPress={() => setShowDatePicker(true)}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="calendar" size={20} color="#ba1c1c" style={{ marginRight: 10 }} />
                            <Text style={{ color: shiftDate ? '#000' : '#aaa', fontSize: 16 }}>
                                {shiftDate || 'Shift date'}
                            </Text>
                        </TouchableOpacity>

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

                        <TextInput
                            style={[styles.input, styles.splitInput, { width: '50%', borderLeftWidth: 1, borderColor: '#ccc' }]}
                            placeholder="Shift type"
                            placeholderTextColor="#aaa"
                            value={shiftType}
                            onChangeText={setShiftType}
                        />
                    </View>
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
        top: 70,
        left: 10,
        right: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
        zIndex: 10,
        borderWidth: 0,
        // borderColor: '#373434ff',  
        height: 50,
    },
    leftIcon: {
        paddingLeft: 15,
        paddingRight: 10,
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
        height: 50,
        paddingRight: 20,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
    },

    dropCard: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
    },
    detailsCard: {
        marginHorizontal: 20,
        marginTop: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
    },
    splitRow: {
        flexDirection: 'row',
    },
    splitInput: {
        borderLeftWidth: 1,
        paddingLeft: 10,
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    bottomOverlay: {
        marginTop: 30,
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    continueButton: {
        backgroundColor: '#ba1c1c',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        height: 50,
    },
    continueText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center',
        height:50,
    },
    whiteBackground: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
