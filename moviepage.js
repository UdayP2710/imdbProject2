let moviepagediv = document.getElementById("movie-cont");
const movieinfo = JSON.parse(localStorage.getItem("movieinfo"));   // Converting string type to object type from local storage.....
localStorage.removeItem("movieinfo");
displayMoviePage(movieinfo);


//  -----Content Display Function inside Movie Page----  //


function displayMoviePage(movieobj)
{
    moviepagediv.innerHTML = `
    <h1 id="title" class="position">${movieobj.Title}</h1>
    <h4 id="year" class="position">Release Year: ${movieobj.Year}</h4>
    <img id="poster" alt="poster" src="${movieobj.Poster}"/><br>
    <span class="commoninfo">${movieobj.Released}</span>
    <br>
    <span class="commoninfo">duration:  ${movieobj.Runtime}</span>
    <br>
    <span class="commoninfo">${movieobj.Genre}</span>
    <p class="plot position">${movieobj.Plot}</p>
    <h4 id="type" class="position">${movieobj.Type}</h4>
    `
}