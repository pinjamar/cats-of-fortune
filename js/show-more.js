function moreCats() {
  let catGrid = document.getElementById("catsGrid");
  let cats = catGrid.querySelectorAll(".cat");

  if (cats.length < 20) {
    document.getElementById("show-more").style.display = "none";
  } else {
    document.getElementById("show-more").style.display = "inline";
  }
}

moreCats();
