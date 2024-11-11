<template>
	<section class="layout">
		<div>
			<slot />
		</div>
	</section>
</template>

<script lang="ts" setup>

console.log('Loaded');
</script>

<style lang="scss" scoped>
.layout {
	overflow-y: auto;
	min-height: 100vh;
}
</style>