---
title: Send RUM Custom Actions

beta: true
private: true
description: Learn how to send custom actions to extend your collection of user interactions.
aliases:
- /real_user_monitoring/guide/send-custom-user-actions/
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the RUM Explorer'
---
## Overview

Real User Monitoring [automatically collects actions][1] on your web application. You can collect additional events and timings such as form completions and business transactions.

Custom RUM actions allow you to monitor interesting events with all the relevant context attached. For example, the Datadog Browser SDK can collect a user's checkout information (such as the number of items within the cart, the list of items, and how much value the cart items are worth) when they click the checkout button on an e-commerce website.

## Instrument your code

Create a RUM action using the `addAction` API. Give your action a name and attach context attributes in the form of a JavaScript object.

The following example creates a `checkout` action with details about the user cart when the user clicks on the checkout button.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

function onCheckoutButtonClick(cart) {
    datadogRum.addAction('checkout', {
        'value': cart.value, // for example, 42.12
        'items': cart.items, // for example, ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{% tab "CDN async" %}}

Ensure that you wrap the API call with the `onReady` callback:

```javascript
function onCheckoutButtonClick(cart) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addAction('checkout', {
            'value': cart.value, // for example, 42.12
            'items': cart.items, // for example, ['tomato', 'strawberries']
        })
    })
}
```

{{% /tab %}}
{{% tab "CDN sync" %}}

Ensure that you check for `window.DD_RUM` before the API call:

```javascript
window.DD_RUM && window.DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');

function onCheckoutButtonClick(cart) {
    window.DD_RUM && window.DD_RUM.addAction('checkout', {
        'value': cart.value, // for example, 42.12
        'items': cart.items, // for example, ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{< /tabs >}}

All RUM context such as current page view information, geoIP data, and browser information, is automatically attached along with extra attributes provided with the [Global Context API][2].

## Create facets and measures on attributes

After deploying the code that creates your custom actions, they appear in the **Actions** tab of the [RUM Explorer][3].

To filter on your custom actions, use the `Action Target Name` attribute: `@action.target.name:<ACTION_NAME>`.

The example below uses the following filter: `@action.target.name:checkout`.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.mp4" alt="Create a facet for custom RUM actions" video=true style="width:100%;">}}

After clicking on an action, a side panel with metadata appears. You can find your action attributes in the **Custom Attributes** section and create facets or measures for these attributes by clicking on them.

Use facets for distinctive values (IDs) and measures for quantitative values such as timings and latency. For example, create a facet for the cart items and a measure for the cart value.

## Use attributes in the RUM Explorer

You can use action attributes along with facets and measures in the [RUM Explorer][3] to build dashboard widgets, monitors, and advanced queries.

The following example displays the average cart value per country in the last two days. Click the **Export** button to export the search query into a dashboard widget or monitor.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics.png" alt="Use RUM actions in the RUM Explorer" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/data_collected/?tab=useraction#action-attributes
[2]: /real_user_monitoring/browser/advanced_configuration/#replace-global-context
[3]: /real_user_monitoring/explorer
