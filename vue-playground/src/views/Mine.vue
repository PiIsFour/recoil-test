<script setup lang="ts">
	import { computed, reactive, ref } from 'vue'
	import { add } from 'web-ui.core'

	const state = reactive({
		name: 'Alice'
	})

	const counter = ref(0)

	const inc = () => {
		counter.value = add(counter.value, 1)
	}

	const a = computed(() => `a: ${ counter.value }`)
	const b = computed(() => `b: ${ counter.value }`)
	const b2 = computed(() => `b2: ${ b.value }`)
	const c = computed(() => {
		const c = `c: ${ a.value } - ${ b2.value }`
		console.log(c)
		return c
	})
</script>

<template>
	<h1>Hello {{ state.name }}</h1>
	<button @click="inc">Counter: {{ counter }}</button>
	<div>{{ a }}</div>
	<div>{{ b }}</div>
	<div>{{ b2 }}</div>
	<div>{{ c }}</div>
</template>