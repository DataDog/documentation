### Track user actions

You can track specific user actions such as taps, clicks, and scrolls using `DdRum.AddAction`.

To manually register instantaneous RUM actions such as `RumActionType.Tap`, use `DdRum.AddAction()`. For continuous RUM actions such as `RumActionType.Scroll`, use `DdRum.StartAction()` or `DdRum.StopAction()`.

For example:

```csharp
void DownloadResourceTapped(string resourceName) {
    DatadogSdk.Instance.Rum.AddAction(
        RumActionType.Tap,
        resourceName,
    );
}
```

When using `DdRum.StartAction` and `DdRum.StopAction`, the `type` action must be the same for the Datadog Unity SDK to match an action's start with its completion.

[1]: https://app.datadoghq.com/rum/application/create
