## Custom views

The C++ SDK does not automatically instrument your application, so views must be tracked manually. A RUM session is organized into views, where each view represents a distinct user-facing screen, scene, or state in your application. All actions, resources, and errors are associated with the current view.

Each view has a string `key` that uniquely identifies it within your application. An optional `name` provides a human-readable label in the Datadog UI; if omitted, `name` defaults to the value of `key`. Only one view is active at a time: `StartView` implicitly stops the previous view.

{% tabs %}
{% tab label="C++" %}

```cpp
// Begin tracking the main menu
rum->StartView("main_menu", "Main Menu");

// Transition to a gameplay view — implicitly stops "main_menu"
rum->StartView("gameplay_level1", "Level 1");

// Explicitly stop a view
rum->StopView("gameplay_level1");
```

{% /tab %}
{% tab label="C" %}

```c
/* Begin tracking the main menu */
dd_rum_start_view(rum, "main_menu", "Main Menu", NULL);

/* Transition to a gameplay view — implicitly stops "main_menu" */
dd_rum_start_view(rum, "gameplay_level1", "Level 1", NULL);

/* Explicitly stop a view */
dd_rum_stop_view(rum, "gameplay_level1", NULL);
```

{% /tab %}
{% /tabs %}

For more advanced configuration options, see [Advanced Configuration][1].

[1]: /real_user_monitoring/application_monitoring/cpp/advanced_configuration/#track-views
