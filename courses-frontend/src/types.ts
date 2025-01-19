interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasePlus extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBasePlus {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBasePlus {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBasePlus {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;