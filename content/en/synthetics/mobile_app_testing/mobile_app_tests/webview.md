---
title: Recording interactions inside Webviews
description: Use Synthetic mobile app testing to capture webview recordings.
private: true
further_reading:
- link: "/synthetics/mobile_app_testing/mobile_app_tests/advanced_options"
  tag: "Documentation"
  text: "Mobile app testing advanced options"
- link: "/synthetics/mobile_app_testing/devices/"
  tag: "Documentation"
  text: "Supported Mobile App testing devices"
---

<div class="alert alert-info">This feature is in Preview. Contact your Datadog representative to enable webview mode recording.</div>

## Overview

Some mobile apps embed web content using WebViews (for example, in-app checkouts, login pages, or help centers). Use webview mode to locate and assert on elements inside these embedded webviews, in addition to native UI elements.

When a webview is detected during a mobile app test recording, you can toggle on webview recording mode to capture interactions within the webview. Steps recorded in webview mode display a "WebView" tag in the step list, while the rest of the recording experience remains unchanged.

### Prerequisites

Some applications may require adding a debugging statement (`isInspectable = true`) for the recorder to consistently detect webviews on devices running iOS 16.4 and later. 
See the **iOS** [Apple documentation][1] for more information.

### Recording with webview mode

1. Create a Mobile application test for an application that contains webview pages.
2. While recording your steps, if a webview is detected, a toggle to switch to webview mode appears. Click **Webview mode** to switch recording modes.
3. In webview mode, record steps the same way you would for a browser test.
4. Toggle back to **Native mode** when you're done recording webview steps.

   {{< img src="mobile_app_testing/test_steps/webview.mp4" alt="Mobile app recording of a user clicking on webview, and then opening a Wikipedia to activate the webview toggle." video=true >}}

[1]: https://developer.apple.com/documentation/safari-developer-tools/enabling-inspecting-content-in-your-apps

## Further reading

{{< partial name="whats-next/whats-next.html" >}}