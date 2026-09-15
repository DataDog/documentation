## Custom actions

Actions record user interactions in the context of the current view. The SDK supports two kinds:

- **Discrete actions** (`AddAction`): momentary events such as a button press. No explicit stop is required.
- **Continuous actions** (`StartAction` / `StopAction`): events that span a duration of up to 10 seconds, such as a drag or scroll.

Available action types are `Tap`, `Click`, `Scroll`, `Swipe`, and `Custom`. Only one non-`Custom` action can be active at a time; `AddAction` with type `Custom` is always accepted regardless of other active actions.

{% tabs %}
{% tab label="C++" %}

```cpp
// Record a discrete button tap
rum->AddAction(datadog::RumActionType::Tap, "confirm_button");

// Record the start and end of a scroll
rum->StartAction(datadog::RumActionType::Scroll, "item_list");
// ... user scrolls ...
rum->StopAction(datadog::RumActionType::Scroll);
```

{% /tab %}
{% tab label="C" %}

```c
/* Record a discrete button tap */
dd_rum_add_action(rum, DD_RUM_ACTION_TYPE_TAP, "confirm_button", NULL);

/* Record the start and end of a scroll */
dd_rum_start_action(rum, DD_RUM_ACTION_TYPE_SCROLL, "item_list", NULL);
/* ... user scrolls ... */
dd_rum_stop_action(rum, DD_RUM_ACTION_TYPE_SCROLL, NULL, NULL);
```

{% /tab %}
{% /tabs %}
