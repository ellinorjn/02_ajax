const searchMovie = document.getElementById('searchMovie')
const searchMovieButton = document.getElementById('searchMovieButton')


const spinner = document.getElementById('spinner')
movieInformation.appendChild(spinner)

let globalMovieArray = [];

//Get value from input field when clicking enter
searchMovie.addEventListener('keyup', function (e) {
    const searchValue = searchMovie.value;
    if (searchValue === "") {
        errorMessageForEmptySearch();
    } else if (e.keyCode === 13) {
        getSearchedMovie(searchValue)
    }
});

//Get value from input field when clicking on the search button
searchMovieButton.addEventListener('click', function () {
    const searchValueButton = searchMovie.value;
    getSearchedMovie(searchValueButton)
})

//Function to fetch movies from API
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
    spinner.style.display = "block";
    searchMovie.value = "";
}

function test(){
    if(movieInformation.length > 0){
        movieInformation[0].parentNode.removeChild(movieInformation[0])
    }
}

//Create error message when doing an empty search
function errorMessageForEmptySearch() {
    spinner.style.display = "none";
    let errorMessageIfInputIsEmpty = `
        <p>You have to write a title to be able to search</p>`
    movieInformation.innerHTML=errorMessageIfInputIsEmpty
}


//Function to display fetched movies
function displayMovies(movies) {
    console.log(globalMovieArray);
    //Error message
    if (movies.Response === "False") {
        spinner.style.display = "block";
        let noMoviesFound = `<p>${movies.Error} Please try again</p>`
        movieInformation.innerHTML = noMoviesFound
        /*const noMoviesFound = document.createElement('p');
        noMoviesFound.setAttribute("id", "noMoviesFound")
        const textNoMoviesFound = document.createTextNode(`${movies.Error} Please try again`);
        noMoviesFound.appendChild(textNoMoviesFound);
        movieInformation.appendChild(noMoviesFound);
        console.log("nyh");*/
    }

    let searchedMovies = globalMovieArray[0].Search;
    for (i = 0; i < searchedMovies.length; i++) {
        //Div for listed movie and button
        const liAndButtonDiv = document.createElement('div')
        liAndButtonDiv.classList.add('liAndButtonDiv')
        //Create li element for search result
        const movieTitleListed = document.createElement('li');
        movieTitleListed.classList.add = ('clear')
        const movieTitle = document.createTextNode(`${movies.Search[i].Title}`)

        movieTitleListed.appendChild(movieTitle);
        liAndButtonDiv.appendChild(movieTitleListed);
        movieInformation.appendChild(liAndButtonDiv);
        
        buttonForMoreInformation(movies.Search[i].imdbID, liAndButtonDiv)
        console.log(movies.Search[i].Title);
        spinner.style.display = "none";
    }
}

//Funcion for creating more information button for each movie
function buttonForMoreInformation(imdbID, liAndButtonDiv) {
    const moreInformationButton = document.createElement('button');
    moreInformationButton.classList.add("infoButton")
    const textMoreInformationButton = document.createTextNode('Read more!')
    moreInformationButton.id = imdbID
    moreInformationButton.appendChild(textMoreInformationButton)
    liAndButtonDiv.appendChild(moreInformationButton);

    moreInformationButton.addEventListener('click', function () {
        const searchField = document.getElementById('divSearchField')
        searchField.classList.add('hidden')
        //console.log(this.id)
        getMovieImdbId(imdbID);
        spinner.style.display = "block";
    })
}

//Function to fetch more information about a specific movie
function getMovieImdbId(imdbID) {
    fetch('https://www.omdbapi.com/?apikey=da783fad&i=' + imdbID + '')
        .then((response) => response.json())
        .then((theId) => {
            spinner.style.display = "block";
            console.log(theId);
            displayMoreInformationAboutMovie(theId)
            goBackToSearchButton()

        })
}

//Function to display more infrormation about a specific movie
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

//Function to create a go back to search button
function goBackToSearchButton() {
    const goBackButton = document.createElement('button')
    const divGoBackButton = document.createElement('div')
    divGoBackButton.classList.add("divGoBackButton")
    goBackButton.classList.add("goBackButton")
    const textGoBackButton = document.createTextNode('Back To Search')
    divGoBackButton.appendChild(goBackButton)
    goBackButton.appendChild(textGoBackButton)
    movieInformation.appendChild(divGoBackButton)

    goBackButton.addEventListener('click', function () {

        localStorage.setItem("globalMovieArray", JSON.stringify(globalMovieArray));
        const storedMovies = JSON.parse(localStorage.getItem("globalMovieArray"));

        displayMovies(storedMovies);
        console.log(storedMovies);
    })
}