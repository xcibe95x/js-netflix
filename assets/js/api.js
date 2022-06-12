// API Paths
const baseURL = "https://api.themoviedb.org";
const popularAPI = baseURL + "/3/movie/popular?api_key=" + api_key + "&page=";
const latestAPI = baseURL + "/3/movie/upcoming?api_key=" + api_key + "&language=en-US&page=";
const topRatedAPI = baseURL + "/3/movie/top_rated?api_key=" + api_key + "&language=en-US&page=";
const posterAPI = "https://image.tmdb.org/t/p/original";
const TOT_MOVIES = 140;
let paintedMovies = 0;

const posterContainer = document.querySelectorAll(".poster-container");
const bigContainer = document.querySelector(".big-poster-container");
const top10Container = document.querySelector(".top-poster-container");

// Call API for the number of Containers available
for (i = 0; i < posterContainer.length; i++) {
  // creo 6 card grigie e le appendo a poster container
  for (j = 0; j < 7; j++) {
    posterContainer[i].innerHTML += `<div class='card__placeholder' id='placeholder-${i * 7 + j}'></div>`;
  }
  callAPI(i + 1, posterContainer[i], popularAPI);
}

// for (j = 0; j < 7; j++) {
//   bigContainer.innerHTML += "<div class='card__placeholder'></div>";
//   top10Container.innerHTML += "<div class='card__placeholder'></div>";
// }

const placeholders = document.querySelectorAll(".card__placeholder");

// Populate Big Movie Posters
callAPI(1, bigContainer, latestAPI, 1);

// Populate TOP 10
callAPI(1, top10Container, topRatedAPI, 2);

// Fetch API data for and print the card
function callAPI(page, container, api, cardType) {
  fetch(api + page)
    .then((result) => result.json())
    .then((film) => {
      film.results.forEach((e, i) => {
        createCard(container, e.backdrop_path, e.title, e.id, e.poster_path, cardType, i + 1, e.vote_average, page - 1);
      });
    });
}

// Check if the Movie is High Rated
function Rating(factor) {
  if (factor >= 7.8) {
    return `<span class="top-ten-label"></span>`;
  } else {
    return ``;
  }
}

// Create Film Cards
function createCard(container, filmPoster, title, id, posterPath, cardType = 0, index, rating, rowIndex) {
  fetchMovieLogo(id)
    .then((logo) => {
      // get row placeholders

      // Regular Film Card
      if (cardType == 0 && filmPoster != null) {
        let moviePoster = document.createElement("div");
        moviePoster.id = id;
        moviePoster.className = "movie-poster";

        let img = new Image();
        if (index < 8)
          img.addEventListener("load", () => {
            document.getElementById("placeholder-" + (rowIndex * 7 + (index - 1))).remove();
          });
        img.src = posterAPI + filmPoster;
        img.alt = title;

        let logoElement = new Image();
        logoElement.src = logo;
        logoElement.className = "movie-logo";

        moviePoster.append(logoElement, img);
        moviePoster.innerHTML += Rating(rating);
        container.append(moviePoster);
      }
      if (filmPoster == null && index < 8) {
        document.getElementById("placeholder-" + (rowIndex * 7 + (index - 1))).remove();
      }

      // Big Film Card
      if (cardType == 1) {
        // Add Code Snippet
        container.innerHTML += `
          <div id="${id}" class="big-movie-poster">
          <img src="${posterAPI + posterPath}" width="300px" />
          </div>`;
      }

      // Big Film Card
      if (cardType == 2 && index <= 10) {
        // Add Code Snippet
        container.innerHTML += `
          <div id="${id}" order="${index}" class="movie-poster top10flex">
              <span class="numberstop">${index}</span>
              <img src="${posterAPI + posterPath}" alt="movietopimg" />
          </div>`;

        // Make top 10 ordered
        Array.from(container.children)
          .sort((a, b) => a.getAttribute("order") - b.getAttribute("order"))
          .forEach((e) => container.appendChild(e));
      }
    })
    .finally(() => {
      paintedMovies++;
      if (paintedMovies >= TOT_MOVIES) paintPlayer();
    });
}

/**
 * Fetches logo for movie with id {@linkcode movieId} if exists
 * @param {number | string} movieId
 * @returns A `Promise<string>` with the logo path if it exists, empty string otherwise.
 */
async function fetchMovieLogo(movieId) {
  response = await fetch(baseURL + "/3/movie/" + movieId + "/images?api_key=" + api_key);
  let imgData = await response.json();
  let path = "";
  if (imgData.logos != undefined && imgData.logos.length > 0) path = posterAPI + imgData.logos[0].file_path;

  return path;
}

/**
 * Fetches data for the movie with id {@linkcode movieId} then returns it as a `Promise`
 * @param {string | number} id Id of the movie of which data must be fetched
 * @returns Movie data as a `Promise`
 */
async function fetchMovieData(movieId) {
  let result = await fetch(baseURL + "/3/movie/" + movieId + "?api_key=" + api_key);
  return result.json();
}

/**
 * Fetches similar movies data relative to movie with id {@linkcode movieId}
 * @param {number | string} movieId
 * @returns Similar movies data as a `Promise`
 */
async function fetchSimilarMovies(movieId) {
  let response = await fetch(baseURL + "/3/movie/" + movieId + "/similar" + "?api_key=" + api_key);
  return response.json();
}

/**
 * Fetches cast data relative to movie with id {@linkccode movieId}
 * @param {string | number} movieId id to fetch cast for
 * @returns object describing cast members
 */
async function fetchCast(movieId) {
  let response = await fetch(baseURL + "/3/movie/" + movieId + "/credits" + "?api_key=" + api_key);
  return response.json();
}
