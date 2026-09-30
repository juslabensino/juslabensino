(()=>{
 'use strict';
 const $=id=>document.getElementById(id),stage=$('stage');
 const assets={
  family:['01-familia-atridas-v1.png','Quadro simbólico dos Atridas: Ifigênia, Agamêmnon, Clitemnestra e Orestes. Não representa um encontro cronológico.','Oresteia · Ésquilo · quadro simbólico dos personagens'],
  pursuit:['02-orestes-erinias-base-flow-v2.png','Orestes e três Erínias num cerco interpretativo.','Oresteia · Ésquilo · encenação do mito'],
  trial:['03-julgamento-atena-v1.png','Orestes e Apolo à esquerda; Atena e cidadãos ao centro; Erínias à direita.','Eumênides · Ésquilo · encenação do mito'],
  aristotle:['04-aristoteles-dialogo-v2.png','Representação interpretativa de Aristóteles dialogando com interlocutores.','Aristóteles · Ética a Nicômaco, livro V'],
  distribution:['05-justica-distributiva-v2.png','Repartição de grãos com uma medida e recipientes individuais.','Distribuição · exemplo didático hipotético'],
  correction:['06-justica-corretiva-v2.png','Um vaso quebrado na mesa e a entrega de outro como reparação.','Reparação · exemplo didático hipotético']
 };
 $('visual').insertAdjacentHTML('beforeend','<div id="grecia-scene" class="surface"><figure class="greek-shot"><img alt=""></figure><figure class="greek-shot"><img alt=""></figure><p id="greek-provenance"></p></div><div id="orestes-scene" class="surface"><video id="orestes-video" src="assets/grecia/orestes.mp4" poster="assets/grecia/02-orestes-erinias-base-flow-v2.png" muted playsinline preload="metadata" aria-label="Encenação mítica: Orestes é cercado pelas Erínias. O conflito permanece sem resolução."></video><img id="orestes-hold" src="assets/grecia/orestes-final.jpg" alt="Orestes parado, cercado pelas Erínias." hidden></div>');
 const start=document.createElement('button');start.id='orestes-start';start.textContent='Reproduzir a perseguição ▷';start.hidden=true;$('copy').append(start);
 for(const [scene,label] of [[18,'B4 · Grécia'],[19,'B4 · A família'],[20,'B4 · A perseguição'],[21,'B4 · O julgamento'],[22,'B4 · O justo'],[23,'B4 · Distribuir'],[24,'B4 · Reparar'],[25,'B4 · A síntese']]){
  const b=document.createElement('button');b.dataset.scene=scene;b.textContent=label;$('chapters').append(b);
 }
 $('chapters').setAttribute('aria-label','Cenas dos Blocos 1 a 4');
 const source=document.createElement('a');source.href='fontes-grecia.html';source.target='_blank';source.rel='noopener';source.textContent='Grécia · fontes e limites das imagens';source.className='sources-link';$('controls').append(source);
 const shots=[...document.querySelectorAll('.greek-shot')];let current=null,active=0;
 window.JusLabGrecia={render(b,{surface,move,stopCamera}){
  const a=assets[b.shot];surface('grecia-scene');
  let img=shots[active].querySelector('img');
  if(current!==b.shot){
   active=1-active;const shot=shots[active];img=shot.querySelector('img');stopCamera(img);img.style.transform='none';
   img.src='assets/grecia/'+a[0];img.alt=a[1];
   shots.forEach(s=>{s.classList.toggle('active',s===shot);s.setAttribute('aria-hidden',String(s!==shot));});current=b.shot;
  }
  move(img,b.camera||[1,0,0],undefined,b.duration??5000,'cubic-bezier(.22,.1,.35,1)');
  const provenance=$('greek-provenance');provenance.textContent=a[2];
  // Sources belong below the narrative, never over faces. Appending after the
  // answer also preserves the question's anchor across video/image reveals.
  $('copy').append(provenance);
 }};
 const video=$('orestes-video'),hold=$('orestes-hold');
 let state=null,started=false,request=0,hooks={change(){},error(){},playing(){}};
 function sync(){
  const hide=state==='play'&&started;
  stage.dataset.orestesCaption=hide?'hidden':'visible';
  if(state)$('copy').setAttribute('aria-hidden',String(hide));
  start.hidden=!(state==='play'&&!started);hooks.change();
 }
 async function play(restart=false){
  if(state!=='play')return;
  const token=++request;
  if(restart||video.ended){video.pause();video.currentTime=0;}
  hold.hidden=true;started=true;sync();
  try{await video.play();if(token!==request||state!=='play'){video.pause();return;}hooks.playing();sync();}
  catch(e){if(token===request&&e.name!=='AbortError'){started=false;hooks.error('Use Reproduzir a perseguição para iniciar o vídeo.');sync();}}
 }
 function pause(){++request;video.pause();sync();}
 function show(next,autoplay){
  if(state!==next){++request;video.pause();state=next;if(next==='play'){video.currentTime=0;started=false;hold.hidden=true;}else hold.hidden=false;}
  sync();if(next==='play'&&autoplay&&!started)play();
 }
 function leave(){++request;video.pause();state=null;start.hidden=true;stage.dataset.orestesCaption='visible';}
 video.addEventListener('ended',()=>{if(state==='play'){hold.hidden=false;sync();}});
 video.addEventListener('error',()=>{if(state){started=false;sync();hooks.error('O vídeo de Orestes não carregou. Preserve a pasta assets junto da apresentação.');}});
 start.onclick=()=>play();
 window.JusLabOrestes={video,init(options){hooks=options;},show,leave,pause,play,
  toggle(){if(state==='play'){if(video.paused)play();else pause();}},
  label(){return video.ended?'Rever vídeo':video.paused?'Reproduzir vídeo':'Pausar vídeo';}
 };
})();
