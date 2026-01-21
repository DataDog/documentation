---
title: Browser Monitoring Client-Side Setup
description: "Set up RUM Browser SDK using client-side instrumentation with NPM or CDN to monitor user experience, performance, and errors in web applications. The Browser SDK can also be used to set up Error Tracking, Product Analytics, and Session Replay."
aliases:
  - /real_user_monitoring/setup
  - /real_user_monitoring/browser/setup/client
further_reading:
  - link: '/real_user_monitoring/application_monitoring/browser/advanced_configuration/'
    tag: 'Documentation'
    text: 'Advanced configuration'
  - link: '/session_replay/browser/'
    tag: 'Documentation'
    text: 'Setup Session Replay'
  - link: '/real_user_monitoring/error_tracking/browser/'
    tag: 'Documentation'
    text: 'Setup Error Tracking'
  - link: '/real_user_monitoring/correlate_with_other_telemetry/'
    tag: 'Documentation'
    text: 'Correlate RUM Events with Other Telemetry'
content_filters:
  - trait_id: sdk_product
    option_group_id: sdk_product_options
  - trait_id: lib_src
    option_group_id: rum_browser_sdk_source_options
---

<!-- ============================================== -->
<!-- OVERVIEW -->
<!-- ============================================== -->

## Overview

The Datadog Browser SDK is a suite of tools that help you monitor your web applications. It includes:
- Real User Monitoring (RUM)
- Error Tracking
- Product Analytics
- Session Replay

<!-- RUM -->
{% if equals($sdk_product, "rum") %}

Real User Monitoring (RUM) provides comprehensive visibility into user experience and web application performance. Monitor page load times, user interactions, resource loading, and application errors in real-time.

RUM helps you:

- Monitor user experience with detailed performance metrics for page loads, user actions, and resource requests
- Track user journeys through your application with Session Replay capabilities
- Identify performance bottlenecks and correlate frontend and backend performance with APM traces

The Browser SDK supports all modern desktop and mobile browsers and provides automatic collection of key performance metrics, user interactions, and application errors. After setup, you can manage your RUM configurations per application in Datadog and visualize the collected data in dashboards and the RUM Explorer.
{% /if %}

<!-- Error Tracking -->
{% if equals($sdk_product, "error_tracking") %}
[Error Tracking][1-et] processes errors collected from the browser by the Browser SDK. Whenever a [source][2-et], [custom][3-et], [report][4-et], or [console][4-et] error containing a stack trace is collected, Error Tracking processes and groups it under an issue, or group of similar errors to be found in the [Error Tracking Explorer][16-et].
{% /if %}

<!-- Product Analytics -->
{% if equals($sdk_product, "product_analytics") %}
[Product Analytics][1-pa] helps you gain insight into user behavior and make data-driven decisions. Track user activity, analyze conversion funnels, create audience segments, and visualize interactions with heatmaps.
{% /if %}

<!-- Session Replay -->
{% if equals($sdk_product, "session_replay") %}
Session Replay expands your user experience monitoring by allowing you to capture and visually replay the web browsing experience of your users. Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.
{% /if %}

<!-- ============================================== -->
<!-- SETUP -->
<!-- ============================================== -->

## Setup

### Step 1 - Create the application in the UI

<!--Setup step 1 for RUM, Product Analytics, Session Replay -->

{% if or(equals($sdk_product, "rum"), equals($sdk_product, "product_analytics"), equals($sdk_product, "session_replay")) %}

To start sending RUM data from your browser application to Datadog, follow the [in-app setup instructions][1-rum] or follow the steps below.

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1-rum] and select the JavaScript (JS) application type.
2. Enter a name for your application, then click **Create Application**. This generates a `clientToken` and an `applicationId` for your application.

{% /if %}

<!--Setup step 1 for Error Tracking -->

{% if equals($sdk_product, "error_tracking") %}
To start sending Error Tracking data from your browser application to Datadog, follow the [in-app setup instructions][6-et] or follow the steps below.

1. In Datadog, navigate to the [**Errors > Settings > Browser and Mobile > Add an Application**][6-et] page and select the JavaScript (JS) application type.
2. Enter a name for your application, then click **Create Application**. This generates a `clientToken` and an `applicationId` for your application.

{% /if %}

### Step 2 - Install the Browser SDK


<!--Setup Step 2 via NPM-->

{% if equals($lib_src, "npm") %}

Installing through Node Package Manager (npm) registry is recommended for modern web applications. The Browser SDK is packaged with the rest of your frontend JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

Add [`@datadog/browser-rum`][2-rum] to your `package.json` file, example if you use npm cli:

```
npm install --save @datadog/browser-rum
```

Then initialize it with:

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

{% /if %}

<!--Setup Step 2 via CDN ASYNC-->

{% if equals($lib_src, "cdn_async") %}

Installing through CDN async is recommended for web applications with performance targets. The Browser SDK loads from Datadog's CDN asynchronously, ensuring the SDK download does not impact page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized.

Add the generated code snippet to the head tag of every HTML page you want to monitor in your application.

{% site-region region="us" %}

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
{% /site-region %}
{% site-region region="eu" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu/v6/datadog-rum.js','DD_RUM')
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
{% /site-region %}

{% site-region region="ap1" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js','DD_RUM')
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
{% /site-region %}
{% site-region region="ap2" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js','DD_RUM')
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

{% /site-region %}
{% site-region region="us3" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js','DD_RUM')
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

{% /site-region %}
{% site-region region="us5" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js','DD_RUM')
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

{% /site-region %}
{% site-region region="gov" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v6.js','DD_RUM')
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
{% /site-region %}

{% /if %}

<!--Setup Step 2 via CDN SYNC-->

{% if equals($lib_src, "cdn_sync") %}

Installing through CDN sync is recommended for collecting all events. The Browser SDK loads from Datadog's CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

Add the generated code snippet to the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Placing the script tag higher and loading it synchronously helps ensure Datadog RUM can collect all performance data and errors.

{% site-region region="us" %}

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

{% /site-region %}
{% site-region region="eu" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v6/datadog-rum.js"
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

{% /site-region %}
{% site-region region="ap1" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js"
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

{% /site-region %}
{% site-region region="ap2" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js"
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

{% /site-region %}
{% site-region region="us3" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js"
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

{% /site-region %}
{% site-region region="us5" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js"
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

{% /site-region %}
{% site-region region="gov" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum-v6.js"
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

{% /site-region %}

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

{% /if %}

### Step 3 - Initialize the Browser SDK

The SDK should be initialized as early as possible in the app lifecycle. This ensures all measurements are captured correctly.

In the initialization snippet, set an environment name, service name, and client token. See the full list of [initialization parameters][3].



{% alert level="info" %}
Change any of the filters for this page to update the 1 lines below.
{% /alert %}

<!-- RUM -->
{% if equals($sdk_product, "rum") %}
RUM-specific content goes here.
{% /if %}

<!-- Error Tracking -->
{% if equals($sdk_product, "error_tracking") %}
Error Tracking-specific content goes here.
{% /if %}

<!-- Product Analytics -->
{% if equals($sdk_product, "product_analytics") %}
Product Analytics-specific content goes here.
{% /if %}

<!-- Session Replay -->
{% if equals($sdk_product, "session_replay") %}
Session Replay-specific content goes here.
{% /if %}


## Valid traits and their values (option IDs)
  
For reference, here's a list of all the traits available on this page, and the valid values for each trait.

You can use this table to populate the `equals` function in your `if` tags: `equals(<TRAIT>, <VALUE>)`. Example: `equals($sdk_product, "rum")`. For details on using `if` tags, see the [relevant section of the Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference#If-and-if/else-(conditional-display-tag)).
  
{% table %}
* Trait
* Valid values
* Equals function to use in `if` tag
---
* `sdk_product` {% rowspan=4 %}
* `rum`
* `equals($sdk_product, "rum")`
---
* `error_tracking`
* `equals($sdk_product, "error_tracking")`
---
* `product_analytics`
* `equals($sdk_product, "product_analytics")`
---
* `session_replay`
* `equals($sdk_product, "session_replay")`
{% /table %}

  
## Guidelines and resources
  
- When possible, keep headers at the top level (outside of any `if` tags), giving each section its own `if` tags.
- If you can't keep headers at the top level, follow the [best practices for avoiding duplicate headers](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#Avoid-duplicate-headers) to make sure your page's right nav works properly.
- Need to add an alert or other element? See the [Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference).
- If you need to link to this page, follow the [best practices for linking to a customizable doc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#When-you-link-to-a-top-level-header,-do-not-include-the-filter-params-in-the-URL).

<!-- ============================================== -->
<!-- GLOBAL LINK REFERENCES -->
<!-- ============================================== -->

<!-- RUM -->
[1-rum]: https://app.datadoghq.com/rum/list
[2-rum]: https://www.npmjs.com/package/@datadog/browser-rum
[3-rum]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[4-rum]: /real_user_monitoring/guide/sampling-browser-plans/
[5-rum]: /real_user_monitoring/application_monitoring/browser
[6-rum]: /integrations/content_security_policy_logs/
[8-rum]: /real_user_monitoring/application_monitoring/browser/data_collected/
[9-rum]: /real_user_monitoring/platform/dashboards/
[10-rum]: https://app.datadoghq.com/rum/sessions

<!-- Error Tracking -->
[1-et]: /error_tracking/
[2-et]: /real_user_monitoring/application_monitoring/browser/data_collected/?tab=error#source-errors
[3-et]: /error_tracking/frontend/collecting_browser_errors/
[4-et]: /error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[5-et]: https://www.npmjs.com/package/@datadog/browser-rum
[6-et]: https://app.datadoghq.com/error-tracking/settings/setup/client
[7-et]: /real_user_monitoring/application_monitoring/browser/data_collected/
[8-et]: /real_user_monitoring/platform/dashboards/errors/
[9-et]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[10-et]: /session_replay/browser/privacy_options#mask-action-names
[11-et]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
[12-et]: https://github.com
[13-et]: https://about.gitlab.com
[14-et]: https://bitbucket.org/product
[15-et]: /integrations/guide/source-code-integration/
[16-et]: /error_tracking/explorer
[17-et]: https://app.datadoghq.com/source-code/setup/rum
[18-et]: /getting_started/tagging/unified_service_tagging/
[19-et]: /getting_started/tagging/

<!-- Product Analytics -->
[1-pa]: /product_analytics/

<!-- Session Replay -->