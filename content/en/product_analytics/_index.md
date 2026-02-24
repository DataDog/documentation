---
title: Product Analytics
description: Product Analytics helps you understand your application usage at a glance.
aliases:
- /real_user_monitoring/product_analytics
- /real_user_monitoring/guide/rum-for-product-analytics
further_reading:
- link: "https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams"
  tag: "Blog"
  text: "From performance to impact: Bridging frontend teams through shared context"
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
---

## Overview

Product Analytics helps you gain insight into user behavior and make data-driven decisions. It can help solve the following types of use cases in your application:

- [Understand product adoption](#understand-product-adoption)
- [Track conversion rates and their evolution over time](#track-conversion-rates-and-their-evolution-over-time)
- [Track key user behavior patterns](#track-key-user-behavior-patterns)
- [Visualize user interactions](#visualize-user-interactions)


## Getting started
To start using Product Analytics, [instrument](#instrument-your-application) your application and then [enable](#enable-product-analytics) the feature in Datadog. 

**Note**: Product Analytics uses the same SDKs and configuration as [Real User Monitoring (RUM)][18], and data is retained for 15 months by default. See [Datadog's data retention periods][1] for more information.

### Instrument your application
If you do not have an application set up in Datadog yet, create one for your platform ([browser][14], [iOS][15], or [Android][16]) or use your [coding assistant][17].

### Enable Product Analytics
Enable Product Analytics for each application where you want to monitor user behavior:

1. Select the application you want to monitor from the [Application Management][9] list.
2. Under PRODUCT SETTINGS, click **Product Analytics**.
3. Click the **Enable** button.

{{< img src="product_analytics/enable-product-analytics.png" alt="Enable Product Analytics from the Application Management page.">}}

## Understanding your data
Product Analytics is built on three levels of user data:

**Session**
: A single user's complete journey through your application, from the moment they open it to when they leave.

**View**
: Each page or screen a user visits within a session.

**Action**
: Something a user does on a page, such as a click, tap, or scroll. Actions are automatically collected by the RUM SDK. When configuring features like [Funnels][4] and [Segments][6], you can select specific Actions as steps or filters. To see which Actions are available, open the [RUM Explorer][20] and filter by **Actions**. 

For a full breakdown of RUM event types, see [Understanding the RUM Event Hierarchy][19].


## Navigating the Product Analytics UI
Each Product Analytics feature provides context into your users' journeys. This section describes the context each feature can provide for your individual use case.

### Understand product adoption
The [Home][3] page gives you a bird's-eye view of your users' activity and a pulse on your product's adoption. This is where you most often land when accessing Product Analytics.

{{< img src="/product_analytics/pana_home_page.png" alt="Understand end-to-end conversions with Funnel Analysis.">}}

By default, this page displays the `active users`, `page views`, and `average time spent by user` charts, but you have the ability to add additional charts or a dashboard. The Home page also includes the following out-of-the-box sub-sections that provide additional context about your product's users and usage:

[Users](https://app.datadoghq.com/product-analytics/user-trends)
: At a glance, see who is using your product.

[App & Devices](https://app.datadoghq.com/product-analytics/app-and-devices)
: Visualize the split between desktop and mobile usage, spot which versions are in use, and identify what can be deprecated.

[Engagement](https://app.datadoghq.com/product-analytics/engagement-and-features)
: Understand how users are engaging with your product to answer questions like how long users are staying on pages and what their top actions are. 

[Traffic](https://app.datadoghq.com/product-analytics/traffic-and-acquisition)
: Get a view into bounce rates, top traffic sources, and where your growth is really coming from.

[Performance](https://app.datadoghq.com/product-analytics/performance)
: View top errors and frustrations, and see exactly which views they impact.

<br>


### Track conversion rates and their evolution over time
The Product Analytics charts help you visualize your users' journey as they use your product.

{{< img src="/product_analytics/pana_charts_video.mp4" alt="visualize your users' journey with charts." video="true">}}

Each chart type provides a different view into the user's journey:

[Pathways][5]
: Visualize all user journeys across your application to analyze the critical path.

[Funnel][4]
: Track conversion rates across key workflows to identify and address any bottlenecks in end-to-end user journeys. <br> For example, you can see if customers drop off at a certain point due to poor website performance or measure how adding new steps to a workflow impacts drop-off rate.

[Retention][2]
: Measure how often users are successfully returning to a page or action to gain insights into overall user satisfaction.

[Analytics][13]
: Contains aggregated data for understanding how your product is being used.

<br>

### Track key user behavior patterns
You may want to better understand a specific group of users. This could be for the purpose of improving their user experience, or nudge them to buy the content in their cart. Regardless of the purpose, you can use the [Users & Segments][6] section to group your users based on a desired characteristic.

{{< img src="/product_analytics/segmentation/userprofiles_pana-ga.png" alt="See individual profiles of users and create a segment from these profiles.">}}

You can see the profiles of users, and create a segment, or a specified grouping, from these profiles to fit the behavior you would like to observe. For example, you can create a segment on users who have items in their carts but have not yet checked out to send an email nudging them to make a purchase. 


### Visualize user interactions
Suppose you want to make changes to your application interface but want to first understand how users navigate the page. Is there a specific path they take more than others? Can you make user actions and flows smoother? The following features can help you capture and replay your users' browsing experience to inform your product change decisions. 

{{< img src="/product_analytics/pana_session_replay_page.png" alt="Capture and replay your users' browsing experience to inform your product design decisions.">}}

[Session replay][11] 
: Expands your user experience monitoring by allowing you to capture and visually replay the web browsing or mobile app experience of your users. <br><br>This is beneficial for _error identification_, _reproduction_, and _resolution_, and provides insights into your application's usage patterns and design pitfalls.

[Heatmaps][10]
: This is a visualization of your users' interactions overlaid on Session Replay data. Product Analytics has three different types of heatmaps: Click maps, Top elements, Scroll maps. <br><br> Use heatmaps to review complex data at a glance, gaining insights around optimizing your user experience.

[Playlist][12]
: You can create a playlist of Session Replays to organize them by any patterns you notice. Learn more about [Session Replay Playlists][12].
<br>


## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_security/data_retention_periods/
[2]: /product_analytics/charts/retention_analysis
[3]: https://app.datadoghq.com/product-analytics
[4]: /product_analytics/charts/funnel_analysis
[5]: /product_analytics/charts/pathways
[6]: /product_analytics/segmentation/
[8]: https://app.datadoghq.com/rum/
[9]: https://app.datadoghq.com/rum/list
[10]: /session_replay/heatmaps
[11]: /session_replay/
[12]: /session_replay/playlists
[13]: /product_analytics/charts/analytics_explorer
[14]: /real_user_monitoring/application_monitoring/browser
[15]: /real_user_monitoring/application_monitoring/ios
[16]: /real_user_monitoring/application_monitoring/android
[17]: /product_analytics/agentic_onboarding
[18]: /real_user_monitoring/#what-is-real-user-monitoring
[19]: /real_user_monitoring/guide/understanding-the-rum-event-hierarchy
[20]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aaction