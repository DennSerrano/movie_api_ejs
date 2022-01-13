const express = require('express');
const axios = require('axios')
const app = express()

app.set('view engine', 'ejs')

app.get("/", (rep, res) => {
    axios("https://api.themoviedb.org/3/movie/popular?api_key=4de6e3aade0a060f8a33c6518d9f33f1")
        .then((response) => {
            const popularMovies = response.data.results
            res.render("pages/home", { popularMovies })
        })
})

app.get("/movie_detail/:id", (req, res) => {
    const id = req.params.id
    axios(`https://api.themoviedb.org/3/movie/${id}?api_key=4de6e3aade0a060f8a33c6518d9f33f1`)
        .then((response) => {
            const allDetail = response.data
            res.render("pages/movie_detail", { allDetail })
        })
        .catch(() => {
            res.render("pages/movie_detail", { allDetail: null })
        })
})

const PORT = 1818
app.listen(PORT, () => console.log("listening port", PORT))