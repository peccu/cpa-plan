<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useDeploymenturlStore } from '@/stores/deploymenturl'
import { type CourseType, type ScheduleInput, type Schedule, prepareWbs } from '@/stores/schedule'
import ProgressBar from '@/components/ProgressBar.vue'

const deploymenturl = useDeploymenturlStore()
deploymenturl.loadUrl()

let inLoading: Ref<boolean> = ref(true)
let speedPlan: Ref<Schedule[]> = ref([])
let standardPlan: Ref<Schedule[]> = ref([])

const fetchSchedule = async () => {
  inLoading.value = true
  const json = await deploymenturl.fetchSchedule()
  console.log('fetch response: ', json)
  json.shift()
  const schedule = json.map((line: ScheduleInput) => {
    const sche: Schedule = {
      course: line[0] as CourseType,
      lesson: line[1],
      type: line[2],
      totalLectures: line[3],
      associateLectures: line[4],
      regularLectures: line[5],
      startDate: new Date(line[6]),
      endDate: new Date(line[7])
    }
    return sche
  })
  inLoading.value = false
  const plan = prepareWbs(schedule)
  speedPlan.value = plan.speedPlan
  standardPlan.value = plan.standardPlan
}

if (deploymenturl.url != '') {
  fetchSchedule()
}
</script>

<template>
  <main class="wbs">
    <h1 class="text-3xl font-bold">This is an WBS page</h1>
    <button
      @click="fetchSchedule"
      :disabled="inLoading"
      class="py-1 px-3 m-2 rounded ring-2 ring-white"
    >
      Fetch Schedule
    </button>
    <span v-if="inLoading">Loading...</span>
    <h2 class="text-2xl">Standard Plan</h2>
    <template v-for="plan in standardPlan">
      <h3>{{ plan.lesson }}</h3>
      {{ plan.planedProgress }}
      <progress-bar :plannedProgress="plan.planedProgress" :actualProgress="20"></progress-bar>
    </template>
    <pre>{{ JSON.stringify(standardPlan, null, 2) }}</pre>
    <h2 class="text-2xl">Speed Plan</h2>
    <pre>{{ JSON.stringify(speedPlan, null, 2) }}</pre>
  </main>
</template>
