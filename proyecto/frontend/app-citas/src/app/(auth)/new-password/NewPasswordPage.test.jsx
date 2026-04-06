import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewPasswordPage from './page';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword, newPasswordSchema } from '@/features/auth';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

// Mock del feature auth
jest.mock('@/features/auth', () => ({
    resetPassword: jest.fn(),
    newPasswordSchema: {
        safeParse: jest.fn(),
    },
}));

// Mock de Logo component para evitar posibles problemas con imágenes
jest.mock('@/components/Logo', () => {
    return function MockLogo() {
        return <div data-testid="mock-logo">Logo</div>;
    };
});

describe('NewPasswordPage', () => {
    const mockPush = jest.fn();
    const mockGet = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        useRouter.mockReturnValue({
            push: mockPush,
        });

        useSearchParams.mockReturnValue({
            get: mockGet,
        });
    });

    it('muestra mensaje de atención cuando faltan el id o el token en la URL', () => {
        mockGet.mockReturnValue(null); // Parámetros faltantes

        render(<NewPasswordPage />);

        expect(screen.getByText(/No se detectaron los parámetros de seguridad necesarios/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Restablecer Contraseña/i })).toBeDisabled();
    });

    it('se renderiza correctamente cuando id y token están presentes', () => {
        mockGet.mockImplementation((param) => {
            if (param === 'id') return '123';
            if (param === 'token') return 'abc';
            return null;
        });

        render(<NewPasswordPage />);

        expect(screen.getByRole('heading', { name: /Nueva Contraseña/i })).toBeInTheDocument();
        expect(screen.queryByText(/No se detectaron los parámetros de seguridad necesarios/i)).not.toBeInTheDocument();

        expect(screen.getByPlaceholderText('NuevaClave123!')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Repite tu contraseña')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Restablecer Contraseña/i })).not.toBeDisabled();
    });

    it('alterna la visibilidad de las contraseñas', async () => {
        mockGet.mockImplementation((param) => param === 'id' ? '123' : 'abc');
        const user = userEvent.setup();
        render(<NewPasswordPage />);

        const passwordInput = screen.getByPlaceholderText('NuevaClave123!');
        const confirmPasswordInput = screen.getByPlaceholderText('Repite tu contraseña');

        // Para nueva contraseña
        const btnShowPassword = screen.getAllByRole('button', { name: /Mostrar contraseña/i })[0];

        expect(passwordInput).toHaveAttribute('type', 'password');
        await user.click(btnShowPassword);
        expect(passwordInput).toHaveAttribute('type', 'text');

        // Clic nuevamente para ocultar
        const btnHidePassword = screen.getAllByRole('button', { name: /Ocultar contraseña/i })[0];
        await user.click(btnHidePassword);
        expect(passwordInput).toHaveAttribute('type', 'password');

        // Para confirmar contraseña
        const btnShowConfirmPassword = screen.getAllByRole('button', { name: /Mostrar contraseña/i })[1];
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');
        await user.click(btnShowConfirmPassword);
        expect(confirmPasswordInput).toHaveAttribute('type', 'text');
    });

    it('muestra errores de validación de formulario si el esquema falla', async () => {
        mockGet.mockImplementation((param) => param === 'id' ? '123' : 'abc');
        const user = userEvent.setup();

        newPasswordSchema.safeParse.mockReturnValue({
            success: false,
            error: {
                issues: [
                    { path: ['password'], message: 'La contraseña es muy corta' },
                    { path: ['confirmPassword'], message: 'Las contraseñas no coinciden' },
                ],
            },
        });

        render(<NewPasswordPage />);

        const submitBtn = screen.getByRole('button', { name: /Restablecer Contraseña/i });
        await user.click(submitBtn);

        expect(await screen.findByText('La contraseña es muy corta')).toBeInTheDocument();
        expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
        expect(resetPassword).not.toHaveBeenCalled();
    });

    it('envía el formulario correctamente y redirecciona después de mostrar el éxito', async () => {
        jest.useFakeTimers();
        mockGet.mockImplementation((param) => param === 'id' ? '123' : 'abc');
        const user = userEvent.setup({ delay: null });

        newPasswordSchema.safeParse.mockReturnValue({
            success: true,
            data: { password: 'ValidPassword123' },
        });

        resetPassword.mockResolvedValue(undefined); // Simular éxito

        render(<NewPasswordPage />);

        const passwordInput = screen.getByPlaceholderText('NuevaClave123!');
        const confirmPasswordInput = screen.getByPlaceholderText('Repite tu contraseña');
        const submitBtn = screen.getByRole('button', { name: /Restablecer Contraseña/i });

        await user.type(passwordInput, 'ValidPassword123');
        await user.type(confirmPasswordInput, 'ValidPassword123');
        await user.click(submitBtn);

        expect(resetPassword).toHaveBeenCalledWith('123', 'abc', 'ValidPassword123');

        // Debe mostrar la vista de éxito
        expect(await screen.findByText('¡Contraseña Actualizada!')).toBeInTheDocument();

        // Comprobar la redirección después de 3 segundos
        jest.advanceTimersByTime(3000);
        expect(mockPush).toHaveBeenCalledWith('/login');

        jest.useRealTimers();
    });

    it('muestra mensaje de error del servidor cuando falla resetPassword', async () => {
        mockGet.mockImplementation((param) => param === 'id' ? '123' : 'abc');
        const user = userEvent.setup();

        newPasswordSchema.safeParse.mockReturnValue({
            success: true,
            data: { password: 'ValidPassword123' },
        });

        resetPassword.mockRejectedValue(new Error('Token inválido o expirado'));

        render(<NewPasswordPage />);

        const submitBtn = screen.getByRole('button', { name: /Restablecer Contraseña/i });
        await user.click(submitBtn);

        expect(await screen.findByText('Token inválido o expirado')).toBeInTheDocument();
    });
});
