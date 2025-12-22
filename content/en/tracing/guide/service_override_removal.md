---
title: Remove Service Overrides
description: Learn how to remove integration service overrides from Datadog.
disable_toc: false
further_reading:
- link: "/tracing/guide/service_overrides"
  tag: "Documentation"
  text: "Service Overrides"
- link: "/tracing/services/inferred_services"
  tag: "Documentation"
  text: "Inferred Services"
---

This page explains how to remove integration service overrides in Datadog. For conceptual background, see [Service Overrides][10] and [Inferred Services][8].

## Prerequisites

Before you remove integration service overrides:

1. You must have the `apm_service_renaming_write` permission.
1. Your Datadog SDK version must support override removal. See [SDK version requirements](#sdk-version-requirements).

### SDK version requirements

| Language   | Minimum supported version |
|------------|---------------------------|
| .NET       | [3.4.0][1]                |
| Go         | [1.55.0][2]               |
| Java       | [1.20.0][3]               |
| Node.js    | [4.16.0][4]               |
| PHP        | [0.94.1][5]               |
| Python     | [1.19.0][6]               |
| Ruby       | [1.15.0][7]               |

## Remove service overrides

To remove service overrides in Datadog:

1. Navigate to **Software Catalog** > **Manage** > [**Manage Remapping Rules**][12], and click **Manage Overrides**. 

   {{< img src="tracing/guide/service_overrides/SO_removal_page.png" alt="Service Overrides page showing migration progress and removal options" style="width:100%;" >}}

1. For each override you plan to remove, review the related monitors and dashboards.

   These assets reference the overridden service name and stop matching after removal. Update them to use the base service name (`service:<DD_SERVICE>`) to preserve functionality.

   {{< img src="tracing/guide/service_overrides/SO_removal_page_sidepanel.png" alt="Service override side panel showing affected monitors and dashboards" style="width:100%;" >}}

1. Remove overrides individually or in bulk:
   - **Select specific overrides to remove**: Choose individual integration service overrides to remove. A **Migration Progress** bar shows your progress as you remove overrides. This action is reversible.
   - **Remove all overrides**: Select **Remove All Overrides** to permanently remove all integration service overrides and prevent future ones from appearing as APM usage increases. Custom service overrides are not affected.

     <div class="alert alert-danger">Removing all integration service overrides is permanent and cannot be undone.</div>

## Examples: Service naming after removal

Removing service overrides changes how client spans are tagged and how downstream dependencies are identified. After overrides are removed, client spans use the calling service's name (`service:<DD_SERVICE>`) instead of the integration-specific name. The called dependency is identified using [`peer.*` attributes][11] (for example, database or queue).

**gRPC example:**

| Scenario                  | Service name                                              | Additional `peer.*` attributes |
|---------------------------|-----------------------------------------------------------|--------------------------------|
| With service overrides    | `service:my-service-grpc-client` or `service:grpc-client` | None                           |
| Without service overrides | `service:myservice`                                       | `@peer.service:otherservice`   |

**MySQL example:**

| Scenario | Service name | Additional `peer.*` attributes |
|----------|--------------|--------------------------------|
| With service overrides | `service:my-service-mysql` or `service:mysql` | None |
| Without service overrides | `service:myservice` | `@peer.db.name:user-db`, `@peer.db.system:mysql` |

## Alternative: environment variable

You can also remove integration service overrides by setting an environment variable in your application configuration. This approach is useful if you cannot access the Datadog UI. Your SDK must meet the [minimum version requirements](#sdk-version-requirements).

Set the following environment variable:

```sh
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true
```

This ensures the `service` attribute always uses the base service name instead of appending the integration name (for example, `*-postgres`, `*-http-client`). Custom service overrides are not affected and must be removed directly in your code.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.4.0
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.55.0
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.20.0
[4]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.16.0
[5]: https://github.com/DataDog/dd-trace-php/releases/tag/0.94.1
[6]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.19.0
[7]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.15.0
[8]: /tracing/services/inferred_services
[9]: https://app.datadoghq.com/apm/settings/service-naming
[10]: /tracing/guide/service_overrides
[11]: /tracing/services/inferred_services/#peer-tags
[12]: https://app.datadoghq.com/software/settings/service-remapping
