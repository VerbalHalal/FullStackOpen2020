import React from 'react'

const DeleteButton = ({person, handleDeleteButton}) => {
    return(
        <>
        <button onClick={() => handleDeleteButton(person)}>delete</button>
        </>
    )
}

export default DeleteButton