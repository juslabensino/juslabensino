(() => {
  const W = 1055, H = 1491;
  const steps = [
    {
      n:1,title:'Endereçamento',kicker:'A porta de entrada',accent:'#2f8ee5',side:'right',
      lead:'A peça começa indicando o órgão jurisdicional ao qual a demanda é dirigida.',
      point:'Qual juízo possui competência para conhecer esta causa?',
      excerpt:'<span class="petition-title">EXCELENTÍSSIMO JUÍZO DE UMA DAS VARAS CÍVEIS<br>DA COMARCA DE ARAÇATUBA</span>',
      micro:[['Função','Direcionar a demanda ao órgão jurisdicional competente.'],['Base legal','Art. 319, I, do CPC.']],
      rects:[[20,250,235,178],[270,254,470,72]],
      path:'M200 338 H230 Q245 338 245 323 V298 Q245 283 263 283 H295',start:[200,338],end:[295,283]
    },
    {
      n:2,title:'Partes e qualificação',kicker:'Quem pede e contra quem',accent:'#8db444',side:'right',
      lead:'O autor individualiza os sujeitos da relação processual e apresenta os dados necessários à comunicação dos atos.',
      point:'A qualificação não é ornamento: ela identifica as partes, permite a citação e revela a representação pelo advogado.',
      excerpt:'<p><strong>FULANO DE TAL JÚNIOR</strong>, brasileiro, solteiro, servidor público (...) por intermédio de seu advogado, vem propor a presente ação</p><p>em face de <strong>CICLANO SILVA</strong>, brasileiro, casado, comerciante (...).</p>',
      micro:[['Autor e réu','Nome, estado civil, profissão, CPF/CNPJ, endereço e contato.'],['Advogado','Identificação e endereço profissional, com procuração.']],
      rects:[[18,423,242,202],[270,322,470,285]],
      path:'M184 527 H228 Q244 527 244 511 V434 Q244 420 262 420 H272',start:[184,527],end:[272,420]
    },
    {
      n:3,title:'Dos fundamentos de fato',kicker:'A história juridicamente relevante',accent:'#e98520',side:'right',
      lead:'A narrativa fática precisa revelar duas forças: a origem do direito do autor e a resistência do réu.',
      point:'Sem a origem do direito e sem o comportamento contrário do réu, não se compreende por que a tutela jurisdicional se tornou necessária.',
      excerpt:'<p><strong>1.1 Fato constitutivo do direito do autor</strong><br>O autor vendeu ao réu o imóvel, pelo valor ajustado em contrato, e transmitiu-lhe a posse.</p><p><strong>1.2 Ato do réu contrário ao direito</strong><br>O réu deixou de pagar as parcelas, violando o acordo e impedindo o autor de receber o preço.</p>',
      micro:[['Fato constitutivo','Circunstância que cria ou origina o direito afirmado pelo autor.'],['Resistência','Comportamento do réu que viola ou se opõe ao direito.']],
      rects:[[16,640,245,390],[270,611,470,238],[285,650,430,91],[285,756,430,78]],
      path:'M139 714 H232 Q249 714 249 697 V670 Q249 658 269 658 H273',start:[139,714],end:[273,658]
    },
    {
      n:4,title:'Fundamentos jurídicos',kicker:'Dos fatos à consequência jurídica',accent:'#9166c5',side:'right',
      lead:'O advogado explica por que os fatos narrados, interpretados pelo direito, justificam a tutela pretendida.',
      point:'Fundamentar não é empilhar artigos. É construir, em texto, a ponte entre os fatos, as normas aplicáveis e a consequência jurídica.',
      excerpt:'<p><strong>2. FUNDAMENTOS JURÍDICOS</strong></p><p>O contrato firmado entre as partes é válido e eficaz. O inadimplemento injustificado das parcelas caracteriza mora e autoriza o autor a exigir o cumprimento da obrigação, com os encargos legais, ou a resolução do contrato, conforme o ordenamento jurídico.</p>',
      micro:[['Raciocínio','Fato relevante → qualificação jurídica → consequência jurídica.'],['Dispositivos legais','Sustentam a conclusão; não substituem a argumentação.']],
      rects:[[16,1004,242,305],[270,850,470,215]],
      path:'M183 1088 H229 Q245 1088 245 1072 V918 Q245 901 264 901 H273',start:[183,1088],end:[273,901]
    },
    {
      n:5,title:'Pedidos',kicker:'O ponto de chegada',accent:'#e54834',side:'left',
      lead:'Depois de narrar e fundamentar, o autor formula com precisão o que pretende obter do Judiciário.',
      point:'Pedido imediato é a providência jurisdicional; pedido mediato é o bem da vida buscado.',
      excerpt:'<p><strong>PEDIDOS</strong></p><p>Diante do exposto, requer:</p><ol type="a"><li>a concessão da tutela provisória de urgência;</li><li>a citação do réu;</li><li>ao final, a condenação ao pagamento do valor devido, com os encargos legais.</li></ol>',
      micro:[['Imediato','Ex.: condenar, declarar, constituir ou ordenar.'],['Mediato','Ex.: receber quantia, rescindir contrato ou obter indenização.']],
      rects:[[776,292,252,431],[270,1062,470,139]],
      path:'M786 382 H766 Q750 382 750 399 V1068 Q750 1081 731 1081 H724',start:[786,382],end:[724,1081]
    },
    {
      n:6,title:'Provas',kicker:'Como demonstrar os fatos',accent:'#19a8b6',side:'left',
      lead:'O autor indica os meios pelos quais pretende demonstrar a veracidade das alegações relevantes.',
      point:'O pedido de provas não é a produção da prova: ele preserva e anuncia os meios probatórios que poderão ser utilizados.',
      excerpt:'<p><strong>PROVAS</strong></p><p>Protesta provar o alegado por todos os meios de prova em direito admitidos, especialmente prova documental, testemunhal, pericial e depoimento pessoal do réu.</p>',
      micro:[['Objeto','Demonstrar os fatos controvertidos e relevantes.'],['Exemplos','Documentos, testemunhas, perícia e depoimento pessoal.']],
      rects:[[788,748,230,212],[270,1203,470,72]],
      path:'M787 830 H772 Q756 830 756 847 V1218 Q756 1230 737 1230 H724',start:[787,830],end:[724,1230]
    },
    {
      n:7,title:'Valor da causa',kicker:'A expressão econômica da demanda',accent:'#d49a20',side:'left',
      lead:'Toda causa recebe um valor, ainda que o proveito econômico não seja imediatamente líquido.',
      point:'O valor da causa repercute em competência, custas processuais e outros efeitos definidos pela legislação.',
      excerpt:'<p><strong>VALOR DA CAUSA</strong></p><p>Dá-se à causa o valor de <strong>R$ 50.000,00</strong> (cinquenta mil reais).</p>',
      micro:[['Regra','Deve observar os critérios dos arts. 291 e 292 do CPC.'],['Efeitos','Competência, custas e parâmetros processuais.']],
      rects:[[786,984,238,205],[270,1277,470,57]],
      path:'M787 1057 H772 Q756 1057 756 1074 V1283 Q756 1297 737 1297 H724',start:[787,1057],end:[724,1297]
    },
    {
      n:8,title:'Fecho',kicker:'O encerramento formal',accent:'#87919b',side:'left',
      lead:'A peça termina com a fórmula de encerramento, o local, a data e a assinatura do advogado.',
      point:'O fecho encerra e autentica a manifestação processual apresentada em nome da parte.',
      excerpt:'<p>Nestes termos, pede deferimento.</p><p>Araçatuba/SP, 10 de maio de 2024.</p><p style="text-align:center;margin-top:1.2em"><strong>NOME DO ADVOGADO</strong><br>OAB/SP nº 123.456</p>',
      micro:[['Elementos','Fórmula de encerramento, local, data e assinatura.'],['Função','Formalizar a autoria e o término da petição.']],
      rects:[[786,1211,238,193],[270,1337,470,87]],
      path:'M787 1288 H772 Q758 1288 758 1303 V1363 Q758 1375 738 1375 H724',start:[787,1288],end:[724,1375]
    }
  ];

  const app = document.getElementById('app');
  const storyCard = document.getElementById('storyCard');
  const storyNumber = document.getElementById('storyNumber');
  const storyKicker = document.getElementById('storyKicker');
  const storyTitle = document.getElementById('storyTitle');
  const storyLead = document.getElementById('storyLead');
  const teachingPoint = document.getElementById('teachingPoint');
  const paperExcerpt = document.getElementById('paperExcerpt');
  const microGrid = document.getElementById('microGrid');
  const connectorPath = document.getElementById('connectorPath');
  const connectorStart = document.getElementById('connectorStart');
  const connectorEnd = document.getElementById('connectorEnd');
  const progressBar = document.getElementById('progressBar');
  const stepLabel = document.getElementById('stepLabel');
  const stepCount = document.getElementById('stepCount');
  const nextLabel = document.getElementById('nextLabel');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const highlights = [...document.querySelectorAll('.poster-highlight')];
  const posterBase = document.getElementById('posterBase');
  async function loadPoster(){
    const files=['poster-01.txt','poster-02.txt','poster-03.txt','poster-04.txt','poster-05.txt','poster-06.txt'];
    const parts=await Promise.all(files.map(f=>fetch(f).then(r=>{if(!r.ok)throw new Error('Imagem indisponível');return r.text()})));
    const src='data:image/webp;base64,'+parts.join('');
    posterBase.src=src; highlights.forEach(img=>img.src=src);
    try{await posterBase.decode()}catch(e){}
  }
  const rectEls = [...document.querySelectorAll('.focus-rect')];
  const modeBadge = document.getElementById('modeBadge');
  const fullscreenButton = document.getElementById('fullscreenButton');
  let current = 0;

  function insetFor([x,y,w,h]){
    const top=(y/H)*100, right=(1-(x+w)/W)*100, bottom=(1-(y+h)/H)*100, left=(x/W)*100;
    return `inset(${top}% ${right}% ${bottom}% ${left}% round 12px)`;
  }
  function placeRect(el,[x,y,w,h]){
    el.style.left=`${x/W*100}%`; el.style.top=`${y/H*100}%`; el.style.width=`${w/W*100}%`; el.style.height=`${h/H*100}%`;
  }
  function clearFocus(){
    highlights.forEach(h=>{h.classList.remove('active');h.style.clipPath='inset(50% 50% 50% 50%)'});
    rectEls.forEach(r=>r.classList.remove('active'));
    connectorPath.removeAttribute('d'); connectorStart.setAttribute('cx','-20'); connectorEnd.setAttribute('cx','-20');
  }
  async function toggleFullscreen(){
    try{
      if(!document.fullscreenElement && !document.webkitFullscreenElement){
        const target=document.documentElement;
        if(target.requestFullscreen) await target.requestFullscreen();
        else if(target.webkitRequestFullscreen) target.webkitRequestFullscreen();
      }else{
        if(document.exitFullscreen) await document.exitFullscreen();
        else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
      }
    }catch(err){
      console.warn('Não foi possível alterar o modo de tela cheia.',err);
    }
  }
  function syncFullscreenLabel(){
    const active=!!(document.fullscreenElement||document.webkitFullscreenElement);
    fullscreenButton.textContent=active?'Sair da tela cheia':'Tela cheia';
    fullscreenButton.setAttribute('aria-label',active?'Sair da tela cheia':'Ativar tela cheia');
  }

  function render(){
    clearFocus();
    if(current===0){
      app.dataset.phase='intro';
      app.style.setProperty('--accent','#2f8ee5');
      stepLabel.textContent='Visão geral'; stepCount.textContent='0 / 8'; progressBar.style.width='0%'; nextLabel.textContent='Iniciar';
    }else if(current===9){
      app.dataset.phase='summary';
      app.style.setProperty('--accent','#d8a74a');
      stepLabel.textContent='Síntese final'; stepCount.textContent='8 / 8'; progressBar.style.width='100%'; nextLabel.textContent='Recomeçar';
    }else{
      const s=steps[current-1];
      app.dataset.phase='step'; app.style.setProperty('--accent',s.accent);
      storyCard.className=`story-card side-${s.side}`;
      storyNumber.textContent=s.n; storyKicker.textContent=s.kicker; storyTitle.textContent=s.title; storyLead.textContent=s.lead; teachingPoint.textContent=s.point; paperExcerpt.innerHTML=s.excerpt;
      microGrid.innerHTML=s.micro.map(([t,d])=>`<div class="micro-card"><b>${t}</b>${d}</div>`).join('');
      s.rects.slice(0,4).forEach((rect,i)=>{highlights[i].style.clipPath=insetFor(rect);highlights[i].classList.add('active');placeRect(rectEls[i],rect);rectEls[i].classList.add('active')});
      connectorPath.setAttribute('d',s.path); connectorPath.style.animation='none'; void connectorPath.getBoundingClientRect(); connectorPath.style.animation='';
      connectorStart.setAttribute('cx',s.start[0]);connectorStart.setAttribute('cy',s.start[1]);connectorEnd.setAttribute('cx',s.end[0]);connectorEnd.setAttribute('cy',s.end[1]);
      stepLabel.textContent=`${s.n}. ${s.title}`; stepCount.textContent=`${s.n} / 8`; progressBar.style.width=`${s.n/8*100}%`; nextLabel.textContent=s.n===8?'Concluir':'Avançar';
      if(matchMedia('(max-width:900px), (orientation:portrait)').matches && !matchMedia('(max-height:760px) and (orientation:landscape)').matches){setTimeout(()=>storyCard.scrollIntoView({behavior:'smooth',block:'nearest'}),150)}
    }
    prevButton.disabled=current===0;
    nextButton.setAttribute('aria-label',current===9?'Recomeçar':current===8?'Concluir':'Avançar');
  }
  function goTo(n){current=Math.max(0,Math.min(9,n));render()}
  function next(){goTo(current===9?0:current+1)}
  function prev(){goTo(current-1)}
  document.getElementById('startButton').addEventListener('click',e=>{e.stopPropagation();goTo(1)});
  document.getElementById('restartButton').addEventListener('click',e=>{e.stopPropagation();goTo(0)});
  document.getElementById('overviewButton').addEventListener('click',e=>{e.stopPropagation();goTo(0)});
  fullscreenButton.addEventListener('click',e=>{e.stopPropagation();toggleFullscreen()});
  document.addEventListener('fullscreenchange',syncFullscreenLabel);
  document.addEventListener('webkitfullscreenchange',syncFullscreenLabel);
  nextButton.addEventListener('click',e=>{e.stopPropagation();next()}); prevButton.addEventListener('click',e=>{e.stopPropagation();prev()});
  document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();goTo(Number(b.dataset.jump))}));
  document.getElementById('stage').addEventListener('click',e=>{if(e.target.closest('button,.story-card,.summary-card,.intro-card'))return;next()});
  window.addEventListener('keydown',e=>{
    if(e.key.toLowerCase()==='f'){e.preventDefault();toggleFullscreen();return;}
    if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();next()}
    else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();prev()}
    else if(e.key==='Home'){e.preventDefault();goTo(0)}
    else if(e.key==='End'){e.preventDefault();goTo(9)}
    else if(/^[1-8]$/.test(e.key)){goTo(Number(e.key))}
  });
  function updateMode(){modeBadge.textContent=matchMedia('(max-width:900px), (orientation:portrait), (max-height:760px) and (orientation:landscape)').matches?'Modo Estudo':'Modo Aula'}
  addEventListener('resize',updateMode);updateMode();loadPoster().then(render).catch(()=>render());
})();
