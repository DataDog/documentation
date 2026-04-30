import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
import { getConfig } from './getConfig';

const rawEnv = document.documentElement.dataset?.env || 'preview';
// TODO: Remove this once Feature Flag Rollout is complete
const env = rawEnv === 'development' ? 'preview' : rawEnv;
const config = getConfig(env);

let datadogUserPromise = null;
export const fetchDatadogUserStatus = () => {
    if (datadogUserPromise) return datadogUserPromise;

    datadogUserPromise = fetch('https://www.datadoghq.com/locate', { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => !!data.user_status)
        .catch(() => false);

    return datadogUserPromise;
};

let clientPromise = null;
export const initializeFeatureFlags = () => {
    if (clientPromise) return clientPromise;

    clientPromise = (async () => {
        if (!config?.ddClientToken || !config?.ddApplicationId) {
            console.error('[Flags] Missing Datadog config');
            return null;
        }
        try {
            await OpenFeature.setProviderAndWait(new DatadogProvider({
                applicationId: config.ddApplicationId,
                clientToken: config.ddClientToken,
                env
            }));
            return OpenFeature.getClient();
        } catch (error) {
            console.warn('[Flags] Initialization failed:', error);
            return null;
        }
    })();

    return clientPromise;
};

export const getBooleanFlag = (client, key, defaultValue = false) =>
    client?.getBooleanValue(key, defaultValue) ?? defaultValue;
