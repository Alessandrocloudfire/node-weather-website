const request = require('request')

const forecast = (latitude, longitude, callback) => {
       const url = 'http://api.weatherstack.com/current?access_key=fd3191bd99c279fab034752775378071&query='+(latitude)+','+(longitude)
       request ({url,json:true},(error, {body}) => {
           if(error) {
             callback('impossibile stabilire una connessione', undefined) 
           } else if (body.error) {
            callback('coordinate non trovate', undefined)  
           } else {
            callback(undefined, `il meteo è ${body.current.weather_descriptions[0]},la temperatura corrente è ${body.current.temperature}°C, la percepita è di ${body.current.feelslike}°C. l'umidità è del ${body.current.humidity}%!`)
              
           }
       })
}

module.exports = forecast