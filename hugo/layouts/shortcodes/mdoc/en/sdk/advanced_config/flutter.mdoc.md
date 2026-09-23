<!--
This partial contains advanced configuration instructions for the Flutter SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the Datadog Flutter SDK for RUM yet, follow the [in-app setup instructions][1] or see the [RUM Flutter setup documentation][2]. Learn how to set up [OpenTelemetry with RUM Flutter](#opentelemetry-setup). For additional manual instrumentation functions, such as automatic view tracking, see [Flutter Libraries for RUM][3].

## Initialization parameters

You can specify the following parameters in your configuration when initializing the SDK.

`clientToken`
: Required  
**Type**: String  
A client token for RUM or logging/APM. You can obtain this token in Datadog.

`env`
: Required  
**Type**: String  
The environment name sent to Datadog. You can use `env` to filter events by environment (for example, `staging` or `production`).

`site`
: Required  
**Type**: Enum  
The Datadog site that data is sent to. Enum values: `us1`, `us3`, `us5`, `eu1`, `us1Fed`, `ap1`, and `ap2`.

`nativeCrashReportEnabled`
: Optional  
**Type**: Boolean  
**Default**: `false`  
Enables native crash reporting.

`service`
: Optional  
**Type**: String  
The service name for the application.

`uploadFrequency`
: Optional  
**Type**: Enum  
**Default**: `average`  
The frequency at which the Datadog SDK tries to upload data batches. Enum values: `frequent`, `average`, and `rare`.

`batchSize`
: Optional  
**Type**: Enum  
**Default**: `medium`  
Defines the Datadog SDK policy for batching data before uploading it to Datadog servers. Larger batches result in larger (but fewer) network requests. Smaller batches result in smaller (but more) network requests. Enum values: `small`, `medium`, and `large`.

`batchProcessingLevel`
: Optional  
**Type**: Enum  
**Default**: `medium`  
Defines the maximum number of batches processed sequentially without a delay, within one reading and uploading cycle. With higher levels, more data is sent in a single upload cycle, and more CPU and memory are used to process the data. With lower levels, less data is sent in a single upload cycle, and less CPU and memory are used to process the data. Enum values: `low`, `medium`, and `high`.

`version`
: Optional  
**Type**: String  
The application's version number. Because `version` is a Datadog tag, it must comply with the rules in [Defining Tags][4].

`flavor`
: Optional  
**Type**: String  
The flavor (variant) of the application. For stack trace deobfuscation, this must match the flavor set during symbol upload.

`firstPartyHosts`
: Optional  
**Type**: List&lt;String&gt;  
A list of first party hosts, used in conjunction with Datadog network tracking packages. Overrides any values set in `firstPartyHostsWithTracingHeaders`. To specify different headers per host, use `firstPartyHostsWithTracingHeaders` instead.

`firstPartyHostsWithTracingHeaders`
: Optional  
**Type**: Map&lt;String, Set&lt;TracingHeaderType&gt;&gt;  
A map of first party hosts and the types of tracing headers Datadog automatically injects on resource calls, used in conjunction with Datadog network tracking packages. For example:
  ```dart
  final configuration = DatadogConfiguration(
   clientToken: <CLIENT_TOKEN>,
   env: `prod`,
   site: DatadogSite.us1,
   firstPartyHostsWithTracingHeaders: {
    'example.com': {TracingHeaderType.b3},
   },
  );
  ```
  The `TracingHeaderType` enum has the following values:
  - `datadog`: Datadog's [`x-datadog-*` header][5]
  - `b3`: OpenTelemetry B3 [single header][6]
  - `b3multi`: OpenTelemetry B3 [multiple headers][7]
  - `tracecontext`: W3C [trace context header][8]

`rumConfiguration`
: Optional  
**Type**: Object  
See [RUM configuration](#rum-configuration).

### RUM configuration

Use the following parameters for the `DatadogRumConfiguration` class.

`applicationId`
: Required  
**Type**: String  
The RUM application ID.

`sessionSamplingRate`
: Optional  
**Type**: Double  
**Default**: `100.0`  
The sampling rate for RUM sessions. Must be between `0.0` (no RUM events are sent) and `100.0` (all RUM events are sent). For more information, see [Managing sessions][25].

`traceSampleRate`
: Optional  
**Type**: Double  
**Default**: `20.0`  
The sampling rate for resource tracing. Must be between `0.0` (no resources include APM tracing) and `100.0` (all resources include APM tracing).

`traceContextInjection`
: Optional  
**Type**: Enum  
**Default**: `all`  
The strategy for injecting trace context into requests. Enum values can be `all` (inject trace context into all requests) or `sampled` (inject trace context into only sampled requests).

`detectLongTasks`
: Optional  
**Type**: Boolean  
**Default**: `true`  
Enable or disable long task detection. This capability attempts to detect when an application is doing too much work on the main isolate or native thread, which could prevent your app from rendering at a smooth framerate.

`longTaskThreshold`
: Optional  
**Type**: Double  
**Default**: `0.1`  
The amount of elapsed time that distinguishes a _long task_, in seconds. If the main isolate takes more than this amount of time to process a microtask, it appears as a long task in Datadog RUM Explorer. Minimum value: `0.02`. On Flutter Web, which always uses a value of `0.05` seconds, this argument is ignored.

`trackFrustrations`
: Optional  
**Type**: Boolean  
**Default**: `true`  
Enables [automatic collection of user frustrations][9].

`vitalUpdateFrequency`
: Optional  
**Type**: Enum  
**Default**: `average`  
The preferred frequency for collecting mobile vitals. Enum values: `frequent` (100ms),`average` (500ms), and `rare` (1000ms). To disable mobile vitals collection, set this parameter to `null`.

`reportFlutterPerformance`
: Optional  
**Type**: Boolean  
**Default**: `false`  
Enables reporting Flutter-specific performance metrics, including build and raster times.

`customEndpoint`
: Optional  
**Type**: String  
A custom endpoint for sending RUM data.

`telemetrySampleRate`
: Optional  
**Type**: Double  
**Default**: `20.0`  
The sampling rate for telemetry data, such as errors and debug logs.

## Tracking from background isolates

Starting with v3, Datadog Flutter SDK is capable of monitoring from multiple isolates, but monitoring must be initialized from the background isolate:

When initializing your background isolate, call `DatadogSdk.instance.attachToBackgroundIsolate`. For example:

```dart
Future<void> _spawnIsolate() async {
    final receivePort = ReceivePort();
    receivePort.listen((message) {
      //
    });
    await Isolate.spawn(_backgroundWork, receivePort.sendPort);
  }

void _backgroundWork(SendPort port) async {
  await DatadogSdk.instance.attachToBackgroundIsolate();

  // Your background work
}
```

`attachToBackgroundIsolate` must be called **after** Datadog is initialized in your main isolate, otherwise the call silently fails and tracking is not available.

If you are using [Datadog Tracking HTTP Client][10] to automatically track resources, `attachToBackgroundIsolate` automatically starts tracking resources from the calling isolate. However, using `Client` from the `http` package or `Dio` requires you to re-initialize HTTP tracking for those packages from the background isolate.

## Automatically track resources

For setup steps covering both automatic and manual resource tracking, see [Track network requests][23].

Use the [Datadog Tracking HTTP Client][10] package to enable automatic tracking of resources and HTTP calls from your views.

Add the package to your `pubspec.yaml` and add the following to your initialization file:

```dart
final configuration = DatadogConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**Note**: The Datadog Tracking HTTP Client modifies [`HttpOverrides.global`][11]. If you are using your own custom `HttpOverrides`, you may need to inherit from [`DatadogHttpOverrides`][12]. In this case, you do not need to call `enableHttpTracking`. Versions of `datadog_tracking_http_client` >= 1.3 check the value of `HttpOverrides.current` and use this for client creation, so you only need to make sure to initialize `HttpOverrides.global` prior to initializing Datadog.

To enable Datadog [distributed tracing][13], you must set the `DatadogConfiguration.firstPartyHosts` property in your configuration object to a domain that supports distributed tracing. You can also modify the sampling rate for distributed tracing by setting the `traceSampleRate` on your `DatadogRumConfiguration`.

- `firstPartyHosts` does not allow wildcards, but matches any subdomains for a given domain. For example, `api.example.com` matches `staging.api.example.com` and `prod.api.example.com`, not `news.example.com`.

- `DatadogRumConfiguration.traceSampleRate` sets a default sampling rate of 20%. If you want all resources requests to generate a full distributed trace, set this value to `100.0`.

### Capture resource headers

When [tracking resources automatically][10], you can capture HTTP request and response headers on RUM Resources by setting `trackResourceHeaders` on `DatadogRumConfiguration`. This option applies to all Datadog HTTP tracking clients (Tracking HTTP Client, `DatadogClient`, Dio Interceptor, and GQL Link), but does not apply to the gRPC Interceptor. This option is disabled by default.

Captured headers appear on the RUM Resource event under `resource.request.headers` and `resource.response.headers`. You can query them in the RUM Explorer.

```dart
DatadogRumConfiguration(
  applicationId: '<rum-application-id>',
  trackResourceHeaders: ResourceHeadersExtractor(),
)
```

With no arguments, `ResourceHeadersExtractor` captures a predefined set of safe headers:

| Direction | Headers |
|-----------|---------|
| Request | `cache-control`, `content-type` |
| Response | `age`, `cache-control`, `content-encoding`, `content-length`, `content-type`, `etag`, `expires`, `server-timing`, `vary`, `x-cache` |

To capture additional headers in addition to the defaults, pass them through `captureHeaders`. To skip the defaults, set `includeDefaults: false`.

```dart
DatadogRumConfiguration(
  applicationId: '<rum-application-id>',
  trackResourceHeaders: ResourceHeadersExtractor(
    captureHeaders: ['x-request-id', 'x-custom-header'],
  ),
)
```

{% alert level="info" %}
Sensitive headers, such as tokens and API keys, are filtered out automatically, even if you list them explicitly.
{% /alert %}

### Track resources from other packages

While [Datadog Tracking HTTP Client][10] can track most common network calls in Flutter, Datadog supplies packages for integration into specific networking libraries, including gRPC, GraphQL and Dio. For more information about these libraries, see [Integrated Libraries][22].

## Enrich user sessions

For setup steps that enrich RUM events with custom views, actions, resources, and errors, see [Add Custom Context](/real_user_monitoring/enrich_rum_data/add_custom_context/?platform=flutter).

## Track custom global attributes

In addition to the [default RUM attributes][14] captured by the Datadog Flutter SDK automatically, you can choose to add additional contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Set a custom global attribute

To set a custom global attribute, use `DdRum.addAttribute`.

* To add or update an attribute, use `DdRum.addAttribute`.
* To remove the key, use `DdRum.removeAttribute`.

### Track user sessions

See [Track user IDs][26] for instructions on adding user information to your RUM sessions.

### Add custom user attributes

You can add custom attributes to your user session. This additional information is automatically applied to logs, traces, and RUM events.

To remove an existing attribute, set it to `null`.

For example:

```dart
DatadogSdk.instance.addUserExtraInfo({
 'attribute_1': 'foo',
 'attribute_2': null,
});
```

## Clear all data

For setup steps, see [Manage Data Collection](/real_user_monitoring/setup/enable_rum/manage_data_collection/?platform=flutter).

## Modify or drop RUM events

For setup steps, see [Modify or Drop RUM Events](/real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/?platform=flutter).

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```dart
final sessionId = await DatadogSdk.instance.rum?.getCurrentSessionId()
```

## Flutter-specific performance metrics

To enable the collection of Flutter-specific performance metrics, set `reportFlutterPerformance: true` in `DatadogRumConfiguration`. Widget build and raster times are displayed in [Mobile Vitals][18].

## OpenTelemetry setup

All of Datadog's automatic network tracking packages ([Datadog Tracking HTTP Client][10], [gRPC Interceptor][19], [GQL Link][20], and [Dio Interceptor][21]) support distributed traces through both automatic header generation and header ingestion. This section describes how to use OpenTelemetry with RUM Flutter.

### Datadog header generation

When configuring your tracking client or gRPC Interceptor, you can specify the types of tracing headers you want Datadog to generate. For example, if you want to send `b3` headers to `example.com` and `tracecontext` headers for `myapi.names`, you can do so with the following code:

```dart
final hostHeaders = {
    'example.com': { TracingHeaderType.b3 },
    'myapi.names': { TracingHeaderType.tracecontext}
};
```

You can use this object during initial configuration:

```dart
// For default Datadog HTTP tracing:
final configuration = DatadogConfiguration(
    // configuration
    firstPartyHostsWithTracingHeaders: hostHeaders,
);
```

You can then enable tracing as usual.

This information is merged with any hosts set on `DatadogConfiguration.firstPartyHosts`. Hosts specified in `firstPartyHosts` generate Datadog Tracing Headers by default.

## Check first party hosts

To determine if a specific URI is a first party host, use `isFirstPartyHost`.

For example:
```dart
var host = 'example.com'
if (DatadogSdk.instance.isFirstPartyHost(host)){
 print('$host is a first party host.');
}
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/flutter/setup/
[3]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries/
[4]: /getting_started/tagging/#defining-tags
[5]: /real_user_monitoring/connect_rum_and_traces/?tab=browserrum#how-are-rum-resources-linked-to-traces
[6]: https://github.com/openzipkin/b3-propagation#single-headers
[7]: https://github.com/openzipkin/b3-propagation#multiple-headers
[8]: https://www.w3.org/TR/trace-context/#tracestate-header
[9]: /real_user_monitoring/application_monitoring/browser/frustration_signals/
[10]: https://pub.dev/packages/datadog_tracking_http_client
[11]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[12]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[13]: /serverless/aws_lambda/distributed_tracing/
[14]: /real_user_monitoring/setup/data_collected/?platform=flutter
[15]: /real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[16]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[17]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[18]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=flutter#mobile-vitals
[19]: https://pub.dev/packages/datadog_grpc_interceptor
[20]: https://pub.dev/packages/datadog_gql_link
[21]: https://pub.dev/packages/datadog_dio
[22]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries
[23]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=flutter
[24]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=flutter
[25]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=flutter
[26]: /real_user_monitoring/enrich_rum_data/track_user_ids/?platform=flutter
