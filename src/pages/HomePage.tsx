import React, { useState } from 'react'
import DailyForecast from '../components/DailyForecast'
import Search from '../components/Search'
import useCurrentCity from '../hooks/useCurrentCity'
import { City } from '../interface/openweather.interface'
import useRecentSearch from '../hooks/useRecentSearch'

const HomePage = () => {
  const { data, loading } = useCurrentCity({})
  const { data: recentSearch, addSearch, updateCity } = useRecentSearch()
  const [selectedCity, setSelectedCity] = useState<City>()

  return (
    <div className="w-full h-full bg-slate-600 flex p-20">
      <Search
        recentSearch={recentSearch}
        onSelectCity={(city) => setSelectedCity(city)}
        addSearch={addSearch}
      />
      <DailyForecast
        currentCity={selectedCity ?? data}
        loading={loading}
        updateCity={updateCity}
      />
    </div>
  )
}

export default HomePage
