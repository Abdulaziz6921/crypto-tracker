import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllCryptos } from '../features/crypto/cryptoSlice'
import CryptoTableRow from './CryptoTableRow'
import InfoIcon from './InfoIcon'

function CryptoTable() {
  const cryptos = useSelector(selectAllCryptos)
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'ascending' })
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [favorites, setFavorites] = useState([])

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedCryptos = [...cryptos].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  const filteredCryptos = favoritesOnly 
    ? sortedCryptos.filter(crypto => favorites.includes(crypto.id))
    : sortedCryptos

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'ascending' ? '↑' : '↓'
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-800">Cryptocurrency Prices</h2>
        <div className="flex items-center">
          <button 
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              favoritesOnly 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`w-5 h-5 mr-2 ${favoritesOnly ? 'text-primary-600' : 'text-neutral-500'}`} 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            {favoritesOnly ? 'Favorites' : 'Show Favorites'}
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-border">
        <table className="w-full text-sm text-left text-neutral-700">
          <thead className="text-xs uppercase bg-neutral-100 text-neutral-600">
            <tr className="border-b border-border">
              <th className="px-2 py-3 whitespace-nowrap">
                <span className="sr-only">Favorite</span>
              </th>
              <th 
                onClick={() => handleSort('rank')} 
                className="px-2 py-3 cursor-pointer whitespace-nowrap"
              >
                # {getSortIcon('rank')}
              </th>
              <th 
                onClick={() => handleSort('name')}
                className="px-2 py-3 cursor-pointer whitespace-nowrap"
              >
                Name {getSortIcon('name')}
              </th>
              <th 
                onClick={() => handleSort('price')}
                className="px-4 py-3 cursor-pointer text-right whitespace-nowrap"
              >
                Price {getSortIcon('price')}
              </th>
              <th 
                onClick={() => handleSort('priceChange1h')}
                className="px-4 py-3 cursor-pointer text-right whitespace-nowrap"
              >
                1h % {getSortIcon('priceChange1h')}
              </th>
              <th 
                onClick={() => handleSort('priceChange24h')}
                className="px-4 py-3 cursor-pointer text-right whitespace-nowrap"
              >
                24h % {getSortIcon('priceChange24h')}
              </th>
              <th 
                onClick={() => handleSort('priceChange7d')}
                className="px-4 py-3 cursor-pointer text-right whitespace-nowrap"
              >
                7d % {getSortIcon('priceChange7d')}
              </th>
              <th 
                onClick={() => handleSort('marketCap')}
                className="px-4 py-3 cursor-pointer text-right whitespace-nowrap"
              >
                Market Cap <InfoIcon /> {getSortIcon('marketCap')}
              </th>
              <th 
                onClick={() => handleSort('volume24h')}
                className="px-4 py-3 cursor-pointer text-right whitespace-nowrap"
              >
                Volume(24h) <InfoIcon /> {getSortIcon('volume24h')}
              </th>
              <th 
                onClick={() => handleSort('circulatingSupply')}
                className="px-4 py-3 cursor-pointer text-right whitespace-nowrap"
              >
                Circulating Supply <InfoIcon /> {getSortIcon('circulatingSupply')}
              </th>
              <th className="px-4 py-3 text-right whitespace-nowrap">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptos.map(crypto => (
              <CryptoTableRow 
                key={crypto.id} 
                crypto={crypto} 
                isFavorite={favorites.includes(crypto.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CryptoTable