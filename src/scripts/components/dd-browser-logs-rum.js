import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

import configDocs from '../config/config-docs';

const { env } = document.documentElement.dataset;

function getConfig() {
    if (env === 'live') {
        return configDocs['production'];
    } else if (env === 'preview') {
        return configDocs['preview'];
    } else {
        return configDocs['local'];
    }
}

const { ddClientToken, ddApplicationId, loggingHandler } = getConfig();
const lang = document.documentElement.lang || 'en';

// init browser logs
datadogLogs.init({
    clientToken: ddClientToken,
    forwardErrorsToLogs: true
});

// init RUM
if (env === 'preview' || env === 'live') {
    datadogRum.init({
        applicationId: ddApplicationId,
        clientToken: ddClientToken
    });
}

// global context
datadogLogs.addLoggerGlobalContext('env', env);
datadogLogs.addLoggerGlobalContext('service', 'docs');
datadogLogs.addLoggerGlobalContext('host', window.location.host);
datadogLogs.addLoggerGlobalContext('referrer', document.referrer);
datadogLogs.addLoggerGlobalContext('lang', lang);

// create custom loggers
// Creation of a custom global logger to be used in all part of the site.
datadogLogs.createLogger('datadog_logger', {
    context: {
        env,
        service: 'docs',
        host: window.location.host
    }
});

datadogLogs.logger.setHandler(loggingHandler);

export default datadogLogs;
