// API Paths
const baseURL = "https://api.themoviedb.org";
const popularAPI = baseURL + "/3/movie/popular?api_key=" + api_key + "&page=";
const latestAPI = baseURL + "/3/movie/upcoming?api_key=" + api_key + "&language=en-US&page=";
const topRatedAPI = baseURL + "/3/movie/top_rated?api_key=" + api_key + "&language=en-US&page=";
const posterAPI = "https://image.tmdb.org/t/p/original";
let paintedMovies = 0;
const TOT_MOVIES = 140;

// Get all query of the selected element
function getContainer(string) {
  return document.querySelectorAll(string);
}

// Call API for the number of Containers available
for (i = 0; i < getContainer(".poster-container").length; i++) {
  callAPI(i + 1, getContainer(".poster-container")[i], popularAPI);
}

// Populate Big Movie Posters
callAPI(1, getContainer(".big-poster-container")[0], latestAPI, 1);

// Populate TOP 10
callAPI(1, getContainer(".top-poster-container")[0], topRatedAPI, 2);

// Fetch API data for and print the card
function callAPI(page, container, api, cardType) {
  fetch(api + page)
    .then((result) => result.json())
    .then((film) => {
      film.results.forEach((e, i) => {
        createCard(container, e.backdrop_path, e.title, e.id, e.poster_path, cardType, i + 1, e.vote_average);
      });
    });
}

// Check if the Movie is High Rated
function Rating(factor) {
  if (factor >= 7.8) {
    return `<span class="top-ten"></span>`;
  } else {
    return ``;
  }
}

// Create Film Cards
function createCard(container, filmPoster, title, id, posterPath, cardType = 0, index, rating) {
  let logoImage = "";
  let logoAPI = baseURL + "/3/movie/" + id + "/images?api_key=" + api_key;

  fetch(logoAPI)
    .then((result) => result.json())
    .then((logo) => {
      // Make Logo File Path
      if (logo.logos[0] != undefined) {
        logoImage = posterAPI + logo.logos[0].file_path;
      }

      // Suppress alternative text for empty array
      let altTitle = title;
      if (logo.logos.length == 0) {
        altTitle = "";
      }

      // Regular Film Card
      if (cardType == 0) {
        // Add Code Snippet
        if (id != 831728) {
          container.innerHTML +=
            `
            <div id=${id} class="movie-poster">` +
            Rating(rating) +
            `
                <img class="movie-logo" src="${logoImage}" alt="${altTitle}">
                <img src="${posterAPI + filmPoster}" alt="${title}">
            </div>`;
        }
      }

      // Big Film Card
      if (cardType == 1) {
        // Add Code Snippet
        container.innerHTML += `
            <div id=${id} class="big-movie-poster">
            <img src="${posterAPI + posterPath}" width="300px" alt="New Amsterdam" />
            </div>`;
      }

      // Big Film Card
      if (cardType == 2 && index <= 10) {
        // Add Code Snippet
        container.innerHTML += `
            <div id=${id} order="${index}" class="movie-poster top10flex">
                <span class="numberstop">${index}</span>
                <img src="${posterAPI + posterPath}" alt="movietopimg" />
            </div>`;
        // Make top 10 ordered
        Array.from(container.children)
          .sort((a, b) => a.order - b.order)
          .forEach((e) => container.appendChild(e));
      }
      paintedMovies++;
      if (paintedMovies >= TOT_MOVIES) paintPlayer();
    }); // close Fetch
}
