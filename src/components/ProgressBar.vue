<template>
  <div class="flex flex-col items-center">
    <!-- 予定の進捗バー -->
    <div class="w-8 h-3/4 bg-gray-200 rounded-full mb-4 relative">
      <div
        :style="{ height: plannedProgress + '%' }"
        class="absolute bottom-0 left-0 right-0 rounded-full bg-blue-500"
      ></div>
    </div>
    <!-- 実績の進捗バー -->
    <div class="w-8 h-3/4 bg-gray-200 rounded-full relative">
      <div
        :style="{ height: actualProgress + '%' }"
        class="absolute bottom-0 left-0 right-0 rounded-full bg-green-500"
      ></div>
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
