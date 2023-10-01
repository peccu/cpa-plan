<script setup="setup" lang="ts">
import { ref } from 'vue'
import { useDeploymenturlStore, type Progress } from '@/stores/deploymenturl'

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
        <h1>This is an Settings page</h1>
        <div>URL: {{ url }}</div>
        <div>loaded URL: {{ deploymenturl.url }}</div>
        <input name="deploymentURL" type="url" v-model="url" />
        <div><button @click="saveUrl">Save</button></div>
        <h1 class="pt-0 mx-16 text-3xl font-bold underline">
            Hello world!
        </h1>
    </div>
</template>

<style>
@media(min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
