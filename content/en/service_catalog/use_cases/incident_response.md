---
title: Streamline Incident Response
aliases:
  - /tracing/service_catalog/guides/incident_response
  - /service_catalog/guides/incident_response
  - /service_catalog/use_cases/incident_response
  - /tracing/service_catalog/guides/upstream-downstream-dependencies
  - /service_catalog/guides/upstream-downstream-dependencies
further_reading:
  - link: "/tracing/service_catalog/"
    tag: "Documentation"
    text: "Datadog Service Catalog"
---

Service Catalog allows you to streamline collaboration during incidents by: 

- Improving the on-call experience for everyone by establishing correct ownership information and communication channels, alongside streamlined access to monitoring and troubleshooting details.
- Embedding links to solutions and troubleshooting tools such as runbooks and documentation directly in the observability tooling engineers are already using.
- Speeding incident recovery by increasing confidence and simplifying locating owners of upstream and downstream services and dependencies.

Service Catalog also integrates with incident management tools like Datadog Incident Management and PagerDuty, and you can see information about related ongoing incidents on the service details Reliability tab.

{{< img src="tracing/service_catalog/incident-mgmt-reliability.png" alt="Your image description" style="width:100%;" >}}

Datadog Incidents are automatically connected to Service Catalog. Apply appropriate SERVICE tags to an incident to ensure that a service’s incident data are accurate. PagerDuty incident integration requires that you have set up the PagerDuty integration.

To see incident statuses of your service’s upstream and downstream dependencies, click the service in the Service Catalog, and in the service details page, go to the Dependencies tab.

{{< img src="tracing/service_catalog/incident-mgmt-incident-status.png" alt="Your image description" style="width:100%;" >}}



## Further reading

{{< partial name="whats-next/whats-next.html" >}}
