const searchMovie = document.getElementById('searchMovie')
const searchMovieButton = document.getElementById('searchMovieButton')

searchMovie.addEventListener('keyup', function (e) {
    const searchValue = searchMovie.value;
    if (e.keyCode === 13) {
        getSearchedMovie(searchValue)
    }
});

//searchMovieButton.addEventListener('click', getSearchedMovie)

getSearchedMovie();


function getSearchedMovie(movie = "remember+me") {
    fetch('http://www.omdbapi.com/?apikey=da783fad&t=' + movie + '')
        .then((response) => response.json())
        .then((movies) => {
            console.log(movies)
            displayMovies(movies)
        readMore(movieInformation)
        })
        .catch(function (error) {
            console.log(error);
        })
    searchMovie.value = "";
}

function displayMovies(movies) {
    const movieInformation = document.getElementById('movieInformation')
    let movieInfo = `<h2>${movies.Title}</h2>
                    <p>Released: ${movies.Released}</p>
                    <p>${movies.Plot}</p>
                    <p>IMDb rating: ${movies.imdbRating}</p>`;
    movieInformation.innerHTML = movieInfo;
}


function readMore(movieInformation){
    const readMoreButton = document.createElement('button');
    readMoreButton.className = "readMoreButton"
    const textReadMoreButton = document.createTextNode('Read more')
    readMoreButton.appendChild(textReadMoreButton)
    movieInformation.appendChild(readMoreButton);
    
    readMoreButton.addEventListener('click', function(){
        console.log("hej");
    })
}


