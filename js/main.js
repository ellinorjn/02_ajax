const searchMovie = document.getElementById('searchMovie')
const searchMovieButton = document.getElementById('searchMovieButton')

let globalMovieArray = [];

function getSearchedMovie(movie){
    fetch('http://www.omdbapi.com/?apikey=da783fad&s=' + movie + '')
    .then((response) => response.json())
    .then(function (movies){
        //Make sure the array is ampty when doing a new search
        globalMovieArray.length=0;
        globalMovieArray.push(movies);
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

//searchMovieButton.addEventListener('click', getSearchedMovie)

const movieInformation = document.getElementById('movieInformation')

function displayMovies(movies){
    console.log(globalMovieArray);
    let searchedMovies = globalMovieArray[0].Search;
    for(i=0; i < searchedMovies.length; i++){
        let movieTitleListed = document.createElement('li');
        let movieTitle = document.createTextNode(`${movies.Search[i].Title}`)
        movieTitleListed.appendChild(movieTitle);
        movieInformation.appendChild(movieTitleListed);
        
        buttonForMoreInformation()
        console.log(movies.Search[i].Title);
    }
}

function buttonForMoreInformation(){
    const moreInformationButton = document.createElement('button');
    moreInformationButton.className = "moreInformationButton";
    const textMoreInformationButton = document.createTextNode('More info.')
    moreInformationButton.appendChild(textMoreInformationButton)
    movieInformation.appendChild(moreInformationButton);
    
    moreInformationButton.addEventListener('click', function(){
        console.log("hellu");
    })
}

/*function getMovieImdbId(){
    fetch('http://www.omdbapi.com/?apikey=da783fad&i=' + NÅGONTING HÄR +'')
          .then((response) => json())
          .then ((imdbId) => {
          console.log(imdbID);
          })
}*/
