import React from 'react'

let buttonStyle = {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2,
    display: 'inline-block',
    margin: '0 .5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
}

let buttonColors = {
    red: {
        backgroundColor: 'white',
        color: 'red',
        borderColor: 'red',
    },
    default: {
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'darkgrey',
    },
}

let Button = ({ onClick, color = 'default', submit = false, children }) => (
    <button
        style={{ ...buttonStyle, ...buttonColors[color] }}
        type={submit ? 'submit' : 'button'}
        onClick={onClick}>
        {children}
    </button>
)

export default Button
