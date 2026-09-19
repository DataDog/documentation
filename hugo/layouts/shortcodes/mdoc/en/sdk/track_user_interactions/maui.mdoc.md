## Custom actions

You can track specific custom user actions (such as taps, clicks, and scrolls) with `DdRum.AddAction`. For continuous action tracking (for example, a user scrolling a list), use `StartAction` and `StopAction`.

```csharp
// Single-shot action
DdRum.AddAction(RumActionType.Tap, "Login Button");

// Continuous action
DdRum.StartAction(RumActionType.Scroll, "Feed Scroll");
// ... user scrolling ...
DdRum.StopAction(RumActionType.Scroll, "Feed Scroll");
```

## Action target naming priority

Action target names are resolved in this order:

1. `AutomationId`
2. `StyleId` (the `x:Name` attribute)
3. The control's type name

Use `ActionEventMapper` to override the resolved name further.

## Known limitation: gesture-driven navigation

`TapGestureRecognizer.Tapped` and `SwipeGestureRecognizer.Swiped` only fire on completion. If a tap or swipe handler triggers a navigation, the resulting action is bucketed under the destination view rather than the source. This applies only to `View`s with explicit gesture recognizers; `Button` and `ImageButton` taps are unaffected.
