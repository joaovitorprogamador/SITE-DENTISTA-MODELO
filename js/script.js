const CONFIG = {
  nome: "Dra. Juliana Castro",

  // COLOQUE AQUI A FOTO PNG DA DRA. (pode ser PNG, JPG, JPEG ou WEBP)
  // Exemplo: fotoBloco1: "dra.png"
  fotoBloco1: "assets/dra.png",

  // FOTO DA SEÇÃO SOBRE
  fotoSobre: "assets/foto-sobre.jpg",

  whatsapp: "5511999999999",
  mensagemWhatsapp: "Olá! Gostaria de agendar uma consulta.",

  // FOTOS DE ANTES E DEPOIS
  resultados: [
    { antes: "resultado1_antes.jpg", depois: "resultado1_depois.jpg" },
    { antes: "resultado2_antes.jpg", depois: "resultado2_depois.jpg" },
    { antes: "resultado3_antes.jpg", depois: "resultado3_depois.jpg" }
  ],

  depoimentos: [
    { nome: "Carla Menezes", foto: "", texto: "A Dra. Juliana transformou meu sorriso e minha autoestima. Atendimento impecável e resultados incríveis!" },
    { nome: "Ricardo Almeida", foto: "", texto: "Profissional atenciosa, clínica moderna e tratamento indolor. Recomendo de olhos fechados!" },
    { nome: "Fernanda Souza", foto: "", texto: "Fiz meu clareamento e ficou perfeito! Equipe maravilhosa e muito acolhedora." }
  ]
};

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
$$('[data-name]').forEach(e=>e.textContent=CONFIG.nome);
const phone=String(CONFIG.whatsapp).replace(/\D/g,'');
const wa='https://wa.me/'+phone+'?text='+encodeURIComponent(CONFIG.mensagemWhatsapp);
$$('[data-wa]').forEach(e=>e.href=wa);
const br=phone.startsWith('55')?phone.slice(2):phone;
$('#phone').textContent=br.length===11?`(${br.slice(0,2)}) ${br.slice(2,7)}-${br.slice(7)}`:CONFIG.whatsapp;
function setImg(el,src,label){
  const makePlaceholder=()=>{
    const ph=document.createElement('div');
    ph.className='image-placeholder'+(el && el.id==='heroImg'?' hero-person-placeholder':'');
    ph.innerHTML='<span>'+label+'</span>';
    el.replaceWith(ph);
  };
  if(!src){ makePlaceholder(); return; }
  el.src=src;
  el.onerror=makePlaceholder;
}
setImg($('#heroImg'),CONFIG.fotoBloco1,'COLOQUE A FOTO PNG DA DRA. AQUI');
setImg($('#aboutImg'),CONFIG.fotoSobre,'COLOQUE A FOTO DA SEÇÃO SOBRE AQUI');

const track=$('#resultsTrack'),dots=$('#dots');
const originalResults=CONFIG.resultados.map(r=>({...r}));
let currentResult=0;
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function renderResults(){
  track.innerHTML=''; dots.innerHTML='';
  const ordered=originalResults.map((_,i)=>originalResults[(i+currentResult)%originalResults.length]);
  ordered.forEach((r,i)=>{
    const c=document.createElement('article'); c.className='result-card';
    const antes = r.antes ? `<img src="${esc(r.antes)}" alt="Resultado antes" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'result-empty',innerHTML:'<span>COLOQUE A FOTO ANTES</span>'}))">` : `<div class="result-empty"><span>COLOQUE A FOTO ANTES</span></div>`;
    const depois = r.depois ? `<img src="${esc(r.depois)}" alt="Resultado depois" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'result-empty',innerHTML:'<span>COLOQUE A FOTO DEPOIS</span>'}))">` : `<div class="result-empty"><span>COLOQUE A FOTO DEPOIS</span></div>`;
    c.innerHTML=`<div class="result-pair">
      <div class="result-half">${antes}<span class="result-label before">Antes</span></div>
      <div class="result-half">${depois}<span class="result-label after">Depois</span></div>
    </div>`;
    track.appendChild(c);
  });
  originalResults.forEach((_,i)=>{
    const d=document.createElement('button'); d.type='button'; d.className='dot'+(i===currentResult?' active':'');
    d.setAttribute('aria-label','Ver resultado '+(i+1)); d.onclick=()=>{currentResult=i;renderResults()}; dots.appendChild(d);
  });
  if(innerWidth<=700){track.scrollLeft=0}
}
function go(delta){
  if(!originalResults.length)return;
  currentResult=(currentResult+delta+originalResults.length)%originalResults.length;
  renderResults();
}
$('#prev').onclick=()=>go(-1);
$('#next').onclick=()=>go(1);
renderResults();

const tests=$('#tests');CONFIG.depoimentos.slice(0,3).forEach(x=>{const e=document.createElement('article');e.className='testimonial';e.innerHTML=`<div class="quote">“</div><p>${esc(x.texto)}</p><div class="testbottom"><span class="testname">${esc(x.nome)}</span><span class="stars">★★★★★</span></div>`;tests.appendChild(e)});
$('#mobile').onclick=()=>$('#menu').classList.toggle('open');$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
