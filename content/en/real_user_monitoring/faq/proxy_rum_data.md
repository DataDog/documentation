---
title: Proxy Real User Monitoring Data
kind: faq
---

The Real User Monitoring (RUM) SDK can be configured to send requests through a proxy. Requests made still need to be forwarded to Datadog.

## SDK initialization

When you set the `proxyHost` [initialization parameter][1], all RUM data is sent to the specified host (ex: www.proxy.com).

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    datacenter: Datacenter.US,
    proxyHost: '<YOUR_PROXY_HOST>',
});
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxyHost: '<YOUR_PROXY_HOST>',
    });
```

{{% /tab %}}
{{< /tabs >}}

## Proxy setup

When your proxy receives data from the RUM SDK, it must be forwarded to Datadog. The RUM SDK adds the `ddhost` query parameter to all requests to your proxy. This query parameter contains the host where all data must be forwarded to.

To successfully proxy request to Datadog:

1. Add a `X-Forwarded-For` header containing the request client IP address, for accurate geoIP.
2. Replace the host in the incoming requests by the host contained in the `ddhost` query parameter.
3. Remove the `ddhost` query parameter.

**Note:** The request body must remain unchanged.

[1]: /real_user_monitoring/browser/#initialization-parameters
