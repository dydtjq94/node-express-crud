var express = require('express')
var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const port = 4000

const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
})
const Comments = sequelize.define(
  'Comments',
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {},
)
;(async () => {
  await Comments.sync()
  console.log('The table for the User model was just (re)created!')
})()

app.set('view engine', 'ejs')

app.get('/', async function (req, res) {
  const comments = await Comments.findAll()
  res.render('index', { comments })
})
app.post('/create', async function (req, res) {
  const { content } = req.body
  await Comments.create({ content })
  res.redirect(`/`)
})
app.post('/update/:id', async function (req, res) {
  const { content } = req.body
  const { id } = req.params
  await Comments.update(
    { content },
    {
      where: { id },
    },
  )
  res.redirect(`/`)
})
app.post('/delete/:id', async function (req, res) {
  const { id } = req.params
  await Comments.destroy({
    where: { id },
  })

  res.redirect(`/`)
})

app.listen(port)
console.log(`Server is listening on port {port}`)
