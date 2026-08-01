(() => {
  const activity = window.JUSLAB_ACTIVITY;
  if (!activity) return;

  const number = document.getElementById('experience-number');
  const title = document.getElementById('experience-title');
  const lead = document.getElementById('experience-lead');
  const info = document.getElementById('activity-info');
  const start = document.getElementById('start-button');
  const stage = document.getElementById('activity-stage');
  const content = document.getElementById('activity-content');
  const progressLabel = document.getElementById('progress-label');
  const progressBar = document.getElementById('progress-bar');

  let current = 0;
  let selected = null;

  number.textContent = activity.meta.numero;
  title.innerHTML = activity.meta.tituloHtml;
  lead.textContent = activity.meta.descricao;
  info.innerHTML = `<div class="jl-meta-list">
    <div><strong>Objetivo</strong>${activity.meta.objetivo}</div>
    <div><strong>Conhecimentos prévios</strong>${activity.meta.conhecimentosPrevios}</div>
    <div><strong>Duração</strong>${activity.meta.duracao}</div>
    <div><strong>Modalidade</strong>${activity.meta.modalidade}</div>
  </div>`;

  function render() {
    const step = activity.etapas[current];
    selected = null;
    progressLabel.textContent = `Etapa ${current + 1} de ${activity.etapas.length}`;
    progressBar.style.width = `${((current + 1) / activity.etapas.length) * 100}%`;
    content.innerHTML = `<div class="jl-kicker">${step.titulo}</div>
      <h2 class="jl-question">${step.enunciado}</h2>
      <div class="jl-options" id="options"></div>
      <div id="feedback"></div>
      <div class="jl-stage-actions"><button class="jl-button jl-button--primary" id="check" type="button">Conferir</button></div>`;

    const options = content.querySelector('#options');
    step.opcoes.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'jl-option';
      button.textContent = option.texto;
      button.addEventListener('click', () => {
        selected = index;
        options.querySelectorAll('.jl-option').forEach(item => item.classList.remove('is-selected'));
        button.classList.add('is-selected');
      });
      options.appendChild(button);
    });

    content.querySelector('#check').addEventListener('click', () => {
      const feedback = content.querySelector('#feedback');
      if (selected === null) {
        feedback.innerHTML = '<div class="jl-feedback jl-feedback--review">Escolha uma alternativa antes de conferir.</div>';
        return;
      }
      const option = step.opcoes[selected];
      feedback.innerHTML = `<div class="jl-feedback ${option.correta ? 'jl-feedback--success' : 'jl-feedback--review'}">${option.feedback}</div>`;
    });
  }

  start.addEventListener('click', () => {
    stage.hidden = false;
    render();
    stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
