---
title: Web View Tracking
description: "Track web views across mobile and TV platforms including Android, iOS, Flutter, React Native, and Roku for hybrid app monitoring."
aliases:
  - /real_user_monitoring/android/web_view_tracking
  - /real_user_monitoring/ios/web_view_tracking
  - /real_user_monitoring/flutter/web_view_tracking
  - /real_user_monitoring/reactnative/web_view_tracking
  - /real_user_monitoring/kotlin-multiplatform/web_view_tracking
  - /real_user_monitoring/kotlin_multiplatform/web_view_tracking
  - /real_user_monitoring/mobile_and_tv_monitoring/unity/web_view_tracking
further_reading:
  - link: https://github.com/DataDog/dd-sdk-android
    tag: "Source Code"
    text: Source code for dd-sdk-android
  - link: https://github.com/DataDog/dd-sdk-ios
    tag: "Source Code"
    text: Source code for dd-sdk-ios
  - link: https://github.com/DataDog/dd-sdk-flutter
    tag: "Source Code"
    text: Source code for dd-sdk-flutter
  - link: https://github.com/DataDog/dd-sdk-reactnative
    tag: "Source Code"
    text: Source code for dd-sdk-reactnative
  - link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
    tag: "Source Code"
    text: Source code for dd-sdk-kotlin-multiplatform
  - link: /real_user_monitoring
    tag: Documentation
    text: Explore Datadog RUM
  - link: /session_replay/mobile/setup_and_configuration#web-view-instrumentation
    tag: Documentation
    text: Web View Instrumentation
---

## Overview

Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid mobile applications.

You can perform the following:

- Track user journeys across web and native components in mobile applications
- Scope the root cause of latency to web pages or native components in mobile applications
- Support users that have difficulty loading web pages on mobile devices

You can also record the entire user journey across both web and native views on iOS or Android and watch it in a single Session Replay. Learn how to [instrument consolidated browser and mobile web views][1].

## Setup

### Prerequisites

Set up the RUM Browser SDK on the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][2].

### Declare `DatadogWebViewTracking` as a dependency (iOS or Kotlin Multiplatform only)

{{< tabs >}}
{{% tab "Android" %}}

Set up the RUM Browser SDK for the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][1].

[1]: /real_user_monitoring/application_monitoring/browser/setup/#npm

{{% /tab %}}
{{% tab "iOS" %}}

Set up the RUM Browser SDK for the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][1].

1. Make sure to also enable [RUM][2] and/or [Logs][3].
2. Add the `DatadogWebViewTracking` library according to your dependency manager.
3. Update your initialization snippet by declaring `DatadogWebViewTracking` as a dependency, as shown below.

{{% collapse-content title="CocoaPods" level="h4" %}}
You can use [CocoaPods][1] to install `dd-sdk-ios`:
```
pod 'DatadogWebViewTracking'
```

[1]: https://cocoapods.org/
{{% /collapse-content %}}

{{% collapse-content title="Swift Package Manager (SPM)" level="h4" %}}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

In your project, link the following libraries:
```
DatadogCore
DatadogWebViewTracking
```
{{% /collapse-content %}}

{{% collapse-content title="Carthage" level="h4" %}}

You can use [Carthage][1] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

In Xcode, link the following frameworks:
```
DatadogWebViewTracking.xcframework
```

[1]: https://github.com/Carthage/Carthage
{{% /collapse-content %}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/#npm
[2]: /real_user_monitoring/application_monitoring/ios/
[3]: https://docs.datadoghq.com/logs/log_collection/ios

{{% /tab %}}
{{% tab "Flutter" %}}

Set up the RUM Browser SDK on the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][1].

[1]: /real_user_monitoring/application_monitoring/browser/setup/#npm

{{% /tab %}}
{{% tab "React Native" %}}

Set up the RUM Browser SDK on the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][1].

[1]: /real_user_monitoring/application_monitoring/browser/setup/#npm

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

Add `DatadogWebViewTracking` library to your application by following the guide [here][1].

[1]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/#add-native-dependencies-for-ios

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

**Note**:
In order for instrumentation to work on the WebView component, it is very important that the JavaScript is enabled on the WebView. To enable it, you can use the following code snippet:

```kotlin
webView.settings.javaScriptEnabled = true
```

[1]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[2]: /real_user_monitoring/application_monitoring/android/?tab=kotlin#setup
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[4]: /logs/log_collection/android/?tab=kotlin#setup

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

The RUM Flutter SDK provides APIs for you to control web view tracking when the [`webview_flutter`][1] or the [`flutter_inappwebview`][2] package.

#### Web view Flutter package

To add Web View Tracking when using `webview_flutter`, add the following to your `pubspec.yaml` with the most recent version of the [`datadog_webview_tracking`][3] plugin:
```yaml
dependencies:
  datadog_webview_tracking: ^x.x.x
```

Then, call the `trackDatadogEvents` extension method on `WebViewController`, providing the list of allowed hosts.

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

#### Flutter InAppWebView package

To add Web View Tracking when using `flutter_inappwebview`, add the following to your `pubspec.yaml` with the most recent version of the [`datadog_inappwebview_tracking`][4] plugin:
```yaml
dependencies:
  datadog_webview_tracking: ^x.x.x
```

To instrument an `InAppWebView`, add the `DatadogInAppWebViewUserScript` to your `initialUserScripts`, and call the `trackDatadogEvents` extension method during the `onWebViewCreated` callback:

```dart
InAppWebView(
  // Other settings...
  initialUserScripts: UnmodifiableListView([
    DatadogInAppWebViewUserScript(
      datadog: DatadogSdk.instance,
      allowedHosts: {'shopist.io'},
    ),
  ]),
  onWebViewCreated: (controller) async {
    controller.trackDatadogEvents(DatadogSdk.instance);
  },
)
```

To instrument an `InAppBrowser`, add an override for `onBrowserCreated` and call the `trackDatadogEvents` extension method on `webViewController`, then add a `DatadogInAppWebViewUserScript` to the `initialUserScripts` when creating your custom `InAppBrowser`:

```dart
class MyInAppBrowser extends InAppBrowser {
  MyInAppBrowser({super.windowId, super.initialUserScripts});

  @override
  void onBrowserCreated() {
    webViewController?.trackDatadogEvents(DatadogSdk.instance);
    super.onBrowserCreated();
  }
}

// Browser creation
_browser = MyInAppBrowser(
  initialUserScripts: UnmodifiableListView(
    [
      DatadogInAppWebViewUserScript(
        datadog: DatadogSdk.instance,
        allowedHosts: {'shopist.io'},
      ),
    ],
  ),
);
```

The `allowedHosts` parameter of `DatadogInAppWebViewUserScript` matches the given hosts and their subdomain. No regular expression is allowed.

[1]: https://pub.dev/packages/webview_flutter
[2]: https://pub.dev/packages/flutter_inappwebview
[3]: https://pub.dev/packages/datadog_webview_tracking
[4]: https://pub.dev/packages/datadog_inappwebview_tracking

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
{{% tab "Kotlin Multiplatform" %}}

1. If you want to forward RUM events coming from web pages, download the [latest version][1] of the RUM Kotlin Multiplatform SDK and set up RUM by following the [dedicated guide][2].
2. If you want to forward log events coming from web pages, download the [latest version][3] of the Logs Kotlin Multiplatform SDK and set up logs by following the [dedicated guide][4].
3. Add the Gradle dependency for the common source set by declaring the `dd-sdk-kotlin-multiplatform-webview` library as a dependency in the module-level `build.gradle.kts` file:

    ```kotlin
    kotlin {
      // ...
      sourceSets {
        commonMain.dependencies {
          implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-webview:x.x.x")
        }
      }
    }
    ```

4. Enable tracking for web views with the following code snippet:

   ```kotlin
   // call it in Android or iOS source set, not in the common one
   WebViewTracking.enable(webView, allowedHosts)
   ```

5. Disable tracking of web views once web view instance can be released (iOS only):

   ```kotlin
   // call it in iOS source set, not in the common one
   WebViewTracking.disable(webView, allowedHosts)
   ```

`allowedHosts` matches the given hosts and their subdomain. No regular expressions are allowed.

[1]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-rum
[2]: /real_user_monitoring/kotlin_multiplatform/#setup
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-logs
[4]: /logs/log_collection/kotlin_multiplatform/#setup

{{% /tab %}}
{{< /tabs >}}

### Access your web views

Your web views appear in the [RUM Explorer][5] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform, such as Android.

To access your web views:

1. Navigate to **Digital Experiences > Real User Monitoring > (Sessions) Explorer**.
2. Create a query to filter on the following:
   - Your Android and Android TV applications using either `application.id` or `application.name`
   - The web component using `service`
   - The platform using `source`

   **Note**: If you see unrecognized version numbers reporting in your mobile app, they may belong to the Browser SDK version. In that case, you can filter out the Browser platform session. For example, `source: react-native`.
3. Click a session. A side panel with a list of events in the session appears.

   {{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="Webview events captured in a session in the RUM Explorer" style="width:100%;">}}

   Any service with the web icon indicates a webview.

From here, you can hover over a session event and click **Open View waterfall** to navigate from the session to a resource waterfall visualization in the view's **Performance** tab.

## Billing implications

See [RUM & Session Replay Billing][6] for details on how web views in mobile applications impact session recordings and billing.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /session_replay/mobile/setup_and_configuration/#web-view-instrumentation
[2]: /real_user_monitoring/application_monitoring/browser/setup/#npm
[3]: /real_user_monitoring/application_monitoring/ios/setup
[4]: /logs/log_collection/ios
[5]: https://app.datadoghq.com/rum/explorer
[6]: /account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing
