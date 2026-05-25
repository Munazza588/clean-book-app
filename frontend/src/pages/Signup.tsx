import { useState } from 'react'
import axios from 'axios'
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSignUp = async () => {
        if(!email || !password || !name) {
            alert('Please fill in all fields!')
            return
        }
        try {
            const response = await axios.post('http://localhost:3001/auth/signup', {
            name,
            email,
            password
            })
            localStorage.setItem('token',response.data.token)
            window.location.href = '/'
        }catch(error) {
            alert('Invalid email or password!')
        }
    } 
  return (
    <div className="bg-amber-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl border border-stone-200 p-8 w-[450px]">
            <h1 style={{fontFamily: 'Playfair Display, serif'}} className="text-xl font-medium text-stone-800 mb-6 text-center">Create account</h1>  
        <div className="mb-4">
            <label className="text-sm text-stone-600 mb-1 block">Name</label>
            <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="xyzs" 
            className="w-full border border-stone-200 rounded-lg p-2 text-sm" 
            />
        </div>
        <div className="mb-4">
            <label className="text-sm text-stone-600 mb-1 block">Email</label>
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" 
            className="w-full border border-stone-200 rounded-lg p-2 text-sm" 
            />
        </div>
        <div className="mb-6">
            <label className="text-sm text-stone-600 mb-1 block">Password</label>
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full border border-stone-200 rounded-lg p-2 text-sm" 
            />
        </div>
        <button onClick={handleSignUp} className="w-full bg-pink-300 text-white rounded-full py-2">Signup</button>
        <p className="text-xs text-stone-500 text-center mt-4">
           Already have an account? <a href="/login" className="text-rose-400">Login</a>
        </p>
        </div>
    </div>
  )
}

export default Signup