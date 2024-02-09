---
title: Service Catalog Best Practices
kind: guide
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

This page covers best practices for working with the Service Catalog.

## Linking infrastructure telemetries

The `service` tag is the primary key for Service Catalog entries. It's also the smallest common unit of analysis for Datadog telemetries with [Universal Service Tagging][1]. Set the `service` tag directly on [Kubernetes pod labels][4]. By setting the `service` tag within the `tags.datadoghq.com/service` label, all pod telemetry, like metrics and logs, receives the service tag in Datadog. This is the recommended Kubernetes service label. 

In comparison, setting the label on a Kubernetes service only affects metric tagging, not other telemetry. Applying [additional container labels][2] is essential for correctly tagging logs and traces, so this approach isn't recommended.

## Using the application field in metadata schema v2.1+

For microservices, a service typically coincides with a Kubernetes deployment because its a self-contained unit of functionality with well-defined ownership and other metadata. Therefore, other components in a microservice might be named automatically during the instrumentation process. Add an **application** field to all the automatically discovered components to group them with the core service.

For monolithic services, defining multiple services might be helpful. At the minimum, you should choose a service to represent the monolith as a whole. Then, associate relevant metadata, like documentation or source code, and relevant telemetry, like pod metrics. It's sometimes useful to define additional services that represent other functional units within the monolith if they have separate ownership properties like operation runbooks and documentation. In cases where there's a clearly defined hierarchy between the monolith and other units within it, it's recommended to use the **application** field in [metadata schema v2.1+][3]. Set the **application** value as the service name for the monolith itself, and add this application field to all sub-services that belong to the monolith. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /containers/docker/tag/
[3]: /service_catalog/adding_metadata#service-definition-schema-v21
[4]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#full-configuration
