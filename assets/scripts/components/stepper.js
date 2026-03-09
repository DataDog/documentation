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

function initStepper(stepper) {
    const stepperId = stepper.id;
    const steps = stepper.querySelectorAll('.stepper__step');
    const finishedEl = stepper.querySelector('.stepper__finished');
    const controlsEl = stepper.querySelector('.stepper__controls');

    if (!steps.length) return;

    // Mark first/last steps for CSS (can't rely on :first-child/:last-child
    // because .stepper__finished is a sibling inside .stepper__steps)
    steps[0].classList.add('stepper__step--first');
    steps[steps.length - 1].classList.add('stepper__step--last');

    let currentIndex = 0;
    let finished = false;
    let animating = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Tracks which non-active steps are manually expanded (by index)
    let expandedSteps = new Set();

    // Restore saved progress
    const saved = loadProgress(stepperId);
    if (saved) {
        if (saved.finished) {
            finished = true;
        } else if (typeof saved.stepIndex === 'number' && saved.stepIndex >= 0 && saved.stepIndex < steps.length) {
            currentIndex = saved.stepIndex;
        }
        if (Array.isArray(saved.expandedSteps)) {
            expandedSteps = new Set(saved.expandedSteps);
        }
    }

    function persist() {
        saveProgress(stepperId, {
            stepIndex: currentIndex,
            finished,
            expandedSteps: [...expandedSteps]
        });
    }

    function render() {
        steps.forEach((step, i) => {
            const isActive = !finished && i === currentIndex;
            const isCompleted = finished || i < currentIndex;
            const isExpanded = isActive || expandedSteps.has(i);

            step.classList.toggle('stepper__step--active', isActive);
            step.classList.toggle('stepper__step--completed', isCompleted);

            const content = step.querySelector('.stepper__step-content');
            if (content) {
                if (isActive) {
                    content.removeAttribute('hidden');
                    content.style.removeProperty('display');
                } else if (isExpanded) {
                    content.removeAttribute('hidden');
                    content.style.display = 'block';
                } else {
                    content.setAttribute('hidden', 'until-found');
                    content.style.removeProperty('display');
                }
            }
            const nav = step.querySelector('.stepper__nav');
            if (nav) nav.style.display = isActive && !finished ? '' : 'none';
        });

        if (finishedEl) {
            finishedEl.style.display = finished ? '' : 'none';
        }

        if (controlsEl) {
            controlsEl.style.display = finished ? 'flex' : 'none';
        }
    }

    function animateTransition(prevContent, newContent, onComplete) {
        const newAlreadyVisible = newContent && !newContent.hasAttribute('hidden');

        // Measure old content height before render() changes the DOM
        const prevHeight = prevContent.offsetHeight;

        // Prime new content at height 0 so render() won't flash it open
        if (newContent && !newAlreadyVisible) {
            newContent.style.overflow = 'hidden';
            newContent.style.height = '0';
        }

        // Update all state immediately (classes, nav, active step, etc.)
        render();

        // render() set hidden="until-found" on prevContent (content-visibility: hidden).
        // Override that with an inline style so it stays visible for the slide-up.
        prevContent.style.setProperty('content-visibility', 'visible');
        prevContent.style.overflow = 'hidden';
        prevContent.style.height = prevHeight + 'px';

        // Track completion; both animations start in the same frame
        let pending = newAlreadyVisible ? 1 : 2;
        const onDone = () => {
            if (--pending > 0) return;
            prevContent.style.removeProperty('content-visibility');
            prevContent.style.removeProperty('overflow');
            prevContent.style.removeProperty('height');
            prevContent.style.removeProperty('transition');
            onComplete();
        };

        requestAnimationFrame(() => {
            // Slide up old content
            prevContent.style.transition = 'height 0.2s ease';
            prevContent.style.height = '0';
            prevContent.addEventListener('transitionend', () => onDone(), { once: true });

            // Slide down new content
            if (newContent && !newAlreadyVisible) {
                const targetHeight = newContent.scrollHeight;
                newContent.style.transition = 'height 0.2s ease';
                newContent.style.height = targetHeight + 'px';
                newContent.addEventListener(
                    'transitionend',
                    () => {
                        newContent.style.removeProperty('transition');
                        newContent.style.removeProperty('overflow');
                        newContent.style.removeProperty('height');
                        onDone();
                    },
                    { once: true }
                );
            }
        });
    }

    function goToStep(index) {
        if (animating) return;

        const prevContent = !finished ? steps[currentIndex]?.querySelector('.stepper__step-content') : null;
        const prevIsVisible = prevContent && !prevContent.hasAttribute('hidden');

        finished = false;
        currentIndex = Math.max(0, Math.min(index, steps.length - 1));
        persist();

        if (prefersReducedMotion || !prevIsVisible) {
            render();
            return;
        }

        animating = true;
        const newContent = steps[currentIndex]?.querySelector('.stepper__step-content');
        animateTransition(prevContent, newContent, () => { animating = false; });
    }

    function handleFinish() {
        finished = true;
        expandedSteps.clear();
        persist();
        render();
    }

    function handleReset() {
        finished = false;
        currentIndex = 0;
        expandedSteps.clear();
        persist();
        render();
    }

    // Auto-expand step when browser find-in-page matches hidden content
    steps.forEach((step, i) => {
        const content = step.querySelector('.stepper__step-content');
        if (content) {
            content.addEventListener('beforematch', () => {
                if (finished) {
                    expandedSteps.add(i);
                    persist();
                    render();
                } else {
                    goToStep(i);
                }
            });
        }
    });

    // Bind title clicks to toggle steps (accordion behavior)
    steps.forEach((step, i) => {
        const title = step.querySelector('.stepper__step-title');
        if (title) {
            title.addEventListener('click', (e) => {
                e.preventDefault();
                if (!finished && i === currentIndex) {
                    // Clicking the active step does nothing
                    return;
                }
                // Toggle expand/collapse for non-active and finished steps
                if (expandedSteps.has(i)) {
                    expandedSteps.delete(i);
                } else {
                    expandedSteps.add(i);
                }
                persist();
                render();
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
        } else if (btn.classList.contains('stepper__reset-btn')) {
            handleReset();
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
