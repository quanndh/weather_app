import React from 'react'
import { City } from '../../interface/openweather.interface'

interface Props {
  list: City[]
  onSelectCity: (city: City) => void
}

const RecentSearch: React.FC<Props> = ({ list, onSelectCity }) => {
  return (
    <div className="flex flex-col space-y-2 h-1/2 overflow-y-auto scrollbar-hide pt-4">
      {list.map((item, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => onSelectCity(item)}>
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default RecentSearch
