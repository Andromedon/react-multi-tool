import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import WorkoutTimer from './WorkoutTimer';

const click = (name: string) => fireEvent.click(screen.getByRole('button', { name }));
const reduceBreakTime = () => {
  for (let i = 0; i < 5; i++) {
    fireEvent.click(screen.getAllByRole('button', { name: '-' })[1]);
  }
};
const advanceSeconds = (seconds: number) => {
  // Each tick commits the new counter before the component schedules its next tick.
  for (let i = 0; i < seconds; i++) {
    act(() => { jest.advanceTimersByTime(1000); });
  }
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test('starts with five sets and prevents fewer than one set or a ten-second break', () => {
  render(<WorkoutTimer />);
  expect(screen.getAllByRole('img', { name: 'woof!' })).toHaveLength(5);
  expect(screen.getByRole('heading', { name: '60' })).toBeInTheDocument();

  for (let i = 0; i < 10; i++) {
    fireEvent.click(screen.getAllByRole('button', { name: '-' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: '-' })[1]);
  }

  expect(screen.getAllByRole('img', { name: 'woof!' })).toHaveLength(1);
  expect(screen.getByRole('heading', { name: '10' })).toBeInTheDocument();
});

test('counts a completed set, stops the break, and resets its countdown', () => {
  render(<WorkoutTimer />);
  reduceBreakTime();
  click('Next');
  click('Break');
  advanceSeconds(3);

  expect(screen.getByRole('heading', { name: '7' })).toBeInTheDocument();
  expect(screen.getByRole('progressbar', { name: 'Break time remaining' }))
    .toHaveAttribute('aria-valuenow', '7');
  expect(screen.getAllByRole('img', { name: 'woof!' })).toHaveLength(1);
  click('Stop');
  advanceSeconds(3);

  expect(screen.getByRole('heading', { name: '10' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Break' })).toBeInTheDocument();
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
});

test('plays the alarm when the break expires and stops it on request', () => {
  render(<WorkoutTimer />);
  reduceBreakTime();
  click('Next');
  click('Break');
  advanceSeconds(9);
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  advanceSeconds(1);

  expect(screen.getByRole('heading', { name: '0' })).toBeInTheDocument();
  expect(screen.getByRole('progressbar', { name: 'Break time remaining' }))
    .toHaveAttribute('aria-valuenow', '0');
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  click('Stop');
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
});

test('finishes after the last set without another break and starts a new workout', () => {
  render(<WorkoutTimer />);
  for (let i = 0; i < 3; i++) {
    fireEvent.click(screen.getAllByRole('button', { name: '-' })[0]);
  }
  click('Next');
  click('Break');
  click('Stop');
  click('Break');

  expect(screen.getAllByRole('img', { name: 'woof!' })).toHaveLength(2);
  expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument();
  click('New Workout');
  expect(screen.getAllByRole('img', { name: 'woof!' })).toHaveLength(5);
  click('Next');
  expect(screen.queryByRole('img', { name: 'woof!' })).not.toBeInTheDocument();
});
