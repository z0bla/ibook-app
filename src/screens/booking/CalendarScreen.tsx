import { useBooking } from '@/hooks';
import { Alert, BackHandler, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { getNext4Weeks, getWorkingDays } from '@/utils/date.utils';
import { eachDayOfInterval } from 'date-fns';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export default function CalendarScreen() {
  const navigation = useNavigation();
  const context = useBooking();
  useFocusEffect(
    useCallback(() => {
      function backButtonHandler() {
        context.resetBooking();
        navigation.goBack();
        return true;
      }
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backButtonHandler,
      );

      return () => backHandler.remove();
    }, []),
  );

  function dateFormat(d: Date): string {
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }

  const today = new Date();
  const lastDay: Date = getNext4Weeks();

  const workingDays: Date[] = getWorkingDays(
    context.state.selectedSalon,
    today,
    lastDay,
  );
  const workingDaysString: string[] = workingDays.map((day) => dateFormat(day));
  const allDays: Date[] = eachDayOfInterval({
    start: today,
    end: lastDay,
  });
  const allDaysString: string[] = allDays.map((day) => dateFormat(day));
  let marked: MarkedDates = {};
  allDaysString.map((day) => {
    if (workingDaysString.includes(day)) {
      marked[day] = { color: '#89cc7a' };
    } else {
      marked[day] = { disabled: true };
    }
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
      </Card>
      <Calendar
        minDate={today.toDateString()}
        maxDate={lastDay.toDateString()}
        markingType="period"
        markedDates={marked}
        onDayPress={() => {
          Alert.alert('SelectTime component is not ready');
        }}
      />
    </ScrollView>
  );
}
