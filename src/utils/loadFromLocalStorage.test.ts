import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadFromLocalStorage, saveToLocalStorage } from './loadFromLocalStorage';

describe('localStorage utilities', () => {
  const mockKey = 'test-key';
  const mockValue = { data: 'test-value' };

  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('loadFromLocalStorage', () => {
    it('should return defaultValue when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-expect-error - intentionally removing window for test
      delete global.window;

      const result = loadFromLocalStorage(mockKey, mockValue);
      expect(result).toEqual(mockValue);

      global.window = originalWindow;
    });

    it('should return defaultValue when key does not exist', () => {
      const result = loadFromLocalStorage('non-existent-key', mockValue);
      expect(result).toEqual(mockValue);
    });

    it('should return parsed value when key exists', () => {
      window.localStorage.setItem(mockKey, JSON.stringify(mockValue));
      const result = loadFromLocalStorage(mockKey, { data: 'default' });
      expect(result).toEqual(mockValue);
    });

    it('should return defaultValue and log error when JSON.parse fails', () => {
      window.localStorage.setItem(mockKey, 'invalid-json');
      const result = loadFromLocalStorage(mockKey, mockValue);
      expect(result).toEqual(mockValue);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('saveToLocalStorage', () => {
    it('should do nothing when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-expect-error - intentionally removing window for test
      delete global.window;

      saveToLocalStorage(mockKey, mockValue);
      expect(console.error).not.toHaveBeenCalled();

      global.window = originalWindow;
    });

    it('should save value to localStorage', () => {
      saveToLocalStorage(mockKey, mockValue);
      const storedValue = window.localStorage.getItem(mockKey);
      expect(storedValue).toEqual(JSON.stringify(mockValue));
    });

    it('should log error when JSON.stringify fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const circularReference: any = { data: {} };
      circularReference.data.circular = circularReference;

      saveToLocalStorage(mockKey, circularReference);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
