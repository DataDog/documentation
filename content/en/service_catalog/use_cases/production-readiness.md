---
title: Evaluate Production Readiness
aliases:
  - /tracing/service_catalog/guides/production_readiness
  - /service_catalog/guides/production_readiness
  - /service_catalog/use_cases/production_readiness
further_reading:
  - link: "/tracing/service_catalog/"
    tag: "Documentation"
    text: "Datadog Service Catalog"
---

Service Catalog allows you to ensure your services are production ready by identifying gaps in monitoring coverage and additional governance capabilities. 

## Evaluate monitoring coverage

With Service Catalog, you can: 
- Detect which services aren’t reporting observability data or having that data monitored.
- Spot issues like missing SLOs, monitors, or services without ownership.
- Facilitate tagging best practices and check for recommended setup configurations to optimize cross-telemetry insights.

Through the Setup Guidance tab of each of your services, you can evaluate the coverage of your observability setup to ensure that all services have the expected configurations. 

{{< img src="tracing/service_catalog/production-readiness-setup-guidance.png" alt="The Setup Guidance tab for a service, which shows the configuration completeness of that service and recommended setup steps " style="width:100%;" >}}

You can also find which Datadog features you are actively using for a given service, to help you find and close gaps in your monitoring completeness.

This table does not necessarily reflect billing for individual products, but rather activity for the service you are presently examining. For example, if the service does not emit infrastructure metrics for a long time, Infrastructure Monitoring might have Not Detected specified, even if you have hosts or containers running infrastructure monitoring. 

## Governance and observation

Scorecards help you effectively communicate and take informed actions to improve your service’s health and performance by providing you with a high-level view of best practices across teams and services. All services with defined metadata in the Service Catalog are automatically evaluated against a set of pass-fail criteria across Production Readiness, Observability Best Practices, and Ownership & Documentation. 

{{< img src="tracing/service_catalog/production-readiness-governance-and-obs.png" alt="Default scorecards for Production Readiness, Observability Best Practices, and Ownership and Documentation, with percent scores for each" style="width:100%;" >}}

Through the Security tab, Service Catalog also supports you in reducing application risks by finding and fixing known security vulnerabilities in the dependencies of your services. This view also reveals which services are targeted by the most attackers and have the most severe threats. 

To access additional details about these vulnerabilities and signals, click on the service row to open a detailed side panel or open the service page to its security tab. 

{{< img src="tracing/service_catalog/production-readiness-security.png" alt="The security tab for a service, showing details about vulnerability risk and attack exposure" style="width:100%;" >}}

The Costs tab, powered by Cloud Cost Management, provides several ways to identify potential inefficiencies, saving opportunities, and change over time. With cost data alongside metrics available in Service Catalog, you can improve visibility into how engineering changes affect overall cloud spend. 

For more information on a service’s cost changes, click on the service row to open a detailed side panel or view this information on the Cloud Costs page by clicking “View in Analytics.”

{{< img src="tracing/service_catalog/production-readiness-cost-changes.png" alt="Your image description" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
