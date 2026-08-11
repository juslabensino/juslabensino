(() => {
  const W = 1024, H = 1536;
  const steps = [
    {
      n:1,title:'Endereçamento',kicker:'A porta de entrada',accent:'#2f8ee5',side:'right',
      lead:'A peça começa indicando o órgão jurisdicional ao qual a demanda é dirigida.',
      point:'Qual juízo possui competência para conhecer esta causa?',
      excerpt:'<span class="petition-title">EXCELENTÍSSIMO JUÍZO DE UMA DAS VARAS CÍVEIS<br>DA COMARCA DE ARAÇATUBA</span>',
      micro:[['Função','Direcionar a demanda ao órgão jurisdicional competente.'],['Base legal','Art. 319, I, do CPC.']],
      rects:[[18,287,210,134],[247,225,510,71]],
      path:'M195 328 H245 Q264 328 264 309 V268',start:[195,328],end:[264,268]
    },
    {
      n:2,title:'Partes e qualificação',kicker:'Quem pede e contra quem',accent:'#8db444',side:'right',
      lead:'O autor individualiza os sujeitos da relação processual e apresenta os dados necessários à comunicação dos atos.',
      point:'A qualificação não é ornamento: ela identifica as partes, permite a citação e revela a representação pelo advogado.',
      excerpt:'<p><strong>FULANO DE TAL JÚNIOR</strong>, brasileiro, solteiro, servidor público (...) por intermédio de seu advogado, vem propor a presente ação</p><p>em face de <strong>CICLANO SILVA</strong>, brasileiro, casado, comerciante (...).</p>',
      micro:[['Autor e réu','Nome, estado civil, profissão, CPF/CNPJ, endereço e contato.'],['Advogado','Identificação e endereço profissional, com procuração.']],
      rects:[[18,451,212,198],[247,298,510,291]],
      path:'M181 540 H247 Q266 540 266 521 V396',start:[181,540],end:[266,396]
    },
    {
      n:3,title:'Dos fundamentos de fato',kicker:'A história juridicamente relevante',accent:'#e98520',side:'right',
      lead:'A narrativa fática precisa revelar duas forças: a origem do direito do autor e a resistência do réu.',
      point:'Sem a origem do direito e sem o comportamento contrário do réu, não se compreende por que a tutela jurisdicional se tornou necessária.',
      excerpt:'<p><strong>1.1 Fato constitutivo do direito do autor</strong><br>O autor vendeu ao réu o imóvel, pelo valor ajustado em contrato, e transmitiu-lhe a posse.</p><p><strong>1.2 Ato do réu contrário ao direito</strong><br>O réu deixou de pagar as parcelas, violando o acordo e impedindo o autor de receber o preço.</p>',
      micro:[['Fato constitutivo','Circunstância que cria ou origina o direito afirmado pelo autor.'],['Resistência','Comportamento do réu que viola ou se opõe ao direito.']],
      rects:[[16,674,220,371],[247,593,510,231],[269,632,464,100],[269,748,464,72]],
      path:'M132 746 H232 Q247 746 247 731 V683 H267',start:[132,746],end:[267,683]
    },
    {
      n:4,title:'Fundamentos jurídicos',kicker:'Dos fatos à consequência jurídica',accent:'#9166c5',side:'right',
      lead:'O advogado explica por que os fatos narrados, interpretados pelo direito, justificam a tutela pretendida.',
      point:'Fundamentar não é empilhar artigos. É construir, em texto, a ponte entre os fatos, as normas aplicáveis e a consequência jurídica.',
      excerpt:'<p><strong>2. FUNDAMENTOS JURÍDICOS</strong></p><p>O contrato firmado entre as partes é válido e eficaz. O inadimplemento injustificado das parcelas caracteriza mora e autoriza o autor a exigir o cumprimento da obrigação, com os encargos legais, ou a resolução do contrato, conforme o ordenamento jurídico.</p>',
      micro:[['Raciocínio','Fato relevante → qualificação jurídica → consequência jurídica.'],['Dispositivos legais','Sustentam a conclusão; não substituem a argumentação.']],
      rects:[[16,1056,220,312],[247,830,510,222]],
      path:'M184 1148 H229 Q247 1148 247 1130 V922 H267',start:[184,1148],end:[267,922]
    },
    {
      n:5,title:'Pedidos',kicker:'O ponto de chegada',accent:'#e54834',side:'left',
      lead:'Depois de narrar e fundamentar, o autor formula com precisão o que pretende obter do Judiciário.',
      point:'Pedido imediato é a providência jurisdicional; pedido mediato é o bem da vida buscado.',
      excerpt:'<p><strong>PEDIDOS</strong></p><p>Diante do exposto, requer:</p><ol type="a"><li>a concessão da tutela provisória de urgência;</li><li>a citação do réu;</li><li>ao final, a condenação ao pagamento do valor devido, com os encargos legais.</li></ol>',
      micro:[['Imediato','Ex.: condenar, declarar, constituir ou ordenar.'],['Mediato','Ex.: receber quantia, rescindir contrato ou obter indenização.']],
      rects:[[781,355,225,369],[247,1056,510,146]],
      path:'M782 404 H769 Q755 404 755 420 V1071 Q755 1087 734 1087',start:[782,404],end:[734,1087]
    },
    {
      n:6,title:'Provas',kicker:'Como demonstrar os fatos',accent:'#19a8c5',side:'left',
      lead:'O autor indica os meios pelos quais pretende demonstrar a veracidade das alegações relevantes.',
      point:'O pedido de provas não é a produção da prova: ele preserva e anuncia os meios probatórios que poderão ser utilizados.',
      excerpt:'<p><strong>PROVAS</strong></p><p>Protesta provar o alegado por todos os meios de prova em direito admitidos, especialmente prova documental, testemunhal, pericial e depoimento pessoal do réu.</p>',
      micro:[['Objeto','Demonstrar os fatos controvertidos e relevantes.'],['Exemplos','Documentos, testemunhas, perícia e depoimento pessoal.']],
      rects:[[784,759,222,209],[247,1310,510,76]],
      path:'M783 833 H770 Q755 833 755 850 V1335 Q755 1348 734 1348',start:[783,833],end:[734,1348]
    },
    {
      n:7,title:'Audiência de conciliação ou mediação',kicker:'Abertura à solução consensual',accent:'#28afa8',side:'left',
      lead:'A petição inicial deve indicar a opção do autor pela realização ou não de audiência de conciliação ou mediação.',
      point:'Aqui o autor informa sua posição sobre a tentativa de solução consensual do conflito.',
      excerpt:'<p><strong>4. DO PEDIDO DE REALIZAÇÃO DE AUDIÊNCIA DE MEDIAÇÃO E CONCILIAÇÃO</strong></p><p>Nos termos do art. 319, VII, do CPC, o autor manifesta interesse na realização de audiência de conciliação ou de mediação, como meio adequado para a solução consensual da controvérsia.</p>',
      micro:[['Base legal','Art. 319, VII, do CPC.'],['Finalidade','Favorecer a solução consensual da controvérsia.']],
      rects:[[781,986,225,192],[247,1205,510,103]],
      path:'M783 1054 H770 Q755 1054 755 1071 V1242 Q755 1255 734 1255',start:[783,1054],end:[734,1255]
    },
    {
      n:8,title:'Valor da causa',kicker:'A expressão econômica da demanda',accent:'#d49a20',side:'left',
      lead:'Toda causa recebe um valor, ainda que o proveito econômico não seja imediatamente líquido.',
      point:'O valor da causa repercute em competência, custas processuais e outros efeitos definidos pela legislação.',
      excerpt:'<p><strong>VALOR DA CAUSA</strong></p><p>Dá-se à causa o valor de <strong>R$ 50.000,00</strong> (cinquenta mil reais).</p>',
      micro:[['Regra','Deve observar os critérios dos arts. 291 e 292 do CPC.'],['Efeitos','Competência, custas e parâmetros processuais.']],
      rects:[[783,1190,222,151],[247,1389,510,44]],
      path:'M783 1246 H770 Q755 1246 755 1263 V1402 Q755 1415 734 1415',start:[783,1246],end:[734,1415]
    },
    {
      n:9,title:'Fecho',kicker:'O encerramento formal',accent:'#87919b',side:'left',
      lead:'A peça termina com a fórmula de encerramento, o local, a data e a assinatura do advogado.',
      point:'O fecho encerra e autentica a manifestação processual apresentada em nome da parte.',
      excerpt:'<p>Nestes termos, pede deferimento.</p><p>Araçatuba/SP, 10 de maio de 2024.</p><p style="text-align:center;margin-top:1.2em"><strong>NOME DO ADVOGADO</strong><br>OAB/SP nº 123.456</p>',
      micro:[['Elementos','Fórmula de encerramento, local, data e assinatura.'],['Função','Formalizar a autoria e o término da petição.']],
      rects:[[783,1351,222,141],[247,1436,510,75]],
      path:'M783 1404 H770 Q755 1404 755 1420 V1459 Q755 1472 734 1472',start:[783,1404],end:[734,1472]
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
    const src='data:image/jpeg;base64,'+parts.join('');
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
      stepLabel.textContent='Visão geral'; stepCount.textContent='0 / 9'; progressBar.style.width='0%'; nextLabel.textContent='Iniciar';
    }else if(current===10){
      app.dataset.phase='summary';
      app.style.setProperty('--accent','#d8a74a');
      stepLabel.textContent='Síntese final'; stepCount.textContent='9 / 9'; progressBar.style.width='100%'; nextLabel.textContent='Recomeçar';
    }else{
      const s=steps[current-1];
      app.dataset.phase='step'; app.style.setProperty('--accent',s.accent);
      storyCard.className=`story-card side-${s.side}`;
      storyNumber.textContent=s.n; storyKicker.textContent=s.kicker; storyTitle.textContent=s.title; storyLead.textContent=s.lead; teachingPoint.textContent=s.point; paperExcerpt.innerHTML=s.excerpt;
      microGrid.innerHTML=s.micro.map(([t,d])=>`<div class="micro-card"><b>${t}</b>${d}</div>`).join('');
      s.rects.slice(0,4).forEach((rect,i)=>{highlights[i].style.clipPath=insetFor(rect);highlights[i].classList.add('active');placeRect(rectEls[i],rect);rectEls[i].classList.add('active')});
      connectorPath.setAttribute('d',s.path); connectorPath.style.animation='none'; void connectorPath.getBoundingClientRect(); connectorPath.style.animation='';
      connectorStart.setAttribute('cx',s.start[0]);connectorStart.setAttribute('cy',s.start[1]);connectorEnd.setAttribute('cx',s.end[0]);connectorEnd.setAttribute('cy',s.end[1]);
      stepLabel.textContent=`${s.n}. ${s.title}`; stepCount.textContent=`${s.n} / 9`; progressBar.style.width=`${s.n/9*100}%`; nextLabel.textContent=s.n===9?'Concluir':'Avançar';
      if(matchMedia('(max-width:900px), (orientation:portrait)').matches && !matchMedia('(max-height:760px) and (orientation:landscape)').matches){setTimeout(()=>storyCard.scrollIntoView({behavior:'smooth',block:'nearest'}),150)}
    }
    prevButton.disabled=current===0;
    nextButton.setAttribute('aria-label',current===10?'Recomeçar':current===9?'Concluir':'Avançar');
  }
  function goTo(n){current=Math.max(0,Math.min(10,n));render()}
  function next(){goTo(current===10?0:current+1)}
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
    else if(e.key==='End'){e.preventDefault();goTo(10)}
    else if(/^[1-9]$/.test(e.key)){goTo(Number(e.key))}
  });
  function updateMode(){modeBadge.textContent=matchMedia('(max-width:900px), (orientation:portrait), (max-height:760px) and (orientation:landscape)').matches?'Modo Estudo':'Modo Aula'}
  addEventListener('resize',updateMode);updateMode();loadPoster().then(render).catch(()=>render());
})();
