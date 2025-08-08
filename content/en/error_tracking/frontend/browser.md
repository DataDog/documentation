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
  text: "Upload Javascript source maps"
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

#### npm (node package manager)
This method is recommended for modern web applications. The Browser SDK is packaged with the rest of your frontend JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

{{% collapse-content title="Installing using npm" level="h4" expanded=false id="npm" %}}

Add [`@datadog/browser-rum`][5] to your `package.json` file, then initialize it with:

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

{{% /collapse-content %}}

#### CDN async
This method is recommended for web applications with performance targets. The Browser SDK loads from our CDN asynchronously, ensuring the SDK download does not impact page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized.

{{% collapse-content title="Installing using CDN async" level="h4" expanded=false id="cdn-async" %}}

Add the generated code snippet to the head tag of every HTML page you want to monitor in your application. For **{{<region-param key="dd_site_name">}}** site:

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

{{% /collapse-content %}}

#### CDN sync
This method is recommended for collecting all events. The Browser SDK loads from our CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

{{% collapse-content title="Installing using CDN sync" level="h4" expanded=false id="cdn-sync" %}}

Add the generated code snippet to the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Including the script tag higher and synchronized ensures Datadog RUM can collect all performance data and errors. For **{{<region-param key="dd_site_name">}}** site:

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

{{% /collapse-content %}}

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

### Step 3 - Define the environment and other settings

- In the Environment field, define the environment (`env`) for your application to use [unified service tagging][33].
- In the Service field, define the service (`service`) for your application to use [unified service tagging][33].
- Set the privacy level for user input. See [Session Replay Browser Privacy Options][16] for more details.
- Set a version number (`version`) for your deployed application in the initialization snippet. For more information, see [Tagging][34].

For Error Tracking, these tags power:

- Filtering and faceting issues by `service` and `env`
- Cross-product correlation with RUM, Logs, and APM for the same `service`/`env`
- Matching uploaded source maps via the same `service` and `version` you configure during upload

### Step 4 - Configuration

Call the initialization command to start tracking. The following parameters are available:

{{% collapse-content title="Initialization parameters" level="h4" expanded=false id="init-parameters" %}}

`applicationId`
: Required<br/>
**Type**: String<br/>
The application ID.

`clientToken`
: Required<br/>
**Type**: String<br/>
A [Datadog client token][10].

`site`
: Optional<br/>
**Type**: String<br/>
**Default**: `datadoghq.com`<br/>
[The Datadog site parameter of your organization][11].

`service`
: Optional<br/>
**Type**: String<br/>
The service name for your application. Follows the [tag syntax requirements][12].

`env`
: Optional<br/>
**Type**: String<br/>
The application's environment, for example: prod, pre-prod, and staging. Follows the [tag syntax requirements][12].

`version`
: Optional<br/>
**Type**: String<br/>
The application's version, for example: 1.2.3, 6c44da20, and 2020.02.13. Follows the [tag syntax requirements][12].

`trackingConsent`
: Optional<br/>
**Type**: `"granted"` or `"not-granted"`<br/>
**Default**: `"granted"`<br/>
Set the initial user tracking consent state. See [User Tracking Consent][13].

`trackViewsManually`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Allows you to control views creation. See [override default view names][14].

`trackUserInteractions`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables [automatic collection of users actions][15].

`trackResources`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables collection of resource events.

`defaultPrivacyLevel`
: Optional<br/>
**Type**: String<br/>
**Default**: `mask` <br/>
See [Session Replay Privacy Options][16].

`enablePrivacyForActionName`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
See [Mask Action Names][17].

`actionNameAttribute`
: Optional<br/>
**Type**: String<br/>
Specify your own attribute to be used to [name actions][18].

`sessionSampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
The percentage of sessions to track: `100` for all, `0` for none. Only tracked sessions send RUM events. For more details about `sessionSampleRate`, see the [sampling configuration][19].

`silentMultipleInit`
: Optional<br/>
**Type**: Boolean <br/>
**Default**: `false`<br/>
Initialization fails silently if the RUM Browser SDK is already initialized on the page.

`proxy`
: Optional<br/>
**Type**: String<br/>
Optional proxy URL, for example: `https://www.proxy.com/path`. For more information, see the full [proxy setup guide][20].

`excludedActivityUrls`
: Optional<br/>
**Type**: List<br/>
A list of request origins ignored when computing the page activity. See [How page activity is calculated][21].

`workerUrl`
: Optional<br/>
**Type**: String<br/>
URL pointing to the Datadog Browser SDK Worker JavaScript file. The URL can be relative or absolute, but is required to have the same origin as the web application. See [Content Security Policy guidelines][22] for more information.

`compressIntakeRequests`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Compress requests sent to the Datadog intake to reduce bandwidth usage when sending large amounts of data. The compression is done in a Worker thread. See [Content Security Policy guidelines][22] for more information.

`storeContextsAcrossPages`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Store global context and user context in `localStorage` to preserve them along the user navigation. See [Contexts life cycle][23] for more details and specific limitations.

`allowUntrustedEvents`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Allow capture of [untrusted events][24], for example in automated UI tests.

Options that must have matching configuration when you are using the Logs Browser SDK:

`sessionPersistence`
: Optional<br/>
**Type**: `"cookie" | "local-storage"`<br/>
**Default**: `"cookie"`<br/>
Which storage strategy to use for persisting sessions. Can be either `cookie` or `local-storage`.

`trackSessionAcrossSubdomains`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Preserve the session across subdomains for the same site.

`useSecureSessionCookie`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Use a secure session cookie. This disables events sent on insecure (non-HTTPS) connections.

`usePartitionedCrossSiteSessionCookie`
: Optional<br/>
**Type**: Boolean<br/>
**Default**:`false`<br/>
Use a partitioned secure cross-site session cookie. This allows the Browser SDK to run when the site is loaded from another one (iframe). Implies `useSecureSessionCookie`.

`allowFallbackToLocalStorage`
: Optional - **Deprecated**<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Use `sessionPersistence` instead.

{{% /collapse-content %}}

### Tagging

A service is an independent, deployable code repository that maps to a set of pages.

- If your browser application was constructed as a monolith, your Datadog application has one service name for the application.
- If your browser application was constructed as separate repositories for multiple pages, edit the default service names throughout the lifecycle of your application.

### Step 5 - Deploy your application

Deploy the changes to your application. After your deployment is live, Datadog collects events from your users' browsers.

### Step 6 - Upload source maps (optional but recommended)

Upload your JavaScript source maps to access unminified stack traces. See [Upload JavaScript source maps][32].

### Step 7 - Visualize your data

Visualize the [data collected][7] in [dashboards][9] or create a search query in Error Tracking.

Until Datadog starts receiving data, your application appears as `pending` on the **Applications** page.

## Link errors with your source code

In addition to sending source maps, the [Datadog CLI][25] reports Git information such as the commit hash, repository URL, and a list of tracked file paths in the code repository.

Error Tracking can use this information to correlate errors with your source code, allowing you to pivot from any stack trace frame to the related line of code in [GitHub][26], [GitLab][27] and [Bitbucket][28].

<div class="alert alert-info">Linking from stack frames to source code is supported in the <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> version <code>0.12.0</code> version and later.</div>

For more information, see the [Datadog Source Code Integration][29].

## List uploaded source maps

See the [Debug Symbols][30] page to view all uploaded symbols.

### Limitations

Source maps are limited in size to **500 MB** each.

## Collect errors

You can monitor unhandled exceptions, unhandled promise rejections, handled exceptions, handled promise rejections, and other errors that the Browser SDK does not automatically track. Learn more about [Collecting Browser Errors][31].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking/
[2]: /real_user_monitoring/browser/data_collected/?tab=error#source-errors
[3]: /error_tracking/frontend/collecting_browser_errors/?tab=npm#collect-errors-manually
[4]: /error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[5]: https://www.npmjs.com/package/@datadog/browser-rum
[6]: https://app.datadoghq.com/error-tracking/settings/setup/client
[7]: /real_user_monitoring/browser/data_collected/
[8]: /real_user_monitoring/browser/data_collected/
[9]: /real_user_monitoring/platform/dashboards/errors/
[10]: /account_management/api-app-keys/#client-tokens
[11]: /getting_started/site/
[12]: /getting_started/tagging/#define-tags
[13]: /real_user_monitoring/browser/advanced_configuration/#user-tracking-consent
[14]: /real_user_monitoring/browser/advanced_configuration/#override-default-rum-view-names
[15]: /real_user_monitoring/browser/tracking_user_actions/
[16]: /real_user_monitoring/session_replay/browser/privacy_options
[17]: /real_user_monitoring/session_replay/browser/privacy_options#mask-action-names
[18]: /real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[19]: https://docs.datadoghq.com/real_user_monitoring/guide/sampling-browser-plans/
[20]: /real_user_monitoring/guide/proxy-rum-data/
[21]: /real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated 
[22]: /integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[23]: /real_user_monitoring/browser/advanced_configuration/#contexts-life-cycle
[24]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[25]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[26]: https://github.com
[27]: https://about.gitlab.com
[28]: https://bitbucket.org/product
[29]: /integrations/guide/source-code-integration/
[30]: https://app.datadoghq.com/source-code/setup/rum
[31]: https://docs.datadoghq.com/error_tracking/frontend/collecting_browser_errors/?tab=npm#collect-errors-manually
[32]: /real_user_monitoring/guide/upload-javascript-source-maps
[33]: /getting_started/tagging/unified_service_tagging/
[34]: /getting_started/tagging/
