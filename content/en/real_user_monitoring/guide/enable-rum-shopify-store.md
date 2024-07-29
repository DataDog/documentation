---
title: Enable RUM on Your Shopify Store

further_reading:
- link: '/real_user_monitoring/guide/rum-for-product-analytics/'
  tag: 'Documentation'
  text: 'Use RUM & Session Replay for Product Analytics'
- link: '/real_user_monitoring/guide/alerting-with-conversion-rates/'
  tag: 'Documentation'
  text: 'Alerting With Conversion Rates'
---

## Overview

Understanding how customers interact with your web pages is crucial to the success of your online store.

This guide walks through how you can set up Real User Monitoring on your Shopify-powered store.

## Setup

1. Log into your Shopify administration panel.
2. Under **Sales channels**, click **Online Store**.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Enable RUM on your Shopify store" style="width:30%;">}}

3. This opens up a new menu, click on **Themes**.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Enable RUM on your Shopify store" style="width:30%;">}}

4. Click the **Edit code** button for your current theme.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-3.png" alt="Enable RUM on your Shopify store" >}}

5. Under the **Layout** directory, find the main file of your theme **theme.liquid**. Click the file to edit it.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Enable RUM on your Shopify store" style="width:30%;">}}

6. Initialize the Browser RUM SDK by adding the SDK code snippet inside the `<head>` tag. For more information about which installation method to choose, see the [RUM Browser Monitoring documentation][1].

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Enable RUM on your Shopify store" >}}

7. Click the **Save** button to save your changes.

The updated looks like the following in the Shopify UI:

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Enable RUM on your Shopify store" style="width:50%;">}}

See more information regarding theme code's editing in [Shopify's documentation][2].

## Start exploring

Once you've initialized the Browser RUM SDK, you can start using Real User Monitoring with your Shopify store.

For example, you can:

- Get valuable insights about your customers' behavior by
making data-driven decisions to improve your store
- Increase conversion by watching browser recordings enriched sessions with [Session Replay][3]
- Use [funnel analysis][4] to better understand the customer journey, or
- [Generate metrics][5] from those newly captured sessions

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /real_user_monitoring/session_replay/browser/
[4]: /product_analytics/journeys/funnel_analysis
[5]: /real_user_monitoring/platform/generate_metrics/

