async function searchManga(){
const q=document.getElementById('q').value;
const r=await fetch('/api/search?q='+encodeURIComponent(q));
const data=await r.json();
const g=document.getElementById('grid'); g.innerHTML='';
data.forEach(m=>g.innerHTML+=`<div class="card"><img src="${m.cover||''}"><h3>${m.title}</h3></div>`);
}