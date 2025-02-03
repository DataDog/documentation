---
title: Evaluate Production Readiness
aliases:
  - /tracing/service_catalog/guides/production_readiness
  - /tracing/service_catalog/use_cases/production_readiness
  - /service_catalog/guides/production_readiness
  - /service_catalog/use_cases/production_readiness
further_reading:
  - link: "/tracing/service_catalog/"
    tag: "Documentation"
    text: "Datadog Service Catalog"
---

With Service Catalog, you can ensure your services are production-ready by evaluating monitoring coverage, enforcing governance best practices, and identifying security and cost optimization opportunities.

## Evaluate monitoring coverage

With Service Catalog, you can: 
- Identify services that lack monitoring or observability data.
- Detect gaps such as missing SLOs, monitors, or unowned services.
- Enforce tagging best practices and verify configurations for enabling cross-telemetry insights.

Use the Setup Guidance tab for a given service to evaluate observability coverage and confirm that all recommended configurations are implemented properly.

{{< img src="tracing/service_catalog/production-readiness-setup-guidance.png" alt="The Setup Guidance tab for a service, which shows the configuration completeness of that service and recommended setup steps " style="width:100%;" >}}

The Setup Guidance tab also shows which Datadog features are actively used for a given service so you can uncover and address gaps in monitoring coverage.

**Note**: This table reflects service activity, not product billing. For example, if a service has not emitted infrastructure metrics for an extended period, Infrastructure Monitoring may display 'Not Detected', even if hosts or containers are running it.

## Governance and observation

Scorecards provide a high-level view of best practices across teams and services, helping you communicate effectively and take informed action to improve service health and performance. Services with defined metadata in Service Catalog are automatically evaluated against pass-fail criteria for Production Readiness, Observability Best Practices, and Ownership & Documentation.

{{< img src="tracing/service_catalog/production-readiness-governance-and-obs.png" alt="Default scorecards for Production Readiness, Observability Best Practices, and Ownership and Documentation, with percent scores for each" style="width:100%;" >}}

Use the Security tab in Service Catalog to identify and remediate vulnerabilities in service dependencies. This view also reveals which services are most targeted by attacks and exposed to severe threats.

To access additional details about these vulnerabilities and signals, click on the service row to open a detailed side panel, or open the Service Page to its Security tab. 

{{< img src="tracing/service_catalog/production-readiness-security.png" alt="The security tab for a service, showing details about vulnerability risk and attack exposure" style="width:100%;" >}}

In the Costs tab, powered by Cloud Cost Management, you can identify inefficiencies, cost-saving opportunities, and trends over time. With cost data and service metrics in one place, you can understand how engineering changes impact overall cloud spend.

For more information on a service’s cost changes, click on the service row to open a detailed side panel, or go to the Cloud Costs page by clicking “View in Analytics.”

{{< img src="tracing/service_catalog/production-readiness-cost-changes.png" alt="Your image description" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
