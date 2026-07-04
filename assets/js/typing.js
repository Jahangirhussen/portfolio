// ===== Typing Effect + soft keystroke sound =====
(function () {
  document.addEventListener('components:loaded', startTyping);
  document.addEventListener('DOMContentLoaded', startTyping);

  let started = false;
  function startTyping() {
    if (started) return;
    const el = document.getElementById('typing-target');
    if (!el) return;
    started = true;

    const phrases = (el.dataset.phrases || '').split('|').filter(Boolean);
    if (!phrases.length) return;

    let soundOn = localStorage.getItem('typeSound') === 'on';
    let audioCtx = null;

    function playKeySound() {
      if (!soundOn) return;
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.value = 700 + Math.random() * 120;
      gain.gain.value = 0.02;
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
      osc.stop(audioCtx.currentTime + 0.05);
    }

    const muteBtn = document.getElementById('type-sound-toggle');
    if (muteBtn) {
      muteBtn.textContent = soundOn ? '🔊' : '🔇';
      muteBtn.addEventListener('click', () => {
        soundOn = !soundOn;
        localStorage.setItem('typeSound', soundOn ? 'on' : 'off');
        muteBtn.textContent = soundOn ? '🔊' : '🔇';
      });
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        playKeySound();
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 80);
    }

    tick();
  }
})();
