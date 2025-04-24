import classNames from 'classnames'
import { formatPercentage } from '../utils/formatters'

function PercentageChange({ value }) {
  const isPositive = value > 0
  const isZero = value === 0
  
  return (
    <span
      className={classNames("font-medium", {
        "text-positive": isPositive,
        "text-negative": !isPositive && !isZero,
        "text-neutral-500": isZero
      })}
    >
      <span className="flex items-center justify-end">
        {!isZero && (
          <span className="mr-1">
            {isPositive ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            )}
          </span>
        )}
        {formatPercentage(value)}
      </span>
    </span>
  )
}

export default PercentageChange