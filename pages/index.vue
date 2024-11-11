<template>
	<div class="HomePage page">
		<div class="weather">
			<div class="weather_search-box">
				<NuxtIcon name="location" class="loc-icon icon" />

				<input
					type="text"
					placeholder="Enter your location"
					class="search_input"
					v-model="cityRef"
				>
				<button class="search_btn" @click="handleClick">
					<NuxtIcon name="search" class="search-icon icon" />
				</button>
			</div>

			<div v-if="serverError" class="not-found">
				<NuxtImg src="/images/404.png" alt="Not found image" />

				<p>Oops! Invalid location</p>
			</div>
 
			<Transition @enter="enter" @leave="leave">
				<div
					v-if="weatherData && !serverError"
					class="result-wrapper"
					:style="{
						'--animationTime': `${animationTime}s`,
						'--delay': `${weatherData ? 0 : animationTime}s`
					}"
				>
					<div
						:key="`${weatherData.name}_1`"
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
								{{ checkInteger(weatherData.main.temp) }} <sup class="celsius">°C</sup>
							</p>

							<p v-if="weatherData.weather?.length" class="weather-desc">
								{{ weatherData.weather[0].description }}
							</p>
						</div>
					</div>

					<div
						:class="['weather_details', `${weatherData.name}`]"
						:key="`${weatherData.name}`"
					>
						<div class="humidity">
							<div class="weather_details-text">
								<NuxtIcon name="humidity" />

								<div class="weather_details-box">
									<p class="parameter">Humidity</p>
									<p class="value">{{ parseInt(`${weatherData.main?.humidity}`) }}%</p>
								</div>
							</div>
						</div>

						<div class="wind">
							<div class="weather_details-text">
								<NuxtIcon name="wind" />

								<div class="weather_details-box">
									<p class="parameter">Wind speed</p>
									<p class="value">
										{{ weatherData.wind?.speed }}
										<span class="units">km/h</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Wheather App',
})

type TypeWeather = {
	main: string,
	description: string
}

interface weatherDataInterface {
	cod: number,
	name: string,
	main: {
		feels_like: number,
		humidity: number,
		temp: number,
	},
	weather?: TypeWeather[],
	wind: {
		deg: number,
		gust: number,
		speed: number
	}
}

const cityRef = ref('');
const weatherData = ref<weatherDataInterface>();
const serverError = ref(false);
const animationTime = 0.6;

async function handleClick() {
	const APIkey = 'ac5701ead3d77d173ebbadde01a9882b';
	
	const url = `https://api.openweathermap.org/data/2.5/weather`;

	if (!cityRef.value) {
		clearValue();
		return;
	}

	try {
		// const test = await $fetch('https://petstore.swagger.io/v2/swagger.json?status=sold')
		// console.log(test);
		const response = await $fetch(url, {
			query: {
				q: cityRef.value,
				units: 'metric',
				appid: APIkey
			}
		}) as unknown as weatherDataInterface;
		
		// const response = data.value as unknown as weatherDataInterface;
		console.log('response => ', response)
		
		if (!response || response.cod === 404) {
			serverError.value = true;
			return;
		}

		serverError.value = false;
		weatherData.value = response;
	} catch (error) {
		weatherData.value = {} as weatherDataInterface;
		console.log('fetch error: ', error);
	}
}

function checkInteger(number: number): number {
	return Number.isInteger(number) ? number : +number.toFixed(1);
}

function clearValue() {
	serverError.value = false;
	weatherData.value = undefined;
}

function enter(el: HTMLBodyElement) {
	Object.assign(el.style, {
		height: el.scrollHeight + 'px',
	});
}

function leave(el: HTMLBodyElement) {
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
		width: 35rem;
		padding: 2rem;
		border-radius: 2rem;
		background-color: $blue;
		font-family: $second-font;
		color: $white;

		&_search-box {
			display: flex;
			align-items: center;

			.search_input {
				display: flex;
				align-items: center;
				width: 75%;
				height: 4rem;
				border-radius: 1rem;
				margin-left: .4rem;
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
				font-size: 1.8rem;
			}

			.search_btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 3.6rem;
				height: 3.6rem;
				margin-left: auto;
				border-radius: 50%;
				background-color: $gray-100;
				color: $text-color;
				transition:
					background-color .3s ease,
					color .3s ease,
					opacity .1s ease-in-out;

				.search-icon {
					font-size: 2rem;
				}

				&:hover {
					background-color: rgba($gray-100, .5);
					color: $white;
				}
			}
		}

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
		.wind {
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