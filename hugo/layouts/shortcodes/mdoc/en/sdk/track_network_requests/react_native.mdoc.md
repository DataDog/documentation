## Automated resource collection

To automatically track network requests as RUM resources, set `trackResources` to `true` in your RUM configuration:

```javascript
rumConfiguration: {
    applicationId: '<DATADOG_APPLICATION_ID>',
    trackResources: true,
    firstPartyHosts: [
        { match: 'example.com', propagatorTypes: [PropagatorType.DATADOG, PropagatorType.TRACECONTEXT] }
    ]
}
```

This automatically tracks [XMLHttpRequest][1] and Fetch requests as resources. Use `firstPartyHosts` to enable distributed tracing for requests made to those hosts.

## Manual resource collection

To track a custom resource, start it before it loads and stop it after:

```javascript
DdRum.startResource('<RESOURCE_KEY>', 'GET', url, {}, Date.now());
// ... perform the request ...
DdRum.stopResource('<RESOURCE_KEY>', 200, 'xhr', undefined, {}, Date.now());
```

## Resource timings

Resource tracking provides the following timings:

-   `First Byte`: The time between the scheduled request and the first byte of the response. This includes time for the request preparation on the native level, network latency, and the time it took the server to prepare the response.
-   `Download`: The time it took to receive a response.

For the attributes collected for resources, see [Data Collected][2].

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /real_user_monitoring/setup/data_collected/?platform=react_native
