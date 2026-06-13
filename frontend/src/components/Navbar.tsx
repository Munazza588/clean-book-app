import { useState, useEffect } from 'react'

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            setIsLoggedIn(true)
        }
    }, [])

    const goToProfile = () => {
        const token = localStorage.getItem('token')
        if(token) {
            const payload = JSON.parse(atob(token.split('.')[1]))
            window.location.href = `/users/${payload.id}`
        }
    }

    return (
        <nav className="bg-amber-50 border-b border-stone-200 px-8 py-4 flex items-center justify-between">
        
            <div>
                <h1 className="text-lg font-medium text-stone-800">Cleanread</h1>
            </div>

            <div className="flex gap-6">
                <a href="/" className="text-sm text-stone-600 hover:text-stone-800">Home</a>
                <a href="/Books" className="text-sm text-stone-600 hover:text-stone-800">Books</a>
                <a href="/favorites" className="text-sm text-stone-600 hover:text-stone-800">Favorites</a>
                <a href="/About" className="text-sm text-stone-600 hover:text-stone-800">About</a>
            </div>

            <div className="flex gap-4 items-center">
                {isLoggedIn ? (
                    <>
                        <button
                            onClick={goToProfile}
                            className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 text-sm font-medium flex items-center justify-center hover:bg-stone-300 transition-colors">
                            M
                        </button>
                        <button 
                            onClick={() => {
                                localStorage.removeItem('token')
                                window.location.href = '/login'
                            }}
                            className="bg-pink-300 text-white text-sm px-4 py-2 rounded-full">
                            Sign out
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={() => window.location.href = '/login'}
                        className="bg-pink-300 text-white text-sm px-4 py-2 rounded-full">
                        Sign in
                    </button>
                )}
            </div>

        </nav>
    )
}

export default Navbar