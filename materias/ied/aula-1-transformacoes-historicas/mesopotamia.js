(()=>{
 'use strict';
 const $=id=>document.getElementById(id),root=$('visual'),stage=$('stage');
 const assets={
  mari:{file:'mari-acompanhamento-v1.png',alt:'Reconstrução ilustrativa: escriba, acompanhantes e mulher junto ao rio, em ambiente inspirado em Mari.',kind:'scene',label:'Mari · reconstrução ilustrativa'},
  stele:{file:'hammurabi-estela-inteira-mbzt.jpg',alt:'Fotografia da estela de Hammurabi inteira, com relevo superior e inscrições.',kind:'object',label:'Peça real · Louvre · Sb 8'},
  relief:{file:'hammurabi-relevo-mbzt.jpg',alt:'Fotografia do relevo: Hammurabi de pé à esquerda, diante de Shamash sentado à direita.',kind:'relief',label:'Relevo da estela · fotografia da peça real'},
  writing:{file:'hammurabi-inscricoes-mbzt.jpg',alt:'Fotografia das inscrições cuneiformes na estela de Hammurabi; nenhum parágrafo específico é identificado.',kind:'writing',label:'Estela de Hammurabi · inscrições reais'},
  scribes:{file:'escribas-comparacao-v2.png',alt:'Reconstrução ilustrativa de dois escribas comparando tabuinhas de argila; inscrições não são transcrições documentais.',kind:'scene',label:'Ambiente escribal · reconstrução ilustrativa'},
  tablet:{file:'contrato-colheita-met-1121714.jpg',alt:'Fotografia de uma tabuinha babilônica: contrato de colheita de Sippar, cerca de 1640 a.C., Metropolitan Museum 11.217.14.',kind:'tablet',label:'Peça real · Metropolitan · 11.217.14'},
  synthesis:{file:'rei-escriba-sagrado-v2.png',alt:'Cena interpretativa: governante à esquerda, escriba à direita e um mural religioso inventado ao fundo; não representa um julgamento identificado.',kind:'scene',label:'Realeza e escribas · reconstrução ilustrativa'},
  investiture:{file:'mari-investidura-marie-lan-nguyen.jpg',alt:'Fotografia da Pintura da Investidura de Mari, com lacunas preservadas; não se afirma a identidade do rei representado.',kind:'mural',label:'Pintura da Investidura · Mari · início do II milênio a.C.'}
 };
 root.insertAdjacentHTML('beforeend','<div id="mesopotamia-scene" class="surface"><figure class="mesop-shot"><img alt=""></figure><figure class="mesop-shot"><img alt=""></figure><p id="mesop-provenance"></p></div>');
 const roles=document.createElement('div');roles.id='mesop-roles';roles.hidden=true;
 for(const label of ['Poder régio','Saber dos escribas','Ordem divina']){
  const span=document.createElement('span');span.textContent=label;span.hidden=true;roles.append(span);
 }
 $('support').before(roles);
 for(const [scene,label] of [[14,'B3 · O procedimento'],[15,'B3 · A estela'],[16,'B3 · Os escribas'],[17,'B3 · A síntese']]){
  const b=document.createElement('button');b.dataset.scene=scene;b.textContent=label;$('chapters').append(b);
 }
 $('chapters').setAttribute('aria-label','Cenas dos Blocos 1, 2 e 3');
 const source=document.createElement('a');source.href='fontes-mesopotamia.html';source.target='_blank';source.rel='noopener';source.textContent='Fontes e imagens';source.className='sources-link';$('controls').append(source);
 const shots=[...document.querySelectorAll('.mesop-shot')];let current=null,active=0;
 // Preload the eight local assets; no network requirement or synthesized artefacts.
 Object.values(assets).forEach(a=>{const i=new Image();i.src='assets/mesopotamia/'+a.file;});
 window.JusLabMesopotamia={
  syncCopy(b){
   roles.hidden=b.mode!=='mesopotamia'||!b.reveal;
   [...roles.children].forEach((s,i)=>{s.hidden=roles.hidden||i>=b.reveal;s.classList.toggle('current',i===b.reveal-1&&!b.support);});
  },
  render(b,{surface,move,stopCamera}){
   const a=assets[b.shot];surface('mesopotamia-scene');
   const entering=stage.dataset.mesopActive!=='true';
   stage.dataset.mesopActive='true';
   let img=shots[active].querySelector('img');
   if(current!==b.shot||entering){
    active=1-active;const shot=shots[active];img=shot.querySelector('img');stopCamera(img);
    shot.dataset.kind=a.kind;img.src='assets/mesopotamia/'+a.file;img.alt=a.alt;img.style.transform='none';
    shots.forEach(s=>{s.classList.toggle('active',s===shot);s.setAttribute('aria-hidden',String(s!==shot));});
    current=b.shot;
   }
   // An explanation added to an unchanged object should not restart its camera.
   const compact=matchMedia('(max-height:550px) and (orientation:landscape)').matches;
   const camera=compact&&b.cameraCompact?b.cameraCompact:b.camera;
   if(!b.retain||b.reveal!==undefined)move(img,camera||[1,0,0],undefined,b.duration??5000,'cubic-bezier(.22,.1,.35,1)');
   $('mesop-provenance').textContent=a.label;
  }
 };
 // A return from another surface must establish the requested composition afresh.
 const observer=new MutationObserver(()=>{
  if(stage.dataset.mode!=='mesopotamia')stage.dataset.mesopActive='false';
 });
 observer.observe(stage,{attributes:true,attributeFilter:['data-mode']});
})();
