//http://www.omdbapi.com/?apikey=fdf808da&s=${e.target.value}&plot=full`;
const movieContainer = document.getElementById("movieContainer");
const movieSearch = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const moviePopup = document.querySelector(".popup");
const movieList = [];

function getMovie() {
  fetch(
    `http://www.omdbapi.com/?apikey=fdf808da&s=${movieSearch.value}&plot=full`
  ).then((res) => {
    res.json().then((data) => {
      data.Search.map((movie) => {
        movieList.push(movie);
      });
      displayMovie();
    });
  });
}

function displayMovie() {
  movieList.map((movie) => {
    movieContainer.innerHTML += `
    <div class="card">
        <h2>${movie.Title}</h2>
      <img src="${movie.Poster}" alt="${movie.Title}"/>
      <p>Release date :  ${movie.Year}</p>
      <p class="imdb">${movie.imdbID}</p>
      <button class="infoButton">Détails</button>
    </div>
    `;
  });
  const infoButton = document.querySelectorAll(".infoButton");
  infoButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const movieId = e.target.previousElementSibling.textContent;
      fetch(
        `http://www.omdbapi.com/?apikey=fdf808da&i=${movieId}&plot=full`
      ).then((res) => {
        res.json().then((data) => {
          moviePopup.style.opacity = 1;
          moviePopup.style.visibility = "visible";
          moviePopup.style.transform = "scale(1)";
          moviePopup.innerHTML = `
            <h2>${data.Title}</h2>
            <img src="${data.Poster}" alt="${data.Title}"/>
            <p>${data.Year}</p>
            <p>${data.Plot}</p>
            <button class="closeButton">Fermer</button>
          `;
          const closeButton = document.querySelector(".closeButton");
          closeButton.addEventListener("click", (e) => {
            moviePopup.style.opacity = 0;
            moviePopup.style.visibility = "hidden";
            moviePopup.style.transform = "scale(0)";
          });
        });
      });
    });
  });
}

function resetMovie() {
  movieContainer.innerHTML = "";
  movieList.length = 0;
}

movieSearch.addEventListener("input", resetMovie);
searchButton.addEventListener("click", getMovie);
