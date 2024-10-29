import React, { useEffect, useState } from 'react'
import CloseIcon from '../../medias/close.svg'
import useSearchCity from '../../hooks/useSearchCity'
import { useDebounce } from '../../hooks/useDebounce'
import Spinner from '../Spinner'
import { City } from '../../interface/openweather.interface'

interface Props {
  addSearch: (city: City) => void
  onSelectCity: (city: City) => void
}

const SearchInput: React.FC<Props> = ({ addSearch, onSelectCity }) => {
  const [search, setSearch] = useState('')

  const { fetch, data, loading } = useSearchCity()
  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    fetch(debouncedSearch)
  }, [debouncedSearch])

  const handleSelectCity = (city: City) => {
    setSearch('')
    addSearch(city)
    onSelectCity(city)
  }

  return (
    <>
      <div className="w-full bg-white rounded-sm flex p-2 space-x-2">
        <input
          className="w-full h-10 border-none outline-none focus:outline-none"
          placeholder="Search for city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <img
            src={CloseIcon}
            className="w-4 cursor-pointer"
            onClick={() => {
              setSearch('')
            }}
          />
        )}
      </div>
      {search && (
        <div className="bg-white h-40 max-h-40 overflow-y-scroll p-2 space-y-2 rounded-b-sm">
          {loading ? (
            <Spinner />
          ) : (
            data.map((city, index) => (
              <div
                key={index}
                className="text-lg hover:bg-slate-600 hover:text-white transition-all duration-150 cursor-pointer"
                onClick={() => handleSelectCity(city)}>
                {city.name}
              </div>
            ))
          )}
        </div>
      )}
    </>
  )
}

export default SearchInput
