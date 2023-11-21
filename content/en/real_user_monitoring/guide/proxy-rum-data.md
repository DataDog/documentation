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

The RUM Browser SDK can be configured to send requests through a proxy. Requests made still need to be forwarded to Datadog.
When you set the `proxy` [initialization parameter][1], all RUM data is sent to the specified URL using the POST method (for example, `https://www.proxy.com/foo`).

## Prerequisites

A Datadog request URL (ex: `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&...`) is composed of three parts:
- The Datadog intake origin corresponding to your `site` [initialization parameter][1] (ex: `https://browser-intake-datadoghq.eu`)
- The path containing the API version and the product (ex: `/api/v2/rum`)
- The parameters (ex: `ddsource=browser&...`)

The Datadog intake origin corresponding to your site parameter should be defined in your proxy implementation. The path and parameters should be appended to the requests sent to the proxy.
Datadog intake origins for each site are listed below:

| Site    | Site Parameter            | Datadog intake origin                      |
|---------|---------------------------|--------------------------------------------|
| US1     | `datadoghq.com` (default) | `https://browser-intake-datadoghq.com`     |
| US3     | `us3.datadoghq.com`       | `https://browser-intake-us3-datadoghq.com` |
| US5     | `us5.datadoghq.com`       | `https://browser-intake-us5-datadoghq.com` |
| EU1     | `datadoghq.eu`            | `https://browser-intake-datadoghq.eu`      |
| US1-FED | `ddog-gov.com`            | `https://browser-intake-ddog-gov.com`      |
| AP1     | `ap1.datadoghq.com`       | `https://browser-intake-ap1-datadoghq.com` |

To successfully forward a request to Datadog:

1. Build the final Datadog intake URL by using:
   - the Datadog intake origin corresponding to your site.
   - the path and parameters from the request sent to the proxy.
2. Add a `X-Forwarded-For` header containing the request client IP address for accurate geoIP.
3. Forward the request to the Datadog intake URL using the POST method.
4. Leave the request body unchanged.

<blockquote class="alert alert-info">
The request body can contain binary data and should not be converted to a string. Make sure your proxy implementation forwards the raw body without conversion.
</blockquote>

## Recommended setup

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
        proxy: '<YOUR_PROXY_URL>'
    });
```

{{% /tab %}}
{{< /tabs >}}

For example, with a `site` set to `datadoghq.eu` and a `proxy` set to `https://example.org/datadog-intake-proxy`, the RUM Browser SDK sends requests to an URL that looks this: `https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`. The proxy will need to forward the request to the URL `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`.

## Alternate setup

From Browser SDK v5.4.0, the `proxy` initialization parameter supports a function input. This function allows you to have more control on how the path and parameters are added to the proxy URL.
This function receives an object with the following properties:

- `path`: the path for the datadog requests, ex: `/api/v2/rum`
- `parameters`: the parameters of the datadog requests, ex: `ddsource=browser&...`

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
- Some privacy blockers already target the intake [url patterns][2], so you may want to take that into account when building your proxy URL.
- The `proxy` function is called for each request, so it should avoid any heavy computation.

## Legacy proxy setups

Before Browser SDK v4.34.0, the `proxyUrl` initialization parameter was used and the Datadog intake origin was included in the <code>ddforward</code> attribute. The proxy implementation was in charge of validating this host and failure to do so resulted in various vulnerabilities.

The Datadog intake origin now needs to be defined in your proxy implementation to ensure security.

<strong>If you are still using a proxy with an older version of the Browser SDK, we recommend upgrading to a newer version of the Browser SDK.</strong>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#initialization-parameters
[2]: https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840
