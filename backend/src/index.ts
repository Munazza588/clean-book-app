import pool from './db'
import authMiddleware from './middleware/auth'
import authRouter from './routes/auth'

//runs the server
//Listen for requests from our frontend
//Process them (get books, create users, save favorites)
//espond with data
import express from 'express'
// this is needed for our backend to be able
// to talk to the frontend if they are on 
//different ports like localhost:3000 and
// localhost:5000
import cors from 'cors'
// this one is need to save secret info
//because we are pushing our stuff on github
//and we dont want github to also store and
//passwords and world can see it so we make 
//it like such that we put it in a .env file
//and this import pulls that file
import dotenv from 'dotenv'

// lets you get the password 
//config is the method that you can use on 
//object dotenv
dotenv.config()
//express is a function 
const app = express()
// we are askin to use port stored in the secret env file
// if the port doesnt exist in that file then 
// we use the default 5000 port
const PORT = process.env.PORT || 3001

//express.json() tells your sever to understand JSON

//JSON JSON is the language that 
// frontends and backends use to 
// talk to each other.

//so the data that comes from the 
// frontend is something that backend 
// doesnt understand and it needs translation
// so it uses express.json()

app.use(cors())
app.use(express.json())

// "/" means homepage-the root of the app
// now we wanna wanna do this that if someone
// visits / send back a message
// res=request-> comes from the frontend 
// res=response-> comes from the backend
//gets send back to the front end 
app.get('/',(req, res) => {
    res.json({ message: 'someone visited'})
})
pool.connect()
  .then(() => console.log('Connected to PostgreSQL! 🎉'))
  .catch((err) => console.log('Database connection error:', err))

//async means this function will 
// wait for something before continuing
app.get('/books',async(req,res) => {
  const search = req.query.search
  if(search) {
    const result = await pool.query(
      'SELECT * FROM books WHERE title ILIKE $1',
      [`%${search}%`]
    )
    res.json(result.rows)
  } else {
    const result = await pool.query('SELECT * FROM books')
    res.json(result.rows)
  }
})

app.get('/books/:id',async(req,res) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1',[req.params.id])
  res.json(result.rows[0])
})


app.use('/auth', authRouter)

app.post('/favorites',authMiddleware,async (req,res) => {
  const {book_id} = req.body
  const user_id = (req as any).user.id
  const result = await pool.query(
    'INSERT INTO favorites (user_id, book_id) VALUES ($1, $2) RETURNING *',
    [user_id, book_id]
  )
  res.json(result.rows[0])
})

app.post('/reviews',authMiddleware,async (req,res) => {
  const {book_id, rating, content} = req.body
  const user_id = (req as any).user.id

  const result = await pool.query(
    'INSERT INTO reviews (user_id, book_id, rating, content) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, book_id, rating, content]
  )
  res.json(result.rows[0])
})

app.post('/submissions',authMiddleware,async(req,res) => {
  const {title,author_name,description,genre,cover_url,manuscript_url} = req.body
  const user_id = (req as any).user.id
  const result = await pool.query(
    'INSERT INTO submissions (user_id,title,author_name,description,genre,cover_url,manuscript_url) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *',
    [user_id,title,author_name,description,genre,cover_url,manuscript_url]
  )
  res.json(result.rows[0])
})

app.get('/reviews/:book_id',async (req,res) => {
  const result = await pool.query(
    'SELECT reviews.*, users.name FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.book_id = $1',
    [req.params.book_id]
  )
  res.json(result.rows)
})

app.get('/favorites', authMiddleware, async (req,res) => {
  const user_id = (req as any).user.id
  const result = await pool.query(
    'SELECT books.* FROM favorites JOIN books ON favorites.book_id = books.id WHERE favorites.user_id = $1',
    [user_id]
  )
  res.json(result.rows)
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
