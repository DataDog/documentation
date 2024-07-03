---
aliases:
- /ja/real_user_monitoring/android/web_view_tracking
- /ja/real_user_monitoring/ios/web_view_tracking
- /ja/real_user_monitoring/flutter/web_view_tracking
- /ja/real_user_monitoring/reactnative/web_view_tracking
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
kind: documentation
title: Web View Tracking
---

## Overview

Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid mobile applications.

You can perform the following:

- Track user journeys across web and native components in mobile applications
- Scope the root cause of latency to web pages or native components in mobile applications
- Support users that have difficulty loading web pages on mobile devices

**Note:** When Web View Tracking is enabled, Browser Session Replay is disabled, no matter how the Browser SDK is configured.

## セットアップ

### Prerequisites

Set up the RUM Browser SDK on the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][1].

### Declare `DatadogWebViewTracking` as a dependency (iOS only)

To enable Crash Reporting, make sure to also enable [RUM][2] and, or [Logs][3]. Then, add the package according to your dependency manager and update your initialization snippet.

{{< tabs >}}
{{% tab "CocoaPods" %}}

You can use [CocoaPods][4] to install `dd-sdk-ios`:
```
pod 'DatadogWebViewTracking'
```

[4]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

In your project, link the following libraries:
```
DatadogCore
DatadogWebViewTracking
```

{{% /tab %}}
{{% tab "Carthage" %}}

You can use [Carthage][5] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

In Xcode, link the following frameworks:
```
DatadogWebViewTracking.xcframework
```

[5]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

### Instrument your web views

{{< tabs >}}
{{% tab "Android" %}}

1. If you want to forward RUM events coming from web pages, download the [latest version][1] of RUM Android SDK and setup RUM feature following the [dedicated guide][2].
2. If you want to forward Log events coming from web pages, download the [latest version][3] of Logs Android SDK and setup Logs feature following the [dedicated guide][4].
3. Add the Gradle dependency by declaring the `dd-sdk-android-webview` library as a dependency in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-webview:x.x.x"
    }
    ```

4. Enable tracking for web views with the following code snippet:

   ```kotlin
     WebViewTracking.enable(webView, allowedHosts)
   ```

`allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.

[1]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[2]: /ja/real_user_monitoring/android/?tab=kotlin#setup
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[4]: /ja/logs/log_collection/android/?tab=kotlin#setup

{{% /tab %}}
{{% tab "iOS" %}}

The RUM iOS SDK provides APIs for you to control web view tracking. To enable Web View Tracking, provide the `WKWebView` instance.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView, hosts: ["example.com"])
```

To disable Web View Tracking:
```swift
WebViewTracking.disable(webView: webView)
```

`allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.

{{% /tab %}}
{{% tab "Flutter" %}}

The RUM Flutter SDK provides APIs for you to control web view tracking when using the [`webview_flutter`][1] package. To add Web View Tracking, call the `trackDatadogEvents` extension method on `WebViewController`, providing the list of allowed hosts.

Add the following to your `pubspec.yaml` with the most recent version of the [`datadog_webview_tracking`][2] plugin:
```yaml
dependencies:
  datadog_webview_tracking: ^x.x.x
```

For example:

```dart
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

webViewController = WebViewController()
  ..setJavaScriptMode(JavaScriptMode.unrestricted)
  ..trackDatadogEvents(
    DatadogSdk.instance,
    ['myapp.example'],
  )
  ..loadRequest(Uri.parse('myapp.example'));
```

Note that `JavaScriptMode.unrestricted` is required for tracking to work on Android.
`allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.


[1]: https://pub.dev/packages/webview_flutter
[2]: https://pub.dev/packages/datadog_webview_tracking

{{% /tab %}}
{{% tab "React Native" %}}

1. Add `react-native-webview` to your application following the [official installation documentation][1].

2. Import `WebView` from `@datadog/mobile-react-native-webview` instead of `react-native-webview`:

   ```javascript
   import { WebView } from '@datadog/mobile-react-native-webview';
   // or
   import WebView from '@datadog/mobile-react-native-webview';
   ```

3. You can use all existing functionalities from `react-native-webview` as the `WebView` component from `@datadog/mobile-react-native-webview` wraps the `react-native-webview` component.

4. Provide the list of hosts to be tracked by Datadog inside the web view by using the `allowedHosts` prop of your `WebView` component:

   ```javascript
   <WebView
       source={{ uri: 'https://www.example.com' }}
       allowedHosts={['example.com']}
   />
   ```

`allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.

[1]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md

{{% /tab %}}
{{< /tabs >}}

### Access your web views

Your web views appear in the [RUM Explorer][1] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform, such as Android.

Filter on your Android and Android TV applications, and click a session. A side panel with a list of events in the session appears.

{{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="Webview events captured in a session in the RUM Explorer" style="width:100%;">}}

Click **Open View waterfall** to navigate from the session to a resource waterfall visualization in the view's **Performance** tab.

[1]: https://app.datadoghq.com/rum/explorer

## Billing implications

See [RUM & Session Replay Billing][4] for details on how webviews in mobile applications impact session recordings and billing.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/setup/#npm
[2]: /ja/real_user_monitoring/ios/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/ios
[4]: /ja/account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing