<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useProgressStore } from '@/stores/progress'
import { format } from '@/stores/dateutil'

let inLoading: Ref<boolean> = ref(false)
const progress = useProgressStore()
progress.loadProgress()

const fetch = async () => {
    inLoading.value = true
    await progress.fetchProgress()
    inLoading.value = false
    return progress.progress
}

const post = async () => {
    const json = await progress.postNewLine(progress.progress)
    console.log('post response: ', json)
    return json
}

fetch()

</script>

<template>
  <main>
    <div>
      <button :disabled="inLoading" class="py-1 px-3 m-2 rounded ring-2 ring-white" @click="fetch">
        Fetch current
      </button>
      <span v-if="inLoading">Loading...</span>
    </div>
    <div class="mt-3">
      <div class="mt-3">
        <span class="mr-3 text-xl">対象日</span>
        <input
          :value="format(progress.progress.targetDate)"
          :disabled="inLoading"
          type="date" class="p-1 text-black w-30" @input="progress.progress.targetDate = $event.target.value" />
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
          v-model="progress.progress.financialAccountingLecture"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
        <input
          v-model="progress.progress.financialAccountingPractice"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
        <input
          v-model="progress.progress.financialAccountingAdvanced"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
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
          v-model="progress.progress.managementAccountingLecture"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
        <input
          v-model="progress.progress.managementAccountingPractice"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
        <input
          v-model="progress.progress.managementAccountingAdvance"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
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
          v-model="progress.progress.auditLecture"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
        <input
          v-model="progress.progress.auditPractice"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
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
          v-model="progress.progress.companyLecture"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
        <input
          v-model="progress.progress.companyPractice"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
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
          v-model="progress.progress.taxLecture"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
        <input
          v-model="progress.progress.taxPractice"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
        <input
          v-model="progress.progress.taxLogic"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
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
          v-model="progress.progress.businessLecture"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
        <input
          v-model="progress.progress.businessPractice"
          :disabled="inLoading"
          inputmode="numeric"
          pattern="[0-9]*"
          type="text"
          class="p-1 mr-3 w-20 text-black"
        />
      </div>
    </div>

    <div class="mt-14 w-full">
      <button class="inline-block py-1 px-3 m-2 w-full rounded ring-2 ring-white" @click="post">
        Submit
      </button>
    </div>
  </main>
</template>
