(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const assets={pontifices:['pontifices.png','Reconstrução ilustrativa de pontífices romanos: rito religioso e consulta a tabuínhas no mesmo espaço. Não representa uma reunião documentada.'],
  coponio:['coponio.png','Reconstrução ilustrativa: Copônio prepara um testamento em tábuas enceradas com um assistente.'],
  ausencia:['ausencia.png','O mesmo ambiente com a cadeira de Copônio vazia e o testamento sobre a mesa.'],
  debate:['debate.png','Representações interpretativas de Cévola, à esquerda, e Crasso, à direita, argumentando sobre o mesmo testamento.']};
 $('visual').insertAdjacentHTML('beforeend','<div id="roma-scene" class="surface"><img id="roma-photo-a" class="roman-photo" alt=""><img id="roma-photo-b" class="roman-photo" alt=""><video id="coponio-video" src="assets/roma/coponio.mp4" poster="assets/roma/coponio.png" muted playsinline preload="metadata" aria-label="Copônio escreve em tábuas de cera, pausa e olha para o assistente."></video><img id="roma-held" src="assets/roma/coponio-final.jpg" alt="Copônio e o assistente depois da escrita do testamento."></div>');
 const start=document.createElement('button');start.id='coponio-start';start.textContent='Reproduzir a cena ▷';start.hidden=true;$('copy').append(start);
 for(const [scene,label] of [[26,'B5 · Roma'],[27,'B5 · O imprevisto'],[28,'B5 · Duas interpretações'],[29,'B5 · O problema'],[30,'B5 · Que arte?'],[31,'B5 · A síntese']]){
  const b=document.createElement('button');b.dataset.scene=scene;b.textContent=label;$('chapters').append(b);
 }
 $('chapters').setAttribute('aria-label','Cenas dos Blocos 1 a 5');
 const source=document.createElement('a');source.href='fontes-roma.html';source.target='_blank';source.rel='noopener';source.className='sources-link';source.textContent='Roma · fontes e imagens';$('controls').append(source);
 const video=$('coponio-video'),hold=$('roma-held'),photos=[$('roma-photo-a'),$('roma-photo-b')],media=[...photos,video,hold];
 let active=0,current=null,state=null,started=false,request=0,hooks={change(){},error(){},playing(){}};
 function select(el){media.forEach(e=>{e.classList.toggle('active',e===el);e.setAttribute('aria-hidden',String(e!==el));});}
 function sync(){start.hidden=!(state==='play'&&!started);hooks.change();}
 function pause(){++request;video.pause();sync();}
 async function play(restart=false){
  if(state!=='play')return;
  const token=++request;
  if(restart||video.ended){video.pause();video.currentTime=0;}
  started=true;select(video);sync();
  try{await video.play();if(token!==request)return;if(state!=='play'){video.pause();return;}hooks.playing();sync();}
  catch(e){if(token===request&&e.name!=='AbortError'){started=false;sync();hooks.error('Use Reproduzir a cena para iniciar o vídeo de Copônio.');}}
 }
 function leave(){++request;video.pause();state=null;started=false;current=null;start.hidden=true;}
 function render(b,{surface,move,stopCamera},autoplay){
  surface('roma-scene');
  if(b.state==='play'){
   if(state!=='play'){++request;video.pause();video.currentTime=0;started=false;select(video);}
   state='play';sync();if(autoplay&&!started)play();return;
  }
  ++request;video.pause();state=b.state||'photo';sync();
  if(state==='hold'){select(hold);return;}
  const a=assets[b.shot];let img=photos[active];
  if(current!==b.shot){
   active=1-active;img=photos[active];stopCamera(img);img.style.transform='none';
   img.src='assets/roma/'+a[0];img.alt=a[1];current=b.shot;
  }
  select(img);
  // Retained answers use a zero-duration camera. Applying it also handles a
  // direct timeline jump from an unrelated zoom without moving the question.
  move(img,b.camera||[1,0,0],undefined,b.duration??5000,'cubic-bezier(.22,.1,.35,1)');
 }
 video.addEventListener('ended',()=>{if(state==='play'){select(hold);sync();}});
 video.addEventListener('error',()=>{if(state==='play'){started=false;sync();hooks.error('O vídeo de Copônio não carregou. Preserve a pasta assets com a apresentação.');}});
 start.onclick=()=>play();
 Object.values(assets).forEach(a=>{const i=new Image();i.src='assets/roma/'+a[0];});
 window.JusLabRoma={video,render,leave,pause,play,init(o){hooks=o;},
  toggle(){if(state==='play'){if(video.paused)play();else pause();}},
  label(){return video.ended?'Rever vídeo':video.paused?'Reproduzir vídeo':'Pausar vídeo';}
 };
})();
