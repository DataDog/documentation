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

Intelligent Correlation uses a Machine Learning modeling approach. It automatically correlates Datadog Monitor events on your behalf, using underlying telemetry gathered within Datadog, and other heuristics.
## Enable Intelligent Correlation

To get started:

1. On the [{{< ui >}}Intelligent Correlation{{< /ui >}} settings][1] page, click [{{< ui >}}Edit{{< /ui >}}][2] on the {{< ui >}}Intelligent Correlator{{< /ui >}} card.

   {{< img src="events/correlation/intelligent/intelligent_correlator_card.png" alt="Intelligent Correlation settings page showing the Intelligent Correlator card, currently off, with an Edit button" style="width:100%;" >}}

1. Under {{< ui >}}Define Intelligent Correlator{{< /ui >}}, optionally narrow the events the correlator evaluates, then click {{< ui >}}Save & Enable{{< /ui >}}.
   - {{< ui >}}Consider events with any of these tags{{< /ui >}}: only events matching one of these tags are correlated. Leave this empty to consider all Monitor alerts.
   - {{< ui >}}Exclude events with any of these tags{{< /ui >}}: events matching one of these tags are never correlated, which is useful for filtering out noisy or non-production alerts.

   {{< img src="events/correlation/intelligent/intelligent_correlator_define.png" alt="Define Intelligent Correlator form with fields to include and exclude events by tag, and a Save and Enable button" style="width:100%;" >}}

Enabling the Intelligent Correlator applies to your entire organization. After it's enabled, it will evaluate incoming Monitor alerts and group related ones into cases automatically. You can return to the same page at any time to adjust the tag filters or disable the correlator.


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
