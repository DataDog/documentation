---
title: Proxy Real User Monitoring Data
kind: faq
---

The Real User Monitoring (RUM) SDK can be configured to send requests through a proxy. Requests made still need to be forwarded to Datadog.

## SDK initialization

When you set the `proxyUrl` [initialization parameter][1], all RUM data is sent to the specified URL using POST method (for example, www.proxy.com/foo).

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
})(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum.js','DD_RUM')
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

When your proxy receives data from the RUM SDK, it must be forwarded to Datadog. The RUM SDK adds the `ddforward` query parameter to all POST requests to your proxy. This query parameter contains the URL where all data must be forwarded to.

To successfully proxy request to Datadog:

1. Add a `X-Forwarded-For` header containing the request client IP address, for accurate geoIP.
2. Forward the request to the URL set in the `ddforward` query parameter using POST method.

**Note:** The request body must remain unchanged.

[1]: /real_user_monitoring/browser/#initialization-parameters
