---
title: Feature Flag Tracking
description: "Track feature flag usage and performance impact in RUM to maintain release safety and optimize user experience with controlled rollouts."
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
  text: "Help ensure release safety with feature flag tracking in Datadog RUM"
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Create and manage feature flags in Datadog"

---

{{< callout header="Create flags directly in Datadog!" hide_image="true" btn_title="Learn More" btn_url="https://www.datadoghq.com/product/feature-flags/">}}
  <a href="/feature_flags/">Datadog Feature Flags</a> natively integrates feature flag creation with leading observability data, making your workflows faster and more automated. Detect issues directly from new feature rollouts, orchestrate canary releases that automatically roll forward or roll back based on monitors, and support experimentation without sacrificing reliability.
{{< /callout >}}

## Overview

Feature flag data provides greater visibility into user experience and performance monitoring. It allows you to determine which users are being shown a specific feature and assess if any changes introduced are impacting user experience or negatively affecting performance. You can use this information to determine whether or not to roll back the feature.

By enriching your RUM data with feature flag data, you can:

- Be confident that your feature successfully launches without unintentionally causing a bug or performance regression
- Correlate feature releases with performance, pinpoint issues to specific releases, and troubleshoot faster
- Simplify data collection and analysis and focus on troubleshooting

## Supported frameworks

Feature flag tracking is available in the RUM Browser, iOS, Android, Flutter, and React Native SDK. To start, [set up RUM monitoring for browser or mobile][1].

You can start collecting feature flag data for [custom feature flag management solutions][2], or using one of Datadog's integration partners. 

You can track feature flags using one of Datadog's integration partners or your own [custom feature flag management solution][2]:

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

You can also use [Datadog Feature Flags][3], which natively integrates with RUM and other Datadog observability features.

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

## Start using feature flags

To get started with feature flags, set up feature flag tracking for the browser SDK or mobile SDK, then start collecting data using one of Datadog's integration partners or a custom feature flag management solution.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/real_user_monitoring/feature_flag_tracking/setup">}}<u>Setup</u>: Learn how to set up RUM to capture feature flag data and analyze the performance in Datadog.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/feature_flag_tracking/using_feature_flags">}}<u>Use your feature flags</u>: Learn how to view and analyze your feature flag's health and usage.{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/real_user_monitoring/feature_flag_tracking/setup/
[2]: /real_user_monitoring/setup/?tab=npm#custom-feature-flag-management
