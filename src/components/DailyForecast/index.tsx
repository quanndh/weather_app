import React, { useMemo } from 'react'
import moment from 'moment-timezone'
import TemperatureGroup from '../TemperatureGroup'
import ForecaseList from '../ForecastList'
import useFetchForecast from '../../hooks/useFetchForecast'
import openweatherService from '../../services/openweather.service'
import Spinner from '../Spinner'
import { City } from '../../interface/openweather.interface'

interface Props {
  currentCity: City | undefined
  loading: boolean
  updateCity: (city: City) => void
}

const DailyForecast: React.FC<Props> = ({
  currentCity,
  loading,
  updateCity,
}) => {
  const { data, loading: currentCityLoading } = useFetchForecast(currentCity, {
    onSuccess: ({ city }) => updateCity(city),
    onError: () => alert('City not found'),
  })

  const currentForecast = useMemo(() => {
    return openweatherService.getCurrentForeCast(data)
  }, [data])

  const nextDayForecasts = useMemo(() => {
    return openweatherService.getNextDayForcasts(data)
  }, [data])

  return (
    <div className="h-full bg-slate-50 w-3/4 rounded-r-2xl px-12 py-12 flex flex-col justify-between">
      {loading || currentCityLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between">
            <div className="font-bold text-2xl">{currentCity?.name}</div>
            <div className="font-bold text-2xl">
              {moment().format('DD.MM.YYYY')}
            </div>
          </div>
          <TemperatureGroup forecast={currentForecast} />
          <ForecaseList list={nextDayForecasts} />
        </>
      )}
    </div>
  )
}

export default DailyForecast
