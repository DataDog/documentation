---
title: Live Messages (v2)
---

Live Messages allows you to view messages from specific offsets within Kafka. Inspecting these live messages can be crucial when troubleshooting issues related to specific services or data streams.

(Insert Screenshot here)

## Setup

To configure Live Messages, identify an appropriate agent to connect to your Kafka cluster and enable the Kafka consumer integration.

> **Important:** Before proceeding, ensure you have the `Data Streams Monitoring Capture Messages` permission enabled. See [Required Permission](#required-permission-data-streams-monitoring-capture-messages) for details.


### Selecting an Agent

If you self-host Kafka, set up Live Messages on your Kafka broker’s agent. Otherwise, choose any agent your producer or consumer services communicate with that has access to your Kafka cluster.

### Step-by-Step Guide

Perform all steps below on the same agent:

#### 1. Verify Agent Version

Ensure your agent is running version `7.69.0` or newer.

#### 2. Enable [Remote Configuration][2]

Confirm Remote Configuration is enabled for your agent, which is typically active by default. You can verify this on the [Fleet Automation][3] page.

#### 3. Configure Kafka Consumer Integration

Create or update the Kafka consumer configuration file at `[agent config directory]/kafka_consumer.d/conf.yaml` with the following example:

```yaml
init_config:

instances:
  - kafka_connect_str: kafka:29092 (use your own kafka string)
    monitor_unlisted_consumer_groups: true
    tags:
      - env:staging
```

Ensure you correctly tag your clusters to facilitate filtering and identification.

For more comprehensive instructions and advanced configuration options, see the [Kafka consumer integration documentation][4].

#### 4. Verify Setup

Check your agent logs for entries containing `kafka_consumer` to confirm the integration is active.

Also, verify Datadog is receiving data by examining the metric `kafka.broker_offset` in the metrics explorer, filtering by your configured topics.


### Required Permission: "Data Streams Monitoring Capture Messages"

You must have the `Data Streams Monitoring Capture Messages` permission enabled. You can verify or enable this permission by modifying an existing role or creating a new one on the [Roles][1] page.

### Usage

(TBD)

### Additional details

#### Message storage and access

(TBD)

#### Sensitive information redaction

(TBD)

#### SSL encryption on Kafka


(TBD)

[1]: https://app.datadoghq.com/organization-settings/roles
[2]: /agent/remote_config
[3]: https://app.datadoghq.com/fleet
[4]: /integrations/kafka-consumer/?tab=host#setup
