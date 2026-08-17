### Automated resource collection

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

### Manual resource collection

To track a custom resource around its load, start and stop it:

```javascript
DdRum.startResource('<RESOURCE_KEY>', 'GET', url, {}, Date.now());
// ... perform the request ...
DdRum.stopResource('<RESOURCE_KEY>', 200, 'xhr', undefined, {}, Date.now());
```

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
