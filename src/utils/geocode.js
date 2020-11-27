const request = require('request')

const geocode = (address, callback) => {
 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWxlc3NhbmRyb2dpc29ubmEiLCJhIjoiY2todnM1dWY5MDJqcjJ4bnh3aWQ5eGxkbiJ9.1emO-HWPXozYL0w6bTNnQg&limit=1'
    
    request ({url, json:true},(error, {body}) => {
        if(error) {
          callback('impossibile connettersi', undefined)  
        } else if (body.features.length === 0){
          callback('localita non trovata. porvare con una nuova',undefined)
        } else {
          callback(undefined, {
            latitudine: body.features[0].center[1],
            longitudine: body.features[0].center[0],
            location: body.features[0].place_name
         })  
        }
    
    })
}

module.exports = geocode