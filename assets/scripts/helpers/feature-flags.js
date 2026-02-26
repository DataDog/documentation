import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
import { getConfig } from './getConfig';

const rawEnv = document.documentElement.dataset?.env || 'preview';
// TODO: Remove this once Feature Flag Rollout is complete
const env = rawEnv === 'development' ? 'preview' : rawEnv; 
const config = getConfig(env);

// Singleton Promise
let initializationPromise = null;

const getRumTargetingKey = () => {
    // Safety check for ad-blockers or missing global
    if (typeof window === 'undefined' || !window.DD_RUM) return undefined;
    
    try {
        const rumUser = window.DD_RUM.getUser && window.DD_RUM.getUser();
        const context = window.DD_RUM.getInternalContext && window.DD_RUM.getInternalContext();
        return rumUser?.device_id || context?.session_id;
    } catch (e) {
        return undefined;
    }
};

/**
 * Check if the visitor is a logged-in Datadog user via the corpsite /locate
 * endpoint, which returns `user_status: true` when the global `dogwebu`
 * cookie is present on `.datadoghq.com`.
 *
 * The result is cached as a singleton promise so multiple callers share one
 * network request.
 */
let datadogUserPromise = null;

export const fetchDatadogUserStatus = () => {
    if (datadogUserPromise) return datadogUserPromise;

    const locateUrl = window.location.hostname === 'docs.datadoghq.com'
        ? 'https://www.datadoghq.com/locate'
        : 'https://corpsite-staging.datadoghq.com/locate';

    datadogUserPromise = fetch(locateUrl, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => !!data.user_status)
        .catch(() => false);

    return datadogUserPromise;
};

export const initializeFeatureFlags = () => {
    if (initializationPromise) return initializationPromise;

    initializationPromise = (async () => {
        if (!config?.ddClientToken || !config?.ddApplicationId) {
            console.error('[Flags] Missing Datadog config');
            return null;
        }

        const client = OpenFeature.getClient();

        // Initialize provider first so it can fetch flags.
        const provider = new DatadogProvider({
            applicationId: config.ddApplicationId,
            clientToken: config.ddClientToken,
            env
        });

        // Wait for the provider to connect before reading flags.
        await OpenFeature.setProviderAndWait(provider);

        // TODO(DOCSENG-249): Temporary experiment behavior.
        // Keep RUM context enrichment blocking for now, then revert to non-blocking after experiments finish.
        // As we need the targeting key to use weighted rollouts.
        await enrichContextWithRum();

        return client;
    })().catch((error) => {
        console.error('[Flags] Initialization failed:', error);
        initializationPromise = null;
        return null;
    });

    return initializationPromise;
};

// Blocking enrichment: wait a short time for RUM, fetch /locate user status
// in parallel, then set the combined context for flag evaluation.
// If /locate resolves before RUM and the user is a Datadog user, we break
// early so conversational search can appear without the full RUM wait.
const enrichContextWithRum = async () => {
    let locateResolved = false;
    let isDatadogUser = false;

    fetchDatadogUserStatus().then((val) => {
        locateResolved = true;
        isDatadogUser = val;
    });

    const maxRetries = 30;
    const retryDelayMs = 100;
    let targetingKey = null;

    for (let retries = 0; retries < maxRetries; retries++) {
        targetingKey = getRumTargetingKey();
        if (targetingKey) {
            console.log('[Flags] RUM context found.', targetingKey);
            break;
        }

        if (locateResolved && isDatadogUser) {
            console.log('[Flags] Datadog user detected via /locate, skipping remaining RUM retries.');
            break;
        }

        console.log('[Flags] RUM context not found, retrying...', retries);
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }

    // Ensure /locate has settled if it hasn't yet.
    if (!locateResolved) {
        isDatadogUser = await fetchDatadogUserStatus();
    }

    const context = { isDatadogUser };
    if (targetingKey) context.targetingKey = targetingKey;

    await OpenFeature.setContext(context);
};

export const getBooleanFlag = (client, key, defaultValue = false) => 
    client?.getBooleanValue(key, defaultValue) ?? defaultValue;
