import { initializeFeatureFlags, getStringFlag } from 'scripts/helpers/feature-flags';
import { bindHomeTracking } from './tracking';

const FLAG_KEY = 'docs-home-products-browse-experiment';
const DEFAULT_VARIANT = 'legacy';

const newEl = document.querySelector('[data-home-variant-content="new"]');
const legacyEl = document.querySelector('[data-home-variant-content="legacy"]');

if (newEl && legacyEl) {
    initializeFeatureFlags().then((client) => {
        const variant = getStringFlag(client, FLAG_KEY, DEFAULT_VARIANT);
        const activeEl = variant === 'legacy' ? legacyEl : newEl;
        activeEl.removeAttribute('hidden');
        newEl.parentElement.removeAttribute('data-variant-resolving');
        document.body.setAttribute('data-home-variant', variant);
        window.DD_RUM?.addFeatureFlagEvaluation?.(FLAG_KEY, variant);
        bindHomeTracking();
    });
}
