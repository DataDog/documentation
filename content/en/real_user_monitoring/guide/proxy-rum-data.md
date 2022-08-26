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

When you set the `proxyUrl` [initialization parameter][1], all RUM data is sent to the specified URL using the POST method (for example, `https://www.proxy.com/foo`).

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    proxyUrl: '<YOUR_PROXY_URL>',
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
        proxyUrl: '<YOUR_PROXY_URL>',
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
        proxyUrl: '<YOUR_PROXY_URL>',
    });
```

{{% /tab %}}
{{< /tabs >}}

## Proxy setup

When your proxy receives data from the RUM Browser SDK, it must be forwarded to Datadog. The RUM Browser SDK adds the `ddforward` query parameter to all POST requests to your proxy. This query parameter contains the URL where all data must be forwarded to.

To successfully proxy request to Datadog:

1. Add a `X-Forwarded-For` header containing the request client IP address for accurate geoIP.
2. Forward the request to the URL set in the `ddforward` query parameter using the POST method.
4. The request body must remain unchanged.

Ensure the `ddforward` attribute points to a valid Datadog endpoint for your [Datadog site][2]. Failure to do so may result in an insecure configuration. 

The site parameter is an SDK [initialization parameter][3]. Valid intake URL patterns for each site are listed below:

{{< tabs >}}
{{% tab "Latest version" %}}

| Site    | Valid intake URL Pattern                       | Site Parameter      |
|---------|------------------------------------------------|---------------------|
| US1     | `https://*.browser-intake-datadoghq.com/*`     | `datadoghq.com`     |
| US3     | `https://*.browser-intake-us3-datadoghq.com/*` | `us3.datadoghq.com` |
| US5     | `https://*.browser-intake-us5-datadoghq.com/*` | `us5.datadoghq.com` |
| EU1     | `https://*.browser-intake-datadoghq.eu/*`      | `datadoghq.eu`      |
| US1-FED | `https://*.browser-intake-ddog-gov.com/*`      | `ddog-gov.com`      |

{{% /tab %}}
{{% tab "Before `v4`" %}}

| Site    | Valid intake URL Pattern             | Site Parameter      |
|---------|--------------------------------------|---------------------|
| US1     | `https://*.logs.datadoghq.com/*`     | `datadoghq.com`     |
| US3     | `https://*.logs.us3-datadoghq.com/*` | `us3.datadoghq.com` |
| EU1     | `https://*.logs.datadoghq.eu/*`      | `datadoghq.eu`      |
| US1-FED | `https://*.logs.ddog-gov.com/*`      | `ddog-gov.com`      |

{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#initialization-parameters
[2]: /getting_started/site/
[3]: /real_user_monitoring/browser/#initialization-parameters
