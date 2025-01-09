---
title: Manage and Optimize Cloud Costs
aliases:
  - /tracing/service_catalog/guides/cloud_cost_management
  - /service_catalog/guides/cloud_cost_management
  - /service_catalog/use_cases/cloud_cost_management
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

Datadog’s [Service Catalog][4], [Scorecards][2], and [Workflow Automation][5] enable organizations to monitor and optimize cloud costs with team-level granularity, ensuring appropriate cost allocation and protocol compliance.

## Proactively monitor cost spikes

[Datadog's Cloud Cost Management][1] integrates with the Service Catalog to detect and alert on cost anomalies in real time. Teams can quickly investigate spikes by correlating them with service-level changes like traffic fluctuations, deployments, or PR merges. 

{{< img src="tracing/service_catalog/ccm-use-cases-cost-spikes.png" alt="The Costs tab for a service in the Service Catalog, showing cost metrics for different components of the infrastructure." >}}

## Ensure cost compliance and transparency

Teams can monitor and optimize cost allocation by tagging cloud resources and tracking compliance with [Scorecards][2]. 

For example, you can enable team-level cost tracking by applying "team” tags to infrastructure components and setting a custom scorecard rule to enforce this practice. 

Datadog offers preconfigured [Workflow blueprints][3] to help you build cost management processes. You can use the blueprints as-is or modify the evaluation logic to fit your use case. 

{{< img src="tracing/service_catalog/ccm-use-cases-finops.png" alt="A Scorecard rule that requires 80% of a service's costs to be tagged by team." >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: /service_catalog/scorecards/
[3]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
[4]: /service_catalog/
[5]: /service_management/workflows/