import { describe, it, expect, vi } from "vitest";
import type { Mock } from "vitest";
import { getOrders } from "../services/getOrders";
import { useSession } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from "./useOrders";
import { renderHook } from "@testing-library/react-hooks"

vi.mock('../services/getOrders', () => ({
    getOrders: vi.fn()
}))

vi.mock('../context/AuthContext', () => ({
    useSession: vi.fn()
}))

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn()
}))

describe('useOrders', () => {
    const mockNavigate = vi.fn()
    const mockGetOrders = getOrders as Mock
    const mockUseSession = useSession as Mock
    it('Debería obtener las ordenes', async () => {
        const mockOrders = [
            {
                id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                customer: {
                    id: "60d07f61-99bf-4b90-955b-5d3a7c9bb3d4",
                    name: "John Doe",
                    email: "john.doe@example.com"
                },
                products: [
                    {
                        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
                        name: "Laptop",
                        price: 999.99,
                        quantity: 1
                    },
                    {
                        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
                        name: "Mouse",
                        price: 29.99,
                        quantity: 1
                    }
                ],
                total: 1029.98,
                status: "delivered",
                orderDate: "2023-10-01T10:00:00Z",
                shippingAddress: {
                    street: "123 Main St",
                    city: "Anytown",
                    state: "CA",
                    zipCode: "12345",
                    country: "USA"
                },
                paymentMethod: "credit_card"
            }
        ]
    
        mockGetOrders.mockResolvedValue(mockOrders)
        mockUseSession.mockReturnValue({ user: { id: 1 } })

        const { result, waitForNextUpdate } =  renderHook(() => useOrders())

        expect(result.current.loading).toBe(true)

        await waitForNextUpdate()

        expect(result.current.loading).toBe(false)
        expect(result.current.orders).toEqual(mockOrders)
    })
})
