import React from 'react'
import WindIcon from '../../medias/wind.svg'
import HumidityIcon from '../../medias/humidity.svg'
import { ForeCastItem } from '../../interface/openweather.interface'
import openweatherService from '../../services/openweather.service'

interface Props {
  forecast: ForeCastItem | undefined
}

const TemperatureGroup: React.FC<Props> = ({ forecast }) => {
  if (!forecast) return null
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-3">
          <div className="text-9xl font-bold">{forecast.main.temp}°</div>
          <div className="space-y-2">
            <div className="font-semibold text-xl flex space-x-1">
              <img src={WindIcon} className="w-6" />
              <div>{forecast.wind.speed} kph</div>
            </div>
            <div className="font-semibold text-xl flex space-x-1">
              <img src={HumidityIcon} className="w-6" />
              <div>{forecast.main.humidity} %</div>
            </div>
          </div>
        </div>
        <div className="text-xl font-semibold">
          Feels like {forecast.main.feels_like}°
        </div>
        <div className="text-3xl font-semibold text-center">
          <img src={openweatherService.getIcon(forecast.weather[0].icon)} />
          {forecast.weather[0].main}
        </div>
      </div>
    </div>
  )
}

export default TemperatureGroup
