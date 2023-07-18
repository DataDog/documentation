---
title: Opt in to the new APM troubleshooting experience
kind: Guide
disable_toc: false
further_reading:
- link: "/tracing/services/"
  tag: "Documentation"
  text: "Service Observability"
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Sending Traces to Datadog"
- link: "/tracing/trace_collection/dd_libraries/"
  tag: "Documentation"
  text: "Add the Datadog Tracing Library"
---

{{< callout btn_hidden="true" header="Opt in to the private beta!">}}
The new APM troubleshooting experience is in private beta.
{{< /callout >}}

The new APM troubleshooting experience adds a dependency map to the [Service Page][1], and an _Inferred Service_ object to the [Service Map][2] and [Service Catalog][3] pages.

## Dependency map

Use the dependency map to visualize service-to-service communication and gain insight into system components such as databases, queues, and third-party dependencies. You can group dependencies by type and filter by Requests, Latency, or Errors to identify slow or failing connections.

{{< img src="tracing/services/service_page/dependencies.png" alt="The dependency section" style="width:100%;">}}

## Opt in

To opt in, you must adjust your Datadog Agent and APM Tracer configurations.

### Datadog Agent configuration

Requirements:
- Datadog Agent version >= [7.45.0][4].

Set the following in your `datadog.yaml` [configuration file][5]:
- `DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true`
- `DD_APM_PEER_SERVICE_AGGREGATION=true`

### APM tracer configuration

{{< tabs >}}
{{% tab "Java" %}}

The minimum Java tracer version required is 1.16.0. Regular updates to the latest version are recommended to access changes and bug fixes.

[Download the latest Java tracer version][1].

Add the following environment variables to your tracer settings or system properties:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `-Ddd.trace.peer.service.defaults.enabled=true` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `-Ddd.trace.remove.integration-service-names.enabled=true` |

Remove the following settings from your configuration:

| Environment variable | Reason for removal |
| ---  | ----------- |
| `DD_SERVICE_MAPPING` | All service names default to `DD_SERVICE`. |
| `DD_TRACE_SPLIT_BY_TAGS` | Inferred services are automatically displayed with the introduction of the `peer.service` tag. |
| `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | DB instances are inferred based on the on the `peer.service` tag. |

#### Peer service mapping

Peer service values are extracted automatically from a best effort process. You can map specific values to peer services using the following settings:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `dd.trace.peer.service.mapping` |

Each setting accepts a comma separated list: `key1:value1,key2:value2`.

For example, if you're using environment variables and you need to rename the peer service `10.0.32.3` to `my-service`, you'd use the following configuration:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://dtdg.co/latest-java-tracer

{{% /tab %}}

{{% tab "Go" %}}

The minimum Go tracer version required is [`v1.52.0`][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

Add the following environment variables to your tracer settings or system properties:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `WithPeerServiceDefaultsEnabled(true)` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `WithGlobalServiceName(true)` |

#### Peer service mapping

Peer service values are extracted automatically from a best effort process. You can map specific values to peer services using the following settings:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `WithPeerServiceMapping` |

Each setting accepts a comma separated list: `key1:value1,key2:value2`.

For example, if you're using environment variables and you need to rename the peer service `10.0.32.3` to `my-service`, you'd use the following configuration:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.52.0

{{% /tab %}}

{{% tab ".NET" %}}

The minimum .NET tracer version required is [`v2.32.0`][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

Add the following environment variables to your tracer settings or system properties:
- `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

As of tracer version `v2.32.0`, the following libraries are supported:
- HttpClient and WebRequest
- ADO.NET spans
- WCF server
- gRPC server
- Elasticsearch
- MongoDB
- Kafka spans

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v2.32.0

{{% /tab %}}

{{% tab "Python" %}}

The minimum Python tracer version required is [`v1.16.0`][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

Add the following environment variables to your tracer settings or system properties:

Add the following environment variables to your tracer settings or system properties:
- `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

As of tracer version `v1.16.0` all libraries are supported except for Boto2.

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.16.0

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /services/service_page/
[2]: /services/services_map/
[3]: /tracing/service_catalog/
[4]: https://github.com/DataDog/datadog-agent/releases/tag/7.45.0
[5]: /agent/guide/agent-configuration-files/?tab=agentv6v7
