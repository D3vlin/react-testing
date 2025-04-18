import { describe, it, expect, vi } from "vitest";
import type { Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";
import { Login } from "./Login";

vi.mock('../../services/getAuth', () => ({
    getAuth: vi.fn()
}))

const mockGetAuth = getAuth as Mock

describe('<Login />', () => {
    it('Debería mostrar un mensaje de error', async () => {
        mockGetAuth.mockRejectedValue(new Error('Invalid credentials'))

        render(
            <SessionProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </SessionProvider>
        )

        const usernameInput = screen.getByPlaceholderText('Username')
        const passwordInput = screen.getByPlaceholderText('Password')
        const buttonLogin = screen.getByRole('button', { name: 'Login' })

        fireEvent.change(usernameInput, { target: { value: 'wrongUser' } })
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } })
        fireEvent.click(buttonLogin)
        
        const errorMessage = await screen.findByText('Invalid credentials')
        expect(errorMessage).toBeInTheDocument()
    })
})