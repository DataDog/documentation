#### Prerequisites

To set up the Microsoft Sentinel destination, you need the following information:

| Name                              | Description                                                                                                                                                                                                                     |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Application (client) ID            | The Azure Active Directory (AD) application's client ID. See [Register an application in Microsoft Entra ID][10161] for information on creating a new application.<br>**Example**: `550e8400-e29b-41d4-a716-446655440000`                                                                                      |
| Directory (tenant) ID              | The Azure AD tenant ID. See [Register an application in Microsoft Entra ID][10161] for information on creating a new application.<br>**Example**: `72f988bf-86f1-41af-91ab-2d7cd011db47`                                                                                      |
| Table (Stream) Name                | The name of the stream which matches the table chosen when configuring the Data Collection Rule (DCR).<br>**Example**: `Custom-MyLogs_CL`                                                                                                          |
| Data Collection Rule (DCR) immutable ID | This is the immutable ID of the DCR where logging routes are defined. It is the **Immutable ID** shown on the DCR Overview page.<br>**Note**: Ensure the Monitoring Metrics Publisher role is assigned in the DCR IAM settings.<br>**Example**: `dcr-000a00a000a00000a000000aa000a0aa`<br>See [Data collection rules (DCRs) in Azure Monitor][10162] to learn more about creating or viewing DCRs. |

Do the following to get that information:

1. Create or identify a Data Collection Rule (DCR).
    1. In the Azure Portal, navigate to **Azure Monitor** → **Data Collection Rules**.
    1. Create a DCR or use an existing one for custom logs. See [Data collection rules (DCRs) in Azure Monitor][10162] to learn more about creating or viewing DCRs.
    1. Take note of the DCR Immutable ID and, if you are using private links, the DCR's Data Collection Endpoint (DCE). You need this information when you set up the Microsoft Sentinel destination.
    1. Define a custom table (for example, `Custom-MyLogs_CL`) in the DCR, which is where Observability Pipelines sends logs to.
1. Get the ingestion URL.
    1. In the DCR, locate the **Logs Ingestion API endpoint**. The endpoint has the format: `https://<DCE-ID>.ingest.monitor.azure.com/dataCollectionRules/<DCR-Immutable-ID>/streams/<Stream-Name>?api-version=2023-01-01`, where the `<Stream-Name>` typically matches your custom table (for example, `Custom-MyLogs_CL`).
    1. The ingestion URL is needed when you set up you Microsoft Sentinel destination's environment variable.
1. To authenticate the Observability Pipelines Worker with Microsoft Sentinel:
    1. In the Azure Portal, navigate to **Azure AD** > **App Registrations** and register an Azure Active Directory (AD) application. See [Register an application in Microsoft Entra ID][10161] for information on creating a new application.
    1. Generate a **Client Secret**.
    1. Assign it the **Monitoring Metrics Publisher** role on the Log Analytics workspace
    1. Take note of the **Tenant ID**, **Client ID**, and **Client Secret**. You need this information when you set up the Microsoft Sentinel destination.

#### Set up destination in Observability Pipelines

To set up the Microsoft Sentinel destination in Observability Pipelines:

1. Enter the client ID for your application, such as `550e8400-e29b-41d4-a716-446655440000`.
1. Enter the directory ID for your tenant, such as `72f988bf-86f1-41af-91ab-2d7cd011db47`. This is the Azure AD tenant ID.
1. Enter the name of the table, such as `Custom-MyLogs`, to which you are sending logs.
1. Enter the Data Collection Rule (DCR) immutable ID, such as `dcr-000a00a000a00000a000000aa000a0aa`.

[10161]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate%2Cexpose-a-web-api
[10162]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview

### Create an Event Hubs Namespace

1. In the Azure Portal, go to Event Hubs > Create.
1. Fill in Project Details (subscription, resource group) and Instance Details (namespace name, region, select Standard, Premium, or Dedicated tier).
1. Ensure the region matches your Azure resources (e.g., westus).
1. Review and create the namespace.
1. Note: The Kafka endpoint is automatically enabled for Standard and higher tiers.

### Create an Event Hub (Kafka Topic)

1. Inside the namespace, select Event Hubs > + Event Hub.
1. Enter a name (e.g., datadog-topic) and configure settings (e.g., 4 partitions, 7-day retention).
1. This Event Hub acts as a Kafka topic.

### Configure Shared Access Policy

1. In the Event Hub, go to Settings > Shared access policies > + Add.
1. Create a policy (e.g., DatadogKafkaPolicy) with Listen, Send, and Manage permissions.
1. Copy the Connection string-primary key for Kafka authentication.

### Set Up Diagnostic Settings

1. Configure Azure resources (e.g., VMs, App Services) or subscription-level activity logs to stream logs to the Event Hub.
1. Navigate to the resource > Monitoring > Diagnostic settings > Add diagnostic setting.
1. Select log categories (e.g., AuditLogs, SignInLogs for Microsoft Entra ID).
1. Check Stream to an event hub, select the namespace and Event Hub (datadog-topic).
1. Save the settings.
1. For activity logs, go to Microsoft Entra ID > Monitoring > Audit logs > Export Data Settings, and stream to the Event Hub.
1. Repeat for each region, as logs must stream to Event Hubs in the same region.

### Configure Kafka-Compatible Connection for Azure Event Hub

Azure Event Hubs exposes a Kafka endpoint at NAMESPACE.servicebus.windows.net:9093, which Observability Pipelines will use as the Kafka source.

### Retrieve Kafka Connection Details

1. In the Azure Portal, navigate to your Event Hubs Namespace (e.g., myeventhubns).
1. On the Overview page, under the Essentials section, locate the Host name or Fully Qualified Domain Name (FQDN). It will be in the format: <NAMESPACE>.servicebus.windows.net (e.g., myeventhubns.servicebus.windows.net).
1. Append the Kafka port :9093 to form the Bootstrap Servers value: <NAMESPACE>.servicebus.windows.net:9093.
1. Example: If your namespace is myeventhubns, the Bootstrap Servers is myeventhubns.servicebus.windows.net:9093.

### Set Up Authentication

1. Azure Event Hubs uses SASL_SSL with the PLAIN mechanism for Kafka authentication.
1. The connection string will be formatted for Observability Pipelines:
   - Username: $ConnectionString
   - Password: Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>