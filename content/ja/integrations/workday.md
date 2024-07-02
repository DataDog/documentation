---
"app_id": "workday"
"app_uuid": "011547b7-572e-481a-988a-69c1ad8c6779"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10381"
    "source_type_name": Workday
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "workday"
"integration_id": "workday"
"integration_title": "Workday User Activity Logs"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "workday"
"public_title": "Workday User Activity Logs"
"short_description": "View Workday logs in Datadog for compliance and Cloud SIEM analysis."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Security"
  - "Submitted Data Type::Logs"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": View Workday logs in Datadog for compliance and Cloud SIEM analysis.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Workday User Activity Logs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

This integration enables the collection of Workday User Activity Logs to capture user activity within a Workday tenant. This integration allows you to:

- Control your Workday data retention.
- Build custom widgets and dashboards.
- Set up [Cloud SIEM][1] detection rules using the [out-of-the-box Logs Pipeline][2].
- Cross-reference Workday events with the data from other services across your stack.

Datadog’s Workday integration collects logs using [Workday’s User Activity Logging API][3], which generates logs that allow insight into:

- Which users are making requests in Workday
- What type of requests are being made
- The total amount of requests made
- Other metadata related to the event, such as device type and IP address

## セットアップ

### インストール

**Step 1: Enable User Activity Logging at the tenant level**

1. Access the **Edit Tenant Setup - System** task and ensure that the **Enable User Activity Logging** checkbox is selected.
2. Access the **Edit Tenant Setup - Security** task and ensure that the **OAuth 2.0 Clients Enabled** checkbox is selected.

**Step 2: Create an Integration System User**

1. Access the **Create Integration System User** task.
   - Username: < ISU_Datadog >
   - Session Timeout Minutes: 0 (disable session expiration)
   - Don't Allow UI Sessions: Yes (select this checkbox)
2. Access the **Create Security Group** task.
   - Type of Tenanted Security Group: Integration System Security Group (Unconstrained)
   - Name: < ISSG_Datadog_Monitoring >
3. Access the **Edit Integration System Security Group** (Unconstrained) task for the group you just created.
   - Integration System Users: < ISU_Datadog >
4. Access the **View Domain** task for the domain System Auditing.
5. Select Domain > Edit Security Policy Permissions from the System Auditing related actions menu.
6. Add the group that you created, Remote Security Monitoring, to both tables:
   - Report/Task Permissions table: View access
   - Integration Permissions table: Get access
7. Access the Activate Pending Security Policy Changes task and activate the changes that you made.

**Step 3: Register the API client for integrations in your tenant**

1. Access the **Register API Clients for Integrations** task and register the client.
   - Client Name: < Datadog User Activity Monitor >
   - Non-Expiring Refresh Tokens: Yes
   - Scope: System

**Step 4: Grab Required Configuration Values to setup the Monitor in Datadog**

1. Access the View API Clients task, select the API Clients for Integrations tab and confirm these settings:
   - Client Grant Type: Authorization Code Grant
   - Access Token Type: Bearer
2. Copy and store these four values (the first two values are at the top of the page):
   - Workday REST API Endpoint
   - Token Endpoint
   - Client ID
   - Client Secret
3. Select **API Client > Manage Refresh Token for Integrations** from the Client related actions menu.
   - Workday Account:< ISU_Datadog >
4. Select the **Generate New Refresh Token** checkbox, then save that token.
5. Create the Datadog Integration
   - Enter the values that you saved into the Datadog Configuration Tab.
   - Enter the domain part of the URL: **https://DOMAIN/**

## 収集データ

### メトリクス

Workday does not include any metrics.

### Logs

### イベント

The Workday integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "workday" >}}


## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://app.datadoghq.com/security/home
[2]: https://app.datadoghq.com/logs/pipelines?search=workday
[3]: https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#privacy/v1/get-/activityLogging
[4]: https://github.com/DataDog/integrations-internal-core/blob/master/workday/assets/service_checks.json
[5]: https://docs.datadoghq.com/help/

