import { Salon } from '@/types/salon.types';
import { Card, Text } from 'react-native-paper';
import { GestureResponderEvent } from 'react-native';

export interface SalonCardProps {
  salon: Salon;
  onPressCallback: (e: GestureResponderEvent) => void;
}

export default function SalonCard(props: SalonCardProps) {
  return (
    <Card onPress={props.onPressCallback}>
      <Card.Cover src={props.salon.image} />
      <Card.Content>
        <Text variant="titleLarge">{props.salon.name}</Text>
        <Text variant="bodyMedium">{props.salon.address}</Text>
        <Text variant="bodyMedium">{props.salon.rating}</Text>
      </Card.Content>
    </Card>
  );
}
