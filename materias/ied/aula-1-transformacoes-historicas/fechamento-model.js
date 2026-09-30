(()=>{
'use strict';
const question='Em que se apoiava a autoridade do Direito?';
for(let count=1;count<=6;count++)window.JusLabModel.beats.push({
 scene:62,mode:'closing',state:'retrospective',count,title:question,retain:count>1,layout:'closing-retro'
});
window.JusLabModel.beats.push(
 {scene:62,mode:'closing',state:'retrospective',count:6,overview:true,title:'Essas dimensões se combinaram de maneiras diferentes.',layout:'closing-retro'},
 {scene:63,mode:'closing',state:'office',title:'O Estado concentra o poder de produzir e reconhecer o Direito.',layout:'closing-office'},
 {scene:63,mode:'closing',state:'city',title:'O que torna justo o Direito contemporâneo?',layout:'closing-city'}
);
})();
