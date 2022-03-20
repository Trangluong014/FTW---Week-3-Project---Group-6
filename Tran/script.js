let loading = false;
const API_KEY = "60b77d80b6msh38935893ac98d64p18f42fjsn3bb96f0430a1";
let inputGenres = "";
let inputTag = "";
let baseURL = "https://cs-steam-api.herokuapp.com/games";
const display = document.querySelector("#display");
const displayTitle = document.querySelector("#displayTitle");

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
    const url = `${baseURL}?steamspy_tags=${inputTag}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    console.log("data", gamedata);
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

const getSingleGame = async (appID) => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/single-game/${appID}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    console.log("data", gamedata);
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

getSingleGame(359550);

function renderGames(inputdata) {
  display.innerHTML = "";

  inputdata.data.forEach((data, index) => {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `<div class="game_wrapper">
    <div class="cover" id="${data.appid}">
    <img
    src="${data.header_image}"
    />
    <div class="game_info">
    <p>${data.name}</p>
    <p>${data.price}</p>
    </div>
    </div>
    </div>`;
    display.appendChild(newDiv);
  });
  const gamesCover = document.querySelectorAll(".cover");
  gamesCover.forEach((gameCover) =>
    gameCover.addEventListener("click", () => {
      singleGame(gameCover);
    })
  );
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
    const ulGenresList = document.getElementById("category-list");
    genresData.data.forEach((data, index) => {
      const x = document.createElement("li");
      x.innerHTML = `
            <div class="li-wrapper">
                <div class="li-title genres-name">${data.name.toUpperCase()}</div>
            </div>`;
      //Then append them to the `ul` element
      ulGenresList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
  const genresLine = document.querySelectorAll(".genres-name");
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
    const ulTagsList = document.getElementById("tags-list");
    tagdata.data.forEach((data, index) => {
      const x = document.createElement("li");
      x.innerHTML = `
            <div class="li-wrapper">
                <div class="li-title tag-name">${data.name.toUpperCase()}</div>
            </div>`;
      //Then append them to the `ul` element
      ulTagsList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
  const tagLine = document.querySelectorAll(".tag-name");
  tagLine.forEach((tagLine) => tagLine.addEventListener("click", filterByTag));
};
renderTag();

async function filterByGenres(e) {
  console.log(e);
  inputGenres = e.target.innerText.toLowerCase();
  displayTitle.innerHTML = `Category: ${inputGenres.toUpperCase()}`;
  renderGames(await getGameByGenres(inputGenres));
}

async function filterByTag(e) {
  console.log(e);
  inputTag = e.target.innerText.toLowerCase();
  displayTitle.innerHTML = `Tag: ${inputTag.toUpperCase()}`;
  renderGames(await getGameByTag(inputTag));
}

async function searchGame() {
  const inputSearch = document.querySelector("#searchForm");
  displayTitle.innerHTML = `Search: ${inputSearch.value}`;
  console.log(inputSearch);
  renderGames(await getGameBySearch(inputSearch.value));
}

const searchbtn = document.querySelector("#store_search_link");
searchbtn.addEventListener("click", searchGame);

const renderDetail = (inputdata) => {
  console.log(inputdata);
  display.innerHTML = "";
  displayTitle.innerHTML = `${inputdata.data.name}`;
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="showing_game show_detail">
    <div class="title_contain ">
    <div class="title">${inputdata.data.name}</div>
    <div class="price">${inputdata.data.price}</div>
    </div>
    <div class="img_detail">
    <img
    src="${inputdata.data.header_image}"
    alt="${inputdata.data.name}"
    />
    <div class="game_details">
    <div class="game_description">${inputdata.data.description}</div>
    <div class="game_informations">
    <div>RELEASE DATE:  ${inputdata.data.release_date}</div>
    <div>DEVELOPER:  ${inputdata.data.developer}</div>
    </div>
    </div>
    </div>
    <div class="tags_contain">
    Popular user-defined tags for this product:
    <div class="tags">
    <div class="tag">${inputdata.data.steamspy_tags
      .map((item) => "<a>" + item + "</a>")
      .join("")}</div>
    </div>
    </div>
    </div>
    </div>
    `;
  display.appendChild(newDiv);
};

async function singleGame(e) {
  console.log(e);
  const inputAppId = e.getAttribute("id");
  console.log(inputAppId);
  renderDetail(await getSingleGame(inputAppId));
}
