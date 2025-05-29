import '@testing-library/jest-dom/vitest'; // добавляет методы вроде `.toBeInTheDocument()`
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Очистка после каждого теста (например, unmount React-компонентов)
afterEach(() => {
  cleanup();
});
