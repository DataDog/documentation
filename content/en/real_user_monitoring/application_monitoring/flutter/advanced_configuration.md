---
title: Flutter Advanced Configuration
description: Learn how to configure Flutter Monitoring.
aliases:
    - /real_user_monitoring/flutter/advanced_configuration
    - /real_user_monitoring/otel
    - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
    - /real_user_monitoring/mobile_and_tv_monitoring/setup/otel
    - /real_user_monitoring/flutter/otel_support/
    - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter
    - /real_user_monitoring/mobile_and_tv_monitoring/flutter/advanced_configuration
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: "Source Code"
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM

---
## Overview

If you have not set up the Datadog Flutter SDK for RUM yet, follow the [in-app setup instructions][1] or see the [RUM Flutter setup documentation][2]. Learn how to set up [OpenTelemetry with RUM Flutter](#opentelemetry-setup). For additional manual instrumentation functions, such as automatic view tracking, see [Flutter Libraries for RUM][3].

## Initialization parameters
You can specify the following parameters in your configuration when initializing the SDK.

`clientToken`
: Required<br/>
**Type**: String<br/>
A client token for RUM or logging/APM. You can obtain this token in Datadog.

`env`
: Required<br/>
**Type**: String<br/>
The environment name sent to Datadog. You can use `env` to filter events by environment (for example, `staging` or `production`).

`site`
: Required<br/>
**Type**: Enum<br/>
The Datadog site that data is sent to. Enum values: `us1`, `us3`, `us5`, `eu1`, `us1Fed`, `ap1`, and `ap2`.

`nativeCrashReportEnabled`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Enables native crash reporting.

`service`
: Optional<br/>
**Type**: String<br/>
The service name for the application.

`uploadFrequency`
: Optional<br/>
**Type**: Enum<br/>
**Default**: `average`<br/>
The frequency at which the Datadog SDK tries to upload data batches. Enum values: `frequent`, `average`, and `rare`.

`batchSize`
: Optional<br/>
**Type**: Enum<br/>
**Default**: `medium`<br/>
Defines the Datadog SDK policy for batching data before uploading it to Datadog servers. Larger batches result in larger (but fewer) network requests. Smaller batches result in smaller (but more) network requests. Enum values: `small`, `medium`, and `large`.

`batchProcessingLevel`
: Optional<br/>
**Type**: Enum<br/>
**Default**: `medium`
Defines the maximum number of batches processed sequentially without a delay, within one reading and uploading cycle. With higher levels, more data is sent in a single upload cycle, and more CPU and memory are used to process the data. With lower levels, less data is sent in a single upload cycle, and less CPU and memory are used to process the data. Enum values: `low`, `medium`, and `high`.

`version`
: Optional<br/>
**Type**: String<br/>
The application's version number. Because `version` is a Datadog tag, it must comply with the rules in [Defining Tags][4].

`flavor`
: Optional<br/>
**Type**: String<br/>
The flavor (variant) of the application. For stack trace deobfuscation, this must match the flavor set during symbol upload.

`firstPartyHosts`
: Optional<br/>
**Type**: List&lt;String&gt;<br/>
A list of first party hosts, used in conjunction with Datadog network tracking packages. Overrides any values set in `firstPartyHostsWithTracinHeaders`. To specify different headers per host, use `firstPartyHostsWithTracingHeaders` instead.

`firstPartyHostsWithTracingHeaders`
: Optional<br/>
**Type**: Map&lt;String, Set&lt;TracingHeaderType&gt;&gt;<br/>
A map of first party hosts and the types of tracing headers Datadog automatically injects on resource calls, used in conjunction with Datadog network tracking packages. For example:<br/>
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
: Optional<br/>
**Type**: Object<br/>
See [RUM configuration](#rum-configuration).

### RUM configuration

Use the following parameters for the `DatadogRumConfiguration` class.

`applicationId`
: Required<br/>
**Type**: String</br>
The RUM application ID.

`sessionSamplingRate`
: Optional<br/>
**Type**: Double<br/>
**Default**: `100.0`<br/>
The sampling rate for RUM sessions. Must be between `0.0` (no RUM events are sent) and `100.0` (all RUM events are sent).

`traceSampleRate`
: Optional<br/>
**Type**: Double<br/>
**Default**: `20.0`<br/>
The sampling rate for resource tracing. Must be between `0.0` (no resources include APM tracing) and `100.0` (all resources include APM tracing).

`traceContextInjection`
: Optional<br/>
**Type**: Enum<br/>
**Default**: `all`<br/>
The strategy for injecting trace context into requests. Enum values can be `all` (inject trace context into all requests) or `sampled` (inject trace context into only sampled requests).

`detectLongTasks`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `true`<br/>
Enable or disable long task detection. This capability attempts to detect when an application is doing too much work on the main isolate or native thread, which could prevent your app from rendering at a smooth framerate.

`longTaskThreshold`
: Optional<br/>
**Type**: Double<br/>
**Default**: `0.1`<br/>
The amount of elapsed time that distinguishes a _long task_, in seconds. If the main isolate takes more than this amount of time to process a microtask, it appears as a long task in Datadog RUM Explorer. Minimum value: `0.02`. On Flutter Web, which always uses a value of `0.05` seconds, this argument is ignored.

`trackFrustrations`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `true`<br/>
Enables [automatic collection of user frustrations][9].

`vitalUpdateFrequency`
: Optional<br/>
**Type**: Enum<br/>
**Default**: `average`<br/>
The preferred frequency for collecting mobile vitals. Enum values: `frequent` (100ms),`average` (500ms), and `rare` (1000ms). To disable mobile vitals collection, set this parameter to `null`.

`reportFlutterPerformance`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`
Enables reporting Flutter-specific performance metrics, including build and raster times.

`customEndpoint`
: Optional<br/>
**Type**: String<br/>
A custom endpoint for sending RUM data.

`telemetrySampleRate`
: Optional<br/>
**Type**: Double<br/>
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

`attachToBackgroundIsolate` must be called **after** Datadog is initialized in your main isolate, otherwise the call will silently fail and tracking will not be available.

If you ware using [Datadog Tracking HTTP Client][10] to automatically track resources, `attachToBackgroundIsolate` will automatically start tracking resources from the calling isolate.  However, using `Client` from the `http` package or `Dio` will require you re-intiialize HTTP tracking for those packages from the background isolate.

## Automatically track resources

Use the [Datadog Tracking HTTP Client][10] package to enable automatic tracking of resources and HTTP calls from your views.

Add the package to your `pubspec.yaml` and add the following to your initialization file:

```dart
final configuration = DatadogConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**Note**: The Datadog Tracking HTTP Client modifies [`HttpOverrides.global`][11]. If you are using your own custom `HttpOverrides`, you may need to inherit from [`DatadogHttpOverrides`][12]. In this case, you do not need to call `enableHttpTracking`. Versions of `datadog_tracking_http_client` >= 1.3 check the value of `HttpOverrides.current` and use this for client creation, so you only need to make sure to initialize `HttpOverrides.global` prior to initializing Datadog.

In order to enable Datadog [Distributed Tracing][13], you must set the `DatadogConfiguration.firstPartyHosts` property in your configuration object to a domain that supports distributed tracing. You can also modify the sampling rate for distributed tracing by setting the `tracingSamplingRate` on your `DatadogRumConfiguration`.

- `firstPartyHosts` does not allow wildcards, but matches any subdomains for a given domain. For example, `api.example.com` matches `staging.api.example.com` and `prod.api.example.com`, not `news.example.com`.

- `DatadogRumConfiguration.traceSampleRate` sets a default sampling rate of 20%. If you want all resources requests to generate a full distributed trace, set this value to `100.0`.

### Track resources from other packages

While `Datadog Tracking HTTP Client` can track most common network calls in Flutter, Datadog supplies packages for integration into specific networking libraries, including gRPC, GraphQL and Dio. For more information about these libraries, see [Integrated Libraries][22].

## Enrich user sessions

Flutter RUM automatically tracks attributes such as user activity, views (using the `DatadogNavigationObserver`), errors, native crashes, and network requests (using the Datadog Tracking HTTP Client). See the [RUM Data Collection documentation][14] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Notify the SDK that your view finished loading

iOS RUM tracks the time it takes for your view to load. To notify the SDK that your view has finished loading, call the `addViewLoadingTime` method on `DatadogRum`.
Call this method when your view is fully loaded and ready to be displayed to the user:

```dart
  DatadogSdk.instance.rum?.addViewLoadingTime(override);
```

Use the `override` option to replace the previously calculated loading time for the current view.

After the loading time is sent, it is accessible as `@view.loading_time` and is visible in the RUM UI.

**Note**: This API is still experimental and might change in the future.

### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time by using `DdRum.addTiming`. The timing measure is relative to the start of the current RUM view.

For example, you can time how long it takes for your hero image to appear:

```dart
void _onHeroImageLoaded() {
    DatadogSdk.instance.rum?.addTiming("hero_image");
}
```

Once you set the timing, it is accessible as `@view.custom_timings.<timing_name>`. For example, `@view.custom_timings.hero_image`.

To create visualizations in your dashboards, [create a measure][15] first.

### Track user actions

You can track specific user actions such as taps, clicks, and scrolls using `DdRum.addAction`.

To manually register instantaneous RUM actions such as `RumActionType.tap`, use `DdRum.addAction()`. For continuous RUM actions such as `RumActionType.scroll`, use `DdRum.startAction()` or `DdRum.stopAction()`.

For example:

```dart
void _downloadResourceTapped(String resourceName) {
    DatadogSdk.instance.rum?.addAction(
        RumActionType.tap,
        resourceName,
    );
}
```

When using `DdRum.startAction` and `DdRum.stopAction`, the `type` action must be the same for the Datadog Flutter SDK to match an action's start with its completion.

### Track custom resources

In addition to tracking resources automatically using the [Datadog Tracking HTTP Client][16], you can track specific custom resources such as network requests or third-party provider APIs using the [following methods][17]:

- `DdRum.startResource`
- `DdRum.stopResource`
- `DdRum.stopResourceWithError`
- `DdRum.stopResourceWithErrorInfo`

For example:

```dart
// in your network client:

DatadogSdk.instance.rum?.startResource(
    "resource-key",
    RumHttpMethod.get,
    url,
);

// Later

DatadogSdk.instance.rum?.stopResource(
    "resource-key",
    200,
    RumResourceType.image
);
```

The `String` used for `resourceKey` in both calls must be unique for the resource you are calling in order for the Flutter Datadog SDK to match a resource's start with its completion.

### Track custom errors

To track specific errors, notify `DdRum` when an error occurs with the message, source, exception, and additional attributes.

```dart
DatadogSdk.instance.rum?.addError("This is an error message.");
```

## Track custom global attributes

In addition to the [default RUM attributes][14] captured by the Datadog Flutter SDK automatically, you can choose to add additional contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Set a custom global attribute

To set a custom global attribute, use `DdRum.addAttribute`.

* To add or update an attribute, use `DdRum.addAttribute`.
* To remove the key, use `DdRum.removeAttribute`.

### Track user sessions

Adding user information to your RUM sessions makes it easy to:

* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI" style="width:90%" >}}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use `DatadogSdk.setUserInfo`.

For example:

```dart
DatadogSdk.instance.setUserInfo("1234", "John Doe", "john@doe.com");
```

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

Use `clearAllData` to clear all data that has not been sent to Datadog.

```dart
DatadogSdk.instance.clearAllData();
```

## Modify or drop RUM events

**Note**: This feature is not yet available for Flutter web applications.

To modify attributes of a RUM event before it is sent to Datadog or to drop an event entirely, use the Event Mappers API when configuring the Flutter RUM SDK:

```dart
final config = DatadogConfiguration(
    // other configuration...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        rumViewEventMapper = (event) => event,
        rumActionEventMapper = (event) => event,
        rumResourceEventMapper = (event) => event,
        rumErrorEventMapper = (event) => event,
        rumLongTaskEventMapper = (event) => event,
    ),
);
```

Each mapper is a function with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent, or dropping the event entirely.

For example, to redact sensitive information in a RUM Resource's `url`, implement a custom `redacted` function and use it in `rumResourceEventMapper`:

```dart
    rumResourceEventMapper = (event) {
        var resourceEvent = resourceEvent
        resourceEvent.resource.url = redacted(resourceEvent.resource.url)
        return resourceEvent
    }
```

Returning `null` from the error, resource, or action mapper drops the event entirely; the event is not sent to Datadog. The value returned from the view event mapper must not be `null`.

Depending on the event's type, only some specific properties can be modified:

| Event Type       | Attribute key                     | Description                                 |
| ---------------- | --------------------------------- | ------------------------------------------- |
| RumViewEvent     | `viewEvent.view.url`              | URL of the view.                            |
|                  | `viewEvent.view.referrer`         | Referrer of the view.                       |
| RumActionEvent   | `actionEvent.action.target?.name` | Name of the action.                         |
|                  | `actionEvent.view.referrer`       | Referrer of the view linked to this action. |
|                  | `actionEvent.view.url`            | URL of the view linked to this action.      |
| RumErrorEvent    | `errorEvent.error.message`        | Error message.                              |
|                  | `errorEvent.error.stack`          | Stacktrace of the error.                    |
|                  | `errorEvent.error.resource?.url`  | URL of the resource the error refers to.    |
|                  | `errorEvent.view.referrer`        | Referrer of the view linked to this action. |
|                  | `errorEvent.view.url`             | URL of the view linked to this error.       |
| RumResourceEvent | `resourceEvent.resource.url`      | URL of the resource.                        |
|                  | `resourceEvent.view.referrer`     | Referrer of the view linked to this action. |
|                  | `resourceEvent.view.url`          | URL of the view linked to this resource.    |

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

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
[14]: /real_user_monitoring/application_monitoring/flutter/data_collected
[15]: /real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[16]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[17]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[18]: /real_user_monitoring/application_monitoring/mobile_vitals/?tab=flutter
[19]: https://pub.dev/packages/datadog_grpc_interceptor
[20]: https://pub.dev/packages/datadog_gql_link
[21]: https://pub.dev/packages/datadog_dio
[22]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries
