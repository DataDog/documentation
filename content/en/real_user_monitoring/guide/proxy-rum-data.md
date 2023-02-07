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

## SDK initialization

When you set the `proxy` [initialization parameter][1], all RUM data is sent to the specified URL using the POST method (for example, `https://www.proxy.com/foo`).

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
```html
<script>
 (function(h,o,u,n,d) {
   h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
   d=o.createElement(u);d.async=1;d.src=n
   n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
})(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>',
    })
  })
</script>
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

## Proxy setup

When your proxy receives data from the RUM Browser SDK, it must be forwarded to Datadog. The RUM Browser SDK adds the `ddforward` query parameter to all POST requests to your proxy. This query parameter contains the URL path and parameters where all data must be forwarded to.

To successfully proxy request to Datadog:

1. Build the final Datadog intake URL by using:
    - the Datadog intake origin corresponding to your site. See table below.
    - the path and parameters provided by `ddforward`.
2. Add a `X-Forwarded-For` header containing the request client IP address for accurate geoIP.
3. Forward the request to the Datadog intake URL using the POST method.
4. Leave the request body unchanged.

The Site Parameter is an SDK [initialization parameter][1]. Datadog intake origins for each site are listed below:

| Site    | Site Parameter            | Datadog intake origin                      |
| ------- | ------------------------- | ------------------------------------------ |
| US1     | `datadoghq.com` (default) | `https://browser-intake-datadoghq.com`     |
| US3     | `us3.datadoghq.com`       | `https://browser-intake-us3-datadoghq.com` |
| US5     | `us5.datadoghq.com`       | `https://browser-intake-us5-datadoghq.com` |
| EU1     | `datadoghq.eu`            | `https://browser-intake-datadoghq.eu`      |
| US1-FED | `ddog-gov.com`            | `https://browser-intake-ddog-gov.com`      |

The Datadog intake origin corresponding to your Site Parameter should be defined in your proxy implementation.

## Legacy proxy setups

Before Browser SDK v4.TODO, the `proxyUrl` initialization parameter was used and the Datadog intake origin was included in the <code>ddforward</code> attribute. The proxy implementation was in charge of validating this host and failure to do so resulted in various vulnerabilities.

The Datadog intake origin now needs to be defined in your proxy implementation to ensure security.

<strong>If you are still using a proxy with an older version of the Browser SDK, please consider upgrading to a newer version of the Browser SDK.</strong>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#initialization-parameters
