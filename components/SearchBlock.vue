<template>
	<div class="weather_search-box">
		<NuxtIcon name="location" class="loc-icon icon" />

		<div class="search_input-wrapper">
			<input
				type="text"
				placeholder="Enter your location"
				class="search_input"
				v-model="cityRef"
				@keydown.enter="pressEnter"
			>

			<CitiesDropdownList :cities-list="cities.value" @clickCity="clickCity" />
		</div>
		
		<SearchBtn @click="pressEnter" />
	</div>
</template>

<script setup lang="ts">
import SearchBtn from '~/components/SearchBtn.vue';
import CitiesDropdownList from '~/components/CitiesDropdownList.vue';
import { getCities } from '~/components/getCities';
import type { ICityData } from '~/models/city';
import { defineEmits } from 'vue';

const emit = defineEmits(['enterCity', 'clickCity'])
const cityRef = ref('');
let cities = reactive({
	value: [] as ICityData[],
	setItems(data: ICityData[]) {
		this.value = data;
	}
});
const empty = ref(false);

function pressEnter() {
	emit('enterCity');

	getCities(cityRef.value).then(data => {
		cities.setItems(data?.citiesData.list as ICityData[] ?? []);
		empty.value = data?.citiesData.count === 0;
	});
}

function clickCity(cityData: ICityData) {
	emit('clickCity', cityData);
	cities.setItems([]);
}
</script>

<style lang="scss">
.weather_search-box {
	display: flex;

	.search_input-wrapper {
		position: relative;
		width: 80%;
		margin-left: .4rem;
	}

	.search_input {
		display: flex;
		align-items: center;
		width: 100%;
		height: 4rem;
		border-radius: 1rem;
		padding: 0 1rem;
		border: 0;
		background-color: $white;
		font-size: 1.6rem;
		line-height: 1;
		color: $text-color;

		&::placeholder {
			font-size: 1.4rem;
			color: $gray-400;
		}
	}

	.loc-icon {
		display: flex;
		align-items: center;
		height: 4rem;
		font-size: 1.8rem;
	}
}
</style>