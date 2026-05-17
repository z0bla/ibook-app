import { useBooking } from '@/hooks/useBooking';
import { Appointment, TimeSlot } from '@/types/booking.types';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card, Chip, Text } from 'react-native-paper';
import { appos } from '@/data/mock-appointments';
import {
  checkIntervalOverlap,
  generateAvailableSlots,
} from '@/utils/date.utils';
import { StyleSheet } from 'react-native';
import { useState } from 'react';

export default function SelectTimeScreen() {
  const appointments: Appointment[] = appos;
  const context = useBooking();
  const [choice, setChoice] = useState('');

  //Funkcija za generisanje slotova
  /* function generateSlots(a: string, b: string,appos:Appointment[], c=30):TimeSlot[]{
    let result: TimeSlot[]=[]
    let init:string=a
    let index = 0
    
        while(index<appos.length){
            
                while(addTime(init,c)<=appos[index].time.time){
                    result.push({id:init,time:init,available:true,booked:false})
                    init=addTime(init,c)
                }
            init=addTime(appos[index].time.time,appos[index].duration)
            result.push(appos[index].time)
            index++
        }
        while(addTime(init,c)<=b){
            result.push({id:init,time:init,available:true,booked:false})
            init=addTime(init,c)
        }
    return result
} */
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
            <Chip
              style={styles.item}
              onPress={() => {
                setChoice(ts.time);
              }}
            >
              {ts.time}
            </Chip>
          );
        })}
      </View>
      <Button>Confirm</Button>
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
    justifyContent: 'center',
  },
});
