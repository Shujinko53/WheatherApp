import { API_KEY } from '~/consts/api';
import { CITY_URL } from '~/consts/urls';
import type { ICitiesResponse } from '~/models/city';


export async function getCities(city: string) {	
    const citiesData = reactive({} as ICitiesResponse);
    const serverError = ref(false);

	if (Object.keys(citiesData).length || !city) return;

	try {
		const citiesResponse = await $fetch(CITY_URL, {
			method: 'GET',
			query: {
				q: city,
				units: 'metric',
				appid: API_KEY
			}
		}) as ICitiesResponse;

		// console.log('📃 cities response => ', citiesResponse);

		if (!citiesResponse || citiesResponse.cod === '404') {
			serverError.value = true;
		}

		serverError.value = false;		
		Object.assign(citiesData, citiesResponse ?? {});
	} catch (error) {
		Object.assign(citiesData, {});
        serverError.value = true;
		console.log('❌ fetch citiesData error: ', error);
	}

    return {
        citiesData,
        serverError,
        city
    }
}