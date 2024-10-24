---
title: Getting Started with Feature Flag Data in RUM

beta: true
description: Learn how to set up RUM to capture feature flag data and analyze the performance in Datadog
aliases:
- /real_user_monitoring/guide/getting-started-feature-flags/
further_reading:
- link: '/real_user_monitoring/feature_flag_tracking'
  tag: 'Documentation'
  text: 'Analyze your feature flag data with Feature Flag Tracking'
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the RUM Explorer'
---

## Analyze your Feature Flag performance in RUM

Feature flags appear in the context of your RUM Sessions, Views, and Errors as a list.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="Feature Flag list of attributes in RUM Explorer" style="width:75%;">}}

### Search feature flags using the RUM Explorer
Search through all the data collected by RUM in the [RUM Explorer][2] to surface trends on feature flags, analyze patterns with greater context, or export them into [dashboards][3] and [monitors][4]. You can search your Sessions, Views, or Errors in the RUM Explorer, with the `@feature_flags.{flag_name}` attribute.

#### Sessions
Filtering your **Sessions** with the `@feature_flags.{flag_name}` attribute, you can find all sessions in the given time frame where your feature flag was evaluated.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="Search Sessions for Feature Flags in the RUM Explorer" style="width:75%;">}}

#### Views
Filtering your **Views** with the `@feature_flags.{flag_name}` attribute, you can find the specific views in the given time frame where your feature flag was evaluated.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="Search Views for Feature Flags in the RUM Explorer" style="width:75%;">}}

#### Errors
Filtering your **Errors** with the `@feature_flags.{flag_name}` attribute, you can find all the errors in the given time frame that occurred on the View where your feature flag was evaluated

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="Search Errors for Feature Flags in the RUM Explorer" style="width:75%;">}}

## Troubleshooting

### My feature flag data doesn't reflect what I expect to see
Feature flags show up in the context of events where they are evaluated, meaning they should show up on the views that the feature flag code logic is run on.

Depending on how you've structured your code and set up your feature flags, you may see unexpected feature flags appear in the context of some events.

For example, to see what **Views** your feature flag is being evaluated on, you can use the RUM Explorer to make a similar query:

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="Search Views for Feature Flags in the RUM Explorer" style="width:75%;">}}

Here are a few examples of reasons why your feature flag is being evaluated on unrelated Views that can help with your investigations:

- A common react component that appears on multiple pages which evaluates feature flags whenever they run.
- A routing issue where components with a feature flag evaluation are rendered before/after URL changes.

When performing your investigations, you can also scope your data for `View Name`'s that are relevant to your feature flag.


## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup
[2]: https://app.datadoghq.com/rum/explorer
[3]: /dashboards/
[4]: /monitors/#create-monitors
[5]: /real_user_monitoring/feature_flag_tracking
