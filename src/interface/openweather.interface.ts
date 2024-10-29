export interface ForeCastItem {
  wind: {
    speed: number
    deg: number
    gust: number
  }
  weather: {
    main: string
    description: string
    icon: string
  }[]
  dt: number
  dt_txt: string
  main: {
    feels_like: number
    humidity: number
    temp: number
    temp_min: number
    temp_max: number
  }
  id: number
}

export interface City {
  id: number
  name: string
}
