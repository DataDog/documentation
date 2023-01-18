/* eslint import/no-unresolved: 0 */
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

const Config = getConfig();

if (window.DD_RUM) {
    if (env === 'preview' || env === 'live') {
        window.DD_RUM.init({
            applicationId: Config.ddApplicationId,
            clientToken: Config.ddClientToken,
            env,
            service: 'docs',
            version: CI_COMMIT_SHORT_SHA,
            trackInteractions: true,
            trackFrustrations: true,
            enableExperimentalFeatures: ["clickmap"],
            sessionSampleRate: 100,
            sessionReplaySampleRate: 50,
            allowedTracingOrigins: [window.location.origin],
            internalAnalyticsSubdomain: 'iam-rum-intake'
        });

        window.DD_RUM.startSessionReplayRecording();

        if (branch) {
            window.DD_RUM.addRumGlobalContext('branch', branch);
        }
    }
}

if (window.DD_LOGS) {
    // init browser logs
    window.DD_LOGS.init({
        clientToken: Config.ddClientToken,
        forwardErrorsToLogs: true,
        env,
        service: 'docs',
        version: CI_COMMIT_SHORT_SHA,
        internalAnalyticsSubdomain: 'iam-rum-intake'
    });

    // global context
    window.DD_LOGS.addLoggerGlobalContext('host', window.location.host);
    window.DD_LOGS.addLoggerGlobalContext('referrer', document.referrer);
    window.DD_LOGS.addLoggerGlobalContext('lang', lang);

    if (branch) {
        window.DD_LOGS.addLoggerGlobalContext('branch', branch);
    }

    // Locally log to console
    window.DD_LOGS.logger.setHandler(Config.loggingHandler);
}
