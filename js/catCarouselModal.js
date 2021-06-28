var modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();

    var modal = document.getElementById("modal");
    modal.classList.add("open");

    var modalContent = document.getElementById("modalContent");

    if (trigger.querySelector("[data-modal-content]")) {
      modalContent.innerHTML = trigger.querySelector(
        "[data-modal-content]"
      ).innerHTML;
    } else {
      modalContent.innerHTML = "Unknown";
    }

    var exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});
