
let adminVisible = false;

document.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.key === 'B') {
    const pass = prompt("Şifreyi girin:");
    if (pass === "toprak123") {
      adminVisible = !adminVisible;
      document.getElementById('admin-panel').style.display = adminVisible ? 'block' : 'none';
    } else {
      alert("Şifre yanlış!");
    }
  }
});

function addFilm() {
  const title = document.getElementById("film-title").value;
  const image = document.getElementById("film-image").value;
  const category = document.getElementById("film-category").value;

  if (!title || !image) {
    alert("Lütfen tüm alanları doldurun!");
    return;
  }

  const filmBox = document.createElement("div");
  filmBox.className = `film-box ${category}`;
  filmBox.innerHTML = \`
    <img src="\${image}" alt="\${title}" />
    <h3>\${title}</h3>
  \`;

  document.getElementById("film-container").appendChild(filmBox);
}

function filterCategory(cat) {
  const boxes = document.querySelectorAll(".film-box");
  boxes.forEach(box => {
    if (cat === 'all' || box.classList.contains(cat)) {
      box.style.display = 'block';
    } else {
      box.style.display = 'none';
    }
  });
}
