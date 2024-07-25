const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.parts.parts[0].name} exercises={props.parts.parts[0].exercises} />
      <Part name={props.parts.parts[1].name} exercises={props.parts.parts[1].exercises} />
      <Part  name={props.parts.parts[2].name} exercises={props.parts.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises {""}
        {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  course.parts[0]

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

export default App;
