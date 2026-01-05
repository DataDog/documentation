---
title: Send Azure Event Hubs Logs to Observability Pipelines
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

## Overview

This document walks through how to send Azure Event Hubs logs to Observability Pipelines using the Kafka source. The setup steps include setting up Azure Event Hubs for the Kafka source:

- [Create an Event Hubs namespace](#create-an-azure-event-hubs-namespace)
- [Create an Event Hub (Kafka topic)](#create-an-event-hub-kafka-topic)
- [Configure shared access policy](#configure-shared-access-policy)
- [Set up diagnostic settings](#set-up-diagnostic-settings)
- [Configure Kafka-compatible connection for the event hub](#configure-kafka-compatible-connection-for-the-event-hub)

After Azure Event Hubs has been set up, you [set up a pipeline with the Kafka source](#set-up-a-pipeline-with-the-kafka-source) to send Azure Event Hubs logs to Observability Pipelines.

## Set up Azure Event Hubs for the Kafka source

### Create an Azure Event Hubs namespace

1. In the Azure Portal, navigate to [Event Hubs](https://portal.azure.com/#browse/Microsoft.EventHub%2Fnamespaces).
1. Click **Create**.
1. Fill in the **Project Details** (subscription, resource group) and **Instance Details** (namespace name, region, select Standard, Premium, or Dedicated tier).
1. Ensure the region matches your Azure resources (for example, `westus`).
1. Click **Review + create**.

**Note**: The Kafka endpoint is automatically enabled for standard and higher tiers.

### Create an event hub (Kafka topic)

1. In the namespace you created, select **Event Hubs** and click **+ Event Hub**.
1. Enter a name (for example, `datadog-topic`) and configure the settings (for example, 4 partitions and a 7-day retention time).
1. Click **Review + create**. This Event Hub acts as a Kafka topic.

### Configure shared access policy

1. In the Event Hub you created, navigate to **Settings** > **Shared access policies**.
1. Click **+ Add**.
1. Enter a policy name (for example, `DatadogKafkaPolicy`).
1. Select the **Manage** checkbox, which should automatically select the **Send** and **Listen** checkboxes.
1. Click **Create**.
1. The **Primary Key** and **Primary connection string** is needed for Kafka authentication when you set up the Observability Pipeline's Kafka source.

### Set up diagnostic settings

1. Configure Azure resources (for example, VMs, App Services) or subscription-level activity logs to stream logs to the Event Hub.
1. For resources:
    1. Navigate to the resource and then to **Monitoring** > **Diagnostic settings**.
    1. Click **+ Add diagnostic setting**.
    1. Select log categories you want (for example, AuditLogs, SignInLogs for Microsoft Entra ID).
    1. In **Destination details**:
        1. Check the **Stream to an event hub** box.
        1. Select the namespace and Event Hub (`datadog-topic`).
    1. Click **Save**.
1. For activity logs:
    1. Navigate to **Microsoft Entra ID** > **Monitoring** > **Audit logs** > **Export Data Settings**.
    1. Check the **Stream to the Event Hub** box.
1. Repeat for each region. Logs must stream to Event Hubs in the same region.

### Configure Kafka-compatible connection for the Event Hub

Azure Event Hubs exposes a Kafka endpoint at `NAMESPACE.servicebus.windows.net:9093`, which Observability Pipelines uses as the Kafka source.

#### Get the Kafka endpoint

1. In the Azure Portal, navigate to your Event Hubs Namespace (for example, `myeventhubns`).
1. On the **Overview** page, under the **Essentials** section, locate the **Host name** or **Fully Qualified Domain Name (FQDN)**. It is in the format: `<NAMESPACE>.servicebus.windows.net` (for example, `myeventhubns.servicebus.windows.net`).
1. Append the Kafka port `:9093` to form the Bootstrap Servers value: `<NAMESPACE>.servicebus.windows.net:9093`.
    - For example, if your namespace is `myeventhubns`, the Bootstrap Servers is `myeventhubns.servicebus.windows.net:9093`.
    - You need this information when you set up the Observability Pipelines Kafka source.

#### Set up authentication

1. Azure Event Hubs uses SASL_SSL with the PLAIN mechanism for Kafka authentication.
1. The connection string is formatted for Observability Pipelines:
    ```
    Username: $$ConnectionString
    Password: Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>
    ```

## Set up a pipeline with the Kafka source

Select your platform.

{{< tabs >}}
{{% tab "Kubernetes" %}}
1. Navigate to [Observability Pipelines](https://app.datadoghq.com/observability-pipelines).
1. Select the Kafka source.
    1.  In the **Group ID** field, specify or create a unique consumer group (for example, `datadog-consumer-group`).
    1.  In the **Topics** field, enter `datadog-topic` or the topic you configured for your Event Hub earlier.
    1.  Toggle the switch to enable SASL authentication.
    1.  In the **Mechanism** dropdown menu, select **PLAIN**.
    1.  Enable TLS.
        1. Configure your `values.yaml` file to use the certificate that works as part of the container image:
            ```
            initContainers:
            - name: copy-config
            image: gcr.io/datadoghq/observability-pipelines-worker:latest
            imagePullPolicy: IfNotPresent
            command: ['/bin/sh', '-c', 'mkdir -p /config-volume/observability-pipelines-worker/config/ && cp /etc/ssl/certs/ca-certificates.crt /config-volume/observability-pipelines-worker/config/ca-certificates.crt']
            volumeMounts:
            - name: config-volume
                mountPath: /config-volume
            extraVolumes:
            - name: config-volume
            emptyDir: {}
            extraVolumeMounts:
            - name: config-volume
            mountPath: /config-volume
            ```
            **Note**: When install the Worker with the install command you need to add:
            ```
            --set env[0].name=DD_OP_DATA_DIR,env[0].value='/config-volume/observability-pipelines-worker/'
            ```
        1. In the **Certificate path** field, enter `/ca-certificates.crt` if you used the example above. Otherwise, enter the name of your certificate.
    {{< img src="observability_pipelines/sources/kafka_settings.png" alt="The Kafka source settings with example values" style="width:45%;" >}}
1. Click **Next: Select Destination**.
1. After you set up your destinations and processors, click **Next: Install**.
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the environment variables for your Kafka source:
    1.  For **Kafka Bootstrap Servers**, enter `<NAMESPACE>.servicebus.windows.net:9093` (for example, `myeventhubns.servicebus.windows.net:9093`).
    1.  For **Kafka SASL Username**, enter `$$$$ConnectionString`. **Note**: You must have `$$$$` in front of `ConnectionString` because `$$$$` ends up being `$$` when transposed into the environment.
    1.  For **Kafka SASL Password**, enter the full connection string. For example, `Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>`.
        - This is the **Primary Connection String** in your Event Hub instance [shared access policies](#configure-shared-access-policy).
    1. Enter your Kafka TLS passphrase.
        - This is the **Primary Key** in your Event Hub instance's [shared access policies](#configure-shared-access-policy).
    {{< img src="observability_pipelines/sources/kafka_env_vars.png" alt="The install page with example values for the kafka environment variables" style="width:60%;" >}}
1. Enter the environment variables for your destinations, if applicable.
1. Follow the rest of the instructions on the page to install the Worker based on your platform.
{{% /tab %}}
{{% tab "Virtual machine (VM)" %}}

1. Navigate to [Observability Pipelines](https://app.datadoghq.com/observability-pipelines).
1. Select the Kafka source.
    1.  In the **Group ID** field, specify or create a unique consumer group (for example, `datadog-consumer-group`).
    1.  Enter `datadog-topic` in the **Topics** field.
    1.  Toggle the switch to enable SASL authentication.
    1.  In the **Mechanism** dropdown menu, select **PLAIN**.
    1.  Enable TLS. For the certificate, copy the certificate from its original location to the default Observability Pipelines data configuration directory:
        1. Since the Observability Pipelines Worker hasn't been installed yet, run this command to create the directory for the certificate:
            ```
            sudo mkdir -p /var/lib/observability-pipelines-worker/config
            ```
        1. Run this command to copy the certificate to the directory you created:
            ```
            sudo cp /etc/ssl/certs/ca-certificates.crt /var/lib/observability-pipelines-worker/config/
            ```
        1. In the **Certificate path** field, enter `/ca-certificates.crt`.
    {{< img src="observability_pipelines/sources/kafka_settings_vm.png" alt="The Kafka source settings with example values" style="width:45%;" >}}
1. Click **Next: Select Destination**.
1. After you set up your destinations and processors, click **Next: Install**.
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the environment variables for your Kafka source:
    1.  For **Kafka Bootstrap Servers**, enter `<NAMESPACE>.servicebus.windows.net:9093` (for example, `myeventhubns.servicebus.windows.net:9093`).
    1.  For **Kafka SASL Username**, enter `\$\$ConnectionString`. **Note**: You must escape the `$` in front of `ConnectionString`, otherwise the environment variable won't be loaded.
    1.  For **Kafka SASL Password**, enter the full connection string wrapped in quotes (`"`). For example, `"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`.
        - This is the **Primary Connection String** in your Event Hub instance [shared access policies](#configure-shared-access-policy).
    1. Enter your Kafka TLS passphrase.
        - This is the **Primary Key** in your Event Hub instance's [shared access policies](#configure-shared-access-policy).
    {{< img src="observability_pipelines/sources/kafka_env_vars_vm.png" alt="The install page with example values for the kafka environment variables" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

If you run into issues after installing the Worker, check your Observability Pipelines environment file (`/etc/default/observability-pipelines-worker`) to make sure the environment variables are correctly set:

- `DD_OP_SOURCE_KAFKA_SASL_USERNAME="$$ConnectionString"`
- `DD_OP_SOURCE_KAFKA_BOOTSTRAP_SERVERS=<NAMESPACE>.servicebus.windows.net:9093`
- `DD_OP_SOURCE_KAFKA_SASL_PASSWORD=<Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>>`
- `DD_OP_SOURCE_KAFKA_KEY_PASS=password`

### Missing environment variable

If you see the error `Missing environment variable DD_OP_SOURCE_KAFKA_SASL_PASSWORD` and you are running the Worker in a VM, make sure that the variable is in quotes (`"`) when you run the Worker install script. For example:
```
DD_OP_SOURCE_KAFKA_SASL_PASSWORD=`"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`
```