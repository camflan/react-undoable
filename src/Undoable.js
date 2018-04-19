import React from 'react'
import { oneOfType, object, array, func, number } from 'prop-types'

/*
 *  Undoable aims to be an easy to use 'logical component' which
 *  adds 'undo' to another component.
 * 
 *  It does this by intercepting an onRemove method, and filtering the provided items
 *  until expirationMs has been reached, when it will call the original onRemove method.
 * 
 *  Until that time, you are able to 'undo' or cancel the onRemove call by using the cancelRemove
 *  method attached to each pendingItem
 */

class Undoable extends React.Component {
    static propTypes = {
        items: oneOfType([array, object]).required,
        onRemove: func.required, // calling this function will remove the item from the parent
        getItem: func.required, // this will retrieve the item from parent. We need this to save the data for restore
        expirationMs: number, // how long does the user have to undo?
        render: func, // if you prefer to use render={} instead of children for the render prop
    }

    static defaultProps = {
        onRemove: () => null,
        getItem: () => null,
        items: [],
        expirationMs: 5000,
    }

    state = {
        pendingItems: [],
    }

    // called after expirationMs to handle removal from pendingItems
    // as well as calling the actual onRemove func
    _onRemove = item => {
        let { onRemove } = this.props

        this.setState(({ pendingItems }) => {
            let idx = pendingItems.findIndex(
                ([timeoutId, args, i]) => i === item
            )

            // TODO: I don't like this...need to find a better way?
            onRemove(pendingItems[idx][1])

            return {
                pendingItems: [
                    ...pendingItems.slice(0, idx),
                    ...(idx + 1 <= pendingItems.length
                        ? pendingItems.slice(idx + 1)
                        : []),
                ],
            }
        })
    }

    // capture onRemove, put item into pendingItems and setTimeout for undo expiration
    interceptOnRemove = (...args) => {
        let { expirationMs, getItem } = this.props
        let i = getItem(...args)

        let timeoutId = setTimeout(this._onRemove, expirationMs, i)

        this.setState(prevState => ({
            pendingItems: [...prevState.pendingItems, [timeoutId, args, i]],
        }))
    }

    // function to cancel the undo expiration and return pendingItem to items
    cancelRemoval = timeoutId => {
        clearTimeout(timeoutId)

        this.setState(({ pendingItems }) => {
            let idx = pendingItems.findIndex(
                ([tid, ...rest]) => timeoutId === tid
            )
            return {
                pendingItems: [
                    ...pendingItems.slice(0, idx),
                    ...(idx + 1 <= pendingItems.length
                        ? pendingItems.slice(idx + 1)
                        : []),
                ],
            }
        })
    }

    pendingItemsPredicate = item => {
        return !this.state.pendingItems.find(([tid, args, i]) => i === item)
    }

    render() {
        let { pendingItems } = this.state
        let { items, render, children } = this.props
        let renderFn = render ? render : children

        // render prop arguments
        // onRemove -> our captive onRemove method to handle allowing undo
        // items -> your items, minus pendingItems
        // pendingItems -> items that have been removed and are undoable
        //   -> each pendingItem also has a cancelRemoval() method attached for
        //      handling the `undo`
        return renderFn({
            onRemove: this.interceptOnRemove,
            items: items.filter(this.pendingItemsPredicate),
            pendingItems: pendingItems.map(([timeoutId, args, item]) => ({
                ...item,
                cancelRemoval: () => {
                    this.cancelRemoval(timeoutId)
                },
            })),
        })
    }
}

export default Undoable
