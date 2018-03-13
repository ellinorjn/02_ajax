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
    //Error message
    if (movies.Response === "False") {
        console.log("nyh");}
    
    let searchedMovies = globalMovieArray[0].Search;
    for (i = 0; i < searchedMovies.length; i++) {
        const movieTitleListed = document.createElement('li');
        movieTitleListed.className = "clear"
        const movieTitle = document.createTextNode(`${movies.Search[i].Title}`)
        movieTitleListed.appendChild(movieTitle);
        movieInformation.appendChild(movieTitleListed);

        buttonForMoreInformation(movies.Search[i].imdbID)
        console.log(movies.Search[i].Title);
    }
}

function buttonForMoreInformation(imdbID) {
    const moreInformationButton = document.createElement('button');
    moreInformationButton.className = "clear";
    const textMoreInformationButton = document.createTextNode('More info.')
    moreInformationButton.id = imdbID
    moreInformationButton.appendChild(textMoreInformationButton)
    movieInformation.appendChild(moreInformationButton);

    moreInformationButton.addEventListener('click', function () {
        //console.log(this.id)
        getMovieImdbId(imdbID);
    })
}

function getMovieImdbId(imdbID) {
    fetch('http://www.omdbapi.com/?apikey=da783fad&i=' + imdbID + '')
        .then((response) => response.json())
        .then((theId) => {
            console.log(theId);
            displayMoreInformationAboutMovie(theId)
            goBackToSearchButton()
        })
}

function displayMoreInformationAboutMovie(theId) {
    let displayMoreInformation = `
    <h2>${theId.Title}</h2>
    <div class="moviePoster"><img src="${theId.Poster}"></div>
    <p><span class="plot">"${theId.Plot}"</span></p>
    <p><span class="bold">Imdb rating: </span> ${theId.imdbRating}</p>
    <p><span class="bold">Actors: </span>${theId.Actors}</p>
    <p><span class="bold">Genres: </span>${theId.Genre}</p>
    <p><span class="bold">Runtime: </span>${theId.Runtime}</p>
    <p><span class="bold">Writer(s): </span>${theId.Writer}</p>
    <p><span class="bold">Released: </span>${theId.Released}</p>
    
`;
    
    movieInformation.innerHTML = displayMoreInformation;
}

function goBackToSearchButton(){
    const goBackButton = document.createElement('button')
    const textGoBackButton = document.createTextNode('Back To Search')
    goBackButton.appendChild(textGoBackButton)
    movieInformation.appendChild(goBackButton)
    
    goBackButton.addEventListener('click', function(){
        console.log('hellu')
    })
}