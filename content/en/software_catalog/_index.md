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
- link: "/tracing/software_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Registering Services with the Service Definition API"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
  tag: "External Site"
  text: "Create and manage service definitions with Terraform"
- link: "/tracing/software_catalog/guides/upstream-downstream-dependencies"
  tag: "Guide"
  text: "See Upstream and Downstream Dependencies During an Active Incident"
- link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
  tag: "Blog"
  text: "Manage Service Catalog entries with the Service Definition JSON Schema"
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: "Blog"
  text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
- link: "https://www.datadoghq.com/blog/service-catalog-setup/"
  tag: "Blog"
  text: "Easily add tags and metadata to your services using the simplified Service Catalog setup"
- link: "https://www.datadoghq.com/blog/github-actions-service-catalog/"
  tag: "Blog"
  text: "I use GitHub Ac­tions for Data­dog's Service Catalog, and you should, too"
- link: "https://www.datadoghq.com/blog/shift-left-datadog-service-catalog/"
  tag: "Blog"
  text: "Improve your shift-left observability with the Datadog Service Catalog"
- link: "https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/"
  tag: "Blog"
  text: "Best practices for end-to-end service ownership with Datadog Service Catalog"
- link: "https://www.datadoghq.com/blog/service-catalog-schema-v3/"
  tag: "Blog"
  text: "Improve developer experience and collaboration with Service Catalog schema version 3.0"
- link: "https://www.datadoghq.com/blog/memory-leak-workflow/"
  tag: "Blog"
  text: "Investigate memory leaks and OOMs with Datadog's guided workflow"
- link: "https://www.datadoghq.com/blog/software-catalog/"
  tag: "Blog"
  text: "Improve developer experience and collaboration with Software Catalog"
algolia:
  tags: ['software catalog']
---

{{< img src="tracing/software_catalog/software_catalog_updated.mp4" video=true alt="Navigating around the Software Catalog" style="width:100%;" >}}

## Overview

[Software Catalog][1] provides a centralized, dynamic view of your software ecosystem, enabling teams to track ownership, monitor performance, manage dependencies, and enforce security and compliance standards—all in one place.

Built on real-time telemetry and automated metadata collection, Software Catalog extends beyond traditional software catalogs by offering integrations with observability, security, and cost management tools. It empowers engineering, SRE, security, and platform teams to maintain visibility, streamline operations, and ensure service reliability at scale.

{{< callout url="https://www.datadoghq.com/product-preview/internal-developer-portal/" d_target="#signupModal" btn_hidden="false" header="Opt in to the preview for our Internal Developer Portal!" >}}
{{< /callout >}}

## Key terminology

Service
: In APM, a [service][10] is a group of related endpoints, queries, or jobs that perform a piece of work for your application. For example, a service could be one of the following:

* URL endpoints grouped together under an API service.
* DB queries grouped together within one database service.
* A group of periodic jobs configured in the crond service.

Through custom instrumentation in APM, you can create an arbitrary `service`. In practice, microservice-based architecture includes multiple APM services, each measuring the performance of sub-components of the application through [Trace Metrics][2]. 

In the Software Catalog, you can collect non-instrumented services by declaring them through [metadata][12], or import additional services through external sources like [Backstage][13] or [ServiceNow][14]. 

System
: In the Software Catalog, a system is a group of components that cooperate to perform a broader function. For example, you can group multiple instrumented APM services into a system because they are operated by the same team. You can also use `system` to represent a full microservice-based architecture, and include components like APIs, datastores, queues, and other common building blocks.

**Note**: **System** in Datadog has the same meaning as in Backstage's [System Model][15]. 

Component
: In the Software Catalog, a component represents the smallest building block of modern microservice-based architecture. A component can be an instrumented APM service, an [inferred][16] or manually declared datastore, or an API. 


## Getting started

{{< whatsnext desc="Explore what Software Catalog has to offer:" >}}
    {{< nextlink href="/software_catalog/navigating/" >}}Navigating the Software Catalog{{< /nextlink >}}
    {{< nextlink href="/software_catalog/investigating" >}}Investigating a service{{< /nextlink >}}
{{< /whatsnext >}}

## Role based access and permissions

For general information, see [Role Based Access Control][2] and [Role Permissions][3].
### Read permission

The Software Catalog read permission allows a user to read Software Catalog data, which enables the following features:
- Software Catalog list
- Discover UI
- Service Definition endpoint: `/api/v2/services/definition/<service_name>`

The permission is enabled by default in the **Datadog Read Only Role** and **Datadog Standard Role**.

### Write permission

The Software Catalog write permission allows a user to modify Software Catalog data. The write permission is required for the following features:
- Inserting or Updating a Service Definition with the `POST /api/v2/services/definitions` endpoint
- Deleting a Service Definition with the `DELETE /api/v2/services/definition/<service_name>` endpoint
- Completing the onboarding process in the Discover Services UI
- Updating service metadata in the UI

The permission is enabled by default in the **Datadog Admin Role** and **Datadog Standard Role**.

{{< site-region region="gov" >}}
## Services types

Every monitored service is associated with a type. Datadog automatically determines this type based on the `span.type` attribute attached to incoming spans data. The type specifies the name of the application or framework that the Datadog Agent is integrating with.

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
## Filtering Software Catalog entries by component

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

## Data retention
The services and resources statistics, and span summaries on the **Service List** and **Service Page** are retained for up to 30 days. For customized queries on APM trace metrics, use Metric Explorer. [Learn more about data retention for APM][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /account_management/rbac/
[3]: /account_management/rbac/permissions/
[4]: /developers/guide/data-collection-resolution-retention/
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
