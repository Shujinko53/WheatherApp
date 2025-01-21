import type { weatherDataInterface } from "./weather";

export interface ICitiesResponse {
	cod: string,
	count: number,
	list: ICityData[]
}

export interface ICityData extends Pick<weatherDataInterface, 'name'> {
	coord: {
		lat: number,
		lon: number
	},
	main: {
		temp: number,
	}
	sys: {
		country: string
	},
}