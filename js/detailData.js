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
    const breadcrumb = document.querySelector(".breadcrumb__links span");
    const animeObj = array.find((item) => item.id == itemId);
    const imageBlock = document.querySelector(".anime__details__pic");

    //const viewsBlock = imageBlock.querySelector("view");
    const animeDetails = document.querySelector(".anime__details__content");
    if (animeObj) {
      breadcrumb.innerHTML = `${animeObj.title}`;
      //imageBlock.dataset.setbg = animeObj.image;
      animeDetails.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="row">
        <div class="col-lg-3">
            <div class="anime__details__pic set-bg" data-setbg="${animeObj.image}">
                <div class="view"><i class="fa fa-eye"></i>${animeObj.views}</div>
            </div>
        </div>
        <div class="col-lg-9">
            <div class="anime__details__text">
                <div class="anime__details__title">
                    <h3>${animeObj.title}</h3>
                    <span>${animeObj["original-title"]}</span>
                </div>

                <p>${animeObj.description}</p>
                <div class="anime__details__widget">
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                            <ul>
                                <li><span>Date aired:</span>${animeObj.date}</li>
                                <li><span>Status:</span> Airing</li>
                                <li><span>Genre:</span>${animeObj.ganre}</li>
                            </ul>
                        </div>
                        <div class="col-lg-6 col-md-6">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      `
      );
    } else {
      console.log("аниме отсутствует");
    }

    animeDetails.querySelectorAll(".set-bg").forEach((elem) => {
      elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
    });
  };

  fetch("https://anime-9fbbd-default-rtdb.firebaseio.com/anime.json")
    .then((response) => response.json())
    .then((data) => {
      const genres = new Set();

      const genreParams = new URLSearchParams(window.location.search).get(
        "itemId"
      );

      data.forEach((item) => {
        genres.add(item.ganre);
      });

      if (genreParams) {
        renderAnimeDetails(data, genreParams);
      } else {
        console.log("аниме отсутствует");
      }
      console.log(genres);
      renderGanreList(genres);
    });
};
detailData();
