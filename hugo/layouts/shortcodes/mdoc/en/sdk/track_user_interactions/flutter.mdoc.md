## Automatically track actions

Use [`RumUserActionDetector`][2] to track user taps that happen in a given Widget tree:

```dart
RumUserActionDetector(
  rum: DatadogSdk.instance.rum,
  child: Scaffold(
    appBar: AppBar(
      title: const Text('RUM'),
    ),
    body: // Rest of your application
  ),
);
```

`RumUserActionDetector` automatically detects tap user actions that occur in its tree and sends them to RUM. It detects interactions with several common Flutter widgets.

For most Button types, the detector looks for a `Text` widget child, which it uses for the description of the action. In other cases it looks for a `Semantics` object child, or an `Icon` with its `Icon.semanticsLabel` property set.

Alternatively, you can enclose any Widget tree with a [`RumUserActionAnnotation`][3], which uses the provided description when reporting user actions detected in the child tree, without changing the Semantics of the tree.

## Custom actions

You can also track specific user actions such as taps, clicks, and scrolls using `DdRum.addAction`.

To manually register instantaneous RUM actions such as `RumActionType.tap`, use `DdRum.addAction()`. For continuous RUM actions such as `RumActionType.scroll`, use `DdRum.startAction()` or `DdRum.stopAction()`.

For example:

```dart
void _downloadResourceTapped(String resourceName) {
    DatadogSdk.instance.rum?.addAction(
        RumActionType.tap,
        resourceName,
    );
}
```

When using `DdRum.startAction` and `DdRum.stopAction`, the `type` action must be the same for the Datadog Flutter SDK to match an action's start with its completion.

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html
