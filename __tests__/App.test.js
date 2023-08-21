import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react-native';
import App from '../App';
describe('App Component', () => {
  test('renders app without crashing', () => {
    render(<App />);
  });

  test('displays splash screen initially', () => {
    const { getByTestId } = render(<App />);
    const splashScreen = getByTestId('splash-screen');
    expect(splashScreen).toBeTruthy();
  });

  test('hides splash screen after a certain time', async () => {
    const { queryByTestId } = render(<App />);
    await waitForElementToBeRemoved(() => queryByTestId('splash-screen'));
    const splashScreen = queryByTestId('splash-screen');
    expect(splashScreen).toBeNull();
  });

  test('displays header with correct title', () => {
    const { getByTestId } = render(<App />);
    const header = getByTestId('app-header');
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent('KC NEWS');
  });

  test('displays at least one tile card', async () => {
    const { findAllByTestId } = render(<App />);
    const tileCards = await findAllByTestId('tile-card');
    expect(tileCards.length).toBeGreaterThan(0);
  });

  test('displays detail card after clicking a tile', async () => {
    const { findByTestId, findAllByTestId } = render(<App />);
    const tileCards = await findAllByTestId('tile-card');
    const firstTile = tileCards[0];
    firstTile.click();
    const detailCard = await findByTestId('detail-card');
    expect(detailCard).toBeTruthy();
  });

  test('hides detail card after closing', async () => {
    const { findByTestId, findByText } = render(<App />);
    const tileCards = await findAllByTestId('tile-card');
    const firstTile = tileCards[0];
    firstTile.click();
    const closeButton = await findByText('Close');
    closeButton.click();
    const detailCard = await findByTestId('detail-card');
    expect(detailCard).toBeNull();
  });

});
