let movieSections = document.querySelectorAll(".movie-section");

// TODO: 1) aggiustare quantità dello scroll
// 2) comparsa bottoni quando si puo scrollare
// 3) fixare altezza bottone bigpostarcontainer e top10container
for (let i = 0; i < movieSections.length; i++) {
  var dx = document.createElement("button");
  dx.classList.add("buttonDx", "sliderButton");
  var sx = document.createElement("button");
  sx.classList.add("buttonSx", "sliderButton");
  var dxArrow = document.createElement("i");
  dxArrow.className = "far fa-chevron-right fa-2xl";
  var sxArrow = document.createElement("i");
  sxArrow.className = "far fa-chevron-left fa-2xl";

  dx.appendChild(dxArrow);
  sx.appendChild(sxArrow);
  movieSections[i].append(dx, sx);
  dx.addEventListener("click", () => {
    movieSections[i].firstElementChild.scrollLeft += 400;
  });
  sx.addEventListener("click", () => {
    movieSections[i].firstElementChild.scrollLeft -= 400;
  });
}
