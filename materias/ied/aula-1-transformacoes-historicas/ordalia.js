(()=>{
 'use strict';
 const $=id=>document.getElementById(id),stage=$('stage');
 $('visual').insertAdjacentHTML('beforeend',`
 <div id="ordalia-scene" class="surface" aria-label="Encenação ilustrativa: uma mulher aproxima-se do rio, acompanhada por um escriba e autoridades.">
  <video id="ordalia-video" src="assets/ordalia.mp4" poster="assets/ordalia-inicio.jpg" muted playsinline preload="auto" aria-label="A mulher entra na água enquanto os acompanhantes permanecem na margem. Reconstrução artística, não registro documental."></video>
  <img id="ordalia-hold" src="assets/ordalia-final.jpg" alt="Último quadro: o pé da mulher na água e um acompanhante em terra firme." hidden>
 </div>`);
 const start=document.createElement('button');start.id='ordalia-start';start.textContent='Reproduzir a cena ▷';start.hidden=true;$('copy').append(start);
 for(const [scene,label] of [[11,'B3 · Mesopotâmia'],[12,'B3 · A ordália'],[13,'B3 · A pergunta']]){
  const b=document.createElement('button');b.dataset.scene=scene;b.textContent=label;$('chapters').append(b);
 }
 $('chapters').setAttribute('aria-label','Cenas dos Blocos 1 e 2 e abertura do Bloco 3');
 const video=$('ordalia-video'),hold=$('ordalia-hold');
 let state=null,started=false,request=0,hooks={change(){},error(){},playing(){}};
 function sync(){
  const hidden=state==='play'&&(video.currentTime>=3.2||video.ended);
  stage.dataset.ordaliaCaption=hidden?'hidden':'visible';
  if(state)$('copy').setAttribute('aria-hidden',String(hidden));
  start.hidden=!(state==='play'&&!started);
  hooks.change();
 }
 async function play(restart=false){
  if(state!=='play')return;
  const token=++request;
  if(restart||video.ended){video.pause();video.currentTime=0;}
  hold.hidden=true;started=true;sync();
  try{
   await video.play();
   if(token!==request||state!=='play'){video.pause();return;}
   hooks.playing();sync();
  }catch(e){
   if(token!==request)return;
   if(e.name!=='AbortError'){started=false;hooks.error('Não foi possível iniciar a ordália. Use Reproduzir a cena para tentar novamente.');}
   sync();
  }
 }
 function pause(){++request;video.pause();sync();}
 function show(next,autoplay){
  if(next!==state){
   ++request;video.pause();
   state=next;
   if(next==='play'){video.currentTime=0;started=false;hold.hidden=true;}
   else hold.hidden=false;
  }
  sync();
  if(next==='play'&&autoplay&&!started)play();
 }
 function leave(){
  ++request;video.pause();state=null;start.hidden=true;stage.dataset.ordaliaCaption='visible';
 }
 video.addEventListener('timeupdate',()=>{if(state==='play')sync();});
 video.addEventListener('ended',()=>{if(state==='play'){hold.hidden=false;sync();}});
 video.addEventListener('error',()=>{if(state)hooks.error('O vídeo da ordália não carregou. Mantenha a pasta assets junto da apresentação.');});
 start.onclick=()=>play();
 window.JusLabOrdalia={video,init(options){hooks=options;},show,leave,pause,play,
  toggle(){if(state==='play'){if(video.paused)play();else pause();}},
  label(){return video.ended?'Rever vídeo':video.paused?'Reproduzir vídeo':'Pausar vídeo';}
 };
})();
