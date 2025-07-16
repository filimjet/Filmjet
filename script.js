
document.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.key === 'A') {
    const sifre = prompt('Şifreyi girin:');
    if (sifre === 'toprak123') {
      document.getElementById('admin-panel').style.display = 'block';
    } else {
      alert('Şifre yanlış!');
    }
  }
});

function filmEkle() {
  const ad = document.getElementById('film-adi').value;
  const link = document.getElementById('film-link').value;
  if (ad && link) {
    const film = { ad, link };
    let filmler = JSON.parse(localStorage.getItem('filmler') || '[]');
    filmler.push(film);
    localStorage.setItem('filmler', JSON.stringify(filmler));
    location.reload();
  }
}

function adminCikis() {
  document.getElementById('admin-panel').style.display = 'none';
}

function filmleriYukle() {
  let filmler = JSON.parse(localStorage.getItem('filmler') || '[]');
  const liste = document.getElementById('film-listesi');
  filmler.forEach(film => {
    const div = document.createElement('div');
    div.className = 'film';
    div.innerHTML = `
      <h3>${film.ad}</h3>
      <iframe src="${film.link}" allowfullscreen></iframe>
    `;
    liste.appendChild(div);
  });
}

filmleriYukle();
