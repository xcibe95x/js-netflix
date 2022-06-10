let movieposters = document.querySelectorAll(".movie-section");

// TODO: 1) aggiustare quantità dello scroll
// 2) comparsa bottoni quando si puo scrollare
// 3) fixare icona
// 4) fixare altezza bottone bigpostarcontainer e top10container
for (let i = 0; i < movieposters.length; i++) {
  var dx = document.createElement("button");
  dx.classList.add("buttonDx", "sliderButton");
  var sx = document.createElement("button");
  sx.classList.add("buttonSx", "sliderButton");
  var dxArrow = document.createElement("i");
  dxArrow.className = "far fa-chevron-right";
  var sxArrow = document.createElement("i");
  sxArrow.className = "far fa-chevron-left";
  dx.appendChild(dxArrow);
  sx.appendChild(sxArrow);
  movieposters[i].append(dx, sx);
  dx.addEventListener("click", () => {
    movieposters[i].firstElementChild.scrollLeft += 150;
  });
  sx.addEventListener("click", () => {
    movieposters[i].firstElementChild.scrollLeft -= 150;
  });
}
