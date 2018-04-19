import React from 'react'
import { render } from 'react-dom'

import { appStyle, undoItemStyle } from './styles'

import Button from './Button'
import Cart from './Cart'
import Undoable from './Undoable'

let itemsInCart = [
    { key: 1, value: 'Apples' },
    { key: 2, value: 'Bananas' },
    { key: 3, value: 'Pears' },
    { key: 4, value: 'Pineapples' },
    { key: 5, value: 'Oranges' },
    { key: 6, value: 'Grapes' },
    { key: 7, value: 'Blueberries' },
]

// the main thrust of this demo is the Undoable component, check ./Undoable.js

class App extends React.Component {
    state = {
        items: itemsInCart,
    }

    getItem = id => this.state.items.find(({ key }) => key === id)

    handleOnRemove = id => {
        this.setState(({ items: prevItems }) => {
            let idx = prevItems.findIndex(({ key }) => key === id)
            prevItems.splice(idx, 1)

            return { items: prevItems }
        })
    }

    render() {
        return (
            <div style={appStyle}>
                <Undoable
                    items={this.state.items}
                    onRemove={this.handleOnRemove}
                    getItem={this.getItem}
                    expirationMs={100000}>
                    {({ onRemove, items, pendingItems }) => (
                        <React.Fragment>
                            {pendingItems.map(
                                ({ key, value, cancelRemoval }) => (
                                    <div
                                        style={undoItemStyle.item}
                                        key={key}
                                        id={key}>
                                        <strong>You removed: </strong>
                                        {value}
                                        <span style={undoItemStyle.button}>
                                            <Button onClick={cancelRemoval}>
                                                Put back
                                            </Button>
                                        </span>
                                    </div>
                                )
                            )}

                            <Cart items={items} onRemove={onRemove} />
                        </React.Fragment>
                    )}
                </Undoable>
            </div>
        )
    }
}

render(<App />, document.getElementById('root'))
