import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const BookDetail = () => {
    const {id} = useParams()
    const [book,setBook] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3001/books/${id}`)
        .then((response) => {
            setBook(response.data)
        })
    },[id])

    if(!book) return <p>Loading...</p>

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
            </div>
        </div>
    )
}
export default BookDetail