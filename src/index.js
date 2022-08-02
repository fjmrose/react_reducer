import React from 'react'
import ReactDOM from 'react-dom/client'
import { useReducer, useRef } from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [
                ...state,
                {
                    id: state.length,
                    name: action.name
                }
            ];
        case 'remove':
            return state.filter((_, index) => index !== action.index)
        case 'clear all':
            return []
        default:
            return state;
    }
}

const codeReducer = (state, action) => {
    const target = [2, 1, 4, 3, 6, 5]
    switch (action.type) {
        case 'append':
            const newState = [
                ...state,
                action.number
            ]
            for(let i = 0; i < newState.length; i++){
                if(newState[i] !== target[i]){
                    return []
                }
            }
            return newState
        case 'clear':
            return []
        default:
            throw new Error()
    }
}

const Reducers = () => {
    const inputRef = useRef()
    const [ items, dispatch ] = useReducer(reducer, [])
    const [ code, dispatchCode ] = useReducer(codeReducer, [])

    const handleSubmit = event => {
        event.preventDefault()
        dispatch({
            type: 'add',
            name: inputRef.current.value
        })
        inputRef.current.value = ''
    }

    return (
        <div>
            <div>
                <button onClick={() => dispatchCode({ type: 'append', number: 1 })}>1</button>
                <button onClick={() => dispatchCode({ type: 'append', number: 2 })}>2</button>
                <button onClick={() => dispatchCode({ type: 'append', number: 3 })}>3</button>
                <button onClick={() => dispatchCode({ type: 'append', number: 4 })}>4</button>
                <button onClick={() => dispatchCode({ type: 'append', number: 5 })}>5</button>
                <button onClick={() => dispatchCode({ type: 'append', number: 6 })}>6</button>
            </div>
            <div>
                INPUT: {code.join('')}
            </div>
            <div>
                <button onClick={() => dispatchCode({ type: 'clear' })}>Clear</button>
            </div>
            <ShoppingList refProp={inputRef}
                items={items}
                submit={handleSubmit}
                dispatch={dispatch} />
        </div>
    )
}

/*
const KeyPad = ({ num }) => {
    return (
        <div>
            <button onClick={() => dispatchCode({ type: 'append', number: num })}>{num}</button>      
        </div>
    )
}
*/

const ShoppingList = ({ refProp, items, submit, dispatch }) => {
    return (
        <div>
            <form onSubmit={submit}>
                <input ref={refProp} />
            </form>
            <ul>
                {items.map((item, index) => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => dispatch({ type: 'remove', index })} >
                            Clear Item
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={() => dispatch({ type: 'clear all' })}>Clear All</button>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Reducers />)