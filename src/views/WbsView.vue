<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import ProgressBar from '@/components/ProgressBar.vue'
import { format } from '@/stores/dateutil'

let inLoading: Ref<boolean> = ref(true)
const schedule = useScheduleStore()
schedule.loadSchedule()

const fetch = async () => {
  inLoading.value = true
  await schedule.fetchSchedule()
  // speedPlan.value = plan.speedPlan
  // standardPlan.value = plan.standardPlan
  inLoading.value = false
  return schedule.schedule
}

fetch()
</script>

<template>
  <main class="wbs">
    <h1 class="text-3xl font-bold">This is an WBS page</h1>
    <button :disabled="inLoading" class="py-1 px-3 m-2 rounded ring-2 ring-white" @click="fetch">
      Fetch Schedule
    </button>
    <span v-if="inLoading">Loading...</span>
    <h2 class="text-2xl">Standard Plan</h2>
    <template v-for="(plan, i) in schedule.plan.standardPlan" :key="i">
      <h3>{{ plan.lesson }} : {{ plan.type }}</h3>
      <div class="flex justify-between w-full">
        <span>{{ format(plan.startDate) }}</span>
        <span>{{ format(plan.endDate) }}</span>
      </div>
      <div class="flex justify-between w-full">
        <span></span>
        <span> 想定コマ数 {{ plan.planedProgress }} / 合計コマ数 {{ plan.totalLectures }} </span>
      </div>
      <progress-bar
        :planned-progress="Math.round((100 * plan.planedProgress) / plan.totalLectures)"
        :actual-progress="Math.round((100 * 20) / plan.totalLectures)"
      ></progress-bar>
    </template>
    <pre>{{ JSON.stringify(schedule.plan.standardPlan, null, 2) }}</pre>
    <h2 class="text-2xl">Speed Plan</h2>
    <pre>{{ JSON.stringify(schedule.plan.speedPlan, null, 2) }}</pre>
  </main>
</template>
