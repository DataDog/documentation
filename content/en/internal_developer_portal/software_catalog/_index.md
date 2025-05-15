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

{{< callout url="https://www.datadoghq.com/product-preview/internal-developer-portal/" d_target="#signupModal" btn_hidden="false" header="Opt in to the preview for our Internal Developer Portal!" >}}
{{< /callout >}}

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

See the [Use Cases documentation][23] to learn how teams use Datadog Software Catalog to centralize knowledge, streamline processes, improve operational efficiency, and more.

## What appears in Software Catalog

Software Catalog includes any entity (such as a service or datastore) that:
- Datadog [detects from telemetry][20],
- you [declare through an Entity Definition][21], or
- you [import from a third party][22] such as Backstage or ServiceNow.

**Note**: The services and resources statistics, and span summaries on the **Service List** and **Service Page** are retained for up to 30 days. For customized queries on APM trace metrics, use Metric Explorer. [Learn more about data retention for APM][4].

{{< site-region region="gov" >}}
### Services types

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
{{< site-region region="ap1,us3,us5,eu,us" >}}
### Component types

Every entry showing up in the Software Catalog is categorized as a component type:

*  Services
*  Datastores
*  Queues
*  RUM Apps
*  External providers
*  Endpoints

{{< img src="tracing/software_catalog/select-component.png" alt="Software Catalog component selector" style="width:30%;" >}}

Datadog populates Software Catalog entries and determines their associated component type based on collected span attributes for APM ([peer tags][10]), but also based other collected telemetry types (USM, DSM, RUM, etc...).

**Note**: The component supersedes the `type` filter (derived from the `span.type` span attribute), as it detects more reliably and more granularly the different entity types. For instance, you can filter by datastore technology using the `datastore type` facet.

[10]: /tracing/services/inferred_services#peer-tags
{{< /site-region >}}

## Key terminology

Service
: In APM, a [service][10] is a group of related endpoints, queries, or jobs that perform a piece of work for your application. For example, a service could be a group of endpoints, a group of DB queries, or a group of periodic jobs. Through custom instrumentation in APM, you can create an arbitrary `service`. In practice, microservice-based architecture includes multiple APM services, each measuring the performance of sub-components of the application through [Trace Metrics][2]. In the Software Catalog, you can collect non-instrumented services by declaring them through [metadata][12]. You can also import additional services through external sources like [Backstage][13] or [ServiceNow][14].

System
: In the Software Catalog, a system is a group of components that cooperate to perform a broader function. For example, you can group multiple instrumented APM services into a system because they are operated by the same team. You can also use `system` to represent a full microservice-based architecture, and include components like APIs, datastores, queues, and other common building blocks.
: **Note**: **System** in Datadog has the same meaning as in Backstage's [System Model][15]. 

Component
: In the Software Catalog, a component represents the smallest building block of modern microservice-based architecture. A component can be an instrumented APM service, an [inferred][16] or manually declared datastore, an API, or a queue. 

Endpoint
: An endpoint refers to a specific route or path within a service that handles requests. For example, `/api/v2/messages/send`. Software Catalog contains HTTP endpoints that are automatically discovered by APM. The concept of endpoints correspond to [APM resources][19] for an APM web service. APM provides performance metrics such as request count, latency, and error rate. Users can also add other unmonitored endpoints to Software Catalog through metadata [Definitions][17]. 

API
: In the Software Catalog, an API refers to a collection of endpoints that belong together logically. APIs offer an alternative way to group endpoints beyond APM services (the mapping between endpoints and services are not modifiable). Users can define team and add additional endpoints (regardless of whether they are monitored by APM) by providing a `kind:API` metadata [Definition][18] in Software Catalog. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /account_management/rbac/
[3]: /account_management/rbac/permissions/
[4]: /data_security/data_retention_periods/
[5]: /tracing/software_catalog/adding_metadata#service-definition-schema-v22
[6]: https://www.datadoghq.com/blog/tagging-best-practices/#assign-owners-to-services-with-tags
[7]: /tracing/other_telemetry/
[8]: /software_catalog/add_metadata#metadata-schema-v30-beta
[9]: /software_catalog/scorecards/
[10]: /glossary/#service
[11]: /opentelemetry/integrations/trace_metrics/
[12]: /software_catalog/customize/create_entries
[13]: /software_catalog/customize/import_entries_backstage
[14]: /software_catalog/customize/import_entries_servicenow
[15]: https://backstage.io/docs/features/software-catalog/system-model/
[16]: /tracing/services/inferred_services/?tab=agentv7551#naming-inferred-entities
[17]: /software_catalog/service_definitions/v3-0/
[18]: /software_catalog/service_definitions/#add-metadata-to-endpoints
[19]: /tracing/glossary/#resources
[20]: /internal_developer_portal/software_catalog/set_up/discover_entities
[21]: /internal_developer_portal/software_catalog/set_up/create_entities
[22]: /internal_developer_portal/software_catalog/set_up/import_entities
[23]: /internal_developer_portal/software_catalog/use_cases
