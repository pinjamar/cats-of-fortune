let catsGridData = data.cats;
let catGrid = document.getElementById("catsGrid");

let catGridHTML = "";

catsGridData.forEach((cat) => {
  catGridHTML += `
        <div class="cat">
            <figure>
                <img src="images/${cat.name}.jpeg" />
            </figure>
            <div class="catName">  <h2>${cat.name}</h2>
              <button class="udomi" data-modal="modal-one">UDOMI</button>
              </div>
              <div class="color-age">
            <span>Color: ${cat.color}</span>
            <br />
            <span>Age: ${cat.age}</span>
            </div>
        </div>
    `;
});

catGrid.innerHTML = catGridHTML;

let catButtons = document.getElementsByClassName("udomi");

[...catButtons].forEach((catButton) => {
  catButton.addEventListener("click", () => {
    const domElement = catButton.parentNode.parentNode;
    domElement.remove();
  });
});
