(()=>{
'use strict';
const $=id=>document.getElementById(id);
$('visual').insertAdjacentHTML('beforeend','<div id="equality-scene" class="surface"><img id="equality-street" src="assets/igualdade/rua.png" alt="Reconstrução: artesão e homem abastado conversam numa rua francesa; à direita, uma mulher de casaco azul leva um documento ao escritório."><video id="equality-video" src="assets/igualdade/notario.mp4" poster="assets/igualdade/inicio.jpg" muted playsinline preload="metadata" aria-label="A mulher entrega um documento ao notário, que pede que aguarde. O procedimento permanece em suspenso."></video><img id="equality-end" src="assets/igualdade/final.jpg" alt="Mulher e notário aguardam; o documento permanece sobre a mesa."></div>');
$('stage').insertAdjacentHTML('beforeend','<span id="equality-label" hidden>Reconstrução didática hipotética</span><button id="equality-start" hidden>Reproduzir a cena ▷</button>');
for(const [scene,label] of [[56,'B10 · Igualdade'],[57,'B10 · A conquista'],[58,'B10 · O conceito'],[59,'B10 · Para quem?'],[60,'B10 · A restrição'],[61,'B10 · Os limites']]){
 const b=document.createElement('button');b.dataset.scene=scene;b.textContent=label;$('chapters').append(b);
}
$('chapters').setAttribute('aria-label','Cenas dos Blocos 1 a 10');
const link=document.createElement('a');link.href='fontes-igualdade.html';link.target='_blank';link.rel='noopener';link.className='sources-link';link.textContent='Igualdade formal · fontes e imagens';$('controls').append(link);
new ResizeObserver(()=>document.documentElement.style.setProperty('--eq-controls-height',$('controls').getBoundingClientRect().height+'px')).observe($('controls'));
// Reserve the actual caption height; the meaningful hand/paper action ends at 82%
// of the source image. Reflow and control toggles must preserve this safe region.
function fitOffice(){
 const stage=$('stage');
 if(stage.dataset.mode!=='igualdade')return;
 stage.style.setProperty('--eq-copy-height',$('copy').offsetHeight+'px');
 if(stage.dataset.layout!=='eq-office')return;
 const top=document.body.classList.contains('clean')?0:44;
 const available=stage.getBoundingClientRect().height-$('copy').getBoundingClientRect().height-16-top;
 stage.style.setProperty('--eq-office-media-top',top+'px');
 stage.style.setProperty('--eq-office-media-height',Math.max(0,available/.82)+'px');
}
const officeLayout=new ResizeObserver(fitOffice);
officeLayout.observe($('copy'));officeLayout.observe($('stage'));
new MutationObserver(fitOffice).observe($('stage'),{attributes:true,attributeFilter:['data-layout']});
new MutationObserver(fitOffice).observe(document.body,{attributes:true,attributeFilter:['class']});
const video=$('equality-video'),street=$('equality-street'),end=$('equality-end'),start=$('equality-start'),label=$('equality-label');
let state=null,started=false,request=0,cameraAPI=null,hooks={change(){},playing(){},error(){}};
function select(el){for(const e of [street,video,end]){e.classList.toggle('active',e===el);e.setAttribute('aria-hidden',String(e!==el));}}
function sync(){start.hidden=state!=='play'||started;hooks.change();}
function leave(){++request;video.pause();if(cameraAPI)cameraAPI.stopCamera(street);state=null;started=false;start.hidden=true;label.hidden=true;}
async function play(restart=false){
 if(state!=='play')return;
 const token=++request;
 if(restart||video.ended)video.currentTime=0;
 started=true;select(video);sync();
 try{await video.play();if(token!==request||state!=='play')return;hooks.playing();sync();}
 catch(e){if(token===request&&e.name!=='AbortError'){started=false;sync();hooks.error('Clique em Reproduzir a cena para iniciar o vídeo.');}}
}
function pause(){++request;video.pause();sync();}
function render(b,api,autoplay){
 cameraAPI=api;api.surface('equality-scene');label.hidden=false;
 if(b.state==='play'){
  if(state!=='play'){++request;video.pause();video.currentTime=0;started=false;state='play';select(video);}
  sync();if(autoplay&&!started)play();return;
 }
 if(state==='play'){++request;video.pause();started=false;}
 const previous=state;state=b.state||'photo';start.hidden=true;
 if(state==='hold'){select(end);sync();return;}
 select(street);
 if(!b.continueCamera||previous!=='photo'){
  api.move(street,b.camera||[1,0,0],previous!=='photo'?[1,0,0]:undefined,b.duration||0,'cubic-bezier(.22,.1,.35,1)');
 }
}
start.onclick=()=>play();
video.addEventListener('ended',sync);
video.addEventListener('error',()=>{if(state==='play'){started=false;sync();hooks.error('O vídeo não carregou. Preserve a pasta assets junto da apresentação.');}});
window.JusLabIgualdade={render,leave,pause,play,video,init(o){hooks=o;},toggle(){if(state==='play'){if(video.paused||video.ended)play();else pause();}},label(){return video.ended?'Rever notário':video.paused?'Reproduzir notário':'Pausar notário';}};
})();
