import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { type ScheduleInput } from '@/stores/schedule'

export const useDeploymenturlStore = defineStore('deploymenturl', () => {
  const url: Ref<string> = ref('')
  const setUrl = (newurl: string) => {
    url.value = newurl
    localStorage.setItem('deploymenturl', newurl)
    return newurl
  }
  const loadUrl = () => {
    const loaded = localStorage.getItem('deploymenturl')
    if (!loaded) {
      return
    }
    url.value = loaded
    return loaded
  }
  const fetchSchedule = async () => {
    const response = await fetch(`${url.value}?q=schedule`)
    const json: ScheduleInput[] = await response.json()
    return json
  }

  return { url, setUrl, loadUrl, fetchSchedule }
})
