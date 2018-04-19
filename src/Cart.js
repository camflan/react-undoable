import React from 'react'

import { cartStyles } from './styles'
import Button from './Button'

let Cart = ({ items, onRemove }) => (
    <div style={cartStyles.wrapper}>
        <h3 style={cartStyles.heading}>Shopping Cart</h3>
        <ul style={cartStyles.list}>
            {items.map(({ key, value }) => (
                <li style={cartStyles.item} key={key}>
                    {value}
                    <span style={cartStyles.button}>
                        <Button color="red" onClick={() => onRemove(key)}>
                            Remove
                        </Button>
                    </span>
                </li>
            ))}
        </ul>
    </div>
)

export default Cart
