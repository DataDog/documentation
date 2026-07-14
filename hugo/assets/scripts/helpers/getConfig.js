import configDocs from '../config/config-docs';

export const getConfig = (environment) => {
    if (environment === 'live') {
        return configDocs['live'];
    } else if (environment === 'preview') {
        return configDocs['preview'];
    } else return configDocs['development'];
};
