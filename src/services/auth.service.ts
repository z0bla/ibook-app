import { delay } from '@/utils/auth.utils';
import { LoginCredentials, SignupCredentials, User } from '@/types/auth.types';
import users from '@/data/users.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userss = users as unknown as string[];
const readUsers = async (): Promise<User[]> => {
  try {
    let jsonValue = await AsyncStorage.getItem('users');
    if (jsonValue === null) {
      await AsyncStorage.setItem('users', JSON.stringify(userss));
      jsonValue = await AsyncStorage.getItem('users');
    }
    return JSON.parse(jsonValue!);
  } catch (e) {
    let message = '';
    if (typeof e === 'string') message = e;
    else if (e instanceof Error) message = e.message;
    throw new Error(message);
  }
};
const updateUsers = async (value: User[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('users', jsonValue);
  } catch (e) {
    let message = '';
    if (typeof e === 'string') message = e;
    else if (e instanceof Error) message = e.message;
    throw new Error(message);
  }
};

const mockUsers = readUsers();

async function findUserByEmail(email: string): Promise<User> {
  let res = mockUsers.then((data) =>
    data.filter((u: User) => u.email.toLowerCase() === email.toLowerCase()),
  );
  let newres = (await res)[0];
  return newres;
}

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  await delay(1000);

  const user = await findUserByEmail(credentials.email);

  if (!user || user.password !== credentials.password) {
    throw new Error('Invalid email or password.');
  }

  return user;
}

export async function signupUser(
  credentials: SignupCredentials,
): Promise<User> {
  await delay(1000);

  const existingUser = await findUserByEmail(credentials.email);

  if (existingUser) {
    throw new Error('User already exists.');
  }

  const newUser: User = {
    id: Date.now() + Math.random() + '',
    email: credentials.email,
    password: credentials.password,
    name: credentials.name,
    phone: credentials.phone,
    createdAt: new Date().toISOString(),
  };

  (await mockUsers).push(newUser);
  updateUsers(await mockUsers);

  return newUser;
}
