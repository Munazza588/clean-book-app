import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BookDetail from './pages/BookDetail'
import Favorites from './pages/Favorites'
import Submit from './pages/Submit'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/books/:id' element={<BookDetail />} />
        <Route path='/favorites' element={<Favorites />} />
        {<Route path='/submit'    element={<Submit />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App