---
title: RUM iOS Advanced Configuration
kind: documentation
code_lang: ios
type: multi-code-lang
code_lang_weight: 20
aliases:
    - /real_user_monitoring/ios/advanced_configuration
further_reading:
  - link: "https://github.com/DataDog/dd-sdk-ios"
    tag: "Source Code"
    text: "Source code for dd-sdk-ios"
  - link: "/real_user_monitoring"
    tag: "Documentation"
    text: "RUM & Session Replay"
  - link: "/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/"
    tag: "Documentation"
    text: "RUM iOS and tvOS monitoring supported versions"
---

If you have not set up the RUM iOS SDK yet, follow the [in-app setup instructions][1] or refer to the [RUM iOS setup documentation][2].

## Enrich user sessions

iOS RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collection documentation][3] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Custom Views

In addition to [tracking views automatically](#automatically-track-views), you can also track specific distinct views such as `viewControllers` when they become visible and interactive. Stop tracking when the view is no longer visible using the following methods in `RUMMonitor.shared()`:

- `.startView(viewController:)`
- `.stopView(viewController:)`

For example:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// in your `UIViewController`:
let rum = RUMMonitor.shared()

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    rum.startView(viewController: self)
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  rum.stopView(viewController: self)
}
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;
// in your `UIViewController`:

DDRUMMonitor *rum = [DDRUMMonitor shared];

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    [rum startViewWithViewController:self name:nil attributes:nil];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];

    [rum stopViewWithViewController:self attributes:nil];
}
```
{{% /tab %}}
{{< /tabs >}}

For more details and available options, filter the [relevant file on GitHub][9] for the `DDRUMMonitor` class.

### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time by using the `addTiming(name:)` API. The timing measure is relative to the start of the current RUM view.

For example, you can time how long it takes for your hero image to appear:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addTiming(name: "hero_image")
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [[DDRUMMonitor shared] addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

Once you set the timing, it is accessible as `@view.custom_timings.<timing_name>`. For example, `@view.custom_timings.hero_image`.

To create visualizations in your dashboards, [create a measure][4] first.

### Custom Actions

In addition to [tracking actions automatically](#automatically-track-user-actions), you can track specific custom user actions (taps, clicks, and scrolls) with the `addAction(type:name:)` API.

To manually register instantaneous RUM actions such as `.tap` on `RUMMonitor.shared()`, use `.addAction(type:name:)`. For continuous RUM actions such as `.scroll`, use `.startAction(type:name:)` or `.stopAction(type:name:)`.

For example:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// in your `UIViewController`:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? "",
    )
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**Note**: When using `.startAction(type:name:)` and `.stopAction(type:name:)`, the action `type` must be the same. This is necessary for the RUM iOS SDK to match an action start with its completion.

Find more details and available options in the [`DDRUMMonitor` class][9].

### Custom Resources

In addition to [tracking resources automatically](#automatically-track-network-requests), you can also track specific custom resources such as network requests or third-party provider APIs. Use the following methods on `RUMMonitor.shared()` to manually collect RUM resources:

- `.startResource(resourceKey:request:)`
- `.stopResource(resourceKey:response:)`
- `.stopResourceWithError(resourceKey:error:)`
- `.stopResourceWithError(resourceKey:message:)`

For example:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// in your network client:

let rum = RUMMonitor.shared()

rum.startResource(
    resourceKey: "resource-key",
    request: request
)

rum.stopResource(
    resourceKey: "resource-key",
    response: response
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// in your network client:

[[DDRUMMonitor shared] startResourceWithResourceKey:@"resource-key"
                                            request:request
                                         attributes:@{}];

[[DDRUMMonitor shared] stopResourceWithResourceKey:@"resource-key"
                                          response:response
                                        attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

**Note**: The `String` used for `resourceKey` in both calls must be unique for the resource you are calling. This is necessary for the RUM iOS SDK to match a resource's start with its completion.

Find more details and available options in the [`DDRUMMonitor` class][9].

### Custom Errors

To track specific errors, notify `RUMMonitor` when an error occurs with the message, source, exception, and additional attributes. Refer to the [Error Attributes documentation][5].

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

For more details and available options, refer to the code documentation comments in the [`DDRUMMonitor` class][9].

## Track custom global attributes

In addition to the [default RUM attributes][7] captured by the RUM iOS SDK automatically, you can choose to add additional contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Set a custom global attribute

To set a custom global attribute, use `RUMMonitor.shared().addAttribute(forKey:value:)`.

* To add an attribute, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* To update the value, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* To remove the key, use `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

**Note**: You can't create facets on custom attributes if you use spaces or special characters in your key names. For example, use `forKey: "store_id"` instead of `forKey: "Store ID"`.

### Track user sessions

Adding user information to your RUM sessions makes it easy to:

* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI" >}}

The following attributes are **optional**, you should provide **at least one** of them:

| Attribute   | Type   | Description                                                                                              |
|-------------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | String | Unique user identifier.                                                                                  |
| `usr.name`  | String | User friendly name, displayed by default in the RUM UI.                                                  |
| `usr.email` | String | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

To identify user sessions, use the `setUserInfo(id:name:email:)` API.

For example:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## Initialization Parameters

You can use the following properties in `Datadog.Configuration` when creating the Datadog configuration to initialize the library:

`site`
: Sets the Datadog server endpoint that data is sent to.

`batchSize`
: Sets the preferred size of batched data uploaded to Datadog. This value impacts the size and number of requests performed by the RUM iOS SDK (small batches mean more requests, but each request becomes smaller in size). Available values include: `.small`, `.medium`, and `.large`.

`uploadFrequency`
: Sets the preferred frequency of uploading data to Datadog. Available values include: `.frequent`, `.average`, and `.rare`.

### RUM configuration

You can use the following properties in `RUM.Configuration` when enabling RUM:

`sessionSampleRate`
: Sets the sampling rate for RUM sessions. The `sessionSampleRate` value must be between `0.0` and `100.0`. A value of `0.0` means no sessions are sent, `100.0` means all sessions are sent to Datadog. If not configured, the default value of `100.0` is used.

`uiKitViewsPredicate`
: Enables tracking `UIViewControllers` as RUM views. You can use default implementation of `predicate` by setting the `DefaultUIKitRUMViewsPredicate` or implement [your own `UIKitRUMViewsPredicate`](#automatically-track-views) customized for your app.

`uiKitActionsPredicate`
: Enables tracking user interactions (taps) as RUM actions. You can use the default implementation of `predicate` by setting the `DefaultUIKitRUMActionsPredicate` or implement [your own `UIKitRUMActionsPredicate`](#automatically-track-user-actions) customized for your app.

`urlSessionTracking`
: Enables tracking `URLSession` tasks (network requests) as RUM resources. The `firstPartyHostsTracing` parameter defines hosts that are categorized as `first-party` resources (if RUM is enabled) and have tracing information injected (if tracing feature is enabled). The `resourceAttributesProvider` parameter defines a closure to provide custom attributes for intercepted resources that is called for each resource collected by the RUM iOS SDK. This closure is called with task information and may return custom resource attributes or `nil` if no attributes should be attached.

`viewEventMapper`
: Sets the data scrubbing callback for views. This can be used to modify view events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`resourceEventMapper`
: Sets the data scrubbing callback for resources. This can be used to modify or drop resource events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`actionEventMapper`
: Sets the data scrubbing callback for actions. This can be used to modify or drop action events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`errorEventMapper`
: Sets the data scrubbing callback for errors. This can be used to modify or drop error events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`longTaskEventMapper`
: Sets the data scrubbing callback for long tasks. This can be used to modify or drop long task events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`vitalsUpdateFrequency`
: Sets the preferred frequency of collecting mobile vitals. Available values include: `.frequent` (every 100ms), `.average` (every 500ms), `.rare` (every 1s), and `.never` (disable vitals monitoring).

`appHangThreshold`
: Sets the threshold for reporting app hangs. The minimum allowed value for this option is `0.1` seconds. To disable app hangs reporting, set this to `nil`. For more information, see [Add app hang reporting][10].

### Automatically track views

To automatically track views (`UIViewControllers`), use the `uiKitViewsPredicate` option when enabling RUM. By default, views are named with the view controller's class name. To customize it, provide your own implementation of the `predicate` which conforms to `UIKitRUMViewsPredicate` protocol:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

Inside the `rumView(for:)` implementation, your app should decide if a given `UIViewController` instance should start the RUM view (return value) or not (return `nil`). The returned `RUMView` value must specify the `name` and may provide additional `attributes` for the created RUM view.

For instance, you can configure the predicate to use explicit type check for each view controller in your app:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        switch viewController {
        case is HomeViewController:     return .init(name: "Home")
        case is DetailsViewController:  return .init(name: "Details")
        default:                        return nil
        }
    }
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if ([viewController isKindOfClass:[HomeViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Home" attributes:@{}];
    }

    if ([viewController isKindOfClass:[DetailsViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Details" attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

You can even come up with a more dynamic solution depending on your app's architecture.

For example, if your view controllers use `accessibilityLabel` consistently, you can name views by the value of accessibility label:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        guard let accessibilityLabel = viewController.accessibilityLabel else {
            return nil
        }

        return RUMView(name: accessibilityLabel)
    }
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if (viewController.accessibilityLabel) {
        return [[DDRUMView alloc] initWithName:viewController.accessibilityLabel attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

**Note**: The RUM iOS SDK calls `rumView(for:)` many times while your app is running. It is recommended to keep its implementation fast and single-threaded.

### Automatically track user actions

To automatically track user tap actions, set the `uiKitActionsPredicate` option when enabling RUM.

### Automatically track network requests

To automatically track resources (network requests) and get their timing information such as time to first byte or DNS resolution, use the `urlSessionTracking` option when enabling RUM and enable `URLSessionInstrumentation`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: SessionDelegate.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: SessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[SessionDelegate class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[SessionDelegate alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

Also, you can configure first party hosts using `urlSessionTracking`. This classifies resources that match the given domain as "first party" in RUM and propagates tracing information to your backend (if you have enabled Tracing). Network traces are sampled with an adjustable sampling rate. A sampling of 20% is applied by default.

For instance, you can configure `example.com` as the first party host and enable both RUM and Tracing features:

{{< tabs >}}
{{% tab "Swift" %}}
```swift

import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        firstPartyHostsTracing: .trace(hosts: ["example.com"], sampleRate: 20)
    )
  )
)

URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: SessionDelegate.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: SessionDelegate(),
    delegateQueue: nil
)
```

This tracks all requests sent with the instrumented `session`. Requests matching the `example.com` domain are marked as "first party" and tracing information is sent to your backend to [connect the RUM resource with its Trace][1].

[1]: https://docs.datadoghq.com/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{< /tabs >}}

To add custom attributes to resources, use the `URLSessionTracking.resourceAttributesProvider` option when enabling the RUM. By setting attributes provider closure, you can return additional attributes to be attached to tracked resource.

For instance, you may want to add HTTP request and response headers to the RUM resource:

```swift
RUM.enable(
  with: RUM.Configuration(
    ...
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        resourceAttributesProvider: { request, response, data, error in
            return [
                "request.headers" : redactedHeaders(from: request),
                "response.headers" : redactedHeaders(from: response)
            ]
        }
    )
  )
)
```

If you don't want to track requests, you can disable URLSessionInstrumentation for the delegate type:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.disable(delegateClass: SessionDelegate.self)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[SessionDelegate class]];
```
{{% /tab %}}
{{< /tabs >}}

### Automatically track errors

All "error" and "critical" logs sent with `Logger` are automatically reported as RUM errors and linked to the current RUM view:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

Similarly, all finished spans marked as error are reported as RUM errors:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace

let span = Tracer.shared().startSpan(operationName: "operation")
// ... capture the `error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## Modify or drop RUM events

To modify attributes of a RUM event before it is sent to Datadog or to drop an event entirely, use the Event Mappers API when configuring the RUM iOS SDK:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    viewEventMapper: { RUMViewEvent in
        return RUMViewEvent
    }
    resourceEventMapper: { RUMResourceEvent in
        return RUMResourceEvent
    }
    actionEventMapper: { RUMActionEvent in
        return RUMActionEvent
    }
    errorEventMapper: { RUMErrorEvent in
        return RUMErrorEvent
    }
    longTaskEventMapper: { RUMLongTaskEvent in
        return RUMLongTaskEvent
    }
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull RUMViewEvent) {
    return RUMViewEvent;
}];

[configuration setErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull RUMErrorEvent) {
    return RUMErrorEvent;
}];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];

[configuration setActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull RUMActionEvent) {
    return RUMActionEvent;
}];

[configuration setLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull RUMLongTaskEvent) {
    return RUMLongTaskEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Each mapper is a Swift closure with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent.

For example, to redact sensitive information in a RUM Resource's `url`, implement a custom `redacted(_:) -> String` function and use it in `resourceEventMapper`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    resourceEventMapper: { RUMResourceEvent in
        var RUMResourceEvent = RUMResourceEvent
        RUMResourceEvent.resource.url = redacted(RUMResourceEvent.resource.url)
        return RUMResourceEvent
    }
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Returning `nil` from the error, resource, or action mapper drops the event entirely; the event is not sent to Datadog. The value returned from the view event mapper must not be `nil` (to drop views, customize your implementation of `UIKitRUMViewsPredicate`; read more in [tracking views automatically](#automatically-track-views)).

Depending on the event's type, only some specific properties can be modified:

| Event Type       | Attribute key                     | Description                             |
|------------------|-----------------------------------|-----------------------------------------|
| RUMViewEvent     | `RUMViewEvent.view.name`             | Name of the view.                        |
|                  | `RUMViewEvent.view.url`              | URL of the view.                         |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | Name of the action.                      |
|                  | `RUMActionEvent.view.url`            | URL of the view linked to this action.   |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | Error message.                           |
|                  | `RUMErrorEvent.error.stack`          | Stacktrace of the error.                 |
|                  | `RUMErrorEvent.error.resource?.url`  | URL of the resource the error refers to. |
|                  | `RUMErrorEvent.view.url`             | URL of the view linked to this error.    |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | URL of the resource.                     |
|                  | `RUMResourceEvent.view.url`          | URL of the view linked to this resource. |

## Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation, the RUM iOS SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `.pending`: The RUM iOS SDK starts collecting and batching the data but does not send it to Datadog. The RUM iOS SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `.granted`: The RUM iOS SDK starts collecting the data and sends it to Datadog.
3. `.notGranted`: The RUM iOS SDK does not collect any data. No logs, traces, or RUM events are sent to Datadog.

To change the tracking consent value after the RUM iOS SDK is initialized, use the `Datadog.set(trackingConsent:)` API call. The RUM iOS SDK changes its behavior according to the new value.

For example, if the current tracking consent is `.pending`:

- If you change the value to `.granted`, the RUM iOS SDK sends all current and future data to Datadog;
- If you change the value to `.notGranted`, the RUM iOS SDK wipes all current data and does not collect future data.

## Sending data when device is offline

RUM ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the RUM iOS SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically discarded if it gets too old to ensure the RUM iOS SDK does not use too much disk space.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/ios
[3]: /real_user_monitoring/ios/data_collected
[4]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[5]: /real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum
[7]: /real_user_monitoring/ios/data_collected?tab=session#default-attributes
[9]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogObjc/Sources/RUM/RUM%2Bobjc.swift
[10]: /real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
