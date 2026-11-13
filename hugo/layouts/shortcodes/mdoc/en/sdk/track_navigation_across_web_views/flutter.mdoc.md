## Instrument your web views

The RUM Flutter SDK provides APIs for you to control web view tracking when using the [`webview_flutter`][1] or the [`flutter_inappwebview`][2] package.

### Web view Flutter package (`webview_flutter`)

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

`JavaScriptMode.unrestricted` is required for tracking to work on Android. `allowedHosts` matches the given hosts and their subdomain. No regular expression is allowed.

### Flutter InAppWebView package

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
