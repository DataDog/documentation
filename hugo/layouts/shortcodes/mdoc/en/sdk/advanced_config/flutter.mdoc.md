<!--
This partial contains advanced configuration instructions for the Flutter SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the Datadog Flutter SDK for RUM yet, follow the [in-app setup instructions][1] or see the [RUM Flutter setup documentation][2]. Learn how to set up [OpenTelemetry with RUM Flutter](/real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/?platform=flutter#opentelemetry-support). For integrations with other Flutter libraries, see [Additional Plugins and Integrations][3].

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

If you are using [Datadog Tracking HTTP Client][10] to [automatically track resources][23], `attachToBackgroundIsolate` automatically starts tracking resources from the calling isolate. However, using `Client` from the `http` package or `Dio` requires you to re-initialize HTTP tracking for those packages from the background isolate.

## Enrich RUM data

To add global attributes, track users and accounts, or modify and drop events, see [Enrich RUM Data][27].

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/setup/install/?platform=flutter
[3]: /real_user_monitoring/setup/additional_plugins/?platform=flutter
[4]: /getting_started/tagging/#defining-tags
[5]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/?platform=flutter#how-rum-resources-are-linked-to-traces
[6]: https://github.com/openzipkin/b3-propagation#single-headers
[7]: https://github.com/openzipkin/b3-propagation#multiple-headers
[8]: https://www.w3.org/TR/trace-context/#tracestate-header
[9]: /real_user_monitoring/setup/enable_rum/track_frustration_signals/?platform=flutter
[10]: https://pub.dev/packages/datadog_tracking_http_client
[23]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=flutter
[25]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=flutter
[27]: /real_user_monitoring/enrich_rum_data/
