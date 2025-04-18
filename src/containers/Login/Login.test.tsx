import { describe, it, expect, vi } from "vitest";
import type { Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";
import { Login } from "./Login";

vi.mock('../../services/getAuth', () => ({
    getAuth: vi.fn()
}))

vi.mock('react-router-dom', async () => {
    const current = await vi.importActual('react-router-dom')
    return {
        ...current,
        useNavigate: () => mockNavigate
    }
})

const mockGetAuth = getAuth as Mock
const mockNavigate = vi.fn()

describe('<Login />', () => {
    const renderLogin = () => {
        return render(
            <SessionProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </SessionProvider>
        )
    }

    it('Debería mostrar un mensaje de error', async () => {
        mockGetAuth.mockRejectedValue(new Error('Invalid credentials'))

        renderLogin()

        const usernameInput = screen.getByPlaceholderText('Username')
        const passwordInput = screen.getByPlaceholderText('Password')
        const buttonLogin = screen.getByRole('button', { name: 'Login' })

        fireEvent.change(usernameInput, { target: { value: 'wrongUser' } })
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } })
        fireEvent.click(buttonLogin)
        
        const errorMessage = await screen.findByText('Invalid credentials')
        expect(errorMessage).toBeInTheDocument()
    })

    
    it('Debería redirigir a /orders', async () => {
        mockGetAuth.mockResolvedValue({ success: true})

        renderLogin()

        const usernameInput = screen.getByPlaceholderText('Username')
        const passwordInput = screen.getByPlaceholderText('Password')
        const buttonLogin = screen.getByRole('button', { name: 'Login' })

        fireEvent.change(usernameInput, { target: { value: 'validUser' } })
        fireEvent.change(passwordInput, { target: { value: 'validPassword' } })
        fireEvent.click(buttonLogin)
        
        await waitFor(() => {
            expect(mockGetAuth).toHaveBeenCalledWith('validUser', 'validPassword')
            expect(mockNavigate).toHaveBeenCalledWith('/orders')
        })
    })
})