import { render, screen } from "@testing-library/react";
import RegistroPage from "./page";

describe("RegistroPage", () => {
    test("renderiza título y subtítulo", () => {
        render(<RegistroPage />);
        expect(
        screen.getByRole("heading", { name: /regístrate/i })
        ).toBeInTheDocument();
        expect(
        screen.getByText(/Comienza a organizar tu agenda/i)
        ).toBeInTheDocument();
    });

    test("tiene campos de nombre, correo, contraseña y teléfono", () => {
        render(<RegistroPage />);
        expect(screen.getByPlaceholderText(/juan perez/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/juon@gmail.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/\+52XXXXXXXXXX/i)).toBeInTheDocument();
    });

    test("renderiza enlace de login", () => {
        render(<RegistroPage />);
        const link = screen.getByText(/Iniciar Sesión/i);
        expect(link).toHaveAttribute("href", "/login");
    });

    test("renderiza botón de crear cuenta", () => {
        render(<RegistroPage />);
        expect(
        screen.getByRole("button", { name: /crear cuenta/i })
        ).toBeInTheDocument();
    });
});