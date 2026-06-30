const API = 'https://mangaword-api.onrender.com/api/search?q=';

async function searchManga() {
    const q = document.getElementById('q').value.trim();

    if (!q) return;

    try {
        const r = await fetch(API + encodeURIComponent(q));

        if (!r.ok) {
            throw new Error('Errore HTTP: ' + r.status);
        }

        const data = await r.json();

        const g = document.getElementById('grid');
        g.innerHTML = '';

        data.forEach(m => {
            g.innerHTML += `
                <div class="card">
                    <img src="${m.cover || ''}" alt="${m.title}">
                    <h3>${m.title}</h3>
                </div>
            `;
        });

    } catch (err) {
        console.error(err);
        document.getElementById('grid').innerHTML =
            '<p>Errore durante il caricamento dei manga.</p>';
    }
}
