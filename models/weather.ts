export interface weatherDataInterface {
	clouds: number,
	dt: number,
	feels_like: number,
	humidity: number,
	temp: number,
	weather: TypeWeather[],
	wind_deg: number,
	wind_gust: number,
	wind_speed: number
}

export type TypeWeather = {
	main: string,
	description: string,
}