import React from 'react'

const Notification = ({message, state}) => {
    const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const success = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if(message === null) {
        return null
    }
    else {
        return(
            <>
                <div style={(state === 's' ? success : error)}>{message}</div>
            </>
        )
    }
}

export default Notification