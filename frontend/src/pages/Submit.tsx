import { useState } from "react"
import axios from 'axios'
import Navbar from '../components/Navbar'

const Submit = () => {
    //title-> current value(reading the sticky note)
    //setTitle-> the function to update it 
    // writing on the sticky note)
    //useState('')-> start empty

    const [title, setTitle] = useState('')
    const [author_name, setAuthor_name] = useState('')
    const [description,setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [cover_url, setCover_url] = useState('')
    const [manuscript_url ,setManuscript_url] = useState('')

    // handle submit function sends the data 
    // to the backend that we got from the input 
    const handleSubmit = async () => {
        // in handleSubmit we need to wait 
        // for the backend to respond after we 
        // send the data


        //what does response mean?
        // response in this case mean that 
        // the backend will let us know that
        // it saved stuff that we send successfully

        const token = localStorage.getItem('token')
        if(!token) {
        window.location.href = '/login'
        return
        }

        if(!title || !author_name || !description || !genre) {
            alert('Please fill in all required fields!')
            return
        }

        if(cover_url && !cover_url.startsWith('http')) {
            alert('Cover URL must be a valid link!')
            return
        }

        if(manuscript_url && !manuscript_url.startsWith('http')) {
            alert('Manuscript URL must be a valid link!')
            return
        }
        

        try {
            //post means sending data
            await axios.post('http://localhost:3001/submissions',
                {title,author_name,description,genre,cover_url,manuscript_url},
                { headers: { Authorization: `Bearer ${token}` } }

            )
            alert('Your book has been submitted for review! 🎉')
            window.location.href = '/'

            // when you send a request to a 
            // protected route - the backend
            // needs to know who you are.

            // the token is like your id card
            // you send it in the request headers
            // so the backend can verify your're 
            //logged in 


            //what are headers?
            // headers are extra info send with
            // with every request 
            // think of request like a letter:
            // body-> the actual content(title,
            // description,genre)
            // headers -> extra info on the envelope
            //(who sent it, what format,your id)

        } catch(error) {
            alert('Something went wrong!')
        }
        


    }

    return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto px-8 py-12">
        
        <h1 style={{fontFamily: 'Playfair Display, serif'}} className="text-3xl font-medium text-stone-800 mb-2">
          Submit your book
        </h1>
        <p className="text-stone-500 text-sm mb-8">
          Share your clean romance story with our community.
        </p>

        <div className="bg-white rounded-xl border border-stone-200 p-8">
          
          <div className="mb-4">
            <label className="text-sm text-stone-600 mb-1 block">Book title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book title" className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
          </div>

          <div className="mb-4">
            <label className="text-sm text-stone-600 mb-1 block">Author name</label>
            <input value={author_name} onChange={(e) => setAuthor_name(e.target.value)} placeholder="Your author name" className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
          </div>

          <div className="mb-4">
            <label className="text-sm text-stone-600 mb-1 block">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell us about your book..." className="w-full border border-stone-200 rounded-lg p-2 text-sm h-24" />
          </div>

          <div className="mb-4">
            <label className="text-sm text-stone-600 mb-1 block">Genre</label>
            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Romance, Clean Romance..." className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
          </div>

          <div className="mb-4">
            <label className="text-sm text-stone-600 mb-1 block">Cover image URL</label>
            <input value={cover_url} onChange={(e) => setCover_url(e.target.value)} placeholder="https://..." className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
          </div>

          <div className="mb-6">
            <label className="text-sm text-stone-600 mb-1 block">Manuscript URL</label>
            <input value={manuscript_url} onChange={(e) => setManuscript_url(e.target.value)} placeholder="Google Drive or Dropbox link..." className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
          </div>

          <button onClick={handleSubmit} className="w-full bg-pink-300 text-white rounded-full py-2 text-sm hover:bg-pink-400 transition-colors">
            Submit for review
          </button>

        </div>
      </div>
    </div>
  )

}

export default Submit