---
title: Inferred Service dependencies

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
- link: "/tracing/guide/service_overrides"
  tag: "Documentation"
  text: "Service Overrides"
---

{{< callout url="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA/edit" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Request access to the Preview!" >}}
Inferred service dependencies are in Preview. To request access, complete the form.
{{< /callout >}}

## Overview

Datadog can automatically discover the dependencies for an instrumented service, such as a database, a queue, or a third-party API, even if that dependency hasn't been instrumented yet. By analyzing outbound requests from your instrumented services, Datadog infers the presence of these dependencies and collects associated performance metrics.

With the new inferred entities experience, you can filter [Service Catalog][3] entries by entity type, such as database, queue, or third-party API. This allows you to better visualize service dependencies using the [Service Page dependency map](#service-page-dependency-map) and APM features.

To determine the names and types of the inferred service dependencies, Datadog uses standard span attributes and maps them to `peer.*` attributes. For the full list of `peer.*` attributes, see [Inferred service dependencies nomenclature](#inferred-service-dependencies-nomemclature). Inferred external APIs use the default naming scheme `net.peer.name`. For example, `api.stripe.com`, `api.twilio.com`, `us6.api.mailchimp.com`. Inferred databases use the default naming scheme `db.instance`.

If you're using the Go, Java, Node.js, PHP, .NET, or Ruby tracer, you can customize the default names for inferred entities.

**Note:** If you configure monitors, dashboards, or notebooks for a given inferred service during the Preview, you may need to update them if the naming scheme changes. Read more about migration steps in the [opt-in instructions](#opt-in).

### Service page Dependency map

Use the dependency map to visualize service-to-service communication and gain insight into system components such as databases, queues, and third-party dependencies. You can group dependencies by type and filter by Requests, Latency, or Errors to identify slow or failing connections.

{{< img src="tracing/services/service_page/dependencies.png" alt="Service page service dependency map" style="width:100%;">}}

## Opt in

<div class="alert alert-warning">Only go through migration steps once Datadog support confirmed the feature is enabled for you on the Datadog side.</div>

To opt in, Datadog recommends you adjust your:
- [Datadog Agent](#datadog-agent-configuration) (or [OpenTelemetry collector](#opentelemetry-collector)) configuration
- [APM tracing libraries](#apm-tracing-library-configuration) configuration

### Datadog Agent configuration

#### Datadog Agent 7.55.1 and higher

From Datadog Agent version >= [7.55.1][9], update your `datadog.yaml` configuration file with the following:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true

{{< /code-block >}}

Alternatively, configure this by setting the following environment variables in your Datadog Agent launch configuration:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

#### Datadog Agent version between 7.50.3 and 7.54.1

If you use a Datadog Agent version >= [7.50.3][4] and <= 7.54.1, update your `datadog.yaml` configuration file with the following:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true
  peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Alternatively, configure this by setting the following environment variables in your Datadog Agent launch configuration:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]'

{{< /code-block >}}


#### Helm 
Include the same set of environment variables in your `values.yaml` [file][8].


### OpenTelemetry Collector 

Minimum version recommended: opentelemetry-collector-contrib >= [v0.95.0][7].

Example [collector.yaml][6].

{{< code-block lang="yaml"  collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

If your collector version is below [v0.95.0][7], use an exporter configuration with the following `peer_tags`:


{{< code-block lang="yaml" collapsible="true" >}}

exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]   

{{< /code-block >}}


### APM tracing library configuration

<div class="alert alert-warning">The following steps introduce a <b>breaking change</b>: Datadog will change the way service names are captured by default. Refer to <a href="#global-default-service-naming-migration">Global default service naming migration</a>, to determine if you need to take any migration actions.</div>

{{< tabs >}}
{{% tab "Java" %}}

The minimum Java tracer version required is 1.16.0. Regular updates to the latest version are recommended to access changes and bug fixes.

[Download the latest Java tracer version][1].

To opt in, add the following environment variables or system properties to your tracer settings:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `-Ddd.trace.remove.integration-service-names.enabled=true` |

Remove the following settings from your configuration:

| Environment variable | Reason for removal |
| ---  | ----------- |
| `DD_SERVICE_MAPPING` | All service names default to `DD_SERVICE`. |
| `DD_TRACE_SPLIT_BY_TAGS` | Inferred services are automatically displayed with the introduction of the `peer.service` tag. |
| `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | DB instances are inferred based on the on the `peer.service` tag. |

[1]: https://dtdg.co/latest-java-tracer

{{% /tab %}}

{{% tab "Go" %}}

The minimum Go tracer version required is [v1.52.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables or system properties to your tracer settings:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `WithGlobalServiceName(true)` |

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.52.0

{{% /tab %}}

{{% tab "Node.js" %}}

The minimum Node.js tracer versions required are [2.44.0][1], [3.31.0][2], or [4.10.0][3]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables or system properties to your tracer settings:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `spanRemoveIntegrationFromService=true` |

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v2.44.0
[2]: https://github.com/DataDog/dd-trace-js/releases/tag/v3.31.0
[3]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.10.0

{{% /tab %}}

{{% tab "PHP" %}}
The minimum PHP tracer version required is [0.90.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables or system properties to your tracer settings:

| Environment variable | System property |
| ---  | ----------- |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `datadog.trace.remove_integration_service_names_enabled=true` |

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.90.0
{{% /tab %}}

{{% tab ".NET" %}}

The minimum .NET tracer version required is [v2.35.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variable to your tracer settings or system properties:
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.35.0

{{% /tab %}}

{{% tab "Python" %}}

The minimum Python tracer version required is [v1.16.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables to your tracer settings or system properties:

Add the following environment variables to your tracer settings or system properties:
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

As of tracer version `v1.16.0` all libraries are supported except for Boto2.

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.16.0

{{% /tab %}}

{{% tab "Ruby" %}}
The minimum Ruby tracer version required is [v1.13.0][1]. Regular updates to the latest version are recommended to access changes and bug fixes.

To opt in, add the following environment variables to your tracer settings or system properties:
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.13.0
{{% /tab %}}

{{< /tabs >}}



## The new nomenclature: What is changing

### List of newly introduced peer.* tags 

`peer.*` dimensions | Remapped from ...
--------------------|-------------------
`peer.aws.dynamodb.table` | `tablename`
`peer.aws.kinesis.stream` | `streamname`
`peer.aws.s3.bucket` | `bucketname`, `aws.s3.bucket`
`peer.aws.sqs.queue` | `queuename`
`peer.cassandra.contact.points` | `db.cassandra.contact.points`
`peer.couchbase.seed.nodes` | `db.couchbase.seed.nodes`
`peer.db.name` | `db.name`, `mongodb.db`, `db.instance`, `cassandra.keyspace`, `db.namespace`
`peer.db.system` | `db.system`
`peer.hostname` | `peer.hostname`, `hostname`, `net.peer.name`, `db.hostname`, `network.destination.name`, `grpc.host`, `http.host`, `server.address`, `http.server_name`
`peer.kafka.bootstrap.servers` | `messaging.kafka.bootstrap.servers`
`peer.messaging.destination` | `topicname`, `messaging.destination`, `messaging.destination.name`, `messaging.rabbitmq.exchange`, `amqp.destination`, `amqp.queue`, `amqp.exchange`, `msmq.queue.path`, `aws.queue.name`
`peer.messaging.system` | `messaging.system`
`peer.rpc.service` | `rpc.service`
`peer.rpc.system` | `rpc.system`
`peer.service` | `peer.service`

### Global default service naming migration

With inferred services, service names are automatically detected from span attributes. When you enable the `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` environment variable, it improves how service-to-service connections and inferred services are represented in Datadog visualizations, across all supported tracing library languages and integrations.

<div class="alert alert-warning">Enabling this option may impact existing APM metrics, custom span metrics, trace analytics, retention filters, sensitive data scans, monitors, dashboards, or notebooks that reference the old service names. Update these assets to use the global default service tag (<code>service:&lt;DD_SERVICE&gt;</code>).</div>

For instructions on how to remove service overrides and migrate to inferred services, see the [Service Overrides guide][10].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /tracing/service_catalog/
[4]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[5]: /agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L335-L357
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases
[8]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L517-L538 
[9]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[10]: /tracing/guide/service_overrides
