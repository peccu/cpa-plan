export type ScheduleInput = [
  string,
  string,
  string,
  number,
  number,
  number,
  string,
  string
]
type LectureCount = number
export type Schedule = {
  course: '速習' | 'スタンダード',
  lesson: string,
  type: string,
  totalLectures: LectureCount,
  associateLectures: LectureCount,
  regularLectures: LectureCount,
  startDate: Date,
  endDate: Date,
  planedProgress?: LectureCount
}

type Millisec = number
type Day = number
const oneday: Millisec = 1000 * 60 * 60 * 24
const calcCurrentPlanedPosition = (line: Schedule): LectureCount => {
  // TODO calculate current pland position
  const days: Day = (line.endDate - line.startDate) / oneday
  const proceed: Day = Math.round(((new Date()) - line.startDate) / oneday)
  const daysToToday: Day = Math.max(proceed, 0)
  return Math.round(line.totalLectures * daysToToday / days)
}

export const prepareWbs = (schedule: Schedule[]): { speedPlan: Schedule[], standardPlan: Schedule[] } => {
  const speedPlan = []
  const standardPlan = []
  schedule.map((line: Schedule) => {
    line.planedProgress = calcCurrentPlanedPosition(line)
    console.log(line)
    if (line.course === '速習') {
      speedPlan.push(line)
    }
    if (line.course === 'スタンダード') {
      standardPlan.push(line)
    }
  })
  return {
    speedPlan,
    standardPlan
  }
}

