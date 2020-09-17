import React from 'react'

const Part = ({name,exercises,id}) => <p key={id}>{name} {exercises}</p>

export default Part