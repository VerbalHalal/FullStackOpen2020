import React from 'react'

const Total = ({course}) => <h4>total of {course.parts.reduce((acc,cur) => acc+cur.exercises,0)} exercises</h4>

export default Total