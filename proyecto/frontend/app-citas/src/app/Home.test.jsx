import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { useRouter } from "next/navigation";

// 1. Mock de useRouter de Next.js
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({
        push: mockPush,
    })),
    usePathname: jest.fn(),
}));

// 2. Mock de iconos de Lucide-React
jest.mock("lucide-react", () => ({
    ArrowRight: () => <span data-testid="icon-arrow" />,
    CheckCircle2: () => <span data-testid="icon-check" />,
}));

describe("Home Page (Jest + JSX)", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debe renderizar el título principal con el texto esperado", () => {
        render(<Home />);

        // Verificamos las partes del título (incluyendo el span azul)
        expect(screen.getByText(/Organiza tus citas/i)).toBeInTheDocument();
        expect(screen.getByText(/Gana tiempo/i)).toBeInTheDocument();
        expect(screen.getByText(/Atiende mejor/i)).toBeInTheDocument();
    });

    it("debe mostrar los textos descriptivos de la plataforma", () => {
        render(<Home />);

        expect(screen.getByText(/La solución integral para negocios/i)).toBeInTheDocument();
        expect(screen.getByText(/Una plataforma diseñada para que tus clientes reserven/i)).toBeInTheDocument();
    });

    it("debe renderizar el badge de gestión inteligente con su icono", () => {
        render(<Home />);

        expect(screen.getByText("Gestión inteligente para tu negocio")).toBeInTheDocument();
        expect(screen.getByTestId("icon-check")).toBeInTheDocument();
    });

    it("debe navegar a la página de login al hacer clic en el botón 'Comenzar ahora'", () => {
        render(<Home />);

        const startBtn = screen.getByRole("button", { name: /Comenzar ahora/i });
        fireEvent.click(startBtn);

        // Verificamos que se llame a la función push con la ruta /login
        expect(mockPush).toHaveBeenCalledWith('/login');
    });

    it("debe mostrar la imagen principal con su texto alternativo", () => {
        render(<Home />);

        const mainImg = screen.getByAltText("Plataforma de gestión de citas");
        expect(mainImg).toBeInTheDocument();
        expect(mainImg).toHaveAttribute("src", expect.stringContaining("istockphoto.com"));
    });

    it("el botón principal debe contener el icono de flecha", () => {
        render(<Home />);

        expect(screen.getByTestId("icon-arrow")).toBeInTheDocument();
    });

});