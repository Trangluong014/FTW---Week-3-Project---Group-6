let loading = false;
let inputGenres = "";
let inputTag = "";
let baseURL = "https://cs-steam-api.herokuapp.com/games?limit=33";
const display = document.querySelector("#display");
const displayTitle = document.querySelector("#displayTitle");

//Functions to get Data from API Back End
//1. Get All Game in General

const getAllGameData = async () => {
  if (loading) return;
  display.innerHTML = `<div class="loader"> Loading ...</div>`;
  try {
    loading = true;
    const url = `${baseURL}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    loading = false;
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

// 2. Get games filter by genres (category) when user click in category name

const getGameByGenres = async (inputGenres) => {
  if (loading) return;
  display.innerHTML = `<div class="loader"> Loading ...</div>`;
  try {
    loading = true;
    const url = `${baseURL}&genres=${inputGenres}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    console.log("data", gamedata);
    loading = false;
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

//2. Get Game by tag when user click in tag name

const getGameByTag = async (inputTag) => {
  if (loading) return;
  display.innerHTML = `<div class="loader"> Loading ...</div>`;
  try {
    loading = true;
    const url = `${baseURL}&steamspy_tags=${inputTag}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    console.log("data", gamedata);
    loading = false;
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

//3. Get games data when user search by name:

const getGameBySearch = async (inputSearch) => {
  if (loading) return;
  display.innerHTML = `<div class="loader"> Loading ...</div>`;
  try {
    loading = true;
    const url = `${baseURL}&q=${inputSearch}`;
    const res = await fetch(url);
    const gamedata = await res.json();
    console.log("data", gamedata);
    loading = false;
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

//4. get data of single Game when user click in any games
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

//5. Get Featured Games when click in top trending:

const getFeaturedGames = async () => {
  try {
    const url = "https://cs-steam-api.herokuapp.com/features";
    const res = await fetch(url);
    const gamedata = await res.json();
    console.log("data", gamedata);
    return gamedata;
  } catch (err) {
    console.log("err", err);
  }
};

async function featuredGame() {
  displayTitle.innerHTML = `<h1 class="featured-title">Featured Games</h1>
  <h6 class="featured-titleh6"> <i>10 Featured games by highest differences between positive_ratings and negative_ratings</i></h6>`;
  renderFeturedGames(await getFeaturedGames());
}

// Functions to render data to website:

//1. Render games base on input data of get games functions

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
    <p>$${data.price}</p>
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

function renderFeturedGames(inputdata) {
  display.innerHTML = "";

  inputdata.data.forEach((data, index) => {
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `<div class="game_wrapper">
    <div class="cover" id="${data.appid}">
    <img
    src="${data.header_image}"
    />
    <div class="game_info">
    <p>${data.name} - Price: $${data.price}</p>
    <p>Negative rating: ${data.negative_ratings} 
    </br> Positive rating: ${data.positive_ratings}</p>
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
//Loading all Game when open/refresh page
const onLoad = async () => {
  displayTitle.innerHTML = `Gamers Heaven`;
  renderGames(await getAllGameData());
};
onLoad();

// Get data of Genres and render when open/refresh page:

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

//Get data of tags and render when open/refresh page:

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

//Handler functions:
//1. Click in Genres name:

async function filterByGenres(e) {
  console.log(e);
  inputGenres = e.target.innerText.toLowerCase();
  displayTitle.innerHTML = `Category: ${inputGenres.toUpperCase()}`;
  renderGames(await getGameByGenres(inputGenres));
}

//2. Click in Tag name:
async function filterByTag(e) {
  console.log(e);
  inputTag = e.target.innerText.toLowerCase();
  displayTitle.innerHTML = `Tag: ${inputTag.toUpperCase()}`;
  renderGames(await getGameByTag(inputTag));
}

//3. Search:
async function searchGame() {
  const inputSearch = document.querySelector("#searchForm");
  displayTitle.innerHTML = `Search: ${inputSearch.value}`;
  console.log(inputSearch);
  renderGames(await getGameBySearch(inputSearch.value));
}

const searchbtn = document.querySelector("#store_search_link");
searchbtn.addEventListener("click", searchGame);

//4. CLick in any games:
const renderDetail = (inputdata) => {
  console.log(inputdata);
  display.innerHTML = "";
  displayTitle.innerHTML = `${inputdata.data.name}`;
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="showing_game show_detail">
    <div class="title_contain ">
    <div class="title">${inputdata.data.name}</div>
    <div class="price">$${inputdata.data.price}</div>
    </div>
    <div class="img_detail" style="background-image: url(${
      inputdata.data.background
    })">
    <img
    src="${inputdata.data.header_image}"
    alt="${inputdata.data.name}"
    />
    <div class="game_details">
    <div class="game_description"><span class="game-description">GAME DESCRIPTION:</span> ${
      inputdata.data.description
    }</div>
    <div class="game_informations">
    <div>RELEASE DATE:  ${inputdata.data.release_date} - </div>
    <div>DEVELOPER:  ${inputdata.data.developer} - </div>
    <div>MEDIAN PLAYTIME: ${inputdata.data.median_playtime} - </div>
    <div>NEGATIVE RATING: ${inputdata.data.negative_ratings} - </div>
    <div>POSITIVE RATING: ${inputdata.data.positive_ratings} - </div>
    <div>REQUIRED AGE: ${inputdata.data.required_age} - </div>
    </div>
    </div>
    </div>
    <div class="tags_contain">
    Popular user-defined tags for this product:
    <div class="tags">
    <div class="tag">${inputdata.data.steamspy_tags
      .map(
        (item) => '<button class="tag-name tag-button">' + item + "</button>"
      )
      .join("")}</div>
    </div>
    </div>
    </div>
    </div>
    `;
  display.appendChild(newDiv);
  const tagLine = document.querySelectorAll(".tag-name");
  tagLine.forEach((tagLine) => tagLine.addEventListener("click", filterByTag));
};

async function singleGame(e) {
  console.log(e);
  const inputAppId = e.getAttribute("id");
  console.log(inputAppId);
  renderDetail(await getSingleGame(inputAppId));
}
