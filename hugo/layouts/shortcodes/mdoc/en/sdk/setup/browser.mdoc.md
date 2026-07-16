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

{% step title="Create the application" %}
Creating a RUM application generates the `clientToken` and `applicationId` the SDK needs. Before you create an application, check whether one already exists for the browser application you want to monitor. Reuse its configuration to avoid duplicate applications.

Create or find the application in the Datadog UI, or from the terminal. The terminal workflow is useful for AI coding agents and CI.

{% tabs %}
{% tab label="Datadog UI" %}
1. In Datadog, navigate to [**Digital Experience** > **Applications**][5].
2. Reuse an existing JavaScript (JS) application that represents the browser application you want to monitor. If no matching application exists, click **New Application**, select **JS**, enter a name, and click **Create Application**.
3. On the application's **SDK Configuration** page, copy its `clientToken` and `applicationId`.
{% /tab %}
{% tab label="Terminal (API)" %}
If you prefer the terminal, or your tooling cannot manage RUM applications, use the API. You need a Datadog [API key and application key][16]. The application key must have the `rum_apps_read` permission to inspect and reuse applications, and the `rum_apps_write` permission to create one. Store these privileged keys in terminal environment variables. Do not add them to frontend code or client-side environment files.

Your site's API base URL is {% region-param key="dd_api" /%}. Copy that value into `DD_API_BASE_URL`, then list existing applications before creating one:

```shell
export DD_API_BASE_URL="<DATADOG_API_BASE_URL>"

curl -sS "${DD_API_BASE_URL}/api/v2/rum/applications" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

If the response contains the browser application you want to monitor, copy its `application_id` and retrieve its configuration:

```shell
export DD_RUM_APPLICATION_ID="<APPLICATION_ID>"

curl -sS "${DD_API_BASE_URL}/api/v2/rum/applications/${DD_RUM_APPLICATION_ID}" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

Reuse `data.attributes.application_id` and `data.attributes.client_token` from the response. If no matching application exists, create one:

```shell
curl -sS -X POST "${DD_API_BASE_URL}/api/v2/rum/applications" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"data": {"type": "rum_application_create", "attributes": {"name": "my-web-app", "type": "browser"}}}'
```

The response includes `data.attributes.application_id` and `data.attributes.client_token`. See the [RUM application creation endpoint][17].
{% /tab %}
{% /tabs %}
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

For single-page applications (SPAs), the Browser SDK automatically tracks URL changes that use the History API and creates a view for each route change. The React integration is not required for basic SPA route tracking. Use React-specific integration when you need capabilities such as route-pattern view names or Error Boundaries.

If your application already initializes RUM, reuse the existing `init` call and application instead of adding a second one.

#### Configure tracking consent (GDPR compliance)

To be compliant with GDPR, CCPA, and similar regulations, the Browser SDK lets you provide the [tracking consent value at initialization][8].

#### Configure Content Security Policy (CSP)

If you're using the Datadog Content Security Policy (CSP) integration on your site, see [the CSP documentation][9] for additional setup steps.
{% /step %}

{% /stepper %}

{% /collapse-content %}

{% collapse-content title="Option 2: Agentic Onboarding" level="h3" %}

Use the [Agentic Onboarding][10] page to instrument your browser application using the AI Setup CLI or the Datadog MCP Server.

If the automated setup cannot manage RUM applications for your organization, follow the UI or API steps in [Create the application][19] and pass the resulting `applicationId`, `clientToken`, and site to your app. Keep the API and application keys out of client-side code.

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

Run the application and load the routes you want to monitor. Then confirm that a fresh view appears in the [RUM Explorer][20]. A `202` response from the RUM intake confirms that Datadog accepted the request, but it does not confirm that the event is visible in the Explorer. Indexing can take several seconds.

After data appears, visualize the [data collected][11] in [dashboards][12] or create additional search queries in the RUM Explorer.

Your application appears as pending on the Applications page until Datadog starts receiving data. If a fresh view does not appear after a short delay, verify the `applicationId`, `clientToken`, Datadog site, and sampling configuration. Also check Content Security Policy rules, browser blockers, and requests to the RUM intake. For more information, see [Troubleshooting Browser SDK Issues][15].

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
[16]: /account_management/api-app-keys/
[17]: /api/latest/rum/#create-a-new-rum-application
[19]: #create-the-application
[20]: https://app.datadoghq.com/rum/sessions
