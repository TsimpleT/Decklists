// import React from 'react';
import { screen } from '@testing-library/react';
import { ALL_CARD_IDS } from './CardData';
// import App from './App';

test('ALL_CARD_IDS in order', () => {
    expect(ALL_CARD_IDS).toEqual([...ALL_CARD_IDS].sort());
    // render(<App />);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
});
