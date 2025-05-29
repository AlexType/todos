/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { pluralForm } from './pluralForm';

describe('pluralForm', () => {
  const forms: [string, string, string] = ['яблоко', 'яблока', 'яблок'];

  it('should throw error when invalid forms array provided', () => {
    expect(() => pluralForm(1, [] as any)).toThrow('Неверный формат вариантов склонения. Должно быть 3 формы');
    expect(() => pluralForm(1, ['one'] as any)).toThrow('Неверный формат вариантов склонения. Должно быть 3 формы');
    expect(() => pluralForm(1, ['one', 'two'] as any)).toThrow(
      'Неверный формат вариантов склонения. Должно быть 3 формы',
    );
  });

  it('should return first form for 1', () => {
    expect(pluralForm(1, forms)).toBe('яблоко');
    expect(pluralForm(21, forms)).toBe('яблоко');
    expect(pluralForm(101, forms)).toBe('яблоко');
  });

  it('should return second form for 2-4', () => {
    expect(pluralForm(2, forms)).toBe('яблока');
    expect(pluralForm(3, forms)).toBe('яблока');
    expect(pluralForm(4, forms)).toBe('яблока');
    expect(pluralForm(22, forms)).toBe('яблока');
    expect(pluralForm(33, forms)).toBe('яблока');
    expect(pluralForm(104, forms)).toBe('яблока');
  });

  it('should return third form for 5-20 and others', () => {
    expect(pluralForm(5, forms)).toBe('яблок');
    expect(pluralForm(11, forms)).toBe('яблок');
    expect(pluralForm(12, forms)).toBe('яблок');
    expect(pluralForm(20, forms)).toBe('яблок');
    expect(pluralForm(25, forms)).toBe('яблок');
    expect(pluralForm(100, forms)).toBe('яблок');
    expect(pluralForm(0, forms)).toBe('яблок');
  });

  it('should handle edge cases', () => {
    expect(pluralForm(111, forms)).toBe('яблок');
    expect(pluralForm(121, forms)).toBe('яблоко');
    expect(pluralForm(122, forms)).toBe('яблока');
    expect(pluralForm(125, forms)).toBe('яблок');
  });

  it('should work with different word forms', () => {
    const userForms: [string, string, string] = ['пользователь', 'пользователя', 'пользователей'];
    expect(pluralForm(1, userForms)).toBe('пользователь');
    expect(pluralForm(2, userForms)).toBe('пользователя');
    expect(pluralForm(5, userForms)).toBe('пользователей');
  });
});
