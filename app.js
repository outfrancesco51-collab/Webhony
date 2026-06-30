if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.navigator.standalone){document.getElementById('iosBanner').classList.add('show')}
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js')}
const API='https://your-backend.onrender.com/api/search?q='; // backend proxy necessario

async function searchManga(){
 const q=document.getElementById('q').value.trim(); if(!q)return;
 const grid=document.getElementById('grid'); grid.innerHTML='<p>Caricamento...</p>';
 try{
   const r=await fetch(API+encodeURIComponent(q));
   const data=await r.json();
   grid.innerHTML='';
   data.forEach(m=>grid.innerHTML+=`<article class="card" onclick='showDetails(${JSON.stringify(JSON.stringify(m))})'>
   <img src="${m.cover||''}"><div class="meta"><strong>${m.title}</strong><div class='status'>${m.status||'Unknown'}</div></div></article>`);
 }catch(e){grid.innerHTML='<p>Configura il backend proxy Node.js (Render/Railway) per evitare CORS.</p>'}
}
function showDetails(raw){
 const m=JSON.parse(raw);
 details.innerHTML=`<h2>${m.title}</h2>
 <img src="${m.cover||''}" style="width:180px;border-radius:12px">
 <p><b>Stato:</b> ${m.status||'Ongoing'}</p>
 <p><b>Ore lette:</b> ${m.hoursRead||0}</p>
 <p><b>Ultimo capitolo:</b> ${m.latestChapter||'N/D'}</p>
 <p>${m.description||'Nessuna descrizione disponibile'}</p>`;
 sheet.classList.remove('hidden');
}
function closeSheet(){sheet.classList.add('hidden')}