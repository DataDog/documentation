---
title: Registering Services through the Datadog Service Definition API
kind: documentation
aliases:
- /tracing/faq/service_definition_api/
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
- link: "/api/latest/service-definition/"
  tag: "Documentation"
  text: "Service Definition API"
- link: "https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json"
  tag: "GitHub"
  text: "Service Definition Schema"
---

## Overview

A service is an independent, deployable unit of software. Datadog [Unified Service Tagging][1] provides a standard way to manage and monitor service ownership consistently across every telemetry type. If you want to define a service using additional criteria, customize the service definition that fits your architectural style and register it using this API. You may do this by using the reserved `service` tag: for example, `"service": "service-name"`.

For more details about creating, getting, and deleting service definitions, see the [Service Definitions API reference][8].

## Service Definition Schema (v2)

The Service Definition Schema is a structure that contains basic information about a service. See the [full schema on GitHub][4].

| Field                       |   Description      |Type  | Required |
| --------------------------- | --------------- | ------------------------------------------------------- | -------- |
| schema-version&nbsp;[_required_] | string          | Version of the service definition schema being used. Only value `v2` is supported.| yes |
| dd-service&nbsp;[_required_]     | string          | Unique identifier of the service. Must be unique across all services, and used to match with a service in Datadog. | yes |
| team                        | string          | Name of the team responsible for the service. | yes |

#### Example
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
schema-version: v2
dd-service: shopping-cart
team: E-Commerce Team
{{< /code-block >}}

#### Contacts (Optional)
| Field                       |   Description     |  Type| Required |
| --------------------------- | --------------- | ------------------------------------------------------- | -------- |
| Type | Contact type          | string| yes |
| name | Contact name          | string| no |
| contact | Contact value       | string| yes |

#### Example
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
contacts:
  - type: slack
    contact: http://slack/e-commerce
  - type: email 
    contact: ecommerce@example.com  
External Resources (Optional)
{{< /code-block >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/unified-service-tagging/
[2]: /tracing/service_catalog/
[3]: /account_management/api-app-keys/
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[7]: https://app.datadoghq.com/services/setup
[8]: /api/latest/service-definition/
