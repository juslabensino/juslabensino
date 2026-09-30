(()=>{
 'use strict';
 const $=id=>document.getElementById(id),visual=$('visual');
 const markup=`
 <div id="history-montage" class="surface" aria-label="Uma simplificação enganosa da história se desfaz em experiências distintas">
  <div class="epoch-field">
   <figure class="epoch"><img src="assets/archaic-mesopotamia-v1-1.png" alt="Reconstrução de autoridade régia e religiosa na Mesopotâmia."><figcaption class="epoch-label">Religião</figcaption></figure>
   <figure class="epoch"><img src="assets/dike-adikia-v1-1.png" alt="Representação mítica grega da justiça."><figcaption class="epoch-label">Razão</figcaption></figure>
   <figure class="epoch"><img src="assets/roman-jurist-v1-1.png" alt="Reconstrução de um jurista romano."><figcaption class="epoch-label">Técnica</figcaption></figure>
   <figure class="epoch"><img src="assets/early-modern-royal-council-v1.png" alt="Reconstrução de um conselho régio."><figcaption class="epoch-label">Estado</figcaption></figure>
   <figure class="epoch"><img src="assets/code-civil-printing-v1.png" alt="Reconstrução de uma oficina de impressão de um código."><figcaption class="epoch-label">Direito moderno</figcaption></figure>
  </div>
  <svg class="ladder-line" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="M90 360 H275 V310 H450 V250 H635 V190 H820 V120 H950"/></svg>
  <p class="interpretation">Uma simplificação enganosa</p>
 </div>
 <div id="map-scene" class="surface" aria-label="Base geográfica sem fronteiras políticas para situar o recorte da aula">
  <div id="map-lens"><svg id="world-map" viewBox="0 0 1440 720" role="img" aria-label="Continentes, Mediterrâneo e referência ao Brasil; não representa fronteiras históricas">
   <path id="world-graticule"/><path id="world-land"/>
   <g id="scope-regions"></g><g id="brazil-region"></g>
  </svg></div>
  <div class="map-caption">Base geográfica · sem fronteiras políticas</div>
 </div>
 <div id="context-scene" class="surface" aria-label="Compreender o escriba dentro de seu próprio contexto">
  <img id="context-scribe" src="assets/escriba.jpg" alt="Reconstrução ilustrativa de um escriba trabalhando com uma tabuleta de argila.">
  <div id="present-lens" aria-hidden="true"><span>O olhar de hoje</span></div>
 </div>`;
 visual.insertAdjacentHTML('beforeend',markup);
 const labelField=document.createElement('div');labelField.className='epoch-labels';
 document.querySelectorAll('.epoch figcaption').forEach(caption=>{
  const label=document.createElement('p');label.className='epoch-label';label.textContent=caption.textContent;
  labelField.append(label);caption.remove();
 });
 $('history-montage').append(labelField);
 const chapters=[['7','B2 · A escada'],['8','B2 · O recorte'],['9','B2 · O olhar'],['10','B2 · A história']];
 for(const [scene,text] of chapters){const button=document.createElement('button');button.dataset.scene=scene;button.textContent=text;$('chapters').append(button);}
 $('chapters').setAttribute('aria-label','Cenas dos Blocos 1 e 2');
 const d3=window.d3,projection=d3.geoNaturalEarth1().fitExtent([[60,20],[1380,680]],{type:'Sphere'}),geo=d3.geoPath(projection);
 $('world-land').setAttribute('d',geo(window.topojson.feature(window.JusLabLand,window.JusLabLand.objects.land)));
 $('world-graticule').setAttribute('d',geo(d3.geoGraticule10()));
 const ns='http://www.w3.org/2000/svg';
 function region(parent,coordinates,label,dx,dy){
  const [x,y]=projection(coordinates),g=document.createElementNS(ns,'g'),circle=document.createElementNS(ns,'circle'),text=document.createElementNS(ns,'text');
  circle.setAttribute('cx',x);circle.setAttribute('cy',y);circle.setAttribute('r',12);
  text.setAttribute('x',x+dx);text.setAttribute('y',y+dy);text.textContent=label;
  g.append(circle,text);parent.append(g);
 }
 region($('scope-regions'),[12,49],'Europa',-75,-23);
 region($('scope-regions'),[44,33],'Mesopotâmia',18,27);
 region($('brazil-region'),[-52,-14],'Brasil',-22,52);
 let state=null;
 window.JusLabBlock2={render(b,{surface,move}){
  if(b.mode==='epochs'){
   surface('history-montage');$('history-montage').dataset.state=b.state;
   const labels=b.state==='ladder'?['Religião','Razão','Técnica','Estado','Direito moderno']:['Mesopotâmia','Grécia','Roma','Monarquias','Codificação'];
   document.querySelectorAll('.epoch-label').forEach((e,i)=>e.textContent=labels[i]);
  }else if(b.mode==='map'){
   surface('map-scene');$('map-scene').dataset.state=b.state;
   const targets={scope:[1.3,-8,6],world:[1,0,0],brazil:[1.18,7,-1]};
   move($('map-lens'),targets[b.state],state?.mode==='map'?undefined:[1.3,-8,6],2800);
  }else{
   surface('context-scene');$('context-scene').dataset.state=b.state;
   if(state?.mode!=='context')$('context-scribe').style.transform='none';
   move($('context-scribe'),b.state==='name'?[1.04,0,0]:[1,0,0],undefined,3200);
  }
  state=b;
 }};
})();
