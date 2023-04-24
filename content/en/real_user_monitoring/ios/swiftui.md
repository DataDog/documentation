---
title: SwiftUI
kind: documentation
beta: true
description: Use RUM to instrument your SwiftUI applications.
further_reading:
- link: 'https://github.com/DataDog/dd-sdk-ios'
  tag: 'GitHub'
  text: 'dd-sdk-ios Source code'
- link: 'https://docs.datadoghq.com/real_user_monitoring/ios/'
  tag: 'Documentation'
  text: 'Learn about iOS and tvOS Monitoring'
---

## Overview

The Datadog iOS SDK for RUM allows you to instrument views and actions of `SwiftUI` applications. The instrumentation also works with hybrid `UIKit` and `SwiftUI` applications. 

Support for SwiftUI was introduced in the SDK [v1.9.0][1]. 

## Setup

For more information about setup, see [iOS and tvOS Monitoring][2].

### Instrument views

To instrument a `SwiftUI.View`, add the following method to your view declaration:

```swift
import SwiftUI
import Datadog

struct FooView: View {

    var body: some View {
        FooContent {
            ...
        }
        .trackRUMView(name: "Foo")
    }
}
```

The `trackRUMView(name:)` method starts and stops a RUM view when the `SwiftUI` view appears and disappears from the screen.

### Instrument tap actions

To instrument a tap action on a `SwiftUI.View`, add the following method to your view declaration:

```swift
import SwiftUI
import Datadog

struct BarView: View {

    var body: some View {
        Button("BarButton") { {
            ...
        }
        .trackRUMTapAction(name: "Bar")
    }
}
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.9.0
[2]: /real_user_monitoring/ios/#setup