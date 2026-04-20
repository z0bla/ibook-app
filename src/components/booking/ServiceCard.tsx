import { Service } from '@/types/salon.types';
import { Button, Card, Text } from 'react-native-paper';
import { GestureResponderEvent } from 'react-native';

export interface ServiceCardProps {
  service: Service;
  onSelectCallback: (e: GestureResponderEvent) => void;
}

export default function ServiceCard(props: ServiceCardProps) {
  const handleOnSelect = (e: GestureResponderEvent) => {
    props.onSelectCallback(e);
  };
  return (
    <Card style={{ margin: 5, backgroundColor: '#edf0ef' }}>
      <Card.Content>
        <Text variant="bodyLarge">Name: {props.service.name}</Text>
        <Text variant="bodyMedium">Duration: {props.service.duration} min</Text>
        <Text variant="bodyMedium">Price: {props.service.price}$</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={handleOnSelect}
          buttonColor={'#66389c'}
          textColor={'#edf0ef'}
        >
          Select
        </Button>
      </Card.Actions>
    </Card>
  );
}
