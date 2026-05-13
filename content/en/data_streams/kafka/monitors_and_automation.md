---
title: Monitors and Automation
description: Recommended Datadog monitors for Kafka clusters and topics tracked by Data Streams Monitoring, and examples of using webhooks to automate a response when a monitor triggers.
weight: 2
further_reading:
- link: "/integrations/webhooks/"
  tag: "Documentation"
  text: "Webhooks integration"
- link: "/monitors/types/metric/"
  tag: "Documentation"
  text: "Metric monitors"
- link: "/data_streams/kafka/setup/"
  tag: "Documentation"
  text: "Kafka Monitoring setup"
---

Once your Kafka clusters are connected to Data Streams Monitoring (see [Kafka Monitoring Setup][1]), the next step is to alert on the conditions that put your pipelines at risk and, where possible, automate the response. This page covers the monitor templates that Data Streams Monitoring provides out of the box, and shows how to wire those monitors to a webhook so a triggered alert can take action automatically.

## Recommended monitors

Data Streams Monitoring ships with monitor templates that you can create directly from a cluster or topic detail page — no query writing required. On any cluster or topic, open the {{< ui >}}Monitors{{< /ui >}} side panel and click {{< ui >}}Start{{< /ui >}} on a template to pre-fill the query with the right scope.

### Cluster-level templates

| Template                                | Metric                              | Condition                                  |
|-----------------------------------------|-------------------------------------|--------------------------------------------|
| Offline partitions detected             | `kafka.partition.offline`           | Any partition in the cluster is offline.   |
| Under-replicated partitions detected    | `kafka.partition.under_replicated`  | Any partition in the cluster is under-replicated, which puts data at risk if a broker fails. |

Both monitors are grouped by `kafka_cluster_id` so each cluster alerts its own owner.

### Topic-level templates

| Template                                                   | Metric                                                                  | Condition |
|------------------------------------------------------------|-------------------------------------------------------------------------|-----------|
| Incoming message rate has dropped                          | `kafka.topic.message_rate`                                              | Produce rate to the topic drops below a threshold (default `< 1` msg/sec). Catches silent producer failures. |
| Consumer lag is high for topic                             | `kafka.estimated_consumer_lag`                                          | Consumer lag exceeds a threshold for a topic and consumer group (default `> 1000` messages). |
| Offline partitions on topic                                | `kafka.partition.offline`                                               | Any partition for this specific topic goes offline, indicating data unavailability for that topic. |
| Consumer lag is approaching time retention limit           | `kafka.estimated_consumer_lag` / `kafka.topic.config.retention_ms`      | Estimated lag exceeds 80% of the topic's time-based retention. Beyond 100% means the consumer cannot recover lost data. |
| Consumer lag is approaching bytes retention limit          | `kafka.consumer_lag` × throughput / `kafka.topic.config.retention_bytes` | Estimated lag exceeds 80% of the topic's bytes-based retention. Requires Kafka broker metrics to be available. |

The two "approaching retention" monitors are the most important guardrails against data loss: when lag exceeds retention, the broker deletes messages before the consumer reads them.

## Automate responses with webhooks

Datadog monitors can call any HTTP endpoint when they trigger, recover, or change state. Use this to take action automatically when a Kafka condition fires, rather than waiting for a human to triage. See [Webhooks integration][2] for how to configure the webhook destination, payload variables, and authentication.

A common pattern is to add `@webhook-<name>` to a monitor's notification message — Datadog calls the webhook each time the monitor changes state, with monitor metadata available as template variables (`{{topic.name}}`, `{{kafka_cluster_id.name}}`, `{{value}}`, and so on).

The examples below show conditions where automation is particularly valuable in a Kafka pipeline.

### Consumer lag increasing

When the **Consumer lag is high for topic** monitor triggers, automate one of the following:

- **Scale the consumer group.** Call a CI/CD or autoscaler webhook to increase the consumer deployment's replica count.
- **Notify the owning team.** Post to the consumer service's on-call channel with the topic, consumer group, and current lag pulled from the monitor's template variables.
- **Open an incident** for the consumer service if lag stays elevated past a recovery window.

### Risk of data loss (lag approaching retention)

When **Consumer lag is approaching time retention limit** or **bytes retention limit** triggers, the topic is within 80% of the point where unread messages are deleted. This is the highest-severity automation:

- **Page on-call immediately**, with the topic and remaining retention budget in the payload.
- **Trigger an emergency runbook** that can, for example, temporarily extend retention on the affected topic, pause the upstream producer, or scale the consumer group ahead of the threshold.

### Disk space running out on brokers

A broker that runs out of disk goes offline and takes its partitions with it. Create a monitor on the broker host's `system.disk.in_use` (or your Kafka deployment's equivalent) and have its webhook:

- **Notify the platform team's on-call** with the broker hostname and current disk usage.
- **Trigger a capacity workflow** to add storage, expand the cluster, or compact a candidate topic, depending on your operational model.

### Offline or under-replicated partitions

When the cluster-level **Offline partitions detected** or **Under-replicated partitions detected** monitor triggers:

- **Notify the cluster owner's on-call**, including the affected broker IDs and partition counts from the monitor's template variables.
- **Trigger a broker-health workflow** (for example, restart a stuck broker or rebalance partitions) if your runbook supports it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_streams/kafka/setup/
[2]: /integrations/webhooks/
