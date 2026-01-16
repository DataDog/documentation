---
title: Browser Error Tracking
aliases:
- /real_user_monitoring/error_tracking/browser_errors
- /error_tracking/standalone_frontend/browser
further_reading:
- link: "https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps"
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

[Error Tracking][1] processes errors collected from the browser by the Browser SDK. Whenever a [source][2], [custom][3], [report][4], or [console][4] error containing a stack trace is collected, Error Tracking processes and groups it under an issue, or group of similar errors to be found in the [Error Tracking Explorer][16].

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

Add the generated code snippet to the head tag of every HTML page you want to monitor in your application. For the **{{<region-param key="dd_site_name">}}** [site][1]:

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

[1]: /getting_started/site/

{{% /tab %}}
{{% tab "CDN sync" %}}

Installing through CDN sync is recommended for collecting all events. The Browser SDK loads from Datadog's CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

Add the generated code snippet to the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Placing the script tag higher and loading it synchronously ensures Datadog RUM can collect all performance data and errors. For the **{{<region-param key="dd_site_name">}}** [site][1]:

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

[1]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

#### TypeScript (optional)

If you are initializing the SDK in a TypeScript project, use the code snippet below. Types are compatible with TypeScript >= 3.8.2.

<div class="alert alert-info">For earlier versions of TypeScript, import JavaScript sources and use global variables to avoid any compilation issues.</div>

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

1. In the Environment field, define the environment (`env`) for your application to use [unified service tagging][18].
2. In the Service field, define the service (`service`) for your application to use [unified service tagging][18].
3. Set the privacy level for user input. See [Session Replay Browser Privacy Options][10] for more details.
4. Set a version number (`version`) for your deployed application in the initialization snippet. For more information, see [Tagging](#tagging-for-error-tracking).
5. Configure additional parameters as needed. See the [Configuration reference](#configuration-reference) section below for all available options.

### Step 4 - Deploy your application

Deploy the changes to your application. After your deployment is live, Datadog collects events from your users' browsers.

### Step 5 - Upload source maps (optional but recommended)

Upload your JavaScript source maps to access unminified stack traces. See the [source map upload guide][17].

### Step 6 - Visualize your data

Now that you've completed the basic setup for Browser Error Tracking, your application is collecting browser errors and you can start monitoring and debugging issues in real-time.

Visualize the [data collected][7] in [dashboards][8] or create a search query in Error Tracking.

Until Datadog starts receiving data, your application appears as `pending` on the **Applications** page.

### Step 7 - Link errors with your source code (optional)

In addition to sending source maps, the [Datadog CLI][11] reports Git information such as the commit hash, repository URL, and a list of tracked file paths in the code repository.

Error Tracking can use this information to correlate errors with your [source code][15], allowing you to pivot from any stack trace frame to the related line of code in [GitHub][12], [GitLab][13] and [Bitbucket][14].

<div class="alert alert-info">Linking from stack frames to source code is supported in the <a href="https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> version <code>0.12.0</code> and later.</div>

For more information, see the [Datadog Source Code Integration][15].

## Tagging for Error Tracking

These tags (configured in step 3 above) power Error Tracking functionality:

- Filtering and faceting issues by `service` and `env`
- Cross-product correlation with RUM, Logs, and APM for the same `service`/`env`
- Matching uploaded source maps through the same `service` and `version` you configure during upload

A service is an independent, deployable code repository that maps to a set of pages:

- If your browser application was constructed as a monolith, your Datadog application has one service name for the application.
- If your browser application was constructed as separate repositories for multiple pages, edit the default service names throughout the lifecycle of your application.

Learn more about [tagging][19] in Datadog.

## Configuration reference

Refer to the [Browser SDK API Reference][9] for the full list of available configuration options.

## Next steps

You can monitor unhandled exceptions, unhandled promise rejections, handled exceptions, handled promise rejections, and other errors that the Browser SDK does not automatically track. Learn more about [Collecting Browser Errors][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking/
[2]: /real_user_monitoring/application_monitoring/browser/data_collected/?tab=error#source-errors
[3]: /error_tracking/frontend/collecting_browser_errors/
[4]: /error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[5]: https://www.npmjs.com/package/@datadog/browser-rum
[6]: https://app.datadoghq.com/error-tracking/settings/setup/client
[7]: /real_user_monitoring/application_monitoring/browser/data_collected/
[8]: /real_user_monitoring/platform/dashboards/errors/
[9]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[10]: /session_replay/browser/privacy_options#mask-action-names
[11]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
[12]: https://github.com
[13]: https://about.gitlab.com
[14]: https://bitbucket.org/product
[15]: /integrations/guide/source-code-integration/
[16]: /error_tracking/explorer
[17]: /real_user_monitoring/guide/upload-javascript-source-maps
[18]: /getting_started/tagging/unified_service_tagging/
[19]: /getting_started/tagging/
