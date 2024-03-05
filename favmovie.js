const favmovie = JSON.parse(localStorage.getItem("favmovie"));
localStorage.setItem(`${favmovie.imdbID}`, JSON.stringify(favmovie));
localStorage.removeItem("favmovie");
let favcont = document.getElementById("fav-cont");


startLoadingPage();



function startLoadingPage(){

    let movie_list = getFavMovies();
       
    if(movie_list.length===0){
        favcont.innerHTML=`<p> No favorite movies yet....</p>`  
    } 
    else{
        loadFavMoviePage(movie_list)
    } 
}



function getFavMovies(){
    let arr=[];
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        let movie_obj = JSON.parse(localStorage.getItem(key));
        arr.push(movie_obj);
    }
    return arr;
}




function loadFavMoviePage(fav_movies){

    fav_movies.forEach(movieobj => {
        favcont.innerHTML += ` 
        <div class="fav-card">
        <h3 id="fav-title" class="position">${movieobj.Title}</h3>
        <h4 id="year" class="position">Release Year: ${movieobj.Year}</h4>
        <img id="favposter" alt="poster" src="${movieobj.Poster}"/><br>
        <h4 id="type" class="position">${movieobj.Type}</h4>
        <button class="delete" data-id="${movieobj.imdbID}">Remove</button> 
        </div>`
    });
    let delbttn = document.querySelectorAll(".delete");
    delbttn.forEach(btn=>{
        btn.addEventListener("click", removeFav);
    });
    
}

function removeFav(event)
{

    const movieId = String(event.target.dataset.id);
    localStorage.removeItem(movieId);
    favcont.innerHTML='';
    startLoadingPage();

}