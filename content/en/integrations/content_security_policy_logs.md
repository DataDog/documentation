---
categories:
- log collection
- security
description: 'Detect and aggregate CSP violations with Datadog'
doc_link: /integrations/content_security_policy_logs/
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/content_security_policy_logs.md']
has_logo: true
integration_title: Content Security Policy
is_public: true
custom_kind: integration 
name: content_security_policy_logs
public_title: Datadog-Content Security Policy
short_description: 'Detect CSP violations'
version: '1.0'
integration_id: "content_security_policy_logs"
algolia:
  tags:
  - 'csp-report'
  - 'csp'
  - 'report-uri'
  - 'report-to'
  - 'Content-Security-Policy'
  - 'violated-directive'
  - 'blocked-uri'
  - 'script-src'
  - 'worker-src'
  - 'connect-src'
aliases:
  - /real_user_monitoring/faq/content_security_policy
further_reading:
  - link: "/getting_started/tagging/unified_service_tagging/"
    tag: "Documentation"
    text: "Learn about Unified Service Tagging"
---

## Overview

The Datadog Content Security Policy (CSP) integration sends logs to Datadog from web browsers as they interpret your CSP and detect violations. By using the CSP integration, you don't have to host or manage a dedicated endpoint to aggregate your CSP data.

For more information about CSP, see [Content-Security-Policy][1].

## Prerequisites

Before you add a directive to a CSP header, [generate a client token in your Datadog account][2].

<div class="alert alert-info">For security reasons, you must use a client token to collect logs from web browsers. You cannot use Datadog API keys to configure the Datadog Browser Logs SDK as they would be exposed client-side. For more information, see the <a href="https://docs.datadoghq.com/logs/log_collection/?tab=host#setup">client token documentation for more details</a>.</div>

## Prepare a URL for the CSP

You need a URL where browsers can send policy violation reports. The URL must have the following format:

```
https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report
```

Optionally, add the `ddtags` key (service name, the environment, and service version) to the URL to set up [Unified Service Tagging][3]:
- `env`: the application's environment.
- `service`: the service name for your application.
- `version`: the application's version.

When formatting the `ddtags` values, you must:
- Group keys and values with a colon (`:`)
- Concatenate keys and values with a comma (`,`)
- Use URL encoding

For example, given the key-value pairs `{"service": "billingService", "env": "production"}`, the URL-encoded string would look like this:

```
service%3AbillingService%2Cenv%3Aproduction
```

And the final URL with tags would be:

```
https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report&ddtags=service%3AbillingService%2Cenv%3Aproduction
```

## Add the URL to the CSP

You can either embed the URL in an HTTP header (recommended), or embed it in a `<meta>` HTML tag.

### Embed the policy in an HTTP header

Datadog recommends embedding the Content Security Policy in an HTTP header. You can either use the `report-uri` directive or the `report-to` directive. The `report-to` directive will eventually supersede `report-uri`, but is not yet supported by all browsers.

- If you're using the `report-uri` directive:
  ```bash
  Content-Security-Policy: ...; report-uri https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report
  ```

- If you're using the `report-to` directive:
  ```json
  Content-Security-Policy: ...; report-to browser-intake-datadoghq
  Report-To: { "group": "browser-intake-datadoghq",
              "max_age": 10886400,
              "endpoints": [
                  { "url": "https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report" }
              ] }
  ```

### Policy embedded in a `<meta>` HTML tag

You can also embed the URL in a `<meta>` HTML tag.

```html
<meta http-equiv="Content-Security-Policy"
    content="...; report-uri 'https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report'">
```
## Violation reports examples

Each browser interprets the report format differently:

{{< tabs >}}
{{% tab "Firefox" %}}
```json
{
  'csp-report': {
    'blocked-uri': 'https://evil.com/malicious.js',
    'document-uri': 'http://localhost:8000/',
    'original-policy': 'script-src http://good.com; report-uri http://127.0.0.1:8000/csp_reports',
    referrer: '',
    'violated-directive': 'script-src'
  }
}
```
{{% /tab %}}

{{% tab "Chrome" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src-elem',
    'effective-directive': 'script-src-elem',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    disposition: 'enforce',
    'blocked-uri': 'https://evil.com/malicious.js',
    'status-code': 200,
    'script-sample': ''
  }
}
```
{{% /tab %}}

{{% tab "Safari" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src good.com',
    'effective-directive': 'script-src',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    'blocked-uri': 'https://evil.com',
    'status-code': 200
  }
}
```
{{% /tab %}}
{{< /tabs >}}

## Use CSP with Real User Monitoring and Session Replay

If you're using CSP on your websites, add the following URLs to your existing directives depending on your use case.

### Intake URLs

Depending on the `site` option used to initialize [Real User Monitoring][4] or [browser log collection][5], add the appropriate `connect-src` entry:

```txt
connect-src https://{{< region-param key="browser_sdk_endpoint_domain" >}}
```

### Web Worker

If you are using Session Replay or the RUM [`compressIntakeRequests` initialization parameter][4], make sure to allow workers with `blob:` URI schemes by adding the following `worker-src` entry:

```txt
worker-src blob:;
```

Alternatively, starting from [version 4.47.0][8], you can self-host the Datadog Browser SDK Worker JavaScript file and provide the `workerUrl` option to initialize the [RUM Browser SDK][8] by doing one of the following:

* Download it from https://unpkg.com/@datadog/browser-worker, and store it alongside your Web application assets.
* Install the [`@datadog/browser-worker` NPM package][9] and use your build tool to include it in the built assets (see documentation for [Webpack 4][10], [Webpack 5][11], [Vite][12], and [Rollup][13]).

Requirements:

* Make sure the Worker major version matches the Browser SDK version you are using.
* Host the file on the same origin as your web application. Due to [browser restrictions][14], it cannot be hosted on a separate domain (for example, a third-party CDN host) or a different scheme.

### CDN bundle URL

If you are using the CDN async or CDN sync setup for [Real User Monitoring][6] or [browser log collection][7], also add the following `script-src` entry:

```txt
script-src https://www.datadoghq-browser-agent.com
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
[2]: https://app.datadoghq.com/organization-settings/client-tokens
[3]: /getting_started/tagging/unified_service_tagging
[4]: https://docs.datadoghq.com/real_user_monitoring/browser/#initialization-parameters
[5]: /logs/log_collection/javascript/#initialization-parameters
[6]: /real_user_monitoring/browser/#setup
[7]: /logs/log_collection/javascript/#cdn-async
[8]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4470
[9]: https://www.npmjs.com/package/@datadog/browser-worker
[10]: https://v4.webpack.js.org/loaders/file-loader/
[11]: https://webpack.js.org/guides/asset-modules/#url-assets
[12]: https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
[13]: https://github.com/rollup/plugins/tree/master/packages/url/#readme
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker
