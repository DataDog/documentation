---
title: Intelligent Correlation
kind: Documentation
further_reading:
- link: "service_management/events/correlation/triage_and_notify"
  tag: "Documentation"
  text: "Learn about triaging and notifiying on cases"
---

{{< callout url="http://d-sh.io/eventmanagement" btn_hidden="false" header="Join the Beta!">}}
Join the Intelligent Correlation beta to automatically correlate events without the need for any configuration. 
{{< /callout >}}
## Overview

Intelligent Correlation uses a Machine Learning modeling approach. It automatically correlates on your behalf, using underlying telemetry gathered within Datadog, and other heuristics.

## Reciving your first case

When you navigate to [Case Management][1], find a project called **Event Management - Intelligent Correlation**. From this project, you can see the views you created before and the cases created by Intelligent Correlation. 

Intelligent Correlation generates cases automatically after it finds related alerts:
{{< img src="service_management/events/correlation/intelligent/intelligent_correlation.png" alt="Case detail page of case created from intelligent correlation, showing related alerts in the Investigation tab" style="width:100%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases