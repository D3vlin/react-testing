import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Counter } from './Counter'

describe('<Contador />', () => {
    it('Debería mostrar el valor inicial', () => {
        render(<Counter />)
        const counter = screen.getByText('Contador: 0')
        expect(counter).toBeInTheDocument()
    })
    
    it('Debería incrementar el contador', async () => {
        render(<Counter />)
        const button = screen.getByText('Incrementar')
        await act(() => {
            fireEvent.click(button)
        })
        const counter = screen.getByText('Contador: 1')
        expect(counter).toBeInTheDocument()
    })
})