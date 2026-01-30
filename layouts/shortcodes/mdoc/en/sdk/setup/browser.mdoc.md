<!--
This partial contains setup instructions for the Browser SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your web applications with the Datadog Browser SDK. The Browser SDK supports [Real User Monitoring (RUM)][7], [Error Tracking][11], Session Replay, and Product Analytics.

The Browser SDK supports all modern desktop and mobile browsers.

## Setup

**Choose your setup method:**

- **[Server-side auto-instrumentation][12]** (RUM only): Automatically inject the RUM SDK into HTML responses through your web server or proxy.
- **[Agentic Onboarding][13]** (RUM only): Use AI coding agents (Cursor, Claude Code) to automatically instrument your application with one prompt.
- **Manual client-side setup** (below): Manually add the SDK to your application code.

### Step 1 - Create the application in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1] and select the JavaScript (JS) application type.
2. Enter a name for your application, then click **Create Application**. This generates a `clientToken` and an `applicationId` for your application.

### Step 2 - Install the Browser SDK

Choose the installation method for the Browser SDK.

{% tabs %}
{% tab label="NPM" %}

Installing through Node Package Manager (npm) registry is recommended for modern web applications. The Browser SDK is packaged with the rest of your frontend JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

Add [`@datadog/browser-rum`][2] to your `package.json` file, for example if you use npm cli:

```shell
npm install --save @datadog/browser-rum
```

[2]: https://www.npmjs.com/package/@datadog/browser-rum

{% /tab %}
{% tab label="CDN async" %}

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
</script>
```

{% /site-region %}

{% /tab %}
{% tab label="CDN sync" %}

Installing through CDN sync is recommended for collecting all events. The Browser SDK loads from Datadog's CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

Add the generated code snippet to the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Placing the script tag higher and loading it synchronously ensures Datadog RUM can collect all performance data and errors.

{% site-region region="us" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{% /site-region %}
{% site-region region="eu" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{% /site-region %}
{% site-region region="ap1" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{% /site-region %}
{% site-region region="ap2" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{% /site-region %}
{% site-region region="us3" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{% /site-region %}
{% site-region region="us5" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{% /site-region %}
{% site-region region="gov" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum-v6.js"
    type="text/javascript">
</script>
```

{% /site-region %}

{% /tab %}
{% /tabs %}

### Step 3 - Initialize the Browser SDK

The SDK should be initialized as early as possible in the app lifecycle. This ensures all measurements are captured correctly.

In the initialization snippet, set an environment name, service name, and client token. See the full list of [initialization parameters][3].

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   applicationId: '<APP_ID>',
   clientToken: '<CLIENT_TOKEN>',
   // `site` refers to the Datadog site parameter of your organization
   // see https://docs.datadoghq.com/getting_started/site/
   site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
});

```

{% alert level="info" %}
Types are compatible with TypeScript >= 3.8.2. For earlier versions of TypeScript, import JavaScript sources and use global variables to avoid any compilation issues.
{% /alert %}

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  ...
})
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
<script>
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
    });
  })
</script>
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
<script>
    window.DD_RUM && window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',

    });
</script>
```

{% /tab %}
{% /tabs %}

#### Configure tracking consent (GDPR compliance)

To be compliant with GDPR, CCPA, and similar regulations, the Browser SDK lets you provide the [tracking consent value at initialization][5].

#### Configure Content Security Policy (CSP)

If you're using the Datadog Content Security Policy (CSP) integration on your site, see [the CSP documentation][6] for additional setup steps.

[1]: https://app.datadoghq.com/rum/list
[2]: https://www.npmjs.com/package/@datadog/browser-rum
[3]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[5]: /real_user_monitoring/application_monitoring/browser
[6]: /integrations/content_security_policy_logs/
[7]: /real_user_monitoring/application_monitoring/browser/setup/client
[11]: /error_tracking/frontend/browser
[12]: /real_user_monitoring/application_monitoring/browser/setup/server
[13]: /real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring
[14]: /session_replay/browser/
[15]: /product_analytics/

