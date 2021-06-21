import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

afterEach(cleanup);

test('should 3', () => {
  expect(3).toBe(3);
});

// describe('Header', () => {
//   test('render App', () => {
//     render(
//       <MemoryRouter>
//         <App />
//       </MemoryRouter>
//     );
//     screen.debug();
//   });
// });
