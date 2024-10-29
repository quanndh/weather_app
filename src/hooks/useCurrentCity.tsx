import { useEffect, useState } from 'react'
import useCurrentLatlong from './useCurrentLatlong'
import openweatherService from '../services/openweather.service'
import { FetchHookParams } from '../interface/fetch-hook-params.interface'
import { City } from '../interface/openweather.interface'

const useCurrentCity = ({ onError }: FetchHookParams) => {
  const { latitude, longitude } = useCurrentLatlong()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState<City>()

  const getCurrentCity = async () => {
    if (!latitude || !longitude) return
    setLoading(true)
    try {
      const data = await openweatherService.getCityByLatLong(
        latitude,
        longitude,
      )
      setData(data)
    } catch (error: any) {
      setError(error)
      onError && onError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (latitude && longitude) {
      getCurrentCity()
    }
  }, [latitude, longitude])

  return {
    data,
    loading,
    error,
  }
}

export default useCurrentCity
