---
title: View Your Feature Flags
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


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

