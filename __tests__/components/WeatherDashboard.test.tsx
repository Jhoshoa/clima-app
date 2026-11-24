import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import toast from 'react-hot-toast';
import { WeatherDashboard } from '@/components/clima/WeatherDashboard';
import { getWeatherByCity } from '@/services/weatherService';

jest.mock('@/services/weatherService');
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
  },
}));

const mockedGetWeather = getWeatherByCity as jest.MockedFunction<
  typeof getWeatherByCity
>;

describe('WeatherDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('el campo de entrada y el botón funcionan y bloquean búsquedas vacías', async () => {
    const user = userEvent.setup();
    render(<WeatherDashboard />);

    const input = screen.getByLabelText(/nombre de la ciudad/i);
    const button = screen.getByRole('button', { name: /buscar/i });

    expect(button).toBeDisabled();

    await user.type(input, '   ');
    expect(button).toBeDisabled();

    await user.clear(input);
    await user.type(input, 'El Alto, BO');
    expect(input).toHaveValue('El Alto, BO');
    expect(button).toBeEnabled();
  });

  it('muestra la información del clima al hacer clic en Buscar', async () => {
    const user = userEvent.setup();
    mockedGetWeather.mockResolvedValueOnce({
      city: 'El Alto',
      country: 'BO',
      temperature: 14,
      humidity: 42,
      description: 'algo de nubes',
    });

    render(<WeatherDashboard />);

    await user.type(screen.getByLabelText(/nombre de la ciudad/i), 'El Alto, BO');
    await user.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(screen.getByText('El Alto, BO')).toBeInTheDocument();
    });

    expect(screen.getByText(/14°C/)).toBeInTheDocument();
    expect(screen.getByText(/42%/)).toBeInTheDocument();
    expect(screen.getByText(/algo de nubes/i)).toBeInTheDocument();
  });

  it('permite realizar la búsqueda presionando la tecla Enter', async () => {
    const user = userEvent.setup();
    mockedGetWeather.mockResolvedValueOnce({
      city: 'Madrid',
      country: 'ES',
      temperature: 23,
      humidity: 38,
      description: 'cielo claro',
    });

    render(<WeatherDashboard />);

    const input = screen.getByLabelText(/nombre de la ciudad/i);
    await user.type(input, 'Madrid{enter}');

    await waitFor(() => {
      expect(screen.getByText('Madrid, ES')).toBeInTheDocument();
    });
    expect(mockedGetWeather).toHaveBeenCalledWith('Madrid');
  });

  it('muestra un toast de error cuando la ciudad es inválida o no existe', async () => {
    const user = userEvent.setup();
    mockedGetWeather.mockRejectedValueOnce(
      new Error('No se encontró la ciudad "CiudadInexistente". Verifica el nombre e intenta nuevamente.')
    );

    render(<WeatherDashboard />);

    await user.type(
      screen.getByLabelText(/nombre de la ciudad/i),
      'CiudadInexistente'
    );
    await user.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'No se encontró la ciudad "CiudadInexistente". Verifica el nombre e intenta nuevamente.'
      );
    });
  });
});
