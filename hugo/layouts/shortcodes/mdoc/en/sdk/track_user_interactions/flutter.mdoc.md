## Automatically track user interactions

Use [`RumUserActionDetector`][1] to track user taps that happen in a given Widget tree:

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

Alternatively, you can enclose any Widget tree with a [`RumUserActionAnnotation`][2], which uses the provided description when reporting user actions detected in the child tree, without changing the Semantics of the tree.

```dart
Container(
  margin: const EdgeInsets.all(8),
  child: RumUserActionAnnotation(
    description: 'My Image Button',
    child: InkWell(
      onTap: onTap,
      child: Column(
        children: [
          FadeInImage.memoryNetwork(
            placeholder: kTransparentImage,
            image: image,
          ),
          Center(
            child: Text(
              text,
              style: theme.textTheme.headlineSmall,
            ),
          )
        ],
      ),
    ),
  ),
);
```

## Manually track actions and send custom events

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

For the attributes collected for actions, see [Data Collected][3].

[1]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html
[2]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html
[3]: /real_user_monitoring/setup/data_collected/?platform=flutter
