function searchCat() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let catGridElements = document.getElementsByClassName("cat");

  let count = 0;

  for (i = 0; i < catGridElements.length; i++) {
    if (!catGridElements[i].innerHTML.toLowerCase().includes(input)) {
      catGridElements[i].style.display = "none";

      count++;
    } else {
      catGridElements[i].style.display = "list-item";
    }
  }

  const searchStatus = document.getElementById("search-status");

  if (catGridElements.length == count) {
    searchStatus.innerHTML = `Nema rezultata za ${input}`;
  } else {
    searchStatus.innerHTML = ``;
  }
}
