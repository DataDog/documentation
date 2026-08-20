## Automatically track user interactions

To enable automatic click tracking, set `trackUserInteractions: true` in your SDK initialization:

```javascript
window.DD_RUM.init({
    ...
    trackUserInteractions: true,
});
```

The RUM Browser SDK automatically tracks clicks to generate click actions. A one-click action generally represents one user click, except when the same element is clicked multiple times in a row, which is considered a single action.

## Manage information being collected

When user interaction tracking is enabled, sensitive and private data contained in your pages might be included to identify elements that a user interacted with.

To control which information is sent to Datadog, [mask action names with privacy options][1], [manually set an action name](#declare-a-name-for-click-actions), or implement a global scrubbing rule in the Datadog Browser SDK for RUM.

## Declare a name for click actions

The Datadog Browser SDK for RUM uses various strategies to get a name for click actions. For more control, define a `data-dd-action-name` attribute on clickable elements (or any of their parents) that's used to name the action.

For example:

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Try it out!</a>
```

With the `actionNameAttribute` initialization parameter, you can specify a custom attribute that's used to name the action instead.

## Send custom actions

To extend the collection of user interactions, send your custom actions using the `addAction` API. These custom actions send information relative to an event that occurs during a user journey.

For more information, see [Send Custom Actions][2].

For details on action attributes, telemetry, limits, and sampling, see [Tracking User Actions][3].

[1]: /data_security/real_user_monitoring/#mask-action-names
[2]: /real_user_monitoring/guide/send-rum-custom-actions
[3]: /real_user_monitoring/application_monitoring/browser/tracking_user_actions/
