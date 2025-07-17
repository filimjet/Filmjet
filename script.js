let filmler = JSON.parse(localStorage.getItem("filmler")) || [];

function filmKartOlustur(film) {
  return `
    <div class="film-karti" data-kategori="${film.kategori}">
      <img src="${film.resim}" alt="${film.ad}">
      <div class="film-bilgi">
        <h4>${film.ad}</h4>
        <p>${film.kategori}</p>
      </div>
    </div>
  `;
}

function filmleriGoster(kategori = "Hepsi") {
  const alan = document.getElementById("film-alani");
  alan.innerHTML = "";

  filmler
    .filter(f => kategori === "Hepsi" || f.kategori === kategori)
    .forEach(f => {
      alan.innerHTML += filmKartOlustur(f);
    });
}

document.querySelectorAll('#kategori-listesi li').forEach(li => {
  li.addEventListener('click', () => {
    filmleriGoster(li.dataset.kategori);
  });
});

window.onload = () => {
  filmleriGoster();
};
