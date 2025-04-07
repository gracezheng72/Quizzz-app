import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome text', () => {
  render(<App />);
  const welcomeText = screen.getByText(/welcome to the quizzz app!/i);  // Adjusting to match the actual text
  expect(welcomeText).toBeInTheDocument();
});
