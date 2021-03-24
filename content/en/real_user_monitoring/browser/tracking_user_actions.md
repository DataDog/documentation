---
title: Tracking User Actions
kind: documentation
further_reading:
  - link: "/real_user_monitoring/guide/send-rum-custom-actions/"
    tag: "Guide"
    text: "Sending RUM Custom Actions from Code"
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "/real_user_monitoring/explorer/"
    tag: "Documentation"
    text: "Explore your views within Datadog"
  - link: "/real_user_monitoring/explorer/analytics/"
    tag: "Documentation"
    text: "Build analytics upon your events"
  - link: "/real_user_monitoring/dashboards/"
    tag: "Documentation"
    text: "RUM Dashboards"
---


Real User Monitoring (RUM) Browser SDK automatically detects user interactions performed during a user journey. 

The automatic collection of user actions provides insights into user behavior, without having to instrument every single click in your application. It will help you achieve the following objectives:
* Understand the performance of key interactions (for example, a click on the "Add to cart" button)
* Quantify feature adoption
* Identify the steps that led to a specific browser error

You can extend the collection of user interactions by [sending your own custom actions](#custom-actions).

**Note**: The `trackInteractions` initialization parameter enables the collection of user clicks in your application. **Sensitive and private data** contained on your pages may be included to identify the elements interacted with. You can control which information is sent to Datadog by [manually setting an action name](#declaring-a-name-for-click-actions), or by [implementing global scrubbing rules in the Browser SDK][1].

## What interactions are being tracked?

The Browser SDK automatically tracks clicks. A click action is created if the following conditions are met:
* Activity is detected within 100ms of click being handled (activity being defined as the start of a network request or a DOM mutation)
* The click does not lead to a new page being loaded, in which case the Browser SDK will generate a new RUM View event
* A name can be computed for the action. [Learn more about action naming](#declaring-a-name-for-click-actions)

## Action timing metrics

For information about the default attributes for all RUM event types, see [Data Collected][3]. For information about configuring for sampling or global context see [Advanced Configuration][4].

| Metric    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | number (ns) | The loading time of the action.  |
| `action.long_task.count`        | number      | Count of all long tasks collected for this action. |
| `action.resource.count`         | number      | Count of all resources collected for this action. |
| `action.error.count`      | number      | Count of all errors collected for this action.|

### How action loading time is calculated

Once an interaction is detected, the RUM SDK watches for network requests and DOM mutations. The action is considered finished once the page has no activity for more than 100ms (activity being defined as ongoing network requests or DOM mutations).

## Action attributes

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | string | UUID of the user action. |
| `action.type` | string | Type of the user action. For custom user actions, it is set to `custom`. |
| `action.target.name` | string | Element that the user interacted with. Only for automatically collected actions. |
| `action.name` | string | User-friendly name created (for example `Click on #checkout`). For custom user actions, the action name given in the API call. |

## Declaring a name for click actions

The RUM library uses various strategies to get a name for click actions. If you want more control, you can define a `data-dd-action-name` attribute on clickable elements (or any of their parents) that will be used to name the action. For example:

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Try it out!</a>

<div class="alert alert-danger" role="alert" data-dd-action-name="Dismiss alert">
  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  <span class="sr-only">Error:</span>
  Enter a valid email address
</div>
```
## Custom actions

Custom actions are user actions declared and sent manually by using the `addAction` API. They can send information relative to an event occurring during a user journey (for example, a customer cart information).

Once RUM is initialized, generate custom actions when you want to monitor specific interactions on your application pages with the `addAction(name: string, context: Context)` API call. In the following examples, the RUM SDK collects the number of items within a cart, what they are, and how much the cart is worth overall. The information is sent to Datadog when the user goes to the checkout page.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addAction('<NAME>', '<JSON_OBJECT>');

// Code example
datadogRum.addAction('checkout', {
    cart: {
        amount: 42,
        currency: '$',
        nb_items: 2,
        items: ['socks', 't-shirt'],
    },
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');
})

// Code example
DD_RUM.onReady(function() {
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');

// Code example
window.DD_RUM &&
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#scrub-sensitive-data-from-your-rum-data
[3]: /real_user_monitoring/browser/data_collected/#default-attributes
[4]: /real_user_monitoring/browser/advanced_configuration/
