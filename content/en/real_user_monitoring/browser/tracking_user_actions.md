---
title: Tracking User Actions
further_reading:
    - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
      tag: 'Blog'
      text: 'Introducing Datadog Real User Monitoring'
    - link: '/real_user_monitoring/explorer/'
      tag: 'Documentation'
      text: 'Explore your views within Datadog'
    - link: '/real_user_monitoring/explorer/visualize/'
      tag: 'Documentation'
      text: 'Apply visualizations on your events'
    - link: '/real_user_monitoring/platform/dashboards/'
      tag: 'Documentation'
      text: 'Learn about RUM dashboards'
algolia:
  tags: ['user actions']
---

## Overview

Browser Monitoring automatically detects user interactions performed during a user journey and provides insights into your users' behavior without requiring you to manually instrument every single click in your application.

You can accomplish the following objectives:

* Understand the performance of key interactions (for example, a click on the **Add to cart** button)
* Quantify feature adoption
* Identify the steps that led to a specific browser error

While there is no explicit cap on the total number of actions that can be collected by the RUM Browser SDK during a session, there are technical limitations on individual event sizes and the payload sent. For further details about limitations on actions, see [RUM Browser Troubleshooting documentation][1].

## Manage information being collected

The `trackUserInteractions` initialization parameter enables the collection of user clicks in your application, which means sensitive and private data contained in your pages may be included to identify elements that a user interacted with.

To control which information is sent to Datadog, you can [mask action names with privacy options][2], [manually set an action name](#declare-a-name-for-click-actions), or [implement a global scrubbing rule in the Datadog Browser SDK for RUM][3].

## Track user interactions

The RUM Browser SDK automatically tracks clicks to generate click actions. A one-click action generally represents one user click, except when the same element is clicked multiple times in a row, which is considered a single action (see [Frustration Signals "rage clicks"][4]).

## Action timing telemetry

For information about the default attributes for all RUM event types, see [RUM Browser Data Collected][5].

| Telemetry    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | number (ns) | The loading time of the action.  |
| `action.long_task.count`        | number      | Count of all long tasks collected for this action. |
| `action.resource.count`         | number      | Count of all resources collected for this action. |
| `action.error.count`      | number      | Count of all errors collected for this action.|

The Datadog Browser SDK for RUM calculates action loading time by monitoring page activity following every click. An action is considered complete when the page has no more activity. See [How page activity is calculated][6] for details.

For more information about configuring for sampling or global context, see [Modifying RUM Data and Context][3].

## Action attributes

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | string | UUID of the user action. |
| `action.type` | string | Type of the user action. For custom user actions, it is set to `custom`. |
| `action.target.name` | string | Element that the user interacted with. Only for automatically collected actions. |
| `action.name` | string | User-friendly name created (for example, `Click on #checkout`). For custom user actions, the action name given in the API call. |

## Declare a name for click actions

The Datadog Browser SDK for RUM uses various strategies to get a name for click actions. If you want more control, you can define a `data-dd-action-name` attribute on clickable elements (or any of their parents) that is used to name the action.

For example:

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Try it out!</a>

<div class="alert alert-danger" role="alert" data-dd-action-name="Dismiss alert">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    <span class="visually-hidden">Error:</span>
    Enter a valid email address
</div>
```

Starting with [version 2.16.0][7], with the `actionNameAttribute` initialization parameter, you can specify a custom attribute that is used to name the action.

For example:

```html
<script>
  window.DD_RUM.init({
    ...
    trackUserInteractions: true,
    actionNameAttribute: 'data-custom-name',
  ...
  })
</script>

<a class="btn btn-default" href="#" role="button" data-custom-name="Login button">Try it out!</a>
```

`data-dd-action-name` is favored when both attributes are present on an element.

### How action names are computed

The Datadog Browser SDK uses different strategies to compute click action names:

1. If the `data-dd-action-name` attribute or a custom attribute (as explained above) is explicitly set by the user on the clicked element (or one of its parents), its value is used as the action name.

2. If `data-dd-action-name` attribute or its equivalent is not set, depending on the element type, the sdk uses other attributes such as `label`, `placeholder`, `aria-label` from the element or its parents to construct the action name. If none of these attributes is found, the sdk uses the inner text as name for the action.

## Send custom actions

To extend the collection of user interactions, send your custom actions using the `addAction` API. These custom actions send information relative to an event that occurs during a user journey.

For more information, see [Send Custom Actions][8].

## Action limits and sampling

There is no strict limit on the number of user actions, such as clicks or custom actions, that the Datadog RUM Browser SDK can track per session or page. However, you should consider the following:

- **Sampling** - You can configure the SDK to sample a percentage of user actions using the `sampleRate` and `trackInteractions` options. This helps control the volume of data sent to Datadog. For more information, see [Advanced Configuration][1].
- **Performance** - The SDK batches and sends events periodically. In cases of high-frequency actions, such as repeated clicks, the SDK may deduplicate or group actions, for example, through rage click detection to avoid flooding.

As a best practice, if you expect a high volume of user actions, consider adjusting your sampling configuration and monitor your Datadog event usage.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/troubleshooting/
[2]: /data_security/real_user_monitoring/#mask-action-names
[3]: /real_user_monitoring/browser/advanced_configuration/
[4]: /real_user_monitoring/browser/frustration_signals/
[5]: /real_user_monitoring/browser/data_collected/#default-attributes
[6]: /real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[7]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2160
[8]: /real_user_monitoring/guide/send-rum-custom-actions