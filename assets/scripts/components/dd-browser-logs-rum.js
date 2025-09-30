/* eslint import/no-unresolved: 0 */
import { getConfig } from '../helpers/getConfig';
const { env, branch } = document.documentElement.dataset;
const lang = document.documentElement.lang || 'en';

const Config = getConfig(env);

const generateRumDeviceId = () => Math.floor(Math.random() * 2 ** 53).toString(36);

const getRumDeviceId = () => {
    const matches = /_dd_device_id=(\w+)/.exec(document.cookie);
    return matches ? matches[1] : generateRumDeviceId();
};

// Temporary solution attributing website page views w. dd app user
const setRumDeviceId = () => {
    const deviceId = getRumDeviceId();
    const domain = window.location.hostname.split('.').slice(-2).join('.');
    const maxAge = 60 * 60 * 24 * 365;

    document.cookie = `_dd_device_id=${deviceId}; Domain=.${domain}; Max-Age=${maxAge}; Path=/; SameSite=None; Secure; Partitioned`;

    window.DD_RUM.setUserProperty('device_id', deviceId);
};
if (window.DD_RUM && (env === 'preview' || env === 'live')) {
    window.DD_RUM.init({
        applicationId: Config.ddApplicationId,
        clientToken: Config.ddClientToken,
        env,
        service: 'docs',
        version: CI_COMMIT_SHORT_SHA,
        trackUserInteractions: true,
        enableExperimentalFeatures: ['zero_lcp_telemetry'],
        sessionSampleRate: 100,
        sessionReplaySampleRate: 50,
        trackResources: true,
        trackLongTasks: true,
        defaultPrivacyLevel: 'mask-user-input',
        allowedTracingUrls: [window.location.origin],
        internalAnalyticsSubdomain: IA_SUBDOMAIN
    });

    window.DD_RUM.startSessionReplayRecording();

    if (branch) {
        window.DD_RUM.setGlobalContextProperty('branch', branch);
    }

    if (env === 'live') {
        setRumDeviceId();
    }
}

if (window.DD_LOGS && (env === 'preview' || env === 'live')) {
    // init browser logs
    window.DD_LOGS.init({
        clientToken: Config.ddClientToken,
        forwardErrorsToLogs: true,
        env,
        service: 'docs',
        version: CI_COMMIT_SHORT_SHA,
        internalAnalyticsSubdomain: IA_SUBDOMAIN
    });

    // global context
    window.DD_LOGS.setGlobalContextProperty('host', window.location.host);
    window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer);
    window.DD_LOGS.setGlobalContextProperty('lang', lang);

    if (branch) {
        window.DD_LOGS.setGlobalContextProperty('branch', branch);
    }

    // Locally log to console
    window.DD_LOGS.logger.setHandler(Config.loggingHandler);
}

const handleCdocsCustomRumAction = () => {
    const filterSelectorMenu = document.querySelector('.filter-selector-menu');
    
    if (filterSelectorMenu) {
        const filterButtons = filterSelectorMenu.querySelectorAll('.cdoc-filter__option');

        for (const button of filterButtons) {
            button.addEventListener('click', (e) => {
                window.DD_RUM.addAction('cdocs_filter_button_clicked', {
                    filter: e.target.dataset.filterId,
                    option: e.target.dataset.optionId
                });
            });
        }
    }
};

const handleFleetAutomationCustomRumAction = () => {
    const fleetAutomationLink = document.querySelector("[href^='https://app.datadoghq.com/fleet/install-agent']")
    console.log('fleetAutomationLink', fleetAutomationLink, "Commit SHA::", CI_COMMIT_SHORT_SHA);
    if (fleetAutomationLink) {
        fleetAutomationLink.addEventListener('click', () => {
            window.DD_RUM.addAction('in_app_fleet_automation_agent_install_clicked', {
                textContent: fleetAutomationLink.textContent,
                href: fleetAutomationLink.href
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.clientFiltersManager) {
        handleCdocsCustomRumAction();
        clientFiltersManager.registerHook('afterRerender', handleCdocsCustomRumAction);
        
        clientFiltersManager.registerHook('afterReveal', () => {
            window.DD_RUM.addAction('cdocs_page_revealed', {});
        });
        clientFiltersManager.registerHook('afterRerender', () => {
            window.DD_RUM.addAction('cdocs_page_rerendered', {});
        });
    }
    handleFleetAutomationCustomRumAction();
});


export { handleFleetAutomationCustomRumAction };