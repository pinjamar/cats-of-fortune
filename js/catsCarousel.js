var cats = DATA.cats;
var catCarousel = document.getElementById("catsCarousel");
var catCarouselHTML = "";

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
      <div class="slide-card">
          <a data-modal
            ><img class="carousel-item" src="images/${cat.name}.jpeg"
          />
          <h2>${cat.name.toUpperCase()}</h2>

          <span data-modal-content>
              <h1>${cat.name}</h1>
              <p>Color: ${cat.color}</p>
              <P>Age: ${cat.age}</P>
              <button class="modal-close modal-exit">X</button>
          </span>
          </a>
        </div>
    `;
  });

catCarousel.innerHTML = catCarouselHTML;

var cardMargins = 40;
var cardWidth = document.querySelector(".slide-card").scrollWidth + cardMargins;
var prevButton = document.querySelector(".cat-carousel--button.button--prev");
var nextButton = document.querySelector(".cat-carousel--button.button--next");

var shouldAutoplay = true;
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
