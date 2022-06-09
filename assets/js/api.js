
// API Paths
const baseURL = "https://api.themoviedb.org"
const popularAPI = baseURL + "/3/movie/popular?api_key=" + api_key + "&page=";
const latestAPI = baseURL + "/3/movie/latest?api_key=" + api_key + "&language=en-US"
const posterAPI = "https://image.tmdb.org/t/p/original";

// Get all query of the selected element
function getContainer(string) {
   return document.querySelectorAll(string);
}

// const posterContainer = document.querySelectorAll(".poster-container");

// Call API for the number of Containers available
for (i = 0; i  < getContainer(".poster-container").length; i++) {
    callAPI(i+1, getContainer(".poster-container")[i]);
}

// Fetch API data for and print the card 
function callAPI (page, container) {
    fetch(popularAPI + page)
    .then(result => result.json())
    .then(film =>
        film.results.forEach((e) => {
            createCard (
                container,
                e.backdrop_path,
                e.title,
                e.id
                )
        })
    )
}

// Create Film Cards
function createCard(container, filmPoster, title, id) {
    let logoImage = ""; 
    let logoAPI = baseURL + "/3/movie/" + id + "/images?api_key=" + api_key;

    fetch(logoAPI)
    .then(result => result.json())
    .then(logo => {
    
    // Make Logo File Path
    if (logo.logos[0] != undefined) {
        logoImage = posterAPI + logo.logos[0].file_path;
    }
    
    
    // Make Image File Path
    filmPoster = posterAPI + filmPoster;

    // Add Code Snippet - Skip broken Film
    if (id != 831728) {
        container.innerHTML += `
        <div class="movie-poster">
            <img class="movie-logo" src="${logoImage}" alt="${title}">
            <img src="${filmPoster}" alt="${title}">
        </div>`
    }

}) // close Fetch
}