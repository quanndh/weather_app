import moment from 'moment-timezone'
import { AppEnv } from '../configs'
import { City, ForeCastItem } from '../interface/openweather.interface'

class OpenweatherService {
  query: Record<string, any> = {
    appid: AppEnv.API_KEY,
  }
  baseUrl: string = AppEnv.API_URL

  async forecast(city: string): Promise<{ list: ForeCastItem[]; city: City }> {
    if (!city) return { list: [], city: { id: 0, name: city } }
    try {
      const query = {
        ...this.query,
        q: city,
        units: 'metric',
      }
      const res = await fetch(
        `${this.baseUrl}data/2.5/forecast?${this.stringify(query)}`,
      )
      const data = await res.json()
      if (data.cod !== '200') {
        throw 'Can not forecast this city'
      }
      return {
        list: data.list as ForeCastItem[],
        city: { name: city, id: data.city.id },
      }
    } catch (error) {
      throw error
    }
  }

  async forecastByIds(ids: number[]): Promise<ForeCastItem[]> {
    if (!ids) return []
    try {
      const query = {
        ...this.query,
        id: ids.join(','),
        units: 'metric',
      }
      const res = await fetch(
        `${this.baseUrl}data/2.5/group?${this.stringify(query)}`,
      )
      const data = await res.json()
      return data.list as ForeCastItem[]
    } catch (error) {
      throw error
    }
  }

  async getCityByLatLong(lat: number, lon: number): Promise<City> {
    try {
      const query = {
        ...this.query,
        lat,
        lon,
        limit: 1,
        cnt: 10,
      }
      const res = await fetch(
        `${this.baseUrl}geo/1.0/reverse?${this.stringify(query)}`,
      )
      const data = await res.json()
      if (data.length) {
        const city = [data[0].name]
        if (data[0]?.state) {
          city.push(data[0].state)
        }
        city.push(data[0].country)
        return { id: 0, name: city.join(', ') }
      }
      throw 'City not found'
    } catch (error) {
      throw error
    }
  }

  async searchCity(search: string): Promise<City[]> {
    if (!search) return []
    try {
      const query = {
        ...this.query,
        q: search,
        limit: 1,
      }
      const res = await fetch(
        `${this.baseUrl}geo/1.0/direct?${this.stringify(query)}`,
      )
      const data = await res.json()
      if (data.length) {
        return data.map((x: any) => {
          const city = [data[0].name]
          if (data[0]?.state) {
            city.push(data[0].state)
          }
          city.push(data[0].country)
          return { id: 0, name: city.join(', ') }
        })
      }
      return []
    } catch (error) {
      throw error
    }
  }

  getCurrentForeCast(items: ForeCastItem[]) {
    const currentForCast = items.find((x) => {
      return x.dt * 1000 > moment().valueOf()
    })
    return currentForCast
  }

  getNextDayForcasts(items: ForeCastItem[]) {
    if (!items.length) return []
    const forecasts: ForeCastItem[] = [items[0]]
    let currentDay = items[0].dt_txt.split(' ')[0]
    for (const item of items) {
      const itemDay = item.dt_txt.split(' ')[0]
      if (currentDay !== itemDay) {
        forecasts.push(item)
        currentDay = itemDay
      }
    }
    return forecasts
  }

  getIcon(value: string) {
    return AppEnv.WEATHER_ICON_URL.replace('{icon}', value)
  }

  private stringify(query: any) {
    return new URLSearchParams(query).toString()
  }
}

export default new OpenweatherService()
