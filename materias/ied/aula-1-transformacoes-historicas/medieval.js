(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const assets={
  philip:['philip.png','Encenação ilustrativa: Philip entre um oficial régio e uma autoridade eclesiástica.'],
  centros:['centros.png','Composição ilustrativa de centros senhoriais, eclesiásticos e urbanos na Europa medieval.'],
  graciano:['graciano.png','Representação interpretativa de Graciano comparando dois manuscritos com um estudante.'],
  bolonha:['bolonha.png','Reconstrução ilustrativa de ensino jurídico em Bolonha: professor, estudantes e manuscritos anotados.'],
  aerea:['aerea.png','Vista aérea interpretativa de Bolonha medieval, com espaços de estudo integrados ao tecido urbano.']
 };
 $('visual').insertAdjacentHTML('beforeend',`<div id="medieval-scene" class="surface">
 <img id="medieval-photo-a" alt=""><img id="medieval-photo-b" alt="">
 <img id="philip-poster" src="assets/medieval/philip.png" alt="Philip entre as autoridades, antes da convocação e da objeção.">
 <video id="philip-video" src="assets/medieval/philip.mp4" poster="assets/medieval/philip.png" muted playsinline preload="metadata" aria-label="Um oficial apresenta a convocação, Philip olha para a autoridade eclesiástica e ela manifesta uma objeção."></video>
 <img id="philip-held" src="assets/medieval/philip-final.jpg" alt="Philip continua entre as autoridades; a disputa permanece aberta.">
 <div id="medieval-map" role="img" aria-label="Europa continental: uma cultura romano-canônica compartilhada coexistia com direitos locais. Não representa fronteiras ou rotas históricas.">
 <svg viewBox="0 0 1440 650" preserveAspectRatio="xMidYMid meet"><path class="grid"></path><path class="land"></path><text x="520" y="135">Europa continental</text></svg>
 <div class="sharing"><span>Direito romano</span><span>Direito canônico</span></div>
 <p class="local-rights">Costumes e direitos particulares</p></div>
 <p id="medieval-caption"></p></div>`);
 const start=document.createElement('button');start.id='philip-start';start.textContent='Reproduzir a cena ▷';start.hidden=true;$('copy').append(start);
 for(const [scene,label] of [[32,'B6 · Philip'],[33,'B6 · Quem julga?'],[34,'B6 · Muitos centros'],[35,'B6 · Graciano'],[36,'B6 · Bolonha'],[37,'B6 · Ius commune']]){
  const b=document.createElement('button');b.dataset.scene=scene;b.textContent=label;$('chapters').append(b);
 }
 $('chapters').setAttribute('aria-label','Cenas dos Blocos 1 a 6');
 const source=document.createElement('a');source.href='fontes-medieval.html';source.target='_blank';source.rel='noopener';source.className='sources-link';source.textContent='Idade Média · fontes e imagens';$('controls').append(source);
 const projection=d3.geoMercator().center([12,49]).scale(950).translate([720,295]),geo=d3.geoPath(projection);
 $('medieval-map').querySelector('.land').setAttribute('d',geo(topojson.feature(window.JusLabLand,window.JusLabLand.objects.land)));
 $('medieval-map').querySelector('.grid').setAttribute('d',geo(d3.geoGraticule10()));
 const video=$('philip-video'),hold=$('philip-held'),poster=$('philip-poster'),photos=[$('medieval-photo-a'),$('medieval-photo-b')],map=$('medieval-map'),media=[...photos,video,hold,poster,map];
 let active=0,current=null,state=null,started=false,request=0,hooks={change(){},error(){},playing(){}};
 function select(el){media.forEach(e=>{e.classList.toggle('active',e===el);e.setAttribute('aria-hidden',String(e!==el));});}
 function sync(){start.hidden=!(state==='play'&&!started);hooks.change();}
 function pause(){++request;video.pause();sync();}
 async function play(restart=false){
  if(state!=='play')return;
  const token=++request;
  if(restart||video.ended){video.pause();video.currentTime=0;}
  started=true;sync();
  try{await video.play();if(token!==request)return;if(state!=='play'){video.pause();return;}select(video);hooks.playing();sync();}
  catch(e){if(token===request&&e.name!=='AbortError'){started=false;sync();hooks.error('Use Reproduzir a cena para iniciar o vídeo de Philip.');}}
 }
 function leave(){++request;video.pause();state=null;started=false;current=null;start.hidden=true;}
 function render(b,{surface,move,stopCamera},autoplay){
  surface('medieval-scene');
  const caption=$('medieval-caption');
  caption.hidden=!['aerea','map'].includes(b.shot);
  caption.textContent=b.shot==='centros'?'Europa medieval · composição ilustrativa':b.shot==='graciano'?'Graciano · representação interpretativa':b.shot==='bolonha'?'Bolonha · ensino jurídico · reconstrução ilustrativa':b.shot==='aerea'?'Bolonha medieval · vista interpretativa, não levantamento arqueológico':b.shot==='map'?'Circulação de saberes · base geográfica sem fronteiras políticas':'Philip of Brois · encenação ilustrativa, não encontro documentado';
  if(b.state==='play'){
   if(state!=='play'){++request;video.pause();video.currentTime=0;started=false;select(poster);}
   state='play';sync();if(autoplay&&!started)play();return;
  }
  ++request;video.pause();state=b.state||'photo';sync();
  if(state==='hold'){select(hold);return;}
  if(b.shot==='map'){map.dataset.state=b.mapState||'shared';select(map);return;}
  const a=assets[b.shot];let img=photos[active],changed=current!==b.shot;
  if(changed){active=1-active;img=photos[active];stopCamera(img);img.style.transform='none';img.src='assets/medieval/'+a[0];img.alt=a[1];current=b.shot;}
  select(img);
  // The flyover continues to its final framing before the next shot; its second
  // beat holds that destination instead of returning to the starting zoom.
  move(img,b.camera||[1,0,0],changed?b.from:undefined,b.duration??0,'cubic-bezier(.22,.1,.35,1)');
 }
 video.addEventListener('ended',()=>{if(state==='play'){select(hold);sync();}});
 video.addEventListener('error',()=>{if(state==='play'){started=false;sync();hooks.error('O vídeo de Philip não carregou. Preserve a pasta assets.');}});
 start.onclick=()=>play();
 Object.values(assets).forEach(a=>{const i=new Image();i.src='assets/medieval/'+a[0];});
 window.JusLabMedieval={video,render,leave,pause,play,init(o){hooks=o;},toggle(){if(state==='play'){if(video.paused)play();else pause();}},label(){return video.ended?'Rever vídeo':video.paused?'Reproduzir vídeo':'Pausar vídeo';}};
})();
