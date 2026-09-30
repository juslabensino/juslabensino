(()=>{
 'use strict';
 const root=document.getElementById('writing-bridge');
 const contract=document.getElementById('bridge-contract'),scribe=document.getElementById('bridge-scribe');
 let active=[],generation=0;
 function cancel(){
  generation++;
  for(const el of [contract,scribe]){const c=getComputedStyle(el);el.style.transform=c.transform;el.style.opacity=c.opacity;}
  for(const a of active)a.cancel();active=[];
 }
 // Map the writing hands from source coordinates to the same screen location.
 function closeup(img,point,zoom){
  const w=root.clientWidth,h=root.clientHeight;
  const fit=Math.max(w/img.naturalWidth,h/img.naturalHeight);
  const iw=img.naturalWidth*fit,ih=img.naturalHeight*fit;
  const anchorX=img===scribe?1:.5;
  const px=(w-iw)*anchorX+point[0]*iw,py=(h-ih)/2+point[1]*ih;
  const x=Math.max(w*(1-zoom),Math.min(0,w*.5-zoom*px));
  const y=Math.max(h*(1-zoom),Math.min(0,h*.58-zoom*py));
  return `translate(${x}px,${y}px) scale(${zoom})`;
 }
 async function play(animate){
  cancel();const token=generation;
  await Promise.all([contract,scribe].map(img=>img.decode().catch(()=>{})));
  if(token!==generation)return false;
  if(!contract.naturalWidth||!scribe.naturalWidth)return false;
  const handA=closeup(contract,[.382,.795],2.45),handB=closeup(scribe,[.465,.746],2.2);
  contract.style.transform='none';contract.style.opacity='1';
  scribe.style.transform=animate?handB:'none';scribe.style.opacity=animate?'0':'1';
  if(!animate){root.dataset.phase='complete';return true;}
  root.dataset.phase='moving';
  const ease='cubic-bezier(.4,0,.2,1)',options={duration:7600,fill:'forwards'};
  active=[
   contract.animate([{transform:'none',offset:0,easing:ease},{transform:handA,offset:.4},{transform:handA,offset:1}],options),
   scribe.animate([{transform:handB,offset:0},{transform:handB,offset:.58,easing:ease},{transform:'none',offset:1}],options),
   scribe.animate([{opacity:0,offset:0},{opacity:0,offset:.4,easing:'ease-in-out'},{opacity:1,offset:.58},{opacity:1,offset:1}],options)
  ];
  try{await Promise.all(active.map(a=>a.finished));}catch{return false;}
  if(token!==generation)return false;
  contract.style.transform=handA;scribe.style.transform='none';scribe.style.opacity='1';
  for(const a of active)a.cancel();active=[];root.dataset.phase='complete';return true;
 }
 window.JusLabBridge={play,cancel};
})();
