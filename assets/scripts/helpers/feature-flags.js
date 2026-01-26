import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
import { getConfig } from './getConfig';



let env = document.documentElement.dataset?.env || 'preview';

// Temporarily set env to preview for development
// TODO: Remove this once development is complete
if (env === 'development') {
    env = 'preview';
}
const config = getConfig(env);

if (!config?.ddClientToken || !config?.ddApplicationId) {
    console.error('Datadog client token or application ID is not set');  
}

export const initializeFeatureFlags = async () => {
const rumUser = window.DD_RUM?.getUser?.();
const targetingKey = rumUser?.id || rumUser?.device_id

await OpenFeature.setProviderAndWait(
    new DatadogProvider({
        applicationId: config.ddApplicationId,
        clientToken: config.ddClientToken,
        env
    }),
            targetingKey ? { targetingKey } : undefined
    );

    const client = OpenFeature.getClient();

    return client;
}

// Flag Evaluation is local and instantaneous - the SDK uses locally cached data, 
// so no network requests occur when evaluating flags.
export const getBooleanFlag = (client, key, defaultValue = false) => client?.getBooleanValue(key, defaultValue) ?? defaultValue;
