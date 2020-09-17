import React from 'react'
import Part from './Part'

const Content = ({course}) => course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} id={part.id}/>)

export default Content