import { ScrollView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";

export function SignupScreen() {
  return;
  <>
    <ScrollView>
      <Text>Name:</Text>
      <TextInput placeholder="Enter your name" />
      <Text>Email:</Text>
      <TextInput placeholder="Enter your email" />
      <Text>Phone number:</Text>
      <TextInput placeholder="Enter your phone number" />
      <Text>Password:</Text>
      <TextInput placeholder="Enter your password" />
      <Text>Confirm Password:</Text>
      <TextInput placeholder="Confirm your password" />
      <Button>Submit</Button>
    </ScrollView>
    ;
  </>;
}
