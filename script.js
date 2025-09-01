(() => {
  const guessInput = document.getElementById('guess');
  const guessButton = document.getElementById('guessBtn');
  const resetButton = document.getElementById('resetBtn');
  const feedback = document.getElementById('feedback');
  const attemptsEl = document.getElementById('attempts');
  const bestEl = document.getElementById('best');
  const themeToggle = document.getElementById('themeToggle');

  let target = getRandomNumber();
  let attempts = 0;

  // Load best score from localStorage
  const BEST_SCORE_KEY = 'gtn-best';
  let best = Number(localStorage.getItem(BEST_SCORE_KEY)) || null;
  renderBest();

  guessButton.addEventListener('click', handleGuess);
  resetButton.addEventListener('click', resetGame);
  guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleGuess();
  });
  themeToggle.addEventListener('click', toggleTheme);

  function handleGuess() {
    const value = guessInput.valueAsNumber;
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
      guessButton.disabled = true;
    } else if (value < target) {
      setFeedback('Too low. Try a higher number.');
    } else {
      setFeedback('Too high. Try a lower number.');
    }
    guessInput.focus();
    guessInput.select();
  }

  function resetGame() {
    target = getRandomNumber();
    attempts = 0;
    attemptsEl.textContent = '0';
    setFeedback('New round! Make a guess to begin.');
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    guessInput.focus();
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  }

  function updateBest() {
    if (best == null || attempts < best) {
      best = attempts;
      localStorage.setItem(BEST_SCORE_KEY, String(best));
      renderBest();
    }
  }

  function renderBest() {
    bestEl.textContent = best == null ? '—' : String(best);
  }

  function setFeedback(message) { feedback.textContent = message; }
  function getRandomNumber() { return Math.floor(Math.random() * 100) + 1; }
})();
