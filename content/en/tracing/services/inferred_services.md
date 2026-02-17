---
title: Inferred services
description: Automatically discover service dependencies like databases and queues through outbound request analysis.
aliases:
  - /tracing/guide/inferred-service-opt-in
further_reading:
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
---

## Overview

Datadog automatically discovers the dependencies for an instrumented service, such as databases, queues, or third-party APIs, even if that dependency hasn't been directly instrumented. By analyzing outbound requests from your instrumented services, Datadog infers the presence of these dependencies and collects associated performance metrics.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Service page dependency map" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

Explore inferred services in the [Software Catalog][1] by filtering entries by entity type, such as database, queue, or third-party API. Each [service page][2] is tailored to the type of service you are investigating. For instance, database service pages show database-specific insights and include database monitoring data if you are using [Database Monitoring][3].

## Set up inferred services
{{< tabs >}}
{{% tab "Agent v7.60.0+" %}}
Starting from Datadog Agent version [7.60.0][1], no manual configuration is needed to see inferred services. The required configurations—`apm_config.compute_stats_by_span_kind` and `apm_config.peer_tags_aggregation`—are enabled by default.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}}
{{% tab "Agent v7.55.1 - v7.59.1" %}}

For Datadog Agent versions [7.55.1][1] through [7.59.1][2], add the following to your `datadog.yaml` configuration file:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true

{{< /code-block >}}

Alternatively, set these environment variables in your Datadog Agent configuration:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

If you are using Helm, include these environment variables in your `values.yaml` [file][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agent v7.50.3 - v7.54.1" %}}

For Datadog Agent versions [7.50.3][1] through [7.54.1][2], add the following to your `datadog.yaml` configuration file:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true
  peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Alternatively, set these environment variables in your Datadog Agent configuration:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]'

{{< /code-block >}}

If you are using Helm, include these environment variables in your `values.yaml` [file][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

For the OpenTelemetry Collector, the minimum recommended version is `opentelemetry-collector-contrib` [v0.95.0][1] or later. In that case, update this configuration:

{{< code-block lang="yaml"  collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

If your Collector version is below v0.95.0, update the following Collector configuration:

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
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
{{% /tab %}}
{{< /tabs >}}

## Naming inferred entities

To determine the names and types of the inferred service dependencies, Datadog uses standard span attributes and maps them to `peer.*` attributes. For example, inferred external APIs use the default naming scheme `net.peer.name` like `api.stripe.com`, `api.twilio.com`, and `us6.api.mailchimp.com`. Inferred databases use the default naming scheme `db.instance`. You can rename inferred entities by creating [renaming rules][5].

### Peer tags

Peer Tag | Source Attributes
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

**Note**: Peer attribute values that match IP address formats (for example, 127.0.0.1) are modified and redacted with `blocked-ip-address` to prevent unnecessary noise and tagging metrics with high-cardinality dimensions. As a result, you may encounter some `blocked-ip-address` services appearing as downstream dependencies of your instrumented services.

#### Precedence of peer tags

To assign the name to inferred entities, Datadog uses a specific order of precedence between peer tags, when entities are defined by a combination of multiple tags. 

Entity type | Order of precedence
-----------|----------------
Database | `peer.db.name` > `peer.aws.s3.bucket` (For AWS S3) / `peer.aws.dynamodb.table` (For AWS DynamoDB) / `peer.cassandra.contact.points` (For Cassandra) / `peer.couchbase.seed.nodes` (For Couchbase) > `peer.hostname` > `peer.db.system`
Queue | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (for Kafka) / `peer.aws.sqs.queue` (for AWS SQS) / `peer.aws.kinesis.stream` (For AWS Kinesis) > `peer.messaging.system`
Inferred service | `peer.service` > `peer.rpc.service` > `peer.hostname`

If the highest priority tag, such as `peer.db.name`, is not captured as part of the instrumentation, Datadog uses the second highest priority tag, like `peer.hostname`, and continue in that order.

**Note**: Datadog never sets the `peer.service` for inferred databases and queues. `peer.service` is the highest priority peer attribute. If set, it takes precedence over all other attributes.

## Migrate to global default service naming

With inferred services, service dependencies are automatically detected from existing span attributes. As a result, changing service names (using the `service` tag) is not required to identify these dependencies. 

Enable `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` to ensure no Datadog integration sets service names that are different from the default global service name. This also improves how service-to-service connections and inferred services are represented in Datadog visualizations, across all supported tracing library languages and integrations.

<div class="alert alert-danger">Enabling this option may impact existing APM metrics, custom span metrics, trace analytics, retention filters, sensitive data scans, monitors, dashboards, or notebooks that reference the old service names. Update these assets to use the global default service tag (<code>service:&lt;DD_SERVICE&gt;</code>).</div>

For instructions on how to remove service overrides and migrate to inferred services, see the [Service Overrides guide][4].

[1]: /software_catalog/
[2]: /tracing/services/service_page
[3]: /database_monitoring/
[4]: /tracing/guide/service_overrides
[5]: /tracing/services/renaming_rules/

{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-info">The Inferred Services feature is not available by default in your datacenter. Fill out this <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">form</a> to request access.</div>

{{< /site-region >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
