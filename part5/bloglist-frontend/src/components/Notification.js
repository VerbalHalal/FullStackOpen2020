import React from 'react'

const Notification = ({ message, messageState }) => {
  const errorStyle = {
    color: 'red',
    border: '1px solid black',
    display: 'inline-block',
    padding: '10px',
    borderRadius: '3px',
    fontSize: '20px'
  }
  const successStyle = {
    color: 'green',
    border: '1px solid black',
    display: 'inline-block',
    padding: '10px',
    borderRadius: '3px',
    fontSize: '20px'
  }

  return(
    <div>
      {

        message
          ?

          <p style={(messageState === 'e' ? errorStyle : successStyle)}>
            {message}
          </p>

          :
          <></>

      }
    </div>
  )
}

export default Notification