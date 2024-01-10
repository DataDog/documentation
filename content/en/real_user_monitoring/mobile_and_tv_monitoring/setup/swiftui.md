---
title: RUM SwiftUI
kind: documentation
beta: true
description: "Use RUM to instrument your SwiftUI applications."
aliases:
  - /real_user_monitoring/ios/swiftui/
  - /real_user_monitoring/swiftui/
code_lang: swiftui
type: multi-code-lang
code_lang_weight: 20
further_reading:
 - link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
   tag: Documentation
   text: RUM iOS Advanced Configuration
 - link: "https://github.com/DataDog/dd-sdk-ios"
   tag: "Github"
   text: "Source code for dd-sdk-ios"
 - link: "/real_user_monitoring"
   tag: "Documentation"
   text: "Learn how to explore your RUM data"
 - link: "/real_user_monitoring/error_tracking/ios/"
   tag: "Documentation"
   text: "Learn how to track iOS errors"
 - link: "/real_user_monitoring/ios/swiftui/"
   tag: "Documentation"
   text: "Learn about instrumenting SwiftUI applications"
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
import DatadogRUM

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
import DatadogRUM

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

