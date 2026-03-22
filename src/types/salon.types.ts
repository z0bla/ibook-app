import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export interface Category {
  id: string; //unique identifier for a category
  name: string; //name of the category
  icon: IconSource; //descriptive icon for a category
  description: string; //category description
}

export interface Salon {
  id: string; //unique identifier for a salon
  categoryId: string; //unique identifier for a category
  name: string; //name of the salon
  address: string; //address of the salon
  phone: string; //phone number
  description: string; //description
  rating: number; //salon's rating
  reviewCount: number; //number of reviews
  image: string; //URL to an image
  operatingHours: WorkDay[]; //salon's open hours as an array of opening hours for each day of the week
}

export interface Service {
  id: string; //unique identifier for the service
  salonId: string; //unique identifier for a salon
  name: string; //name or description of the service
  duration: number; //duration of the service
  price: number; //price for the service
}

//type for opening hours in one day
export interface WorkDay {
  day: string; //day of the week
  start: string; //opening hours
  end: string; //closing hours
}
