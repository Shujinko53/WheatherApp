
import { WEATHER_KEY } from '~/consts/api';
import { WEATHER_URL } from '~/consts/urls';
import type { weatherDataInterface } from '~/models/weather';
import type { ICityData } from '~/models/city';


// ----- Weather Data -----

export async function getWeather(city: ICityData) {
    const weatherData = reactive({} as weatherDataInterface);
	const serverError = ref(false);

	if (Object.keys(weatherData).length) return;

	try {
		const response: any = await $fetch(WEATHER_URL, {
			query: {
				lat: city.coord.lat,
				lon: city.coord.lon,
				units: 'metric',
				appid: WEATHER_KEY,
			}
		} );
		const { current } = response;

		// console.log('📃 weather response => ', current);

		Object.assign(weatherData, current)
	} catch (error) {
		serverError.value = true;
		Object.assign(weatherData, {});
		console.log('❌ fetch weatherData error: ', error);
	}

    return {
        weatherData,
		serverError
    }
}