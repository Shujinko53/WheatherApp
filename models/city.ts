export interface ICitiesResponse {
	cod: string,
	count: number,
	list: ICityData[]
}

export interface ICityData {
	name: string,
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