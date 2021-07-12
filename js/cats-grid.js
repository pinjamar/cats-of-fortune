fetch("cats.json")
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    let catGrid = document.getElementById("catsGrid");
    catGrid.innerHTML = buildCatsGridHTML(json.cats);

    showMoreCats();

    let catButtons = document.getElementsByClassName("udomi");

    [...catButtons].forEach((catButton) => {
      catButton.addEventListener("click", () => {
        const domElement = catButton.parentNode.parentNode;
        const carouselId = catButton.dataset.carouselId;
        const catName = catButton.dataset.catName;

        let result = confirm(`Zelite li udomiti ${catName}?`);

        if (result) {
          document.getElementById(carouselId).remove();
          domElement.remove();
          showMoreCats();
        }
      });
    });

    return catGrid;
  });

function buildCatsGridHTML(cats) {
  let catGridHTML = "";

  cats.forEach((cat) => {
    catGridHTML += `
        <div class="cat" id="grid-cat-${cat.name}">
            <figure>
                <img src="images/${cat.name}.jpeg" />
            </figure>
            <div class="cat-name">  <h2>${cat.name}</h2>
              <button class="udomi" data-cat-name="${cat.name}" data-carousel-id="carousel-id-${cat.name}" data-modal="modal-one">UDOMI</button>
              </div>
              <div class="color-age">
            <span>Color: ${cat.color}</span>
            <br />
            <span>Age: ${cat.age}</span>
            </div>
        </div>        
    `;
  });

  return catGridHTML;
}
