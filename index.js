var express = require('express')
var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

const port = 4000

// db code
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
})
const Cookings = sequelize.define(
  'Cookings',
  {
    cookingName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cookingDes: {
      type: DataTypes.STRING,
    },
    chefType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chefNickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cookingTime: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    ingrediant: {
      type: DataTypes.STRING,
    },
    method: {
      type: DataTypes.STRING,
    },
    jjComment: {
      type: DataTypes.STRING,
    },
    ysComment: {
      type: DataTypes.STRING,
    },
  },
  {},
)
;(async () => {
  await Cookings.sync()
  console.log('The table for the User model was just (re)created!')
})()

// view code
app.set('view engine', 'pug')

// router&controller code
app.get('/', async function (req, res) {
  const cookings = await Cookings.findAll()
  res.render('home', { cookings })
})

app.get('/cooking/create', function (req, res) {
  res.render('create')
})

app.get('/cooking/:id', async function (req, res) {
  const { id } = req.params

  const cookingData = await Cookings.findAll({
    where: {
      id,
    },
  })

  const cooking = cookingData[0]

  res.render('cookingDetail', { cooking })
})

app.post('/create', async function (req, res) {
  const {
    chefType,
    chefNickname,
    cookingName,
    cookingDes,
    ingrediant,
    method,
    cookingTime,
  } = req.body

  await Cookings.create({
    chefType,
    chefNickname,
    cookingName,
    cookingDes,
    ingrediant,
    method,
    cookingTime,
  })
  res.redirect(`/`)
})

app.post('/update/:id', async function (req, res) {
  const { name } = req.body
  const { id } = req.params
  await Cookings.update(
    { name },
    {
      where: { id },
    },
  )
  res.redirect(`/`)
})

app.post('/delete/:id', async function (req, res) {
  const { id } = req.params
  await Cookings.destroy({
    where: { id },
  })

  res.redirect(`/`)
})

app.listen(port)
console.log(`Server is listening on port ${port}`)
