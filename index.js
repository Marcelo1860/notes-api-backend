const express = require('express')
const cors = require('cors')
const app = express()

console.log ("antes")
app.use(cors())
console.log("despues");
app.use(express.json())

let notes = [
    {
      "id": 1,
      "title": "Boca",
      "body": "BsAs",
      //"content": "HTML is easy and fast",
      "date": "2019-05-30T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "title": "River",
      "body": "BsAs",
      //"content": "Browser can execute only JavaScript",
      "date": "2019-05-30T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "title": "Talleres",
      "body": "Cba",
      //"content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2019-05-30T19:20:14.298Z",
      "important": true
    }
  ]

/*const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})*/

app.get('/',(request, response)=> {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes',(request, response)=> {
    response.json(notes)
})

app.get('/api/notes/:id',(request, response)=> {
    const id = Number(request.params.id)
    const note = notes.find(note=> note.id === id)
    if(note){
        response.json(note)
    }else {
        response.status(404).end()
    }
    
})

app.delete('/api/notes/:id',(request, response)=> {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes',(request, response)=> {
    const note = request.body

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote ={

        id: maxId + 1,
        body: note.body,
        title: note.title,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()

    }

    notes = [...notes, newNote]


    response.json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})