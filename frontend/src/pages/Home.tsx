import Navbar from '../components/Navbar'
import hero from '../assets/hero.png'
import friends from '../assets/friends.png'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
   const [books, setBooks] = useState([]) 
   const [search,setSearch] = useState('')
   const [feed, setFeed] = useState([])
   const [users, setUsers] = useState([])

   useEffect(() => {
    axios.get('http://localhost:3001/books')
        .then((response) => {
         setBooks(response.data)
    })

        const token = localStorage.getItem('token')
    if(token) {
    axios.get('http://localhost:3001/feed', {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        setFeed(response.data)
    })
    }

   },[])

   const handleSearch = async () => {
  if(!search) return
  
  // search books
  const bookResponse = await axios.get(`http://localhost:3001/books?search=${search}`)
  const bookResults = bookResponse.data
  
  // search users
  const userResponse = await axios.get(`http://localhost:3001/users/search?search=${search}`)
  const userResults = userResponse.data

  if(bookResults.length === 1 && userResults.length === 0) {
    window.location.href = `/books/${bookResults[0].id}`
  } else if(bookResults.length > 1) {
    setBooks(bookResults)
  } else if(userResults.length === 1) {
    window.location.href = `/users/${userResults[0].id}`
  } else if(userResults.length > 1) {
    setUsers(userResults)
  } else {
    alert('No results found!')
  }
}

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
                <div className="flex gap-2 mt-12">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title..."
                    className="border border-stone-200 rounded-full px-4 py-2 text-sm bg-white w-96"
                />
                <button 
                    onClick={handleSearch}
                    className="bg-pink-300 text-white text-sm px-6 py-2 rounded-full z-10 relative">
                    Search
                </button>
               
            </div>
            </div>
            
            <div className=" flex items-center justify-center p-12 pointer-events-none">
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
    <div key={book.id} 
       onClick={() => window.location.href = `/books/${book.id}`}
       className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
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
        {users.length > 0 && (
    <div className="mt-8">
        <h2 className="text-xl font-medium text-stone-800 mb-4">People</h2>
        <div className="grid grid-cols-4 gap-4">
        {users.map((user: any) => (
            <div 
            key={user.id}
            onClick={() => window.location.href = `/users/${user.id}`}
            className="bg-white rounded-xl border border-stone-200 p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-sm font-medium">
                {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="text-sm font-medium text-stone-800">{user.name}</p>
                <p className="text-xs text-stone-500">{user.role}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
    )}
    
    </div>
    <div className="px-12 py-10 bg-white">
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-stone-800">What friends are reading</h2>
        <a href="/friends" className="text-sm text-rose-400 hover:underline">See all →</a>
    </div>

    <div className="grid grid-cols-3 gap-4">
        {feed.length === 0 ? (
        <p className="text-stone-500 text-sm">Follow friends to see what they're reading!</p>
        ) : (
        feed.map((item: any) => (
            <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-4 border border-stone-200">
            <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-sm font-medium text-rose-700">
                {item.reader_name?.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="text-sm font-medium text-stone-800">{item.reader_name}</p>
                <p className="text-xs text-stone-500">saved "{item.title}"</p>
            </div>
            </div>
        ))
        )}
    </div>
    </div>
        <div className="px-12 py-16 bg-amber-50">
            <div className="grid grid-cols-2 items-center gap-12">
                
                {/* Image on the left */}
                <div>
                <img src={friends} alt="community" className="w-full object-cover" />
                </div>

                {/* Text on the right */}
                <div>
                <h2 className="text-2xl font-medium text-black mb-4">Are you an Author?</h2>
                <p className="text-stone-500 text-sm mb-6 max-w-lg leading-relaxed">Write clean romance? We'd love to feature your work. Submit your book for review and become part of a community that believes love stories don't need explicit content to be beautiful.</p>
                <button 
                    onClick={() => window.location.href = '/submit'}
                    className="bg-pink-300 text-white text-sm px-6 py-2 rounded-full hover:bg-pink-400 transition-colors">
                    Submit your book
                </button>
                </div>

            </div>
        </div>
    </div>


  )
}

export default Home