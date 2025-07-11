---
title: Messages
---

The Messages feature allows you to view messages at specific offsets within Kafka. Inspecting these messages can be crucial when troubleshooting issues related to specific services or data streams.

## Setup
Before diving into detailed configuration steps, here's a quick overview of what's involved in setting up the Messages feature:

| Step               | Description                                                                                                                                       | Setup Guides              |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| Agent setup        | An agent needs Kafka consumer integration enabled, be on at least version 7.69.0, and have remote configuration enabled                           | [Agent Setup][1]          |
| Verify permissions | You'll need a few log access permissions which usually come standard as well as `Data Streams Monitoring Capture Messages` enabled in Datadog     | [Required Permissions][2] |


### Agent Setup

#### Selecting an Agent
Any Datadog agent having access to Kafka can be used for setup.

If you self-host Kafka, set up Messages on your Kafka broker's agent. Otherwise, choose any agent your producer or consumer services communicate with that has access to your Kafka cluster.

#### Step-by-step guide

Complete the following steps on the same Datadog agent:

##### 1. Verify agent version

Ensure your agent is running version `7.69.0` or later.

##### 2. Enable [remote configuration][3]

Confirm Remote Configuration is enabled for your agent (typically enabled by default). Verify this setting on the [Fleet Automation page][4] and also confirm it at the organizational level via the [Remote Configuration settings page][5].

##### 3. Configure Kafka consumer integration
Create or update the Kafka consumer configuration file at

```
[agent config directory]/kafka_consumer.d/conf.yaml
```

Here's an example configuration (see a detailed sample [here][9]):
```yaml
init_config:

instances:
  - kafka_connect_str: kafka:29092 # Replace with your Kafka cluster address
    monitor_unlisted_consumer_groups: true
    tags:
      - env:staging
```
Ensure you correctly tag your clusters to facilitate filtering and identification.

For detailed instructions and advanced settings, review the [Kafka consumer integration documentation][6].

##### 4. Verify setup

* Review agent logs for `kafka_consumer` entries to confirm successful integration.
* Verify data ingestion by inspecting the `kafka.broker_offset` metric in Datadog's Metrics Explorer, filtering by the relevant Kafka topics.


### Required permissions

You must have the following permissions enabled:

* `Data Streams Monitoring Capture Messages`
* `Logs Read Index Data`
* `Logs Read Data`
* `Logs Live Tail`

You can verify your current permissions on your [Profile page][7].

To enable permissions, edit an existing role or create a new one on the [Roles page][8]. If you don't have adequate access to modify roles, contact your organization's administrator.

[1]: #agent-setup
[2]: #required-permissions
[3]: /agent/remote_config
[4]: https://app.datadoghq.com/fleet
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /integrations/kafka-consumer/?tab=host#setup
[7]: https://app.datad0g.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example
