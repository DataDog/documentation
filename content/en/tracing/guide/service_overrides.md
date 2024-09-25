---
title: Service Overrides

disable_toc: false
private: true
further_reading:
- link: "/tracing/guide/inferred-service-opt-in"
  tag: "Guide"
  text: "Opting-in to the new service representation"
---

{{< callout url="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA/edit" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Request access to the beta!" >}}
Inferred service dependencies are in preview. To request access, complete the form. For opt-in instructions, refer to this <a url="https://docs.datadoghq.com/tracing/guide/inferred-service-opt-in/">guide</a>.
{{< /callout >}}

## Overview

Prior to [inferred services][1], Datadog used to change service names of client spans (`span.kind:client`) to better represent databases, queues and third party dependencies in most integrations. For instance, a span representing a client call from a service `A` to a postgres database would be tagged with `service:postgres` or `service:A-postgres`. 

With the new service reprensentation and the introduction of inferred services, doing so is not required anymore as dependencies are automatically inferred from a set of span attributes collected on client spans (e.g. `db.system`, `db.name`, etc...).

- **Before inferred services**: the client span is tagged with a different service name (`auth-dotnet-postgres`). In service maps, the database is represented as a different service. This is an inferred service

{{< img src="/tracing/guide/service_overrides/old_service_rep.png" alt="Old Service Representation" style="width:80%;">}}


- **With inferred services**: the client span is tagged with the base service name, i.e. `auth-dotnet`, and the database is inferred using other attributes (`db.name:user-db`, `db.system:postgres`, etc...). As a result, there's no need to change the `service` attribute on the client span anymore. 

{{< img src="/tracing/guide/service_overrides/new_service_rep.png" alt="New Service Representation" style="width:70%;">}}


### Overriding service names is not useful anymore

When starting using the new inferred service dependencies feature set, service overrides might pollute service lists and maps. In service maps, you will see, in that order: 
- The base service node, e.g. `auth-dotnet`.
- The service override node, e.g. `auth-dotnet-postgres`.
- The new inferred service node, e.g. `user-db`.

{{< img src="/tracing/guide/service_overrides/service_overrides_new_service_rep.png" alt="Service Overrides" style="width:100%;">}}

The service override (`auth-dotnet-postgres`) breaks the direct connection between the base service and the inferred service. It is not useful anymore as the database dependency is now properly represented by the inferred service.

## How are service overrides set ?

#### Integration service overrides

Datadog tracing libraries automatically set different service names on client spans to represent databases, queues, or third-party service dependencies in integrations. We will refer to these types of service overrides as **integration service overrides** in the rest of the guide.

#### Custom service overrides

Service names can also be set manually by users, for instance to gain visibility on specific components of the service (shared libraries, middleware layers). We will refer to these types of service overrides as **custom service overrides** in the rest of the guide.

## How are service overrides represented in the product ?

To give less importance to service overrides, these are treated differently visually speaking in various APM product pages.

#### In service and resource pages

Services that are service overrides are flagged as such in the service page header. On hover, find the list of base services where the service name is overriden, in a [custom](#custom-service-overrides) way, or as the default setting of the [integration](#integration-service-overrides).

{{< img src="/tracing/guide/service_overrides/service_overrides_service_page.png" alt="Service page overrides" style="width:70%;">}}

#### In service maps

In service maps, service overrides are represented as part of the edge going from the base service and the inferred service.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_map.png" alt="Service map overrides" style="width:80%;">}}

#### In traces

In the trace side panel, the client span header represents the call going from the base service to the inferred service. The top of the overview section also shows information about the base service name, the overriden service name, and the inferred entity name.

{{< img src="/tracing/guide/service_overrides/service_overrides_traces.png" alt="Trace side panel service overrides" style="width:80%;">}}


## How to remove service overrides ?

To remove **integration** service overrides, set the `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` environment variable to `true` in the tracing library. This will ensure the `service` attribute is always set to the base service name instead of appending the integation name (e.g. `*-postgres`, `*-http-client`) to better represent dependencies.

<div class="alert alert-warning">Removing service overrides is a <b>breaking change</b>. Any metric, monitor or dashboard query based on the overriden service name will stop matching when removing integration service overrides.</div>

It is recommended to remove service overrides progressively, proceeding service by service, in order to ensure that no critical assets (dashboards, monitors, retention filters, etc...) are affected by the change. Follow the [step-by-step process](#a-step-by-step-process-to-remove-service-overrides) to ensure a smooth transition to the new model.

### Examples 

For example, .NET tagged gRPC calls as `service:<DD_SERVICE>-grpc-client` while Python tagged them as `service:grpc-client`. With this option enabled, all supported tracing libraries tag client spans capturing the call to the downstream service with the calling service's name, `service:<DD_SERVICE>`, thereby providing a _global default service name_.

_ | Without inferred services and with service overrides | With inferred services and without service overrides
--|-------|--------
Service name | `service:my-service-grpc-client` or `service:grpc-client` | `service:myservice` 
additional `peer.*` attributes | _No `peer.*` tags set_ | `@peer.service:otherservice` (`otherservice` being the name of the remote service being called with gRPC)

Similarly, for a span representing a call to a mySQL database:

_ | Without inferred services and with service overrides | With inferred services and without service overrides
--|-------|--------
Service name | `service:my-service-mysql` or `service:mysql` | `service:myservice` 
additional `peer.*` attributes | _No `peer.*` tags set_ | `@peer.db.name:user-db`, `@peer.db.system:mysql`

### A step-by-step process to remove service overrides


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/inferred-service-opt-in