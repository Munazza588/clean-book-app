import express from 'express'
import pool from '../db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const router = express.Router()
router.post('/signup', async (req, res) => {
  const {name,email,password} = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await pool.query('INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *' ,[name,email,hashedPassword])
  const user = result.rows[0]
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '7d' }
    )

    res.json({ token, user })
})

router.post('/login', async (req, res) => {
    const {email,password} = req.body
    const result = await pool.query('SELECT * FROM users WHERE email = $1',[req.body.email])
    const user = result.rows[0]
    if(!user) return res.json({ error: 'User not found' })
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if(isMatch) {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '7d' }
    )
    res.json({ token, user })
  } else {
    res.json({ error: 'Invalid password' })
  }
  
})

export default router

