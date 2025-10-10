import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
let hasPopupBeenShown = false;
const { width, height } = Dimensions.get('window');
export default function HomeScreen() {
    const router = useRouter();
    const [locationText, setLocationText] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationText('Permission denied');
                return;
            }

            // let location = await Location.getCurrentPositionAsync({});
            let location = await Location.getLastKnownPositionAsync();
            if (!location) {
                location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
            }
            const { latitude, longitude } = location.coords;

            // Reverse geocode to get human-readable address
            let [address] = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (address) {
                const fullAddress = `${address.name}, ${address.street}, ${address.city}`;
                setLocationText(fullAddress);
            } else {
                setLocationText(`Lat: ${latitude}, Lng: ${longitude}`);
            }
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topSection}>
                <View style={styles.leftSection}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => router.push('/menu')}>
                        <Ionicons name="person" size={22} color="#6da07d" />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.supportButton} onPress={() => alert("Support Clicked!")}>
                    <MaterialIcons name="support-agent" size={20} color="#222222" />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>


            {/* Select a service */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View >
                    <Text style={styles.offerText}>Explore </Text>
                    <View style={styles.serviceCardContainer}>
                        <View style={styles.serviceRow}>

                            <TouchableOpacity style={styles.serviceCard} activeOpacity={0.7} onPress={() => router.push('/moverspickupaddress')}>
                                <Image source={require('../assets/images/packers3.png')} style={styles.serviceImage} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.serviceCard} activeOpacity={0.7} onPress={() => router.push('/pickupaddress')}>
                                <Image source={require('../assets/images/truck31.png')} style={styles.serviceImage} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.serviceCard} activeOpacity={0.7} onPress={() => router.push('/pickupaddress')}>
                                <Image source={require('../assets/images/bike3.png')} style={styles.serviceImage} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.serviceCard} activeOpacity={0.7}>
                                <Image source={require('../assets/images/parcel3.png')} style={styles.serviceImage} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Refer banner */}
                    {/* <View style={{ paddingHorizontal: 16, marginTop: 20, }}>

                        <TouchableOpacity style={styles.referCard} activeOpacity={0.5}>
                            <Image source={require('../assets/images/refer.jpg')} style={styles.referImage} />
                        </TouchableOpacity>
                    </View> */}

                    {/* Footer */}
                    <View style={styles.footerImageWrap}>
                        <Image source={require('../assets/images/footer2.png')} style={styles.footerImage} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 60,
        // paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        marginRight: 10,
    },
    serviceRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        // marginTop: 12,
    },
    serviceCard: {
        width: '45%',
        backgroundColor: '#F2F2F2',
        borderRadius: 16,
        marginBottom: 16,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        //  elevation: 0.5,
        marginLeft: 8,
        marginRight: 8,
    },
    serviceImage: {
        width: '100%',
        height: 120,
        borderRadius: 8, // optional
    },
    referCard: {
        // marginTop: 8,
        height: 100,
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 15,
        borderColor: '#C1C1C1', borderWidth: 0.3
    },
    referImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    inlineImages: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 12,
    },
    smallServiceImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        // elevation: 1,
    },
    serviceItem: {
        width: 160,
        alignItems: 'center',
    },
    footerImageWrap: {
        // marginTop: 10,
        marginHorizontal: 16,
    },
    footerImage: {
        width: '100%',
        height: 340,
        resizeMode: 'stretch',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContainer: {
        width: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        alignItems: 'flex-end',
    },
    closeButton: {
        padding: 10,
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 10,
    },
    popupImage: {
        width: '100%',
        height: height * 0.6,
        borderRadius: 12,
    },
    serviceCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        marginTop: 12,
        // padding: 10,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        width: '100%',
        marginHorizontal: 0, // no margin
    },
    topSection: {
        backgroundColor: '#FFFFFF', // gray background
        padding: 16,
        paddingBottom: 8, // spacing under card
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#dbdbdb', // you can change color
        justifyContent: "space-between",
        elevation: 0.5,
    },
    supportButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C1C1C1',
    },
    supportText: {
        color: "#222222",
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "600",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    backIcon: {
        marginRight: 8,
        width: 35,           // box width
        height: 35,          // box height
        backgroundColor: '#e0f0e9', // box background color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,    // rounded corners        
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    offerText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '600',
        color: '#222222',

        marginHorizontal: 16,
    },
});
