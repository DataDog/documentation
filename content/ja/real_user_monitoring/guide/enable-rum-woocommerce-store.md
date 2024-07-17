---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentation
  text: RUM とセッションリプレイを製品分析に活用する
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentation
  text: コンバージョン率でアラートを出す
title: WooCommerce ストアで RUM を有効にする
---

## Overview

Understanding how customers interact with your web pages is crucial to the success of your online store.



This guide walks through how you can set up Real User Monitoring on your WordPress + WooCommerce-powered store.

## Setup

1. Log into your WordPress administration panel.
2. Under **Plugins**, click on **Add New**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-1.png" alt="Enable RUM on your WooCommerce store" style="width:30%;">}}

3. Search for **WPCode** and click **Install Now**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-2.png" alt="Enable RUM on your WooCommerce store" style="width:50%;">}}

4. WPCode をインストールした後、**Activate** をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-3.png" alt="Enable RUM on your WooCommerce store" style="width:50%;">}}

5. Find the newly added **Code Snippets** section in your WordPress menu, and click **Header & Footer**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-4.png" alt="Enable RUM on your WooCommerce store" style="width:30%;">}}

6. Initialize the Browser RUM SDK by adding the SDK code snippet inside the **Header** section and save the changes by clicking the **Save** button. For more information about which installation method to choose, see the [RUM Browser Monitoring documentation][1].

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-5.png" alt="WooCommerce ストアで RUM を有効にする" >}}

## Start exploring

Once you've initialized the Browser RUM SDK, you can start using Real User Monitoring with your WooCommerce store.

For example, you can:

- Get valuable insights about your customers' behavior by
making data-driven decisions to improve your store
- Increase conversion by watching browser recordings enriched sessions with [Session Replay][2]
- [ファネル分析][3]を使ってカスタマージャーニーをより深く理解します。または
- [Generate metrics][4] from those newly captured sessions

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: /ja/real_user_monitoring/session_replay/
[3]: /ja/product_analytics/journeys/funnel_analysis
[4]: /ja/real_user_monitoring/platform/generate_metrics/