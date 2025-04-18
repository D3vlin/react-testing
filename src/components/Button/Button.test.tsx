import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Button } from "./Button";

describe('<Button />', () => {
    it('Debería renderizar el botón', () => {
        render(<Button label="click" />)
        const button = screen.getByText('click')
        expect(button).toBeInTheDocument()
    })

    it('Debería llamar a la función onClick', async () => {
        const hangleClick = vi.fn()
        render(<Button label="click" onClick={hangleClick} />)
        const button = screen.getByText("click")
        await act(() => {
            fireEvent.click(button)
        })
        expect(hangleClick).toHaveBeenCalledTimes(1)
    })
})