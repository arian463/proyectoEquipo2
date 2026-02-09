// src/components/Menu.test.tsx
import { render, screen } from "@testing-library/react";
import Menu from "./Menu";

describe("Menu", () => {
    test("renderiza enlaces principales", () => {
        render(<Menu />);
        expect(screen.getByRole("link", { name: /inicio/i })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: /acerca de/i })).toHaveAttribute("href", "/about");
        expect(screen.getByRole("link", { name: /contacto/i })).toHaveAttribute("href", "/contact");
        expect(screen.getByRole("link", { name: /registrarse/i })).toHaveAttribute("href", "/register");
    });
});