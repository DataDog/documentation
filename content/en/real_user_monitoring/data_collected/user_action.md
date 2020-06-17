---
title: RUM User Action
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/guide/send-custom-user-actions/"
  tag: "Documentation"
  text: "Learn how to use Custom User Actions"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

## Automatic Collection of User Actions
Real User Monitoring (RUM) SDKs automatically detect user interactions performed during a user journey. Set the `trackInteractions` initialization parameter to `true` to enable this feature.

**Note**:  The trackInteractions initialization parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained on your pages may be included to identify the elements interacted with.

Once an interaction is detected, all new RUM events are attached to the ongoing user action until it is considered as finished. The user action also benefits from its parent view attributes: browser information, geolocation data, [global context][1], etc.

### How is the User Action duration calculated?
Once an interaction is detected, the RUM SDK watches for network requests an DOM mutations. It is considered finished once the page has no activity for more than 100ms (activity being defined as ongoing network requests, or DOM mutations are currently occurring).

## Custom User Actions
Custom User Actions are User Actions declared and sent manually via the [`addUserAction` API][2]. They are useful to send information relative to an event occuring during a user journey: a custom timing, customer cart information, etc.

## Measures Collected

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `duration` | number (ns) | The length of the user action. See how it is calculated in the [User Action documentation][3]. |
| `user_action.measures.long_task_count`        | number      | Count of all long tasks collected for this user action. |
| `user_action.measures.resource_count`         | number      | Count of all resources collected for this user action. |
| `user_action.measures.user_action_count`      | number      | Count of all user actions collected for this user action.|

## Facet Collected

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `user_action.id` | string | UUID of the user action. |
| `user_action.type` | string | Type of the user action. For [Custom User Actions][4], it is set to `custom`. |
| `event.name` | string | Name of the user action. For automatically collected User Actions, the element which the user interacted with. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/installation/advanced_configuration/?tab=npm#add-global-context
[2]: /real_user_monitoring/installation/advanced_configuration/?tab=npm#custom-user-actions
[3]: /real_user_monitoring/data_collected/user_action#how-is-the-user-action-duration-calculated
[4]: /real_user_monitoring/data_collected/user_action#custom-user-actions
