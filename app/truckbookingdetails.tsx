import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TruckBookingDetails() {
    const router = useRouter();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    {/* Gray Section from top to Drop Location */}
                    <View style={styles.topSection}>
                        {/* Back Arrow */}
                        <TouchableOpacity
                            onPress={() => router.push('/truckdetails')}
                            style={styles.arrowWrapper}
                        >
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Booking details</Text>
                    </View>

                    <View style={styles.goodsTypeCard}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <Ionicons name="cube-outline" size={16} color="#555" style={{ marginRight: 6 }} />
                            <Text style={styles.label}>Shiftyng Type</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.value}>Household Items </Text>
                            <TouchableOpacity>
                                <Text style={styles.changeText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => router.push('/truckbookingdetails')}
                        >
                            <Text style={styles.submitButtonText}>Confirm</Text>
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
        backgroundColor: '#F2F2F2',
        paddingTop: 30,
    },
    topSection: {
        backgroundColor: '#FFFFFF', // gray background
        padding: 16,
        paddingBottom: 8, // spacing under card
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
    },
    arrowWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 6,
        borderColor: '#282424',
        borderWidth: 0.3,
        alignSelf: 'flex-start',
        marginBottom: 10,
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
    },
    shiftType: {
        backgroundColor: '#FFFFFF',
        elevation: 4,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        
    },
    goodsTypeCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 16,
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        color: '#555',
    },
    value: {
        fontSize: 15,
        color: '#000',
        fontWeight: '500',
    },
    changeText: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '500',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12,
        alignItems: 'center',
        marginBottom: 12,
    },

});
