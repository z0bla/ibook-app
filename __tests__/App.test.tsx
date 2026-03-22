import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

test('renders text correctly', () => {
  const { getByText } = render(<Text>Hello</Text>);
  expect(getByText('Hello')).toBeTruthy();
});
