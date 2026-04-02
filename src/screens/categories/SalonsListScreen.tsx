import { SalonsListScreenProps } from '@/navigation/types';
import { FlatList, Text, View } from 'react-native';
import salonsList from 'src/data/salons.json';

export default function SalonsListScreen({ route }: SalonsListScreenProps) {
  return (
    <FlatList
      data={salonsList.filter(
        (salon) => salon.categoryId === route.params!.categoryId,
      )}
      renderItem={({ item }) => (
        <View>
          <Text>{item.id}</Text>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
}
