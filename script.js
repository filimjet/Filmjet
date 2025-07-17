
let adminPanel = document.getElementById("adminPanel");
let adminBtn = document.getElementById("adminBtn");
let adminIcerik = document.getElementById("adminIcerik");

adminBtn.onclick = () => {
  adminPanel.classList.toggle("gizli");
};

function girisYap() {
  const sifre = document.getElementById("adminSifre").value;
  if (sifre === "toprak123") {
    adminIcerik.classList.remove("gizli");
    document.getElementById("adminSifre").style.display = "none";
    document.querySelector("#adminPanel button").style.display = "none";
  } else {
    alert("Şifre yanlış!");
  }
}

function filmEkle() {
  const baslik = document.getElementById("filmBaslik").value;
  const gorsel = document.getElementById("filmGorsel").value;
  const aciklama = document.getElementById("filmAciklama").value;

  const film = { baslik, gorsel, aciklama };
  let filmler = JSON.parse(localStorage.getItem("filmler")) || [];
  filmler.push(film);
  localStorage.setItem("filmler", JSON.stringify(filmler));
  location.reload();
}

function filmleriGoster() {
  let filmler = JSON.parse(localStorage.getItem("filmler")) || [];
  let liste = document.getElementById("filmListesi");
  liste.innerHTML = "";
  filmler.forEach((film) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = \`
      <img src="\${film.gorsel}" alt="film" />
      <h3>\${film.baslik}</h3>
      <p>\${film.aciklama}</p>
    \`;
    liste.appendChild(card);
  });
}

window.onload = filmleriGoster;
