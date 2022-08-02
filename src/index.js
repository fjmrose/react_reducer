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
    const keys = [1, 2, 3, 4, 5, 6]

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
            <ul>
                {keys.map((key) => (
                    <KeyPad key={key}
                            num={key}
                            dispatch={dispatchCode} />
                ))}
            </ul>
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

const KeyPad = ({ num, dispatch }) => {
    return (
        <span>
            <button onClick={() => dispatch({ type: 'append', number: num })}>{num}</button>      
        </span>
    )
}

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