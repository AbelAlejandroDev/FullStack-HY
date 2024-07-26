const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Parts = ({ text, exercises }) => {
  return (
    <p>
      {text} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return (
    <>
    {parts.map(part=>(
      <Parts key={part.id} text={part.name} exercises={part.exercises} />
    ))}
    <Parts text={"total of " + total + "exercises"} />
    </>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header text={name} />
      <Content parts={parts} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </div>
  );
};

export default App;
