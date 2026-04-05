import { Service } from '@/types/salon.types';
import { Button, Card, Text } from 'react-native-paper';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { useState } from 'react';

export interface ServiceCardProps {
  service: Service;
  onSelectCallback: (e: GestureResponderEvent) => void;
}

export default function ServiceCard(props: ServiceCardProps) {
  const [selected, setSelected] = useState(false);
  const selectToggle = () => {
    setSelected(!selected);
  };
  const handleOnSelect = (e: GestureResponderEvent) => {
    selectToggle();
    props.onSelectCallback(e);
  };
  return (
    <Card
      style={{ margin: 5, backgroundColor: selected ? '#66389c' : '#edf0ef' }}
    >
      <Card.Content>
        <Text
          variant="bodyLarge"
          style={selected ? styles.textSelected : styles.textUnselected}
        >
          Name: {props.service.name}
        </Text>
        <Text
          variant="bodyMedium"
          style={selected ? styles.textSelected : styles.textUnselected}
        >
          Duration: {props.service.duration} min
        </Text>
        <Text
          variant="bodyMedium"
          style={selected ? styles.textSelected : styles.textUnselected}
        >
          Price: {props.service.price}$
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={handleOnSelect}
          buttonColor={selected ? '#edf0ef' : '#66389c'}
          textColor={selected ? '#66389c' : '#edf0ef'}
        >
          {selected ? 'Unselect' : 'Select'}
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  textSelected: {
    color: 'white',
    backgroundColor: '#66389c',
  },
  textUnselected: {
    color: 'black',
    backgroundColor: '#edf0ef',
  },
  buttonSelected: {
    color: '#66389c',
    backgroundColor: 'white',
  },
  butonUnselected: {
    color: 'white',
    backgroundColor: '#66389c',
  },
});
