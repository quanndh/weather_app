import React, { useEffect, useMemo, useState } from 'react'
import SearchInput from '../SearchInput'
import RecentSearch from '../RecentSearch'
import DoubleRangeSlider from '../DoubleRangeSlider'
import { City } from '../../interface/openweather.interface'
import openweatherService from '../../services/openweather.service'
import { useDebounce } from '../../hooks/useDebounce'

interface Props {
  recentSearch: City[]
  onSelectCity: (city: City) => void
  addSearch: (city: City) => void
}

const Search: React.FC<Props> = ({ recentSearch, onSelectCity, addSearch }) => {
  const [min, setMin] = useState(-100)
  const [max, setMax] = useState(100)
  const [filteredCityIds, setFilterCityIds] = useState<number[]>([])
  const handleChangeTemperature = (values: { min: number; max: number }) => {
    setMin(values.min)
    setMax(values.max)
  }

  const debouncedMin = useDebounce(min)
  const debouncedMax = useDebounce(max)

  const filterByTemp = async () => {
    if (debouncedMin === -100 && debouncedMax === 100) return
    try {
      const list = await openweatherService.forecastByIds(
        recentSearch.map((x) => x.id),
      )
      const filteredCities = list.filter(
        (city) =>
          city.main.temp >= debouncedMin && city.main.temp <= debouncedMax,
      )

      const filterCityIds = filteredCities.map((x) => x.id)
      setFilterCityIds(filterCityIds)
    } catch (error) {
      alert('Can not filter this city')
    }
  }

  const filteredCity = useMemo(() => {
    if (debouncedMin === -100 && debouncedMax === 100) return recentSearch
    return recentSearch.filter((x) => filteredCityIds.includes(x.id))
  }, [recentSearch, filteredCityIds, debouncedMin, debouncedMax])

  useEffect(() => {
    filterByTemp()
  }, [debouncedMin, debouncedMax])

  return (
    <div className="h-full bg-slate-300 w-1/4 rounded-l-2xl py-12 px-8 space-y-1">
      <SearchInput addSearch={addSearch} onSelectCity={onSelectCity} />
      <div className="pt-4">
        <DoubleRangeSlider
          label="Temperature"
          min={-100}
          max={100}
          currentMin={min}
          currentMax={max}
          onChange={handleChangeTemperature}
        />
      </div>
      <RecentSearch list={filteredCity} onSelectCity={onSelectCity} />
    </div>
  )
}

export default Search
