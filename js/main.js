const searchMovie = document.getElementById('searchMovie')
const searchMovieButton = document.getElementById('searchMovieButton')

const movieInformation = document.getElementById('movieInformation')


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
    fetch('https://www.omdbapi.com/?apikey=da783fad&s=' + movie + '')
        .then((response) => response.json())
        .then(function (movies) {
            //Make sure the array is ampty when doing a new search
            globalMovieArray.length = 0;
            globalMovieArray.push(movies);
            movieInformation.classList.remove('hidden')
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
    const errorMessageIfInputIsEmpty = document.createElement('p')
    const textErrorMessageIfInputIsEmpty = document.createTextNode('You have to write a title to be able to search')
    errorMessageIfInputIsEmpty.appendChild(textErrorMessageIfInputIsEmpty)
    movieInformation.appendChild(errorMessageIfInputIsEmpty)
}



function displayMovies(movies) {
    console.log(globalMovieArray);
    //Error message
    if (movies.Response === "False") {
        const noMoviesFound = document.createElement('p');
        const textNoMoviesFound = document.createTextNode(`${movies.Error} Please try again`);
        noMoviesFound.appendChild(textNoMoviesFound);
        movieInformation.appendChild(noMoviesFound);
        console.log("nyh");}
    
    let searchedMovies = globalMovieArray[0].Search;
    for (i = 0; i < searchedMovies.length; i++) {
        //Div for listed movie and button
        const liAndButtonDiv = document.createElement('div')
        liAndButtonDiv.classList.add('liAndButtonDiv')
        //Create li element for search result
        const movieTitleListed = document.createElement('li');
        movieTitleListed.className = "clear"
        const movieTitle = document.createTextNode(`${movies.Search[i].Title}`)
        movieTitleListed.appendChild(movieTitle);
        liAndButtonDiv.appendChild(movieTitleListed);
        movieInformation.appendChild(liAndButtonDiv);

        buttonForMoreInformation(movies.Search[i].imdbID, liAndButtonDiv)
        console.log(movies.Search[i].Title);
    }
}

function buttonForMoreInformation(imdbID, div) {
    const moreInformationButton = document.createElement('button');
    const textMoreInformationButton = document.createTextNode('More info.')
    moreInformationButton.id = imdbID
    moreInformationButton.appendChild(textMoreInformationButton)
    div.appendChild(moreInformationButton);

    moreInformationButton.addEventListener('click', function () {
        const searchField = document.getElementById('divSearchField')
        searchField.classList.add('hidden')
        //console.log(this.id)
        getMovieImdbId(imdbID);
    })
}

function getMovieImdbId(imdbID) {
    fetch('https://www.omdbapi.com/?apikey=da783fad&i=' + imdbID + '')
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
    const divGoBackButton = document.createElement('div')
    divGoBackButton.classList.add("divGoBackButton")
    goBackButton.classList.add("goBackButton")
    const textGoBackButton = document.createTextNode('Back To Search')
    divGoBackButton.appendChild(goBackButton)
    goBackButton.appendChild(textGoBackButton)
    movieInformation.appendChild(divGoBackButton)
    
    goBackButton.addEventListener('click', function(){
        
        localStorage.setItem("globalMovieArray", JSON.stringify(globalMovieArray));
        const storedMovies = JSON.parse(localStorage.getItem("globalMovieArray"))
        
        console.log(storedMovies);
    })
}