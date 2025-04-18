import { describe, it, expect } from 'vitest'

describe('Mi primer test', () => {
    it('La suma de dos números', () => {
        const sum = (a, b) => a +b
        const result = sum(1, 1)
        expect(result).toBe(2)
    })

    it('Dos textos iguales', () => {
        const textA = 'Platzi Conf'
        const textB = 'Platzi Conf'
        expect(textA).toBe(textB)
    })
})