(()=>{
 'use strict';
 const $=id=>document.getElementById(id),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const descriptions={entrega:'Reconstrução ilustrativa: Francisco I entrega uma determinação régia a um oficial.',reparticao:'Repartição régia ilustrativa: contagem de recursos, organização de documentos, escrita em registro e expedição de ordens.',autoridades:'Cidade francesa ilustrativa: oficiais régios à esquerda, autoridade eclesiástica à direita e comércio na rua central.'};
 $('visual').insertAdjacentHTML('beforeend',`<div id="moderno-scene" class="surface">
 <img id="moderno-photo-a" alt=""><img id="moderno-photo-b" alt="">
 <img id="royal-poster" src="assets/moderno/entrega.png" alt="O rei e seus oficiais antes da entrega da ordem.">
 <video id="royal-video" src="assets/moderno/entrega.mp4" poster="assets/moderno/entrega.png" muted playsinline preload="metadata" aria-label="O rei entrega o documento; o oficial o recebe e se prepara para sair."></video>
 <img id="royal-landscape" src="assets/moderno/circulacao.png" alt="Mensageiros a cavalo se afastam da residência régia por caminhos diferentes."></div>`);
 $('stage').insertAdjacentHTML('beforeend',`<section id="royal-copy" aria-live="polite" aria-hidden="true"><h2>A ordem parte do rei.</h2><p>Para alcançar o território, precisa circular por uma rede de agentes e instituições.</p></section><button id="royal-start" hidden>Reproduzir a entrega ▷</button>`);
 for(const [scene,label] of [[38,'B7 · França, 1539'],[39,'B7 · A ordem circula'],[40,'B7 · Os registros'],[41,'B7 · Quem julga?'],[42,'B7 · Governar'],[43,'B7 · O Estado']]){
  const b=document.createElement('button');b.dataset.scene=scene;b.textContent=label;$('chapters').append(b);
 }
 $('chapters').setAttribute('aria-label','Cenas dos Blocos 1 a 7');
 const source=document.createElement('a');source.href='fontes-moderno.html';source.target='_blank';source.rel='noopener';source.className='sources-link';source.textContent='Estado moderno · fontes e imagens';$('controls').append(source);
 const root=$('moderno-scene'),video=$('royal-video'),poster=$('royal-poster'),landscape=$('royal-landscape'),caption=$('royal-copy'),start=$('royal-start'),photos=[$('moderno-photo-a'),$('moderno-photo-b')],media=[...photos,video,poster,landscape];
 let active=0,current=null,state=null,phase='idle',started=false,request=0,raf=0,paused=false,animations=[],hooks={change(){},error(){},playing(){}};
 function setPhase(value){phase=value;root.dataset.phase=value;}
 function select(el){media.forEach(e=>{e.classList.toggle('active',e===el);e.setAttribute('aria-hidden',String(e!==el));});}
 function sync(){start.hidden=!(state==='play'&&!started);hooks.change();}
 function cancelPassage(){
  ++request;cancelAnimationFrame(raf);video.pause();animations.forEach(a=>a.cancel());animations=[];
  landscape.style.opacity='';landscape.style.transform='none';caption.style.opacity='0';caption.setAttribute('aria-hidden','true');paused=false;
 }
 function animate(el,frames,options){const a=el.animate(frames,{fill:'forwards',...options});animations.push(a);return a;}
 async function circulate(){
  if(state!=='play'||phase==='landscape'||phase==='transition')return;
  const token=request;video.pause();cancelAnimationFrame(raf);setPhase('transition');
  try{await landscape.decode();}catch{if(token===request)hooks.error('A imagem de circulação não carregou. Preserve a pasta assets.');return;}
  if(token!==request||state!=='play')return;
  landscape.classList.add('active');landscape.setAttribute('aria-hidden','false');
  const fade=animate(landscape,[{opacity:0},{opacity:1}],{duration:reduced.matches?0:900});
  fade.finished.then(()=>{if(token===request){setPhase('landscape');sync();}}).catch(()=>{});
  if(!reduced.matches)animate(landscape,[{transform:'translate(0%,0%) scale(1)'},{transform:'translate(2%,8%) scale(1.8)'}],{duration:14000,easing:'cubic-bezier(.25,.1,.35,1)'});
  caption.setAttribute('aria-hidden','false');
  animate(caption,[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:reduced.matches?0:450,delay:1600,easing:'ease-out'});
  if(paused)animations.forEach(a=>a.pause());sync();
 }
 function watch(){
  if(state!=='play'||phase!=='video'||paused)return;
  if(video.currentTime>=4.96){video.pause();video.currentTime=4.96;circulate();return;}
  raf=requestAnimationFrame(watch);
 }
 async function play(restart=false){
  if(state!=='play')return;
  if(restart||!started||video.ended){cancelPassage();video.currentTime=0;select(poster);setPhase('video');}
  if(['transition','landscape'].includes(phase)){
   paused=false;animations.forEach(a=>{if(a.playState==='paused')a.play();});sync();return;
  }
  const token=request;started=true;paused=false;sync();
  try{
   await landscape.decode();if(token!==request||state!=='play')return;
   await video.play();if(token!==request||state!=='play')return;
   select(video);setPhase('video');hooks.playing();watch();sync();
  }catch(e){if(token===request&&e.name!=='AbortError'){started=false;sync();hooks.error('Clique em Reproduzir a entrega para iniciar o vídeo.');}}
 }
 function pause(){if(state!=='play')return;paused=true;video.pause();cancelAnimationFrame(raf);animations.forEach(a=>{if(a.playState==='running')a.pause();});sync();}
 function leave(){cancelPassage();state=null;started=false;setPhase('idle');start.hidden=true;}
 function render(b,{surface,move,stopCamera},autoplay){
  surface('moderno-scene');
  if(b.state==='play'){
   if(state!=='play'){cancelPassage();state='play';started=false;video.currentTime=0;select(poster);setPhase('idle');}
   sync();if(autoplay&&!started)play();return;
  }
  if(state==='play')leave();state='photo';start.hidden=true;
  const changed=current!==b.shot;let img=photos[active];
  if(changed){active=1-active;img=photos[active];stopCamera(img);img.style.transform='none';img.src='assets/moderno/'+b.shot+'.png';img.alt=descriptions[b.shot];current=b.shot;}
  select(img);move(img,b.camera||[1,0,0],changed?(b.from||[1,0,0]):undefined,b.duration||0,'cubic-bezier(.22,.1,.35,1)');
 }
 start.onclick=()=>play();
 video.addEventListener('ended',()=>{if(state==='play')circulate();});
 video.addEventListener('error',()=>{if(state==='play'){started=false;sync();hooks.error('O vídeo da entrega não carregou. Preserve a pasta assets.');}});
 Object.keys(descriptions).forEach(k=>{const i=new Image();i.src='assets/moderno/'+k+'.png';});
 window.JusLabModerno={render,leave,pause,play,video,init(o){hooks=o;},toggle(){if(state==='play'){if(paused||!started)play();else pause();}},label(){return !started?'Reproduzir entrega':paused?'Continuar passagem':'Pausar passagem';}};
})();
