<script setup="setup" lang="ts">
import { ref } from 'vue'
import { useDeploymenturlStore } from '@/stores/deploymenturl'

const deploymenturl = useDeploymenturlStore()
deploymenturl.loadUrl()
const url = ref('')
const saveUrl = () => {
  console.log('input url', url.value)
  deploymenturl.setUrl(url.value)
}
</script>

<template>
  <div class="settings">
    <div class="overflow-scroll">loaded URL: {{ deploymenturl.url }}</div>
    <input v-model="url" name="deploymentURL" type="url" class="text-black" />
    <div>inputted URL: {{ url }}</div>
    <div class="mt-14 w-full">
      <button class="inline-block py-1 px-3 m-2 w-full rounded ring-2 ring-white" @click="saveUrl">
        Save
      </button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
