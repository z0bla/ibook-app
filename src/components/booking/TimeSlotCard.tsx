import { useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button } from 'react-native-paper';

export interface TimeSlotCardProps {
  time: string;
  isAvailable: boolean;
  isSelected: boolean;
  onSelectCallback: (e: GestureResponderEvent) => void;
}
export default function TimeSlotCard(props: TimeSlotCardProps) {
  const [select, setSelect] = useState(props.isSelected);
  function onPressHandler(e: GestureResponderEvent) {
    setSelect(!select);
    props.onSelectCallback(e);
  }
  return (
    <Button
      mode="contained"
      disabled={!props.isAvailable}
      buttonColor={props.isSelected ? '#6c3299' : '#efe1fa'}
      textColor={props.isSelected ? 'white' : '#6c3299'}
      onPress={onPressHandler}
    >
      {props.time}
    </Button>
  );
}
