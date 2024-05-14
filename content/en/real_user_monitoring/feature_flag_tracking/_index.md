---
title: Feature Flag Tracking
kind: documentation
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

## Overview

Feature flag data gives you greater visibility into your user experience and performance monitoring by allowing you to determine which users are being shown a specific feature and if any change you introduce is impacting your user experience or negatively affecting performance. 

By enriching your RUM data with feature flag data, you can: 
- Be confident that your feature will successfully launch without unintentionally causing a bug or performance regression
- Correlate feature releases with performance, pinpoint issues to specific releases, and troubleshoot faster
- Streamline data collection and analysis and focus on troubleshooting

## Set up feature flag data collection

To see detailed set up instructions, see our guide to [get started with feature flag data collection][1]

Feature flag tracking is available in the RUM Browser SDK. To start, set up [RUM browser monitoring][2]. You need the Browser RUM SDK version >= 4.25.0.

You can start collecting feature flag data for [custom feature flag management solutions][3], or using one of our integration partners. 

We support integrations with:

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

Feature flags will show up in the context of events where they are evaluated, meaning they should show up on the views that the feature flag code logic is run on.

## View your Feature Flags

Once you have set up your feature flag data collection, navigate to the [**Feature Flags**][4] tab within RUM.

From this view, you can investigate any questions you have about your feature flag's health and usage.
- Monitor the number of users experiencing each variant and see summary statistics of your feature flag
- Check the status of your feature flag to see if there are any that can be removed for code clean up
- View which pages your feature flags are being evaluated on

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="View a list of your feature flags to investigate any questions you have about your feature flag's health and usage" style="width:90%;" >}}


### Search and filter
Search and filter your feature flags by typing in the search bar. You can also use the faceted search to narrow down, broaden, or shift your focus on subsets of feature flags you are interested in.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="Feature Flag list search bar and filtering" style="width:90%;" >}}

### Feature Flag Status
There are three possible feature flag statuses:
- **Active**: The feature flag has evaluated different variants for the past 2 weeks
- **Inactive**: For the past 2 weeks, there have only been feature flag evaluations for your control variant
- **Out to 100%**: For the past 2 weeks, there have only been feature flag evaluations for one of your non-control variants

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

[1]: /real_user_monitoring/guide/setup-feature-flag-data-collection/
[2]: /real_user_monitoring/browser#setup
[3]: /real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=npm#custom-feature-flag-management
[4]: https://app.datadoghq.com/rum/feature-flags
[5]: /real_user_monitoring/session_replay/browser/
[6]: /real_user_monitoring/error_tracking/explorer/#explore-your-issues
[7]: https://app.datadoghq.com/rum/explorer
[8]: /dashboards/
[9]: /monitors/#create-monitors
