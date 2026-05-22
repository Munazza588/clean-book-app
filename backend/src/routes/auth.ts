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
export default router
