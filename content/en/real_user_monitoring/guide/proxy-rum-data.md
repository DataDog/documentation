---
title: Proxy Your Browser RUM Data
kind: guide
aliases:
  - /real_user_monitoring/faq/proxy_rum_data/
further_reading:
  - link: '/real_user_monitoring/'
    tag: 'Documentation'
    text: 'Learn about Real User Monitoring'
---

## Overview

The RUM Browser SDK can be configured to send requests through a proxy. When you set the SDK's `proxy` [initialization parameter][1] to a URL such as `https://www.example-proxy.com/any-endpoint`, all RUM data is sent to that URL using the POST method. The RUM data still needs to be forwarded to Datadog from the proxy.

## Prerequisite proxy setup

To successfully forward a request to Datadog, your proxy must

1. [Build the Datadog intake URL](#build-the-datadog-intake-url).
2. Add an `X-Forwarded-For` header containing the request client IP address for accurate geoIP.
3. Forward the request to the Datadog intake URL using the POST method.
4. Leave the request body unchanged.

<div class="alert alert-warning">
<ul>
<li>For security reasons, remove any HTTP headers that potentially contain sensitive information, such as the <code>cookie</code> header.</li>
<li>The request body can contain binary data and should not be converted to a string. Make sure your proxy implementation forwards the raw body without conversion.</li>
<li>Make sure your proxy implementation does not allow a malicious actor to send requests to a different server (ex: https://browser-intake-datadoghq.com.malicious.com).</li>  
</ul>
</div>

### Build the Datadog intake URL

A Datadog intake URL (example: `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&...`) has three parts:

- the Datadog intake origin corresponding to your `site` [initialization parameter][1] (example: `https://browser-intake-datadoghq.eu`)
- the path containing the API version and the product (example: `/api/v2/rum` for RUM data or `/api/v2/replay` for Session Replay data)
- the parameters (example: `ddsource=browser&...`)

The Datadog intake origin corresponding to your `site` parameter should be defined in your proxy implementation. The path and parameters for each request sent to the proxy can be accessed in the request's `ddforward` parameter (for example, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).

The Datadog intake origins for each site are listed below:

| Site    | Site Parameter            | Datadog intake origin                      |
|---------|---------------------------|--------------------------------------------|
| US1     | `datadoghq.com` (default) | `https://browser-intake-datadoghq.com`     |
| US3     | `us3.datadoghq.com`       | `https://browser-intake-us3-datadoghq.com` |
| US5     | `us5.datadoghq.com`       | `https://browser-intake-us5-datadoghq.com` |
| EU1     | `datadoghq.eu`            | `https://browser-intake-datadoghq.eu`      |
| US1-FED | `ddog-gov.com`            | `https://browser-intake-ddog-gov.com`      |
| AP1     | `ap1.datadoghq.com`       | `https://browser-intake-ap1-datadoghq.com` |

## Recommended SDK setup

Configure the URL of the proxy in the `proxy` initialization parameter. The RUM Browser SDK adds a `ddforward` query parameter to all requests to your proxy. This query parameter contains the URL path and parameters that all data must be forwarded to.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    proxy: '<YOUR_PROXY_URL>',
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>',
    });
});
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>'
    });
```

{{% /tab %}}
{{< /tabs >}}

For example, with a `site` set to `datadoghq.eu` and a `proxy` set to `https://example.org/datadog-intake-proxy`, the RUM Browser SDK sends requests to a URL like this: `https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`. The proxy forwards the request to `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`.

## Alternate SDK setup

From Browser SDK v5.4.0, the `proxy` initialization parameter supports a function input. This function allows you to have more control on how the path and parameters are added to the proxy URL.

This function receives an object with the following properties:

- `path`: the path for the Datadog requests (example: `/api/v2/rum`)
- `parameters`: the parameters of the Datadog requests (example: `ddsource=browser&...`)

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`
    });
```

{{% /tab %}}
{{< /tabs >}}

For example, with a `site` set to `datadoghq.eu` and the `proxy` configuration from the example, the RUM Browser SDK sends requests to an URL that looks this: `https://www.proxy.com/foo/api/v2/rum/bar?ddsource=browser`. The proxy will need to forward the request to the URL `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`.

**Note:**
- Some privacy blockers already target the intake [URL patterns][2], so you may want to take that into account when building your proxy URL.
- The `proxy` function is called for each request, so it should avoid any heavy computation.

## Legacy SDK setup (<4.34.0)

Before Browser SDK v4.34.0, the `proxyUrl` initialization parameter was used, and the Datadog intake origin was included in the `ddforward` attribute. The proxy implementation was in charge of validating this host, and failure to do so resulted in various vulnerabilities.

The Datadog intake origin needs to be defined in your proxy implementation to ensure security. <strong>If you are still using a proxy with an older version of the Browser SDK, upgrade to a newer version of the Browser SDK to avoid vulnerabilities.</strong>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/#initialization-parameters
[2]: https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840


