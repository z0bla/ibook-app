import { SalonsListScreenProps } from '@/navigation/types';
import { Text } from 'react-native';

export default function SalonsListScreen({ route }: SalonsListScreenProps) {
  return (
    <Text>
      <Text>ItemID:</Text>
      <Text>{route.params!.categoryId}</Text>
    </Text>
  );
}
