---
title: Improve Incident Response
aliases:
  - /tracing/service_catalog/guides/incident_response
  - /service_catalog/guides/incident_response
  - /service_catalog/use_cases/incident_response
  - /tracing/service_catalog/guides/upstream-downstream-dependencies
  - /service_catalog/guides/upstream-downstream-dependencies
  - /tracing/service_catalog/use_cases/incident_response
further_reading:
  - link: "/tracing/service_catalog/"
    tag: "Documentation"
    text: "Datadog Service Catalog"
---


Service Catalog enhances incident response by:

- Improving the on-call experience by verifying and consolidating ownership details, communication channels, and monitoring and troubleshooting resources.
- Embedding solutions and tools--like runbooks and documentation--directly into existing observability workflows.
- Accelerating incident recovery by simplifying the process of identifying owners of upstream and downstream dependencies.

Service Catalog also integrates with Datadog Incident Management and PagerDuty, allowing you to view related incidents in the Reliability tab on the service details page.

{{< img src="tracing/service_catalog/incident-mgmt-reliability.png" alt="The Reliability tab for a service, showing incident and error metrics for the service overall and by version" style="width:100%;" >}}

Datadog Incidents automatically link to Service Catalog. Apply appropriate `SERVICE` tags to an incident to ensure that a service’s incident data are accurate. The PagerDuty integration must be manually set up to integrate with incident information in Service Catalog. 

To view incident statuses for upstream and downstream dependencies, click a service in Service Catalog to open the Service Details page, and then click on the Dependencies tab. 

{{< img src="tracing/service_catalog/incident-mgmt-incident-status.png" alt="The Dependencies tab for a service, showing upstream and downstream dependencies and highlighting those impacted by an incident" style="width:100%;" >}}



## Further reading

{{< partial name="whats-next/whats-next.html" >}}
