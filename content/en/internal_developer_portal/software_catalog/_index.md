---
title: Software Catalog
aliases:
  - /tracing/faq/software_catalog/
  - /tracing/services/services_list/
  - /tracing/visualization/services_list/
  - /tracing/software_catalog/
  - /tracing/faq/service_catalog/
  - /tracing/service_catalog/
  - /service_catalog/
further_reading:
- link: "/internal_developer_portal/software_catalog/use_cases"
  tag: "Documentation"
  text: "Learn about Software Catalog Use Cases"
algolia:
  tags: ['software catalog']
---

{{< img src="tracing/software_catalog/software_catalog_updated.mp4" video=true alt="Navigating around the Software Catalog" style="width:100%;" >}}

## Overview

[Software Catalog][1] provides a centralized, dynamic view of your software ecosystem, enabling teams to track ownership, monitor performance, manage dependencies, and enforce security and compliance standards—all in one place.

Built on real-time telemetry and automated metadata collection, Software Catalog extends beyond traditional software catalogs by offering integrations with observability, security, and cost management tools. It empowers engineering, SRE, security, and platform teams to maintain visibility, streamline operations, and ensure service reliability at scale.

## What you can do in Software Catalog
<br>
{{< img src="tracing/software_catalog/software_catalog_tabs.mp4" video=true alt="A video overview of the Software Catalog, with the Services component type selected, that scrolls through the Ownership, Reliability, Performance, Security, Costs, and Delivery tabs" style="width:100%;" >}}
<br>

- Track ownership: open a team's Slack channel, repo, or on-call rotation from the **Ownership** view
- Spot reliability risks: surface services with recent deploys, rising error rates, open incidents, or failing monitors in **Reliability**
- Prioritize performance work: filter by environment and compare latency, traffic, error rate, and Apdex in **Performance**
- Harden security posture: find vulnerable libraries and live attacks from a single list in **Security**
- Control cloud spend: link amortized AWS costs to code and infrastructure changes in **Costs**
- Shorten delivery cycles: inspect CI pipeline health, static-analysis violations, and DORA metrics in **Software Delivery**

See the [Use Cases documentation][4] to learn how teams use Datadog Software Catalog to centralize knowledge, streamline processes, improve operational efficiency, and more.

## What appears in Software Catalog

Software Catalog includes any entity (such as a service or datastore) that:
- Datadog [detects from telemetry][5],
- you [declare through an Entity Definition][6], or
- you [import from a third party][7] such as Backstage or ServiceNow.

[Learn more][3] about entity types and their configurations.

**Note**: 
- The entity supersedes the `type` filter (derived from the `span.type` span attribute), as it detects more reliably and more granularly the different entity types. For instance, you can filter by datastore technology using the `datastore type` facet.
- The services and resources statistics, and span summaries on the **Service List** and **Service Page**, are retained for up to 30 days. For customized queries on APM trace metrics, use Metric Explorer. [Learn more about data retention for APM][2].

{{< site-region region="gov" >}}
### Service types

Every monitored service is associated with a type. Datadog automatically determines type based on the `span.type` attribute attached to incoming spans data. The type specifies the name of the application or framework that the Datadog Agent is integrating with.

For example, if you use the official Flask Integration, the `Type` is set to "Web". If you are monitoring a custom application, the `Type` appears as "Custom".

The type of the service can be one of:

*  Cache
*  Custom
*  DB
*  Serverless function
*  Web

Some integrations alias to types. For example, Postgres, MySQL, and Cassandra map to the type "DB". Redis and Memcache integrations map to the type "Cache".

{{< /site-region >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /data_security/data_retention_periods/
[3]: /internal_developer_portal/software_catalog/entity_types
[4]: /internal_developer_portal/software_catalog/use_cases
[5]: /internal_developer_portal/software_catalog/set_up/discover_entities
[6]: /internal_developer_portal/software_catalog/set_up/create_entities
[7]: /internal_developer_portal/software_catalog/set_up/import_entities

