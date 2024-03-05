const inputtag = document.getElementById("input");
let resultcontainer = document.getElementById("result");

// fetchData fuction will control api calls and fetch data.......

async function fetchData(search, check, url) {
  try {
    let data = await fetch(
      `https://www.omdbapi.com/?apikey=56566858&${url}=${search}`
    );

    if (!data.ok) {
      throw new Error(`HTTP error! Status: ${data.status}`);
    }
    let response = await data.json();
    if (response.Response !== "False") {
      if (check === "keyup") {
        suggestionBar(response.Search); // calling the searchbar fuction to dispaly suggestions......
      } else if (check === "click") {
        redirectToMoviePage(response); // redirecting to the movie page......
      } else if (check === "addfav") {
        toFavMoviePage(response);
      }
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

// Adding keyup event listener to the search bar. when user release a key it will trigger fetchdata function......
console.log(window.location.pathname);
if (
  window.location.pathname === "/index.html" ||
  window.location.pathname === "/imdbProject2/"
) {
  inputtag.addEventListener("keyup", () => {
    resultcontainer.innerHTML = "";
    fetchData(inputtag.value, "keyup", "s");
  });
}

function suggestionBar(moviearr) {
  moviearr.forEach((element) => {
    resultcontainer.innerHTML += `<div class="lst-cont"><li class="list"><img class="poster" src=${element.Poster}> ${element.Title}</li><span class="movieid">${element.imdbID}</span><button class="fav">fav</button></div>`;
  });

  const movietitle = document.getElementsByClassName("lst-cont");
  const movietitlearr = [...movietitle];

  movietitlearr.forEach((movie) => {
    // for each movie title we are using eventlistener......
    let id = movie.querySelector(".movieid").textContent;
    movie.addEventListener("click", () => {
      // on clicking any list it redirect controls to fetch data.....
      fetchData(id, "click", "i");
    });
  });

  // favourite button //
  const favbutton = document.getElementsByClassName("fav");
  const favarr = [...favbutton];
  favarr.forEach((button) => {
    let id = button.parentElement.querySelector(".movieid").textContent;
    button.addEventListener("click", (event) => {
      fetchData(id, "addfav", "i"); // adding event listener for all the fav buttons in the list.....
      event.stopPropagation();
    });
  });
}

// ----Redirecting to movie-page-----//

function redirectToMoviePage(obj) {
  localStorage.setItem("movieinfo", JSON.stringify(obj)); // storing the clicked object in local storage so that we can use it in movie page
  window.location.href = "imdbmovie.html"; // redirecting to imdbmovie.html page......
}

// ---Redirecting to Favourate movie page---- //

function toFavMoviePage(favobj) {
  localStorage.setItem("favmovie", JSON.stringify(favobj)); // storing the clicked object in local storage
  window.location.href = "favmovie.html"; // redirecting to favmovie.html page......
}
