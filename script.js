
let adminVisible = false;
document.addEventListener('keydown', function(e) {
  if (e.shiftKey && e.key === 'B') {
    adminVisible = !adminVisible;
    document.getElementById('adminPanel').classList.toggle('hidden');
  }
});

let filmler = JSON.parse(localStorage.getItem('filmler')) || [];

function guncelleListe() {
  const container = document.getElementById('filmListesi');
  container.innerHTML = '';
  filmler.forEach(film => {
    const div = document.createElement('div');
    div.className = 'filmKutusu';
    div.innerHTML = \`
      <img src="\${film.gorsel}" alt="">
      <h3>\${film.baslik}</h3>
      <p>\${film.aciklama}</p>
      <p><small>Kategori: \${film.kategori}</small></p>
    \`;
    container.appendChild(div);
  });
}
function filmEkle() {
  const baslik = document.getElementById('filmBaslik').value;
  const aciklama = document.getElementById('filmAciklama').value;
  const kategori = document.getElementById('filmKategori').value;
  const gorsel = document.getElementById('filmGorsel').value;
  filmler.push({ baslik, aciklama, kategori, gorsel });
  localStorage.setItem('filmler', JSON.stringify(filmler));
  guncelleListe();
}

function tumFilmleriSil() {
  if (confirm("Tüm filmleri silmek istediğine emin misin?")) {
    filmler = [];
    localStorage.setItem('filmler', JSON.stringify(filmler));
    guncelleListe();
  }
}

function filterCategory(cat) {
  const container = document.getElementById('filmListesi');
  container.innerHTML = '';
  filmler.filter(f => cat === 'Hepsi' || f.kategori === cat).forEach(film => {
    const div = document.createElement('div');
    div.className = 'filmKutusu';
    div.innerHTML = \`
      <img src="\${film.gorsel}" alt="">
      <h3>\${film.baslik}</h3>
      <p>\${film.aciklama}</p>
      <p><small>Kategori: \${film.kategori}</small></p>
    \`;
    container.appendChild(div);
  });
}

window.onload = guncelleListe;
