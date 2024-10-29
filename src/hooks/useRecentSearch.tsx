import { useEffect, useState } from 'react'
import { LocalStorageKey } from '../constants/local-storage'
import useLocalStorage from './useLocalStorage'
import { City } from '../interface/openweather.interface'

const useRecentSearch = () => {
  const [data, setData] = useState<City[]>([])
  const { get, set } = useLocalStorage()

  useEffect(() => {
    getSearch()
  }, [])

  const getSearch = () => {
    const cities = get(LocalStorageKey.SEARCH) ?? []
    setData(cities)
  }

  const addSearch = (city: City) => {
    const temp = data.filter((x) => x.name !== city.name)
    set(LocalStorageKey.SEARCH, [city, ...temp])
    setData([city, ...temp])
  }

  const updateCity = (city: City) => {
    const findCity = data.find((x) => x.name === city.name)
    if (findCity) {
      const temp = data.map((x) => {
        if (x.name !== city.name) return x
        return city
      })
      setData(temp)
      set(LocalStorageKey.SEARCH, temp)
    } else {
      addSearch(city)
    }
  }

  return {
    data,
    addSearch,
    updateCity,
  }
}

export default useRecentSearch
