---
title: Kafka Source
disable_toc: false
---

Use Observability Pipelines' Kafka source to receive logs from your Kafka topics. Select and set up this source when you [set up a pipeline][1]. The Kafka source uses [librdkafka][2].

## Prerequisites

{{% observability_pipelines/prerequisites/kafka %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/kafka %}}

## librdkafka options

These are the available librdkafka options:

- auto.offset.reset
- auto.commit.interval.ms
- client.id
- coordinator.query.interval.ms
- enable.auto.commit
- enable.auto.offset.store
- fetch.max.bytes
- fetch.message.max.bytes
- fetch.min.bytes
- fetch.wait.max.ms
- group.instance.id
- heartbeat.interval.ms
- queued.min.messages
- session.timeout.ms
- socket.timeout.ms

See the [librdkafka documentation][3] for more information and to ensure your values have the correct type and are within range.

## Send Azure Event Hub logs to Observability Pipelines using the Kafka source

### Create an Event Hubs namespace

1. In the Azure Portal, navigate to [Event Hubs](https://portal.azure.com/#browse/Microsoft.EventHub%2Fnamespaces).
1. Click **Create**.
1. Fill in the **Project Details** (subscription, resource group) and **Instance Details** (namespace name, region, select Standard, Premium, or Dedicated tier).
1. Ensure the region matches your Azure resources (for example, `westus`).
1. Click **Review + create**.

**Note**: The Kafka endpoint is automatically enabled for Standard and higher tiers.

### Create an Event Hub (Kafka topic)

1. In the namespace you created, select **Event Hubs** and click **+ Event Hub**.
1. Enter a name (for example, `datadog-topic`) and configure the settings (for example, 4 partitions and a 7-day retention time).
1. Click **Review + create**. This Event Hub acts as a Kafka topic.

### Configure shared access policy

1. In the Event Hub you created, navigate to **Settings** > **Shared access policies**.
1. Click **+ Add**.
1. Enter a policy name (for example, `DatadogKafkaPolicy`).
1. Select the **Manage** checkbox, which should automatically select the **Send** and **Listen** checkboxes.
1. Click **Create**.
1. Copy the **Connection string-primary key** for Kafka authentication.

### Set Up Diagnostic Settings

1. Configure Azure resources (for example, VMs, App Services) or subscription-level activity logs to stream logs to the Event Hub.
1. Navigate to the resource.
1. Navigate to **Monitoring** > **Diagnostic settings** and click **+ Add diagnostic setting**.
1. Select log categories you want (for example, AuditLogs, SignInLogs for Microsoft Entra ID).
1. In **Destination details**:
    1. Check the **Stream to an event hub** box.
    1. Select the namespace and Event Hub (`datadog-topic`).
1. Click **Save**.
1. For activity logs:
    1. Navigate to **Microsoft Entra ID** > **Monitoring** > **Audit logs** > **Export Data Settings**.
    1. Check the **Stream to the Event Hub** box.
1. Repeat for each region. Logs must stream to Event Hubs in the same region.

### Configure Kafka-Compatible Connection for Azure Event Hub

Azure Event Hubs exposes a Kafka endpoint at `NAMESPACE.servicebus.windows.net:9093`, which Observability Pipelines uses as the Kafka source.

#### Retrieve Kafka connection details

1. In the Azure Portal, navigate to your Event Hubs Namespace (for example, `myeventhubns`).
1. On the **Overview** page, under the **Essentials** section, locate the **Host name** or **Fully Qualified Domain Name (FQDN)**. It is in the format: `<NAMESPACE>.servicebus.windows.net` (for example, `myeventhubns.servicebus.windows.net`).
1. Append the Kafka port `:9093` to form the Bootstrap Servers value: `<NAMESPACE>.servicebus.windows.net:9093`.
    - For example, if your namespace is `myeventhubns`, the Bootstrap Servers is `myeventhubns.servicebus.windows.net:9093`.

### Set Up Authentication

1. Azure Event Hubs uses SASL_SSL with the PLAIN mechanism for Kafka authentication.
1. The connection string is formatted for Observability Pipelines:
    ```
    Username: $ConnectionString
    Password: Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>
    ```

[1]: /observability_pipelines/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master
[3]: https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md