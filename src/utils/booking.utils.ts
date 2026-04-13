import { Appointment } from '@/types/booking.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Function to save appointments to async storage
export const updateAppointments = async (value: Appointment[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('appointments', jsonValue);
  } catch (e) {
    let message = '';
    if (typeof e === 'string') message = e;
    else if (e instanceof Error) message = e.message;
    throw new Error(message);
  }
};

//Function to read appointments from async storage
export const readAppointments = async (): Promise<Appointment[]> => {
  try {
    let jsonValue = await AsyncStorage.getItem('appointments');
    if (jsonValue === null) {
      await AsyncStorage.setItem('appointments', JSON.stringify([]));
      jsonValue = await AsyncStorage.getItem('appointments');
    }
    return JSON.parse(jsonValue!);
  } catch (e) {
    let message = '';
    if (typeof e === 'string') message = e;
    else if (e instanceof Error) message = e.message;
    throw new Error(message);
  }
};
