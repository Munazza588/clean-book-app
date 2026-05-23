import express from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1]

  if(!token) {
    return res.json({ error: 'no token retry'})
  }

  const decoded = jwt.verify(token,process.env.JWT_SECRET || 'secretkey')
  req.user = decoded
  next()
}
export default authMiddleware