const express = require("express")
const randomName = require("node-random-name")
const mysql = require("mysql2/promise")

const port = 3000
const server = express()

const pool = mysql.createPool({
    host: 'database',
    user: 'root',
    password: 'example',
    database: 'fullcycle',
    port: 3306,
})

const getPeopleList = async () => {
    const query = 'SELECT name FROM people;'
    const [results] = await pool.query(query)
    return results
}

const insertPerson = async (name) => {
    const query = 'INSERT INTO people (name) VALUES (?)'
    await pool.query(query, [name])
}

server.get('/', async (req, res) => {
    try {
        const newPerson = randomName()
        await insertPerson(newPerson)

        const peopleList = await getPeopleList()

        const peopleListHtml = peopleList.length
            ? peopleList.map((people) => `<li>${people.name}</li>`).join("\n")
            : "<p>Nenhuma pessoa encontrada.</p>"

        const responseContent = `<h1>Full Cycle Rocks!</h1>\n<ul>${peopleListHtml}</ul>`
        res.send(responseContent)
    } catch (error) {
        console.error(error)
        res.status(500).send('Erro no servidor')
    }
})

server.listen(port, () => {
    console.log(`App listening on port ${port}`)
})