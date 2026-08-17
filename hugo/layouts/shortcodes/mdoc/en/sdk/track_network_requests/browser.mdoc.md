### Automated resource collection

After you enable RUM, the Browser SDK automatically collects [XMLHttpRequest][1] and Fetch requests. It also collects images, CSS files, JavaScript assets, and font files loaded by the page.

To also capture unhandled rejections and requests made before the SDK finishes loading, set `trackEarlyRequests` to `true` in your initialization script (requires Browser SDK v6.21.0+).

To automatically enrich GraphQL requests with operation-specific metadata, configure `allowedGraphQlUrls` during SDK initialization:

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: 'datadoghq.com',
    allowedGraphQlUrls: [
        "https://api.example.com/graphql",
    ]
})
```

For details on resource attributes, network headers, and cross-origin timing, see [Monitoring Resource Performance][2].

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
