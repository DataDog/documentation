const STORAGE_PREFIX = 'stepper-progress-';
const MAX_STORED_STEPPERS = 10;

function getStorageKey(stepperId) {
    return `${STORAGE_PREFIX}${stepperId}`;
}

function loadProgress(stepperId) {
    try {
        const data = localStorage.getItem(getStorageKey(stepperId));
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

function saveProgress(stepperId, state) {
    try {
        pruneOldEntries();
        localStorage.setItem(
            getStorageKey(stepperId),
            JSON.stringify({ ...state, timestamp: Date.now() })
        );
    } catch {
        // localStorage unavailable or full — silently ignore
    }
}

function pruneOldEntries() {
    try {
        const entries = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(STORAGE_PREFIX)) {
                const data = JSON.parse(localStorage.getItem(key));
                entries.push({ key, timestamp: data.timestamp || 0 });
            }
        }
        // If at the cap, remove the oldest entry to make room
        if (entries.length >= MAX_STORED_STEPPERS) {
            entries.sort((a, b) => a.timestamp - b.timestamp);
            const toRemove = entries.length - MAX_STORED_STEPPERS + 1;
            for (let i = 0; i < toRemove; i++) {
                localStorage.removeItem(entries[i].key);
            }
        }
    } catch {
        // Ignore storage errors
    }
}

function initStepper(stepper) {
    const stepperId = stepper.id;
    const steps = stepper.querySelectorAll('.stepper__step');
    const finishedEl = stepper.querySelector('.stepper__finished');
    const controlsEl = stepper.querySelector('.stepper__controls');
    const controlsBtn = controlsEl ? controlsEl.querySelector('.stepper__btn') : null;

    if (!steps.length) return;

    // Mark first/last steps for CSS (can't rely on :first-child/:last-child
    // because .stepper__finished is a sibling inside .stepper__steps)
    steps[0].classList.add('stepper__step--first');
    steps[steps.length - 1].classList.add('stepper__step--last');

    let currentIndex = 0;
    let showAll = false;
    let finished = false;

    // Restore saved progress
    const saved = loadProgress(stepperId);
    if (saved) {
        if (saved.showAll) {
            showAll = true;
        } else if (saved.finished) {
            finished = true;
            currentIndex = typeof saved.stepIndex === 'number' ? saved.stepIndex : -1;
        } else if (typeof saved.stepIndex === 'number' && saved.stepIndex >= 0 && saved.stepIndex < steps.length) {
            currentIndex = saved.stepIndex;
        }
    }

    function persist() {
        saveProgress(stepperId, { stepIndex: currentIndex, showAll, finished });
    }

    function render() {
        if (showAll) {
            stepper.classList.add('stepper--show-all');
            steps.forEach((step) => {
                step.classList.remove('stepper__step--active');
                step.classList.remove('stepper__step--completed');
                // In show-all mode, CSS shows content; hide nav
                const content = step.querySelector('.stepper__step-content');
                if (content) content.style.display = '';
                const nav = step.querySelector('.stepper__nav');
                if (nav) nav.style.display = 'none';
            });
            if (finishedEl) finishedEl.style.display = 'none';
            if (controlsEl) {
                controlsEl.style.display = 'flex';
                if (controlsBtn) controlsBtn.textContent = 'Hide other steps';
                if (resetBtn) resetBtn.style.display = 'none';
            }
        } else {
            stepper.classList.remove('stepper--show-all');
            steps.forEach((step, i) => {
                const isActive = i === currentIndex;
                step.classList.toggle('stepper__step--active', isActive);
                step.classList.toggle('stepper__step--completed', finished || i < currentIndex);
                const content = step.querySelector('.stepper__step-content');
                if (content) content.style.display = isActive ? '' : 'none';
                const nav = step.querySelector('.stepper__nav');
                if (nav) nav.style.display = (isActive && !finished) ? '' : 'none';
            });
            if (finishedEl) {
                finishedEl.style.display = finished ? '' : 'none';
            }
            if (controlsEl) {
                // Show controls in finished state so user can "Show all" or "Reset"
                if (finished) {
                    controlsEl.style.display = 'flex';
                    if (controlsBtn) controlsBtn.textContent = 'Show all steps';
                    if (resetBtn) resetBtn.style.display = '';
                } else {
                    controlsEl.style.display = 'none';
                    if (resetBtn) resetBtn.style.display = 'none';
                }
            }
            // Toggle show-all / hide-others buttons within each step's nav
            steps.forEach((step) => {
                const showBtn = step.querySelector('.stepper__show-all-btn');
                const hideBtn = step.querySelector('.stepper__hide-others-btn');
                if (showBtn) showBtn.style.display = '';
                if (hideBtn) hideBtn.style.display = 'none';
            });
        }
    }

    function goToStep(index) {
        finished = false;
        currentIndex = Math.max(0, Math.min(index, steps.length - 1));
        showAll = false;
        persist();
        render();
    }

    function handleFinish() {
        finished = true;
        currentIndex = -1; // no step expanded initially
        showAll = false;
        persist();
        render();
    }

    function handleReset() {
        finished = false;
        currentIndex = 0;
        showAll = false;
        persist();
        render();
    }

    // Create a Reset button inside the controls area
    let resetBtn = null;
    if (controlsEl) {
        resetBtn = document.createElement('button');
        resetBtn.className = 'stepper__btn stepper__reset-btn';
        resetBtn.textContent = 'Reset';
        resetBtn.style.display = 'none';
        controlsEl.appendChild(resetBtn);
        resetBtn.addEventListener('click', handleReset);
    }

    function toggleShowAll() {
        showAll = !showAll;
        if (!showAll) {
            // Return to single-step view at current position
            finished = false;
        }
        persist();
        render();
    }

    // Bind title clicks to toggle steps (accordion behavior)
    steps.forEach((step, i) => {
        const title = step.querySelector('.stepper__step-title');
        if (title) {
            title.addEventListener('click', () => {
                if (finished) {
                    // In finished state, toggle expand/collapse without leaving finished
                    currentIndex = (currentIndex === i) ? -1 : i;
                    persist();
                    render();
                } else {
                    goToStep(i);
                }
            });
        }
    });

    // Bind navigation buttons
    stepper.addEventListener('click', (e) => {
        const btn = e.target.closest('.stepper__btn');
        if (!btn) return;

        if (btn.classList.contains('stepper__next-btn')) {
            goToStep(currentIndex + 1);
        } else if (btn.classList.contains('stepper__prev-btn')) {
            goToStep(currentIndex - 1);
        } else if (btn.classList.contains('stepper__finish-btn')) {
            handleFinish();
        } else if (
            btn.classList.contains('stepper__show-all-btn') ||
            btn.classList.contains('stepper__hide-others-btn')
        ) {
            toggleShowAll();
        } else if (btn.classList.contains('stepper__reset-btn')) {
            handleReset();
        } else if (controlsEl && controlsEl.contains(btn)) {
            toggleShowAll();
        }
    });

    // Initial render
    render();
}

function initAllSteppers() {
    const steppers = document.querySelectorAll('.stepper');
    steppers.forEach(initStepper);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllSteppers);
} else {
    initAllSteppers();
}

export { initAllSteppers, initStepper };
