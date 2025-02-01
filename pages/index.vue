<template>
	<div class="HomePage page">
		<div class="weather">
			<SearchBlock @click-city="clickCity" @enter-city="serverError = false" />
 
			<Transition @enter="enter" @leave="leave">
				<div
					v-if="Object.keys(weatherData).length"
					class="result-wrapper"
					:style="{
						'--animationTime': `${animationTime}s`,
						'--delay': `${weatherData ? 0 : animationTime}s`
					}"
				>
					<div
						:key="`${weatherData.dt}`"
						class="weather_result-box"
					>
						<NuxtImg
							v-if="weatherData.weather?.length"
							:src="`/images/${weatherData.weather[0]?.main.toLowerCase()}.png`"
							alt="Weather image"
							class="weather-image"
						/>
						
						<div class="weather_result-box_text">
							<p class="value">
								{{ weatherData.temp }}
								<sup class="celsius">°C</sup>
							</p>

							<p v-if="weatherData.weather?.length" class="weather-desc">
								{{ weatherData.weather[0].description }}
							</p>
						</div>
					</div>

					<div
						class="weather_details"
						:key="`${weatherData.dt}_${weatherData.clouds}`"
					>
						<WeatherInfoBox
							:value="weatherData.humidity"
							:icon="humidityDetailsBox.icon"
							:text="humidityDetailsBox.text"
							:metric="humidityDetailsBox.metric"
							class="details_box"
						/>

						<WeatherInfoBox
							:value="weatherData.wind_speed"
							:icon="windDetailsBox.icon"
							:text="windDetailsBox.text"
							:metric="windDetailsBox.metric"
							class="details_box"
						/>
					</div>
				</div>

				<!-- <div v-if="serverError" class="not-found">
					<NuxtImg src="/images/404.png" alt="Not found image" />

					<p>Oops! Invalid location</p>
				</div> -->
			</Transition>

		</div>
	</div>
</template>

<script setup lang="ts">
import WeatherInfoBox from '~/components/WeatherInfoBox.vue';
import SearchBlock from '~/components/SearchBlock.vue';
import { getWeather } from '~/components/getWeather';
import type { ICityData } from '~/models/city';
import type { weatherDataInterface } from '~/models/weather';

useHead({
	title: 'Wheather App',
})

const serverError = ref(false);

const animationTime = 0.6;

const weatherData = reactive({} as weatherDataInterface);

const windDetailsBox = {
	text: 'Wind speed',
	icon: 'wind',
	metric: 'km/h',
}

const humidityDetailsBox = {
	text: 'Humidity',
	icon: 'humidity',
	metric: 'km/h',
}

// ---- Other methods ----

function clickCity(cityData: ICityData) {
	getWeather(cityData).then(data => {
		Object.assign(weatherData, data?.weatherData);
	})
}


// ----- Animation block ----

function enter(el: HTMLBodyElement) {
	console.log('🎈 enter => ', el);

	setTimeout(() => {
		Object.assign(el.style, {
			height: el.scrollHeight + 'px',
		});
	}, animationTime * 1000);
}

function leave(el: HTMLBodyElement) {
	console.log('🎈 leave => ', el);
	Object.assign(el.style, {
		height: 0 + 'px',
	});
}

</script>

<style lang="scss">
.HomePage {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.6rem;

	.weather {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		width: 42rem;
		padding: 2rem;
		border-radius: 2rem;
		background-color: $blue;
		font-family: $second-font;
		color: $white;

		.not-found {
			display: flex;
			flex-direction: column;
			row-gap: 2rem;
			padding-top: 2rem;

			img {
				width: 100%;
				height: auto;
				padding: 0 4rem;
			}
		}

		&_result-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			.weather_result-box {
				display: flex;
				flex-direction: column;
				row-gap: 1rem;
			}

			.weather-image {
				width: 100%;
				margin-bottom: 4rem;
				padding: 0 6rem;
			}

			&_text {
				display: flex;
				flex-direction: column;
				align-items: center;
				row-gap: 1rem;
			}

			.value {
				position: relative;
				display: flex;
				font-size: 4rem;

				.celsius {
					position: absolute;
					top: -.3em;
					right: -1em;
					font-size: .4em;
				}
			}

			.weather-desc {
				font-size: 2rem;
				text-transform: capitalize;
				letter-spacing: .02em;
			}
		}

		&-image,
		&_result-box_text,
		.humidity,
		.details_box {
			opacity: 0;
			scale: .8;
			animation: show .5s ease var(--delay) forwards;

			@keyframes show {
				0% {
					opacity: 0;
					scale: .7;
				}

				100% {
					opacity: 1;
					scale: 1;
				}
			}
		}

		&_details {
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
	}

	.result-wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 2rem;
		height: 0;
		transition: height var(--animationTime) ease;
	}
}
</style>