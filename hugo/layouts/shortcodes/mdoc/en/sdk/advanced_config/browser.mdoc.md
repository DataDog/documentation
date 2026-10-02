<!--
Pages using this partial must declare these filters:

content_filters:
  - trait_id: lib_src
    option_group_id: rum_browser_sdk_source_options
  - trait_id: rum_browser_sdk_version
    option_group_id: rum_browser_sdk_version_for_advanced_config_options
-->

## Initialization parameters

For the full list of Browser SDK initialization parameters, see the [Browser SDK API reference](https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html).

## Micro frontend

The RUM Browser SDK supports micro frontend architectures by attributing events to specific micro frontends using `service` and `version` attributes. A single RUM SDK instance runs at the shell level. Events are segmented by `service` and `version` so teams can filter dashboards, set alerts, and track performance per micro frontend.

Datadog provides two approaches for attributing RUM events to micro frontends:

1. **Automatic attribution**: Uses a build plugin that injects source code context, eliminating manual stack trace parsing
2. **Manual attribution**: Uses the `beforeSend` callback to parse stack traces and extract service information

### Automatic service and version attribution

This approach uses a build plugin to inject source code context into your bundles, which the RUM SDK automatically reads to enrich events with the correct `service` and `version`.

#### Prerequisites and supported setups

-   **Separated bundles**: Each micro frontend has its own bundle with distinct file paths, for example, using [module federation][21].
-   **Supported bundler**: Use a bundler [supported by the Datadog build plugins][22].
-   **Browser SDK**: Browser SDK version v6.30.1 or higher.

#### Setup guide

**Step 1 - Configure the [build plugin][23] for each micro frontend**

In each micro frontend's build configuration, enable source code context injection:

{% tabs %}
{% tab label="Webpack" %}
```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
    plugins: [
        new datadogWebpackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Vite" %}
```javascript
import { datadogVitePlugin } from '@datadog/vite-plugin';

export default {
    plugins: [
        datadogVitePlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="esbuild" %}
```javascript
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
    plugins: [
        datadogEsbuildPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
});
```
{% /tab %}

{% tab label="Rollup" %}
```javascript
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
    plugins: [
        datadogRollupPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Rspack" %}
```javascript
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
    plugins: [
        new datadogRspackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}
{% /tabs %}

**Step 2 - Set up the Browser SDK at the shell level**

[Set up Browser Monitoring][4] in your shell application (main entry point). The Browser SDK automatically enriches RUM events (errors, custom actions, XHR/Fetch resources, long tasks, vitals) with `service` and `version` from the context map.

{% alert level="warning" %}
Events that don't match any micro frontend fall back to the shell-level service and version.
{% /alert %}

**Step 3 - [Explore micro frontend data in Datadog](#explore-micro-frontend-data-in-datadog)**

<!-- Version must meet 5.22 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.22") %}

### Manual service and version attribution

In the `beforeSend` property, you can override the service and version properties. To help you identify where the event originated, use the `context.handlingStack` property.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            const stack = context?.handlingStack || event?.error?.stack;
            const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

            if (service && version) {
                event.service = service;
                event.version = version;
            }

            return true;
        },
    });
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM && window.DD_RUM.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

The regular expression must match your application's file path structure. Adjust the pattern to extract service and version from your bundle URLs. Any query in the RUM Explorer can use the service attribute to filter events.
<!-- ends  5.22 -->

{% /if %}

### Limitations

#### Events without an attributed origin

Some events cannot be attributed to an origin because they do not have an associated handling stack:

-   Action events collected automatically
-   Resource events other than XHR and Fetch
-   View events collected automatically
-   CORS and CSP violations

#### Source map resolution across micro frontends

When a stack trace contains frames from multiple micro frontends, the event receives a single `service` and `version` from the topmost frame (where the error was thrown). Source maps are resolved for the event under that single service, so frames from other micro frontends remain minified, even when their source maps were correctly uploaded under their own `service`.

To control which micro frontend's source maps are used, use the [manual attribution](#manual-service-and-version-attribution) approach with `beforeSend` to set `event.service` and `event.version`. Only frames belonging to the chosen micro frontend are unminified.

### Explore micro frontend data in Datadog

After setup, the `service` and `version` on RUM events identify which micro frontend generated each event. Use these attributes in several places in Datadog:

-   {% ui %}Side panels{% /ui %}: The `service` and `version` attributes appear in the session, view, error, resource, action, and long task side panels in the RUM Explorer.
-   {% ui %}RUM Summary dashboard{% /ui %}: Use the `service` and `version` to filter in the RUM Summary dashboard to scope performance metrics to a specific micro frontend.
-   {% ui %}Custom dashboards{% /ui %}: Create dashboards using the `service` and `version` to monitor each micro frontend independently.

The `service` and `version` tags representing each micro frontend can also be found in the following [RUM without Limits][24] metrics:

- `rum.measure.error`
- `rum.measure.operation`
- `rum.measure.operation.duration`

## Enrich RUM data

To add context, track users and accounts, and modify or drop RUM events, see [Enrich RUM Data](/real_user_monitoring/enrich_rum_data/).

[4]: /real_user_monitoring/setup/install/?platform=browser
[21]: https://module-federation.io/
[22]: https://github.com/DataDog/build-plugins?tab=readme-ov-file#usage
[23]: https://github.com/DataDog/build-plugins
[24]: /real_user_monitoring/retain_and_recover_valuable_sessions/
