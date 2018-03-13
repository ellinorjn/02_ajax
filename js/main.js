const searchMovie = document.getElementById('searchMovie')
const searchMovieButton = document.getElementById('searchMovieButton')

let globalMovieArray = [];

searchMovie.addEventListener('keyup', function (e) {
    const searchValue = searchMovie.value;
    if (searchValue === "") {
        errorMessageForEmptySearch();
    } else if (e.keyCode === 13) {
        getSearchedMovie(searchValue)
    }
});

//searchMovieButton.addEventListener('click', getSearchedMovie)

function getSearchedMovie(movie) {
    fetch('http://www.omdbapi.com/?apikey=da783fad&s=' + movie + '')
        .then((response) => response.json())
        .then(function (movies) {
            //Make sure the array is ampty when doing a new search
            globalMovieArray.length = 0;
            globalMovieArray.push(movies);
            console.log(movies)
            displayMovies(movies)
        })
        .catch(function (error) {
            console.log(error);
        })
    searchMovie.value = "";
}

//Create error message when doing an empty search
function errorMessageForEmptySearch() {
    const errorMessageIfInputIsEmpty = document.createElement('div')
    const textErrorMessageIfInputIsEmpty = document.createTextNode('You have to wright a title to be able to search')
    errorMessageIfInputIsEmpty.appendChild(textErrorMessageIfInputIsEmpty)
    movieInformation.appendChild(errorMessageIfInputIsEmpty)
}

const movieInformation = document.getElementById('movieInformation')

function displayMovies(movies) {
    console.log(globalMovieArray);
    let searchedMovies = globalMovieArray[0].Search;
    for (i = 0; i < searchedMovies.length; i++) {
        const movieTitleListed = document.createElement('li');
        const movieTitle = document.createTextNode(`${movies.Search[i].Title}`)
        movieTitleListed.appendChild(movieTitle);
        movieInformation.appendChild(movieTitleListed);

        buttonForMoreInformation(movies.Search[i].imdbID)
        console.log(movies.Search[i].Title);
    }
}

function buttonForMoreInformation(imdbID) {
    const moreInformationButton = document.createElement('button');
    moreInformationButton.className = "moreInformationButton";
    const textMoreInformationButton = document.createTextNode('More info.')
    moreInformationButton.id = imdbID
    moreInformationButton.appendChild(textMoreInformationButton)
    movieInformation.appendChild(moreInformationButton);

    moreInformationButton.addEventListener('click', function () {
        //console.log(this.id)
        getMovieImdbId(imdbID);
    })
}

function getMovieImdbId(imdbID){
    fetch('http://www.omdbapi.com/?apikey=da783fad&i=' + imdbID + '')
          .then((response) => response.json())
          .then ((theId) => {
          console.log(theId);
          })
}