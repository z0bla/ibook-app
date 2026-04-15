import SalonCard from '@/components/booking/SalonCard';
import { SalonsListScreenProps } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLayoutEffect } from 'react';
import { FlatList, GestureResponderEvent } from 'react-native';
import salonsList from 'src/data/salons.json';
import categories from 'src/data/categories.json';

export default function SalonsListScreen({ route }: SalonsListScreenProps) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  useLayoutEffect(() => {
    let name: string = categories.find(
      (cat) => cat.id === route.params.categoryId,
    )!.name;
    navigation.setOptions({ title: name });
  });

  return (
    <FlatList
      data={salonsList.filter(
        (salon) => salon.categoryId === route.params.categoryId,
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
