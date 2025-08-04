import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView from 'react-native-maps';

type RootStackParamList = {
    LocationSelector: undefined;
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'LocationSelector'>;
};

const LocationSelector: React.FC<Props> = ({ navigation }) => {
    const pickupRef = useRef<TextInput>(null);
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            pickupRef.current?.focus();
        }, 500);
    }, []);

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Background Map */}
            <MapView
                style={StyleSheet.absoluteFillObject}
                // customMapStyle={mapStyle}
                initialRegion={{
                    latitude: 17.385044,
                    longitude: 78.486671,
                    latitudeDelta: 0.019,
                    longitudeDelta: 0.019,
                }}
            />

            {/* Foreground UI */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.innerContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} >
                                            <Ionicons name="arrow-back" size={28} color="#000" />
                                        </TouchableOpacity>
                    </View>

                    {/* Input Card */}
                    <View style={styles.card}>
                        <TextInput
                            ref={pickupRef}
                            style={styles.input}
                            placeholder="Select Pick up Location"
                            placeholderTextColor="#999"
                        />
                        <View style={styles.divider} />
                        <TextInput
                            style={styles.input}
                            placeholder="Select Drop Location"
                            placeholderTextColor="#999"
                        />
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.dateBox}>
                                <Text style={styles.dateText}>Shift date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.dateBox, styles.rightBox]}>
                                <Text style={styles.dateText}>Shift date</Text>
                                <Ionicons name="chevron-down" size={18} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        marginTop: 50,
    },
    header: {
        marginBottom: 30,
    },
    card: {
        // backgroundColor: 'rgba(255, 255, 255, 0.95)', // translucent background
        borderRadius: 5,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        overflow: 'hidden',
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    input: {
        padding: 16,
        fontSize: 16,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
    },
    row: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    dateBox: {
        flex: 1,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightBox: {
        borderLeftWidth: 1,
        borderLeftColor: '#eee',
    },
    dateText: {
        fontSize: 16,
        color: '#444',
    },
    bottomCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    bottomText: {
        fontSize: 16,
        color: '#222',
    },
});

export default LocationSelector;
