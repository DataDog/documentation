---
title: Send RUM Custom Actions
kind: guide
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
aliases:
  - /real_user_monitoring/guide/send-custom-user-actions/
---
## Overview

Real User Monitoring [automatically collects actions][1] on your web application. You may also want to collect additional events and timings such as form completions and business transactions. With custom RUM actions, monitor any interesting event with all the relevant context attached. As an example throughout this guide, we collect user checkouts information from an e-commerce website.

## Instrument your code
To create a new RUM action, use the `addAction` API. Give your action a name and then attach context attributes in the form of a JavaScript object. In the following example, a `checkout` action is created with details about the user cart when the user clicks on the checkout button.

```javascript
function onCheckoutButtonClick(cart) {
    DD_RUM.addAction('checkout', {
        'value': cart.value, // e.g. 42.12
        'items': cart.items, // e.g. ['tomato', 'strawberries']
    })
}
```

All RUM context will be automatically attached (current page view information, geoIP data, browser information, etc.) along with extra attributes provided with the [Global Context API][2].

## Create facets and measures on your new attributes
Once you have deployed the code that creates your custom actions, you will start seeing actions appear in the [RUM Explorer][3], in the **Actions** tab.

To easily filter on your new custom Actions, use the `Action Target Name` attribute as follow: `@action.target.name:<ACTION_NAME>`. In the example, we use the following filter: `@action.target.name:checkout`

Once you click on the action, all metadata is available in the side panel. You can find your action attributes in the Custom Attributes sections. The next step is to create facets or measures for these attributes by clicking on them. For example, create a facet for the cart items and a measure for the cart value.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.gif" alt="Create a facet for custom RUM actions" style="width:100%;">}}

**Note**: Use facets for distinctive values (IDs) and measures for quantitative values (timings, latency, etc.).

## Use your attributes in the explorer, dashboards, and monitors
Now that facets and measures have been created, you can use your action attributes in RUM queries. This means you can build dashboards widgets, monitors and advanced queries in [RUM Explorer/Analytics][3].

As an example, the following screenshot shows the average cart value per country for the last day. Using the dropdown menu on the top right corner, you can export this query as a dashboard widget or as a monitor.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics.png" alt="Use RUM actions in Analytics" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/tracking_user_actions/
[2]: /real_user_monitoring/browser/data_collected/#replace-global-context
[3]: /real_user_monitoring/explorer
