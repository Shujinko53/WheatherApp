
import { API_KEY } from '~/consts/api';
import { WEATHER_URL } from '~/consts/urls';
import type { weatherDataInterface } from '~/models/weather';


// ----- Weather Data -----

export async function getWeather(city: string) {
    const weatherData = ref<weatherDataInterface>();
    const serverError = ref(false);

	// if (!cityRef.value) {
	// 	clearValue();
	// 	return;
	// }

	try {
		const response = await $fetch(WEATHER_URL, {
			query: {
				q: city,
				units: 'metric',
				appid: API_KEY
			}
		}) as unknown as weatherDataInterface;

		console.log('📃 weather response => ', response);

		if (!response || response.cod === 404) {
			serverError.value = true;
			return;
		}

		serverError.value = false;
		weatherData.value = response;
	} catch (error) {
		weatherData.value = {} as weatherDataInterface;
		console.log('❌ fetch weatherData error: ', error);
	}

    return {
        weatherData,
        serverError
    }
}