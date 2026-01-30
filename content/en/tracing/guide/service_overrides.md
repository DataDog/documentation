---
title: Overrides in APM
description: Understand service overrides, integration overrides, and how to adapt your configuration when using inferred services to improve service dependency representation.
disable_toc: false
further_reading:
- link: "/tracing/services/service_override_removal"
  tag: "Documentation"
  text: "Remove Service Overrides"
- link: "/tracing/services/inferred_services"
  tag: "Documentation"
  text: "Inferred services"
---

## Overview

Both integration overrides and service overrides change the service name of spans. The initial service name is referred to as the [**base service**](#base-service).

This page explains [**integration overrides**](#integration-override) and [**service overrides**](#service-override) in APM.


### Integration overrides
Datadog tracing libraries automatically set different service names on client spans to represent databases, queues, or third-party dependencies in integrations. These types of overrides are referred to as **integration overrides**. With inferred entities, integration overrides are not necessary to represent dependencies, and may pollute service lists and maps. For instructions on how to remove integration overrides, see [Integration Override Removal][2].

### Service overrides
You can manually set the service name on spans. This gives you visibility into specific components of the service, such as shared libraries and middleware layers. These types of overrides are referred to as **service overrides**.

## How overrides are represented
Integration overrides and service overrides are represented similarly in APM.

#### In service and resource pages

Services that are overrides are flagged in the service page header. Hover over the flag to see the list of base services where the service name is overridden.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_page.png" alt="Service page overrides" style="width:70%;">}}

#### In service maps

In service maps, overrides are represented as part of the edge going from the base service and the inferred service.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_map.png" alt="Service map overrides" style="width:80%;">}}

#### In traces

In the trace side panel, the client span header represents the call going from the base service to the inferred service. The top of the overview section also shows information about the base service name, the overridden service name, and the inferred entity name.

{{< img src="/tracing/guide/service_overrides/service_overrides_traces.png" alt="Trace side panel service overrides" style="width:80%;">}}


## Removing integration overrides

You can remove integration overrides directly in the Datadog UI or with a configuration change. For more details, see [Integration Override Removal][2].

## Glossary

##### Integration override
A service name set for a span which differs from the default `DD_SERVICE` name, set [automatically](#integration-service-overrides) by some Datadog integrations.

##### Service override
A service name set for a span which differs from the default `DD_SERVICE` name, set [manually](#custom-service-overrides) by users.

##### Base service
The default `DD_SERVICE` name.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/inferred_services
[2]: /tracing/services/service_override_removal
