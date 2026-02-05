---
title: Improve Incident Response
aliases:
  - /tracing/software_catalog/use_cases/incident_response
  - /tracing/software_catalog/guides/upstream-downstream-dependencies
  - /software_catalog/guides/upstream-downstream-dependencies
  - /tracing/service_catalog/guides/upstream-downstream-dependencies
  - /service_catalog/guides/upstream-downstream-dependencies
  - /service_catalog/use_cases/upstream_downstream_dependencies
  - /software_catalog/use_cases/incident_response
further_reading:
  - link: "/incident_response/incident_management/"
    tag: "Documentation"
    text: "Incident Management"
  - link: "/integrations/pagerduty/"
    tag: "Documentation"
    text: "PagerDuty integration"
  - link: "/tracing/software_catalog/guides/upstream-downstream-dependencies"
    tag: "Guide"
    text: "See Upstream and Downstream Dependencies During an Active Incident"
---


Software Catalog enhances incident response by:

- Improving the on-call experience by verifying and consolidating ownership details, communication channels, and monitoring and troubleshooting resources.
- Embedding solutions and tools--like runbooks and documentation--directly into existing observability workflows.
- Accelerating incident recovery by simplifying the process of identifying owners of upstream and downstream dependencies.

Software Catalog also integrates with [Datadog Incident Management][1] and [PagerDuty][2], allowing you to view related incidents in the Reliability tab on the Service Details page.

**Note**: Datadog Incidents automatically link to Software Catalog, but you should apply `SERVICE` tags to incidents to ensure each service's incident data are accurate. The PagerDuty integration must be manually set up to integrate with incident information in Software Catalog. 

{{< img src="tracing/software_catalog/incident-mgmt-reliability.png" alt="The Reliability tab for a service, showing incident and error metrics for the service overall and by version" style="width:100%;" >}}

To view incident statuses for upstream and downstream dependencies, click a service in Software Catalog to open the Service Details page, and then click on the Dependencies tab. 

{{< img src="tracing/software_catalog/incident-mgmt-incident-status.png" alt="The Dependencies tab for a service, showing upstream and downstream dependencies and highlighting those impacted by an incident" style="width:100%;" >}}



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/
[2]: /integrations/pagerduty/
