function paintPlayer() {
  let movie_Poster = document.querySelectorAll(".movie-poster");
  let media_Player = document.querySelector(".media-player");
  let runtime = document.querySelector(".compatible > span:last-child");

  let apiTimer;
  let mediaPlayerShowTimer;

  for (let i = 0; i < movie_Poster.length; i++) {
    movie_Poster[i].addEventListener("mouseenter", function position(e) {
      const id = e.target.id;
      // wait 1 sec before calling api
      apiTimer = setTimeout(() => {
        // fetch movie data then fills the card
        let movieDataPromise = fetchMovieData(id);
        movieDataPromise.then((data) => {
          // fill media player with data
          media_Player.children[0].src = posterAPI + data.backdrop_path;
          data.genres.forEach((genre) => {
            media_Player.children[3].innerHTML += `
            <span>${genre.name}</span>
            `;
          });
          runtime.innerText = formatRuntime(data.runtime);
        });
      }, 700);
      //wait 2 sec before showing
      mediaPlayerShowTimer = setTimeout(() => {
        let rect = movie_Poster[i].getBoundingClientRect();
        media_Player.style.top = cumulativeOffset(movie_Poster[i]) + "px";
        media_Player.style.left = rect.x + "px";
        media_Player.style.display = "block";
      }, 1000);
    });

    // if the card has not appeared yet and the user mouseleaves the movieposter,
    // then the intervals must be cleared
    movie_Poster[i].addEventListener("mouseleave", () => {
      // check if timer is set, then clears it
      if (apiTimer != undefined) {
        clearTimeout(apiTimer);
        clearTimeout(mediaPlayerShowTimer);
      }
    });
  }

  media_Player.addEventListener("mouseleave", (e) => {
    // hide card
    media_Player.style.display = "none";
    media_Player.children[3].innerHTML = "";
    runtime.innerText = "";
  });
}

async function fetchMovieData(id) {
  let result = await fetch(baseURL + "/3/movie/" + id + "?api_key=" + api_key);
  return result.json();
}

function cumulativeOffset(element) {
  var top = 0;
  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);

  return top;
}

/**
 * Convert number of minutes to a formattet string of type "xxHyyM" that represents the movie runtime.
 * @param {number} minutes number of minutes
 * @return {string} formatted string
 */
function formatRuntime(minutes) {
  return "" + Math.floor(minutes / 60) + "h " + (minutes % 60) + "min";
}
