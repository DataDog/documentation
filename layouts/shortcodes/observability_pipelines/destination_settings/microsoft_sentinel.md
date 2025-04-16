#### Prerequisites

To use the Microsoft Sentinel destination, you need the following information:

| Field                              | Description                                                                                                                                                                                                                     | Example                                |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| Application (client) ID            | The Azure Active Directory (AD) app's client ID. See [Register an application in Microsoft Entra ID][10161] for information on creating a new application.                                                                                                                              | `550e8400-e29b-41d4-a716-446655440000`  |
| Directory (tenant) ID              | The Azure AD tenant ID. See [Register an application in Microsoft Entra ID][10161] for information on creating a new application.                                                                                                                                                       | `72f988bf-86f1-41af-91ab-2d7cd011db47`  |
| Table (Stream) Name                | The name of the stream which matches the table chosen when configuring the Data Collection Rule (DCR).                                                                                                                     | `Custom-MyLogs_CL `                         |
| Data Collection Rule (DCR) immutable ID | This is the immutable ID of the DCR where logging routes are defined. It is the **Immutable ID** shown on the DCR Overview page.<br>**Note**: Ensure the Monitoring Metrics Publisher role is assigned in the DCR IAM settings.<br>See [Data collection rules (DCRs) in Azure Monitor][10162] to learn more about creating or viewing DCRs. | `dcr-000a00a000a00000a000000aa000a0aa`   |

To get those values:

1. Create or identify a Data Collection Rule (DCR).
    1. In Microsoft Sentinel, go to **Data Connectors** or **Data Collection Rules (DCR)** under **Azure Monitor**.
    1. Create a DCR or use an existing one for custom logs. See [Data collection rules (DCRs) in Azure Monitor][10162] to learn more about creating or viewing DCRs.
    1. Take note of the DCR Immutable ID and, if you are using private links, the DCR's Data Collection Endpoint (DCE). You need this information when you set up the Microsoft Sentinel destination.
    1. Define a custom table (for example, `Custom-MyLogs_CL`) in the DCR, which is where Observability Pipelines sends logs to.
1. Get the ingestion URL.
    1. In the DCR, locate the **Logs Ingestion API endpoint**. The endpoint has the format: `https://<DCE-ID>.ingest.monitor.azure.com/dataCollectionRules/<DCR-Immutable-ID>/streams/<Stream-Name>?api-version=2023-01-01`, where the `<Stream-Name>` typically matches your custom table (for example, `Custom-MyLogs_CL`).
    1. The ingestion URL is needed when you set up you Microsoft Sentinel destination's environment variable.
1. To authenticate the Observability Pipelines Worker with Microsoft Sentinel:
    1. In Microsoft Sentinel, navigate to **Azure AD** > **App Registrations** and register an Azure Active Directory (AD) application. See [Register an application in Microsoft Entra ID][10161] for information on creating a new application.
    1. Generate a **Client Secret** or certificate.
    1. Assign it the **Monitoring Metrics Publisher** role on the Log Analytics workspace
    1. Take note of the **Tenant ID**, **Client ID**, and **Client Secret**. You need this information when you set up the Microsoft Sentinel destination.

#### Set up destination in Observability Pipelines

To set up the Microsoft Sentinel destination in Observability Pipelines:

1. Enter the client ID for your application, such as `550e8400-e29b-41d4-a716-446655440000`. This is the client ID of the Azure Active Directory (AD) application.
1. Enter the directory ID for your tenant, such as `72f988bf-86f1-41af-91ab-2d7cd011db47`. This is the Azure AD tenant ID.
1. Enter the name of the table, such as `Custom-MyLogs`, to which you are sending logs. This is the name of the stream that matches the table configured for the Data Collection Rule (DCR).
1. Enter the Data Collection Rule (DCR) immutable ID, such as `dcr-000a00a000a00000a000000aa000a0aa`. This is the immutable ID of the DCR where logging routes are defined.<br>**Note**: Ensure the **Monitoring Metrics Publisher** role is assigned in the DCR IAM settings.

[10161]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate%2Cexpose-a-web-api
[10162]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview