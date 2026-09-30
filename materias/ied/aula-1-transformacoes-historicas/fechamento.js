(()=>{
'use strict';
const $=id=>document.getElementById(id),stage=$('stage'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const fragments=[
 ['assets/mesopotamia/rei-escriba-sagrado-v2.png','Mesopotâmia','Autoridade divina e poder régio','Reconstrução de rei, escriba e dimensão sagrada da autoridade mesopotâmica.'],
 ['assets/grecia/03-julgamento-atena-v1.png','Grécia · Oresteia','Da vingança ao julgamento público','Reconstrução simbólica do julgamento de Orestes com Atena.'],
 ['assets/grecia/05-justica-distributiva-v2.png','Grécia','Busca da justiça','Exemplo didático de distribuição de bens e encargos.'],
 ['assets/roma/pontifices.png','Roma','Religião, ritos e pontífices','Reconstrução de ritual e estudo jurídico pelos pontífices romanos.'],
 ['assets/roma/debate.png','Roma','Interpretação e argumentação','Reconstrução de juristas romanos debatendo diante de uma tabuinha.'],
 ['assets/medieval/graciano.png','Idade Média','Tradição, religião e saber jurídico','Reconstrução do estudo de textos jurídicos no contexto medieval.']
];
const scene=document.createElement('div');scene.id='closing-scene';scene.className='surface';scene.dataset.moving='false';
const mosaic=document.createElement('div');mosaic.id='closing-fragments';
fragments.forEach(([src,era,title,alt])=>{
 const f=document.createElement('figure'),img=new Image(),caption=document.createElement('figcaption'),tag=document.createElement('span'),label=document.createElement('strong');
 img.src=src;img.alt=alt;tag.textContent=era;label.textContent=title;caption.append(tag,label);f.append(img,caption);mosaic.append(f);
});
scene.append(mosaic);
for(const [id,src,alt] of [['closing-office','assets/fechamento/assinatura.png','Ilustração contemporânea fictícia: autoridade assina um documento, com uma funcionária e a cidade ao fundo.'],['closing-city','assets/fechamento/cidade.png','Vista panorâmica ilustrativa de uma cidade contemporânea, com edifícios, ruas e circulação urbana.']]){
 const img=new Image();img.id=id;img.src=src;img.alt=alt;img.className='closing-full';scene.append(img);
}
$('visual').append(scene);
for(const [sceneNumber,title] of [[62,'B11 · Retrospectiva'],[63,'B11 · A pergunta final']]){
 const button=document.createElement('button');button.dataset.scene=sceneNumber;button.textContent=title;$('chapters').append(button);
}
$('chapters').setAttribute('aria-label','Cenas dos Blocos 1 a 11');
const link=document.createElement('a');link.href='fontes-fechamento.html';link.target='_blank';link.rel='noopener';link.className='sources-link';link.textContent='Fechamento · imagens e direção';$('controls').append(link);
new ResizeObserver(()=>document.documentElement.style.setProperty('--closing-controls-height',$('controls').getBoundingClientRect().height+'px')).observe($('controls'));
new ResizeObserver(()=>stage.style.setProperty('--closing-copy-height',$('copy').offsetHeight+'px')).observe($('copy'));
const office=$('closing-office'),city=$('closing-city');
let generation=0,animations=new Set(),activeState=null;
function cancel(){
 generation++;for(const a of animations)a.cancel();animations.clear();scene.dataset.moving='false';
}
function animate(el,keyframes,options){
 const a=el.animate(keyframes,{fill:'forwards',...options});animations.add(a);
 return a.finished.then(()=>{const last=keyframes[keyframes.length-1];for(const [prop,value]of Object.entries(last))el.style[prop]=value;animations.delete(a);a.cancel();return true;},()=>false);
}
function focal(img,scale,x,y){
 const w=scene.clientWidth,h=scene.clientHeight,s=Math.max(w/img.naturalWidth,h/img.naturalHeight);
 const px=(x*img.naturalWidth*s-(img.naturalWidth*s-w)/2)/w;
 const py=(y*img.naturalHeight*s-(img.naturalHeight*s-h)/2)/h;
 return 'translate3d('+((.5-px)*scale*100)+'%,'+((.5-py)*scale*100)+'%,0) scale('+scale+')';
}
function finalFrame(){
 mosaic.hidden=true;office.style.opacity='0';city.style.opacity='1';city.style.transform='none';scene.dataset.moving='false';
}
function render(b,api){
 cancel();activeState=b.state;api.surface('closing-scene');scene.dataset.state=b.state;
 mosaic.hidden=b.state!=='retrospective';
 office.style.opacity=b.state==='retrospective'?'0':'1';office.style.transform='none';
 city.style.opacity='0';city.style.transform='none';
 [...mosaic.children].forEach((f,i)=>{
  const revealed=i<b.count;f.classList.toggle('revealed',revealed);f.classList.toggle('current',i===b.count-1&&!b.overview);f.setAttribute('aria-hidden',String(!revealed));
 });
 mosaic.classList.toggle('overview',!!b.overview);
}
async function play(motion){
 const token=++generation;
 await Promise.all([office.decode(),city.decode()]);
 if(token!==generation)return false;
 if(!motion||reduced.matches){finalFrame();return true;}
 scene.dataset.moving='true';
 const officeEnd=focal(office,4.2,.84,.25),cityStart=focal(city,3.8,.70,.29);
 city.style.transform=cityStart;
 if(!await animate(office,[{transform:'none'},{transform:officeEnd}],{duration:2700,easing:'cubic-bezier(.45,0,.3,1)'}))return false;
 if(token!==generation)return false;
 const retreat=animate(city,[{transform:cityStart},{transform:'none'}],{duration:8500,easing:'cubic-bezier(.16,.2,.25,1)'});
 const dissolve=animate(city,[{opacity:0},{opacity:1}],{duration:1600,easing:'ease-in-out'});
 if(!await dissolve||token!==generation)return false;
 office.style.opacity='0';
 if(!await retreat||token!==generation)return false;
 finalFrame();return true;
}
function leave(){cancel();activeState=null;}
window.JusLabClosing={render,play,cancel,leave};
})();
