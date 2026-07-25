import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MoodSelectorModal from './MoodSelectorModal';
import { getStoredMoodHistory } from '../utils/storage';

const renderModal = (props = {}) =>
  render(
    <MoodSelectorModal
      isOpen
      onClose={vi.fn()}
      onMoodSelected={vi.fn()}
      isDarkMode={false}
      {...props}
    />
  );

beforeEach(() => {
  localStorage.clear();
});

describe('MoodSelectorModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<MoodSelectorModal isOpen={false} onClose={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows every mood option when open', () => {
    renderModal();
    ['Happy', 'Calm', 'Neutral', 'Anxiety', 'Sad'].forEach((mood) => {
      expect(screen.getByText(mood)).toBeInTheDocument();
    });
  });

  it('reports the selected mood to the parent and closes', async () => {
    const user = userEvent.setup();
    const onMoodSelected = vi.fn();
    const onClose = vi.fn();
    renderModal({ onMoodSelected, onClose });

    await user.click(screen.getByText('Anxiety'));

    expect(onMoodSelected).toHaveBeenCalledTimes(1);
    expect(onMoodSelected.mock.calls[0][0]).toMatchObject({ mood: 'Anxiety', val: 2 });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('persists the selected mood to storage', async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByText('Happy'));

    const history = getStoredMoodHistory();
    expect(history[history.length - 1]).toMatchObject({ mood: 'Happy', val: 5 });
  });
});
