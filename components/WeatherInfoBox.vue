!<template>
	<div class="Weather_details">
		<div class="Weather_details-text">
			<NuxtIcon :name="icon" />

			<div class="Weather_details-box">
				<p class="parameter" v-html="text"></p>

				<p class="value">
					{{ value }}
					<span class="units" v-html="metric"></span>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { defineProps } from 'vue';

defineProps<{
	value: number,
	icon: string,
	text: string,
	metric: string
}>();

</script>

<style lang="scss">
.Weather_details {
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 1rem;

	&-text {
		display: flex;
		align-items: center;
		column-gap: .4rem;
		font-size: 1.4rem;

		.nuxt-icon {
			font-size: 3rem;
		}
	}

	&-box {
		display: flex;
		flex-direction: column;
		row-gap: .2rem;

		.value {
			font-size: 1.8rem;
		}

		.units {
			font-size: 1.4rem;
		}
	}
}
</style>