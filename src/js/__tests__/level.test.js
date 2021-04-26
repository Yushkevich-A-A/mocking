import fetchData from '../http';
import { getLevel } from '../level';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('call loadUserLevel with successful', () => {
  fetchData.mockReturnValue({ status: 'ok', level: 80 });

  const result = getLevel(1);
  expect(result).toBe('Ваш текущий уровень: 80');
  expect(fetchData).toBeCalledWith('https://server/user/1');
});

test('call loadUserLevel with empty result', () => {
  fetchData.mockReturnValue({ status: 'ok', level: 80 });

  const result = getLevel(1);
  expect(result).not.toBe('Информация об уровне временно недоступна');
  expect(fetchData).not.toBeCalledWith('https://server/user/2');
});

test('call loadUserLevel with error result', () => {
  fetchData.mockReturnValue({ status: 'error' });

  const result = getLevel(1);
  expect(result).toEqual('Информация об уровне временно недоступна');
  expect(fetchData).toBeCalledWith('https://server/user/1');
});
