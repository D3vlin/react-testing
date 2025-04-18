import { useState } from "react"

export const Counter = () => {
    const [counter, setCounter] = useState(0)

    const handleIncrement = () => {
        setCounter(counter + 1)
    }

    return(
        <div>
            <p>Contador: {counter}</p>
            <button onClick={handleIncrement}>Incrementar</button>
        </div>
    )
}