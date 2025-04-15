1. Enter the client ID for your application, such as `550e8400-e29b-41d4-a716-446655440000`. 
    - This is the client ID of the Azure Active Directory (AD) application. 
    - See [Register an application in Microsoft Entra ID][10161] for information on creating a new application.
1. Enter the directory ID for your tenant, which is the Azure AD tenant ID, such as `72f988bf-86f1-41af-91ab-2d7cd011db47`.
1. Enter the name of the table, such as `Custom-MyLogs`, to which you are sending logs. This is the name of the stream that matches the table when you configure the Data Collection Rule (DCR).
1. Enter the Data Collection Rule (DCR) immutable ID, such as `dcr-000a00a000a00000a000000aa000a0aa`. 
    - This is the immutable ID of the DCR where logging routes are defined. It is the **Immutable ID** on the DCR Overview page. See [Data collection rules (DCRs) in Azure Monitor][10162] to learn more about creating or viewing DCRs.
    - **Note**: Ensure the **Monitoring Metrics Publisher** role is assigned in the DCR IAM settings.

[10161]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate%2Cexpose-a-web-api
[10162]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview