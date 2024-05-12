//https://omdbapi.com/?s=akanda&page=1&apikey=f61a306e
//https://www.omdbapi.com/?i=tt3896198&apikey=f61a306e
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

async function loadMovieListData(Title) {
    const url = `https://omdbapi.com/?s=${Title}&page=1&apikey=f61a306e`;
    const res = await fetch(`${url}`);
    const data = await res.json();
    
    if (data.Response == "True")
        displayListOfMovies(data.Search);
}

function findMovies() {
    let Title = (movieSearchBox.value).trim();
    if (Title.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovieListData(Title);
    }
    else
        searchList.classList.add('hide-search-list');

}

function displayListOfMovies(movies) {
    searchList.innerHTML = "";
    for (let ind = 0; ind < movies.length; ind++) {
        let Div = document.createElement('div');
        Div.dataset.id = movies[ind].imdbID;
        Div.classList.add('search-list-item');
        if (movies[ind].Poster != "N/A")
            moviePoster = movies[ind].Poster;
        else
            moviePoster = "image-not-found.jpg";

            Div.innerHTML = `
            <div class = "search-item-thumbnail">
                <img src = "${moviePoster}">
            </div>
            <div class = "search-item-info">
                <h3>${movies[ind].Title}</h3>
                <p>${movies[ind].Year}</p>
            </div>
            `;
            searchList.appendChild(Div);
    }
    loadMovieDetails();
}
function loadMovieDetails()
{
    const listOfMovies=searchList.querySelectorAll('.search-list-item');
    listOfMovies.forEach(movie=>{
        movie.addEventListener('click',async()=>{
            searchList.classList.add('hide-search-list');
            movieSearchBox.value="";
            const result=await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=f61a306e`);

            const allDetails=await result.json();
            displayMovieDetails(allDetails);
        });
    });
}
function displayMovieDetails(allDetails)
{
    resultGrid.innerHTML=`
    <div class="movie-poster">
        <img src = "${(allDetails.Poster != "N/A") ? allDetails.Poster : "image-not-found.jpg"}" alt = "movie poster">
    </div>
    <div class="movie-info">
        <h3 class = "movie-title">${allDetails.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${allDetails.Year}</li>
            <li class = "rated">imdbRating: ${allDetails.imdbRating}</li>
            <li class = "released">Released: ${allDetails.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${allDetails.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${allDetails.Writer}</p>
        <p class="runtime"><b>Runtime:</b>${allDetails.Runtime}</p>
        <p class = "actors"><b>Actors: </b>${allDetails.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${allDetails.Plot}</p>
        <p class = "language"><b>Language:</b> ${allDetails.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${allDetails.Awards}</p>
    </div>`;
}
window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});

