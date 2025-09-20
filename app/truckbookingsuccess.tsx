// RadarDemoScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState, } from "react";
import {
  Animated,
  Easing,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Circle, LatLng, Marker, Polyline } from "react-native-maps";

const AnimatedCircle: any = Animated.createAnimatedComponent(Circle); // cast to any for TS

export default function RadarDemoScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView | null>(null);
  const slideAnim = useRef(new Animated.Value(200)).current;
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [bottomMessage, setBottomMessage] = useState<string>("");
  const [driverAccepted, setDriverAccepted] = useState(false);

  // user's current location (pickup). null until loaded
  const [pickup, setPickup] = useState<LatLng | null>(null);

  // simulated destination (replace with actual)
  const destination: LatLng = { latitude: 15.5057, longitude: 80.0499 };

  // route coords (straight line for demo)
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);

  // Radar animation values (two rings)
  const radar1 = useRef(new Animated.Value(0)).current;
  const radar2 = useRef(new Animated.Value(0)).current;

  // show / hide radar
  const [showRadar, setShowRadar] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current; // persist

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // final position
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  useEffect(() => {
    (async () => {
      // request permission + get current position
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission denied");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setPickup(coords);

      bottomSheetRef.current?.present();

      // zoom to pickup
      setTimeout(() => {
        mapRef.current?.animateToRegion(
          {
            latitude: coords.latitude - 0.0035,
            longitude: coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          600
        );
      }, 300);

      // start radar animation
      startRadar();

      // after 10 seconds → stop radar & show driver found
      setTimeout(() => {
        stopRadar();
        setShowRadar(false);
        setRouteCoords([coords, destination]); // optional route
        setDriverAccepted(true);
        setBottomMessage("");
        bottomSheetRef.current?.snapToIndex(0);
      }, 10000);
    })();

    return () => {
      stopRadar();
    };
  }, []);


  // start two looping animations, second starts with a half cycle delay
  const startRadar = () => {
    radar1.setValue(0);
    radar2.setValue(0);

    Animated.loop(
      Animated.timing(radar1, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: false, // must be false for radius prop
      }),
      { iterations: -1 }
    ).start();

    // start second ring slightly delayed so rings alternate
    setTimeout(() => {
      Animated.loop(
        Animated.timing(radar2, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: false,
        }),
        { iterations: -1 }
      ).start();
    }, 900);
  };

  const stopRadar = () => {
    radar1.stopAnimation();
    radar2.stopAnimation();
    radar1.setValue(0);
    radar2.setValue(0);
  };



  // interpolations for radius (meters) and opacity
  const ring1Radius = radar1.interpolate({ inputRange: [0, 1], outputRange: [0, 450] }); // meters
  const ring1Opacity = radar1.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] });

  const ring2Radius = radar2.interpolate({ inputRange: [0, 1], outputRange: [0, 450] });
  const ring2Opacity = radar2.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] });

  return (
    <GestureWrapper bottomSheetRef={bottomSheetRef}>
      <View style={styles.container}>
        <MapView
          ref={(r) => { mapRef.current = r; }}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: pickup?.latitude ?? 17.4401,
            longitude: pickup?.longitude ?? 78.3489,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={false}
          showsMyLocationButton={false}
          customMapStyle={[
            {
              elementType: "geometry",
              stylers: [{ color: "#F2F2F2" }]
            },
            {
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#999999" }]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#FFFFFF" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#FFFFFF" }]
            },
            {
              featureType: "road",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#999999" }]
            },
            {
              featureType: "poi", // Buildings
              elementType: "geometry",
              stylers: [{ color: "#504b4b" }]
            },
            {
              featureType: "poi",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "water",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "transit",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "landscape.natural",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#E5F4E3" }] // light green for parks
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6B8E23" }] // darker green for park names
            }
          ]}
        >
          {pickup && (
            <>
              <Marker coordinate={pickup} title="Pickup">
                <Ionicons name="location" size={32} color="green" />
              </Marker>

              {/* Animated rings (cast to any to silence TS since AnimatedInterpolation isn't number) */}
              {showRadar && (
                <>
                  <AnimatedCircle
                    center={pickup}
                    radius={ring1Radius as any}
                    fillColor={"rgba(0,200,0,0.12)"}
                    strokeColor={"rgba(0,200,0,0.35)"}
                    strokeWidth={2}
                  // Animated opacity via strokeColor/ fillColor alpha + separate Animated prop not supported; we use opacity style:
                  // but Circle doesn't accept style.opacity; so we passed alpha in colors via interpolation would be ideal — keep simple
                  />
                  <AnimatedCircle
                    center={pickup}
                    radius={ring2Radius as any}
                    fillColor={"rgba(0,200,0,0.08)"}
                    strokeColor={"rgba(0,200,0,0.25)"}
                    strokeWidth={2}
                  />
                </>
              )}

              {/* Route (straight line demo) */}
              {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeColor="#000" strokeWidth={4} />}
            </>
          )}
        </MapView>

        {/* Header / back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { /* handle back */ }} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={20} color="#222" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerBtn}
            onPress={async () => {
              // move to current pickup when user taps header locate icon
              if (!pickup) return;
              mapRef.current?.animateToRegion(
                {
                  latitude: pickup.latitude,
                  longitude: pickup.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                },
                400
              );
            }}
          >
            <Ionicons name="locate" size={20} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Bottom sheet */}
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={["50%", "80%"]}
          enablePanDownToClose={false}
        >
          <BottomSheetView style={styles.sheet}>
            {driverAccepted ? (
              // Layout when driver accepts
              <>
                <View style={styles.dottedCard}>
                  {/* Top row: image, details, OTP */}
                  <View style={[styles.locationRow, { justifyContent: 'space-between' }]}>
                    {/* Left: Vehicle image + details */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require('../assets/images/bikeicon.png')}
                        style={styles.vehicleImage}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.nameText}>Scooter</Text>
                        <Text style={styles.mobileText}>TS08-JA-8095</Text>
                        <Text style={styles.smallnameText}>Mukiri Ravi kiran</Text>
                      </View>
                    </View>

                    {/* Right: OTP */}
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.otpLabel}>OTP</Text>
                      <Text style={styles.otpCode}>4829</Text>
                    </View>
                  </View>

                  {/* Input with call icon inside */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="Send Message"
                      placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={() => router.push('/contactdriver')}>
                      <Ionicons name="send" size={20} color="#5a5a5a" style={styles.sendIcon} />
                    </TouchableOpacity>

                  </View>
                </View>

                {/* From / To Location Card */}
                <View style={styles.locationCard}>
                  {/* From Location */}
                  <View style={styles.locationRow}>
                    <Ionicons name="location-sharp" size={20} color="green" />
                    <Text style={styles.locationText}>Flat 104, Vinayaka towers, Kukatpally, hyderabad, 500045</Text>
                  </View>
                  <View style={styles.divider} />

                  {/* To Location */}
                  <View style={styles.locationRow}>
                    <Ionicons name="location-sharp" size={20} color="#BA1C1C" />
                    <Text style={styles.locationText}>Flat 104, Vinayaka towers, Kukatpally, hyderabad, 500045</Text>
                  </View>
                  <View style={styles.divider} />

                  {/* To Location */}
                  <View style={styles.detailsRow}>
                    <Ionicons name="eye-outline" size={20} color="#BA1C1C" />
                    <Text style={styles.viewDetailsText}>View Details</Text>

                  </View>
                </View>

                <View style={styles.locationCard}>
                  {/* From Location */}
                  <View style={styles.locationRow}>
                    <Image
                      source={require('../assets/images/profile.jpg')}
                      style={styles.profileImage}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.nameText}>Nikitha Reddy</Text>
                      <Text style={styles.mobileText}>+91 98765 43210</Text>
                    </View>
                    <Text style={styles.amountText}>₹93</Text>
                  </View>
                </View>

                
                  <TouchableOpacity style={styles.submitCard} onPress={() => { }}>
                    <Text style={styles.submitText}>Cancel booking</Text>
                  </TouchableOpacity>
                




              </>
            ) : (
              // Layout while searching

              <>
                <View style={styles.dottedCard}>
                  {/* From Location */}
                  <View style={[styles.locationRow, { flexDirection: 'column', alignItems: 'center' }]}>
                    <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
                      <LottieView
                        source={require('../assets/animations/loading-blue.json')}
                        autoPlay
                        loop
                        style={{
                          width: 100,
                          height: 100,
                        }}
                      />
                    </Animated.View>

                    <Text style={[styles.infoText, { marginTop: 8 }]}>
                      {bottomMessage || "Searching for Vehicle"}
                    </Text>
                  </View>
                </View>

                {/* From / To Location Card */}
                <View style={styles.locationCard}>
                  {/* From Location */}
                  <View style={styles.locationRow}>
                    <Ionicons name="location-sharp" size={20} color="green" />
                    <Text style={styles.locationText}>Flat 104, Vinayaka towers, Kukatpally, hyderabad, 500045</Text>
                  </View>
                  <View style={styles.divider} />

                  {/* To Location */}
                  <View style={styles.locationRow}>
                    <Ionicons name="location-sharp" size={20} color="#BA1C1C" />
                    <Text style={styles.locationText}>Flat 104, Vinayaka towers, Kukatpally, hyderabad, 500045</Text>
                  </View>
                  <View style={styles.divider} />

                  {/* To Location */}
                  <View style={styles.detailsRow}>
                    <Ionicons name="eye-outline" size={20} color="#BA1C1C" />
                    <Text style={styles.viewDetailsText}>View Details</Text>

                  </View>
                </View>

                <View style={styles.locationCard}>
                  {/* From Location */}
                  <View style={styles.locationRow}>
                    <Image
                      source={require('../assets/images/all.png')}
                      style={styles.profileImage}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.nameText}>Nikitha Reddy</Text>
                      <Text style={styles.mobileText}>+91 98765 43210</Text>
                    </View>
                    <Text style={styles.amountText}>₹93</Text>
                  </View>
                </View>

                <View style={styles.locationCard}>
                  {/* From Location */}
                  <View style={styles.locationRow}>
                    <Image
                      source={require('../assets/images/profile.jpg')}
                      style={styles.profileImage}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.nameText}>Payment Method</Text>
                      <Text style={styles.mobileText}>Cash</Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </GestureWrapper>
  );
}

/** Small wrapper to provide BottomSheetModalProvider and catch ref (keeps main component tidy) */
function GestureWrapper({ children, bottomSheetRef }: { children: React.ReactNode; bottomSheetRef: any }) {
  return <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: "absolute",
    top: Platform.OS === "android" ? 36 : 56,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  headerBtn: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    elevation: 3,
  },
  serviceImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
    backgroundColor: '#F2F2F2',


  },
  sheet: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',

  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto_500Medium',

  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#f2f2f2", // Light background for circle
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#ddd",
    marginBottom: 15,
    elevation: 4,
    marginTop: 20,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  tickMark: {
    position: 'absolute',
    top: -14, // moves it above the circle
    zIndex: 1,
  },
  locationCard: {
    marginTop: 12,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  submitCard:{
    marginTop: 20,
    width: '90%',
    backgroundColor: '#BA1C1C',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  submitText:{
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dottedCard: {
    marginTop: 12,
    width: '90%',
    backgroundColor: '#ede9ef',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,

  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    justifyContent: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '300',
    color: '#1A1A1A',
  },
  nameText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    fontFamily: 'Roboto_500Medium',
  },
  smallnameText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '400',
    color: '#1A1A1A',
    fontFamily: 'Roboto_400Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16, // makes it circular
    resizeMode: 'cover',
    marginRight: 8,
  },
  vehicleImage: {
    width: 50,
    height: 50,
    borderRadius: 16, // makes it circular
    resizeMode: 'cover',
    marginRight: 8,
  },
  textContainer: {
    flexDirection: 'column',
  },
  mobileText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  viewDetailsText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#BA1C1C',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'green',
    justifyContent: 'flex-end'
  },
  otpLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',

  },
  otpCode: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 6,
    color: '#0C4087',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  callButton: {

    marginLeft: 8,
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  sendIcon: {
    marginLeft: 8, // space from text
  },

});
