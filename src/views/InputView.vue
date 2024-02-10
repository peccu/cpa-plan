<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useDeploymenturlStore, type Progress } from '@/stores/deploymenturl'

const deploymenturl = useDeploymenturlStore()
deploymenturl.loadUrl()

let inLoading: Ref<boolean> = ref(true)
let lastrow: Ref<Progress> = ref(['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const fetchSchedule = async () => {
  inLoading.value = true
  const json = await deploymenturl.fetchSchedule()
  console.log('fetch response: ', json)
  const cols = json.shift()
  console.log('cols, rest', [cols, json])
  json.map((line: any) => {
    cols.map((col: string, i: any) => {
      console.log(`${col}: ${line[i]}`)
    })
  })
  inLoading.value = false
  return json
}
const fetch = async () => {
  inLoading.value = true
  const json = await deploymenturl.fetchLastRow()
  console.log('fetch response: ', json)
  lastrow.value = json
  targetDate.value = json[1]
  financialAccountingLecture.value = json[2]
  financialAccountingPractice.value = json[3]
  financialAccountingAdvanced.value = json[4]
  managementAccountingLecture.value = json[5]
  managementAccountingPractice.value = json[6]
  managementAccountingAdvance.value = json[7]
  auditLecture.value = json[8]
  auditPractice.value = json[9]
  companyLecture.value = json[10]
  companyPractice.value = json[11]
  taxLecture.value = json[12]
  taxPractice.value = json[13]
  taxLogic.value = json[14]
  businessLecture.value = json[15]
  businessPractice.value = json[16]
  inLoading.value = false
  await fetchSchedule()
  return json
}
const post = async () => {
  const data: Progress = [
    targetDate.value,
    financialAccountingLecture.value,
    financialAccountingPractice.value,
    financialAccountingAdvanced.value,
    managementAccountingLecture.value,
    managementAccountingPractice.value,
    managementAccountingAdvance.value,
    auditLecture.value,
    auditPractice.value,
    companyLecture.value,
    companyPractice.value,
    taxLecture.value,
    taxPractice.value,
    taxLogic.value,
    businessLecture.value,
    businessPractice.value
  ]
  console.log('sending', data)
  const json = await deploymenturl.postNewLine(data)
  console.log('post response: ', json)
  return json
}

if (deploymenturl.url != '') {
  fetch()
}

const t = new Date()
const targetDate: Ref<string> = ref(`${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()}`)

// 財務会計論
const financialAccountingLecture: Ref<number> = ref(0)
const financialAccountingPractice: Ref<number> = ref(0)
const financialAccountingAdvanced: Ref<number> = ref(0)
// 管理会計論
const managementAccountingLecture: Ref<number> = ref(0)
const managementAccountingPractice: Ref<number> = ref(0)
const managementAccountingAdvance: Ref<number> = ref(0)
// 監査論
const auditLecture: Ref<number> = ref(0)
const auditPractice: Ref<number> = ref(0)
// 企業法
const companyLecture: Ref<number> = ref(0)
const companyPractice: Ref<number> = ref(0)
// 租税法
const taxLecture: Ref<number> = ref(0)
const taxPractice: Ref<number> = ref(0)
const taxLogic: Ref<number> = ref(0)
// 経営学
const businessLecture: Ref<number> = ref(0)
const businessPractice: Ref<number> = ref(0)
</script>

<template>
  <main>
    <div>
      <button @click="fetch" :disabled="inLoading" class="py-1 px-3 m-2 rounded ring-2 ring-white">
        Fetch current
      </button>
      <span v-if="inLoading">Loading...</span>
    </div>
    <div class="mt-3">
      <div class="mt-3">
        <span class="mr-3 text-xl">対象日</span>
        <input :disabled="inLoading" type="date" class="p-1 text-black w-30" v-model="targetDate" />
      </div>
    </div>
    <div class="mt-3">
      <div class="w-full border-b border-gray-200 text-slate-100">
        <h2 class="text-2xl">財務会計論</h2>
      </div>
      <div class="mt-3">
        <span class="inline-block mr-3 w-20 text-xl">講義</span>
        <span class="inline-block mr-3 w-20 text-xl">答練</span>
        <span class="inline-block mr-3 w-20 text-xl">応用</span>
      </div>
      <div class="mt-3">
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="financialAccountingLecture"
        />
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="financialAccountingPractice"
        />
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="financialAccountingAdvanced"
        />
      </div>
    </div>
    <div class="mt-3">
      <div class="w-full border-b border-gray-200 text-slate-100">
        <h2 class="text-2xl">管理会計論</h2>
      </div>
      <div class="mt-3">
        <span class="inline-block mr-3 w-20 text-xl">講義</span>
        <span class="inline-block mr-3 w-20 text-xl">答練</span>
        <span class="inline-block mr-3 w-20 text-xl">応用</span>
      </div>
      <div class="mt-3">
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="managementAccountingLecture"
        />
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="managementAccountingPractice"
        />
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="managementAccountingAdvance"
        />
      </div>
    </div>
    <div class="mt-3">
      <div class="w-full border-b border-gray-200 text-slate-100">
        <h2 class="text-2xl">監査論</h2>
      </div>
      <div class="mt-3">
        <span class="inline-block mr-3 w-20 text-xl">講義</span>
        <span class="inline-block mr-3 w-20 text-xl">答練</span>
      </div>
      <div class="mt-3">
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="auditLecture"
        />
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="auditPractice"
        />
      </div>
    </div>
    <div class="mt-3">
      <div class="w-full border-b border-gray-200 text-slate-100">
        <h2 class="text-2xl">企業法</h2>
      </div>
      <div class="mt-3">
        <span class="inline-block mr-3 w-20 text-xl">講義</span>
        <span class="inline-block mr-3 w-20 text-xl">答練</span>
      </div>
      <div class="mt-3">
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="companyLecture"
        />
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="companyPractice"
        />
      </div>
    </div>
    <div class="mt-3">
      <div class="w-full border-b border-gray-200 text-slate-100">
        <h2 class="text-2xl">租税法</h2>
      </div>
      <div class="mt-3">
        <span class="inline-block mr-3 w-20 text-xl">講義</span>
        <span class="inline-block mr-3 w-20 text-xl">答練</span>
        <span class="inline-block mr-3 w-20 text-xl align-middle">理論対策講義</span>
      </div>
      <div class="mt-3">
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="taxLecture"
        />
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="taxPractice"
        />
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="taxLogic"
        />
      </div>
    </div>
    <div class="mt-3">
      <div class="w-full border-b border-gray-200 text-slate-100">
        <h2 class="text-2xl">経営学</h2>
      </div>
      <div class="mt-3">
        <span class="inline-block mr-3 w-20 text-xl">講義</span>
        <span class="inline-block mr-3 w-20 text-xl">答練</span>
      </div>
      <div class="mt-3">
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="businessLecture"
        />
        <input
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
          v-model="businessPractice"
        />
      </div>
    </div>

    <div class="mt-14 w-full">
      <button @click="post" class="inline-block py-1 px-3 m-2 w-full rounded ring-2 ring-white">
        Submit
      </button>
    </div>
  </main>
</template>
