function modalPopup() {
  let modals = document.querySelectorAll("[data-modal]");

  modals.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();

      let modal = document.getElementById("modal");
      modal.classList.add("open");

      let modalContent = document.getElementById("modalContent");

      if (trigger.querySelector("[data-modal-content]")) {
        modalContent.innerHTML = trigger.querySelector(
          "[data-modal-content]"
        ).innerHTML;

        let kittenButtons = document.getElementsByClassName(
          "udomi-carusel-button"
        );

        [...kittenButtons].forEach((kittenButton) => {
          kittenButton.addEventListener("click", () => {
            const catName = kittenButton.dataset.catName;

            let result = confirm(`Zelite li udomiti ${catName}?`);

            if (result) {
              document.getElementById(`carousel-id-${catName}`).remove();
              document.getElementById(`grid-cat-${catName}`).remove();
              modal.classList.remove("open");
            }
          });
        });
      } else {
        modalContent.innerHTML = "Unknown";
      }

      let exits = modal.querySelectorAll(".modal-exit");
      exits.forEach(function (exit) {
        exit.addEventListener("click", function (event) {
          event.preventDefault();
          modal.classList.remove("open");
        });
      });
    });
  });
}
