import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface MobileFiltersProps {
  selectedFilters: {
    rating: number[];
    price: number[];
    services: string[];
    vehicleType: string[];
  };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{
      rating: number[];
      price: number[];
      services: string[];
      vehicleType: string[];
    }>
  >;
  serviceOptions: string[];
  vehicleOptions: string[];
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const MobileFilters = ({
  selectedFilters,
  setSelectedFilters,
  serviceOptions,
  vehicleOptions,
  sortOption,
  setSortOption,
}: MobileFiltersProps) => {
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  const toggleFilter = (type: string) => {
    setModalVisible(modalVisible === type ? null : type);
  };

  const handleServiceFilter = (service: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleVehicleFilter = (vehicle: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      vehicleType: prev.vehicleType.includes(vehicle)
        ? prev.vehicleType.filter((v) => v !== vehicle)
        : [...prev.vehicleType, vehicle],
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      rating: [0],
      price: [0, 50000],
      services: [],
      vehicleType: [],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersRow}>
        {['Rating', 'Price', 'Services', 'Vehicle', 'Sort'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => toggleFilter(type.toLowerCase())}
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>{type}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Filter for Rating */}
      {modalVisible === 'rating' && (
        <Modal transparent visible>
          <View style={styles.modal}>
            {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
              <TouchableOpacity
                key={rating}
                onPress={() => {
                  setSelectedFilters((prev) => ({ ...prev, rating: [rating] }));
                  setModalVisible(null);
                }}
              >
                <Text style={styles.modalText}>
                  {rating > 0 ? `${rating}+ Stars` : 'Any Rating'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}

      {/* Modal Filter for Price */}
      {modalVisible === 'price' && (
        <Modal transparent visible>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Price Range</Text>
            <Slider
              style={{ width: '90%', height: 40 }}
              minimumValue={5000}
              maximumValue={50000}
              step={1000}
              value={selectedFilters.price[1]}
              onValueChange={(val) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  price: [prev.price[0], val],
                }))
              }
            />
            <Text style={styles.modalText}>
              ₹{selectedFilters.price[0]} - ₹{selectedFilters.price[1]}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(null)}>
              <Text style={styles.closeButton}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Modal Filter for Services */}
      {modalVisible === 'services' && (
        <Modal transparent visible>
          <View style={styles.modal}>
            <FlatList
              data={serviceOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleServiceFilter(item)}>
                  <Text style={styles.modalText}>
                    {selectedFilters.services.includes(item) ? '✓ ' : ''}{item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(null)}>
              <Text style={styles.closeButton}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Modal Filter for Vehicle Type */}
      {modalVisible === 'vehicle' && (
        <Modal transparent visible>
          <View style={styles.modal}>
            <FlatList
              data={vehicleOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleVehicleFilter(item)}>
                  <Text style={styles.modalText}>
                    {selectedFilters.vehicleType.includes(item) ? '✓ ' : ''}{item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(null)}>
              <Text style={styles.closeButton}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Modal Filter for Sort */}
      {modalVisible === 'sort' && (
        <Modal transparent visible>
          <View style={styles.modal}>
            {['Relevance', 'Price: Low to High', 'Price: High to Low', 'Rating: High to Low', 'Delivery Time'].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setSortOption(option);
                  setModalVisible(null);
                }}
              >
                <Text style={styles.modalText}>
                  {sortOption === option ? '✓ ' : ''}{option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    margin: 4,
  },
  filterButtonText: {
    fontSize: 14,
  },
  clearButton: {
    marginLeft: 'auto',
  },
  clearText: {
    color: 'red',
  },
  modal: {
    marginTop: 100,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 10,
  },
  closeButton: {
    color: 'blue',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default MobileFilters;
