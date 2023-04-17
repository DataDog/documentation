---
title: RUM iOS Advanced Configuration
kind: documentation
further_reading:
  - link: "https://github.com/DataDog/dd-sdk-ios"
    tag: "Github"
    text: "dd-sdk-ios Source Code"
  - link: "/real_user_monitoring"
    tag: "Documentation"
    text: "RUM & Session Replay"
---

If you have not set up the RUM iOS SDK yet, follow the [in-app setup instructions][1] or refer to the [RUM iOS setup documentation][2].

## Enrich user sessions

iOS RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collection documentation][3] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Custom Views

In addition to [tracking views automatically](#automatically-track-views), you can also track specific distinct views such as `viewControllers` when they become visible and interactive. Stop tracking when the view is no longer visible using the following methods in `Global.rum`:

- `.startView(viewController:)`
- `.stopView(viewController:)`

For example:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// in your `UIViewController`:

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    Global.rum.startView(viewController: self)
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  Global.rum.stopView(viewController: self)
}
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// in your `UIViewController`:

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    [DDGlobal.rum startViewWithViewController:self name:nil attributes:nil];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];

    [DDGlobal.rum stopViewWithViewController:self attributes:nil];
}
```
{{% /tab %}}
{{< /tabs >}}

Find more details and available options in the [`DDRUMMonitor` class][9].

### Add your own performance timing

In addition to RUM’s default attributes, you can measure where your application is spending its time by using the `addTiming(name:)` API. The timing measure is relative to the start of the current RUM view. 

For example, you can time how long it takes for your hero image to appear:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
func onHeroImageLoaded() {
    Global.rum.addTiming(name: "hero_image")
} 
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [DDGlobal.rum addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

Once you set the timing, it is accessible as `@view.custom_timings.<timing_name>`. For example, `@view.custom_timings.hero_image`. 

To create visualizations in your dashboards, [create a measure][4] first.

### Custom Actions

In addition to [tracking actions automatically](#automatically-track-user-actions), you can track specific custom user actions (taps, clicks, and scrolls) with the `addUserAction(type:name:)` API. 

To manually register instantaneous RUM actions such as `.tap` on `Global.rum`, use `.addUserAction(type:name:)`. For continuous RUM actions such as `.scroll`, use `.startUserAction(type:name:)` or `.stopUserAction(type:)`.

For example:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// in your `UIViewController`:

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    Global.rum.addUserAction(
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
    [DDGlobal.rum addUserActionWithType:DDRUMUserActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**Note**: When using `.startUserAction(type:name:)` and `.stopUserAction(type:)`, the action `type` must be the same. This is necessary for the RUM iOS SDK to match an action start with its completion. 

Find more details and available options in the [`DDRUMMonitor` class][9].

### Custom Resources

In addition to [tracking resources automatically](#automatically-track-network-requests), you can also track specific custom resources such as network requests or third-party provider APIs. Use the following methods on `Global.rum` to manually collect RUM resources:

- `.startResourceLoading(resourceKey:request:)`
- `.stopResourceLoading(resourceKey:response:)`
- `.stopResourceLoadingWithError(resourceKey:error:)`
- `.stopResourceLoadingWithError(resourceKey:errorMessage:)`

For example:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// in your network client:

Global.rum.startResourceLoading(
    resourceKey: "resource-key", 
    request: request
)

Global.rum.stopResourceLoading(
    resourceKey: "resource-key",
    response: response
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// in your network client:

[DDGlobal.rum startResourceLoadingWithResourceKey:@"resource-key"
                                          request:request
                                       attributes:@{}];

[DDGlobal.rum stopResourceLoadingWithResourceKey:@"resource-key"
                                        response:response
                                      attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

**Note**: The `String` used for `resourceKey` in both calls must be unique for the resource you are calling. This is necessary for the RUM iOS SDK to match a resource's start with its completion. 

Find more details and available options in the [`DDRUMMonitor` class][9].

### Custom Errors

To track specific errors, notify `Global.rum` when an error occurs with the message, source, exception, and additional attributes. Refer to the [Error Attributes documentation][5].

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Global.rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDGlobal.rum addErrorWithMessage:@"error message." source:DDRUMErrorSourceCustom stack:nil attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

For more details and available options, refer to the code documentation comments in the [`DDRUMMonitor` class][9].

## Track custom global attributes

In addition to the [default RUM attributes][7] captured by the RUM iOS SDK automatically, you can choose to add additional contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog. 

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Set a custom global attribute

To set a custom global attribute, use `Global.rum.addAttribute(forKey:value:)`.

* To add an attribute, use `Global.rum.addAttribute(forKey: "some key", value: "some value")`.
* To update the value, use `Global.rum.addAttribute(forKey: "some key", value: "some other value")`.
* To remove the key, use `Global.rum.removeAttribute(forKey: "some key")`.

### Track user sessions

Adding user information to your RUM sessions makes it easy to:

* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI"  >}}

The following attributes are **optional**, you should provide **at least one** of them:

| Attribute | Type   | Description                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
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

## Initialization Parameters
 
You can use the following methods in `Datadog.Configuration.Builder` when creating the Datadog configuration to initialize the library:

`set(endpoint: DatadogEndpoint)`
: Sets the Datadog server endpoint that data is sent to.

`set(batchSize: BatchSize)`
: Sets the preferred size of batched data uploaded to Datadog. This value impacts the size and number of requests performed by the RUM iOS SDK (small batches mean more requests, but each request becomes smaller in size). Available values include: `.small`, `.medium`, and `.large`.

`set(uploadFrequency: UploadFrequency)`
: Sets the preferred frequency of uploading data to Datadog. Available values include: `.frequent`, `.average`, and `.rare`.

`set(mobileVitalsFrequency: VitalsFrequency)`
: Sets the preferred frequency of collecting mobile vitals. Available values include: `.frequent` (every 100ms), `.average` (every 500ms), `.rare` (every 1s), and `.never` (disable vitals monitoring).

### RUM configuration

`enableRUM(_ enabled: Bool)`
: Enables or disables the RUM feature.

`set(rumSessionsSamplingRate: Float)`
: Sets the sampling rate for RUM sessions. The `rumSessionsSamplingRate` value must be between `0.0` and `100.0`. A value of `0.0` means no sessions are sent, `100.0` means all sessions are sent to Datadog. If not configured, the default value of `100.0` is used.

`trackUIKitRUMViews(using predicate: UIKitRUMViewsPredicate)`
: Enables tracking `UIViewControllers` as RUM views. You can use default implementation of `predicate` by calling this API with no parameter (`trackUIKitRUMViews()`) or implement [your own `UIKitRUMViewsPredicate`](#automatically-track-views) customized for your app.

`trackUIKitRUMActions(using predicate: UIKitRUMUserActionsPredicate)`
: Enables tracking user interactions (taps) as RUM actions. You can use the default implementation of `predicate` by calling this API with no parameter (`trackUIKitRUMActions()`) or implement [your own `UIKitRUMUserActionsPredicate`](#automatically-track-user-actions) customized for your app.

`trackURLSession(firstPartyHosts: Set<String>)`
: Enables tracking `URLSession` tasks (network requests) as RUM resources. The `firstPartyHosts` parameter defines hosts that are categorized as `first-party` resources (if RUM is enabled) and have tracing information injected (if tracing feature is enabled).

`setRUMViewEventMapper(_ mapper: @escaping (RUMViewEvent) -> RUMViewEvent)`
: Sets the data scrubbing callback for views. This can be used to modify view events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`setRUMResourceEventMapper(_ mapper: @escaping (RUMResourceEvent) -> RUMResourceEvent?)`
: Sets the data scrubbing callback for resources. This can be used to modify or drop resource events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`setRUMActionEventMapper(_ mapper: @escaping (RUMActionEvent) -> RUMActionEvent?)`
: Sets the data scrubbing callback for actions. This can be used to modify or drop action events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`setRUMErrorEventMapper(_ mapper: @escaping (RUMErrorEvent) -> RUMErrorEvent?)`
: Sets the data scrubbing callback for errors. This can be used to modify or drop error events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`setRUMLongTaskEventMapper(_ mapper: @escaping (RUMLongTaskEvent) -> RUMLongTaskEvent?)`
: Sets the data scrubbing callback for long tasks. This can be used to modify or drop long task events before they are sent to Datadog. For more information, see [Modify or drop RUM events](#modify-or-drop-rum-events).

`setRUMResourceAttributesProvider(_ provider: @escaping (URLRequest, URLResponse?, Data?, Error?) -> [AttributeKey: AttributeValue]?)`
: Sets a closure to provide custom attributes for intercepted resources. The `provider` closure is called for each resource collected by the RUM iOS SDK. This closure is called with task information and may return custom resource attributes or `nil` if no attributes should be attached.

### Logging configuration

`enableLogging(_ enabled: Bool)`
: Enables or disables the Logging feature.

### Tracing configuration

`enableTracing(_ enabled: Bool)`
: Enables or disables the Tracing feature.

`setSpanEventMapper(_ mapper: @escaping (SpanEvent) -> SpanEvent)`
: Sets the data scrubbing callback for spans. This can be used to modify or drop span events before they are sent to Datadog.

### Automatically track views

To automatically track views (`UIViewControllers`), use the `.trackUIKitRUMViews()` option when configuring the RUM iOS SDK. By default, views are named with the view controller's class name. To customize it, use `.trackUIKitRUMViews(using: predicate)` and provide your own implementation of the `predicate` which conforms to `UIKitRUMViewsPredicate` protocol:

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

To automatically track user tap actions, use the `.trackUIKitActions()` option when configuring the RUM iOS SDK.

### Automatically track network requests

To automatically track resources (network requests) and get their timing information such as time to first byte or DNS resolution, use the `.trackURLSession()` option when configuring the RUM iOS SDK and set `DDURLSessionDelegate` for the `URLSession` that you want to monitor:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[DDNSURLSessionDelegate alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

Also, you can configure first party hosts using `.trackURLSession(firstPartyHosts:)`. This classifies resources that match the given domain as "first party" in RUM and propagates tracing information to your backend (if you have enabled Tracing). Network traces are sampled with an adjustable sampling rate. A sampling of 20% is applied by default.

For instance, you can configure `example.com` as the first party host and enable both RUM and Tracing features:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .trackUIKitRUMViews()
        .trackURLSession(firstPartyHosts: ["example.com"])
        .set(tracingSamplingRate: 20)
        .build()
)

Global.rum = RUMMonitor.initialize()
Global.sharedTracer = Tracer.initialize()

let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```

This tracks all requests sent with the instrumented `session`. Requests matching the `example.com` domain are marked as "first party" and tracing information is sent to your backend to [connect the RUM resource with its Trace][1].

[1]: https://docs.datadoghq.com/real_user_monitoring/connect_rum_and_traces?tab=browserrum

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];

// ...
[builder trackUIKitRUMViews];
[builder trackURLSessionWithFirstPartyHosts:[NSSet setWithArray:@[@"example.com"]]];
[builder setWithTracingSamplingRate:20];

DDGlobal.rum = [[DDRUMMonitor alloc] init];
DDGlobal.sharedTracer = [[DDTracer alloc] initWithConfiguration:[DDTracerConfiguration new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}

To add custom attributes to resources, use the `.setRUMResourceAttributesProvider(_ :)` option when configuring the RUM iOS SDK. By setting attributes provider closure, you can return additional attributes to be attached to tracked resource. 

For instance, you may want to add HTTP request and response headers to the RUM resource:

```swift
.setRUMResourceAttributesProvider { request, response, data, error in
    return [
        "request.headers" : redactedHeaders(from: request),
        "response.headers" : redactedHeaders(from: response)
    ]
}
```

### Automatically track errors

All "error" and "critical" logs sent with `Logger` are automatically reported as RUM errors and linked to the current RUM view:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let logger = Logger.builder.build()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDLogger *logger = [[DDLogger builder] build];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

Similarly, all finished spans marked as error are reported as RUM errors:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = Global.sharedTracer.startSpan(operationName: "operation")
// ... capture the `error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// ... capture the `error`
id<OTSpan> span = [DDGlobal.sharedTracer startSpan:@"operation"];
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
Datadog.Configuration
    .builderUsing(...)
    .setRUMViewEventMapper { viewEvent in 
        return viewEvent
    }
    .setRUMErrorEventMapper { errorEvent in
        return errorEvent
    }
    .setRUMResourceEventMapper { resourceEvent in
        return resourceEvent
    }
    .setRUMActionEventMapper { actionEvent in
        return actionEvent
    }
    .setRUMLongTaskEventMapper { longTaskEvent in
        return longTaskEvent
    }
    .build()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];

[builder setRUMViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull viewEvent) {
    return viewEvent;
}];

[builder setRUMErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull errorEvent) {
    return errorEvent;
}];

[builder setRUMResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    return resourceEvent;
}];

[builder setRUMActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull actionEvent) {
    return actionEvent;
}];

[builder setRUMLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull longTaskEvent) {
    return longTaskEvent;
}];

[builder build];
```
{{% /tab %}}
{{< /tabs >}}

Each mapper is a Swift closure with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent. 

For example, to redact sensitive information in a RUM Resource's `url`, implement a custom `redacted(_:) -> String` function and use it in `RUMResourceEventMapper`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
.setRUMResourceEventMapper { resourceEvent in
    var resourceEvent = resourceEvent
    resourceEvent.resource.url = redacted(resourceEvent.resource.url)
    return resourceEvent
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[builder setRUMResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    resourceEvent.resource.url = redacted(resourceEvent.resource.url);
    return resourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

Returning `nil` from the error, resource, or action mapper drops the event entirely; the event is not sent to Datadog. The value returned from the view event mapper must not be `nil` (to drop views, customize your implementation of `UIKitRUMViewsPredicate`; read more in [tracking views automatically](#automatically-track-views)).

Depending on the event's type, only some specific properties can be modified:

| Event Type       | Attribute key                     | Description                             |
|------------------|-----------------------------------|-----------------------------------------|
| RUMViewEvent     | `viewEvent.view.name`             | Name of the view.                        |
|                  | `viewEvent.view.url`              | URL of the view.                         |
| RUMActionEvent   | `actionEvent.action.target?.name` | Name of the action.                      |
|                  | `actionEvent.view.url`            | URL of the view linked to this action.   |
| RUMErrorEvent    | `errorEvent.error.message`        | Error message.                           |
|                  | `errorEvent.error.stack`          | Stacktrace of the error.                 |
|                  | `errorEvent.error.resource?.url`  | URL of the resource the error refers to. |
|                  | `errorEvent.view.url`             | URL of the view linked to this error.    |
| RUMResourceEvent | `resourceEvent.resource.url`      | URL of the resource.                     |
|                  | `resourceEvent.view.url`          | URL of the view linked to this resource. |

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

## Sample RUM sessions

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM iOS SDK][1] as a percentage between 0 and 100.

For example, to only keep 50% of sessions use:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .set(rumSessionsSamplingRate: 50.0)
        // ...
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];

// ...
[builder setWithRumSessionsSamplingRate:50];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}

## Sending data when device is offline

RUM ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the RUM iOS SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically discarded if it gets too old to ensure the RUM iOS SDK does not use too much disk space.

## Configuring a custom proxy for Datadog data upload

If your app is running on devices behind a custom proxy, you can inform the RUM iOS SDK's data uploader to ensure that all tracked data is uploaded with the relevant configuration. 

When initializing the RUM iOS SDK, specify this in your proxy configuration.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .set(proxyConfiguration: [
            kCFNetworkProxiesHTTPEnable: true, 
            kCFNetworkProxiesHTTPPort: 123, 
            kCFNetworkProxiesHTTPProxy: "www.example.com", 
            kCFProxyUsernameKey: "proxyuser", 
            kCFProxyPasswordKey: "proxypass" 
        ])
        // ...
        .build()
)
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];

// ...
[builder setWithProxyConfiguration:@{
    (NSString *)kCFNetworkProxiesHTTPEnable: @YES,
    (NSString *)kCFNetworkProxiesHTTPPort: @123,
    (NSString *)kCFNetworkProxiesHTTPProxy: @"www.example.com",
    (NSString *)kCFProxyUsernameKey: @"proxyuser",
    (NSString *)kCFProxyPasswordKey: @"proxypass"
}];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}

For more information, see the [URLSessionConfiguration.connectionProxyDictionary][8] documentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/real_user_monitoring/ios
[3]: https://docs.datadoghq.com/real_user_monitoring/ios/data_collected
[4]: https://docs.datadoghq.com/real_user_monitoring/explorer/search/#setup-facets-and-measures
[5]: https://docs.datadoghq.com/real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: https://docs.datadoghq.com/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[7]: https://docs.datadoghq.com/real_user_monitoring/ios/data_collected?tab=session#default-attributes
[8]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary
[9]: https://github.com/DataDog/dd-sdk-ios/blob/master/Sources/Datadog/DDRUMMonitor.swift
