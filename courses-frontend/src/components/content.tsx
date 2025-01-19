import { CoursePart } from "../types";

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case 'basic':
      return (
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br/>
          <em>{course.description}</em>
        </p>
      )
    case 'group':
      return (
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br/>
          project exercises {course.groupProjectCount}
        </p>
      )
    case 'background':
      return (
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br/>
          <em>{course.description}</em>
          <br/>
          course material
          <a href={course.backgroundMaterial}>
            {course.backgroundMaterial}
          </a>
        </p>
      )
    case 'special':
      return (
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br/>
          <em>{course.description}</em>
          <br/>
          required skills: {course.requirements.join(', ')}
        </p>
      )
    default:
      return null
  };
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map((c) => <Part course={c} />)}
  </>
);

export default Content;