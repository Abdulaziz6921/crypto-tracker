import classNames from 'classnames'
import PercentageChange from './PercentageChange'
import PriceChange from './PriceChange'
import { formatCurrency, formatLargeNumber, formatSupply } from '../utils/formatters'

function CryptoTableRow({ crypto, isFavorite, onToggleFavorite }) {
  const {
    id, 
    rank, 
    name, 
    symbol, 
    logo, 
    price, 
    priceChange1h, 
    priceChange24h, 
    priceChange7d,
    marketCap,
    volume24h,
    circulatingSupply,
    supplyUnit,
    chartImage
  } = crypto

  return (
    <tr className="bg-white border-b border-border hover:bg-hover transition-colors">
      <td className="px-2 py-4 whitespace-nowrap">
        <button 
          onClick={() => onToggleFavorite(id)}
          className="text-neutral-400 hover:text-primary-500 focus:outline-none"
          aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "currentColor" : "none"}
            stroke={isFavorite ? "none" : "currentColor"}
            strokeWidth={isFavorite ? 0 : 2}
          >
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        </button>
      </td>
      <td className="px-2 py-4 whitespace-nowrap font-medium text-neutral-600">
        {rank}
      </td>
      <td className="px-2 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img src={logo} alt={`${symbol} logo`} className="w-8 h-8 mr-3" />
          <div>
            <div className="font-medium text-neutral-800">{name}</div>
            <div className="text-xs text-neutral-500">{symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right font-medium">
        <PriceChange
          value={price}
          formatter={(val) => formatCurrency(val)}
        />
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <PercentageChange value={priceChange1h} />
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <PercentageChange value={priceChange24h} />
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <PercentageChange value={priceChange7d} />
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right font-medium">
        {formatLargeNumber(marketCap)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right font-medium">
        {formatLargeNumber(volume24h)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <div className="flex flex-col">
          <span className="font-medium">{formatSupply(circulatingSupply, supplyUnit)}</span>
          {crypto.maxSupply && (
            <div className="mt-1 h-1.5 w-24 bg-neutral-200 rounded-full overflow-hidden ml-auto">
              <div 
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${(circulatingSupply / crypto.maxSupply) * 100}%` }} 
              />
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <img src={chartImage} alt={`${symbol} 7-day chart`} className="h-10 w-32 ml-auto" />
      </td>
    </tr>
  )
}

export default CryptoTableRow