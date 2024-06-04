---
title: Enable RUM on Your Squarespace Store
kind: guide
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

This guide walks through how you can set up Real User Monitoring on your Squarespace-powered store.

## Setup

1. Log into your Squarespace administration panel and click **Settings**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-1.png" alt="Enable RUM on your Squarespace store" style="width:30%;">}}

2. Under **Settings**, click **Advanced**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-2.png" alt="Enable RUM on your Squarespace store" style="width:30%;">}}

3. In the open menu, click **Code Injection**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-3.png" alt="Enable RUM on your Squarespace store" style="width:30%;">}}

4. Initialize the Browser RUM SDK by adding the SDK code snippet inside the **Header** section. See more information about which installation method to choose in the [RUM Browser Monitoring documentation][1].

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-4.png" alt="Enable RUM on your Squarespace store" >}}

5. Click the **Save** button to save your changes.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-5.png" alt="Enable RUM on your Squarespace store" style="width:50%;">}}

See more information regarding code injection in [Squarespace's documentation][2].

## Start exploring

Once you've initialized the RUM Browser SDK, you can start using Real User Monitoring with your Squarespace store.

For example, you can:

- Get valuable insights about your customers' behavior by
making data-driven decisions to improve your store
- Increase conversion by watching browser recordings enriched sessions with [Session Replay][3]
- Use [funnel analysis][4] to better understand the customer journey, or
- [Generate metrics][5] from those newly captured sessions

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#choose-the-right-installation-method/
[2]: https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection
[3]: /real_user_monitoring/session_replay/browser/
[4]: /product_analytics/journeys/funnel_analysis/
[5]: /real_user_monitoring/generate_metrics/
