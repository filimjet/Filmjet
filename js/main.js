
document.addEventListener("DOMContentLoaded", () => {
    const filmListesi = document.getElementById("film-listesi");
    const filmler = JSON.parse(localStorage.getItem("filmler")) || [];

    function filmKutusuOlustur(film) {
        return `
        <div class="film-karti">
            <img src="${film.gorsel}" alt="${film.ad}">
            <div class="film-detay">
                <h3>${film.ad}</h3>
                <p>${film.aciklama}</p>
                <small>${film.tur} • ${film.yil}</small>
            </div>
        </div>
        `;
    }

    filmler.forEach(film => {
        filmListesi.innerHTML += filmKutusuOlustur(film);
    });
});
