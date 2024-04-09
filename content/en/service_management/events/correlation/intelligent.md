---
title: Intelligent Correlation
kind: Documentation
further_reading:
- link: "service_management/events/correlation/triage_and_notify"
  tag: "Documentation"
  text: "Learn about triaging and notifiying on cases"
---

{{< callout url="http://d-sh.io/eventmanagement" btn_hidden="false" header="Join the Beta!">}}
Join the Intelligent correlation beta which uses a ML modeling approach, where based on the underlying telemetry gathered within Datadog, and other heuristics, we automatically correlate on your behalf, without the need for any configuration. 
{{< /callout >}}

### Preview Intelligent Correlation

Once you have joined the beta, to get started first navigate to the [Correlation][1] page. From there you will be able to start previewing the intelligent correlalations which would have been created from your organization.


{{< img src="service_management/events/correlation/intelligent/intelligent_config.png" alt="Configure intelligent correlation" style="width:100%;" >}}

Create the views to represent how you like your team to triage, for instance, perhaps one for the database team, and another for the mobile. 

### Reciving your first case

When you navigate to Case Management you will see a project called **Event Management - Intelligent Correlation** within it is where you see the views which you created before, and also the cases. 

Intelligent Corelation will generate cases automatically once it finds related alerts, below is an example of one
{{< img src="service_management/events/correlation/intelligent/intelligent_correlation.png" alt="intelligent correlation case" style="width:100%;" >}}


[1]: https://app.datadoghq.com/event/correlation


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}