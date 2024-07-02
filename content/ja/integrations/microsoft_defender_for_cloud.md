---
"app_id": "microsoft-defender-for-cloud"
"app_uuid": "e9e9981e-c97a-4395-a98b-b39b2adf1bb6"
"assets":
  "dashboards":
    "MicrosoftDefenderforCloud-Overview": assets/dashboards/MicrosoftDefenderforCloud-Overview_dashboard.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10376"
    "source_type_name": Microsoft Defender for Cloud
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
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "microsoft_defender_for_cloud"
"integration_id": "microsoft-defender-for-cloud"
"integration_title": "Microsoft Defender for Cloud"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "microsoft_defender_for_cloud"
"public_title": "Microsoft Defender for Cloud"
"short_description": "Monitor Microsoft Defender for Cloud"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Azure"
  - "Category::Cloud"
  - "Category::Log Collection"
  - "Category::Security"
  "configuration": "README.md#Setup"
  "description": Monitor Microsoft Defender for Cloud
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Microsoft Defender for Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview

Collect logs and alerts from [Microsoft Defender for Cloud][1].

Defender for Cloud is a cloud-native application protection platform (CNAPP) that monitors Microsoft Azure applications, gives insight into Azure security risks through cloud security posture management (CSPM), and protects Azure cloud workloads for servers, containers, storage, and databases (CWPP).

Enable Datadog Cloud SIEM to use out-of-the-box security rules to monitor your Azure environment along side your other security infrastructure.

## セットアップ

### インストール

This integration requires that the Datadog Azure integration is enabled. It forwards logs to Datadog through Azure using event hubs. The integration requires that the log forwarder be at least version `1.0.1` or later.

### 構成

Configure Defender for Cloud to [continuously export logs][2] to the event hub. No additional configuration is needed within Datadog.

### Validation

Follow [these instructions from Microsoft][3] to generate sample alerts in Defender for Cloud.

Defender for Cloud logs can be accessed using `source:microsoft-defender-for-cloud` in Log Management.

If using Datadog Cloud SIEM, confirm that the Microsoft Defender for Cloud detection rules are enabled:
1. In the Datadog menu, go to **Security** > **Configuration** and expand **Cloud SIEM**.
1. Select "Detection Rules". On the right-hand side, click the **Group By** selector and select **Source** to group the detection rules by source.
1. Scroll down and expand the section titled **Azure**. Scroll through the list to find the Microsoft Defender for Cloud rules. Make sure the rules are toggled on.


## 収集データ

### メトリクス

Microsoft Defender for Cloud does not include any metrics.

### サービスチェック

Microsoft Defender for Cloud does not include any service checks.

### イベント

Microsoft Defender for Cloud does not include any events.

## トラブルシューティング

To confirm that Cloud SIEM is receiving Defender for Cloud Alerts, follow these steps: 
1. In the Datadog menu, go to **Security** > **Configuration** and expand **Cloud SIEM**.
1. Select **Log Sources** and scroll down to **Azure**. 
1. Review whether Microsoft Defender for Cloud is listed as **Installed**. 
1. Inspect the column chart to confirm that logs are being received. 
1. If logs are being received, go to **Logs** > **Search** and search for `source:microsoft-defender-for-cloud`. You may need to change the time window for logs to appear. 
1. Inspect the logs and confirm that they are properly formed.

If you are still having trouble, contact [Datadog support][4].

[1]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction
[2]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/continuous-export?tabs=azure-portal
[3]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/alert-validation
[4]: https://docs.datadoghq.com/help/

