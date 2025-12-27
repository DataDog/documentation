---
title: Intelligent Correlation
aliases:
- /service_management/events/correlation/intelligent/
further_reading:
- link: "service_management/events/correlation/triage_and_notify"
  tag: "Documentation"
  text: "Learn about triaging and notifiying on cases"
---

## Overview

Intelligent Correlation uses a Machine Learning modeling approach. It automatically correlates Datadog Monitor events on your behalf, using underlying telemetry gathered within Datadog, and other heuristics.
## Enable Intelligent Correlation

To get started:
1. Navigate to the [Correlation Settings][1] page, and click [Preview Cases][2]. 
1. From there you can preview the intelligent correlations that are created from your organization.


{{< img src="service_management/events/correlation/intelligent/intelligent_config_updated.png" alt="Configure intelligent correlation" style="width:100%;" >}}


## Receiving your first case

{{< img src="service_management/events/correlation/intelligent/intelligent_project.png" alt="Event Management - Intelligent Correlation" style="width:100%;" >}}

When you navigate to [Event Correlations][3], find a project called **Intelligent Correlation**. From this project, you can see the cases created by Intelligent Correlation. 

Intelligent Correlation generates cases automatically after it finds related alerts:
{{< img src="service_management/events/correlation/intelligent/intelligent_correlation.png" alt="Case detail page of case created from intelligent correlation, showing related alerts in the Investigation tab" style="width:100%;" >}}




## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/settings/correlation
[2]: https://app.datadoghq.com/event/correlation/rule/new?tab=intelligent
[3]: https://app.datadoghq.com/event/correlation
