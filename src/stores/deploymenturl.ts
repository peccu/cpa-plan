import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

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

  return { url, setUrl, loadUrl }
})
