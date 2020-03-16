const express = require('express')
const { join } = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const Text = mongoose.model('text', new mongoose.Schema({ text: String }))

app.get('/texts', (req, res) => {
  Text.find()
    .then(texts => res.json(texts))
    .catch(e => console.error(e))
})

app.post('/texts', (req, res) => {
  Text.create(req.body)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
})

mongoose.connect('mongodb://localhost/textdb')
  .then(() => app.listen(3000))
  .catch(e => console.error(e))