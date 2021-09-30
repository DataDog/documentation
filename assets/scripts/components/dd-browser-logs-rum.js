/* eslint import/no-unresolved: 0 */
import * as params from '@params';
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import configDocs from '../config/config-docs';

const { env, branch } = document.documentElement.dataset;
const lang = document.documentElement.lang || 'en';

function getConfig() {
    if (env === 'live') {
        return configDocs['live'];
    } else if (env === 'preview') {
        return configDocs['preview'];
    } else {
        return configDocs['development'];
    }
}

console.log(`CI_COMMIT_SHORT_SHA = ${params.CI_COMMIT_SHORT_SHA}`);

const Config = getConfig();

if (datadogRum) {
    if (env === 'preview' || env === 'live') {
        datadogRum.init({
            applicationId: Config.ddApplicationId,
            clientToken: Config.ddClientToken,
            env,
            service: 'docs',
            version: params.CI_COMMIT_SHORT_SHA,
            trackInteractions: true,
            allowedTracingOrigins: [window.location.origin]
        });

        if (branch) {
            datadogRum.addRumGlobalContext('branch', branch);
        }

        datadogRum.startSessionReplayRecording();
    }
}

if (datadogLogs) {
    if (env === 'preview' || env === 'live') {
        datadogLogs.init({
            clientToken: Config.ddClientToken,
            forwardErrorsToLogs: true,
            env,
            service: 'docs',
            version: params.CI_COMMIT_SHORT_SHA
        });
    
        // global context
        datadogLogs.addLoggerGlobalContext('host', window.location.host);
        datadogLogs.addLoggerGlobalContext('referrer', document.referrer);
        datadogLogs.addLoggerGlobalContext('lang', lang);
    
        if (branch) {
            datadogLogs.addLoggerGlobalContext('branch', branch);
        }
    
        // Locally log to console
        datadogLogs.logger.setHandler(Config.loggingHandler);
    }
}
