import { Props } from '@/navigation/types';
import { FlatList, Text, View } from 'react-native';
import salons from 'src/data/salons.json';

export default function SalonsListScreen({ route }: Props) {
  return (
    <FlatList
      data={salons.filter(
        (salon) => salon.categoryId === route.params.categoryId,
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
