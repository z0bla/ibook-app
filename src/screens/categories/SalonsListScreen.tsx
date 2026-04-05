import SalonCard from '@/components/booking/SalonCard';
import { SalonsListScreenProps } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, GestureResponderEvent } from 'react-native';
import salonsList from 'src/data/salons.json';

export default function SalonsListScreen({ route }: SalonsListScreenProps) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <FlatList
      data={salonsList.filter(
        (salon) => salon.categoryId === route.params!.categoryId,
      )}
      renderItem={({ item }) => (
        <SalonCard
          salon={item}
          onPressCallback={(e: GestureResponderEvent) => {
            navigation.navigate('SalonDetail', { salonId: item.id });
          }}
        />
      )}
    />
  );
}
