const MOVIE_ID = 338953;
const BASE_URL = "https://api.themoviedb.org";
const posterAPI = "https://image.tmdb.org/t/p/original";

const container = document.getElementById("similar-movies");

window.addEventListener("load", (e) => {
  fetchSimilarMovies(MOVIE_ID);
});

async function fetchSimilarMovies(movieId) {
  let response = await fetch(BASE_URL + "/3/movie/" + movieId + "/similar" + "?api_key=" + api_key);
  let data = await response.json();
  data.results.forEach((el) => appendSimilarFilm(container, el));
}

async function appendSimilarFilm(container, film) {
  response = await fetch(BASE_URL + "/3/movie/" + film.id + "/images?api_key=" + api_key);
  let image = await response.json();
  let imgPath = "";
  if (image.logos[0] != undefined) imgPath = posterAPI + image.logos[0].file_path;
  container.innerHTML += `
        <div class="card">
            <div class="card__img-wrapper">
                <img class="card__img" src="${posterAPI}${film.backdrop_path}" alt="backdrop img" />
                <img class="card__logo" src="${imgPath}" alt="" />
            </div>
            <div class="card__body">
                <div class="card__controls">
                    <span class="maturity-number">VM14</span>
                    <span class="thin">${film.release_date.substr(0, 4)}</span>
                    <button class="dialog__button button--round-dark">
                        <i class="far fa-plus"></i>
                    </button>
                </div>
                <p class="grey">
                    ${film.overview}
                </p>
            </div>
        </div>
    `;
}
