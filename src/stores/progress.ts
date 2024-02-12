import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useDeploymenturlStore } from '@/stores/deploymenturl'
import { format } from '@/stores/dateutil'

export type ProgressInput = [
  string,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export type Progress = {
  targetDate: Date
  // 財務会計論
  financialAccountingLecture: number
  financialAccountingPractice: number
  financialAccountingAdvanced: number
  // 管理会計論
  managementAccountingLecture: number
  managementAccountingPractice: number
  managementAccountingAdvance: number
  // 監査論
  auditLecture: number
  auditPractice: number
  // 企業法
  companyLecture: number
  companyPractice: number
  // 租税法
  taxLecture: number
  taxPractice: number
  taxLogic: number
  // 経営学
  businessLecture: number
  businessPractice: number
}

const nullProgress: Progress = {
  targetDate: new Date(),
  financialAccountingLecture: 0,
  financialAccountingPractice: 0,
  financialAccountingAdvanced: 0,
  managementAccountingLecture: 0,
  managementAccountingPractice: 0,
  managementAccountingAdvance: 0,
  auditLecture: 0,
  auditPractice: 0,
  companyLecture: 0,
  companyPractice: 0,
  taxLecture: 0,
  taxPractice: 0,
  taxLogic: 0,
  businessLecture: 0,
  businessPractice: 0
}

const serialize = (p: Progress) =>
  JSON.stringify({
    targetDate: format(p.targetDate),
    financialAccountingLecture: p.financialAccountingLecture,
    financialAccountingPractice: p.financialAccountingPractice,
    financialAccountingAdvanced: p.financialAccountingAdvanced,
    managementAccountingLecture: p.managementAccountingLecture,
    managementAccountingPractice: p.managementAccountingPractice,
    managementAccountingAdvance: p.managementAccountingAdvance,
    auditLecture: p.auditLecture,
    auditPractice: p.auditPractice,
    companyLecture: p.companyLecture,
    companyPractice: p.companyPractice,
    taxLecture: p.taxLecture,
    taxPractice: p.taxPractice,
    taxLogic: p.taxLogic,
    businessLecture: p.businessLecture,
    businessPractice: p.businessPractice
  })

const deserialize = (text: string) => {
  const p = JSON.parse(text)
  console.log(p)
  return {
    targetDate: new Date(p.targetDate),
    financialAccountingLecture: p.financialAccountingLecture,
    financialAccountingPractice: p.financialAccountingPractice,
    financialAccountingAdvanced: p.financialAccountingAdvanced,
    managementAccountingLecture: p.managementAccountingLecture,
    managementAccountingPractice: p.managementAccountingPractice,
    managementAccountingAdvance: p.managementAccountingAdvance,
    auditLecture: p.auditLecture,
    auditPractice: p.auditPractice,
    companyLecture: p.companyLecture,
    companyPractice: p.companyPractice,
    taxLecture: p.taxLecture,
    taxPractice: p.taxPractice,
    taxLogic: p.taxLogic,
    businessLecture: p.businessLecture,
    businessPractice: p.businessPractice
  } as Progress
}

export const useProgressStore = defineStore('progress', () => {
  const progress: Ref<Progress> = ref(nullProgress)
  const deploymenturl = useDeploymenturlStore()
  deploymenturl.loadUrl()

  const fetchLastRow = async () => {
    const response = await fetch(deploymenturl.url)
    const json = await response.json()
    return json
  }

  const postNewLine = async (p: Progress) => {
    setProgress(p)
    const targetDate = format(p.targetDate)
    const data: ProgressInput = [
      targetDate,
      p.financialAccountingLecture,
      p.financialAccountingPractice,
      p.financialAccountingAdvanced,
      p.managementAccountingLecture,
      p.managementAccountingPractice,
      p.managementAccountingAdvance,
      p.auditLecture,
      p.auditPractice,
      p.companyLecture,
      p.companyPractice,
      p.taxLecture,
      p.taxPractice,
      p.taxLogic,
      p.businessLecture,
      p.businessPractice
    ]
    console.log('sending', data)

    progress.value = p
    const response = await fetch(deploymenturl.url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      // headers: {
      //   "Content-Type": "application/json",
      //   // 'Content-Type': 'application/x-www-form-urlencoded',
      // },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    const json = response.json()
    return json
  }

  const setProgress = (newprogress: Progress) => {
    progress.value = newprogress
    localStorage.setItem('progress', serialize(newprogress))
  }
  const loadProgress = () => {
    const data = localStorage.getItem('progress')
    console.log('ls', data)
    if (!data) {
      return null
    }
    progress.value = deserialize(data)
    console.log('deserialized', progress.value)
    return progress.value
  }
  const fetchProgress = async () => {
    console.log('fetch')
    const json = await fetchLastRow()
    console.log('json', json)
    console.log('fetch response: ', json)
    progress.value = {
      targetDate: new Date(json[1]),
      financialAccountingLecture: json[2],
      financialAccountingPractice: json[3],
      financialAccountingAdvanced: json[4],
      managementAccountingLecture: json[5],
      managementAccountingPractice: json[6],
      managementAccountingAdvance: json[7],
      auditLecture: json[8],
      auditPractice: json[9],
      companyLecture: json[10],
      companyPractice: json[11],
      taxLecture: json[12],
      taxPractice: json[13],
      taxLogic: json[14],
      businessLecture: json[15],
      businessPractice: json[16]
    } as Progress
    console.log(progress.value)
    setProgress(progress.value)
    return progress.value
  }

  return { loadProgress, progress, fetchProgress, postNewLine }
})
