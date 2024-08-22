---
title: Analyze Your Feature Flags
beta: true
description: View your feature flag's health and usage.
aliases:
- /real_user_monitoring/guide/getting-started-feature-flags/
- /real_user_monitoring/guide/setup-feature-flag-data-collection/
disable_toc: false
further_reading:
- link: "/real_user_monitoring/guide/setup-feature-flag-data-collection/"
  tag: "Documentation"
  text: "Set up Feature Flag data collection"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Learn about the RUM Explorer"
- link: "https://www.datadoghq.com/blog/feature-flag-tracking/"
  tag: "Blog"
  text: "Ensure release safety with feature flag tracking in Datadog RUM"
---

## Analyze your feature flags
To get more details about the health and performance of your feature flag, you can click the flag in the list to navigate to a dedicated feature flag analysis dashboard. The Feature Flag analysis dashboard provides an overview of the performance of your feature flag, displaying information about user sessions, changes in your Core Web Vitals, and error rates. 

These out-of-the-box graphs are aggregated across your flag variants, making it easy to spot problems in your feature releases before they turn into serious issues. This dashboard provides an easy way to monitor your feature releases and allows you to quickly roll back as soon as you spot an issue so you can avoid negative user experiences. 

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="Feature Flag details page - Users overview" video=true width=90% >}}

The **Users** tab provides some high level summary statistics of your feature flag and allows you to further analyze the users viewing each of your feature flag variants by any attribute. If you want to understand what it looks like for someone who experienced a certain variant versus another, you can watch a [Session Replay][5] for each case.

The **Issues** tab gives you a view of the errors that are occurring in your application for user sessions that have your feature flag. See if any issues detected by [Error Tracking][6] occurred for a specific variant of your feature flag and may be related to your changes.

The **Performance** tab allows you to understand if one of your feature flag variants have caused poor performance. You can view your Core Web Vitals and loading time for each variant to determine if one of your variants may be causing a negative impact on your application's performance.

### Build custom views from Feature Flag data using the RUM Explorer
Search through all the data collected by RUM in the [RUM Explorer][7] to surface trends on feature flags, analyze patterns with greater context, or export them into [dashboards][8] and [monitors][9]. 

You can search your Sessions, Views, or Errors in the RUM Explorer, with the `@feature_flags.{flag_name}` attribute to scope down and focus on events where users were shown a specific user experience.

You can compare important metrics to you and your teams by grouping your query by `@feature_flags.{flag_name}`. For example, if you want to understand how your new checkout flow is affecting the conversion rate from the checkout page to users making a purchase, you can add a "Group by" on the conversion rate graph.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="Feature Flag list search bar and filtering" style="width:90%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

