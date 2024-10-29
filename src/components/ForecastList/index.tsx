import React from 'react'
import ForecaseUnit from '../ForecaseUnit'
import moment from 'moment-timezone'
import { ForeCastItem } from '../../interface/openweather.interface'

interface Props {
  list: ForeCastItem[]
}

const ForecaseList: React.FC<Props> = ({ list }) => {
  return (
    <div className="w-full flex justify-around">
      {list.map((data, index) => (
        <ForecaseUnit
          key={index}
          date={moment().add(index, 'day').toDate()}
          forecast={data}
        />
      ))}
    </div>
  )
}

export default ForecaseList
