
popularAPI = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key;
posterAPI = "https://image.tmdb.org/t/p/original";

let posterContainer = document.querySelectorAll(".poster-container");

    fetch(popularAPI)
    .then(result => result.json())
    .then(film =>
        film.results.forEach((e) => {
            createCard(
                e.backdrop_path,
                e.title
                )
        })
    );

function createCard(filmPoster, title) {
    filmPoster = posterAPI + filmPoster;
    
    for (i = 0; i <= posterContainer.length; i++) {
    posterContainer[i].innerHTML += `
    <div class="movie-poster">
        <span class="top-ten"></span>
        <span class="movie-title">${title}</span>
        <img src="${filmPoster}" alt="${title}">
    </div>`
    }
}