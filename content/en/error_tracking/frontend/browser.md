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

[Error Tracking][4] processes errors collected from the browser by the Browser SDK. Whenever a [source][1], [custom][2], [report][3], or [console][3] error containing a stack trace is collected, Error Tracking processes and groups it under an issue, or group of similar errors.

## Prerequisites

Download the latest version of the [Browser SDK][7].

## Setup

- Set up the Browser SDK by following the [in-app setup instructions][5] or the [Browser SDK setup documentation][6] below.

- [Upload your JavaScript source maps][9] to access unminified stack traces.

### Step 1 - Set up the Browser SDK

To set up Browser Monitoring, create an application in Datadog:

1. In Datadog, navigate to the [**Error Tracking > Settings > Browser and Mobile > Add an Application**][16] page and select the JavaScript (JS) application type.
   - By default, automatic user data collection is enabled. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [Browser Data Collected][17].
   - Enter a name for your application and click **Generate Client Token**. This generates a `clientToken` and an `applicationId` for your application.
   - Choose the installation type for the Browser SDK: [npm](#npm), or a hosted version ([CDN async](#cdn-async) or [CDN sync](#cdn-sync)).
   - Define the environment name and service name for your application to use [unified service tagging][18]. Set a version number for your deployed application in the initialization snippet. For more information, see [Tagging](#tagging).
2. Deploy the changes to your application. Once your deployment is live, Datadog collects events from your users' browsers.
3. Visualize the [data collected][17] in [dashboards][19] or create a search query in Error Tracking.

Until Datadog starts receiving data, your application appears as `pending` on the **Applications** page.

### Step 2 - Choose the right installation method

npm (node package manager)
: This method is recommended for modern web applications. The Browser SDK is packaged with the rest of your front-end JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

CDN async
: This method is recommended for web applications with performance targets. The Browser SDK loads from our CDN asynchronously, ensuring the SDK download does not impact page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized.

CDN sync
: This method is recommended for collecting all events. The Browser SDK loads from our CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

{{% collapse-content title="npm" level="h4" expanded=true id="npm" %}}

Add [`@datadog/browser-rum`][7] to your `package.json` file, then initialize it with:

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

{{% collapse-content title="CDN async" level="h4" expanded=false id="cdn-async" %}}

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

{{% collapse-content title="CDN sync" level="h4" expanded=false id="cdn-sync" %}}

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

{{% collapse-content title="TypeScript" level="h4" expanded=false id="typescript" %}}

Types are compatible with TypeScript >= 3.8.2. To initialize the SDK, use the following code snippet.

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

{{% /collapse-content %}}

### Step 3 - Configure the application

#### Initialize the SDK

Initialize the SDK with the below parameters. Configure your application's `version`, `env`, and `service` values to help organize and filter your error data.

{{% collapse-content title="Initialization parameters" level="h4" expanded=false id="initialization-parameters" %}}

Call the initialization command to start tracking. The following parameters are available:

`applicationId`
: Required<br/>
**Type**: String<br/>
The application ID.

`clientToken`
: Required<br/>
**Type**: String<br/>
A [Datadog client token][1].

`site`
: Optional<br/>
**Type**: String<br/>
**Default**: `datadoghq.com`<br/>
[The Datadog site parameter of your organization][2].

`service`
: Optional<br/>
**Type**: String<br/>
The service name for your application. This helps organize your data by application component. Examples: `frontend`, `web-app`, `checkout-service`. Follows the [tag syntax requirements][3].

`env`
: Optional<br/>
**Type**: String<br/>
The application's environment. This helps separate data from different deployment environments. Examples: `prod`, `staging`, `dev`, `pre-prod`. Follows the [tag syntax requirements][4].

`version`
: Optional<br/>
**Type**: String<br/>
The application's version. This helps track errors across different releases. Examples: `1.2.3`, `6c44da20`, `2020.02.13`. Follows the [tag syntax requirements][4].

`trackingConsent`
: Optional<br/>
**Type**: `"granted"` or `"not-granted"`<br/>
**Default**: `"granted"`<br/>
Set the initial user tracking consent state. See [User Tracking Consent][5].

`trackViewsManually`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Allows you to control views creation. See [override default view names][6].

`trackUserInteractions`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables [automatic collection of users actions][7].

`trackResources`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables collection of resource events.

`defaultPrivacyLevel`
: Optional<br/>
**Type**: String<br/>
**Default**: `mask` <br/>
See [Session Replay Privacy Options][8].

`enablePrivacyForActionName`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
See [Mask Action Names][9].

`actionNameAttribute`
: Optional<br/>
**Type**: String<br/>
Specify your own attribute to be used to [name actions][10].

`sessionSampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
The percentage of sessions to track: `100` for all, `0` for none. Only tracked sessions send RUM events. For more details about `sessionSampleRate`, see the [sampling configuration][8].

`silentMultipleInit`
: Optional<br/>
**Type**: Boolean <br/>
**Default**: `false`<br/>
Initialization fails silently if the RUM Browser SDK is already initialized on the page.

`proxy`
: Optional<br/>
**Type**: String<br/>
Optional proxy URL, for example: `https://www.proxy.com/path`. For more information, see the full [proxy setup guide][8].

`excludedActivityUrls`
: Optional<br/>
**Type**: List<br/>
A list of request origins ignored when computing the page activity. See [How page activity is calculated][9].

`workerUrl`
: Optional<br/>
**Type**: String<br/>
URL pointing to the Datadog Browser SDK Worker JavaScript file. The URL can be relative or absolute, but is required to have the same origin as the web application. See [Content Security Policy guidelines][10] for more information.

`compressIntakeRequests`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Compress requests sent to the Datadog intake to reduce bandwidth usage when sending large amounts of data. The compression is done in a Worker thread. See [Content Security Policy guidelines][10] for more information.

`storeContextsAcrossPages`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Store global context and user context in `localStorage` to preserve them along the user navigation. See [Contexts life cycle][11] for more details and specific limitations.

`allowUntrustedEvents`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Allow capture of [untrusted events][12], for example in automated UI tests.

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

[1]: /account_management/api-app-keys/#client-tokens
[2]: /getting_started/site/
[3]: /getting_started/tagging/#define-tags
[4]: /getting_started/tagging/#define-tags
[5]: /real_user_monitoring/browser/advanced_configuration/#user-tracking-consent
[6]: /real_user_monitoring/browser/advanced_configuration/#override-default-rum-view-names
[7]: /real_user_monitoring/browser/tracking_user_actions/
[8]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#sampling
[8]: /real_user_monitoring/guide/proxy-rum-data/
[9]: /real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[10]: /integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[11]: /real_user_monitoring/browser/advanced_configuration/#contexts-life-cycle
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[13]: /real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/

{{% /collapse-content %}}

#### Tagging

Tags are key-value pairs that help you organize and filter your error data in Datadog. They allow you to group errors by different criteria like environment, service, or version.

Tags help you:
- Filter errors by environment (prod vs staging)
- Group errors by service or application component
- Track errors across different versions of your application
- Create more targeted alerts and dashboards

Key tags for error tracking:
- `service`: Identifies which part of your application the error came from
- `env`: Distinguishes between different deployment environments (prod, staging, dev)
- `version`: Tracks which version of your application had the error

A service is an independent, deployable code repository that maps to a set of pages.
- If your browser application was constructed as a monolith, your Datadog application has one service name for the application.
- If your browser application was constructed as separate repositories for multiple pages, edit the default service names throughout the lifecycle of your application.

## Link errors with your source code

In addition to sending source maps, the [Datadog CLI][10] reports Git information such as the commit hash, repository URL, and a list of tracked file paths in the code repository.

Error Tracking can use this information to correlate errors with your source code, allowing you to pivot from any stack trace frame to the related line of code in [GitHub][11], [GitLab][12] and [Bitbucket][13].

<div class="alert alert-info">Linking from stack frames to source code is supported in the <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> version <code>0.12.0</code> version and later.</div>

For more information, see the [Datadog Source Code Integration][14].

## List uploaded source maps

See the [Debug Symbols][15] page to view all uploaded symbols.

### Limitations

Source maps are limited in size to **500 MB** each.

## Collect errors

You can monitor unhandled exceptions, unhandled promise rejections, handled exceptions, handled promise rejections, and other errors that the Browser SDK does not automatically track. Learn more about [Collecting Browser Errors][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /error_tracking/frontend/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: /error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[4]: https://app.datadoghq.com/rum/error-tracking
[5]: https://app.datadoghq.com/error-tracking/settings/setup/client
[6]: /real_user_monitoring/browser/setup/client?tab=errortracking
[7]: https://www.npmjs.com/package/@datadog/browser-rum

[9]: /real_user_monitoring/guide/upload-javascript-source-maps
[10]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[11]: https://github.com
[12]: https://about.gitlab.com
[13]: https://bitbucket.org/product
[14]: /integrations/guide/source-code-integration/
[15]: https://app.datadoghq.com/source-code/setup/rum
[16]: https://app.datadoghq.com/rum/list
[17]: /real_user_monitoring/data_collected/
[18]: /getting_started/tagging/using_tags/
[19]: /real_user_monitoring/platform/dashboards/