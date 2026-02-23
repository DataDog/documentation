#### Prerequisites

To set up the Microsoft Sentinel destination, you need to create a Workspace in Azure if you haven't already. In that workspace:
1. [Add Microsoft Sentinel][10163] to the workspace.
1. [Create a Data Collection Endpoint (DCE)][10164].
1. [Create a Log Analytics Workspace][10165] in the workspace if you haven't already.
1. In the Log Analytics Workspace, navigate to **Settings** > **Tables**.
    1. Click **+ Create**.
    1. Define a custom table (for example, `MyOPWLogs`).
        - **Notes**:<br>- After the table is configured, the prefix `Custom-` and suffix `_CL` are automatically appended to the table name. For example, if you defined the table name in Azure to be `MyOPWLogs`, the full table name is stored as `Custom-MyOPWLogs_CL`. You must use the full table name when you set up the Observability Pipelines Microsoft Sentinel destination.<br>-The full table name can be found in the resource JSON of the DCR under `streamDeclarations`.<br>- You can also use an Azure Table instead of a custom table.
    1. Select **New Custom Log (DCR-based)**.
    1. Click **Create a new data collection rule** and select the DCE you created earlier.
    1. Click **Next**.
    1. Upload a sample JSON Log. For this example, the following JSON is used for the **Schema and Transformation**, where  `TimeGenerated` is required:
        ```json
        {
            "TimeGenerated": "2024-07-22T11:47:51Z",
            "event": {}
        }
        ```
    1. Click **Create**.
1. In Azure, navigate to **Microsoft Entra ID**.
    1. Click **Add** > **App Registration**.
    1. Click **Create**.
    1. On the overview page, click **Client credentials: Add a certificate or secret**.
    1. Click **New client secret**.
    1. Enter a name for the secret and click **Add**. **Note**: Make sure to take note of the client secret, which gets obfuscated after 10 minutes.
    1. Also take note of the **Tenant ID** and **Client ID**. You need this information, along with the client secret, when you [set up the Observability Pipelines Microsoft Sentinel destination](#set-up-the-destination-in-observability-pipelines).
1. In Azure Portal's [Data Collection Rules][10166] page, search for and select the DCR you created earlier.
    1. Click **Access Control (IAM)** in the left nav.
    1. Click **Add** and select **Add role assignment**.
    1. Add the **Monitoring Metrics Publisher** role.
    1. On the Members page, select **User, group, or service principal**.
    1. Click **Select Members** and search for the application you created in the app registration step.
    1. Click **Review + Assign**. **Note**: It can take up to 10 minutes for the IAM change to take effect.

The table below summarizes the Azure and Microsoft Sentinel information you need when you [set up the Observability Pipelines Microsoft Sentinel destination](#set-up-the-destination-in-observability-pipelines):

| Name                              | Description                                                                                                                                                                                                                     |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Application (client) ID            | The Azure Active Directory (AD) application's client ID. See [Register an application in Microsoft Entra ID][10161] for more information.<br>**Example**: `550e8400-e29b-41d4-a716-446655440000`                                                                                      |
| Directory (tenant) ID              | The Azure AD tenant ID. See [Register an application in Microsoft Entra ID][10161] for more information.<br>**Example**: `72f988bf-86f1-41af-91ab-2d7cd011db47`                                                                                      |
| Table (Stream) Name                | The name of the stream which matches the table chosen when configuring the Data Collection Rule (DCR).  **Note**: The full table name can be found in the resource JSON of the DCR under `streamDeclarations`. <br>**Example**: `Custom-MyOPWLogs_CL`                                                                                                          |
| Data Collection Rule (DCR) immutable ID | This is the immutable ID of the DCR where logging routes are defined. It is the **Immutable ID** shown on the DCR Overview page.<br>**Note**: Ensure the Monitoring Metrics Publisher role is assigned in the DCR IAM settings.<br>**Example**: `dcr-000a00a000a00000a000000aa000a0aa`<br>See [Data collection rules (DCRs) in Azure Monitor][10162] to learn more about creating or viewing DCRs. |

#### Set up the destination in Observability Pipelines

To set up the Microsoft Sentinel destination in Observability Pipelines:

1. Enter the client ID for your application, such as `550e8400-e29b-41d4-a716-446655440000`.
1. Enter the directory ID for your tenant, such as `72f988bf-86f1-41af-91ab-2d7cd011db47`. This is the Azure AD tenant ID.
1. Enter the full table name to which you are sending logs. An example table name: `Custom-MyOPWLogs_CL`.
1. Enter the Data Collection Rule (DCR) immutable ID, such as `dcr-000a00a000a00000a000000aa000a0aa`.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

[10161]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate%2Cexpose-a-web-api
[10162]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview
[10163]: https://portal.azure.com/#browse/microsoft.securityinsightsarg%2Fsentinel
[10164]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionendpoints
[10165]: https://portal.azure.com/#create/Microsoft.LogAnalyticsOMS
[10166]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionrules