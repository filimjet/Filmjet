let adminSifre = "toprak123";

document.addEventListener("keydown", function (e) {
  if (e.shiftKey && e.key === "B") {
    document.getElementById("admin-giris").classList.toggle("gizli");
  }
});

function adminKontrol() {
  const sifre = document.getElementById("admin-sifre").value;
  if (sifre === adminSifre) {
    document.getElementById("admin-panel").classList.remove("gizli");
    document.getElementById("admin-giris").classList.add("gizli");
  } else {
    alert("Hatalı şifre!");
  }
}

function filmEkle() {
  const ad = document.getElementById("film-adi").value;
  const kategori = document.getElementById("film-kategori").value;
  const resimInput = document.getElementById("film-resim");

  if (!ad || !kategori || !resimInput.files.length) {
    alert("Tüm alanları doldurun!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const yeniFilm = {
      ad,
      kategori,
      resim: e.target.result
    };

    let filmler = JSON.parse(localStorage.getItem("filmler")) || [];
    filmler.push(yeniFilm);
    localStorage.setItem("filmler", JSON.stringify(filmler));
    location.reload();
  };
  reader.readAsDataURL(resimInput.files[0]);
}
