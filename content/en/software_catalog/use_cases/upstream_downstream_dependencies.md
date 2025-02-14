---
title: See Upstream and Downstream Dependencies During an Active Incident
aliases:
  - /tracing/software_catalog/guides/upstream-downstream-dependencies
  - /software_catalog/guides/upstream-downstream-dependencies
  - /tracing/service_catalog/guides/upstream-downstream-dependencies
  - /service_catalog/guides/upstream-downstream-dependencies
  - /service_catalog/use_cases/upstream_downstream_dependencies
  - /service_catalog/use_cases/upstream-downstream-dependencies
further_reading:
- link: "/tracing/software_catalog/"
  tag: "Documentation"
  text: "Datadog Software Catalog"
---

Software Catalog integrates with incident management tools like [Datadog Incident Management][1] and [PagerDuty][2], and you can see information about related ongoing incidents on the service details **Reliability** tab.

{{< img src="tracing/software_catalog/svc_cat_reliability.png" alt="Software Catalog service details Reliability tab." >}}

Datadog Incidents are automatically connected to Software Catalog. Apply appropriate `SERVICE` tags to an incident to ensure that a service's incident data are accurate. PagerDuty incident integration requires that you have set up the [PagerDuty integration][2].

To see incident statuses of your service's upstream and downstream dependencies, click the service in the Software Catalog, and in the service details page, go to the **Dependencies** tab.

{{< img src="tracing/software_catalog/svc_cat_dependencies.png" alt="Software Catalog service details Dependencies tab." >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/incident_management/
[2]: /integrations/pagerduty/
