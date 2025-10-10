---
title: Evaluate Production Readiness
aliases:
  - /tracing/software_catalog/use_cases/production_readiness
  - /software_catalog/use_cases/production_readiness
further_reading:
  - link: "/infrastructure/"
    tag: "Documentation"
    text: "Infrastructure Monitoring"
  - link: "/software_catalog/scorecards/"
    tag: "Documentation"
    text: "Scorecards"
  - link: "/cloud_cost_management/"
    tag: "Documentation"
    text: "Cloud Cost Management"
---

With Software Catalog, you can ensure your entities are production-ready by evaluating monitoring coverage, enforcing governance best practices, and identifying security and cost optimization opportunities.

## Evaluate monitoring coverage

With Software Catalog, you can: 
- Identify entities that lack monitoring or observability data.
- Detect gaps such as missing SLOs or monitors, or unowned entities.
- Enforce tagging best practices and verify configurations for enabling cross-telemetry insights.

In [Software Catalog][3], click on an entity to open a detailed side panel, and find the Setup Guidance tab. In this section, you can check whether your service has the necessary setup to leverage Datadog features like Monitors, SLOs, and Error Tracking. You can also check if your service is properly configured to collect key telemetry data, like tracing and logs.

{{< img src="tracing/software_catalog/production-readiness-setup-guidance.png" alt="The Setup Guidance tab for a service, which shows the configuration completeness of that service and recommended setup steps " style="width:100%;" >}}

**Note**: This table reflects service activity, not product billing. For example, if a service has not emitted infrastructure metrics for an extended period, Infrastructure Monitoring may display 'Not Detected', even if hosts or containers are running it.

## Governance and observation

### Use Scorecards to track health and performance

[Scorecards][1] provide a high-level view of best practices across teams and services, helping you communicate effectively and take informed action to improve service health and performance. Entities with defined metadata in Software Catalog are automatically evaluated against pass-fail criteria for Production Readiness, Observability Best Practices, and Ownership & Documentation.

{{< img src="tracing/software_catalog/production-readiness-governance-and-obs.png" alt="Default scorecards for Production Readiness, Observability Best Practices, and Ownership and Documentation, with percent scores for each" style="width:100%;" >}}

### Use the Security tab to address vulnerabilities

Use the Security tab in Software Catalog to identify and remediate vulnerabilities in service dependencies. This view also reveals which services are most targeted by attacks and exposed to severe threats.

{{< img src="tracing/software_catalog/security-tab.png" alt="The Security tab view of Software Catalog, showing vulnerability risk and attack exposure for each service" style="width:100%;" >}}

To explore security details for a particular service, you can do one of the following:

- Click on a service in Software Catalog to open the service side panel, and find the Security tab. 

  {{< img src="tracing/software_catalog/production-readiness-security.png" alt="The Security tab for a single service, showing details about vulnerability risk and attack exposure" style="width:100%;" >}}

- Explore the Security tab on the Service Page, which can be found by hovering over a service name and selecting **Service Page**, or using the **Service Page** button in the top right corner of the side panel.

### Use the Costs tab to optimize spending

In the Costs tab, powered by [Cloud Cost Management][2], you can identify inefficiencies, cost-saving opportunities, and trends over time. With cost data and service metrics in one place, you can understand how engineering changes impact overall cloud spend.

{{< img src="tracing/software_catalog/production-readiness-cost-changes.png" alt="The Costs view of Software Catalog, showing total cost per service and change over time" style="width:100%;" >}}

To explore cost details for a specific service, you can do one of the following:

- Click on a service in Software Catalog to open the service side panel, and find the Costs tab.
- Explore the Costs tab on the Service Page, which can be found by hovering over a service name and selecting **Service Page**, or using the **Service Page** button in the top right corner of the side panel.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /software_catalog/scorecards/
[2]: /cloud_cost_management/
[3]: https://app.datadoghq.com/software
