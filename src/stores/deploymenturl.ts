import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export type Progress = [string, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]

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
  const fetchLastRow = async () => {
    const response = await fetch(url.value)
    const json = await response.json()
    return json
  }
  const postNewLine = async (data: Progress) => {
    const response = await fetch(url.value, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      // headers: {
      //   "Content-Type": "application/json",
      //   // 'Content-Type': 'application/x-www-form-urlencoded',
      // },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    const json = response.json()
    return json
  }

  return { url, setUrl, loadUrl, fetchLastRow, postNewLine }
})
