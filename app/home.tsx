import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
let hasPopupBeenShown = false;
const { width, height } = Dimensions.get('window');
export default function HomeScreen() {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [locationText, setLocationText] = useState('');
    const [showDrawer, setShowDrawer] = useState(false);
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

    useEffect(() => {
        if (!hasPopupBeenShown) {
            setShowPopup(true);
            hasPopupBeenShown = true;
        }
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.push('/menu')} activeOpacity={0.9}>
                    <View style={styles.menuButton}>
                        <Icon name="menu" size={28} color="black" />
                    </View>
                </TouchableOpacity>

                {/* Input with map icon inside */}
                <View style={{ paddingHorizontal: 12 }}>
                    <TouchableOpacity onPress={() => router.push('/manualselectpickupaddress')} activeOpacity={0.8}>
                        <View style={styles.searchBar}>
                            <Ionicons
                                name="location-sharp"
                                size={20}
                                color="green"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                placeholder="Pick up location"
                                placeholderTextColor="#888"
                                value={locationText}
                                onChangeText={setLocationText}
                                editable={false}
                                style={{
                                    width: '75%', // or any %/px value
                                    fontSize: 16,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            {/* Select a service */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View >

                    <View style={styles.serviceCardContainer}>
                        <View style={styles.serviceRow}>
                            <TouchableOpacity style={styles.serviceCard} activeOpacity={0.7} onPress={() => router.push('/moverspickupaddress')}>
                                <Image source={require('../assets/images/packers5.png')} style={styles.serviceImage} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.serviceCard} activeOpacity={0.7} onPress={() => router.push('/pickupaddress')}>
                                <Image source={require('../assets/images/truck5.png')} style={styles.serviceImage} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.serviceCard} activeOpacity={0.7} onPress={() => router.push('/pickupaddress')}>
                                <Image source={require('../assets/images/bike5.png')} style={styles.serviceImage} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.serviceCard} activeOpacity={0.7}>
                                <Image source={require('../assets/images/parcel5.png')} style={styles.serviceImage} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Refer banner */}
                    <View style={{ paddingHorizontal: 16 }}>
                        <Text style={styles.sectionTitle}>Refer and Earn</Text>
                        <TouchableOpacity style={styles.referCard} activeOpacity={0.5}>
                            <Image source={require('../assets/images/refer.jpg')} style={styles.referImage} />
                        </TouchableOpacity>
                    </View>
                    {/* Service Provided */}
                    {/* <Text style={styles.serviceSectionTitle}>Service provided while Shiftyng</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.inlineImages}
                    >
                        <View style={styles.serviceItem}>
                            <Image source={require('../assets/images/ac.png')} style={styles.smallServiceImage} />
                            <Text style={styles.serviceText}>AC Service</Text>
                        </View>

                        <View style={styles.serviceItem}>
                            <Image source={require('../assets/images/truckservice.jpg')} style={styles.smallServiceImage} />
                            <Text style={styles.serviceText}>Truck Service</Text>
                        </View>

                        <View style={styles.serviceItem}>
                            <Image source={require('../assets/images/wrapping.jpg')} style={styles.smallServiceImage} />
                            <Text style={styles.serviceText}>Wrapping</Text>
                        </View>

                        <View style={styles.serviceItem}>
                            <Image source={require('../assets/images/wrapping.jpg')} style={styles.smallServiceImage} />
                            <Text style={styles.serviceText}>Wrapping</Text>
                        </View>
                    </ScrollView> */}

                    {/* Footer */}
                    <View style={styles.footerImageWrap}>
                        <Image source={require('../assets/images/footer.png')} style={styles.footerImage} />
                    </View>



                </View>
            </ScrollView>
            <Modal
                transparent
                visible={showPopup}
                animationType="fade"
                onRequestClose={() => setShowPopup(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.popupContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowPopup(false)}
                        >
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                        <Image
                            source={require('../assets/images/add.jpg')}
                            style={styles.popupImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </Modal>



        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    scrollContent: {
        // paddingHorizontal: 16,
        paddingTop: 84,
        flexGrow: 1,
       

    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    icon: {
        marginRight: 10,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#fff',
        marginBottom: 0,
        elevation: 4, // Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        
    },

    menuButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#eee',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        height: 45,
    },

    inputIcon: {
        marginLeft: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        fontFamily: 'Roboto_500Medium',
        // fontSize: 18,
        textAlign: 'left',
        includeFontPadding: false,
    },

    searchInput: {
        // flex: 1,
        fontSize: 16,

        color: '#333',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '100',
        marginTop: 16,
        marginBottom: 12,
        paddingLeft: 4,
        color: '1A1A1A',
        fontFamily: 'Roboto_500Medium',
        paddingHorizontal: 16,
    },
    serviceSectionTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        marginTop: 20,
        paddingLeft: 4,
        color: '#2e2d2d',
        fontFamily: 'Roboto_500Medium',
    },
    serviceRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginTop: 12,
    },

    serviceCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        height: 140,
        // padding: 12, // added padding to contain image neatly
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    serviceImage: {
        width: '100%',
        height: 140,
        // resizeMode: 'contain', // ensures full image fits without cropping
        borderRadius: 8, // optional
    },


    serviceText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },

    referCard: {
        // marginTop: 8,
        height: 100,
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 15,

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
        elevation: 2,
    },
    serviceItem: {
        width: 160,
        alignItems: 'center',
    },
    footerImageWrap: {
        marginTop: 24,
        width: '100%', // make wrapper full width
    },
    footerImage: {
        width: '100%',
        height: 240,
        resizeMode: 'cover', // fills width
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
        backgroundColor: '#F2F2F2',
        marginTop: 10,
        padding: 10,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        width: '100%',
        marginHorizontal: 0, // no margin
    },
});
