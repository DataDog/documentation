---
title: Send RUM Custom User Actions
kind: guide
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
---

## Overview

Datadog’s RUM can collect interesting events and timings with Custom User Actions. As an example throughout this guide, we collect user checkouts information from an e-commerce website.

## 1. Instrument your code
The `addUserAction` API lets you attach as many attributes as you want in the form of a JavaScript object. In the example, information about the cart is sent when the user clicks the checkout button.

```
function onCheckoutButtonClick(cart) {
    DD_RUM.addUserAction('checkout', {
        'amount': cart.amount, // e.g. 42.12
        'items': cart.items, // e.g. ['tomato', 'strawberries']
    })
}
```

The entire RUM context will be automatically attached (current page view information, geoIP data, browser information, etc.) along with extra data attached with the [Global Context API][1].

## 2. Create facets and measures on your new attributes
Once you have deployed the code that sends your Custom User Actions, you will start seeing them appear in the RUM Explorer, in the **User Actions** tab.

To easily filter on your new User Actions, use the `Event Name` filter as follow: `@evt.name:<USER_ACTION_NAME>`. In the example, we use the following filter: `@evt.name:checkout`

Once you click on the user action, the list of all attributes appear. Locate the attributes you just sent and create facets or measures by clicking on them. For example, create a facet for the cart items and a measure for the cart amount.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.gif" alt="Identify a most logging service status" style="width:100%;">}}

**Note**: Use facets for distinctive values (IDs) and measures for quantitative values (timings, latency, etc.).

## 3. Use your attributes in the Explorer, Dashboards and Monitors
Now that facets and measures have been created, they can be used in RUM queries. This means you can build dashboards widgets, monitors and advanced queries in [RUM Explorer/Analytics][2].

As an example, the following screenshot shows the total cart amount per country for the last day. Using the dropdown menu on the top right corner, export this widget to a dashboard or to a monitor.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/analytics-to-dashboard.png" alt="Identify a most logging service status" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/advanced_configuration/#replace-global-context
[2]: /real_user_monitoring/explorer
