<template>
  <div class="flex flex-col items-center w-full">
    <!-- 予定の進捗バー -->
    <div class="w-full h-8 bg-gray-200 rounded-full">
      <div :style="{ width: plannedProgress + '%' }" class="h-full bg-blue-500 rounded-full"></div>
    </div>
    <!-- 実績の進捗バー -->
    <div class="w-full h-8 bg-gray-200 rounded-full">
      <div :style="{ width: actualProgress + '%' }" class="h-full bg-green-500 rounded-full"></div>
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
