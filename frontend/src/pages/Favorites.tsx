import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      window.location.href = '/login'
      return
    }

    axios.get('http://localhost:3001/favorites', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setFavorites(response.data)
    })
  }, [])
  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />
      <div className="px-12 py-10">
        <h1 style={{fontFamily: 'Playfair Display, serif'}} className="text-3xl font-medium text-stone-800 mb-8">
          My favorites
        </h1>

        {favorites.length === 0 ? (
          <p className="text-stone-500">You haven't saved any books yet!</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {favorites.map((book: any) => (
              <div key={book.id}
                onClick={() => window.location.href = `/books/${book.id}`}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-40 bg-amber-100 flex items-center justify-center">
                  <span className="text-4xl">📚</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-stone-800">{book.title}</p>
                  <p className="text-xs text-stone-500 mb-3">{book.genre}</p>
                  <span className="text-xs text-green-700">✓ Clean</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
