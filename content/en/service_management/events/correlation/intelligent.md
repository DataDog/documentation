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
## Preview Intelligent Correlation

To get started:
1. Navigate to the [Correlation][1] page. 
1. From there you can preview the intelligent correlations that are created from your organization.
1. Create and customize your views to represent how you like specific teams to triage. For instance, one view for the database team, and another for the mobile team.


{{< img src="service_management/events/correlation/intelligent/intelligent_config.png" alt="Configure intelligent correlation" style="width:100%;" >}}


## Reciving your first case

When you navigate to Case Management you will see a project called **Event Management - Intelligent Correlation** within it is where you see the views which you created before, and also the cases. 

Intelligent Corelation will generate cases automatically once it finds related alerts, below is an example of one
{{< img src="service_management/events/correlation/intelligent/intelligent_correlation.png" alt="intelligent correlation case" style="width:100%;" >}}




## Further Reading

{{< partial name="whats-next/whats-next.html" >}}