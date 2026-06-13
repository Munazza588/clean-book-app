import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const UserProfile = () => {
  const { userId } = useParams()
  const [profile, setProfile] = useState<any>(null)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
  const token = localStorage.getItem('token')
  axios.get(`http://localhost:3001/users/${userId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  }).then((response) => {
    setProfile(response.data)
    setIsFollowing(response.data.isFollowing)
  })
}, [userId])

  const handleFollow = async () => {
  const token = localStorage.getItem('token')
  if(!token) {
    window.location.href = '/login'
    return
  }
  try {
    if(isFollowing) {
      await axios.delete(`http://localhost:3001/follow/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setIsFollowing(false)
    } else {
      await axios.post(`http://localhost:3001/follow/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setIsFollowing(true)
    }
    
    // re-fetch profile to update counts!
    const response = await axios.get(`http://localhost:3001/users/${userId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    setProfile(response.data)
    
  } catch(error) {
    alert('Something went wrong!')
  }
}
  if(!profile) return (<p>Loading...</p>)

  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-8 py-10">
        
        <div className="bg-white rounded-xl border border-stone-200 p-8 mb-8">
          <h1 style={{fontFamily: 'Playfair Display, serif'}} className="text-2xl font-medium text-stone-800 mb-4">
            {profile.user.name}
          </h1>
          <div className="flex gap-6 mb-6">
            <p className="text-sm text-stone-600">
              <span className="font-medium">{profile.followers}</span> followers
            </p>
            <p className="text-sm text-stone-600">
              <span className="font-medium">{profile.following}</span> following
            </p>
          </div>
          <button 
            onClick={handleFollow}
            className="bg-pink-300 text-white px-6 py-2 rounded-full text-sm hover:bg-pink-400 transition-colors">
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>

        <h2 className="text-xl font-medium text-stone-800 mb-4">Favorite books</h2>
        
        {profile.favorites.length === 0 ? (
          <p className="text-stone-500 text-sm">No favorites yet!</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {profile.favorites.map((book: any) => (
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

export default UserProfile