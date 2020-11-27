const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicPath = (path.join(__dirname, '../public')) 
const viewsPath = (path.join(__dirname, '../templates/views'))
const partialsPath = (path.join(__dirname, '../templates/partials'))

console.log(partialsPath)

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve  
app.use(express.static(publicPath)) 

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather APP',
        name:'Alessandro'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name:'Alessandro'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name:'Alessandro'
    })
})


app.get('/weather', (req,res) => {
    address = req.query.address
    if(!address) {
        return res.send({
            error:'You must provide a search term'
         })
     }
     
     geocode(address, (error, { latitudine, longitudine, location } = {}) => {
        if (error) {
            return res.send({
                error: error
             })
        }
        forecast(latitudine, longitudine, (error, dataforecast) => {
            if (error) {
                return res.send({
                    error: error
                 })
            }
            res.send(
                {
                    location: location, 
                    forecast: dataforecast
                }              
            )
        })
     })
})






app.get('/products',(req, res) => {
    if(!req.query.search) {
       return res.send({
           error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name:'Alessandro',
        errorMessage: 'Help article not found'    
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        name:'Alessandro',
        errorMessage: 'Page not found'
    })
})

//app.com  

app.listen(port, () => {
    console.log('Server is up on port' + port)
})