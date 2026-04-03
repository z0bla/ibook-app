import SalonCard from '@/components/booking/SalonCard';
import { SalonsListScreenProps } from '@/navigation/types';
import { FlatList, GestureResponderEvent, Text, View } from 'react-native';
import salonsList from 'src/data/salons.json';

export default function SalonsListScreen({ route }: SalonsListScreenProps) {
  return (
    <FlatList
      data={salonsList.filter(
        (salon) => salon.categoryId === route.params!.categoryId,
      )}
      renderItem={({ item }) => (
        <SalonCard
          salon={item}
          onPressCallback={(e: GestureResponderEvent) => {
            console.log(item.id);
          }}
        />
      )}
    />
  );
}
