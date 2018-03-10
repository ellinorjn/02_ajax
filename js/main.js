const searchMovie = document.getElementById('searchMovie')

searchMovie.addEventListener('change', function(){
    const searchValue = searchMovie.value;
    getSearchedMovie(searchValue)
})

getSearchedMovie();

function getSearchedMovie(movie = "remember+me"){
    fetch('http://www.omdbapi.com/?apikey=da783fad&t=' + movie +'')
    .then((response) => response.json())
    .then((movies)=> {
        console.log(movies)
        displayMovies(movies)
    })
    .catch(function(error){
        console.log(error);
    })
}

function displayMovies(movies) {
    const visaFilm = document.getElementById('test')
    let movieInfo = `<p>${movies.Title}</p><p>${movies.Year}</p>`;
    movieInformation.innerHTML = movieInfo;
}




