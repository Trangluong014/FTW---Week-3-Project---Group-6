let inputGenres = "";
let inputTag = "";
let baseURL = "https://cs-steam-api.herokuapp.com/games";

const getAllGameData = async () => {
  try {
    const url = `${baseURL}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

const onLoad = async () => {
  renderGames(await getAllGameData());
};
onLoad();

const getGameByGenres = async (inputGenres) => {
  try {
    const url = `${baseURL}?genres=${inputGenres}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    console.log("data", gamedata);
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

const getGameByTag = async (inputTag) => {
  try {
    const url = `${baseURL}&steamspy_tags=${inputTag}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    console.log("data", gamedatata);
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

const getGameBySearch = async (inputSearch) => {
  try {
    const url = `${baseURL}?q=${inputSearch}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    console.log("data", gamedata);
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

function renderGames(inputdata) {
  const gamesList = document.getElementById("games-list");
  const ulGamesList = gamesList.children[1];
  ulGamesList.innerHTML = "";
  console.log(inputdata);
  inputdata.data.forEach((data, index) => {
    const x = document.createElement("li");
    x.innerHTML = `<div class="bullet">${index + 1}</div>
          <div class="li-wrapper">
              <div class="li-title">${data.name}</div>
              <div class="li-text">Game Tag 
              <div class="tag-list">${data.steamspy_tags
                .map((item) => "<button>" + item + "</button>")
                .join("")}</div>
              </div>
          </div>`;
    ulGamesList.appendChild(x);

    //const tagList = document.querySelectorAll(".tag-list");
    //tagList.forEach((btnchildren) =>
    //btnchildren.forEach((btnchild) => (btnchild.className = "tag-name"))
    //);
  });
}

const getAllGenres = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/genres`;
    const res = await fetch(url);
    const genresData = await res.json();
    console.log("data", genresData);
    return genresData;
  } catch (err) {
    console.log("err", err);
  }
};

const renderGenres = async () => {
  try {
    const genresData = await getAllGenres();
    const genresList = document.getElementById("genres-list");
    const ulGenresList = genresList.children[1];
    genresData.data.forEach((data, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title genres-name">${data.name}</div>
            </div>`;
      //Then append them to the `ul` element
      ulGenresList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
  genresLine = document.querySelectorAll(".genres-name");
  genresLine.forEach((genreLine) =>
    genreLine.addEventListener("click", filterByGenres)
  );
};
renderGenres();

const getAllTag = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/steamspy-tags`;
    const res = await fetch(url);
    const tagdata = await res.json();
    console.log("data", tagdata);
    return tagdata;
  } catch (err) {
    console.log("err", err);
  }
};

const renderTag = async () => {
  try {
    const tagdata = await getAllTag();
    const tagsList = document.getElementById("tags-list");
    const ulTagsList = tagsList.children[1];
    tagdata.data.forEach((data, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title tag-name">${data.name}</div>
            </div>`;
      //Then append them to the `ul` element
      ulTagsList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
  tagLine = document.querySelectorAll(".tag-name");
  tagLine.forEach((tagLine) =>
    tagLine.addEventListener("click", filterByGenres)
  );
};
renderTag();

async function filterByGenres(e) {
  console.log(e);
  inputGenres = e.target.innerText;
  renderGames(await getGameByGenres(inputGenres));
}

async function filterByTag(e) {
  console.log(e);
  inputTag = e.target.innerText;
  renderGames(await getGameByTag(inputTag));
}

async function searchGame() {
  const inputSearch = document.querySelector("#name-query");
  console.log(inputSearch);
  renderGames(await getGameBySearch(inputSearch.value));
}

const searchbtn = document.querySelector("#search-btn");
searchbtn.addEventListener("click", searchGame);
