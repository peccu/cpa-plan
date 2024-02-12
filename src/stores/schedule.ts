import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useDeploymenturlStore } from '@/stores/deploymenturl'
import { format } from '@/stores/dateutil'

export type ScheduleInput = [string, string, string, number, number, number, string, string]
type LectureCount = number
export type CourseType = '速習' | 'スタンダード'
export type Schedule = {
  course: CourseType
  lesson: string
  type: string
  totalLectures: LectureCount
  associateLectures: LectureCount
  regularLectures: LectureCount
  startDate: Date
  endDate: Date
  planedProgress: LectureCount
}

export type Plan = {
  speedPlan: Schedule[]
  standardPlan: Schedule[]
}

const nullplan: Plan = {
  speedPlan: [],
  standardPlan: []
}

const serialize = (ss: Schedule[]) =>
  JSON.stringify(
    ss.map((s: Schedule) => {
      return {
        course: s.course,
        lesson: s.lesson,
        type: s.type,
        totalLectures: s.totalLectures,
        associateLectures: s.associateLectures,
        regularLectures: s.regularLectures,
        startDate: format(s.startDate),
        endDate: format(s.endDate),
        planedProgress: s.planedProgress
      }
    })
  )

const deserialize = (text: string) => {
  const ss = JSON.parse(text)
  console.log(ss)
  return ss.map((s: Schedule) => {
    return {
      course: s.course,
      lesson: s.lesson,
      type: s.type,
      totalLectures: s.totalLectures,
      associateLectures: s.associateLectures,
      regularLectures: s.regularLectures,
      startDate: new Date(s.startDate),
      endDate: new Date(s.endDate),
      planedProgress: s.planedProgress
    } as Schedule
  })
}

type Millisec = number
type Day = number
const oneday: Millisec = 1000 * 60 * 60 * 24
const calcCurrentPlanedPosition = (line: Schedule): LectureCount => {
  const days: Day = (line.endDate.getTime() - line.startDate.getTime()) / oneday
  const proceed: Day = Math.round((new Date().getTime() - line.startDate.getTime()) / oneday)
  const daysToToday: Day = Math.max(proceed, 0)
  return Math.round((line.totalLectures * daysToToday) / days)
}

export const prepareWbs = (schedule: Schedule[]): Plan => {
  const speedPlan: Schedule[] = []
  const standardPlan: Schedule[] = []
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

export const useScheduleStore = defineStore('schedule', () => {
  const schedule: Ref<Schedule[]> = ref([])
  const plan: Ref<Plan> = ref(nullplan)
  const deploymenturl = useDeploymenturlStore()
  deploymenturl.loadUrl()

  const setSchedule = (newschedule: Schedule[]) => {
    schedule.value = newschedule
    localStorage.setItem('schedule', serialize(newschedule))
  }
  const loadSchedule = () => {
    const data = localStorage.getItem('schedule')
    console.log('ls', data)
    if (!data) {
      return null
    }
    schedule.value = deserialize(data)
    console.log('deserialized', schedule.value)
    return schedule.value
  }

  const fetchSchedule = async () => {
    const response = await fetch(`${deploymenturl.url}?q=schedule`)
    const json: ScheduleInput[] = await response.json()
    console.log('fetch response: ', json)
    // ignore header row
    json.shift()
    const result = json.map((line: ScheduleInput) => {
      const sche: Schedule = {
        course: line[0] as CourseType,
        lesson: line[1],
        type: line[2],
        totalLectures: line[3],
        associateLectures: line[4],
        regularLectures: line[5],
        planedProgress: 0,
        startDate: new Date(line[6]),
        endDate: new Date(line[7])
      }
      return sche
    })
    setSchedule(result)

    const plan = prepareWbs(schedule.value)
    return plan
  }

  return { loadSchedule, plan, schedule, fetchSchedule }
})
