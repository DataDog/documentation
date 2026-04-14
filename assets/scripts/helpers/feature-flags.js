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

    const locateUrl = 'https://www.datadoghq.com/locate'
       
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

        // Blocking: weighted rollouts need the RUM targeting key in context.
        await enrichContextWithRum();

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

// Polls briefly for RUM targeting key while fetching /locate in parallel.
// RUM is either ready within ~500ms or blocked (ad-blocker). No point waiting longer.
const enrichContextWithRum = async () => {
    const locatePromise = fetchDatadogUserStatus();

    let targetingKey = getRumTargetingKey();
    if (!targetingKey) {
        for (let i = 0; i < 5; i++) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            targetingKey = getRumTargetingKey();
            if (targetingKey) break;
        }
    }

    const isDatadogUser = await locatePromise;

    const context = { isDatadogUser };
    if (targetingKey) context.targetingKey = targetingKey;

    await OpenFeature.setContext(context);
};

export const getBooleanFlag = (client, key, defaultValue = false) => 
    client?.getBooleanValue(key, defaultValue) ?? defaultValue;
