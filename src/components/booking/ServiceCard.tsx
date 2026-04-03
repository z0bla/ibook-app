import { Service } from '@/types/salon.types';
import { Button, Card, Text } from 'react-native-paper';
import { GestureResponderEvent } from 'react-native';

export interface ServiceCardProps {
  service: Service;
  onSelectCallback: (e: GestureResponderEvent) => void;
}

export default function ServiceCard(props: ServiceCardProps) {
  return (
    <Card>
      <Card.Content>
        <Text variant="bodyLarge">Name: {props.service.name}</Text>
        <Text variant="bodyMedium">Duration: {props.service.duration} min</Text>
        <Text variant="bodyMedium">Price: {props.service.price}$</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={props.onSelectCallback}>Select</Button>
      </Card.Actions>
    </Card>
  );
}
