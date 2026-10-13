import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const click = async (element: HTMLElement) => {
  await act(async () => {
    await userEvent.click(element);
  });
};

const type = async (element: HTMLElement, value: string) => {
  await act(async () => {
    await userEvent.type(element, value);
  });
};

test('shows the home page and navigation to both tools', () => {
  render(<App />);

  expect(screen.getByRole('heading', {
    name: "Welcome to Andro's MultiTool App :)",
  })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Converter' })[0])
    .toHaveAttribute('href', '/converter');
  expect(screen.getAllByRole('link', { name: 'Workout Timer' })[0])
    .toHaveAttribute('href', '/workouttimer');
});

test.each([
  ['grams', '86.00'],
  ['milliliters', '100.00'],
  ['glasses', '0.40'],
])('converts 100 grams of butter to oil in %s and clears the form', async (unit, expected) => {
  const { container } = render(<App />);
  await click(screen.getAllByRole('link', { name: 'Converter' })[0]);

  // MUI 5 exposes its select controls as buttons.
  const selects = screen.getAllByRole('button', { expanded: false });
  await click(selects[0]);
  await click(await screen.findByRole('option', { name: 'Butter' }));
  await click(selects[1]);
  await click(await screen.findByRole('option', { name: 'Oil' }));

  await type(screen.getByRole('textbox'), '100');
  await click(screen.getAllByRole('radio', { name: unit })[1]);
  await click(screen.getByRole('button', { name: 'Convert' }));

  const result = container.querySelector('strong');
  expect(result).toHaveTextContent(expected);

  await click(screen.getByRole('button', { name: 'Clear' }));
  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(result).toBeEmptyDOMElement();
  expect(selects[0]).not.toHaveTextContent('Butter');
  expect(selects[1]).not.toHaveTextContent('Oil');
  expect(screen.getAllByRole('radio', { name: 'grams' })[1]).toBeChecked();
});
