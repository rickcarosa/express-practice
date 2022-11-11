var express = require("express");
var router = express.Router();
const request = require("request");

const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  // request.get takes 2 args:
  // 1. the url to get
  // 2. the call back to run when the http response is back. 3 args:
  // 1. error
  // 2. http response
  // 3. json/data the server sent back
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    // res.json(parsedData);
    res.render("index", { parsedData: parsedData.results });
  });
});

router.get("/movie/:id", (req, res, next) => {
  // res.json(req.params.id);
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request.get(thisMovieUrl, (error, response, movieData) => {
    // the movie data is a string, must convert to object
    const parsedData = JSON.parse(movieData);
    res.render("single-movie", {
      parsedData,
    });
  });
});

// for search
router.post('/search', (req, res, next) => {
  // whatever name value is in the navbar.ejs file
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  // cat will be either person or movie, the value from the navbar.ejs file
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  request.get(movieUrl, (error, response, movieData) => {
    const parsedData= JSON.parse(movieData)
    // res.json(parsedData)
    // if searching by actor
    if(cat === 'person') {
      parsedData.results = parsedData.results[0].known_for;
    }
    res.render('index', {
      // the array of movies
      parsedData: parsedData.results
    })
  })
})

module.exports = router;
