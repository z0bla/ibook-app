import { Salon } from '@/types/salon.types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Text, StyleSheet, Alert } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import categories from 'src/data/categories.json';
import salons from 'src/data/salons.json';

export default function CategoriesScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <Card
          onPress={() => {
            Alert.alert('Navigation not ready');
          }}
          style={styles.listItem}
        >
          <Card.Title
            title={<Text>{item.name}</Text>}
            subtitle={
              <Text>
                {'Count: ' +
                  salons.filter((salon: Salon) => salon.categoryId === item.id)
                    .length}
              </Text>
            }
            left={(props) => <Avatar.Icon {...props} icon={item.icon} />}
          />
        </Card>
      )}
      numColumns={2}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listItem: {
    height: '100%',
    width: '50%',
  },
});
