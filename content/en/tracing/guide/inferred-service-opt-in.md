---
title: New Service page and Inferred Services
kind: Guide
disable_toc: false
private: true
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

{{< callout url="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA/edit" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Opt in to the private beta!" >}}
Inferred services and the new Service Page layout are in private beta. To request access, complete the form.
{{< /callout >}}

Follow the steps below to enable the new dependency map on the [Service Page][1], and add _inferred services_ to the [Service Map][2] and [Service Catalog][3] pages.

## Inferred services

Datadog can automatically discover the dependencies for an instrumented service, such as a database or a third-party API even if that dependency hasn't been instrumented yet. Datadog infers the presence of these dependencies and their performance based on information on the outbound requests of your instrumented services.

To determine the names and types of the inferred services, Datadog uses span attributes. Inferred external APIs use the default naming scheme `net.peer.name`. For example, `api.stripe.com`, `api.twilio.com`, `us6.api.mailchimp.com`. Inferred databases use the default naming scheme `db.instance`.

If you're using the Go, Java, NodeJS, PHP, .NET, or Ruby tracer, you can customize the default names for inferred services. For more information, see the "Peer Service Mapping" section for your language below.

**Note:** If you configure monitors, dashboards, or notebooks for a given inferred service during the beta, you may need to update them if the naming scheme changes.

## Dependency map

Use the dependency map to visualize service-to-service communication and gain insight into system components such as databases, queues, and third-party dependencies. You can group dependencies by type and filter by Requests, Latency, or Errors to identify slow or failing connections.

{{< img src="tracing/services/service_page/dependencies.png" alt="The dependency section" style="width:100%;">}}

## Opt in

To opt in, you must adjust your Datadog Agent and APM Tracer configurations. Check the [Global default service naming migration](#global-default-service-naming-migration), to see if you need to take any migration actions.

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

To opt in, add the following environment variables or system properties to your tracer settings:

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

Datadog uses a default naming scheme for inferred services. If you prefer, you can map specific values to peer services using the following settings:
**Note**: `key:value` pairs are case sensitive.
| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `dd.trace.peer.service.mapping` |

Each setting accepts a comma separated list: `key1:value1,key2:value2`.

For example, if you're using environment variables and you need to rename the peer service `10.0.32.3` to `my-service`, use the following configuration:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://dtdg.co/latest-java-tracer

{{% /tab %}}

{{% tab "Go" %}}

The minimum Go tracer version required is [v1.52.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables or system properties to your tracer settings:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `WithPeerServiceDefaultsEnabled(true)` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `WithGlobalServiceName(true)` |

#### Peer service mapping

Datadog uses a default naming scheme for inferred services. If you prefer, you can map specific values to peer services using the following settings:
**Note**: `key:value` pairs are case sensitive.
| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `WithPeerServiceMapping` |

Each setting accepts a comma separated list: `key1:value1,key2:value2`.

For example, if you're using environment variables and you need to rename the peer service `10.0.32.3` to `my-service`, use the following configuration:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.52.0

{{% /tab %}}

{{% tab "NodeJS" %}}

The minimum NodeJS tracer versions required are [2.44.0][1], [3.31.0][2], or [4.10.0][3]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables or system properties to your tracer settings:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `spanComputePeerService=true` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `spanRemoveIntegrationFromService=true` |

#### Peer service mapping

Datadog uses a default naming scheme for inferred services. If you prefer, you can map specific values to peer services using the following settings:
**Note**: `key:value` pairs are case sensitive.
| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `peerServiceMapping` |

Each setting accepts a comma separated list: `key1:value1,key2:value2`.

For example, if you're using environment variables and you need to rename the peer service `10.0.32.3` to `my-service`, use the following configuration:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v2.44.0
[2]: https://github.com/DataDog/dd-trace-js/releases/tag/v3.31.0
[3]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.10.0

{{% /tab %}}

{{% tab "PHP" %}}
The minimum PHP tracer version required is [0.90.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables or system properties to your tracer settings:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true` | `datadog.trace.peer_service_defaults_enabled=true` |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `datadog.trace.remove_integration_service_names_enabled=true` |

#### Peer service mapping

Datadog uses a default naming scheme for inferred services. If you prefer, you can map specific values to peer services using the following settings:
**Note**: `key:value` pairs are case sensitive.
| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `datadog.trace.peer_service_mapping` |

Each setting accepts a comma separated list: `key1:value1,key2:value2`.

For example, if you're using environment variables and you need to rename the peer service `10.0.32.3` to `my-service`, use the following configuration:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.90.0
{{% /tab %}}

{{% tab ".NET" %}}

The minimum .NET tracer version required is [v2.35.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables to your tracer settings or system properties:
- `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

#### Peer service mapping

Datadog uses a default naming scheme for inferred services. If you prefer, you can map specific values to peer services using the following settings:
**Note**: `key:value` pairs are case sensitive.
| Environment variable | TracerSettings |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `PeerServiceNameMappings` |

Each setting accepts a comma separated list: `key1:value1,key2:value2`.

For example, if you're using environment variables and you need to rename the peer service `10.0.32.3` to `my-service`, use the following configuration:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.35.0

{{% /tab %}}

{{% tab "Python" %}}

The minimum Python tracer version required is [v1.16.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables to your tracer settings or system properties:

Add the following environment variables to your tracer settings or system properties:
- `DD_TRACE_PEER_SERVICE_DEFAULTS_ENABLED=true`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

#### Peer service mapping

Datadog uses a default naming scheme for inferred services. If you prefer, you can map specific values to peer services using the following settings:

| Environment variable | TracerSettings |
| ---  | ----------- |
| `DD_TRACE_PEER_SERVICE_MAPPING` | `PeerServiceNameMappings` |

Each setting accepts a comma-separated list: `key1:value1,key2:value2`.

For example, if you're using environment variables and you need to rename the peer service `10.0.32.3` to `my-service`, use the following configuration:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

As of tracer version `v1.16.0` all libraries are supported except for Boto2.

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.16.0

{{% /tab %}}

{{% tab "Ruby" %}}
The minimum Ruby tracer version required is [v1.13.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables to your tracer settings or system properties:
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

#### Peer service mapping
**Note**: `key:value` pairs are case sensitive.
Datadog uses a default naming scheme for inferred services. If you prefer, you can map specific values to peer services using the `DD_TRACE_PEER_SERVICE_MAPPING` environment variable. The environment variable accepts a comma-separated list of key-value pairs.

For example, if you're using environment variables and you need to rename the peer service `10.0.32.3` to `my-service`, use the following configuration:

```yaml
DD_TRACE_PEER_SERVICE_MAPPING=10.0.32.3:my-service
```

You can also set the `peer.service` value for spans generated by a specific integration. In this case, the setting you define overrides any value that the tracer would have automatically assigned. To set a value for an integration, use the syntax `DD_TRACE_<INTEGRATION_NAME>_PEER_SERVICE` for your environment variable.

For example, to set the `peer.service` value for all Dalli spans, use
`DD_TRACE_DALLI_PEER_SERVICE=billing-api`.

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.13.0
{{% /tab %}}

{{< /tabs >}}

### Global default service naming migration

When you enable the `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` environment variable, it improves how service-to-service connections and inferred services are represented in Datadog visualizations, across all supported tracing library languages and integrations. 

Previously, some tracing libraries included the name of the associated integration in service name tagging. For example, .NET tagged gRCP calls as `service:<DD_SERVICE>-grpc-client` while Python tagged them as `service:grpc-client`. With this option enabled, all supported tracing libraries tag spans from the downstream services with the calling service's name, `service:<DD_SERVICE>`, thereby providing a _global default service name_.

Consequently, if you have existing:

- APM metrics
- APM custom span metrics
- Trace analytics
- Retention filters
- Sensitive data scans
- Monitors, dashboards, or notebooks that query those things

Update those items to use the global default service tag (`service:<DD_SERVICE>`) instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/service_page/
[2]: /tracing/services/services_map/
[3]: /tracing/service_catalog/
[4]: https://github.com/DataDog/datadog-agent/releases/tag/7.45.0
[5]: /agent/guide/agent-configuration-files/?tab=agentv6v7
