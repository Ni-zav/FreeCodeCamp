document.addEventListener('DOMContentLoaded', () => {
  let breakLength = 5;
  let sessionLength = 25;
  let timeLeft = sessionLength * 60;
  let timerId = null;
  let isSession = true;

  const breakLengthEl = document.getElementById('break-length');
  const sessionLengthEl = document.getElementById('session-length');
  const timerLabel = document.getElementById('timer-label');
  const timeLeftEl = document.getElementById('time-left');
  const startStopBtn = document.getElementById('start_stop');
  const resetBtn = document.getElementById('reset');
  const beep = document.getElementById('beep');

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const updateDisplay = () => {
    breakLengthEl.textContent = breakLength;
    sessionLengthEl.textContent = sessionLength;
    timeLeftEl.textContent = formatTime(timeLeft);
  };

  const switchTimer = () => {
    isSession = !isSession;
    timerLabel.textContent = isSession ? 'Session' : 'Break';
    timeLeft = (isSession ? sessionLength : breakLength) * 60;
    beep.play();
  };

  const startTimer = () => {
    if (timerId) return;
    
    timerId = setInterval(() => {
      timeLeft--;
      updateDisplay();
      
      if (timeLeft < 0) {
        switchTimer();
        updateDisplay();
      }
    }, 1000);
    
    startStopBtn.classList.add('active');
    document.querySelector('.timer').classList.add('running');
  };

  const pauseTimer = () => {
    clearInterval(timerId);
    timerId = null;
    startStopBtn.classList.remove('active');
    document.querySelector('.timer').classList.remove('running');
  };

  const resetTimer = () => {
    pauseTimer();
    breakLength = 5;
    sessionLength = 25;
    timeLeft = sessionLength * 60;
    isSession = true;
    timerLabel.textContent = 'Session';
    beep.pause();
    beep.currentTime = 0;
    updateDisplay();
  };

  // Event Listeners
  document.getElementById('break-decrement').addEventListener('click', () => {
    if (breakLength > 1) breakLength--;
    updateDisplay();
  });

  document.getElementById('break-increment').addEventListener('click', () => {
    if (breakLength < 60) breakLength++;
    updateDisplay();
  });

  document.getElementById('session-decrement').addEventListener('click', () => {
    if (sessionLength > 1) {
      sessionLength--;
      if (!timerId && isSession) timeLeft = sessionLength * 60;
    }
    updateDisplay();
  });

  document.getElementById('session-increment').addEventListener('click', () => {
    if (sessionLength < 60) {
      sessionLength++;
      if (!timerId && isSession) timeLeft = sessionLength * 60;
    }
    updateDisplay();
  });

  startStopBtn.addEventListener('click', () => {
    if (timerId) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  resetBtn.addEventListener('click', resetTimer);
  
  updateDisplay();
});
