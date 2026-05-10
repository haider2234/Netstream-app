function openApp(){

document.getElementById(
"adScreen"
).style.display="none";

document.getElementById(
"mainApp"
).style.display="block";

loadTrending();

}

/* API */

const API_KEY = "8f9379547640fdbc82f33a2cdc6dbe0d";

/* LOAD TRENDING */

async function loadTrending(){

const response = await fetch(

`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`

);

const data = await response.json();

showMovies(data.results);

startSlider(data.results);

}

/* SHOW MOVIES */

function showMovies(movies){

const row =
document.querySelector(".movieRow");

row.innerHTML = "<div class='skeleton' style='height:200px'></div>".repeat(5);

movies.forEach(movie=>{

const poster =

`https://image.tmdb.org/t/p/w500${movie.poster_path}`;

row.innerHTML += `

<div class="movieCard">

<img src="${poster}">

<div class="movieInfo">

<h3>${movie.title}</h3>

<button onclick="playFromTMDB('${movie.id}')">
▶ Watch
</button>

'${movie.title}',

'${poster}',

\`${movie.overview}\`

)">

Details

</button>

</div>

</div>

`;

});

}

/* SEARCH */

async function searchMovies(query){

const response = await fetch(

`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`

);

const data = await response.json();

showMovies(data.results);

}

/* SEARCH INPUT */

document.addEventListener(
"input",
function(e){

if(e.target.id==="searchInput"){

searchMovies(e.target.value);

}

}
);

/* DETAILS POPUP */

function openDetails(title,image,overview){

document.getElementById(
"detailsPopup"
).style.display="flex";

document.getElementById(
"popupTitle"
).innerText = title;

document.getElementById(
"popupImage"
).src = image;

document.getElementById(
"popupOverview"
).innerText = overview;

/* SAVE CONTINUE WATCHING */

localStorage.setItem(
"lastMovie",
title
);

}

/* CLOSE POPUP */

function closeDetails(){

document.getElementById(
"detailsPopup"
).style.display="none";

}

/* SLIDER */

function startSlider(movies){

let index = 0;

setInterval(() => {

if(!movies || movies.length === 0) return;

const movie = movies[index];

if(movie.backdrop_path){

document.querySelector(".hero").style.backgroundImage =

`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

}

document.getElementById("heroTitle").innerText = movie.title;

document.getElementById("heroDesc").innerText =

movie.overview ? movie.overview.slice(0,120) + "..." : "";

index++;

if(index >= movies.length) index = 0;

}, 4000);

}

/* DOWNLOAD BUTTON */

function downloadMovie(){

alert(
"Download feature coming soon"
);

}

/* WATCH */

function watchMovie(){

alert(
"Add your own streaming link here"
);

}
window.onload = function(){

const lastMovie =
localStorage.getItem(
"lastMovie"
);

if(lastMovie){

document.getElementById(
"continueMovie"
).innerText =
lastMovie;

}

}
async function loadByCategory(id){

const url =

`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`;

const res = await fetch(url);

const data = await res.json();

showMovies(data.results);

}
function watchFromMovie(title){

localStorage.setItem("lastMovie", title);

alert("Streaming link system coming next step");

}
function saveFavorite(title){

let favs = JSON.parse(localStorage.getItem("favs")) || [];

favs.push(title);

localStorage.setItem("favs", JSON.stringify(favs));

alert("Added to favorites");

}
if('serviceWorker' in navigator){

navigator.serviceWorker.register('service-worker.js')

.then(()=>console.log("SW Registered"));

}
function addFavorite(movie){

let favs = JSON.parse(localStorage.getItem("favs")) || [];

favs.push(movie);

localStorage.setItem("favs", JSON.stringify(favs));

alert("Added to Favorites");

}

function showFavorites(){

let favs = JSON.parse(localStorage.getItem("favs")) || [];

const row = document.querySelector(".movieRow");

row.innerHTML = "";

favs.forEach(title=>{

row.innerHTML += `

<div class="movieCard">

<div class="movieInfo">

<h3>${title}</h3>

</div>

</div>

`;

});

}
async function playFromTMDB(id){

alert("We will attach real streaming server next step");

console.log("Movie ID:", id);

}
function saveContinue(movie){

localStorage.setItem("continue", movie);

}

window.onload = () => {

let c = localStorage.getItem("continue");

if(c){

document.getElementById("continueMovie").innerText = c;

}

}