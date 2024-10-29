import { useEffect, useState } from 'react'

const useCurrentLatlong = () => {
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          setLatitude(latitude)
          setLongitude(longitude)
        },
        (error) => {
          console.error('Error getting location:', error)
        },
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }, [])

  return {
    latitude,
    longitude,
  }
}

export default useCurrentLatlong
