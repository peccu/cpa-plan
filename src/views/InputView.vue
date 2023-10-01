<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useDeploymenturlStore, type Progress } from '@/stores/deploymenturl'

const deploymenturl = useDeploymenturlStore()
deploymenturl.loadUrl()

let lastrow: Ref<Progress> = ref(['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const get = async () => {
    const json = await deploymenturl.getLastRow()
    console.log('get response: ', json)
    lastrow.value = json
    // TODO set it to local refs
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
    const json = await deploymenturl.postProgress(data)
    console.log('post response: ', json)
    return json
}

if (deploymenturl.url != '') {
    get()
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
        <h1>This is an Input page</h1>
        {{ lastrow }}
        <div><button @click="get">GET</button></div>
        <div class="mt-3">
            <div class="mt-3">
                <span class="mr-3 text-xl">対象日</span>
                <input type="text" class="p-1 w-20 text-black" v-model="targetDate" />
            </div>
        </div>
        <div class="mt-3">
            <h2 class="text-2xl">財務会計論</h2>
            <div class="mt-3">
                <span class="mr-3 text-xl">講義</span>
                <input type="number" class="p-1 w-20 text-black" v-model="financialAccountingLecture" />
            </div>
            <div class="mt-3">
                <span class="mr-3 text-xl">答練</span>
                <input type="number" class="p-1 w-20 text-black" v-model="financialAccountingPractice" />
            </div>
            <div class="mt-3">
                <span class="mr-3 text-xl">応用</span>
                <input type="number" class="p-1 w-20 text-black" v-model="financialAccountingAdvanced" />
            </div>
        </div>
        <div class="mt-3">
            <h2 class="text-2xl">管理会計論</h2>
            <div class="mt-3">
                <span class="mr-3 text-xl">講義</span>
                <input type="number" class="p-1 w-20 text-black" v-model="managementAccountingLecture" />
            </div>
            <div class="mt-3">
                <span class="mr-3 text-xl">答練</span>
                <input type="number" class="p-1 w-20 text-black" v-model="managementAccountingPractice" />
            </div>
            <div class="mt-3">
                <span class="mr-3 text-xl">応用</span>
                <input type="number" class="p-1 w-20 text-black" v-model="managementAccountingAdvance" />
            </div>
        </div>
        <div class="mt-3">
            <h2 class="text-2xl">監査論</h2>
            <div class="mt-3">
                <span class="mr-3 text-xl">講義</span>
                <input type="number" class="p-1 w-20 text-black" v-model="auditLecture" />
            </div>
            <div class="mt-3">
                <span class="mr-3 text-xl">答練</span>
                <input type="number" class="p-1 w-20 text-black" v-model="auditPractice" />
            </div>
        </div>
        <div class="mt-3">
            <h2 class="text-2xl">企業法</h2>
            <div class="mt-3">
                <span class="mr-3 text-xl">講義</span>
                <input type="number" class="p-1 w-20 text-black" v-model="companyLecture" />
            </div>
            <div class="mt-3">
                <span class="mr-3 text-xl">答練</span>
                <input type="number" class="p-1 w-20 text-black" v-model="companyPractice" />
            </div>
        </div>
        <div class="mt-3">
            <h2 class="text-2xl">租税法</h2>
            <div class="mt-3">
                <span class="mr-3 text-xl">講義</span>
                <input type="number" class="p-1 w-20 text-black" v-model="taxLecture" />
            </div>
            <div class="mt-3">
                <span class="mr-3 text-xl">答練</span>
                <input type="number" class="p-1 w-20 text-black" v-model="taxPractice" />
            </div>
            <div class="mt-3">
                <span class="mr-3 text-xl">理論対策講義</span>
                <input type="number" class="p-1 w-20 text-black" v-model="taxLogic" />
            </div>
        </div>
        <div class="mt-3">
            <h2 class="text-2xl">経営学</h2>
            <div class="mt-3">
                <span class="mr-3 text-xl">講義</span>
                <input type="number" class="p-1 w-20 text-black" v-model="businessLecture" />
            </div>
            <div class="mt-3">
                <span class="mr-3 text-xl">答練</span>
                <input type="number" class="p-1 w-20 text-black" v-model="businessPractice" />
            </div>
        </div>

        <div><button @click="post" class="py-1 px-3 m-2 rounded ring-2 ring-white">POST</button></div>
    </main>
</template>
