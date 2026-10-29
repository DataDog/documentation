## Automatically track user interactions

By default, the SDK tracks user interactions with buttons, switches, checkboxes, pickers, and gesture recognizers. `Button` and `ImageButton` taps fire on `Pressed` (not `Clicked`), so the action is recorded against the source view before any navigation triggered by a `Clicked` handler can shift the active view. As a consequence, an abandoned press (finger dragged off the button before release) is recorded as a tap.

To disable automatic action tracking, or to filter or modify automatically tracked actions, configure `DdRumConfiguration`:

```csharp
DdRum.Enable(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",

    // Disable automatic action tracking
    AutomaticActionTracking = false,

    // Or filter or modify auto-tracked actions
    ActionEventMapper = (action) =>
    {
        if (action.Name.Contains("Debug")) return null;  // drop
        return action;
    },
});
```

### Action target naming priority

Action target names are resolved in this order:

1. `AutomationId`
2. `StyleId` (the `x:Name` attribute)
3. The control's type name

Use `ActionEventMapper` to override the resolved name further.

### Known limitation: gesture-driven navigation

`TapGestureRecognizer.Tapped` and `SwipeGestureRecognizer.Swiped` only fire on completion. If a tap or swipe handler triggers a navigation, the resulting action is bucketed under the destination view rather than the source. This applies only to `View`s with explicit gesture recognizers; `Button` and `ImageButton` taps are unaffected.

## Manually track actions and send custom events

You can track specific custom user actions (such as taps, clicks, and scrolls) with `DdRum.AddAction`. For continuous action tracking (for example, a user scrolling a list), use `StartAction` and `StopAction`.

```csharp
// Single-shot action
DdRum.AddAction(RumActionType.Tap, "Login Button");

// Continuous action
DdRum.StartAction(RumActionType.Scroll, "Feed Scroll");
// ... user scrolling ...
DdRum.StopAction(RumActionType.Scroll, "Feed Scroll");
```

For the attributes collected, see [Data Collected][1].

[1]: /real_user_monitoring/setup/data_collected/?platform=maui
