iOS RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collection documentation][1] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Custom views

For setup steps covering both automatic and manual view tracking, see [Track navigation][2].

In addition to [tracking views automatically][3], you can also track specific distinct views such as `viewControllers` when they become visible and interactive. Stop tracking when the view is no longer visible using the following methods in `RUMMonitor.shared()`:

- `.startView(viewController:)`
- `.stopView(viewController:)`

For example:

{% tabs %}
{% tab label="Swift" %}

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

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogRUM;
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

{% /tab %}
{% /tabs %}

For more details and available options, see [`RUMMonitorProtocol` in GitHub][4].

### Custom actions

For setup steps covering both automatic and manual action tracking, see [Track user interactions][5].

In addition to [tracking actions automatically][6], you can track specific custom user actions (taps, clicks, and scrolls) with the `addAction(type:name:)` API.

To manually register instantaneous RUM actions such as `.tap` on `RUMMonitor.shared()`, use `.addAction(type:name:)`. For continuous RUM actions such as `.scroll`, use `.startAction(type:name:)` or `.stopAction(type:)`.

For example:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogRUM

// in your `UIViewController`:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? ""
    )
}
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```

{% /tab %}
{% /tabs %}

**Note**: When using `.startAction(type:name:)` and `.stopAction(type:)`, the action `type` must be the same. This is necessary for the RUM iOS SDK to match an action start with its completion.

For more details and available options, see [`RUMMonitorProtocol` in GitHub][4].

### Custom resources

For setup steps covering both automatic and manual resource tracking, see [Track network requests][7].

In addition to [tracking resources automatically][8], you can also track specific custom resources such as network requests or third-party provider APIs. This is the recommended approach for third-party libraries that don't expose a `URLSession` delegate. Use the following methods on `RUMMonitor.shared()` to manually collect RUM resources:

- `.startResource(resourceKey:request:)`
- `.stopResource(resourceKey:response:)`
- `.stopResourceWithError(resourceKey:error:)`
- `.stopResourceWithError(resourceKey:message:)`

For example:

{% tabs %}
{% tab label="Swift" %}

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

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
// in your network client:

[[DDRUMMonitor shared] startResourceWithResourceKey:@"resource-key"
                                            request:request
                                         attributes:@{}];

[[DDRUMMonitor shared] stopResourceWithResourceKey:@"resource-key"
                                          response:response
                                        attributes:@{}];
```

{% /tab %}
{% /tabs %}

**Note**: The `String` used for `resourceKey` in both calls must be unique for the resource you are calling. This is necessary for the RUM iOS SDK to match a resource's start with its completion.

For more details and available options, see [`RUMMonitorProtocol` in GitHub][4].

### Custom errors

To track specific errors, notify `RUMMonitor.shared()` when an error occurs using one of following methods:

- `.addError(message:)`
- `.addError(error:)`

{% tabs %}
{% tab label="Swift" %}

```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```

{% /tab %}
{% /tabs %}

For more details and available options, see [`RUMMonitorProtocol` in GitHub][4] and the [Error Attributes documentation][9].

[1]: /real_user_monitoring/setup/data_collected/?platform=ios
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=ios
[3]: /real_user_monitoring/application_monitoring/ios/advanced_configuration/#automatically-track-views
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[5]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=ios
[6]: /real_user_monitoring/application_monitoring/ios/advanced_configuration/#automatically-track-user-actions
[7]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=ios
[8]: /real_user_monitoring/application_monitoring/ios/advanced_configuration/#automatically-track-network-requests
[9]: /real_user_monitoring/setup/data_collected/?platform=ios&tab=error#error-attributes
