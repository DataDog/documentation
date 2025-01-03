---
title: Drive Cloud Cost Accountability and Optimization
aliases:
  - /tracing/service_catalog/guides/cloud_cost_management
  - /service_catalog/guides/cloud_cost_management
further_reading:
  - link: "/tracing/service_catalog/"
    tag: "Documentation"
    text: "Datadog Service Catalog"
  - link: "/tracing/service_catalog/scorecards/"
    tag: "Documentation"
    text: "Datadog Scorecards"
  - link: "/cloud_cost_management/"
    tag: "Documentation"
    text: "Datadog Cloud Cost Management"
---

Datadog’s Service Catalog, Scorecards, and Workflow Automation work together to bridge the gap between FinOps policies and actionable team-level insights, empowering organizations to manage cloud costs effectively while driving accountability across teams.

## Proactive Monitoring of Cost Spikes

[Datadog's Cloud Cost Management][1] integrates with the Service Catalog to detect and alert on cost anomalies in real time. Teams can quickly investigate spikes by correlating them with service-level changes like traffic, deployments, or PR merges. 

{{< img src="tracing/service_catalog/ccm-use-cases-cost-spikes.png" alt="The Costs tab for a service in the Service Catalog, showing cost metrics for different components of the infrastructure." >}}

## Ensure FinOps Compliance and Cost Transparency

Teams can improve cost allocation by tagging cloud resources effectively and tracking compliance through [Scorecards][2]. For example, by applying "team” tags to infrastructure, and enforcing the practice through a custom scorecard rule, organizations enable granular cost tracking, fostering FinOps maturity and accountability while reducing waste. There are many other [Workflow blueprints][3] that are designed to level up your FinOps practices. You can directly leverage or further modify the evaluation logics in these blueprints for your exact use cases.

{{< img src="tracing/service_catalog/ccm-use-cases-finops.png" alt="A Scorecard rule that requires 80% of a service's costs to be tagged by team." >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: /service_catalog/scorecards/
[3]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
