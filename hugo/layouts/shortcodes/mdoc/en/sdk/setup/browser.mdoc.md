<!--
This partial contains setup instructions for the Browser SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your web applications with the Datadog Browser SDK. The Browser SDK supports [Real User Monitoring (RUM)][1], [Error Tracking][2], [Session Replay][3], and [Product Analytics][4].

The Browser SDK supports all modern desktop and mobile browsers.

## Setup

{% collapse-content title="Option 1: Manual client-side setup" level="h3" %}

Add the SDK directly to your frontend code when you need full control over initialization and configuration.

{% stepper level="h4" %}

{% step title="Add the dependencies" %}
Choose the installation method for the Browser SDK.

{% tabs %}
{% tab label="NPM" %}

Installing through Node Package Manager (npm) registry is recommended for modern web applications. The Browser SDK is packaged with the rest of your frontend JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

Add [`@datadog/browser-rum`][5] to your `package.json` file, for example if you use npm cli:

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
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v7/datadog-rum.js','DD_RUM')
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
    src="https://www.datadoghq-browser-agent.com/eu1/v7/datadog-rum.js"
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

{% step title="Initialize the SDK" %}
The SDK should be initialized as early as possible in the app lifecycle. This ensures all measurements are captured correctly.

In the initialization snippet, set an environment name, service name, and client token. See the full list of [initialization parameters][6].

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
   remoteConfiguration: {
     id: '<REMOTE_CONFIGURATION_ID>',
   },
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
      remoteConfiguration: {
        id: '<REMOTE_CONFIGURATION_ID>',
      },
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
      remoteConfiguration: {
        id: '<REMOTE_CONFIGURATION_ID>',
      },
    });
</script>
```

{% /tab %}
{% /tabs %}

The `remoteConfiguration.id` parameter is optional. It lets you manage the SDK configuration from Datadog without redeploying your application. For details, see [Remote Configuration][12].

You can adjust the session sample rate with the `sessionSampleRate` parameter, but Datadog recommends using [retention filters][13] to control retained volume. For details, see [Manage Sessions][14].

#### Configure Content Security Policy (CSP)

If you're using the Datadog Content Security Policy (CSP) integration on your site, see [the CSP documentation][8] for additional setup steps.
{% /step %}

{% step title="Configure tracking consent (GDPR compliance)" %}
To be compliant with GDPR, CCPA, and similar regulations, the RUM Browser SDK lets you provide the tracking consent value at initialization. For more information, see [Data Security][7].

The `trackingConsent` initialization parameter can be one of the following values:

1. `"granted"` (default): The RUM Browser SDK starts collecting data and sends it to Datadog.
2. `"not-granted"`: The RUM Browser SDK does not collect any data.

To change the tracking consent value after the RUM Browser SDK is initialized, use the `setTrackingConsent()` API call. The RUM Browser SDK changes its behavior according to the new value:

- When changed from `"granted"` to `"not-granted"`, the RUM session is stopped, and data is no longer sent to Datadog.
- When changed from `"not-granted"` to `"granted"`, a new RUM session is created if no previous session is active, and data collection resumes.

This state is not synchronized between tabs nor persisted between navigation. It is your responsibility to provide the user decision during RUM Browser SDK initialization or by using `setTrackingConsent()`.

When `setTrackingConsent()` is used before `init()`, the provided value takes precedence over the initialization parameter.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogRum.setTrackingConsent('granted');
});
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.setTrackingConsent('granted');
    });
});
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```

{% /tab %}
{% /tabs %}
{% /step %}

{% step title="Enable RUM to start sending data" %}
After you initialize the SDK, RUM starts collecting data. To choose what RUM tracks in your application, continue to [Enable the Datadog RUM Module][15].
{% /step %}

{% /stepper %}

{% /collapse-content %}

{% collapse-content title="Option 2: Agentic Onboarding" level="h3" %}

Use an AI-assisted workflow to automatically configure and deploy the SDK with minimal manual steps.

Use the [Agentic Onboarding][9] page to instrument your browser application using the AI Setup CLI or the Datadog MCP Server.

{% /collapse-content %}

{% collapse-content title="Option 3: Server-side auto-instrumentation (RUM only)" level="h3" %}

Inject the SDK through your web server or proxy when you cannot modify frontend code directly.

{% site-region region="gov,gov2" %}
{% alert level="danger" %}
RUM Auto-Instrumentation is not available for the selected site ({% region-param key="dd_site_name" /%}). Use [Client-Side instrumentation][10] instead.
{% /alert %}
{% /site-region %}

{% alert level="info" %}
Server-side auto-instrumentation only supports RUM. For Error Tracking, Session Replay, or Product Analytics, use [manual client-side setup][10].
{% /alert %}

RUM Auto-Instrumentation allows you to add RUM JS to your web app HTML. It works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. After auto-instrumentation is set up, you can manage configurations from the UI.

RUM Auto-Instrumentation requires Datadog Agent version 7.34+.

#### Getting started

Select a platform to start collecting RUM data on your application:

{% alert level="info" %}
To request support for a web server that is not listed here, [fill out this form][11].
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

[1]: /real_user_monitoring/
[2]: /error_tracking/frontend/browser
[3]: /session_replay/browser/
[4]: /product_analytics/
[5]: https://www.npmjs.com/package/@datadog/browser-rum
[6]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[7]: /data_security/real_user_monitoring/#browser-rum-use-of-cookies
[8]: /integrations/content_security_policy_logs/
[9]: /agentic_onboarding/setup/
[10]: /real_user_monitoring/setup/install/?platform=browser
[11]: /private-beta/rum-sdk-auto-injection/
[12]: /real_user_monitoring/remote_configuration/
[13]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
[14]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=browser
[15]: /real_user_monitoring/setup/enable_rum/?platform=browser
