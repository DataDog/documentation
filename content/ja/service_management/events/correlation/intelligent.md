---
title: Intelligent Correlation
kind: Documentation
further_reading:
- link: service_management/events/correlation/triage_and_notify
  tag: Documentation
  text: Learn about triaging and notifiying on cases
---

{{< callout url="http://d-sh.io/eventmanagement" btn_hidden="false" header="Join the Beta!">}}
Join the Intelligent Correlation beta to automatically correlate events without the need for any configuration. 
{{< /callout >}}
## Overview

Intelligent Correlation uses a Machine Learning modeling approach. It automatically correlates on your behalf, using underlying telemetry gathered within Datadog, and other heuristics.
## Preview Intelligent Correlation

To get started:
1. Navigate to the [Correlation][1] page. 
1. From there you can preview the intelligent correlations that are created from your organization.
1. Create and customize your views to represent how you like specific teams to triage. For instance, one view for the database team, and another for the mobile team.


{{< img src="service_management/events/correlation/intelligent/intelligent_config.png" alt="Configure intelligent correlation" style="width:100%;" >}}


## Receiving your first case

{{< img src="service_management/events/correlation/intelligent/intelligent_project.png" alt="Event Management - Intelligent Correlation" style="width:100%;" >}}

When you navigate to [Case Management][2], find a project called **Event Management - Intelligent Correlation**. From this project, you can see the views you created before and the cases created by Intelligent Correlation. 

Intelligent Correlation generates cases automatically after it finds related alerts:
{{< img src="service_management/events/correlation/intelligent/intelligent_correlation.png" alt="Case detail page of case created from intelligent correlation, showing related alerts in the Investigation tab" style="width:100%;" >}}




## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/cases