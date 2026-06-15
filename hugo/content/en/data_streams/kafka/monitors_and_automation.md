---
title: Monitors and Automation
description: Recommended Datadog monitors for Kafka clusters and topics tracked by Data Streams Monitoring, and examples of automating responses with Workflow Automation or webhooks when a monitor triggers.
further_reading:
- link: "/actions/workflows/"
  tag: "Documentation"
  text: "Workflow Automation"
- link: "/actions/workflows/trigger/#add-a-monitor-trigger-to-your-workflow"
  tag: "Documentation"
  text: "Trigger a workflow from a monitor"
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

After your Kafka clusters are connected to Data Streams Monitoring (see [Kafka Monitoring Setup][1]), the next step is to alert on the conditions that put your pipelines at risk and, where possible, automate the response.

This page covers:

- [Recommended monitors](#recommended-monitors): available out-of-the-box monitor templates for cluster and topic health
- [Automate responses to triggered monitors](#automate-responses-to-triggered-monitors): using Datadog Workflow Automation or a webhook to take action when a monitor triggers

## Recommended monitors

Data Streams Monitoring ships with monitor templates that you can create directly from a cluster or topic detail page.

### Cluster-level templates

| Template                                | Description                                                                                                                                    | Metric                              | Condition                                                      |
|-----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|----------------------------------------------------------------|
| Offline partitions detected             | Topic data is unavailable for both reads and writes, risking message loss, consumer lag, and service outages until leadership is reassigned    | `kafka.partition.offline`           | Any partition in the cluster is offline                        |
| Under-replicated partitions detected    | Topic data has fewer in-sync replicas than configured, increasing risk of data loss if the leader broker fails before replication catches up   | `kafka.partition.under_replicated`  | Any partition in the cluster is under-replicated               |

Both monitors are grouped by `kafka_cluster_id` so each cluster alerts its own owner.

### Topic-level templates

| Template                                                   | Description                                                                                                                                 | Metric                                                                  | Condition |
|------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|-----------|
| Consumer lag is high for topic                             | Measured in seconds, indicating stale data served to customers, message backlog buildup, and delayed downstream processing                  | `kafka.estimated_consumer_lag`                                          | Consumer lag in seconds exceeds a threshold for a topic and consumer group |
| Incoming message rate has dropped                          | Catches silent producer failures                                                                                                            | `kafka.topic.message_rate`                                              | Produce rate to the topic drops below a threshold |
| Offline partitions on topic                                | Topic data is unavailable for both reads and writes, risking message loss, consumer lag, and service outages until leadership is reassigned | `kafka.partition.offline`                                               | Any partition for this specific topic goes offline |
| Consumer lag is approaching time retention limit           | Increased risk of data loss. Beyond the retention limit, the consumer cannot recover lost data                                              | `kafka.estimated_consumer_lag` / `kafka.topic.config.retention_ms`      | Estimated lag approaches the topic's time-based retention |
| Consumer lag is approaching bytes retention limit          | Increased risk of data loss. Beyond the retention limit, the consumer cannot recover lost data                                              | `kafka.consumer_lag` × throughput / `kafka.topic.config.retention_bytes` | Estimated lag approaches the topic's bytes-based retention.<br><br>Requires [Kafka broker metrics](/integrations/kafka/?tab=host#overview) to be available |

## Automate responses to triggered monitors

When a monitor triggers, Datadog can take action automatically rather than waiting for a human to triage. Two options:

- **Workflow Automation** — Build a Datadog Workflow that chains pre-built actions across your infrastructure and tools (PagerDuty, Slack, Jira, AWS, Kubernetes, and so on), and run it from a monitor trigger. Best for the "trigger a runbook" patterns below. See [Trigger a workflow from a monitor][3].
- **Webhooks** — Call any HTTP endpoint when a monitor triggers, recovers, or changes state. Best when the action lives in a system outside Datadog and you already have an HTTPS callback. See [Webhooks integration][2].

Either option can be added to a monitor by mentioning it in the notification message: `@workflow-<name>` for Workflow Automation, `@webhook-<name>` for a webhook. Monitor metadata is available as template variables (`{{topic.name}}`, `{{kafka_cluster_id.name}}`, `{{value}}`, etc.) and can be passed to the workflow or webhook payload.

The following examples show conditions where automation is particularly valuable in a Kafka pipeline.

### Consumer lag is high

Signals that a consumer group is falling behind its producer, with messages accumulating in the topic faster than they can be read.

**Potential action:** Run a workflow that scales the consumer group's replica count (for example, with the Kubernetes or AWS actions in Workflow Automation), or call a CI/CD or autoscaler webhook.

### Lag approaching retention limit

Signals that unread messages are approaching the topic's retention window. If lag exceeds retention, those messages get deleted before the consumer can read them.

**Potential action:** Trigger an emergency runbook that can temporarily extend retention on the affected topic, pause the upstream producer, or scale the consumer group ahead of the threshold.

### Broker disk filling up

Signals that a broker host is running low on disk space. If the disk fills up, the broker goes offline and its partitions become unavailable.

**Potential action:** Trigger a capacity workflow to add storage, expand the cluster, or reduce retention on a candidate topic.

### Offline or under-replicated partitions

Signals that one or more partitions in the cluster are offline (unavailable) or under-replicated, which puts data durability at risk if a broker fails.

**Potential action:** Trigger a broker-health workflow — for example, restart a stuck broker or rebalance partitions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_streams/kafka/setup/
[2]: /integrations/webhooks/
[3]: /actions/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
