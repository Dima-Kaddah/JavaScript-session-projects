'use strict';
const searchStates = async (title, year) => {
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?s=${title}&y=${year}&apikey=b53b8825`,
    );
    const films = await res.json();
    let searchedFilms = films.Search;
    console.log(searchedFilms);
    searchedFilms.forEach(film => {
      const list = document.querySelector('#show-films');
      const row = document.createElement('tr');
      if (film.Poster === 'N/A') {
        film.Poster =
          'https://uh.edu/pharmacy/_images/directory-staff/no-image-available.jpg';
        row.innerHTML = `
      <td>${film.Title}</td>
      <td>${film.Year}</td>
      <td>${film.Type}</td>
      <td>${film.imdbID}</td>
      <td><img src="${film.Poster}" alt="poster"></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
        list.appendChild(row);
      } else {
        row.innerHTML = `
      <td>${film.Title}</td>
      <td>${film.Year}</td>
      <td>${film.Type}</td>
      <td>${film.imdbID}</td>
      <td><img src="${film.Poster}" alt="poster"></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
        list.appendChild(row);
      }
    });
  } catch (err) {
    let errDiv = document.createElement('ul');
    document.body.appendChild(errDiv);
    errDiv.innerText = err.message;
  }
};

document.querySelector('#films-form').addEventListener('submit', e => {
  //prevent actual submit
  e.preventDefault();
  clearSearch();
  const title = document.querySelector('#title').value;
  const year = document.querySelector('#year').value;

  if ((title && year === '') || (title && year)) {
    searchStates(title, year);
  } else {
    let errDiv = document.createElement('ul');
    document.body.appendChild(errDiv);
    errDiv.innerText = 'somthing wrong';
  }
  clearFields();
});

///clear and remove
function clearFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#year').value = '';
}
function clearSearch() {
  const movies = document.getElementById('show-films');
  movies.innerText = '';
}

function removeFilm(film, index) {
  const info = document.getElementsByTagName('td');
  if (info.film === film) {
    info.splice(index, 1);
  }
}

function deleteFilm(el) {
  if (el.classList.contains('delete')) {
    el.parentElement.parentElement.remove();
  }
}
document.querySelector('#show-films').addEventListener('click', e => {
  deleteFilm(e.target);
  removeFilm(e.target.parentElement.previousElementSibling.textContent);
});
