const detailData = () => {
  const renderGanreList = (ganres) => {
    const dropdownBlock = document.querySelector(".header__menu .dropdown");

    ganres.forEach((ganre) => {
      dropdownBlock.insertAdjacentHTML(
        "beforeend",
        `
      <li><a href="./categories.html?ganre =${ganre} ">${ganre}</a></li>`
      );
    });
  };

  const renderAnimeDetails = (array, itemId) => {
    const animeObj = array.find((item) => item.id == itemId);
    const imageBlock = document.querySelector(".anime__details__pic");
    const viewsBlock = imageBlock.querySelector("view");

    if (animeObj) {
      imageBlock.dataset.setbg = animeObj.image;
    } else {
      console.log("аниме отсутствует");
    }
  };

  fetch("https://anime-9fbbd-default-rtdb.firebaseio.com/anime.json")
    .then((response) => response.json())
    .then((data) => {
      const genres = new Set();

      const genreParams = new URLSearchParams(window.location.search).get(
        "itemId"
      );
      console.log(genreParams);

      data.forEach((item) => {
        genres.add(item.ganre);
      });

      if (genreParams) {
        renderAnimeDetails(data, genreParams);
      } else {
        console.log("аниме отсутствует");
      }

      renderGanreList(genres);
    });
};
detailData();
