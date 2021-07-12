/**
 * 1. Fetches cats JSON
 * 2. Builds carousel HTML
 * 3. Connects carousel with mouse events
 * 4. Starts carousel autoplay
 */
fetch("cats.json")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    let catCarousel = document.getElementById("kitten-carousel");
    catCarousel.innerHTML = buildCarouselHTML(json.cats);

    let kittenButtons = document.getElementsByClassName("udomi-carusel-button");

    [...kittenButtons].forEach((kittenButton) => {
      kittenButton.addEventListener("click", () => {
        const domElement = kittenButton.parentNode.parentNode;
        const carouselButtonId = kittenButton.dataset.carouselButtonId;
        const catName = kittenButton.dataset.catName;

        let result = confirm(`Zelite li udomiti ${catName}?`);

        if (result) {
          document.getElementById(carouselButtonId).remove();
          domElement.remove();
        }
      });
    });

    return catCarousel;
  })

  .then((catCarousel) => {
    connectCarouselEvents(catCarousel);
    return catCarousel;
  })
  .then((catCarousel) => {
    startCarouselAutoplay(catCarousel);
  })

  .then(() => modalPopup());

/**
 * Hooks up carousel events. Should be called after carousel has finished building HTML.
 */
function connectCarouselEvents(catCarousel) {
  if (!catCarousel) {
    console.error(
      "Cannot start cat carousel without a reference to the carousel"
    );
    return;
  }

  let cardMargins = 40;
  let cardWidth =
    document.querySelector(".slide-card").scrollWidth + cardMargins;
  let prevButton = document.querySelector(".cat-carousel--button.button--prev");
  let nextButton = document.querySelector(".cat-carousel--button.button--next");

  nextButton.addEventListener("click", () => {
    if (
      catCarousel.scrollWidth ==
      catCarousel.scrollLeft + catCarousel.clientWidth
    ) {
      catCarousel.scroll({
        left: 0,
        behavior: "smooth",
      });
    }

    catCarousel.scroll({
      left: catCarousel.scrollLeft + cardWidth,
      behavior: "smooth",
    });
  });

  prevButton.addEventListener("click", () => {
    if (catCarousel.scrollLeft === 0) {
      catCarousel.scroll({
        left: 999999,
        behavior: "smooth",
      });
    }

    catCarousel.scroll({
      left: catCarousel.scrollLeft - cardWidth,
      behavior: "smooth",
    });
  });
}

/**
 * Starts carousel autoplay logic
 *
 * @param {*} catCarousel HTML element containing the cat carousel
 * @returns void
 */
function startCarouselAutoplay(catCarousel) {
  let shouldAutoplay = true;
  let nextButton = document.querySelector(".cat-carousel--button.button--next");

  if (!nextButton) {
    console.error("Unable to start autoplay, check if nextButton is present");
    return;
  }

  setInterval(() => {
    if (shouldAutoplay) {
      nextButton.click();
    }
  }, 2000);

  catCarousel.addEventListener("mouseover", () => {
    shouldAutoplay = false;
  });

  catCarousel.addEventListener("mouseleave", () => {
    shouldAutoplay = true;
  });
}

/**
 * Generates HTML required for cats carousel
 * @param {*} cats - array of cats
 * @returns HTML string for carousel
 */
function buildCarouselHTML(cats) {
  let catCarouselHTML = "";

  cats
    .sort((cat1, cat2) => {
      if (cat1.age < cat2.age) {
        return -1;
      } else if (cat1.age > cat2.age) {
        return 1;
      } else {
        return 0;
      }
    })
    .forEach((cat) => {
      catCarouselHTML += `
        <div class="slide-card" id="carousel-id-${cat.name}">
            <a data-modal
              ><img class="carousel-item" src="images/${cat.name}.jpeg"
            />
            <h2>${cat.name.toUpperCase()}</h2>
  
            <div class="card-modal" data-modal-content>
                <h1>${cat.name}</h1>
                <p>Color: ${cat.color}</p>
                <P>Age: ${cat.age}</P>
                <button class="udomi-carusel-button" data-cat-name="${cat.name}" data-carousel-button-id="carousel-button-id-${cat.name}" data-modal="modal-one">UDOMI</button>
                <button class="modal-close modal-exit">X</button>              
            </div>
            </a>
          </div>
      `;
    });

  return catCarouselHTML;
}
