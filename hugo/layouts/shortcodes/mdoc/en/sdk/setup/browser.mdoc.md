<!--
This partial contains setup instructions for the Browser SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your web applications with the Datadog Browser SDK. The Browser SDK supports [Real User Monitoring (RUM)][1], [Error Tracking][2], [Session Replay][3], and [Product Analytics][4].

Select a setup method based on your application stack and workflow:

- **Manual client-side setup**: Add the SDK directly to your frontend code when you need full control over initialization and configuration.
- **Agentic Onboarding**: Use an AI-assisted workflow to automatically configure and deploy the SDK with minimal manual steps.
- **Server-side auto-instrumentation (RUM only)**: Inject the SDK through your web server or proxy when you cannot modify frontend code directly.

The Browser SDK supports all modern desktop and mobile browsers.

## Setup

{% collapse-content title="Option 1: Manual client-side setup" level="h3" %}

{% stepper level="h4" %}

{% step title="Create the application in the UI" %}
1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][5] and select the JavaScript (JS) application type.
2. Enter a name for your application, then click **Create Application**. This generates a `clientToken` and an `applicationId` for your application.
{% /step %}

{% step title="Install the Browser SDK" %}
Choose the installation method for the Browser SDK.

{% tabs %}
{% tab label="NPM" %}

Installing through Node Package Manager (npm) registry is recommended for modern web applications. The Browser SDK is packaged with the rest of your frontend JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

Add [`@datadog/browser-rum`][6] to your `package.json` file, for example if you use npm cli:

```shell
npm install --save @datadog/browser-rum
```

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
{% site-region region="uk1" %}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n,d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/uk1/v7/datadog-rum.js','DD_RUM')
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
{% site-region region="uk1" %}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/uk1/v7/datadog-rum.js"
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

In the initialization snippet, set an environment name, service name, and client token. See the full list of [initialization parameters][7].

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

To be compliant with GDPR, CCPA, and similar regulations, the Browser SDK lets you provide the [tracking consent value at initialization][8].

#### Configure Content Security Policy (CSP)

If you're using the Datadog Content Security Policy (CSP) integration on your site, see [the CSP documentation][9] for additional setup steps.
{% /step %}

{% /stepper %}

{% /collapse-content %}

{% collapse-content title="Option 2: Agentic Onboarding" level="h3" %}

Use the [Agentic Onboarding][10] page to instrument your browser application using the AI Setup CLI or the Datadog MCP Server.

{% /collapse-content %}

{% collapse-content title="Option 3: Server-side auto-instrumentation (RUM only)" level="h3" %}

{% site-region region="gov,gov2" %}
{% alert level="danger" %}
RUM Auto-Instrumentation is not available for the selected site ({% region-param key="dd_site_name" /%}). Use [Client-Side instrumentation][14] instead.
{% /alert %}
{% /site-region %}

{% alert level="info" %}
Server-side auto-instrumentation only supports RUM. For Error Tracking, Session Replay, or Product Analytics, use [manual client-side setup][14].
{% /alert %}

RUM Auto-Instrumentation allows you to add RUM JS to your web app HTML. It works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. After auto-instrumentation is set up, you can manage configurations from the UI.

RUM Auto-Instrumentation requires Datadog Agent version 7.34+.

#### Getting started

Select a platform to start collecting RUM data on your application:

{% alert level="info" %}
To request support for a web server that is not listed here, [fill out this form][13].
{% /alert %}

{% card-grid card_width=130 %}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/java" src="integrations_logos/java_servlet_large.svg" alt="Java Servlet" tooltip="Java Servlet" /%}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/nginx" src="integrations_logos/nginx_large.svg" alt="NGINX" tooltip="NGINX" /%}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/windows_iis" src="integrations_logos/windows_iis_large.svg" alt="Windows IIS" tooltip="Windows IIS" /%}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/apache" src="integrations_logos/apache_large.svg" alt="Apache HTTP Server" tooltip="Apache HTTP Server" /%}
{% image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/ibm" src="integrations_logos/ibm_http_large.svg" alt="IBM HTTP Server" tooltip="IBM HTTP Server" /%}
{% /card-grid %}

{% partial file="rum-browser-auto-instrumentation-limitations.mdoc.md" /%}

{% /collapse-content %}

## Start monitoring

Visualize the [data collected][11] in [dashboards][12] or create a search query in the [RUM Explorer][5].

Your application appears as pending on the Applications page until Datadog starts receiving data. If data takes time to appear, see [Troubleshooting Browser SDK Issues][15].

[1]: /real_user_monitoring/
[2]: /error_tracking/frontend/browser
[3]: /session_replay/browser/
[4]: /product_analytics/
[5]: https://app.datadoghq.com/rum/list
[6]: https://www.npmjs.com/package/@datadog/browser-rum
[7]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[8]: /real_user_monitoring/application_monitoring/browser
[9]: /integrations/content_security_policy_logs/
[10]: /agentic_onboarding/setup/
[11]: /real_user_monitoring/application_monitoring/browser/data_collected/
[12]: /real_user_monitoring/platform/dashboards/
[13]: /private-beta/rum-sdk-auto-injection/
[14]: /real_user_monitoring/application_monitoring/browser/setup/client
[15]: /real_user_monitoring/browser/troubleshooting/#data-to-the-datadog-intake

