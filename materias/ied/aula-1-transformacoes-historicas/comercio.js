(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const shots={entrega:['assets/comercio/entrega.png','Venda a prazo ilustrativa: dois mercadores junto ao livro de contas e um carregador com tecido.'],registro:['assets/comercio/registro.png','O mesmo mercador consulta o livro de contas; o comprador e a mercadoria já partiram.'],julgamento:['assets/comercio/julgamento.png','Audiência civil hipotética: mercadores apresentam registros a uma autoridade que examina o conflito, acompanhada de um escrivão.'],cidade:['assets/moderno/autoridades.png','Comércio e diferentes autoridades numa cidade ilustrativa.'],reparticao:['assets/moderno/reparticao.png','Registros, recursos e funcionários numa repartição ilustrativa.']};
 $('visual').insertAdjacentHTML('beforeend',`<div id="commerce-scene" class="surface"><img id="commerce-photo-a" alt=""><img id="commerce-photo-b" alt=""><video id="commerce-video" src="assets/comercio/entrega.mp4" poster="assets/comercio/entrega.png" muted playsinline preload="metadata" aria-label="O carregador leva o tecido para a rua; os dois mercadores permanecem junto ao registro."></video><img id="commerce-end" src="assets/comercio/final.jpg" alt="O carregador já se afastou com o tecido, enquanto os mercadores permanecem junto ao livro."></div>`);
 $('stage').insertAdjacentHTML('beforeend','<button id="commerce-start" hidden>Reproduzir a entrega ▷</button>');
 for(const [scene,label] of [[44,'B8 · A venda'],[45,'B8 · O acordo'],[46,'B8 · A prova'],[47,'B8 · O cumprimento'],[48,'B8 · As instituições'],[49,'B8 · Previsibilidade']]){
  const b=document.createElement('button');b.dataset.scene=scene;b.textContent=label;$('chapters').append(b);
 }
 $('chapters').setAttribute('aria-label','Cenas dos Blocos 1 a 8');
 const link=document.createElement('a');link.href='fontes-comercio.html';link.target='_blank';link.rel='noopener';link.className='sources-link';link.textContent='Comércio · fontes e imagens';$('controls').append(link);
 const video=$('commerce-video'),end=$('commerce-end'),start=$('commerce-start'),photos=[$('commerce-photo-a'),$('commerce-photo-b')],media=[...photos,video,end];
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
  catch(e){if(token===request&&e.name!=='AbortError'){started=false;sync();hooks.error('Clique em Reproduzir a entrega para iniciar o vídeo.');}}
 }
 function pause(){++request;video.pause();sync();}
 function render(b,{surface,move,stopCamera},autoplay){
  surface('commerce-scene');
  if(b.state==='play'){
   if(state!=='play'){++request;video.pause();video.currentTime=0;started=false;state='play';select(video);}
   sync();if(autoplay&&!started)play();return;
  }
  if(state==='play'){++request;video.pause();started=false;}
  state=b.state||'photo';start.hidden=true;
  if(state==='hold'){select(end);sync();return;}
  const changed=current!==b.shot;let img=photos[active];
  if(changed){active=1-active;img=photos[active];stopCamera(img);img.style.transform='none';img.src=shots[b.shot][0];img.alt=shots[b.shot][1];current=b.shot;}
  select(img);
  // Retained answers do not restart or snap an ongoing camera movement.
  if(!b.retain||changed)move(img,b.camera||[1,0,0],changed?[1,0,0]:undefined,b.duration||0,'cubic-bezier(.22,.1,.35,1)');
 }
 start.onclick=()=>play();video.addEventListener('ended',sync);
 video.addEventListener('error',()=>{if(state==='play'){started=false;sync();hooks.error('O vídeo não carregou. Preserve a pasta assets junto da apresentação.');}});
 window.JusLabComercio={render,leave,pause,play,video,init(o){hooks=o;},toggle(){if(state==='play'){if(video.paused||video.ended)play();else pause();}},label(){return video.ended?'Rever entrega':video.paused?'Reproduzir entrega':'Pausar entrega';}};
})();
