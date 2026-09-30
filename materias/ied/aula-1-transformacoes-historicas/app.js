(()=>{
 'use strict';
 const M=window.JusLabModel,$=id=>document.getElementById(id),stage=$('stage'),copy=$('copy'),video=$('return-video');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const layers=[...document.querySelectorAll('.photo-layer')];
 const names=['Uma manhã comum','Muitas regras','O problema','Uma conduta','Um mundo de normas','Da vida cotidiana à história','A falsa escada','O percurso escolhido','Compreender antes de comparar','Entrar naquele mundo','Mesopotâmia','A ordália','Religião ou Direito?','O procedimento','A estela de Hammurabi','O trabalho dos escribas','A autoridade da decisão'];
 names.push('Grécia','A família dos Atridas','Orestes e as Erínias','O julgamento público','A pergunta pelo justo','Justiça distributiva','Justiça corretiva','Quem decide e o que é justo');
 names.push('Roma','O imprevisto','Duas interpretações','Construir o problema jurídico','Que arte é essa?','Construir e argumentar');
 names.push('Idade Média: Philip','O poder de julgar','Muitos centros de autoridade','Graciano e os textos','Bolonha e o ensino','Ius commune');
 names.push('A formação do Estado moderno','A entrega e a circulação','O idioma dos registros','Os limites de julgar','Os meios de governar','A centralidade do Estado');
 names.push('Comércio, confiança e previsibilidade','O acordo','A prova','O cumprimento','As instituições','Previsibilidade');
 names.push('Organizar o Direito','França, 1804','O sistema','A grande expectativa','O intérprete','O limite da codificação');
 names.push('Igualdade formal','Uma conquista','O conceito de igualdade formal','Todos estavam incluídos?','A restrição legal','Uma conquista e seus limites');
 names.push('Fundamentos da autoridade jurídica','A pergunta final');
 const closing=window.JusLabClosing;
 const ordalia=window.JusLabOrdalia,orestes=window.JusLabOrestes,roma=window.JusLabRoma,medieval=window.JusLabMedieval,moderno=window.JusLabModerno,comercio=window.JusLabComercio,codificacao=window.JusLabCodificacao,igualdade=window.JusLabIgualdade;
 const descriptions={permission:'Uma criança pede autorização para usar um estojo.',traffic:'Motorista parada diante do sinal vermelho.',access:'Um estudante apresenta identificação para entrar.',family:'Uma mensagem na vida familiar.',religion:'Uma pessoa participa de uma oração coletiva.',contract:'Duas pessoas formalizam um compromisso.',escriba:'Reconstrução ilustrativa: escriba trabalhando com argila.',history:'Reconstrução ilustrativa de uma cidade mesopotâmica junto ao rio.'};
 const urls={escriba:'assets/escriba.jpg'};
 Object.keys(descriptions).forEach(k=>{urls[k]||=`assets/${k}.png`;const img=new Image();img.src=urls[k];});
 let index=M.clamp(new URLSearchParams(location.search).get('beat')||0),revision=0,copyAnimation=null,photoKey=null,activeLayer=0;
 let clipStarted=false,clipComplete=false,playRevision=0;
 const cameras=new Map();
 function stopCamera(el){const a=cameras.get(el);if(a){el.style.transform=getComputedStyle(el).transform;a.cancel();cameras.delete(el);}}
 function transform([scale,x,y]){return `translate3d(${x}%,${y}%,0) scale(${scale})`;}
 function move(el,target,from,duration=3200,easing='cubic-bezier(.25,.1,.25,1)'){
  stopCamera(el);if(from)el.style.transform=transform(from);
  const end=transform(target);
  if(reduced.matches){el.style.transform=end;return;}
  const animation=el.animate([{transform:getComputedStyle(el).transform},{transform:end}],{duration,easing,fill:'forwards'});
  cameras.set(el,animation);
  animation.finished.then(()=>{if(cameras.get(el)===animation){el.style.transform=end;animation.cancel();cameras.delete(el);}}).catch(()=>{});
 }
 function notify(text){$('notice').textContent=text;$('notice').hidden=false;}
 function clean(value){document.body.classList.toggle('clean',value);$('restore').hidden=!value;}
 function syncControls(){
  stage.dataset.beat=index;$('timeline').value=index;$('timeline').max=M.beats.length-1;
  $('timeline').setAttribute('aria-valuetext',`${names[M.beats[index].scene-1]}, batida ${index+1} de ${M.beats.length}`);
  $('counter').textContent=`${String(index+1).padStart(2,'0')} / ${M.beats.length}`;
  $('previous').disabled=index===0;$('next').disabled=index===M.beats.length-1;
  const inOrdalia=M.beats[index].mode==='ordalia'&&M.beats[index].state==='play';
  const inOrestes=M.beats[index].mode==='orestes'&&M.beats[index].state==='play';
  const inRoma=M.beats[index].mode==='roma'&&M.beats[index].state==='play';
  const inMedieval=M.beats[index].mode==='medieval'&&M.beats[index].state==='play';
  const inModerno=M.beats[index].mode==='moderno'&&M.beats[index].state==='play';
  const inComercio=M.beats[index].mode==='comercio'&&M.beats[index].state==='play';
  const inCodificacao=M.beats[index].mode==='codificacao'&&M.beats[index].state==='play';
  const inIgualdade=M.beats[index].mode==='igualdade'&&M.beats[index].state==='play';
  const inVideo=M.beats[index].mode==='video'||inOrdalia||inOrestes||inRoma||inMedieval||inModerno||inComercio||inCodificacao||inIgualdade;
  $('play-video').hidden=!inVideo;$('replay').hidden=!inVideo;
  $('play-video').textContent=inIgualdade?igualdade.label():inCodificacao?codificacao.label():inComercio?comercio.label():inModerno?moderno.label():inMedieval?medieval.label():inRoma?roma.label():inOrestes?orestes.label():inOrdalia?ordalia.label():clipComplete?'Rever vídeo':video.paused?'Reproduzir vídeo':'Pausar vídeo';
  $('video-start').hidden=!(index===14&&!clipStarted);
  document.querySelectorAll('#chapters button').forEach(b=>{if(Number(b.dataset.scene)===M.beats[index].scene)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 }
 function surface(id){document.querySelectorAll('.surface').forEach(e=>{const visible=e.id===id;e.classList.toggle('visible',visible);e.setAttribute('aria-hidden',String(!visible));});}
 function visual(b,autoplay=false){
  stage.dataset.layout=b.layout;stage.dataset.mode=b.mode;stage.setAttribute('aria-label',names[b.scene-1]);
  stage.dataset.block=b.scene>=62?'11':b.scene>=56?'10':b.scene>=50?'9':b.scene>=44?'8':b.scene>=38?'7':b.scene>=32?'6':b.scene>=26?'5':b.scene>=18?'4':b.scene>=11?'3':b.scene>=7?'2':'1';
  document.querySelector('header span').textContent=b.scene>=56?'Bloco 10 · Igualdade formal':b.scene>=50?'Bloco 9 · Codificação':b.scene>=44?'Bloco 8 · Comércio e confiança':b.scene>=38?'Bloco 7 · Estado moderno':b.scene>=32?'Bloco 6 · Idade Média':b.scene>=26?'Bloco 5 · Roma':b.scene>=18?'Bloco 4 · Grécia':b.scene>=11?'Bloco 3 · Mesopotâmia':b.scene>=7?'Bloco 2 · Um olhar histórico':'Bloco 1 · Um mundo de normas';
  stage.dataset.question=String(index===12||index===13);
  if(b.scene>=62)document.querySelector('header span').textContent='Bloco 11 · O que ficou em aberto?';
  window.JusLabMesopotamia.syncCopy(b);
  if(b.mode==='closing'){
   closing.render(b,{surface,move,stopCamera});
  }else if(b.mode==='igualdade'){
   igualdade.render(b,{surface,move,stopCamera},autoplay&&!reduced.matches);
  }else if(b.mode==='codificacao'){
   codificacao.render(b,{surface,move,stopCamera},autoplay&&!reduced.matches);
  }else if(b.mode==='comercio'){
   comercio.render(b,{surface,move,stopCamera},autoplay&&!reduced.matches);
  }else if(b.mode==='moderno'){
   moderno.render(b,{surface,move,stopCamera},autoplay&&!reduced.matches);
  }else if(b.mode==='medieval'){
   medieval.render(b,{surface,move,stopCamera},autoplay&&!reduced.matches);
  }else if(b.mode==='roma'){
   roma.render(b,{surface,move,stopCamera},autoplay&&!reduced.matches);
  }else if(b.mode==='orestes'){
   surface('orestes-scene');orestes.show(b.state,autoplay&&!reduced.matches);
  }else if(b.mode==='grecia'){
   window.JusLabGrecia.render(b,{surface,move,stopCamera});
  }else if(b.mode==='ordalia'){
   surface('ordalia-scene');ordalia.show(b.state,autoplay&&!reduced.matches);
  }else if(b.mode==='mesopotamia'){
   window.JusLabMesopotamia.render(b,{surface,move,stopCamera});
  }else if(['epochs','map','context'].includes(b.mode)){
   window.JusLabBlock2.render(b,{surface,move});
  }else if(b.mode==='photo'){
   surface('photographs');
   let img;const samePhoto=photoKey===b.photo;
   if(photoKey!==b.photo){
    activeLayer=1-activeLayer;const layer=layers[activeLayer];img=layer.querySelector('img');stopCamera(img);
    img.src=urls[b.photo];img.alt=descriptions[b.photo];img.style.objectPosition=b.photo==='traffic'?'70% 35%':b.photo==='escriba'?'100% 50%':'50% 50%';
    img.style.transform=transform(b.from||[1,0,0]);
    layers.forEach(e=>{e.classList.toggle('active',e===layer);e.setAttribute('aria-hidden',String(e!==layer));});photoKey=b.photo;
   }else img=layers[activeLayer].querySelector('img');
   if(index===20){stopCamera(img);img.style.transform='none';}
   else if(b.photo==='history'){
    if(!(b.continueCamera&&samePhoto))move(img,b.camera,b.from,b.duration,b.easing);
   }
   else move(img,b.camera||[1,0,0]);
  }else if(b.mode==='bridge'){
   surface('writing-bridge');
  }else if(b.mode==='composition'){
   surface('composition');
   document.querySelectorAll('#composition figure').forEach(e=>e.classList.toggle('focused',e.dataset.photo===b.focus));
   const destinations={family:[1.12,3,-2],permission:[1.12,3,3],religion:[1.12,-4,-1],traffic:[1.12,-4,3]};
   move($('composition'),destinations[b.focus]||[1,0,0]);
  }else{
   surface('video-scene');
   $('held-frame').hidden=clipStarted&&!clipComplete;
   if(b.mode==='synthesis'){
    video.pause();move($('video-lens'),[1.025,0,0],undefined,4200);
   }else{
    move($('video-lens'),[1,0,0]);
    if(index===14&&!clipStarted)$('held-frame').hidden=true;
   }
  }
 }
 // Replace copy only after exit. Tokens prevent older navigation from writing back later.
 async function render(instant=false,autoplay=false){
  const token=++revision,b=M.beats[index];syncControls();
  window.JusLabBridge.cancel();copy.setAttribute('aria-hidden','false');
  const current={opacity:getComputedStyle(copy).opacity,transform:getComputedStyle(copy).transform};
  if(copyAnimation){copy.style.opacity=current.opacity;copy.style.transform=current.transform;copyAnimation.cancel();copyAnimation=null;}
  const duration=instant||reduced.matches?0:260;
  const sameTitle=$('headline').textContent===b.title;
  // A question retained with its answer never disappears between these two beats.
  const retainQuestion=([12,13,27,28].includes(index)||b.retain||M.beats[index+1]?.retain)&&sameTitle;
  if(duration&&!retainQuestion){
   const a=copy.animate([current,{opacity:0,transform:'translateY(-5px)'}],{duration,easing:'ease-in',fill:'forwards'});copyAnimation=a;
   try{await a.finished;}catch{return;}
   if(token!==revision)return;copy.style.opacity='0';a.cancel();copyAnimation=null;
  }
  if(token!==revision)return;
  if(!retainQuestion)copy.style.opacity='0';
  visual(b,autoplay&&!instant);
  if(b.mode==='closing'&&b.state==='city'){
   copy.style.opacity='0';copy.setAttribute('aria-hidden','true');
   try{
    const complete=await closing.play(autoplay&&!instant&&!reduced.matches);
    if(token!==revision||!complete)return;
   }catch{
    if(token!==revision)return;
    notify('Não foi possível carregar a imagem final. Preserve a pasta assets junto da apresentação.');
   }
   copy.setAttribute('aria-hidden','false');
  }
  if(b.mode==='bridge'){
   copy.style.opacity='0';copy.setAttribute('aria-hidden','true');
   const complete=await window.JusLabBridge.play(autoplay&&!instant&&!reduced.matches);
   if(token!==revision)return;
   if(!complete){notify('Não foi possível carregar as imagens da transição.');return;}
   copy.setAttribute('aria-hidden','false');
  }
  $('headline').textContent=b.title;
  $('support').textContent=b.support||'';$('support').hidden=!b.support;
  $('credit').textContent=b.credit||'';$('credit').hidden=!b.credit;
  if(b.work){const work=document.createElement('em');work.textContent=b.work;$('credit').append(' (',work,')');}
  syncControls();
  if(autoplay&&index===14&&!clipStarted)playClip();
  if(duration&&!retainQuestion){
   const a=copy.animate([{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'ease-out',fill:'forwards'});copyAnimation=a;
   try{await a.finished;}catch{return;}
   if(token!==revision)return;copy.style.opacity='1';copy.style.transform='none';a.cancel();copyAnimation=null;
  }else{copy.style.opacity='1';copy.style.transform='none';}
 }
 function go(n,autoplay=false){
  const target=M.clamp(n);if(target===index)return;
  closing.cancel();
  if(M.beats[target].mode!=='ordalia')ordalia.leave();
  if(M.beats[target].mode!=='orestes')orestes.leave();
  if(M.beats[target].mode!=='roma')roma.leave();
  if(M.beats[target].mode!=='medieval')medieval.leave();
  if(M.beats[target].mode!=='moderno'||M.beats[target].state!=='play')moderno.leave();
  if(M.beats[target].mode!=='codificacao')codificacao.leave();
  if(M.beats[target].mode!=='igualdade')igualdade.leave();
  if(M.beats[target].mode!=='comercio')comercio.leave();
  if(M.beats[target].mode!=='video'){++playRevision;video.pause();}
  if(index===0&&target>0)clean(true);
  index=target;render(false,autoplay);
 }
 async function playClip(restart=false){
  if(M.beats[index].mode!=='video')return;
  const request=++playRevision;$('notice').hidden=true;
  if(restart||clipComplete){video.pause();video.currentTime=0;clipComplete=false;}
  clipStarted=true;$('held-frame').hidden=true;syncControls();
  try{await video.play();if(request!==playRevision||M.beats[index].mode!=='video'){video.pause();return;}clean(true);syncControls();}
  catch(e){if(e.name!=='AbortError')notify('Não foi possível reproduzir o vídeo. Use Reproduzir vídeo nos controles para tentar novamente.');syncControls();}
 }
 function toggleVideo(){if(M.beats[index].mode==='igualdade'){igualdade.toggle();return;}if(M.beats[index].mode==='codificacao'){codificacao.toggle();return;}if(M.beats[index].mode==='comercio'){comercio.toggle();return;}if(M.beats[index].mode==='moderno'){moderno.toggle();return;}if(M.beats[index].mode==='medieval'){medieval.toggle();return;}if(M.beats[index].mode==='roma'){roma.toggle();return;}if(M.beats[index].mode==='orestes'){orestes.toggle();return;}if(M.beats[index].mode==='ordalia'){ordalia.toggle();return;}if(M.beats[index].mode!=='video')return;if(video.paused)playClip();else{++playRevision;video.pause();syncControls();}}
 function replay(){if(M.beats[index].mode==='igualdade')igualdade.play(true);else if(M.beats[index].mode==='codificacao')codificacao.play(true);else if(M.beats[index].mode==='comercio')comercio.play(true);else if(M.beats[index].mode==='moderno')moderno.play(true);else if(M.beats[index].mode==='medieval')medieval.play(true);else if(M.beats[index].mode==='roma')roma.play(true);else if(M.beats[index].mode==='orestes')orestes.play(true);else if(M.beats[index].mode==='ordalia')ordalia.play(true);else if(M.beats[index].mode==='video')playClip(true);}
 async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{notify('Use a opção de tela cheia do próprio navegador.');}}
 $('next').onclick=()=>go(index+1,true);$('previous').onclick=()=>go(index-1);
 $('timeline').oninput=e=>go(e.target.value);
 document.querySelectorAll('#chapters button').forEach(b=>b.onclick=()=>go(M.sceneStart(Number(b.dataset.scene)),Number(b.dataset.scene)===12));
 $('video-start').onclick=()=>playClip();$('play-video').onclick=toggleVideo;$('replay').onclick=replay;
 $('clean').onclick=()=>clean(true);$('restore').onclick=()=>clean(false);$('fullscreen').onclick=fullscreen;
 video.addEventListener('ended',()=>{clipComplete=true;$('held-frame').hidden=false;syncControls();});
 video.addEventListener('error',()=>notify('O vídeo não carregou. Preserve a pasta assets junto da apresentação.'));
 document.addEventListener('keydown',e=>{
  if(e.target.matches('input,textarea,select,[contenteditable="true"]'))return;
  if(e.key===' '&&e.target.closest('button'))return;
  const a=M.action(e);if(!a)return;e.preventDefault();
  if(a==='next')go(index+1,true);else if(a==='previous')go(index-1);else if(a==='first')go(0);else if(a==='last')go(M.beats.length-1);
  else if(a==='controls')clean(!document.body.classList.contains('clean'));else if(a==='show')clean(false);else if(a==='fullscreen')fullscreen();else if(a==='play')toggleVideo();else if(a==='replay')replay();
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden){++playRevision;video.pause();ordalia.pause();orestes.pause();roma.pause();medieval.pause();moderno.pause();comercio.pause();codificacao.pause();igualdade.pause();syncControls();}});
 reduced.addEventListener('change',()=>{cameras.forEach((_,el)=>stopCamera(el));render(true);});
 window.addEventListener('resize',()=>{if(['bridge','mesopotamia'].includes(M.beats[index].mode))render(true);});
 ordalia.init({change:syncControls,error:notify,playing:()=>clean(true)});
 orestes.init({change:syncControls,error:notify,playing:()=>clean(true)});
 roma.init({change:syncControls,error:notify,playing:()=>clean(true)});
 medieval.init({change:syncControls,error:notify,playing:()=>clean(true)});
 moderno.init({change:syncControls,error:notify,playing:()=>clean(true)});
 comercio.init({change:syncControls,error:notify,playing:()=>clean(true)});
 codificacao.init({change:syncControls,error:notify,playing:()=>clean(true)});
 igualdade.init({change:syncControls,error:notify,playing:()=>clean(true)});
 render(true);
})();
