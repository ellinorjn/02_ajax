const searchMovie = document.getElementById('searchMovie')
const searchMovieButton = document.getElementById('searchMovieButton')

let globalMovieArray = [];

function getSearchedMovie(movie){
    fetch('http://www.omdbapi.com/?apikey=da783fad&s=' + movie + '')
    .then((response) => response.json())
    .then(function (movies){
        //ha en tom array när man gör en ny sökning
        globalMovieArray.length=0;
        globalMovieArray.push(movies);
        //globalMovie = movies;
        console.log(movies)
        displayMovies(movies)
    })
    .catch(function (error) {
            console.log(error);
        })
    searchMovie.value = "";
}

searchMovie.addEventListener('keyup', function(e){
    const searchValue = searchMovie.value;
    if (e.keyCode === 13) {
        getSearchedMovie(searchValue)
    }
});

//getSearchedMovie();
/*searchMovie.addEventListener('keyup', function (e) {
    const searchValue = searchMovie.value;
    if (e.keyCode === 13) {
        getSearchedMovie(searchValue)
    }
});*/

//searchMovieButton.addEventListener('click', getSearchedMovie)




/*
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
}*/


const movieInformation = document.getElementById('movieInformation')

function displayMovies(movies){
    console.log(globalMovieArray);
    let test = globalMovieArray[0].Search;
    let movieTitle = '';
    for(i=0; i < test.length; i++){
        movieTitle += `<li>${movies.Search[i].Title}</li>`
        movieInformation.innerHTML = movieTitle
        console.log(movies.Search[i].Title);
    }
}
    
    /*
    for(i = 0; i < movies.length; i++){
    const movieInfo = document.createTextNode(`${movies.Title[i]}`)
    //let movieInfo = `<h2>${movies.Title[i]}</h2>`        
    movieInformation.appendChild(movieInfo);
}}*/

/* Read more button 
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
}*/