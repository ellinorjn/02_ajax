const searchMovie = document.getElementById('searchMovie')
const searchMovieButton = document.getElementById('searchMovieButton')

const test = document.getElementById('test')

function getSearched(testar){
    fetch('http://www.omdbapi.com/?apikey=da783fad&s=' + testar + '')
    .then((response) => response.json())
    .then(function (testarIgen){
        console.log(testarIgen)
    })
}
test.addEventListener('keyup', function(e){
    const testValue = test.value;
    if (e.keyCode === 13) {
        getSearched(testValue)
    }
})


searchMovie.addEventListener('keyup', function (e) {
    const searchValue = searchMovie.value;
    if (e.keyCode === 13) {
        getSearchedMovie(searchValue)
    }
});

//searchMovieButton.addEventListener('click', getSearchedMovie)

getSearchedMovie();

let globalMovie = [];

function getSearchedMovie(movie = "remember me") {
    fetch('http://www.omdbapi.com/?apikey=da783fad&t=' + movie + '')
        .then((response) => response.json())
        .then(function (movies) {
            globalMovie = movies;
            console.log(movies)
            displayMovies(movies)
            buttonReadMore(movieInformation)
        })
        .catch(function (error) {
            console.log(error);
        })
    searchMovie.value = "";
}


const movieInformation = document.getElementById('movieInformation')

function displayMovies(movies) {

    let movieInfo = `<h2>${movies.Title}</h2>
                    <img src="${movies.Poster}">
                    <p>Released: ${movies.Released}</p>
                    <p>${movies.Plot}</p>`;
    movieInformation.innerHTML = movieInfo;
}

/* Read more button */
function buttonReadMore(movieInformation) {
    const readMoreButton = document.createElement('button');
    readMoreButton.className = "readMoreButton"
    const textReadMoreButton = document.createTextNode('Read more')
    readMoreButton.appendChild(textReadMoreButton)
    movieInformation.appendChild(readMoreButton);

    readMoreButton.addEventListener('click', function () {
        console.log("hej");
        readMore(globalMovie);
    })
}

function readMore(globalMovie) {
    let moreInformation = document.createTextNode(`${globalMovie.Country}
                                                    IMDb rating: ${globalMovie.imdbRating}
                                                    Genre: ${globalMovie.Genre}`)
    movieInformation.appendChild(moreInformation)
}