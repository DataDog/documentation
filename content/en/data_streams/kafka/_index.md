---
title: Kafka Monitoring
description: Monitor Kafka cluster health, connect services to topics, and inspect schemas and messages with Data Streams Monitoring's Kafka Monitoring.
aliases:
  - /data_streams/live_messages
  - /data_streams/messages
  - /data_streams/kafka/messages
---

With Data Streams Monitoring's Kafka Monitoring, a Datadog Agent check connects to your Kafka cluster and starts collecting health and performance metrics. Kafka Monitoring allows you to:

- **Monitor Kafka health**: See cluster, broker, topic, and partition health with throughput, lag, and replication metrics
- **Pinpoint root cause**: Correlate configuration and schema changes with lag, throughput, and errors, and trace issues to the exact topic, schema version, or configuration change
- **Connect services to topics**: See which producers and consumers interact with each topic, with linked owners, repos, on-call rotations, traces, and error logs
- **Inspect topic schemas and messages**: View schemas, compare versions, and access messages to debug poison payloads or explore the topic

## Prerequisites

### Datadog Agent version

Datadog Agent version 7.78 or later is required.

### ACL permissions

If your Kafka cluster uses ACLs, the Datadog Agent user requires the following minimum permissions:

| Resource Name | Resource Type | Operation        |
|---------------|---------------|------------------|
| `kafka-cluster` | `CLUSTER`   | `Describe`       |
| `kafka-cluster` | `CLUSTER`   | `DescribeConfigs` |
| `*`           | `TOPIC`       | `Describe`       |
| `*`           | `TOPIC`       | `DescribeConfigs` |
| `*`           | `GROUP`       | `Describe`       |

To retrieve messages in the {{< ui >}}Messages{{< /ui >}} section, the Agent user also requires:

| Resource Name | Resource Type | Operation |
|---------------|---------------|-----------|
| `*`           | `TOPIC`       | `Read`    |

### Remote configuration

[Remote configuration][3] must be enabled for the Agent to retrieve Kafka messages in the {{< ui >}}Messages{{< /ui >}} section.

To validate:

1. In Datadog, under [{{< ui >}}Remote Configuration{{< /ui >}}][5], check that remote configuration is enabled at the organization level.
2. Check that the Agent has remote configuration enabled, and is using an API key with remote configuration enabled.

## Setup

Go to the [Kafka Monitoring setup page][1] and click {{< ui >}}Get Started{{< / ui >}}. Then choose your environment and follow the instructions. To request assistance, choose {{< ui >}}Request a pairing session{{< /ui >}}.

{{< img src="data_streams/kafka_setup-2.png" alt="The Kafka Monitoring setup dialog showing environment selection, security protocol, schema registry options, and Kubernetes configuration instructions" >}}

The setup page provides environment-specific configuration instructions. You can copy the instructions directly to an AI agent with {{< ui >}}Copy for AI{{< /ui >}}.

## Required permissions

To view Kafka messages, a user must have the `Data Streams Monitoring Capture Messages` permission.

You can verify your current permissions on your [{{< ui >}}Profile{{< /ui >}} page][7]. To enable permissions, edit an existing role or create a new one on the [{{< ui >}}Roles{{< /ui >}} page][8]. If you do not have permission to modify roles, contact your organization's administrator.

<details>
<summary><strong>Create a new role and assign it to users</strong></summary>

#### 1. Create a new role

1. Navigate to the [{{< ui >}}Roles{{< /ui >}} page][8] in Datadog.
2. Click {{< ui >}}+ New Role{{< /ui >}} in the top-right corner.
   <div class="alert alert-info">
   If you see "Read Only" instead of the "+ New Role button", you don't have permission to create roles. Contact your Datadog administrator for assistance.
   </div>
3. Enter a descriptive name for your new role (for example, "Data Streams Messages Access").
4. In the {{< ui >}}Search Permissions{{< /ui >}} field, type `Data Streams Monitoring Capture Messages`.
5. Select the permission from the search results to enable it for this role.
6. Click {{< ui >}}Save{{< /ui >}}.
7. Confirm your role was created successfully by searching for it in the roles list.

#### 2. Assign the role to users

1. Go to the [{{< ui >}}Users{{< /ui >}} page][9] in Datadog.
2. Find and click on the user you want to assign the role to.
3. In the user details panel, click {{< ui >}}Edit{{< /ui >}} next to their name.
   <div class="alert alert-info">
   If you don't see an {{< ui >}}Edit{{< /ui >}} button, you need administrator privileges to modify user roles. Contact your Datadog administrator.
   </div>
4. In the modal that opens, locate the {{< ui >}}Roles{{< /ui >}} section.
5. Add your newly created role to the user.
6. Click {{< ui >}}Save{{< /ui >}}.
7. Look for a {{< ui >}}User updated{{< /ui >}} confirmation message to verify the change was successful.

</details>

## Workflows

### Monitor cluster health and performance

The {{< ui >}}Clusters{{< /ui >}}, {{< ui >}}Topics{{< /ui >}}, and {{< ui >}}Brokers{{< /ui >}} tabs display health status across your entire Kafka infrastructure. For each topic, you can see partition count, under-replicated and offline partitions, message throughput, and consumer lag.

{{< img src="data_streams/kafka_clusters_overview-2.png" alt="The Kafka Monitoring clusters view showing cluster list with broker counts, topic names, replication status, and messages-in rate" >}}

Click into any topic to see a detailed summary, including incoming message rate, maximum lag across all partitions, and whether current lag is approaching the retention limit.

{{< img src="data_streams/kafka_topic_summary-2.png" alt="Topic detail summary page showing incoming message rate of 0.8 msg/sec, current lag of 1.15 seconds, and lag-vs-retention status" >}}

From any metric, you can create Datadog monitors, SLOs, and dashboards.

### Correlate configuration and schema changes with health metrics

Change events are overlaid directly on throughput and lag graphs, so you can see whether a configuration or schema change coincided with a degradation.

{{< img src="data_streams/kafka_topics_lag_change-2.png" alt="Topics view with a topic_config change annotation at 17:02:42 overlaid on the lag-by-topic graph, showing a spike correlated with the change event" >}}

To identify exactly what changed, click on detected changes on the overlay and select {{< ui >}}View config change{{< /ui >}}. 

{{< img src="data_streams/lag-by-topic-overlay.png" alt="Topic configuration diff view comparing version 625 and 626, with max.message.bytes changed from 1000012 to 1024 highlighted" >}}

### Connect producer and consumer services to topics

The {{< ui >}}Producers{{< /ui >}} and {{< ui >}}Consumers{{< /ui >}} sections of each topic show which services are reading from and writing to that topic. Hovering over a service shows ownership information from the Service Catalog: team, code repository, on-call engineer, and Slack channel.

{{< img src="data_streams/kafka_topic_service_ownership.png" alt="Topic producers and consumers view with a service panel open showing ownership team (Frameworks), code repo, on-call engineer, Slack channel, and health status" >}}

Use this information to contact the right team when a consumer is lagging or a producer is misbehaving.

### Inspect topic schemas and messages

The {{< ui >}}Schema{{< /ui >}} section shows the current schema for a topic's key or value, with version history. Use the version selector to compare schemas across versions.

The {{< ui >}}Messages{{< /ui >}} section lets you retrieve messages by partition and offset to inspect payloads directly. This is useful for debugging poison payloads or verifying message structure after a schema change.

{{< img src="data_streams/kafka_schema_messages.png" alt="Topic schema and messages view showing a Protobuf schema definition and a table of recent messages with date, partition, offset, and message value" >}}

[1]: https://app.datadoghq.com/data-streams/kafka/setup
[3]: /agent/remote_config
[5]: https://app.datadoghq.com/organization-settings/remote-config
[7]: https://app.datadoghq.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://app.datadoghq.com/organization-settings/users
