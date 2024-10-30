---
title: Inferred services
further_reading:
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
---

## Overview

Datadog automatically discovers the dependencies for an instrumented service, such as databases, queues, or third-party APIs, even if that dependency hasn't been instrumented yet. By analyzing outbound requests from your instrumented services, Datadog infers the presence of these dependencies and collects associated performance metrics.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Service page dependency map" style="width:90%;">}}

Explore inferred services in Datadog with from the [Service Catalog][1] by filtering entries by entity type, such as database, queue, or third-party API. From there, each [service page][2] will be tailored to the type of service you are investigating. For instance, database service pages will show insights that are specific to database and will include database monitoring data if you are using [Database monitoring][3].

## How to see inferred services in Datadog

The inferred services feature requires that you enable some configurations on the **Datadog Agent**. No tracing library configuration change is required.

{{< tabs >}}
{{% tab "Agent version 7.55.1 and higher" %}}

From Datadog Agent version >= [7.55.1][1], update your `datadog.yaml` configuration file with the following:

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

If you are using Helm, nclude the same set of environment variables in your `values.yaml` [file][2].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agent version between 7.50.3 and 7.54.1" %}}

If you use a Datadog Agent version >= [7.50.3][1] and <= [7.54.1][2], update your `datadog.yaml` configuration file with the following:

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

If you are using Helm, nclude the same set of environment variables in your `values.yaml` [file][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry collector" %}}

If you are using the OpenTelemetry collector, the minimum version recommended is the opentelemetry-collector-contrib >= [v0.95.0][1]. Update the collector configuration with:

{{< code-block lang="yaml"  collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

If your collector version is below v0.95.0, update the collector configuration with :

{{< code-block lang="yaml" collapsible="true" >}}

exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]   

{{< /code-block >}}

**Example**: [collector.yaml][2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L335-L357
{{% /tab %}}
{{< /tabs >}}

## Naming inferred entities

To determine the names and types of the inferred service dependencies, Datadog uses standard span attributes and maps them to `peer.*` attributes. For example, inferred external APIs use the default naming scheme `net.peer.name`, e.g. `api.stripe.com`, `api.twilio.com`, `us6.api.mailchimp.com`. Inferred databases use the default naming scheme `db.instance`.

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

## Global default service naming migration

With inferred services, service dependencies are automatically detected from existing span attributes. As a result, changing service names (via the `service` tag) is not required anymore to identify these dependencies. 

Enabling `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` environment variable ensures that no Datadog integration sets service names that are different from the default global service name. It improves how service-to-service connections and inferred services are represented in Datadog visualizations, across all supported tracing library languages and integrations.

<div class="alert alert-warning">Enabling this option may impact existing APM metrics, custom span metrics, trace analytics, retention filters, sensitive data scans, monitors, dashboards, or notebooks that reference the old service names. Update these assets to use the global default service tag (<code>service:&lt;DD_SERVICE&gt;</code>).</div>

For instructions on how to remove service overrides and migrate to inferred services, see the [Service Overrides guide][10].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_catalog/
[2]: /tracing/services/service_page
[3]: /database_monitoring/