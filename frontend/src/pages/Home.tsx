import Navbar from '../components/Navbar'
import hero from '../assets/hero.png'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
   const [books, setBooks] = useState([]) 
   useEffect(() => {
    axios.get('http://localhost:3001/books')
        .then((response) => {
         setBooks(response.data)
    })
   },[])

  return (
    <div className="bg-amber-50 min-h-screen">
        <Navbar />
        <div className="grid grid-cols-2 min-h-64">
            <div className="flex flex-col justify-center px-12 py-16">
                <h1 className="text-4xl font-medium text-stone-800 leading-snug mb-4">
                    Romance reads, <br/>
                    <span className="text-pink-300">always clean.</span>
                </h1>
                <p className="text-stone-500 text-sm mb-6">
                    For the girlies who love romance but keep it clean. Your safe space to discover, share, and fall in love with reading.
                </p>
                <div className="flex gap-4">
                    <button className="bg-pink-300
                    text-white text-sm px-6 py-2 rounded-full">Explore books</button>
                    <button className="border border-pink-300 text-pink-300 text-sm px-6 py-2 rounded-full">Join community</button>
                </div>
            </div>
            <div className=" flex items-center justify-center p-12">
                <img src={hero} alt="cozy reading" className="w-full h-full object-cover" />
            </div>
        </div>
        <div className="grid grid-cols-4 border-t border-b border-stone-200 bg-white">
  
        <div className="p-6 border-r border-stone-200 hover:bg-amber-50 transition-colors cursor-pointer">
            <p className="text-sm font-medium text-stone-800 mb-1">Thoughtful reads</p>
            <p className="text-xs text-stone-500">Handpicked books that inspire and bring clarity.</p>
        </div>

        <div className="p-6 border-r border-stone-200 hover:bg-amber-50 transition-colors cursor-pointer">
            <p className="text-sm font-medium text-stone-800 mb-1">Honest reviews</p>
            <p className="text-xs text-stone-500">Real reviews from real readers like you.</p>
        </div>

        <div className="p-6 border-r border-stone-200 hover:bg-amber-50 transition-colors cursor-pointer">
            <p className="text-sm font-medium text-stone-800 mb-1">Kind community</p>
            <p className="text-xs text-stone-500">Connect with readers who love clean stories.</p>
        </div>

        <div className="p-6 hover:bg-amber-50 transition-colors cursor-pointer">
            <p className="text-sm font-medium text-stone-800 mb-1">Track and grow</p>
            <p className="text-xs text-stone-500">Save favorites, track reads, grow together.</p>
        </div>

        </div>
    <div className="px-12 py-10">
    
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-stone-800">Featured clean reads</h2>
        <a href="/books" className="text-sm text-rose-400 hover:underline">View all →</a>
    </div>
    <div className="grid grid-cols-4 gap-6">
    {books.map((book: any) => (
    <div key={book.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="h-40 bg-amber-100 flex items-center justify-center">
        <span className="text-4xl">📚</span>
        </div>
        <div className="p-4">
        <p className="text-sm font-medium text-stone-800">{book.title}</p>
        <p className="text-xs text-stone-500 mb-3">{book.author}</p>
        <div className="flex items-center justify-between">
            <span className="text-xs bg-rose-50 text-rose-400 px-2 py-1 rounded-full">{book.genre}</span>
            <span className="text-xs text-green-700">✓ Clean</span>
        </div>
        </div>
    </div>
))}
    </div>
    
    </div>
    </div>

  )
}

export default Home