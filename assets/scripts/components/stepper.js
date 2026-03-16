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
        localStorage.setItem(getStorageKey(stepperId), JSON.stringify({ ...state, timestamp: Date.now() }));
    } catch {
        // Ignore storage errors, the stepper will still work without localStorage persistence
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
        // Ignore storage errors, the stepper will still work without localStorage persistence
    }
}

function setHidden(el, hidden) {
    if (!el) return;
    if (hidden) {
        el.setAttribute('data-hidden', 'true');
    } else {
        el.removeAttribute('data-hidden');
    }
}

function initStepper(stepper) {
    const stepperId = stepper.id;
    const steps = stepper.querySelectorAll('.stepper__step');
    const finishedEl = stepper.querySelector('.stepper__finished');
    const resetEl = stepper.querySelector('.stepper__reset');
    const showAllBtn = stepper.querySelector('.stepper__show-all-btn');
    const collapseBtn = stepper.querySelector('.stepper__collapse-btn');

    if (!steps.length) return;

    // Set step numbers as data attributes for CSS
    // (CSS counters don't work reliably when steps use display:none)
    steps.forEach((step, i) => {
        step.dataset.stepNumber = String(i + 1);
    });

    // Mark first/last steps for CSS line endpoints
    steps[0].classList.add('stepper__step--first');
    steps[steps.length - 1].classList.add('stepper__step--last');

    let currentIndex = 0;
    let finished = false;
    let isAllExpanded = stepper.classList.contains('stepper--open');

    // Restore saved progress
    const saved = loadProgress(stepperId);
    if (saved) {
        if (saved.finished) {
            finished = true;
        } else if (typeof saved.stepIndex === 'number' && saved.stepIndex >= 0 && saved.stepIndex < steps.length) {
            currentIndex = saved.stepIndex;
        }
        if (typeof saved.isAllExpanded === 'boolean') {
            isAllExpanded = saved.isAllExpanded;
        }
    }

    function persist() {
        saveProgress(stepperId, {
            stepIndex: currentIndex,
            finished,
            isAllExpanded
        });
    }

    function render() {
        stepper.classList.toggle('stepper--all-expanded', isAllExpanded);

        // Toggle viz control buttons
        setHidden(showAllBtn, isAllExpanded);
        setHidden(collapseBtn, !isAllExpanded);

        steps.forEach((step, i) => {
            const isActive = !finished && i === currentIndex;
            const isCompleted = finished || i < currentIndex;

            step.classList.toggle('stepper__step--active', isActive);
            step.classList.toggle('stepper__step--completed', isCompleted);

            // Nav: hidden when expanded or finished, visible only for active step
            const nav = step.querySelector('.stepper__nav');
            if (nav) {
                setHidden(nav, isAllExpanded || !isActive || finished);
            }
        });

        // Finished message
        setHidden(finishedEl, !finished);

        // Start over: visible only when finished
        setHidden(resetEl, !finished);
    }

    function goToStep(index) {
        finished = false;
        currentIndex = Math.max(0, Math.min(index, steps.length - 1));
        persist();
        render();
    }

    function handleFinish() {
        finished = true;
        persist();
        render();
    }

    function handleReset() {
        finished = false;
        currentIndex = 0;
        persist();
        render();
    }

    // Clicking a step title in accordion (collapsed) mode makes it the active step
    steps.forEach((step, i) => {
        const title = step.querySelector('.stepper__step-title');
        if (title) {
            title.addEventListener('click', (e) => {
                e.preventDefault();
                if (isAllExpanded) return;
                goToStep(i);
            });
        }
    });

    stepper.addEventListener('click', (e) => {
        const btn = e.target.closest('.stepper__btn');
        if (!btn) return;

        if (btn.classList.contains('stepper__next-btn')) {
            goToStep(currentIndex + 1);
        } else if (btn.classList.contains('stepper__prev-btn')) {
            goToStep(currentIndex - 1);
        } else if (btn.classList.contains('stepper__finish-btn')) {
            handleFinish();
        } else if (btn.classList.contains('stepper__reset-btn')) {
            handleReset();
        } else if (btn.classList.contains('stepper__show-all-btn')) {
            isAllExpanded = true;
            persist();
            render();
        } else if (btn.classList.contains('stepper__collapse-btn')) {
            isAllExpanded = false;
            persist();
            render();
        }
    });

    // Initial render
    render();
    stepper.classList.add('stepper--initialized');
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
