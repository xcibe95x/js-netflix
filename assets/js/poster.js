
let movie_Poster = document.querySelectorAll(".movie-poster");
let media_Player = document.querySelector(".media-player");
console.log(movie_Poster)

for(let i = 0; i < movie_Poster.length; i++){
    movie_Poster[i].addEventListener("mouseenter", function position (e){
        let rect = movie_Poster[i].getBoundingClientRect();
        media_Player.style.top = cumulativeOffset(movie_Poster[i]) + 'px';
        media_Player.style.left= rect.x + 'px';
        console.log(rect.x, rect.y);
        media_Player.style.display = "block";
    });   
}

media_Player.addEventListener("mouseleave", () => {media_Player.style.display = "none"});


function cumulativeOffset(element) {
    var top = 0;
    do {
        top += element.offsetTop  || 0;
        element = element.offsetParent;
    } while(element);

    return top
};