
import { render, screen } from "@testing-library/react";
import RegistroPage from "./page";

// 🔥 Mock del App Router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// 🔥 Mock de next/link
// jest.mock("next/link", () => {
//   return ({ children, href }) => {
//     return <a href={href}>{children}</a>;
//   };
  
// });


jest.mock("next/link", () => {
  const MockLink = ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };

  MockLink.displayName = "MockLink";

  return MockLink;
});


jest.mock("@/features/auth/actions/auth-actions", () => ({
  registerUser: jest.fn(),
}));

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
    expect(screen.getByPlaceholderText(/juan@gmail.com/i)).toBeInTheDocument();
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

    const button = screen.getByRole("button", {
      name: /crear cuenta/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toBeDisabled();
  });
});