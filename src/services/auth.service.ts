import { delay } from "@/utils/auth.utils";
import { LoginCredentials, SignupCredentials, User } from "@/types/auth.types";
import users from "@/data/users.json";

const mockUsers: User[] = users as User[];

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  await delay(1000);

  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === credentials.email.toLowerCase(),
  );

  if (!user || user.password !== credentials.password) {
    throw new Error("Invalid email or password.");
  }

  return user;
}

export async function signupUser(
  credentials: SignupCredentials,
): Promise<User> {
  await delay(1000);

  const existingUser = mockUsers.find(
    (u) => u.email.toLowerCase() === credentials.email.toLowerCase(),
  );

  if (existingUser) {
    throw new Error("User already exists.");
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email: credentials.email,
    password: credentials.password,
    name: credentials.name,
    phone: credentials.phone,
    createdAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);

  return newUser;
}
