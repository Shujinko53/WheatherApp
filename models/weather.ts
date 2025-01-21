export interface weatherDataInterface {
	id: number,
	cod: number,
	name: string,
	main: {
		feels_like: number,
		humidity: number,
		temp: number,
	},
	weather: TypeWeather[],
	wind: {
		deg: number,
		gust: number,
		speed: number
	}
}

export type TypeWeather = {
	main: string,
	description: string
}