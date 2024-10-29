import { useState } from 'react'
import openweatherService from '../services/openweather.service'
import { City } from '../interface/openweather.interface'

const useSearchCity = () => {
  const [data, setData] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetch = async (search: string) => {
    setLoading(true)
    try {
      const data = await openweatherService.searchCity(search)
      setData(data)
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    fetch,
    loading,
    error,
  }
}

export default useSearchCity
