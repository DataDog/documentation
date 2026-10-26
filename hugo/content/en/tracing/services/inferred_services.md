---
title: Inferred services
description: Automatically discover service dependencies like databases and queues through outbound request analysis.
aliases:
  - /tracing/guide/inferred-service-opt-in
further_reading:
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "https://www.datadoghq.com/blog/service-remapping/"
  tag: "Blog"
  text: "Comprehensively connect your service data with Service Remapping"
---

## Overview

Datadog automatically discovers the dependencies for an instrumented service, such as databases, queues, or third-party APIs, even if that dependency hasn't been directly instrumented. By analyzing outbound requests from your instrumented services, Datadog infers the presence of these dependencies and collects associated performance metrics.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Service page dependency map" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2,uk1" >}}

Explore inferred services in the [Catalog][1] by filtering entries by entity type, such as database, queue, or third-party API. Each [service page][2] is tailored to the type of service you are investigating. For instance, database service pages show database-specific insights and include database monitoring data if you are using [Database Monitoring][3].

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
  peer_tags: ["active_record.db.vendor","db.type","dns.hostname","network.destination.ip","out.host","sequel.db.vendor"]

{{< /code-block >}}

The `peer_tags` setting supplements the default attributes so all versions in this range collect the additional hostname and database-system source attributes.

Alternatively, set these environment variables in your Datadog Agent configuration:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='["active_record.db.vendor","db.type","dns.hostname","network.destination.ip","out.host","sequel.db.vendor"]'

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
  peer_tags: ["_dd.base_service","active_record.db.vendor","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","db.type","dns.hostname","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.ip","network.destination.name","out.host","peer.hostname","peer.service","queuename","rpc.service","rpc.system","sequel.db.vendor","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Alternatively, set these environment variables in your Datadog Agent configuration:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='["_dd.base_service","active_record.db.vendor","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","db.type","dns.hostname","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.ip","network.destination.name","out.host","peer.hostname","peer.service","queuename","rpc.service","rpc.system","sequel.db.vendor","server.address","streamname","tablename","topicname"]'

{{< /code-block >}}

If you are using Helm, include these environment variables in your `values.yaml` [file][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

For new OpenTelemetry Collector configurations, use the recommended [`span_metrics` connector configuration][6]. Its dimensions include the peer-service attributes Datadog uses for inference. The set differs from the `peer_tags` list below, so inferred entities can differ between the two configurations.

If your configuration uses the Datadog Connector, use `opentelemetry-collector-contrib` [v0.95.0][1] or later and update this configuration:

{{< code-block lang="yaml"  collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","active_record.db.vendor","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","db.type","dns.hostname","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.ip","network.destination.name","out.host","peer.hostname","peer.service","queuename","rpc.service","rpc.system","sequel.db.vendor","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

To configure additional peer tags with a Collector version below v0.95.0, upgrade to v0.95.0 or later. Add `datadog/connector` to the trace pipeline exporters and metric pipeline receivers, as shown in the [complete Collector configuration][2]. Apply the peer-tag settings above to the connector.

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: /opentelemetry/setup/collector_exporter/datadog_exporter/#2-configure-the-datadog-exporter-and-connector
[6]: /opentelemetry/setup/collector_exporter/#span-metrics-connector
{{% /tab %}}
{{< /tabs >}}

## Naming inferred entities

To determine the names and types of the inferred service dependencies, Datadog uses standard span attributes and maps them to `peer.*` attributes. For example, inferred external APIs use the default naming scheme `net.peer.name` like `api.stripe.com`, `api.twilio.com`, and `us6.api.mailchimp.com`. Inferred databases use the default naming scheme `db.instance`. You can rename inferred entities by creating [renaming rules][5].

### Peer tags

The following table lists the source attributes that Datadog uses to derive peer tags for inferred services. The order in the [Precedence of peer tags](#precedence-of-peer-tags) section determines which peer tag names an inferred entity.

The available source attributes depend on your collection version and configuration. For the Datadog Agent and Datadog Connector, span attributes must be included in peer-tag aggregation. For the `span_metrics` connector, include the span attributes as dimensions in the [connector configuration](/opentelemetry/setup/collector_exporter/#span-metrics-connector).

Peer tag | Source attributes
--------------------|-------------------
`peer.aws.dynamodb.table` | `tablename`
`peer.aws.kinesis.stream` | `streamname`
`peer.aws.s3.bucket` | `bucketname`, `aws.s3.bucket`
`peer.aws.sqs.queue` | `queuename`
`peer.cassandra.contact.points` | `db.cassandra.contact.points`
`peer.couchbase.seed.nodes` | `db.couchbase.seed.nodes`
`peer.db.name` | `db.name`, `mongodb.db`, `db.instance`, `cassandra.keyspace`, `db.namespace`
`peer.db.system` | `db.system`, `active_record.db.vendor`, `db.type`, `sequel.db.vendor`
`peer.hostname` | `peer.hostname`, `hostname`, `net.peer.name`, `db.hostname`, `network.destination.name`, `grpc.host`, `http.host`, `server.address`, `http.server_name`, `out.host`, `dns.hostname`, `network.destination.ip`
`peer.kafka.bootstrap.servers` | `messaging.kafka.bootstrap.servers`
`peer.messaging.destination` | `topicname`, `messaging.destination`, `messaging.destination.name`, `messaging.rabbitmq.exchange`, `amqp.destination`, `amqp.queue`, `amqp.exchange`, `msmq.queue.path`, `aws.queue.name`
`peer.messaging.system` | `messaging.system`
`peer.rpc.service` | `rpc.service`
`peer.rpc.system` | `rpc.system`
`peer.service` | `peer.service`

**Note**: IPv4 and IPv6 addresses in peer attribute values can appear as `blocked-ip-address` in inferred-service names to reduce metric cardinality. Redaction behavior depends on the collection path and version. The Agent's peer-tag redaction preserves port numbers and exempts localhost addresses (`127.0.0.1`, `::1`) and cloud metadata addresses (`169.254.169.254`, `fd00:ec2::254`, `169.254.170.2`).

#### Precedence of peer tags

To assign the name to inferred entities, Datadog uses a specific order of precedence between peer tags, when entities are defined by a combination of multiple tags. 

Entity type | Order of precedence
-----------|----------------
Database | `peer.db.name` > `peer.aws.s3.bucket` (for Amazon S3) / `peer.aws.dynamodb.table` (for Amazon DynamoDB) / `peer.cassandra.contact.points` (for Cassandra) / `peer.couchbase.seed.nodes` (for Couchbase) > `peer.hostname` > `peer.db.system`
Queue | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (for Kafka) / `peer.aws.sqs.queue` (for Amazon SQS) / `peer.aws.kinesis.stream` (for Amazon Kinesis) > `peer.messaging.system`
Inferred service | `peer.service` > `peer.rpc.service` > `peer.hostname`

If instrumentation does not capture the highest-priority tag, Datadog uses the next available tag in the order shown above.

**Note**: Datadog never sets the `peer.service` for inferred databases and queues. `peer.service` is the highest priority peer attribute. If set, it takes precedence over all other attributes.

## Migrate to global default service naming

With inferred services, service dependencies are automatically detected from existing span attributes. As a result, changing service names (using the `service` tag) is not required to identify these dependencies. 

Set `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` to use the global default service name instead of integration-specific service names. Check the [minimum software development kit (SDK) versions](/tracing/services/integration_override_removal/#sdk-version-requirements) before enabling this setting. Custom service-name overrides are not affected.

<div class="alert alert-danger">Enabling this option may impact existing APM metrics, custom span metrics, trace analytics, retention filters, sensitive data scans, monitors, dashboards, or notebooks that reference the old service names. Update these assets to use the global default service tag (<code>service:&lt;DD_SERVICE&gt;</code>).</div>

For instructions on how to remove service overrides and migrate to inferred services, see the [Service Overrides guide][4].

[1]: /internal_developer_portal/catalog/
[2]: /tracing/services/service_page
[3]: /database_monitoring/
[4]: /tracing/guide/service_overrides
[5]: /tracing/services/renaming_rules/

{{< /site-region >}}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">The Inferred Services feature is not available by default in your data center. Fill out this <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">form</a> to request access.</div>

{{< /site-region >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
