import { useEffect, useState } from 'react'
import { FetchHookParams } from '../interface/fetch-hook-params.interface'
import openweatherService from '../services/openweather.service'
import { City, ForeCastItem } from '../interface/openweather.interface'

const useFetchForecast = (city?: City, params?: FetchHookParams) => {
  const [data, setData] = useState<ForeCastItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const fetch = async () => {
    if (!city) return
    setLoading(true)
    try {
      const { list, city: updatedCity } = await openweatherService.forecast(
        city.name,
      )
      setData(list)
      params?.onSuccess && params.onSuccess({ list, city: updatedCity })
    } catch (error: any) {
      setError(error)
      params?.onError && params.onError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [city?.name])

  return {
    fetch,
    data,
    error,
    loading,
  }
}

export default useFetchForecast
