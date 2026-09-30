(()=>{
'use strict';
const $=id=>document.getElementById(id);
const shots={
 fontes:['assets/codificacao/fontes.png','Reconstrução ilustrativa de livros e documentos jurídicos diversos.'],
 napoleao:['assets/codificacao/napoleao-ingres.jpg','Retrato histórico de Bonaparte primeiro-cônsul, por Ingres, coleção La Boverie.'],
 codigo:['assets/codificacao/code-civil-1804.png','Página inicial do título preliminar do Code civil des Français, edição oficial de 1804.']
};
$('visual').insertAdjacentHTML('beforeend','<div id="codification-scene" class="surface"><img id="codification-photo-a" alt=""><img id="codification-photo-b" alt=""><video id="codification-video" src="assets/codificacao/jurista.mp4" poster="assets/codificacao/jurista.png" muted playsinline preload="metadata" aria-label="Um jurista consulta o livro e escreve seu comentário em uma folha separada."></video><img id="codification-end" src="assets/codificacao/final.jpg" alt="O jurista escreve na folha separada, enquanto a outra mão permanece apoiada no livro."></div>');
$('stage').insertAdjacentHTML('beforeend','<button id="codification-start" hidden>Reproduzir a cena ▷</button>');
for(const [scene,label] of [[50,'B9 · Organizar'],[51,'B9 · França, 1804'],[52,'B9 · O sistema'],[53,'B9 · A expectativa'],[54,'B9 · O intérprete'],[55,'B9 · O limite']]){
 const b=document.createElement('button');b.dataset.scene=scene;b.textContent=label;$('chapters').append(b);
}
$('chapters').setAttribute('aria-label','Cenas dos Blocos 1 a 9');
// Reserve the actual footer height only in this block; hiding controls restores full screen.
new ResizeObserver(()=>document.documentElement.style.setProperty('--cod-controls-height',$('controls').getBoundingClientRect().height+'px')).observe($('controls'));
const link=document.createElement('a');link.href='fontes-codificacao.html';link.target='_blank';link.rel='noopener';link.className='sources-link';link.textContent='Codificação · fontes e imagens';$('controls').append(link);
const video=$('codification-video'),end=$('codification-end'),start=$('codification-start'),photos=[$('codification-photo-a'),$('codification-photo-b')],media=[...photos,video,end];
let active=0,current=null,state=null,started=false,request=0,hooks={change(){},playing(){},error(){}};
function select(el){for(const e of media){e.classList.toggle('active',e===el);e.setAttribute('aria-hidden',String(e!==el));}}
function sync(){start.hidden=state!=='play'||started;hooks.change();}
function leave(){++request;video.pause();state=null;started=false;start.hidden=true;}
async function play(restart=false){
 if(state!=='play')return;
 const token=++request;
 if(restart||video.ended)video.currentTime=0;
 started=true;select(video);sync();
 try{await video.play();if(token!==request||state!=='play')return;hooks.playing();sync();}
 catch(e){if(token===request&&e.name!=='AbortError'){started=false;sync();hooks.error('Clique em Reproduzir a cena para iniciar o vídeo.');}}
}
function pause(){++request;video.pause();sync();}
function render(b,{surface,move,stopCamera},autoplay){
 surface('codification-scene');
 $('codification-scene').dataset.shot=b.shot||'jurista';
 if(b.state==='play'){
  if(state!=='play'){++request;video.pause();video.currentTime=0;started=false;state='play';select(video);}
  sync();if(autoplay&&!started)play();return;
 }
 if(state==='play'){++request;video.pause();started=false;}
 state=b.state||'photo';start.hidden=true;
 if(state==='hold'){select(end);sync();return;}
 const changed=current!==b.shot;let img=photos[active];
 if(changed){active=1-active;img=photos[active];stopCamera(img);img.style.transform='none';img.src=shots[b.shot][0];img.alt=shots[b.shot][1];img.dataset.shot=b.shot;current=b.shot;}
 select(img);
 if(!b.retain||changed)move(img,b.camera||[1,0,0],changed?[1,0,0]:undefined,b.duration||0,'cubic-bezier(.22,.1,.35,1)');
}
start.onclick=()=>play();video.addEventListener('ended',sync);
video.addEventListener('error',()=>{if(state==='play'){started=false;sync();hooks.error('O vídeo não carregou. Preserve a pasta assets junto da apresentação.');}});
window.JusLabCodificacao={render,leave,pause,play,video,init(o){hooks=o;},toggle(){if(state==='play'){if(video.paused||video.ended)play();else pause();}},label(){return video.ended?'Rever jurista':video.paused?'Reproduzir jurista':'Pausar jurista';}};
})();
