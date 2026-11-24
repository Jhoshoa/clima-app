import axios from 'axios';
import { openWeatherClient } from '@/services/axiosClient';
import { getWeatherByCity } from '@/services/weatherService';

jest.mock('@/services/axiosClient');
const mockedClient = openWeatherClient as jest.Mocked<typeof openWeatherClient>;

describe('weatherService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...originalEnv, NEXT_PUBLIC_OPENWEATHER_API_KEY: 'test-key' };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('retorna los datos mapeados cuando la API responde correctamente', async () => {
    mockedClient.get.mockResolvedValueOnce({
      data: {
        name: 'El Alto',
        sys: { country: 'BO' },
        main: { temp: 25.81, humidity: 80 },
        weather: [{ id: 804, main: 'Clouds', description: 'nubes', icon: '04n' }],
        cod: 200,
      },
    });

    const result = await getWeatherByCity('El Alto');

    expect(mockedClient.get).toHaveBeenCalledWith('/weather', {
      params: {
        q: 'El Alto',
        appid: 'test-key',
        units: 'metric',
        lang: 'es',
      },
    });

    expect(result).toEqual({
      city: 'El Alto',
      country: 'BO',
      temperature: 26,
      humidity: 80,
      description: 'nubes',
    });
  });

  it('lanza error si el input viene vacío', async () => {
    await expect(getWeatherByCity('   ')).rejects.toThrow(
      /Por favor, ingresa un nombre de ciudad válido./i
    );
  });

  it('lanza error si falta la API Key', async () => {
    delete process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    await expect(getWeatherByCity('Madrid')).rejects.toThrow(
      /falta configurar la api key/i
    );
  });

  it('maneja el error 404 cuando la ciudad no existe', async () => {
    jest.spyOn(axios, 'isAxiosError').mockReturnValueOnce(true);
    mockedClient.get.mockRejectedValueOnce({ response: { status: 404 } });

    await expect(getWeatherByCity('NoExiste')).rejects.toThrow(
      /no se encontró la ciudad/i
    );
  });

  it('maneja el error 401 cuando la API Key es inválida', async () => {
    jest.spyOn(axios, 'isAxiosError').mockReturnValueOnce(true);
    mockedClient.get.mockRejectedValueOnce({ response: { status: 401 } });

    await expect(getWeatherByCity('La Paz')).rejects.toThrow(
      /api key invalida/i
    );
  });
});
