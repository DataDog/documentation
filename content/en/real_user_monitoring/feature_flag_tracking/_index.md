---
title: Feature Flag Tracking
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

Feature flag data provides greater visibility into user experience and performance monitoring. It allows you to determine which users are being shown a specific feature and assess if any changes introduced are impacting user experience or negatively affecting performance. You can use this information to determine whether or not to roll back the feature.

By enriching your RUM data with feature flag data, you can:

- Be confident that your feature successfully launches without unintentionally causing a bug or performance regression
- Correlate feature releases with performance, pinpoint issues to specific releases, and troubleshoot faster
- Streamline data collection and analysis and focus on troubleshooting

## Supported frameworks

Feature flag tracking is available in the RUM Browser SDK. To start, set up [RUM browser monitoring][2]. You need the Browser RUM SDK version >= 4.25.0.

You can start collecting feature flag data for [custom feature flag management solutions][3], or using one of our integration partners. 

We support integrations with:

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

[1]: /real_user_monitoring/setup/
[2]: /real_user_monitoring/browser#setup
[3]: /real_user_monitoring/setup/?tab=npm#custom-feature-flag-management
[4]: https://app.datadoghq.com/rum/feature-flags
[5]: /real_user_monitoring/session_replay/browser/
[6]: /real_user_monitoring/error_tracking/explorer/#explore-your-issues
[7]: https://app.datadoghq.com/rum/explorer
[8]: /dashboards/
[9]: /monitors/#create-monitors
