const MOVIE_ID = 338953;

const btnHover = document.querySelector(".card-more");
const dialogContainer = document.querySelector(".opacity-overlay");

btnHover.addEventListener("click", (outerEvent) => {
  outerEvent.stopPropagation();
  dialogContainer.parentElement.style.overflow = "hidden";
  dialogContainer.style.display = "block";

  document.body.addEventListener("click", closeDialogOnClickOut);
});

function closeDialogOnClickOut(e) {
  if (!dialogContainer.children[0].contains(e.target)) {
    dialogContainer.style.display = "none";
    dialogContainer.parentElement.style.overflow = "unset";
    document.body.removeEventListener("click", closeDialogOnClickOut);
  }
}

/**
 * Creates similar movie card generated using {@linkcode film} data and appends it to {@linkcode container}
 * @param {HTMLElement} container `HTMLElement` to append similar movie card
 * @param {object} film object containing film data
 */
function appendSimilarFilm(container, film) {
  fetchMovieLogo(film.id).then((logo) => {
    container.innerHTML += `
      <div class="card">
          <div class="card__img-wrapper">
              <img class="card__img" src="${posterAPI}${film.backdrop_path}" alt="backdrop img" />
              <img class="card__logo" src="${logo}" alt="" />
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
  });
}
