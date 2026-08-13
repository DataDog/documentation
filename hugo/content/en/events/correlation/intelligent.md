---
title: Intelligent Correlation
aliases:
- /service_management/events/correlation/intelligent/
further_reading:
- link: "events/correlation/triage_and_notify"
  tag: "Documentation"
  text: "Learn about triaging and notifiying on cases"
---

## Overview

Intelligent Correlation automatically aggregates Monitor alerts into cases based on related infrastructure dependencies, underlying telemetry, and other heuristics.

## Enable Intelligent Correlation

Enabling the Intelligent Correlator applies to your entire Datadog organization. After it's enabled, it evaluates incoming monitor alerts, automatically grouping related ones into cases. You can return to the same page at any time to adjust the tag filters or disable the Correlator.

To get started:

1. On the [{{< ui >}}Settings{{< /ui >}}][1] page, find {{< ui >}}Intelligent Correlation{{< /ui >}} under {{< ui >}}Projects{{< /ui >}}, then click [{{< ui >}}Edit{{< /ui >}}][2] on the {{< ui >}}Intelligent Correlator{{< /ui >}} card.

   {{< img src="events/correlation/intelligent/intelligent_correlator_card.png" alt="Intelligent Correlation settings page showing the Intelligent Correlator card, currently off, with an Edit button" style="width:100%;" >}}

1. Under {{< ui >}}Define Intelligent Correlator{{< /ui >}}, optionally narrow the events the correlator evaluates:
   - {{< ui >}}Consider events with any of these tags{{< /ui >}}: Only events matching one of these tags are correlated. To consider all monitor alerts, leave this field empty.
   - {{< ui >}}Exclude events with any of these tags{{< /ui >}}: Events matching one of these tags are not correlated. This may be useful for filtering out noisy or non-production alerts.

   {{< img src="events/correlation/intelligent/intelligent_correlator_define.png" alt="Define Intelligent Correlator form with fields to include and exclude events by tag, and a Save and Enable button" style="width:100%;" >}}

1. Click {{< ui >}}Save & Enable{{< /ui >}}.

**Note**: Intelligent Correlation relies on relationships identified from your infrastructure and underlying telemetry. If there isn't enough telemetry to establish those relationships, you might not see correlated cases. By default, Intelligent Correlation only considers Monitor alerts that notify a paging integration (PagerDuty, Opsgenie, VictorOps, or on-call). If your organization has no monitors configured to page, Intelligent Correlation automatically considers high-priority (P1 or P2) alerts instead.

## Receiving your first case

{{< img src="events/correlation/intelligent/intelligent_project.png" alt="Event Management - Intelligent Correlation" style="width:100%;" >}}

When you navigate to [Event Correlations][3], find a project called {{< ui >}}Intelligent Correlation{{< /ui >}}. From this project, you can see the cases created by Intelligent Correlation. 

Intelligent Correlation generates cases automatically after it finds related alerts:
{{< img src="events/correlation/intelligent/intelligent_correlation.png" alt="Case detail page of case created from intelligent correlation, showing related alerts in the Investigation tab" style="width:100%;" >}}




## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/settings/correlation
[2]: https://app.datadoghq.com/event/correlation/rule/new?tab=intelligent
[3]: https://app.datadoghq.com/event/correlation
