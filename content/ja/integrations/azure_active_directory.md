---
"app_id": "azure-active-directory"
"app_uuid": "8c4717a8-93f0-4de6-b79b-1e7f52c94895"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10106"
    "source_type_name": Azure Active Directory
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- azure
- cloud
- log collection
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/azure_active_directory/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "azure_active_directory"
"integration_id": "azure-active-directory"
"integration_title": "Azure Active Directory"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "azure_active_directory"
"public_title": "Azure Active Directory"
"short_description": "Analyze your Azure Active Directory activity logs"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Azure"
  - "Category::Cloud"
  - "Category::Log Collection"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Analyze your Azure Active Directory activity logs
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Azure Active Directory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Azure Active Directory is a cloud hosted Active Directory offering by Microsoft Azure.
This integration allows you to ingest your [Azure AD activity logs][1] (audit and sign-in logs) to Datadog.

## Setup

### Installation

This integration forwards logs to Datadog using Azure with Event Hubs. Configure Azure AD to forward activity logs to the event hub.

### Configuration

1. Set up the log forwarding pipeline from Azure to Datadog using Event Hubs by following the [Send Azure Logs to Datadog][2] guide.

2. In Azure portal, select _Azure Active Directory > Monitoring > Audit logs_.

3. Select **Export Settings**.

4. In the Diagnostics settings pane, do one of the following:

   - To change existing settings, select **Edit setting**.
   - To add new settings, select **Add diagnostics setting**. You can have up to three settings.

5. Select the **Stream to an event hub** check box, and then select **Event Hub/Configure**.

6. Select the Azure subscription and Event Hubs namespace that you created earlier to route the logs to.

7. Select OK to exit the event hub configuration.

8. Do one or both of the following. Datadog recommends selecting both.

   - To send audit logs, select the **AuditLogs** check box.
   - To send sign-in logs, select the **SignInLogs** check box.

9. Select **Save**.

Logs should start coming into Datadog within 15 minutes.
For more details on the setup, see the [Azure tutorial][3].

## Data Collected

#### Log collection

This integration allows you to setup log ingestion for Azure Active Directory activity logs.

This includes the following:

   - Sign-ins - Provides information about the usage of managed applications and user sign-in activities.

   - Audit logs - Provides traceability through logs for all changes done by various features within Azure AD.  

### Metrics

Azure Active Directory does not include any metrics.

### Events

Datadog sends credential expiry events, which grant visibility into credential expirations for Azure app registrations, Key Vault keys, Key Vault secrets, and Key Vault certificates. The Azure Active Directory integration must be installed to receive events for Azure app registrations. Receiving events from Azure also requires installation of the [Azure integration][4].


- **Expiration events** are sent 60, 30, 15, and 1 day(s) before credential expiration, and once after expiration.
- **Missing permission events** are sent every 15 days. A missing permission event lists the Key Vaults for which Datadog has not been given permissions. If no changes have been made regarding Key Vault permissions in the previous 15-day cycle, the event notification is not sent again.

You can view these events in [Event Explorer][5].

**Notes**: 

- To collect Azure app registration expiration events, [enable access to the Microsoft Graph API][6].
- If a certificate and its associated key and secret expire at the exact same time, one expiration event is sent for all resources.

## Troubleshooting

Need help? Contact [Datadog support][7].

[1]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/overview-reports#activity-reports
[2]: https://docs.datadoghq.com/logs/guide/azure-logging-guide/
[3]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/tutorial-azure-monitor-stream-logs-to-event-hub
[4]: https://docs.datadoghq.com/integrations/azure/
[5]: https://app.datadoghq.com/event/explorer
[6]: https://docs.datadoghq.com/integrations/guide/azure-graph-api-permissions/
[7]: https://docs.datadoghq.com/help

