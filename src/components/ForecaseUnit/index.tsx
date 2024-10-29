import moment from 'moment-timezone'
import React, { useMemo } from 'react'
import { ForeCastItem } from '../../interface/openweather.interface'
import openweatherService from '../../services/openweather.service'

interface Props {
  date: Date
  forecast: ForeCastItem
}

const ForecaseUnit: React.FC<Props> = ({ forecast, date }) => {
  const isToday = useMemo(() => {
    return moment().isSame(moment(date), 'day')
  }, [date])
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="font-semibold text-2xl">
        {isToday ? 'Today' : moment(date).format('ddd')}
      </div>
      <div className="font-semibold text-xl">{forecast.main.temp}°</div>
      <img src={openweatherService.getIcon(forecast.weather[0].icon)} />
      <div className="font-semibold text-xl">{forecast.weather[0].main}</div>
    </div>
  )
}

export default ForecaseUnit
