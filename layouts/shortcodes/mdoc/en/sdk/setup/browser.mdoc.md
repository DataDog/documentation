<!--
This partial contains setup instructions for the Browser SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your web applications with the Datadog Browser SDK. The Browser SDK supports [Real User Monitoring (RUM)][7], [Error Tracking][11], [Session Replay][14], and [Product Analytics][15].

Select a setup method based on your application stack and workflow:

- **Manual client-side setup**: Add the SDK directly to your frontend code when you need full control over initialization and configuration.
- **Agentic Onboarding**: Use an AI-assisted workflow to automatically configure and deploy the SDK with minimal manual steps.
- **Server-side auto-instrumentation (RUM only)**: Inject the SDK through your web server or proxy when you can't modify frontend code directly.

The Browser SDK supports all modern desktop and mobile browsers.

## Setup

### Option 1: Manual client-side setup

{% stepper level="h4" %}

{% step title="Create the application in the UI" %}
1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1] and select the JavaScript (JS) application type.
2. Enter a name for your application, then click **Create Application**. This generates a `clientToken` and an `applicationId` for your application.
{% /step %}

{% step title="Install the Browser SDK" %}
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
    d=o.createElement(u);d.async=1;d.src=n,d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js','DD_RUM')
</script>
```

{% /site-region %}
{% site-region region="eu" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n,d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu/v7/datadog-rum.js','DD_RUM')
</script>
```

{% /site-region %}
{% site-region region="ap1" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n,d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v7/datadog-rum.js','DD_RUM')
</script>
```

{% /site-region %}
{% site-region region="ap2" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n,d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v7/datadog-rum.js','DD_RUM')
</script>
```

{% /site-region %}
{% site-region region="us3" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n,d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v7/datadog-rum.js','DD_RUM')
</script>
```

{% /site-region %}
{% site-region region="us5" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n,d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v7/datadog-rum.js','DD_RUM')
</script>
```

{% /site-region %}
{% site-region region="gov,gov2" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n,d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v7.js','DD_RUM')
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
    src="https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
</script>
```

{% /site-region %}
{% site-region region="eu" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
</script>
```

{% /site-region %}
{% site-region region="ap1" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
</script>
```

{% /site-region %}
{% site-region region="ap2" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
</script>
```

{% /site-region %}
{% site-region region="us3" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
</script>
```

{% /site-region %}
{% site-region region="us5" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
</script>
```

{% /site-region %}
{% site-region region="gov,gov2" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum-v7.js"
    type="text/javascript">
</script>
```

{% /site-region %}

{% /tab %}
{% /tabs %}
{% /step %}

{% step title="Initialize the Browser SDK" %}
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
{% /step %}

{% /stepper %}

### Option 2: Agentic Onboarding

Use the [Agentic Onboarding][16] page to instrument your browser application using the AI Setup CLI or the Datadog MCP Server.

### Option 3: Server-side auto-instrumentation

{% site-region region="gov,gov2" %}
{% alert level="danger" %}
RUM Auto-Instrumentation is not available for the selected site ({% region-param key="dd_site_name" /%}). Use [Client-Side instrumentation](/real_user_monitoring/application_monitoring/browser/setup/client) instead.
{% /alert %}
{% /site-region %}

{% alert level="info" %}
Server-side auto-instrumentation only supports RUM. For Error Tracking, Session Replay, or Product Analytics, use Option 1 (manual client-side setup).
{% /alert %}

RUM Auto-Instrumentation allows you to add RUM JS to your web app HTML. It works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. After auto-instrumentation is set up, you can manage configurations from the UI.

RUM Auto-Instrumentation requires Datadog Agent version 7.34+.

#### Getting started

Select a platform to start collecting RUM data on your application:

{% alert level="info" %}
To request support for a web server that is not listed here, [fill out this form](https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/).
{% /alert %}

{% card-grid card_width=130 %}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/java" src="integrations_logos/java_servlet_large.svg" alt="Java Servlet" tooltip="Java Servlet" /%}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/nginx" src="integrations_logos/nginx_large.svg" alt="NGINX" tooltip="NGINX" /%}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/windows_iis" src="integrations_logos/windows_iis_large.svg" alt="Windows IIS" tooltip="Windows IIS" /%}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/apache" src="integrations_logos/apache_large.svg" alt="Apache HTTP Server" tooltip="Apache HTTP Server" /%}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/ibm" src="integrations_logos/ibm_http_large.svg" alt="IBM HTTP Server" tooltip="IBM HTTP Server" /%}
{% /card-grid %}

{% partial file="rum-browser-auto-instrumentation-limitations.mdoc.md" /%}

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
[16]: /agentic_onboarding/setup/

