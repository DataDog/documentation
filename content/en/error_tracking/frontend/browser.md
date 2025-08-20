---
title: Browser Error Tracking
aliases:
- /real_user_monitoring/error_tracking/browser_errors
- /error_tracking/standalone_frontend/browser
further_reading:
- link: "https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"
  tag: "Source Code"
  text: "datadog-ci Source code"
- link: "/real_user_monitoring/guide/upload-javascript-source-maps"
  tag: "Documentation"
  text: "Upload JavaScript source maps"
- link: "/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
---

## Overview

[Error Tracking][1] processes errors collected from the browser by the Browser SDK. Whenever a [source][2], [custom][3], [report][4], or [console][4] error containing a stack trace is collected, Error Tracking processes and groups it under an issue, or group of similar errors.

## Prerequisites

Download the latest version of the [Browser SDK][5].

## Setup

To start sending Error Tracking data from your browser application to Datadog, follow the [in-app setup instructions][6] or follow the steps below.

### Step 1 - Create the application

1. In Datadog, navigate to the [**Errors > Settings > Browser and Mobile > Add an Application**][6] page and select the JavaScript (JS) application type.
2. Enter a name for your application, then click **Create Application**. This generates a `clientToken` and an `applicationId` for your application.

### Step 2 - Choose the right installation method

Choose the installation type for the Browser SDK.

{{< tabs >}}
{{% tab "npm" %}}

Installing through npm (Node Package Manager) is recommended for modern web applications. The Browser SDK is packaged with the rest of your frontend JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

Add [`@datadog/browser-rum`][1] to your `package.json` file, then initialize it with:

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({

   applicationId: '<APP_ID>',
   clientToken: '<CLIENT_TOKEN>',
   service: '<SERVICE>',
   env: '<ENV_NAME>',
   // site: '<SITE>',
   // version: '1.0.0',
   trackUserInteractions: true,
   trackResources: true
});

```

The `trackUserInteractions` parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained in your pages may be included to identify the elements interacted with.

[1]: https://www.npmjs.com/package/@datadog/browser-rum

{{% /tab %}}
{{% tab "CDN async" %}}

Installing through CDN async is recommended for web applications with performance targets. The Browser SDK loads from Datadog's CDN asynchronously, ensuring the SDK download does not impact page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized.

Add the generated code snippet to the head tag of every HTML page you want to monitor in your application. For the **{{<region-param key="dd_site_name">}}** site:

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
  })
</script>
```

The `trackUserInteractions` parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained in your pages may be included to identify the elements interacted with.

{{% /tab %}}
{{% tab "CDN sync" %}}

Installing through CDN sync is recommended for collecting all events. The Browser SDK loads from Datadog's CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

Add the generated code snippet to the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Including the script tag higher and synchronized ensures Datadog RUM can collect all performance data and errors. For the **{{<region-param key="dd_site_name">}}** site:

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js"
    type="text/javascript">
</script>
<script>
    window.DD_RUM && window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
</script>
```

The `trackUserInteractions` parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained in your pages may be included to identify the elements interacted with.

{{% /tab %}}
{{< /tabs >}}

#### TypeScript (optional)

If you are initializing the SDK in a TypeScript project, use the code snippet below. Types are compatible with TypeScript >= 3.8.2.

<div class="alert alert-info"><strong>Note</strong>: For earlier versions of TypeScript, import JavaScript sources and use global variables to avoid any compilation issues.</div>

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  trackUserInteractions: true,
   trackResources: true,
  ...
})
```

### Step 3 - Configure environment and settings

1. In the Environment field, define the environment (`env`) for your application to use [unified service tagging][32].
2. In the Service field, define the service (`service`) for your application to use [unified service tagging][32].
3. Set the privacy level for user input. See [Session Replay Browser Privacy Options][16] for more details.
4. Set a version number (`version`) for your deployed application in the initialization snippet. For more information, see [Tagging][33].
5. Configure additional parameters as needed. See the [Configuration reference](#configuration-reference) section below for all available options. 

#### Tagging for Error Tracking

These tags (configured in step 3 above) power Error Tracking functionality:

- Filtering and faceting issues by `service` and `env`
- Cross-product correlation with RUM, Logs, and APM for the same `service`/`env`
- Matching uploaded source maps through the same `service` and `version` you configure during upload

A service is an independent, deployable code repository that maps to a set of pages:

- If your browser application was constructed as a monolith, your Datadog application has one service name for the application.
- If your browser application was constructed as separate repositories for multiple pages, edit the default service names throughout the lifecycle of your application.

#### Configuration reference

Call the initialization command to start tracking. The below parameters are available.

##### Required

These parameters are essential for the Browser SDK to function. You must provide both values to initialize Error Tracking.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `applicationId` | String | - | The application ID. |
| `clientToken` | String | - | A [Datadog client token][10]. |

##### Core configuration

These parameters define your application's identity and environment. They're used for unified service tagging and help organize your data across Datadog products.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `env` | String | - | The application's environment (for example: prod, pre-prod, staging). Follows the [tag syntax requirements][12]. |
| `service` | String | - | The service name for your application. Follows the [tag syntax requirements][12]. |
| `site` | String | `datadoghq.com` | [The Datadog site parameter of your organization][11]. |
| `version` | String | - | The application's version (for example: 1.2.3, 6c44da20). Follows the [tag syntax requirements][12]. |

##### Privacy and consent

These parameters control how user data is collected and protected. Configure them based on your privacy requirements and compliance needs.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `defaultPrivacyLevel` | String | `mask` | See [Session Replay Privacy Options][16]. |
| `enablePrivacyForActionName` | Boolean | `false` | See [Mask Action Names][17]. |
| `trackingConsent` | `"granted"` or `"not-granted"` | `"granted"` | Set the initial user tracking consent state. See [User Tracking Consent][13]. |

##### Tracking and collection

These parameters control what data is automatically collected from user interactions and pageviews. Enable them based on your monitoring needs.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `actionNameAttribute` | String | - | Specify your own attribute to be used to [name actions][18]. |
| `sessionSampleRate` | Number | `100` | The percentage of sessions to track: `100` for all, `0` for none. See [sampling configuration][19]. |
| `trackResources` | Boolean | `false` | Enables collection of resource events. |
| `trackUserInteractions` | Boolean | `false` | Enables [automatic collection of user actions][15]. |
| `trackViewsManually` | Boolean | `false` | Allows you to control views creation. See [override default view names][14]. |

##### Advanced configuration

These parameters provide fine-grained control over SDK behavior, networking, and performance. Use them for advanced use cases and custom configurations.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `compressIntakeRequests` | Boolean | `false` | Compresses intake requests to reduce bandwidth usage. |
| `excludedActivityUrls` | List | - | A list of request origins ignored when computing page activity. See [How page activity is calculated][21]. |
| `proxy` | String | - | Optional proxy URL. See the full [proxy setup guide][20]. |
| `silentMultipleInit` | Boolean | `false` | Initialization fails silently if the RUM Browser SDK is already initialized. |
| `workerUrl` | String | - | URL pointing to the Datadog Browser SDK Worker JavaScript file. See [Content Security Policy guidelines][22]. |

##### Context and storage

These parameters control how user context and application state are preserved across page navigation and browser sessions.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `allowUntrustedEvents` | Boolean | `false` | Allow capture of [untrusted events][24], for example in automated UI tests. |
| `storeContextsAcrossPages` | Boolean | `false` | Store global context and user context in `localStorage` to preserve them along user navigation. See [Contexts life cycle][23]. |

##### Logs Browser SDK compatibility options

These parameters ensure compatibility when using both the RUM Browser SDK and Logs Browser SDK together. They must have matching configuration values across both SDKs to maintain consistent session tracking and data correlation.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `allowFallbackToLocalStorage` | Boolean | `false` | **Deprecated** - Use `sessionPersistence` instead. |
| `sessionPersistence` | `"cookie" \| "local-storage"` | `"cookie"` | Which storage strategy to use for persisting sessions. Can be either `cookie` or `local-storage`. |
| `trackSessionAcrossSubdomains` | Boolean | `false` | Preserve the session across subdomains for the same site. |
| `usePartitionedCrossSiteSessionCookie` | Boolean | `false` | Use a partitioned secure cross-site session cookie. This allows the Browser SDK to run when the site is loaded from another one (iframe). Implies `useSecureSessionCookie`. |
| `useSecureSessionCookie` | Boolean | `false` | Use a secure session cookie. This disables events sent on insecure (non-HTTPS) connections. |

### Step 4 - Deploy your application

Deploy the changes to your application. After your deployment is live, Datadog collects events from your users' browsers.

### Step 5 - Upload source maps (optional but recommended)

Upload your JavaScript source maps to access unminified stack traces. See [Upload JavaScript source maps][30].

### Step 6 - Visualize your data

Now that you've completed the basic setup for Browser Error Tracking, your application is collecting browser errors and you can start monitoring and debugging issues in real-time.

Visualize the [data collected][7] in [dashboards][8] or create a search query in Error Tracking.

Until Datadog starts receiving data, your application appears as `pending` on the **Applications** page.

## Advanced features (optional)

### Link errors with your source code

In addition to sending source maps, the [Datadog CLI][25] reports Git information such as the commit hash, repository URL, and a list of tracked file paths in the code repository.

Error Tracking can use this information to correlate errors with your source code, allowing you to pivot from any stack trace frame to the related line of code in [GitHub][26], [GitLab][27] and [Bitbucket][28].

<div class="alert alert-info">Linking from stack frames to source code is supported in the <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> version <code>0.12.0</code> version and later.</div>

For more information, see the [Datadog Source Code Integration][29].

### Manage uploaded source maps

See all uploaded symbols and manage your source maps on the [Debug Symbols][30] page.

**Note**: Source maps are limited in size to **500 MB** each.

## Next steps

You can monitor unhandled exceptions, unhandled promise rejections, handled exceptions, handled promise rejections, and other errors that the Browser SDK does not automatically track. Learn more about [Collecting Browser Errors][31].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking/
[2]: /real_user_monitoring/browser/data_collected/?tab=error#source-errors
[3]: /error_tracking/frontend/collecting_browser_errors/?tab=npm#collect-errors-manually
[4]: /error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[5]: https://www.npmjs.com/package/@datadog/browser-rum
[6]: https://app.datadoghq.com/error-tracking/settings/setup/client
[7]: /real_user_monitoring/browser/data_collected/
[8]: /real_user_monitoring/platform/dashboards/errors/
[9]: /account_management/api-app-keys/#client-tokens
[10]: /getting_started/site/
[11]: /getting_started/tagging/#define-tags
[12]: /real_user_monitoring/browser/advanced_configuration/#user-tracking-consent
[13]: /real_user_monitoring/browser/advanced_configuration/#override-default-rum-view-names
[14]: /real_user_monitoring/browser/tracking_user_actions/
[15]: /real_user_monitoring/session_replay/browser/privacy_options
[16]: /real_user_monitoring/session_replay/browser/privacy_options#mask-action-names
[17]: /real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[18]: https://docs.datadoghq.com/real_user_monitoring/guide/sampling-browser-plans/
[19]: /real_user_monitoring/guide/proxy-rum-data/
[20]: /real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[21]: /integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[22]: /real_user_monitoring/browser/advanced_configuration/#contexts-life-cycle
[23]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[24]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[25]: https://github.com
[26]: https://about.gitlab.com
[27]: https://bitbucket.org/product
[28]: /integrations/guide/source-code-integration/
[29]: https://app.datadoghq.com/source-code/setup/rum
[30]: /real_user_monitoring/guide/upload-javascript-source-maps
[31]: https://docs.datadoghq.com/error_tracking/frontend/collecting_browser_errors/?tab=npm#collect-errors-manually
[32]: /getting_started/tagging/unified_service_tagging/
[33]: /getting_started/tagging/
