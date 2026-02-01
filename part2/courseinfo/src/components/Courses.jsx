const Courses = ({ courses }) => {
  return (

    <div>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )
      })}
      
    </div>
  )
}

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, part) => part.exercises + accumulator, 0)
  return (
    <p><strong> Number of exercises {total}</strong></p>
  )
}

export default Courses