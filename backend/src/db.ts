//A Pool is a set of ready-made database connections.
import {Pool} from 'pg'

const pool = new Pool( {
    host: 'localhost',
    port: 5432,
    database: 'cleanbookapp',
    user: 'munazzahabib',
    
})

export default pool