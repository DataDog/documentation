import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
import { getConfig } from './getConfig';



const env = document.documentElement.dataset?.env || 'development';
const config = getConfig(env);

if (!config?.ddClientToken || !config?.ddApplicationId) return null;

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



// Flag Evaluation is local and instantaneous - the SDK uses locally cached data, 
// so no network requests occur when evaluating flags.
export const getBooleanFlag = (key, defaultValue = false) => client?.getBooleanValue(key, defaultValue) ?? defaultValue;
