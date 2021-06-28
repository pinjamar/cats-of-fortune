function MoreCats() {
  var catGrid = document.getElementById("catsGrid");
  var cats = catGrid.querySelectorAll(".cat");

  if (cats.length < 20) {
    document.getElementById("show-more").style.display = "none";
  } else {
    document.getElementById("show-more").style.display = "inline";
  }
}

MoreCats();
