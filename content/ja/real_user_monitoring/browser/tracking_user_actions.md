---
algolia:
  tags:
  - user actions
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Introducing Datadog Real User Monitoring
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explore your views within Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Apply visualizations on your events
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentation
  text: Learn about RUM dashboards
kind: documentation
title: Tracking User Actions
---

## Overview

Browser Monitoring automatically detects user interactions performed during a user journey and provides insights into your users' behavior without requiring you to manually instrument every single click in your application.

You can accomplish the following objectives:

* Understand the performance of key interactions (for example, a click on the **Add to cart** button)
* Quantify feature adoption
* Identify the steps that led to a specific browser error

## Manage information being collected

The `trackUserInteractions` initialization parameter enables the collection of user clicks in your application, which means sensitive and private data contained in your pages may be included to identify elements that a user interacted with.

To control which information is sent to Datadog, you can [mask action names with privacy options][6], [manually set an action name](#declare-a-name-for-click-actions), or [implement a global scrubbing rule in the Datadog Browser SDK for RUM][1].

## Track user interactions

The RUM Browser SDK automatically tracks clicks. A click action is created if **all of the following** conditions are met:

* Activity following the click is detected. See [How page activity is calculated][2] for details.
* The click does not lead to a new page being loaded, in which case, the Datadog Browser SDK generates another RUM View event.
* A name can be computed for the action. See [Declaring a name for click actions](#declare-a-name-for-click-actions) for details.

## Action timing metrics

For information about the default attributes for all RUM event types, see [RUM Browser Data Collected][3].

| Metric    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | number (ns) | The loading time of the action.  |
| `action.long_task.count`        | number      | Count of all long tasks collected for this action. |
| `action.resource.count`         | number      | Count of all resources collected for this action. |
| `action.error.count`      | number      | Count of all errors collected for this action.|

The Datadog Browser SDK for RUM calculates action loading time by monitoring page activity following every click. An action is considered complete when the page has no more activity. See [How page activity is calculated][2] for details.

For more information about configuring for sampling or global context, see [Modifying RUM Data and Context][1].

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

Starting with [version 2.16.0][4], with the `actionNameAttribute` initialization parameter, you can specify a custom attribute that is used to name the action.

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

## カスタムアクションの送信

ユーザーインタラクションのコレクションを拡張するには、`addAction` API を使用してカスタムアクションを送信します。これらのカスタムアクションは、ユーザージャーニー中に発生したイベントに関連する情報を送信します。

詳しくは、[カスタムアクションの送信][5]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/advanced_configuration/
[2]: /ja/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[3]: /ja/real_user_monitoring/browser/data_collected/#default-attributes
[4]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2160
[5]: /ja/real_user_monitoring/guide/send-rum-custom-actions
[6]: /ja/real_user_monitoring/session_replay/privacy_options#mask-action-names