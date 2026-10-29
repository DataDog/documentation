### Setup

**Note**: Configuring RUM and Traces makes use of APM paid data in RUM, which may impact your APM billing.

1. Set up [RUM React Native Monitoring][1].

2. In `rumConfiguration`, set `firstPartyHosts` to define the list of internal, first-party origins called by your React Native application. Each entry sets the host to match and the tracing header types to inject:
    ```javascript
    const config = new DatadogProviderConfiguration(
        '<CLIENT_TOKEN>',
        '<ENVIRONMENT_NAME>',
        TrackingConsent.GRANTED,
        {
            rumConfiguration: {
                applicationId: '<APPLICATION_ID>',
                firstPartyHosts: [
                    { match: 'example.com', propagatorTypes: [PropagatorType.DATADOG] },
                    { match: 'api.yourdomain.com', propagatorTypes: [PropagatorType.DATADOG] }
                ]
            }
        }
    );
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

3. _(Optional)_ In `rumConfiguration`, set `resourceTraceSampleRate` to keep a defined percentage of the backend traces. If not set, 100% of the traces coming from application requests are sent to Datadog.

     To keep 20% of backend traces:
    ```javascript
    rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
        firstPartyHosts: [/* ... */],
        resourceTraceSampleRate: 20
    }
    ```

    **Note**: `resourceTraceSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

### Verifying setup

1. Run your application from Xcode (iOS) or Android Studio (Android).
2. Go to a screen in your application.
3. Open Xcode's [Network Connections and HTTP Traffic instrument][2] or Android Studio's [Network Inspector][3].
4. Check the request headers for a RUM resource and verify that the [required headers are set by the SDK](#how-rum-resources-are-linked-to-traces).

### OpenTelemetry support

1. Set up RUM to [connect with APM](#setup).

2. Configure the RUM SDK with the list of internal, first-party origins and the tracing header type to use as follows:
    ```javascript
    rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
        firstPartyHosts: [{
            match: 'example.com',
            propagatorTypes: [
                PropagatorType.TRACECONTEXT,
                PropagatorType.DATADOG
            ]
        }]
    }
    ```

    `PropagatorType` is an enum representing the following tracing header types:
      - `PropagatorType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

[1]: /real_user_monitoring/setup/install/?platform=react_native
[2]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[3]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
