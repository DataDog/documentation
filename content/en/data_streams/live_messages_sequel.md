---
title: Live Messages (v2)
---

Live Messages allows you to view messages at specific offsets within Kafka. Inspecting these live messages can be crucial when troubleshooting issues related to specific services or data streams.

(Insert Screenshot here)

## Setup

To configure Live Messages, identify an appropriate agent to connect to your Kafka cluster and enable the Kafka consumer integration.

### Any Datadog agent having access to Kafka can be used for setup

If you self-host Kafka, set up Live Messages on your Kafka broker’s agent. Otherwise, choose any agent your producer or consumer services communicate with that has access to your Kafka cluster.

### Step-by-step guide

Perform all steps below on the same agent:

#### 1. Verify agent version

Ensure your agent is running version `7.69.0` or newer.

#### 2. Enable [remote configuration][2]

Ensure Remote Configuration is enabled for your agent. It is typically enabled by default, and you can confirm this on the [Fleet Automation page][3]. Additionally, verify that Remote Configuration is enabled at the organization level by visiting the [Remote Configuration settings page][4].

#### 3. Configure Kafka consumer integration

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

For more comprehensive instructions and advanced configuration options, see the [Kafka consumer integration documentation][5].

#### 4. Verify setup

Check your agent logs for entries containing `kafka_consumer` to confirm the integration is active.

Also, verify Datadog is receiving data by examining the metric `kafka.broker_offset` in the metrics explorer, filtering by your configured topics.


## Required permission: "Data Streams Monitoring Capture Messages"

You must have the `Data Streams Monitoring Capture Messages` permission enabled. You can verify or enable this permission by modifying an existing role or creating a new one on the [Roles][1] page.

If you don't have sufficient permissions to modify roles, contact your organization's administrator to request access.

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
[4]: https://app.datadoghq.com/organization-settings/remote-config
[5]: /integrations/kafka-consumer/?tab=host#setup
