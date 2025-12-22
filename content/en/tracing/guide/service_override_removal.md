---
title: Remove Service Overrides
description: Learn how to remove integration service overrides using the Datadog user interface or environment variables.
disable_toc: false
further_reading:
- link: "/tracing/guide/service_overrides"
  tag: "Documentation"
  text: "Service Overrides"
- link: "/tracing/services/inferred_services"
  tag: "Documentation"
  text: "Inferred Services"
---

You can remove integration service overrides to clean up your service maps and ensure dependencies are represented by [inferred services][8]. This page covers two approaches:

- **[Datadog user interface (UI)](#remove-overrides-from-the-datadog-ui)**: Remove overrides directly from the Service Override page in Datadog and get visibility into potential impacts, such as affected monitors and dashboards.
- **[Environment variable](#remove-overrides-with-environment-variables)**: Set `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` in your application configuration.

<div class="alert alert-warning">Removing service overrides is a <strong>breaking change</strong>. Metrics, monitors, or dashboard queries based on overridden service names stop matching after removal. Datadog surfaces these potential impacts in the UI. </div>

## Prerequisites

To remove integration service overrides:

1. You must have the `apm_service_renaming_write` permission.
1. Your tracer version must support override removal. See [Tracer version requirements](#tracer-version-requirements).

### Tracer version requirements

| Language   | Minimum version |
|------------|-----------------|
| .NET       | [3.4.0][1]      |
| Go         | [1.55.0][2]     |
| Java       | [1.20.0][3]     |
| Node.js    | [4.16.0][4]     |
| PHP        | [0.94.1][5]     |
| Python     | [1.19.0][6]     |
| Ruby       | [1.15.0][7]     |


## Remove overrides in Datadog

To remove service overrides in the Datadog UI, navigate to [**APM** > **Service Overrides**][9]. Then, do one of the following:

1. **Select specific overrides to remove**: Choose individual integration service 
overrides to remove. A **Migration Progress** bar displays 
your progress as you remove overrides. This action is reversible. 
2. **Removal all and future service overrides**: Select **Remove All Overrides** to 
permanently remove all integration service overrides and prevent future ones that may 
appear by increasing the usage of APM. Custom service overrides are not affected.

   <div class="alert alert-danger"><strong>Removing all integration service overrides is permanent and cannot be undone.</strong></div>

## Remove overrides with environment variables

To remove integration service overrides through configuration, set the following environment variable:

```sh
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true
```

This ensures the `service` attribute always uses the base service name instead of appending the integration name (for example, `*-postgres`, `*-http-client`).

**Note**: This configuration only removes [integration service overrides][10]. Custom service overrides must be removed directly in your code.

### Examples

With `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`, all supported tracing libraries tag client spans with the calling service's name (`service:<DD_SERVICE>`) instead of the integration-specific name. [`peer.*` attributes][11] describe the called dependency (for example, database or queue).

**gRPC example:**

| Scenario | Service name | Additional `peer.*` attributes |
|----------|--------------|--------------------------------|
| With service overrides | `service:my-service-grpc-client` or `service:grpc-client` | None |
| Without service overrides | `service:myservice` | `@peer.service:otherservice` |

**MySQL example:**

| Scenario | Service name | Additional `peer.*` attributes |
|----------|--------------|--------------------------------|
| With service overrides | `service:my-service-mysql` or `service:mysql` | None |
| Without service overrides | `service:myservice` | `@peer.db.name:user-db`, `@peer.db.system:mysql` |

## Remove overrides progressively

To minimize disruption, remove service overrides one at a time and update dependent assets before proceeding.

1. **Identify the override to remove**: Navigate to the **service page** for the override you want to remove.

1. **Find the base services**: Hover over the service override pill in the page header to see the underlying base service names. These are the services emitting spans with overrides.

   {{< img src="/tracing/guide/service_overrides/service_overrides_service_page.png" alt="Service page showing service override pill with base services on hover" style="width:70%;">}}

1. **Audit dependent assets**: Review assets that might query the overridden service name:
   - Monitors, dashboards, and notebooks using [APM trace metrics][12]
   - [Metrics generated from spans][13]
   - [Trace analytics monitors][14]
   - [Retention filters][15]
   - Sensitive Data Scanner pipelines

1. **Update queries**: Change queries to use the base service name (`service:<DD_SERVICE>`) so they continue matching after removal.

1. **Remove the override**: Use either the [Datadog UI](#remove-overrides-from-the-datadog-ui) or [environment variable](#remove-overrides-with-environment-variables) to remove the override.

1. **Repeat** for each service override you want to remove.

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
[10]: /tracing/guide/service_overrides/#integration-service-overrides
[11]: /tracing/services/inferred_services/#peer-tags
[12]: /tracing/metrics/metrics_namespace/
[13]: /tracing/trace_pipeline/generate_metrics
[14]: /monitors/types/apm/?tab=traceanalytics
[15]: /tracing/trace_pipeline/trace_retention/#retention-filters
