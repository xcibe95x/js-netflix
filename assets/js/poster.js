<<<<<<< HEAD
<<<<<<< HEAD
function paintPlayer() {
  let movie_Poster = document.querySelectorAll(".movie-poster");
  let media_Player = document.querySelector(".media-player");
=======
let movie_Poster = document.querySelectorAll(".movie-poster");
let media_Player = document.querySelector(".media-player");
console.log(movie_Poster);
>>>>>>> parent of e5b23c7 (fetching?)

for (let i = 0; i < movie_Poster.length; i++) {
  movie_Poster[i].addEventListener("mouseenter", function position(e) {
    let rect = movie_Poster[i].getBoundingClientRect();
    media_Player.style.top = cumulativeOffset(movie_Poster[i]) + "px";
    media_Player.style.left = rect.x + "px";
    media_Player.style.display = "block";
  });
}

<<<<<<< HEAD
=======
let movie_Poster = document.querySelectorAll(".movie-poster");
let media_Player = document.querySelector(".media-player");
console.log(movie_Poster);

for (let i = 0; i < movie_Poster.length; i++) {
  movie_Poster[i].addEventListener("mouseenter", function position(e) {
    let rect = movie_Poster[i].getBoundingClientRect();
    media_Player.style.top = cumulativeOffset(movie_Poster[i]) + "px";
    media_Player.style.left = rect.x + "px";
    media_Player.style.display = "block";
  });
}

=======
>>>>>>> parent of e5b23c7 (fetching?)
media_Player.addEventListener("mouseleave", () => {
  media_Player.style.display = "none";
});

<<<<<<< HEAD
>>>>>>> f0be276b1a1472f525d4ac82e97bbef4c47deec9
=======
>>>>>>> parent of e5b23c7 (fetching?)
function cumulativeOffset(element) {
  var top = 0;
  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);

  return top;
}
