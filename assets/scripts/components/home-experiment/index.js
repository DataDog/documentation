import { initializeFeatureFlags } from 'scripts/helpers/feature-flags';
import { bindHomeTracking } from './tracking';

const FLAG_KEY = 'docs-home-products-browse-experiment';
const DEFAULT_VARIANT = 'legacy';

const newEl = document.querySelector('[data-home-variant-content="new"]');
const legacyEl = document.querySelector('[data-home-variant-content="legacy"]');

if (newEl && legacyEl) {
    initializeFeatureFlags().then((client) => {
        const details = client?.getStringDetails?.(FLAG_KEY, DEFAULT_VARIANT);
        console.log('[home-experiment] evaluation details', details);
        console.log('[home-experiment] OpenFeature context', client?.getContext?.());
        console.log('[home-experiment] DD_RUM session_id', window.DD_RUM?.getInternalContext?.()?.session_id);
        const variant = details?.value ?? DEFAULT_VARIANT;
        if (variant === 'legacy') {
            newEl.setAttribute('hidden', '');
            legacyEl.removeAttribute('hidden');
        }
        document.body.setAttribute('data-home-variant', variant);
        window.DD_RUM?.addFeatureFlagEvaluation?.(FLAG_KEY, variant);
        bindHomeTracking();
    });
}
