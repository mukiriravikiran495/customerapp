import { Ionicons } from '@expo/vector-icons';
import {
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function PickupAddress() {
    const router = useRouter();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>

                    {/* Card containing back arrow on top & input below */}
                    <View style={styles.card}>

                        {/* Back Arrow */}
                        <TouchableOpacity onPress={() => router.back()} style={styles.arrowWrapper}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>

                        {/* Input with Map Icon */}
                        <View style={styles.inputContainer}>
                            <Ionicons name="location-sharp" size={20} color="green" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter drop address"
                                placeholderTextColor="#999"
                            />
                        </View>
                    </View>
                    {/* Select on Map Button */}
                    <TouchableOpacity style={styles.mapButton} onPress={() => router.push('/dropaddress')}>
                        <Ionicons name="location-sharp" size={20} color="#Ba1C1C" style={styles.mapIcon} />
                        <Text style={styles.mapButtonText}>Select on Map</Text>
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
    card: {
        backgroundColor: '#F2F2F2',
        borderRadius: 16,
        marginHorizontal: 0, // touches screen edges
        padding: 16,
        marginTop: 30,
    },
    arrowWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 6,
        borderColor: '#282424',
        borderWidth: 0.3,
        alignSelf: 'flex-start',
        marginBottom: 16, // space between arrow and input
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 6,
        elevation: 4,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.2,
    },
    icon: {
        marginRight: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
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
    separator: {
        height: 1,
        backgroundColor: '#e8e5e5',
        marginTop: 8,
        marginHorizontal: 16, // full width like button
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


});
