---
title: Evaluate Production Readiness
aliases:
  - /service_catalog/use_cases/production_readiness
  - /tracing/service_catalog/guides/production_readiness
  - /tracing/service_catalog/use_cases/production_readiness
  - /service_catalog/guides/production_readiness
further_reading:
  - link: "/infrastructure/"
    tag: "Documentation"
    text: "Learn about Datadog Infrastructure Monitoring"
  - link: "/service_catalog/scorecards/"
    tag: "Documentation"
    text: "Learn about Service Catalog Scorecards"
  - link: "/cloud_cost_management/"
    tag: "Documentation"
    text: "Learn about Datadog Cloud Cost Management"
---

With Service Catalog, you can ensure your services are production-ready by evaluating monitoring coverage, enforcing governance best practices, and identifying security and cost optimization opportunities.

## Evaluate monitoring coverage

With Service Catalog, you can: 
- Identify services that lack monitoring or observability data.
- Detect gaps such as missing SLOs or monitors, or unowned services.
- Enforce tagging best practices and verify configurations for enabling cross-telemetry insights.

Open the Setup Guidance tab for a given service to check whether you've completed the necessary setup to leverage Datadog features like Monitors, SLOs, and Error Tracking. You can also check if your service is properly configured to collect key telemetry data, like tracing and logs.

{{< img src="tracing/service_catalog/production-readiness-setup-guidance.png" alt="The Setup Guidance tab for a service, which shows the configuration completeness of that service and recommended setup steps " style="width:100%;" >}}

**Note**: This table reflects service activity, not product billing. For example, if a service has not emitted infrastructure metrics for an extended period, Infrastructure Monitoring may display 'Not Detected', even if hosts or containers are running it.

## Governance and observation

### Use Scorecards to track health and performance

[Scorecards][1] provide a high-level view of best practices across teams and services, helping you communicate effectively and take informed action to improve service health and performance. Services with defined metadata in Service Catalog are automatically evaluated against pass-fail criteria for Production Readiness, Observability Best Practices, and Ownership & Documentation.

{{< img src="tracing/service_catalog/production-readiness-governance-and-obs.png" alt="Default scorecards for Production Readiness, Observability Best Practices, and Ownership and Documentation, with percent scores for each" style="width:100%;" >}}

### Use the Security tab to address vulnerabilities

Use the Security tab in Service Catalog to identify and remediate vulnerabilities in service dependencies. This view also reveals which services are most targeted by attacks and exposed to severe threats.

To access additional details about these vulnerabilities and signals, click on the service row to open a detailed side panel, or open the Service Page to its Security tab. 

{{< img src="tracing/service_catalog/production-readiness-security.png" alt="The security tab for a service, showing details about vulnerability risk and attack exposure" style="width:100%;" >}}

### Use the Costs tab to optimize spending

In the Costs tab, powered by [Cloud Cost Management][2], you can identify inefficiencies, cost-saving opportunities, and trends over time. With cost data and service metrics in one place, you can understand how engineering changes impact overall cloud spend.

For more information on a service’s cost changes, click on the service row to open a detailed side panel, or go to the Cloud Costs page by clicking “View in Analytics.”

{{< img src="tracing/service_catalog/production-readiness-cost-changes.png" alt="Your image description" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_catalog/scorecards/
[2]: /cloud_cost_management/
