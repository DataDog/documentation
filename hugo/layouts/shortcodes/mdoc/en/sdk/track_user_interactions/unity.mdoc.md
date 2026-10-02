## Automatically track user interactions

The Unity SDK doesn't track user interactions automatically. Track actions manually as described in the following section.

## Manually track actions and send custom events

You can track specific user actions such as taps, clicks, and scrolls.

To register instantaneous RUM actions such as `RumActionType.Tap`, use `AddAction`. For continuous RUM actions such as `RumActionType.Scroll`, use `StartAction` and `StopAction`.

For example:

```csharp
void DownloadResourceTapped(string resourceName) {
    DatadogSdk.Instance.Rum.AddAction(
        RumActionType.Tap,
        resourceName
    );
}
```

When using `StartAction` and `StopAction`, the action `type` must be the same for the Datadog Unity SDK to match an action's start with its completion.

For the attributes collected, see [Data Collected][1].

[1]: /real_user_monitoring/setup/data_collected/?platform=unity
