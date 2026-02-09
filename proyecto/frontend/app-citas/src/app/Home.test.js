import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

// mock de useRouter
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe("Home component", () => {
    test("renderiza título y subtítulo", () => {
        render(<Home />);
        expect(
        screen.getByText(/organiza tus citas\. gana tiempo\. atiende mejor\./i)
        ).toBeInTheDocument();
        expect(
        screen.getByText(/ideal para negocios y consultorios/i)
        ).toBeInTheDocument();
    });

    test("botón Comenzar dispara router.push('/login')", async () => {
        render(<Home />);
        const button = screen.getByRole("button", { name: /comenzar/i });
        await userEvent.click(button);
        expect(mockPush).toHaveBeenCalledWith("/login");
    });
});