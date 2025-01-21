<template>
	<ul class="cities_list">
		<li
			v-for="(city, index) in citiesList"
			:key="index"
			class="cities_list-item"
		>
			<span class="city">{{ `${city.name}, ${city.sys.country}` }}</span>
			<span class="temp">{{ `${Math.round(city.main.temp)}°C` }}</span>
			<span class="coords">{{ `${city.coord.lat}, ${city.coord.lon}` }}</span>
		</li>
	</ul>
</template>

<script setup lang="ts">
import type { ICityData } from '~/models/city';
import { defineProps } from 'vue';
import { convertInteger } from '~/components/mathOps';

defineProps<{
	citiesList: ICityData[]
}>();
</script>

<style lang="scss">
.cities_list {
	display: flex;
	flex-direction: column;
	background-color: $white;
	border-radius: 1rem;
	overflow: hidden;

	&-item {
		display: grid;
		grid-template-columns: 2fr 1fr 2fr;
		gap: 1rem;
		padding: 1rem;
		font-size: 1.2rem;
		white-space: nowrap;
		color: $text-color;
		transition: background-color .3s ease;
		cursor: pointer;

		&:hover,
		&:focus {
			background-color: $gray-100;
		}

		.city {
			justify-self: flex-start;
		}

		.temp {
			justify-self: center;
		}

		.coords {
			justify-self: flex-end;
			font-size: 1rem;
			color: $gray-200;
		}
	}
}
</style>