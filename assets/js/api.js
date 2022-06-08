
popularAPI = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key;
posterAPI = "https://image.tmdb.org/t/p/original";

let posterContainer = document.querySelector(".poster-container");

    fetch(popularAPI)
    .then(result => result.json())
    .then(film =>
        film.results.forEach((e) => createCard(e.backdrop_path))
    );

function createCard(filmPoster) {
    filmPoster = posterAPI + filmPoster;
    posterContainer.innerHTML += `
    <div class="movie-poster">
        <span class="top-ten"></span>
        <img src="${filmPoster}" alt="New Amsterdam">
    </div>`
}