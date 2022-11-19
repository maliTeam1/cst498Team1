// const dotenv = require("dotenv")
// dotenv.config()

const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()
 
const connectDb = async () => {
    try {
        const client = new Client({
            user: "postgres",
            host: "localhost",
            database: "postgres",
            password: "cst498team1",
            port: "5432"
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM journal_tag')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()

