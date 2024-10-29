import React, { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'

interface Props {
  min: number
  max: number
  currentMin: number
  currentMax: number
  onChange: (value: { min: number; max: number }) => void
  label?: string
}
const DoubleRangeSlider: React.FC<Props> = ({
  min,
  max,
  onChange,
  currentMin,
  currentMax,
  label,
}) => {
  const range = useRef<any>(null)
  const [firstLoad, setFirstLoad] = useState(true)

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(currentMin)
    const maxPercent = getPercent(currentMax)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [currentMin, currentMax, getPercent])

  return (
    <div className="multi-range-slider-container">
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{currentMin}°</div>
        <div className="slider__right-value">{currentMax}°</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={Number(currentMin)}
        onChange={(event) => {
          if (firstLoad) {
            setFirstLoad(false)
          }
          const value = Math.min(Number(event.target.value), currentMax - 1)
          onChange({ min: value, max: currentMax })
        }}
        className="thumb thumb--left"
        style={{ zIndex: currentMin > max - 100 ? 5 : 1 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={Number(currentMax)}
        onChange={(event) => {
          if (firstLoad) {
            setFirstLoad(false)
          }
          const value = Math.max(Number(event.target.value), currentMin + 1)
          onChange({ min: currentMin, max: value })
        }}
        className="thumb thumb--right"
      />
    </div>
  )
}

export default DoubleRangeSlider
