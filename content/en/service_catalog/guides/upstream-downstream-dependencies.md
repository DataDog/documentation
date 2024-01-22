---
title: See Upstream and Downstream Dependencies During an Active Incident
kind: guide
aliases:
  - /tracing/service_catalog/guides/upstream-downstream-dependencies
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

Service Catalog integrates with incident management tools like [Datadog Incident Management][1] and [PagerDuty][2], and you can see information about related ongoing incidents on the service details **Reliability** tab.

{{< img src="tracing/service_catalog/svc_cat_reliability.png" alt="Service Catalog service details Reliability tab." >}}

Datadog Incidents are automatically connected to Service Catalog. Apply appropriate `SERVICE` tags to an incident to ensure that a service's incident data are accurate. PagerDuty incident integration requires that you have set up the [PagerDuty integration][2].

To see incident statuses of your service's upstream and downstream dependencies, click the service in the Service Catalog, and in the service details page, go to the **Dependencies** tab.

{{< img src="tracing/service_catalog/svc_cat_dependencies.png" alt="Service Catalog service details Dependencies tab." >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/incident_management/
[2]: /integrations/pagerduty/
