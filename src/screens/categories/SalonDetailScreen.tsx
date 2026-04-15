import ServiceCard from '@/components/booking/ServiceCard';
import { SalonDetailScreenProps } from '@/navigation/types';
import { Salon, Service } from '@/types/salon.types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLayoutEffect } from 'react';
import {
  ScrollView,
  Image,
  View,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { Text, DataTable, Button } from 'react-native-paper';
import salons from 'src/data/salons.json';
import services from 'src/data/services.json';

export default function SalonDetailScreen({ route }: SalonDetailScreenProps) {
  let salon: Salon = salons.find((sal) => sal.id === route.params.salonId)!;
  const navigation = useNavigation<StackNavigationProp<any>>();
  useLayoutEffect(() => {
    navigation.setOptions({ title: salon.name });
  });

  let servicesList: Service[] = services.filter(
    (serv: Service) => serv.salonId === salon.id,
  );
  let { width, height } = useWindowDimensions();
  return (
    <ScrollView style={{ flex: 1 }}>
      <Image
        source={{ uri: salon.image }}
        style={{
          width: width,
          height: height / 3,
          resizeMode: 'cover',
        }}
      />
      <View>
        <Text
          variant="headlineMedium"
          style={{ alignSelf: 'center', margin: '3%' }}
        >
          {salon.name}
        </Text>
        <DataTable>
          <DataTable.Row>
            <DataTable.Title>Address:</DataTable.Title>
            <DataTable.Cell>{salon.address}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Description:</DataTable.Title>
            <DataTable.Cell>{salon.description}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Rating:</DataTable.Title>
            <DataTable.Cell>{salon.rating}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Reviews:</DataTable.Title>
            <DataTable.Cell>{salon.reviewCount}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Phone:</DataTable.Title>
            <DataTable.Cell>{salon.phone}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Title>Hours:</DataTable.Title>
            <DataTable.Cell>{salon.operatingHours}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <View>
        {servicesList.map((item) => {
          return (
            <ServiceCard
              service={item}
              onSelectCallback={() => {}}
              key={item.id}
            />
          );
        })}
        <Button
          mode="contained"
          style={{ marginBottom: 20, marginTop: 10 }}
          onPress={() => Alert.alert('Booking Flow is not ready yet')}
        >
          Book Now
        </Button>
      </View>
    </ScrollView>
  );
}
