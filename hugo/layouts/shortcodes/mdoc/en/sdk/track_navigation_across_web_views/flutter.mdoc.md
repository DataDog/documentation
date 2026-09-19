Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid mobile applications. You can track user journeys across web and native components, scope the root cause of latency to web pages or native components, and support users that have difficulty loading web pages on mobile devices.

You can also record the entire user journey across both web and native views and watch it in a single Session Replay. See [Web View Instrumentation][1] to learn more.

### Prerequisites

Set up the RUM Browser SDK on the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][2].

### Instrument your web views

The RUM Flutter SDK provides APIs for you to control web view tracking when using the [`webview_flutter`][3] or the [`flutter_inappwebview`][4] package.

#### Web view Flutter package (`webview_flutter`)

To add Web View Tracking when using `webview_flutter`, add the following to your `pubspec.yaml` with the most recent version of the [`datadog_webview_tracking`][5] plugin:

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

`JavaScriptMode.unrestricted` is required for tracking to work on Android. `allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.

#### Flutter InAppWebView package

To add Web View Tracking when using `flutter_inappwebview`, add the following to your `pubspec.yaml` with the most recent version of the [`datadog_inappwebview_tracking`][6] plugin:

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

### Access your web views

Your web views appear in the [RUM Explorer][7] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform.

To access your web views:

1. Navigate to {% ui %}Digital Experiences{% /ui %} > {% ui %}Real User Monitoring{% /ui %} > {% ui %}(Sessions) Explorer{% /ui %}.
2. Create a query to filter on the following:
   - Your Flutter applications using either `application.id` or `application.name`
   - The web component using `service`
   - The platform using `source`

   **Note**: If you see unrecognized version numbers reporting in your mobile app, they might belong to the Browser SDK version. In that case, you can filter out the Browser platform session, for example, `source: flutter`.
3. Click a session. A side panel with a list of events in the session appears. Any service with the web icon indicates a web view.

From here, you can hover over a session event and click {% ui %}Open View waterfall{% /ui %} to navigate from the session to a resource waterfall visualization in the view's {% ui %}Performance{% /ui %} tab.

### Billing implications

See [RUM & Session Replay Billing][8] for details on how web views in mobile applications impact session recordings and billing.

[1]: /session_replay/setup_and_configuration/#web-view-instrumentation
[2]: /real_user_monitoring/application_monitoring/browser/setup/#npm
[3]: https://pub.dev/packages/webview_flutter
[4]: https://pub.dev/packages/flutter_inappwebview
[5]: https://pub.dev/packages/datadog_webview_tracking
[6]: https://pub.dev/packages/datadog_inappwebview_tracking
[7]: https://app.datadoghq.com/rum/explorer
[8]: /account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing
