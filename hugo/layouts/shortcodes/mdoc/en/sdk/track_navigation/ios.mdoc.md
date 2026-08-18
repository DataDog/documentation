### Custom views

In addition to [tracking views automatically](#automatically-track-views), you can also track specific distinct views such as `viewControllers` when they become visible and interactive. Stop tracking when the view is no longer visible using the following methods in `RUMMonitor.shared()`:

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

### Automatically track views

You can automatically track views with UIKit and SwiftUI.

#### UIKit

To automatically track views (`UIViewControllers`), use the `uiKitViewsPredicate` option when enabling RUM. By default, views are named with the view controller's class name. To customize it, provide your own implementation of the `predicate` which conforms to `UIKitRUMViewsPredicate` protocol:

{% tabs %}
{% tab label="Swift" %}

```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```

{% /tab %}
{% tab label="Objective-C" %}

```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```

{% /tab %}
{% /tabs %}

Inside the `rumView(for:)` implementation, your app should decide if a given `UIViewController` instance should start a RUM view (return a value) or not (return `nil`). The returned `RUMView` value must specify the `name` and may provide additional `attributes` for the created RUM view.

For instance, you can configure the predicate to use explicit type check for each view controller in your app:

{% tabs %}
{% tab label="Swift" %}

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

{% /tab %}
{% tab label="Objective-C" %}

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

{% /tab %}
{% /tabs %}

You can even come up with a more dynamic solution depending on your app's architecture.

For example, if your view controllers use `accessibilityLabel` consistently, you can name views by the value of accessibility label:

{% tabs %}
{% tab label="Swift" %}

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

{% /tab %}
{% tab label="Objective-C" %}

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

{% /tab %}
{% /tabs %}

**Note**: The RUM iOS SDK calls `rumView(for:)` many times while your app is running. Datadog recommends keeping its implementation fast and single-threaded.

#### SwiftUI

To automatically track views with SwiftUI, use the `swiftUIViewsPredicate` option when enabling RUM.

The mechanism to extract a SwiftUI view name relies on reflection. As a result, view names may not always be meaningful. If a meaningful name cannot be extracted, a generic name such as `AutoTracked_HostingController_Fallback` or `AutoTracked_NavigationStackController_Fallback` is used.

You can use the default predicate (`DefaultSwiftUIRUMViewsPredicate`) or provide your own implementation of the `SwiftUIRUMViewsPredicate` protocol to customize or filter view names.

{% tabs %}
{% tab label="Swift" %}

```swift
public protocol SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView?
}

// Example: Custom predicate to ignore fallback names and rename views
class CustomSwiftUIPredicate: SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView? {
        if extractedViewName == "AutoTracked_HostingController_Fallback" ||
           extractedViewName == "AutoTracked_NavigationStackController_Fallback" {
            return nil // Ignore fallback names
        }
        if extractedViewName == "MySpecialView" {
            return RUMView(name: "Special")
        }
        return RUMView(name: extractedViewName)
    }
}
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@protocol DDSwiftUIRUMViewsPredicate <NSObject>
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName;
@end

@interface CustomSwiftUIPredicate : NSObject <DDSwiftUIRUMViewsPredicate>
@end

@implementation CustomSwiftUIPredicate
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName {
    if ([extractedViewName isEqualToString:@"AutoTracked_HostingController_Fallback"] ||
        [extractedViewName isEqualToString:@"AutoTracked_NavigationStackController_Fallback"]) {
        return nil; // Ignore fallback names
    }
    if ([extractedViewName isEqualToString:@"MySpecialView"]) {
        return [[DDRUMView alloc] initWithName:@"Special" attributes:@{}];
    }
    return [[DDRUMView alloc] initWithName:extractedViewName attributes:@{}];
}
@end
```

{% /tab %}
{% /tabs %}

**Notes:**
- Datadog recommends enabling UIKit view tracking as well, even if your app is built entirely with SwiftUI.
- Tab bars are not tracked automatically. Use [manual tracking](#custom-views) for each tab view to track them.
- If you use both automatic and manual tracking, you may see duplicate events. To avoid this, rely on a single instrumentation method or use a custom predicate to filter out duplicates.

[1]: https://app.datadoghq.com/rum/application/create
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
