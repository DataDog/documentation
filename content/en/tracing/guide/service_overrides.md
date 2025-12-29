---
title: Service Overrides
description: Understand service overrides and how to adapt your configuration when using inferred services to improve service dependency representation.
disable_toc: false
further_reading:
- link: "/tracing/services/inferred_services"
  tag: "Documentation"
  text: "Inferred services"
---

## Overview

[Inferred services][1] improve how Datadog represents service dependencies. This document explains the changes and how to adapt your configuration.

### Before inferred services

Datadog used to change service names of client spans (`span.kind:client`) to represent databases, queues, and third-party dependencies. For example, a client call from service `A` to a PostgreSQL database would be tagged as `service:postgres` or `service:A-postgres`. Changing the service name of spans is referred to as a [**service override**](#service-override) in the rest of this guide. The initial service name is referred to as the [**base service**](#base-service).

In this approach, a span representing a client call from a service `auth-dotnet` to a PostgreSQL database would be tagged with `service:auth-dotnet-postgres`. In service maps, these dependencies were represented as separate services, as shown below:

{{< img src="/tracing/guide/service_overrides/old_service_rep.png" alt="Old Service Representation" style="width:80%;">}}

### With inferred services

Dependencies are automatically inferred from span attributes collected on client spans (for example, `db.system`, `db.name`). The client span retains the base service name, and the database is inferred using other attributes. As a result, there's no need to change the `service` attribute on the client span anymore.

Using the previous example, the client span would now be tagged with the base service name `auth-dotnet`, and the database would be inferred from attributes like `db.name:user-db` and `db.system:postgres`. The service map representation would look like this:

{{< img src="/tracing/guide/service_overrides/new_service_rep.png" alt="New Service Representation" style="width:70%;">}}


### Impact on service overrides

With inferred service dependencies, service overrides might pollute service lists and maps. In service maps, you would see the following nodes in order:
1. The base service node, for example: `auth-dotnet`.
1. The service override node, for example: `auth-dotnet-postgres`.
1. The new inferred service node, for example: `user-db`.

{{< img src="/tracing/guide/service_overrides/service_overrides_new_service_rep.png" alt="Service Overrides" style="width:100%;">}}

The service override (`auth-dotnet-postgres`) breaks the direct connection between the base service and the inferred service. It is not useful anymore as the database dependency is now properly represented by the inferred service.

## How service overrides are set

#### Integration service overrides

Datadog tracing libraries automatically set different service names on client spans to represent databases, queues, or third-party service dependencies in integrations. These types of service overrides are referred to as **integration service overrides** in the rest of the guide.

#### Custom service overrides

Service names can also be set manually by users, for instance to gain visibility on specific components of the service (shared libraries, middleware layers). These types of service overrides are referred to as **custom service overrides** in the rest of the guide.

## How service overrides are represented in Datadog

To give less importance to service overrides, these are treated differently visually speaking in various APM product pages.

#### In service and resource pages

Services that are service overrides are flagged as such in the service page header. On hover, find the list of base services where the service name is overridden, in a [custom](#custom-service-overrides) way, or as the default setting of the [integration](#integration-service-overrides).

{{< img src="/tracing/guide/service_overrides/service_overrides_service_page.png" alt="Service page overrides" style="width:70%;">}}

#### In service maps

In service maps, service overrides are represented as part of the edge going from the base service and the inferred service.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_map.png" alt="Service map overrides" style="width:80%;">}}

#### In traces

In the trace side panel, the client span header represents the call going from the base service to the inferred service. The top of the overview section also shows information about the base service name, the overridden service name, and the inferred entity name.

{{< img src="/tracing/guide/service_overrides/service_overrides_traces.png" alt="Trace side panel service overrides" style="width:80%;">}}


## Remove service overrides

To remove *integration service overrides*, set the environment variable:

```sh
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true
```

This ensures the `service` attribute always uses the base service name instead of appending the integration name (for example,`*-postgres`, `*-http-client`).

<div class="alert alert-warning">Removing service overrides is a <b>breaking change</b>. Metrics, monitors, or dashboard queries based on the overridden service name will stop matching.</div>

It is recommended to remove service overrides progressively, proceeding service by service, to ensure that no critical assets (such as dashboards, monitors, retention filters, and so on) are affected by the change. Follow the [detailed instructions](#remove-service-overrides-progressively) to ensure a smooth transition to the new model.

### Examples 

For example:

- .NET tags gRPC calls as `service:<DD_SERVICE>-grpc-client`
- Python tags gRPC calls as `service:grpc-client`

With the `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` option set to `true`, all supported tracing libraries tag client spans capturing the call to the downstream service with the calling service's name, `service:<DD_SERVICE>`. This ensures all spans are always tagged with the *default service name* emitting the span; [`peer.*`][6] attributes are used to describe the called dependency (for example, database or queue).

| Scenario | Service Name | Additional `peer.*` Attributes |
|----------|--------------|--------------------------------|
| *Without* inferred services and *with* service overrides | `service:my-service-grpc-client` or `service:grpc-client` | No `peer.*` attributes set |
| *With* inferred services and *without* service overrides | `service:myservice` | `@peer.service:otherservice` (where `otherservice` is the name of the remote service being called with gRPC) |

Similarly, for a span representing a call to a mySQL database:

| Scenario | Service Name | Additional `peer.*` Attributes |
|----------|--------------|--------------------------------|
| *Without* inferred services and *with* service overrides | `service:my-service-mysql` or `service:mysql` | No `peer.*` tags set |
| *With* inferred services and *without* service overrides | `service:myservice` | `@peer.db.name:user-db`, `@peer.db.system:mysql` |

### Remove service overrides progressively

1. Identify the service override you want to remove and navigate to its **service page**.
2. Hover over the service override pill in the page header and note the underlying base service names. These are the original services emitting spans with overrides. You need to update the configuration for these instrumented services.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_page.png" alt="Service page overrides" style="width:70%;">}}

3. Scan through your existing assets that might contain queries using the override service name:

   - Any monitors, dashboards, or notebooks queries based on [APM Trace metrics][5]
   - [APM metrics from spans][2]
   - [Trace analytics monitors][3] (based on indexed spans)
   - [Retention filters][4]
   - Sensitive data scanner pipelines

4. Update these queries to use the base service name (`service:<DD_SERVICE>`). This allows queries to continue to match when you remove service overrides

5. Set `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` for integration service overrides.

**Note**: The configuration above only removes [integration service overrides](#integration-service-overrides). Custom service overrides must be removed directly in the code.

## Glossary

##### Service override
A service name set for a span which differs from the default `DD_SERVICE` name. It can be set [automatically](#integration-service-overrides) by some Datadog integrations, or [manually](#custom-service-overrides) by users.

##### Base service
The default `DD_SERVICE` name.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/inferred_services
[2]: /tracing/trace_pipeline/generate_metrics
[3]: /monitors/types/apm/?tab=traceanalytics
[4]: /tracing/trace_pipeline/trace_retention/#retention-filters
[5]: /tracing/metrics/metrics_namespace/
[6]: /tracing/services/inferred_services/#peer-tags
