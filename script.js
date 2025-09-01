(() => {
  const guessInput = document.getElementById('guess');
  const guessBtn = document.getElementById('guessBtn');
  const resetBtn = document.getElementById('resetBtn');
  const feedback = document.getElementById('feedback');
  const attemptsEl = document.getElementById('attempts');
  const bestEl = document.getElementById('best');

  let target = random1to100();
  let attempts = 0;

  // Load best score from localStorage
  const BEST_KEY = 'gtn-best';
  let best = Number(localStorage.getItem(BEST_KEY)) || null;
  renderBest();

  guessBtn.addEventListener('click', onGuess);
  resetBtn.addEventListener('click', resetGame);
  guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onGuess();
  });

  function onGuess() {
    const value = Number(guessInput.value);
    if (!Number.isInteger(value) || value < 1 || value > 100) {
      setFeedback('Please enter a whole number between 1 and 100.');
      return;
    }
    attempts++;
    attemptsEl.textContent = attempts;

    if (value === target) {
      setFeedback(`🎉 Correct! ${value} was the number. Press Reset to play again.`);
      updateBest();
      guessInput.disabled = true;
      guessBtn.disabled = true;
    } else if (value < target) {
      setFeedback('Too low. Try a higher number.');
    } else {
      setFeedback('Too high. Try a lower number.');
    }
    guessInput.focus();
    guessInput.select();
  }

  function resetGame() {
    target = random1to100();
    attempts = 0;
    attemptsEl.textContent = '0';
    setFeedback('New round! Make a guess to begin.');
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    guessInput.focus();
  }

  function updateBest() {
    if (best == null || attempts < best) {
      best = attempts;
      localStorage.setItem(BEST_KEY, String(best));
      renderBest();
    }
  }

  function renderBest() {
    bestEl.textContent = best == null ? '—' : String(best);
  }

  function setFeedback(msg) { feedback.textContent = msg; }
  function random1to100() { return Math.floor(Math.random() * 100) + 1; }
})();
