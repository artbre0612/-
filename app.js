const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results
 
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {

  const keyword = req.query.search
  const matchedRestaurants = keyword ? restaurants.filter((restaurant) => 
    Object.values(restaurant).some((property) => {
      if (typeof property === 'string') {
  return (property.toLowerCase().includes(keyword.trim().toLowerCase()) && (property === restaurant.name || property === restaurant.category || property === restaurant.name_en))}
  return false
      })
    ) : restaurants

  res.render('index', {restaurants: matchedRestaurants, keyword})
})


app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurantInfo = restaurants.find((results) => results.id.toString() === id)
  res.render('detail.hbs', {restaurantInfo})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})