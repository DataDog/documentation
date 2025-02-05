---
title: Software Catalog API Definitions
aliases:
  - /tracing/faq/service_definition_api/
  - /tracing/service_catalog/service_definition_api
  - /service_catalog/service_definition_api
  - /tracing/api_catalog/api_catalog_api/
  - /api_catalog/api_catalog_api
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Software Catalog"
- link: "/api/latest/service-definition/"
  tag: "Documentation"
  text: "Service Definition API"
- link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json"
  tag: "Source Code"
  text: "Service Definition Schema (v2)"
- link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2.1/schema.json"
  tag: "Source Code"
  text: "Service Definition Schema (v2.1)"
- link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2.2/schema.json"
  tag: "Source Code"
  text: "Service Definition Schema (v2.2)"
- link: "https://github.com/DataDog/schema/tree/main/service-catalog/v3"
  tag: "Source Code"
  text: "Entity Definition Schema (v3.0)"
algolia:
  tags: ['service definition']
---

This page outlines Datadog's API reference documentation for each schema version.

## v3.0 and later

To create, get, and delete definitions for all entity types like endpoints, systems, datastores, and queues, see the [Software Catalog API reference][3].

## v2.2 and earlier

- To create, get, and delete service definitions, see the [Service Definitions API reference][1].
- To create, get, and delete definitions for new component types like systems, datastores, and queues, see the [Software Catalog API reference][3].
- To create and update service scorecard rules and outcomes, see the [Service Scorecards API reference][2].





## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/service-definition/
[2]: /api/latest/service-scorecards/
[3]: /api/latest/software-catalog/
