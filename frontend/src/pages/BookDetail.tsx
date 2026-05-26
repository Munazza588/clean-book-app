import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const BookDetail = () => {
    const {id} = useParams()
    const [book,setBook] = useState(null)
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(5)
    const [content, setContent] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3001/books/${id}`)
        .then((response) => {
            setBook(response.data)
        })
        axios.get(`http://localhost:3001/reviews/${id}`)
        .then((response) => {
        setReviews(response.data)
        })
    },[id])

    if(!book) return <p>Loading...</p>

    const handleFavorite = async () => {
    const token = localStorage.getItem('token')
    if(!token) {
        window.location.href = '/login'
        return
    }
    
    try {
        await axios.post('http://localhost:3001/favorites', 
        { book_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
        )
        alert('Added to favorites! 🎉')
    } catch(error : any) {
        if(error.response?.status === 500) {
            alert('You already saved this book! ♡')
        } else {
            alert('Something went wrong!')
        }
    }
    }

    const handleReview = async () => {
        const token = localStorage.getItem('token')
        if(!token) {
        window.location.href = '/login'
        return
       }
       if(!content) {
        alert('Please write a review!')
        return
       }
       try {
        await axios.post('http://localhost:3001/reviews',
        { book_id: id, rating, content },
        { headers: { Authorization: `Bearer ${token}` } }
        )
        alert('Review submitted! 🎉')
        setContent('')
        setRating(5)
        // refresh reviews
        const response = await axios.get(`http://localhost:3001/reviews/${id}`)
        setReviews(response.data)
        }catch(error: any) {
        alert('Something went wrong!')
        }


    }

    return (
        <div className="bg-amber-50 min-h-screen p-12">
        <Navbar />
            <div className="max-w-3xl mx-auto px-12 py-10">
        
                <div className="bg-white rounded-xl border border-stone-200 p-8">
                    
                    {/* Book cover placeholder */}
                    <div className="h-48 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-6xl">📚</span>
                    </div>

                    {/* Book info */}
                    <h1 style={{fontFamily: 'Playfair Display, serif'}} className="text-3xl font-medium text-stone-800 mb-2">
                    {book.title}
                    </h1>
                    <p className="text-sm text-stone-500 mb-4">{book.genre}</p>
                    <p className="text-stone-600 leading-relaxed mb-6">{book.description}</p>

                    {/* Verified badge */}
                    <span className="text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full">✓ Verified Clean</span>
                    
                </div>
                <div className="flex justify-center mt-4">
                    <button 
                            onClick={handleFavorite}
                            className="mt-4 bg-pink-300 text-white px-6 py-2 rounded-full text-sm hover:bg-rose-500 transition-colors">
                            ♡ Add to favorites
                    </button>
                </div>
            </div>
            <div style={{fontFamily: 'Playfair Display, serif'}} className="bg-white rounded-xl border border-stone-200 p-6 mt-6">
            <h2 className="text-lg font-medium text-stone-800 mb-4">Write a review</h2>
            
            <div className="mb-4">
                <label className="text-sm text-stone-600 mb-1 block">Rating (1-5)</label>
                <input 
                type="number" 
                min="1" 
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-20 border border-stone-200 rounded-lg p-2 text-sm"
                />
            </div>

            <div style={{fontFamily: 'Playfair Display, serif'}} className="mb-4">
                <label className="text-sm text-stone-600 mb-1 block">Your review</label>
                <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What did you think of this book?"
                className="w-full border border-stone-200 rounded-lg p-2 text-sm h-24"
                />
            </div>

            <button onClick={handleReview} className="bg-pink-300 text-white px-6 py-2 rounded-full text-sm">
                Submit review
            </button>
            </div>
            {/* Display reviews */}
            <div className="mt-6">
            <h2 className="text-lg font-medium text-stone-800 mb-4">Reviews</h2>
            
            {reviews.length === 0 ? (
                <p className="text-sm text-stone-500">No reviews yet — be the first!</p>
            ) : (
                reviews.map((review: any) => (
                <div key={review.id} className="bg-white rounded-xl border border-stone-200 p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-stone-800">{review.name}</p>
                    <p className="text-sm text-amber-500">{'★'.repeat(review.rating)}</p>
                    </div>
                    <p className="text-sm text-stone-600">{review.content}</p>
                </div>
                ))
            )}
            </div>
        </div>
    )
}
export default BookDetail