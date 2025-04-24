import { useState, useEffect } from 'react'

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-10 transition-all duration-200 ${
      scrolled ? "bg-white shadow-sm" : "bg-white"
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary-600">CryptoTracker</h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-neutral-600 hover:text-primary-600 font-medium">Cryptocurrencies</a></li>
            <li><a href="#" className="text-neutral-600 hover:text-primary-600 font-medium">Exchanges</a></li>
            <li><a href="#" className="text-neutral-600 hover:text-primary-600 font-medium">Portfolio</a></li>
          </ul>
        </nav>
        <div className="flex items-center">
          <button className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header