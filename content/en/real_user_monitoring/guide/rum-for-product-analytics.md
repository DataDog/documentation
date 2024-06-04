---
title: Use RUM & Session Replay for Product Analytics
kind: guide
description: Learn how to use RUM & Session Replay to monitor trends in user behavior and feature adoption.
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn how to visualize your RUM data'
- link: '/real_user_monitoring/browser/frustration_signals/'
  tag: 'Documentation'
  text: 'Learn about frustration signals'
- link: '/real_user_monitoring/session_replay'
  tag: 'Documentation'
  text: 'Learn about Session Replay'
- link: '/dashboards/guide/powerpacks-best-practices/'
  tag: 'Documentation'
  text: 'Learn about powerpacks'
---

## Overview

[RUM & Session Replay][1] allows you to monitor trends in consumer behavior and uncover answers to product usage questions about your web and mobile applications.

This guide discusses several use cases to enrich your RUM & Session Replay data and answer questions related to product analytics.

## Setup

After you have set up the Datadog RUM SDK, enrich your [browser][2] or mobile ([iOS][3] and [Android][4]) data with attributes to customize the data according to your use case. For example, adding contextual information allows you to [identify sessions that are tied to specific users][4].

## Monitor page traffic and feature usage

If you are interested in learning what buttons your users click on the most, you can track page traffic and the usage of buttons in your application. 

1. In the [RUM Explorer][5], select **Actions** from the dropdown menu next to the search query. 
2. Enter `@view.name:/cart` in the search query and select the **Top List** visualization type.
3. In the `by` field of the `Group into fields` section above, select **Action Name** from the group dropdown.

This example displays the top actions on Shopist's `/cart` page.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/actions_in_cart_page-2.png" alt="Search query for actions on Shopist's Cart page" style="width:90%;">}}

To investigate which users are clicking on these buttons, modify the search query by selecting the **Table** visualization type and clicking **+** to add another `group` field for `@user.name`.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/actions_by_user_name_in_cart_page-3.png" alt="Search query for actions grouped by user name on Shopist's Cart page" style="width:90%;">}}

## Analyze the conversion rate of core workflows

Use the [funnel visualization type][6] to track the conversion rate across crucial areas in your website. 

Once you have created a funnel based on views or actions on your website, you can use it in the following ways:

* Create a [saved view][7] to reference it in the RUM & Session Replay
* [Export][8] it to a dashboard where you can analyze the conversion rate in the context of additional telemetry data
* Click on a funnel step to display the **Funnel Analysis** [side panel](#view-funnel-analysis)

### Add a saved view

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/explorer_saved_view.mp4" alt="Add a saved view in the RUM Explorer" video="true" width=90% >}}

### Export the funnel

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/explorer_funnel_export.png" alt="Export a funnel visualization in the RUM Explorer" style="width:90%;" >}}

### View funnel analysis

The side panel contains detailed information about the load time of an individual view, the conversion and drop off rates based on the country, device type, browser, and version, and outstanding [issues][9] that occurred on the page.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/funnel_analysis_side_panel.mp4" alt="Funnel Analysis side panel displaying conversion rates, drop off rates, page performance, errors, and user behavior" width=90%; video="true" >}}

## Identify your most frustrated users

[Frustration Signals][10] surface moments where users express frustrated behavior (a rage click, dead click, or error click) so you can address the most pressing issues that users are facing. Examine user behavior to identify the areas of your website where users are getting stuck. 

1. In the [RUM Explorer][5], select **Views** from the dropdown menu.
2. Enter `@view.frustration.count:>=2` in the search query and select the **Top List** visualization type.
3. In the `by` field of the `Group into fields` section above, select **View Name** from the group dropdown.

This query searches for top pages where at least two frustration signals have occurred.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/frustration_signal_query-1.png" alt="Search query for views containing more than two frustration signals in the RUM Explorer" style="width:90%;" >}}

In addition to analyzing top views, you also want to investigate the buttons and elements that users are expressing frustration with. 

1. Select **Actions** from the dropdown menu.
2. Enter `@action.frustration.type:dead_click` in the search query and select the **Table** visualization type.
3. Click on the search query and select `@action.frustration.type:error_click` and ``@action.frustration.type:rage_click`` to include these values in your search. The **search for** field updates to `Action Frustration Type:(3 terms)`.
4. In the `by` field of the `Group into fields` section below, select **Action Name** from the group dropdown and click **+** to add another `group` field for **Action Frustration Type**.

This query lists anytime a user expresses any type of frustration signal and counts the unique actions where frustration occurred.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/multi_group_frustration_type_search-3.png" alt="Search query that lists and counts actions where a user expressed three types of frustration signals on Shopist's Cart page" style="width:90%;">}}

## Watch the user experience in Session Replay

You can visually watch the impact that poor user experiences have on your users. For example, if you have built a funnel and noticed that the drop off rate is exceptionally high between steps, you can watch a [sesion replay recording][11] to see what a user did before they dropped off. 

In a funnel visualization, you can access the **Funnel Analysis** side panel and click **Sample Replay Session** on sessions where users continued onto another step or dropped off.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/funnel_sample_session_replay-2.mp4" alt="The Funnel Analysis side panel contains links to Session Replay" width=90%; video="true" >}}

With Session Replay, you can identify what parts of your product are confusing to users and need improving in order to drive up conversion. 

## Track usage patterns in powerpacks

[Powerpacks][12] are templated groups of dashboard widgets for common monitoring patterns and product analytics. 

Use the out-of-the-box RUM Feature Usage powerpack to better understand different traffic patterns for a specific action in your application.

1. Navigate to [**Dashboards** > **New Dashboard**][13] and click **+ Add Widgets or Powerpacks**. 
2. In the **Powerpacks** tab, search for RUM powerpacks by entering `tag:rum` in the search bar and select **RUM Feature Usage**. By default, the values for `@view.name` and `@action.name` are set to `*`. 
3. Customize your powerpack by selecting values from the dropdown menus and click **Add to dashboard** to use an attribute as a template variable.
4. Click **Confirm** to add the powerpack in your dashboard.

This powerpack provides graphs about usage by country, actions on a view, and actions over time, in addition to the count of actions and percentage of usage frequency on Shopist's `/cart` page.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_powerpack.png" alt="RUM Feature Usage powerpack to monitor the Apply Coupon action on the Cart page" style="width:100%;" >}} 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[3]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios/?tab=swift#enrich-user-sessions
[4]: /real_user_monitoring/android/advanced_configuration/?tab=kotlin#enrich-user-sessions
[5]: https://app.datadoghq.com/rum/explorer
[6]: /product_analytics/funnel_analysis
[7]: /real_user_monitoring/explorer/saved_views/
[8]: /real_user_monitoring/explorer/export/
[9]: /real_user_monitoring/error_tracking/
[10]: /real_user_monitoring/browser/frustration_signals/
[11]: /real_user_monitoring/session_replay/browser/
[12]: /dashboards/guide/powerpacks-best-practices/
[13]: https://app.datadoghq.com/dashboard/lists
