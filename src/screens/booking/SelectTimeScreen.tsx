import { useBooking } from '@/hooks/useBooking';
import { Appointment, TimeSlot } from '@/types/booking.types';
import { Alert, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card, Text } from 'react-native-paper';
import { appos } from '@/data/mock-appointments';
import {
  checkIntervalOverlap,
  generateAvailableSlots,
} from '@/utils/date.utils';
import { useState } from 'react';
import TimeSlotCard from '@/components/booking/TimeSlotCard';

export default function SelectTimeScreen() {
  const appointments: Appointment[] = appos;
  const context = useBooking();
  const [choice, setChoice] = useState('');

  const slots: string[] = generateAvailableSlots(
    context.state.selectedSalon,
    context.state.selectedService,
    context.state.selectedDate,
  );
  let check: boolean = false;
  const timeSlots: TimeSlot[] = slots.map((slot) => {
    check = false;
    appointments.forEach((appo) => {
      if (
        checkIntervalOverlap(
          appo.time.time,
          slot,
          context.state.selectedService.duration,
        )
      ) {
        check = true;
      }
    });
    return {
      id: slot,
      time: slot,
      available: !check,
      booked: check,
    } as TimeSlot;
  });

  return (
    <ScrollView>
      <Card>
        <Text variant="headlineSmall">
          <Text>Salon: </Text>
          <Text>{context.state.selectedSalon.name}</Text>
        </Text>
        <Text variant="headlineSmall">
          <Text>Service: </Text>
          <Text>{context.state.selectedService.name}</Text>
        </Text>
        <Text variant="headlineSmall">
          <Text>Duration: </Text>
          <Text>{context.state.selectedService.duration}</Text>
        </Text>
        <Text variant="headlineSmall">
          <Text>Date: </Text>
          <Text>{context.state.selectedDate.toDateString()}</Text>
        </Text>
      </Card>

      <View style={styles.container}>
        {timeSlots.map((ts) => {
          return (
            <View key={ts.id} style={styles.item}>
              <TimeSlotCard
                time={ts.time}
                isAvailable={ts.available}
                isSelected={choice === ts.id}
                onSelectCallback={() => {
                  if (choice === ts.id) {
                    setChoice('');
                  } else {
                    setChoice(ts.id);
                  }
                }}
              />
            </View>
          );
        })}
      </View>
      <Button
        mode="contained"
        onPress={() => {
          Alert.alert(`Chosen timeslot is ${choice}`);
        }}
      >
        Confirm
      </Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    padding: '2%',
  },
  item: {
    flexWrap: 'wrap',
    width: '30%',
    margin: '1%',
    textAlign: 'center',
  },
});
