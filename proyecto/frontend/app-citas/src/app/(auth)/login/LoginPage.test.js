import { render, screen } from "@testing-library/react";
import LoginPage from "./page";

describe("LoginPage", () => {
    test("renderiza título y subtítulo", () => {
    render(<LoginPage />);
    expect(screen.getByRole("heading", { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByText(/Accede a tu cuenta/i)).toBeInTheDocument();
    });

    test("tiene campos de correo y contraseña", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText(/tuemail@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    });

    test("renderiza botón de entrar", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
    });

    test("renderiza enlace de registro", () => {
    render(<LoginPage />);
    expect(screen.getByText(/Regístrate/i)).toHaveAttribute("href", "/register");
    });
});