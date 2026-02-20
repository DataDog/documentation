import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
import { getConfig } from './getConfig';

const rawEnv = document.documentElement.dataset?.env || 'preview';
// TODO: Remove this once development is complete
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

// Blocking enrichment: wait a short time for RUM and set context before returning.
const enrichContextWithRum = async () => {
    const maxRetries = 30;
    const retryDelayMs = 100;

    for (let retries = 0; retries < maxRetries; retries++) {
        const targetingKey = getRumTargetingKey();

        if (targetingKey) {
            console.log('[Flags] RUM context found, updating flags context.', targetingKey);
            // This triggers a re-evaluation of flags with the RUM-derived targeting key.
            await OpenFeature.setContext({ targetingKey });
            return;
        }
        console.log('[Flags] RUM context not found, retrying...', retries);
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }
};

export const getBooleanFlag = (client, key, defaultValue = false) => 
    client?.getBooleanValue(key, defaultValue) ?? defaultValue;
