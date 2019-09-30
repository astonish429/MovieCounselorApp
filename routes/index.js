var express = require('express');
var router = express.Router();

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';

const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

var request = require('request');

//SETTING THE IMAGEBASE URL PATH TO LOCAL SO THAT MAKING IT ACCESSIBLE
router.use((req, res, next) =>{
  res.locals.imageUrl =  imageBaseUrl;
  next();
})


router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData)=>{
     console.log('error : ', error)
  
    const parsedData = JSON.parse(movieData)
    
     
    res.render('index', {
      parsedData : parsedData.results
    })

  })
 
});


router.get('/movieDetail/:id', (req, res, next) =>{
  const singleMovie = `${apiBaseUrl}/movie/${req.params.id}?api_key=${apiKey}`
  request.get(singleMovie, (error, response, movieDetail)=>{
    const parsedDetail = JSON.parse(movieDetail)

    res.render('movieDetail', {
        parsedDetail
    }) 
    
  })
  
})



module.exports = router;
