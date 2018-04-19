let appStyle = {
    fontFamily: 'sans-serif',
}

let undoItemStyle = {
    item: {
        display: 'block',
        backgroundColor: 'rebeccapurple',
        color: 'white',
        padding: '1rem',
        marginBottom: 1,
    },
    button: {
        float: 'right',
    },
}

let cartStyles = {
    wrapper: {
        backgroundColor: 'lightgrey',
        margin: '0.5rem',
        padding: '1rem',
        maxWidth: 350,
        borderRadius: 4,
        border: '1px solid grey',
    },
    heading: {
        marginTop: 0,
        borderBottom: '1px solid grey',
        marginBottom: 0,
        paddingBottom: '0.5rem',
    },
    list: {
        marginLeft: 0,
        paddingLeft: 0,
        marginBottom: 0,
    },
    item: {
        listStyleType: 'none',
        margin: '0.5rem 0',
    },
    footer: {
        borderTop: '1px solid grey',
        paddingTop: '0.5rem',
        marginBottom: 0,
        paddingBottom: 0,
    },
    button: {
        float: 'right',
        marginRight: '-0.5rem',
    },
}

export default { appStyle, undoItemStyle, cartStyles }
export { appStyle, undoItemStyle, cartStyles }
