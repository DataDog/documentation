### Custom actions

In addition to [tracking actions automatically](#automatically-track-user-actions), you can track specific custom user actions (taps, clicks, and scrolls) with the `addAction(type:name:)` API.

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

### Automatically track user actions

#### UIKit

To automatically track user tap actions with UIKit, set the `uiKitActionsPredicate` option when enabling RUM.

#### SwiftUI

To automatically track user tap actions in SwiftUI, enable the `swiftUIActionsPredicate` option when enabling RUM.

**Notes:**
- Datadog recommends enabling UIKit action tracking as well even for pure SwiftUI apps as many interactive components rely on UIKit internally.
- On tvOS, only press interactions on the remote are tracked. Only a UIKit predicate is needed for this. If you have a pure SwiftUI app but want to track remote presses on tvOS, you should also enable UIKit instrumentation.
- The implementation differs between iOS 18+ and iOS 17 and below:
  - **iOS 18 and above:** Most interactions are reliably tracked with correct component names (for example, `SwiftUI_Button`, `SwiftUI_NavigationLink`).
  - **iOS 17 and below:** The SDK cannot distinguish between interactive and non-interactive components (for example, Button vs. Label). For that reason, actions are reported as `SwiftUI_Unidentified_Element`.
- If you use both automatic and manual tracking, you may see duplicate events. This is a known limitation. To avoid this, use only one instrumentation type - either automatic or manual.
- You can use the default predicate, `DefaultSwiftUIRUMActionsPredicate`, or provide your own to filter or rename actions. You can also disable legacy detection (iOS 17 and below) if you only want reliable iOS 18+ tracking:

{% tabs %}
{% tab label="Swift" %}

```swift
// Use the default predicate by disabling iOS 17 and below detection
let predicate = DefaultSwiftUIRUMActionsPredicate(isLegacyDetectionEnabled: false)

// Use your own predicate
class CustomSwiftUIActionsPredicate: SwiftUIRUMActionsPredicate {
    func rumAction(for componentName: String) -> RUMAction? {
        // Custom logic to filter or rename actions
        return RUMAction(name: componentName)
    }
}
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
// Use the default predicate by disabling iOS 17 and below detection
DDDefaultSwiftUIRUMActionsPredicate *swiftUIActionsPredicate = [[DDDefaultSwiftUIRUMActionsPredicate alloc] initWithIsLegacyDetectionEnabled:NO];

// Use your own predicate
@protocol DDSwiftUIRUMActionsPredicate <NSObject>
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName;
@end

@interface CustomSwiftUIActionsPredicate : NSObject <DDSwiftUIRUMActionsPredicate>
@end

@implementation CustomSwiftUIActionsPredicate
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName {
    // Custom logic to filter or rename actions
    return [[DDRUMAction alloc] initWithName:componentName attributes:@{}];
}
@end
```

{% /tab %}
{% /tabs %}

#### Action reporting by iOS version

The table below shows how iOS 17 and iOS 18 report different user interactions.

| **Component**    | **iOS 18 reported name**                          | **iOS 17 reported name**             |
|------------------|---------------------------------------------------|--------------------------------------|
| Button           | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |
| NavigationLink   | NavigationLink                                    | SwiftUI_Unidentified_Element         |
| Menu             | SwiftUI_Menu (and its items as _UIContextMenuCell)| SwiftUI_Menu (and its items as _UIContextMenuCell) |
| Link             | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |

[1]: https://app.datadoghq.com/rum/application/create
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
