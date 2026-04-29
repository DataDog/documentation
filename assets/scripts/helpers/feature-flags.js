import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
import { getConfig } from './getConfig';

const rawEnv = document.documentElement.dataset?.env || 'preview';
// TODO: Remove this once Feature Flag Rollout is complete
const env = rawEnv === 'development' ? 'preview' : rawEnv;
const config = getConfig(env);

let initializationPromise = null;

const DD_INTERNAL_PARAM = 'dd_internal';
const DD_INTERNAL_STORAGE_KEY = 'docs_dd_internal';

export const isDatadogEmployee = () => {
    try {

        if (localStorage.getItem(DD_INTERNAL_STORAGE_KEY) === '1') return true;

        const params = new URLSearchParams(window.location.search);
        if (params.get(DD_INTERNAL_PARAM) === '1') {
            localStorage.setItem(DD_INTERNAL_STORAGE_KEY, '1');
            return true;
        }
    } catch {
        console.error('Error checking if user is Datadog employee');
    }
    return false;
};

let datadogUserPromise = null;

export const fetchDatadogUserStatus = () => {
    if (datadogUserPromise) return datadogUserPromise;

    const locateUrl = 'https://www.datadoghq.com/locate';

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

        const provider = new DatadogProvider({
            applicationId: config.ddApplicationId,
            clientToken: config.ddClientToken,
            env
        });

        await OpenFeature.setProviderAndWait(provider);

        return client;
    })().catch((error) => {
        const isAdBlockerLikely = typeof window !== 'undefined' && (!window.DD_RUM || error?.message?.includes('Unexpected end of JSON input'));
        const contextMsg = isAdBlockerLikely ? ' (Likely blocked by an ad blocker or privacy extension)' : '';

        console.warn(`[Flags] Initialization failed${contextMsg}:`, error);
        initializationPromise = null;
        return null;
    });

    return initializationPromise;
};

export const getBooleanFlag = (client, key, defaultValue = false) =>
    client?.getBooleanValue(key, defaultValue) ?? defaultValue;
