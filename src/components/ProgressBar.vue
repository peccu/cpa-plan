<template>
  <div class="w-full flex flex-col items-center">
    <!-- 予定の進捗バー -->
    <div class="w-full h-8 bg-gray-200 rounded-full">
      <div :style="{ width: plannedProgress + '%' }" class="h-full rounded-full bg-blue-500"></div>
    </div>
    <!-- 実績の進捗バー -->
    <div class="w-full h-8 bg-gray-200 rounded-full">
      <div :style="{ width: actualProgress + '%' }" class="h-full rounded-full bg-green-500"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  plannedProgress: {
    type: Number,
    default: 0
  },
  actualProgress: {
    type: Number,
    default: 0
  }
})
</script>
